import mockPortfolio from '../data/portfolio';
import sampleFunds from '../data/funds';

const STORAGE_KEY = 'mf_portfolio';

export const getPortfolio = (ownerId) => {
  // Try localStorage first
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  // If no stored portfolio, try to initialize from signed-up user
  try {
    const rawUser = localStorage.getItem('mf_user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      const initialAmount = +(user.amount || 0);
      // simple allocation by risk profile
      const allocMap = {
        low: [ { id:5, pct: 0.7 }, { id:1, pct: 0.3 } ],
        moderate: [ { id:1, pct: 0.5 }, { id:4, pct: 0.3 }, { id:5, pct: 0.2 } ],
        high: [ { id:2, pct: 0.5 }, { id:1, pct: 0.3 }, { id:4, pct: 0.2 } ]
      };
      const picks = allocMap[user.risk] || allocMap['moderate'];
      const positions = [];
      const transactions = [];
      picks.forEach(pick => {
        const fund = sampleFunds.find(f => f.id === pick.id);
        if (!fund) return;
        const allocAmt = +(initialAmount * pick.pct).toFixed(2);
        const units = allocAmt > 0 ? +(allocAmt / fund.nav).toFixed(6) : 0;
        const pos = {
          fundId: fund.id,
          fundName: fund.name,
          units,
          avgCost: units > 0 ? +(allocAmt / units).toFixed(2) : fund.nav,
          currentNav: fund.nav,
          currentValue: +(units * fund.nav).toFixed(2),
          unrealizedPL: 0
        };
        positions.push(pos);
        if (units > 0) {
          transactions.push({ id: `t_init_${fund.id}_${Date.now()}`, type: 'buy', date: new Date().toISOString().split('T')[0], fundId: fund.id, fundName: fund.name, units, amount: allocAmt, currentNav: fund.nav });
        }
      });

      const history = [ { date: new Date().toISOString().split('T')[0], value: initialAmount } ];
      const goalsMap = {
        wealth_growth: { name: 'Wealth growth', targetAmount: 1000000, targetDate: '2035-01-01' },
        retirement: { name: 'Retirement', targetAmount: 5000000, targetDate: '2045-01-01' },
        children: { name: "Children's education", targetAmount: 2000000, targetDate: '2032-01-01' },
        tax_savings: { name: 'Tax savings', targetAmount: 500000, targetDate: '2028-03-31' }
      };
      const goalCfg = goalsMap[user.goal] || goalsMap['wealth_growth'];
      const goals = [ { id: 'g1', name: goalCfg.name, targetAmount: goalCfg.targetAmount, targetDate: goalCfg.targetDate, currentAmount: initialAmount } ];

      const p = {
        id: `p_${(user.email || 'user')}`,
        ownerId: ownerId || (user.email || 'user-1'),
        history,
        positions,
        transactions,
        goals
      };
      p.totalValue = positions.reduce((s, x) => s + x.currentValue, 0);
      p.positions = p.positions.map(x => ({ ...x, weightPct: +((x.currentValue / (p.totalValue || 1)) * 100).toFixed(2) }));
      // persist initial portfolio
      savePortfolio(p);
      return p;
    }
  } catch (e) {
    // ignore
  }
  // clone mock and compute derived fields
  const p = JSON.parse(JSON.stringify(mockPortfolio));
  p.positions = p.positions.map(pos => ({
    ...pos,
    currentValue: +(pos.units * pos.currentNav).toFixed(2),
    unrealizedPL: +((pos.units * pos.currentNav) - (pos.units * pos.avgCost)).toFixed(2)
  }));
  p.totalValue = p.positions.reduce((s, x) => s + x.currentValue, 0);
  p.positions = p.positions.map(x => ({ ...x, weightPct: +((x.currentValue / p.totalValue) * 100).toFixed(2) }));
  return p;
};

export const savePortfolio = (portfolio) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    return true;
  } catch (e) {
    return false;
  }
};

