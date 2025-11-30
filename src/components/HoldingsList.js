import React from 'react';

const HoldingsList = ({ positions = [] }) => {
  if (!positions || positions.length === 0) return <div style={{ padding: 12, color: '#6b7280' }}>No holdings yet.</div>;

  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
      <h4 style={{ marginTop: 0 }}>Holdings</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Fund</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Units</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Avg cost</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Current NAV</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Value</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Unrealized P/L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, idx) => (
            <tr key={idx} style={{ borderTop: '1px solid #f3f4f6' }}>
              <td style={{ padding: 8 }}>{p.fundName}</td>
              <td style={{ textAlign: 'right', padding: 8 }}>{p.units}</td>
              <td style={{ textAlign: 'right', padding: 8 }}>₹{p.avgCost}</td>
              <td style={{ textAlign: 'right', padding: 8 }}>₹{p.currentNav}</td>
              <td style={{ textAlign: 'right', padding: 8 }}>₹{p.currentValue}</td>
              <td style={{ textAlign: 'right', padding: 8, color: p.unrealizedPL >= 0 ? '#16a34a' : '#dc2626' }}>₹{p.unrealizedPL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsList;
