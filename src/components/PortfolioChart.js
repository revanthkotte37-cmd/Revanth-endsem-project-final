import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PortfolioChart = ({ history = [] }) => {
  if (!history || history.length === 0) return <div style={{ padding: 24, color: '#6b7280' }}>No history available</div>;

  // Material blue
  const color = '#1976d2';

  const buildInitial = () => history.map(h => ({ date: h.date || new Date().toLocaleTimeString(), value: h.value }));
  const [liveHistory, setLiveHistory] = useState(buildInitial);
  const intRef = useRef(null);

  useEffect(() => {
    setLiveHistory(buildInitial());
  }, [history]);

  useEffect(() => {
    if (intRef.current) clearInterval(intRef.current);
    intRef.current = setInterval(() => {
      setLiveHistory(prev => {
        const last = prev[prev.length - 1] || { value: 0 };
        const factor = 1 + ((Math.random() - 0.5) * 0.01); // +/-0.5%
        const next = Math.max(0, +(last.value * factor).toFixed(2));
        const nextDate = new Date().toLocaleTimeString();
        return [...prev.slice(-200), { date: nextDate, value: next }];
      });
    }, 2000);
    return () => { if (intRef.current) clearInterval(intRef.current); };
  }, []);

  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.04)', height: 320 }}>
      <h4 style={{ marginTop: 0 }}>Portfolio performance</h4>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={liveHistory} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.36} />
              <stop offset="95%" stopColor={color} stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
          <Tooltip contentStyle={{ fontSize: 13 }} formatter={(v) => `₹${v}`} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill="url(#portfolioGrad)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
