import React from 'react';

const TransactionsList = ({ transactions = [] }) => {
  if (!transactions || transactions.length === 0) return <div style={{ padding: 12, color: '#6b7280' }}>No recent transactions.</div>;

  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
      <h4 style={{ marginTop: 0 }}>Recent activity</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {transactions.map(tx => (
          <li key={tx.id} style={{ borderTop: '1px solid #f3f4f6', padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{tx.type.toUpperCase()} — {tx.fundName}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{tx.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>₹{tx.amount}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{tx.units} units</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