export const addTransaction = (tx) => {
  const p = getPortfolio();
  p.transactions.unshift(tx);
  // naive apply: update or create position
  const pos = p.positions.find(pp => pp.fundId === tx.fundId);
  if (tx.type === 'buy' || tx.type === 'sip') {
    if (pos) {
      // update avg cost and units
      const totalCost = (pos.avgCost * pos.units) + tx.amount;
      const totalUnits = pos.units + tx.units;
      pos.avgCost = +(totalCost / totalUnits).toFixed(2);
      pos.units = totalUnits;
      pos.currentValue = +(pos.units * pos.currentNav).toFixed(2);
    } else {
      p.positions.push({ fundId: tx.fundId, fundName: tx.fundName, units: tx.units, avgCost: +(tx.amount/tx.units).toFixed(2), currentNav: tx.currentNav || tx.amount/tx.units, currentValue: +(tx.units * (tx.currentNav || (tx.amount/tx.units))).toFixed(2), unrealizedPL: 0 });
    }
  }
  p.totalValue = p.positions.reduce((s, x) => s + x.currentValue, 0);
  p.positions = p.positions.map(x => ({ ...x, weightPct: +((x.currentValue / p.totalValue) * 100).toFixed(2) }));
  savePortfolio(p);
  return p;
};

export const simulateRebalance = (portfolio, options = { method: 'equal' }) => {
  // returns list of trades { type, fundId, fundName, units, amount }
  if (!portfolio) return { trades: [] };
  const total = portfolio.totalValue || portfolio.positions.reduce((s, x) => s + x.currentValue, 0);
  const n = portfolio.positions.length;
  if (n === 0) return { trades: [] };

  const targetPer = options.method === 'equal' ? (1 / n) : null; // only equal supported for now
  const trades = portfolio.positions.map(pos => {
    const targetValue = targetPer ? total * targetPer : pos.currentValue;
    const targetUnits = +(targetValue / pos.currentNav).toFixed(6);
    const deltaUnits = +(targetUnits - pos.units).toFixed(6);
    const amount = +(deltaUnits * pos.currentNav).toFixed(2);
    if (Math.abs(deltaUnits) < 0.000001) return null;
    return {
      type: deltaUnits > 0 ? 'buy' : 'sell',
      fundId: pos.fundId,
      fundName: pos.fundName,
      units: Math.abs(deltaUnits),
      amount: Math.abs(amount),
      currentNav: pos.currentNav
    };
  }).filter(Boolean);

  return { trades };
};

export const applyRebalance = (portfolio, options = { method: 'equal' }) => {
  const p = getPortfolio();
  const sim = simulateRebalance(p, options);
  sim.trades.forEach(tx => {
    const txObj = {
      id: `t_rb_${Date.now()}_${tx.fundId}`,
      type: tx.type,
      date: new Date().toISOString().split('T')[0],
      fundId: tx.fundId,
      fundName: tx.fundName,
      units: tx.units,
      amount: tx.amount,
      currentNav: tx.currentNav
    };
    // apply as transaction
    p.transactions.unshift(txObj);
    const pos = p.positions.find(pp => pp.fundId === tx.fundId);
    if (tx.type === 'buy') {
      if (pos) {
        const totalCost = (pos.avgCost * pos.units) + tx.amount;
        const totalUnits = pos.units + tx.units;
        pos.avgCost = +(totalCost / totalUnits).toFixed(2);
        pos.units = totalUnits;
      } else {
        p.positions.push({ fundId: tx.fundId, fundName: tx.fundName, units: tx.units, avgCost: +(tx.amount/tx.units).toFixed(2), currentNav: tx.currentNav || (tx.amount/tx.units), currentValue: +(tx.units * (tx.currentNav || (tx.amount/tx.units))).toFixed(2), unrealizedPL: 0 });
      }
    } else {
      // sell
      if (pos) {
        pos.units = +(pos.units - tx.units).toFixed(6);
        if (pos.units < 0) pos.units = 0;
      }
    }
  });
  // recompute values
  p.positions = p.positions.map(pos => ({
    ...pos,
    currentValue: +(pos.units * pos.currentNav).toFixed(2),
    unrealizedPL: +((pos.units * pos.currentNav) - (pos.units * pos.avgCost)).toFixed(2)
  }));
  p.totalValue = p.positions.reduce((s, x) => s + x.currentValue, 0);
  p.positions = p.positions.map(x => ({ ...x, weightPct: +((x.currentValue / p.totalValue) * 100).toFixed(2) }));
  savePortfolio(p);
  return { portfolio: p, trades: sim.trades };
};

export default { getPortfolio, savePortfolio, addTransaction, simulateRebalance, applyRebalance };
