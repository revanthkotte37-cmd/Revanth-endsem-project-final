import React from 'react';
import { useParams, Link } from 'react-router-dom';
import sampleFunds from '../data/funds';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FundDetails = () => {
  const { id } = useParams();
  const fund = sampleFunds.find(f => String(f.id) === String(id));

  if (!fund) return (
    <div style={{ padding: 20 }}>
      <h2>Fund not found</h2>
      <Link to="/funds">Back to funds</Link>
    </div>
  );

  // prepare history for chart; fallback to last NAV-like values if history missing
  const history = fund.history && fund.history.length ? fund.history : [
    { date: '2025-01', value: fund.nav * 0.85 },
    { date: '2025-06', value: fund.nav * 0.92 },
    { date: '2025-11', value: fund.nav }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 980 }}>
      <Link to="/funds">← Back to Explore</Link>
      <h1 style={{ marginTop: 12 }}>{fund.name}</h1>
      <div style={{ display: 'flex', gap: 24, marginTop: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#374151' }}>{fund.description}</p>

          <div style={{ height: 320, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <h4 style={{ marginTop: 0 }}>Performance (monthly)</h4>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={history} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${v}`} />
                <Tooltip formatter={(value) => [`₹${value}`, 'Value']} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            <div><strong>Category</strong><div>{fund.category}</div></div>
            <div><strong>Risk Level</strong><div>{fund.riskLevel}</div></div>
            <div><strong>NAV</strong><div>₹{fund.nav}</div></div>
            <div><strong>1Y Returns</strong><div style={{ color: fund.returns >=0 ? '#16a34a' : '#dc2626' }}>{fund.returns}%</div></div>
            <div><strong>3M Returns</strong><div>{fund.returns3m}%</div></div>
            <div><strong>AUM</strong><div>{fund.aum} cr</div></div>
            <div><strong>Expense Ratio</strong><div>{fund.expenseRatio}%</div></div>
            <div><strong>Inception</strong><div>{fund.inception}</div></div>
          </div>
        </div>

        <aside style={{ width: 280 }}>
          <div style={{ padding: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <h4 style={{ marginTop: 0 }}>Top holdings</h4>
            <ul>
              {fund.holdings.map((h, idx) => (
                <li key={idx}>{h.name} — {h.weight}%</li>
              ))}
            </ul>
            <div style={{ marginTop: 12 }}>
              <button style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', borderRadius: 6, border: 'none' }}>Invest</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FundDetails;
