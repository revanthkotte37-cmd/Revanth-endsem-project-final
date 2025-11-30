import React, { useEffect, useState } from 'react';
import { simulateRebalance } from '../services/portfolioService';

const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 };
const box = { background: '#fff', padding: 20, width: 600, borderRadius: 8, maxHeight: '80vh', overflow: 'auto' };

export default function RebalanceModal({ open, onClose, portfolio, onApply }) {
  const [trades, setTrades] = useState([]);
  useEffect(() => {
    if (!open) return;
    const sim = simulateRebalance(portfolio, { method: 'equal' });
    setTrades(sim.trades || []);
  }, [open, portfolio]);

  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={e => e.stopPropagation()}>
        <h3>Rebalance portfolio</h3>
        <p>Proposed trades to equalize weights across your holdings:</p>
        <div style={{ marginTop: 8 }}>
          {trades.length === 0 && <div>No trades needed — portfolio already balanced.</div>}
          {trades.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
              <div>{t.fundName} <small style={{ color: '#666' }}>({t.fundId})</small></div>
              <div style={{ textAlign: 'right' }}>{t.type.toUpperCase()} {t.units} units • ₹{t.amount}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px' }}>Cancel</button>
          <button onClick={() => { onApply(); onClose(); }} style={{ padding: '8px 12px' }} disabled={trades.length === 0}>Apply Rebalance</button>
        </div>
      </div>
    </div>
  );
}
