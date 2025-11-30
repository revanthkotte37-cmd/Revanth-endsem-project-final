import React from 'react';

const metricRows = [
  { key: 'nav', label: 'NAV (₹)' },
  { key: 'returns', label: '1Y Returns (%)' },
  { key: 'returns3m', label: '3M Returns (%)' },
  { key: 'aum', label: 'AUM (cr)' },
  { key: 'expenseRatio', label: 'Expense Ratio (%)' },
  { key: 'inception', label: 'Inception' },
  { key: 'riskLevel', label: 'Risk Level' }
];

const CompareTable = ({ funds = [] }) => {
  if (!funds || funds.length === 0) return <div style={{ color: '#6b7280' }}>No funds selected.</div>;

  // For simple highlighting, compute best/worst for numeric fields
  const numericKeys = ['nav','returns','returns3m','aum','expenseRatio'];
  const stats = {};
  numericKeys.forEach(k => {
    const vals = funds.map(f => f[k] ?? null).filter(v => v !== null && v !== undefined);
    if (vals.length) {
      stats[k] = { max: Math.max(...vals), min: Math.min(...vals) };
    }
  });

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Metric</th>
            {funds.map(f => <th key={f.id} style={{ textAlign: 'left', padding: 8 }}>{f.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {metricRows.map(row => (
            <tr key={row.key}>
              <td style={{ padding: 8, borderTop: '1px solid #f3f4f6' }}>{row.label}</td>
              {funds.map(f => {
                const v = f[row.key];
                let style = { padding: 8, borderTop: '1px solid #f3f4f6' };
                if (numericKeys.includes(row.key) && stats[row.key]) {
                  if (v === stats[row.key].max) style.background = 'rgba(16,185,129,0.08)';
                  if (v === stats[row.key].min) style.background = 'rgba(239,68,68,0.06)';
                }
                return <td key={f.id} style={style}>{v ?? '-'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
