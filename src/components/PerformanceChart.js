import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

// normalize series to 100 at first point
const normalized = (history) => {
  if (!history || history.length === 0) return [];
  const base = history[0].value;
  return history.map(p => ({ date: p.date, value: (p.value / base) * 100 }));
};

const PerformanceChart = ({ funds = [], normalize = true }) => {
  // Build series by aligning dates (simple approach: use each fund's history as-is)
  // For demo we'll plot each fund's history independently — Recharts handles multiple Line elements.

  // Material-inspired palette (blue, red, green, orange, deep purple, teal)
  const palette = ["#1976d2", "#d32f2f", "#388e3c", "#f57c00", "#7b1fa2", "#0097a7"];

  const initialVisible = useMemo(() => {
    const map = {};
    funds.forEach(f => { map[f.name] = true; });
    return map;
  }, [funds]);

  const [visible, setVisible] = useState(initialVisible);

  const handleLegendClick = (obj) => {
    // obj.payload or obj has 'value' or 'dataKey' depending on Legend payload
    // clarify operator precedence to satisfy ESLint no-mixed-operators
    const name = obj && (obj.value || (obj.payload && obj.payload.value) || obj.dataKey || obj.name);
    if (!name) return;
    setVisible(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div style={{ width: '100%', height: 300, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
      {funds.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>Select funds to see performance chart</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            {/* gradient defs for fills */}
            <defs>
              {funds.map((f, idx) => (
                <linearGradient id={`grad-${idx}`} key={`g-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette[idx % palette.length]} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={palette[idx % palette.length]} stopOpacity={0.03} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 13 }} cursor={{ stroke: '#8884d8', strokeWidth: 1 }} />
            <Legend wrapperStyle={{ paddingTop: 8 }} onClick={handleLegendClick} />

            {funds.map((f, idx) => (
              <React.Fragment key={f.id}>
                <Area
                  data={normalize ? normalized(f.history) : f.history}
                  type="monotone"
                  dataKey="value"
                  name={f.name}
                  stroke={palette[idx % palette.length]}
                  fillOpacity={1}
                  fill={`url(#grad-${idx})`}
                  activeDot={false}
                  isAnimationActive={false}
                  hide={!visible[f.name]}
                />
                <Line
                  data={normalize ? normalized(f.history) : f.history}
                  dataKey="value"
                  stroke={palette[idx % palette.length]}
                  strokeWidth={2.25}
                  dot={false}
                  type="monotone"
                  hide={!visible[f.name]}
                />
              </React.Fragment>
            ))}
            {/* Brush for range selection */}
            <defs />
            <Brush dataKey="date" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PerformanceChart;
