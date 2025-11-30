import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PortfolioSummary from '../components/PortfolioSummary';
import PortfolioChart from '../components/PortfolioChart';
import HoldingsList from '../components/HoldingsList';
import TransactionsList from '../components/TransactionsList';
import AddMoneyModal from '../components/AddMoneyModal';
import RebalanceModal from '../components/RebalanceModal';
import { getPortfolio, addTransaction, applyRebalance } from '../services/portfolioService';

const Dashboard = () => {
  // theme was unused; remove to avoid ESLint unused-var warning
  useContext(UserContext);
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showRebalance, setShowRebalance] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem('mf_user');
    if (!rawUser) {
      navigate('/login?returnTo=/dashboard');
      return;
    }
    const user = JSON.parse(rawUser);
    setUser(user);
    const p = getPortfolio(user.id || user.email || 'user-1');
    setPortfolio(p);
  }, [navigate]);

  const refresh = () => {
  const rawUser = localStorage.getItem('mf_user');
  const user = rawUser ? JSON.parse(rawUser) : { id: 'user-1' };
  setPortfolio(getPortfolio(user.id || user.email || 'user-1'));
  };

  const handleAdd = (tx) => {
    addTransaction(tx);
    refresh();
  };

  const handleApplyRebalance = () => {
    applyRebalance(portfolio, { method: 'equal' });
    refresh();
  };

  if (!portfolio) return <div style={{ padding: 20 }}>Loading portfolio...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Hi{user && user.name ? `, ${user.name}` : ''}</h1>
          <div style={{ color: '#6b7280', fontSize: 13 }}>{user ? `Goal: ${user.goal.replace('_',' ')}, Risk: ${user.risk}` : ''}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {(() => {
          const prev = (portfolio.history && portfolio.history[portfolio.history.length - 2]?.value) || 0;
          const dayChange = +(portfolio.totalValue - prev).toFixed(2);
          return (
            <PortfolioSummary totalValue={portfolio.totalValue} dayChange={dayChange} dayChangePct={0} onAdd={() => setShowAdd(true)} onRebalance={() => setShowRebalance(true)} />
          );
        })()}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 12 }}>
        <PortfolioChart history={portfolio.history} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HoldingsList positions={portfolio.positions} />
          <div style={{ height: 12 }} />
          <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
            <h4 style={{ marginTop: 0 }}>Goals</h4>
            {portfolio.goals.map(g => {
              const progress = g.targetAmount ? Math.min(100, Math.round((portfolio.totalValue / g.targetAmount) * 100)) : 0;
              return (
                <div key={g.id} style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8, marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 600 }}>{g.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{progress}%</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Target: ₹{g.targetAmount} • Due: {g.targetDate}</div>
                  <div style={{ background: '#eef2ff', height: 8, borderRadius: 6, marginTop: 8 }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#6366f1', borderRadius: 6 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <TransactionsList transactions={portfolio.transactions} />
      </div>

      <AddMoneyModal open={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleAdd} portfolio={portfolio} />
      <RebalanceModal open={showRebalance} onClose={() => setShowRebalance(false)} portfolio={portfolio} onApply={handleApplyRebalance} />
    </div>
  );
};

export default Dashboard;
