import React from 'react';

const format = (v) => `₹${v.toLocaleString()}`;

const PortfolioSummary = ({ totalValue = 0, dayChange = 0, dayChangePct = 0, onAdd = ()=>{} }) => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
      <div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Portfolio value</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{format(totalValue)}</div>
        <div style={{ color: dayChange >= 0 ? '#16a34a' : '#dc2626' }}>{dayChange >= 0 ? '+' : ''}{format(dayChange)} ({dayChangePct}%) today</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onAdd} style={{ padding: '8px 12px' }}>Add money</button>
        <button style={{ padding: '8px 12px' }}>Withdraw</button>
        <button onClick={() => onRebalance && onRebalance()} style={{ padding: '8px 12px' }}>Rebalance</button>
      </div>
    </div>
  );
};

export default PortfolioSummary;
