import React from 'react';
import { Link } from 'react-router-dom';

const formatAum = (v) => {
  if (!v && v !== 0) return '-';
  if (v >= 10000) return `${(v/10000).toFixed(2)}L`; // crore to lakh-crore shorthand
  return `${v} cr`;
};

const FundCard = ({ fund }) => {
  return (
    <div style={{
      border: '1px solid #e6e6e6',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 6px rgba(16,24,40,0.04)'
    }}>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>{fund.name}</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: 8 }}>
        <div style={{ color: '#6b7280' }}><strong>Category:</strong> {fund.category}</div>
        <div style={{ color: '#6b7280' }}><strong>Risk:</strong> {fund.riskLevel}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: '0.9rem', color: '#374151' }}><strong>NAV</strong></div>
          <div style={{ fontWeight: 700 }}>₹{fund.nav}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.9rem', color: '#374151' }}><strong>1Y</strong></div>
          <div style={{ fontWeight: 700, color: fund.returns >= 0 ? '#16a34a' : '#dc2626' }}>{fund.returns}%</div>
        </div>

        <div>
          <div style={{ fontSize: '0.9rem', color: '#374151' }}><strong>AUM</strong></div>
          <div style={{ fontWeight: 700 }}>{formatAum(fund.aum)}</div>
        </div>
      </div>

      <div style={{ marginBottom: 12, color: '#6b7280' }}>
        <small>Expense ratio: {fund.expenseRatio}% • Inception: {fund.inception}</small>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to={`/funds/${fund.id}`} style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>View Details</Link>
        <button style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'transparent' }}>Add to Watchlist</button>
      </div>
    </div>
  );
};

export default FundCard;