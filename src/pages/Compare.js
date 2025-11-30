import React, { useState, useMemo } from 'react';
import sampleFunds from '../data/funds';
import CompareSelector from '../components/CompareSelector';
import PerformanceChart from '../components/PerformanceChart';
import CompareTable from '../components/CompareTable';

const MAX_SELECT = 4;

const Compare = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [normalize, setNormalize] = useState(true);
  const [windowRange, setWindowRange] = useState('1Y');

  const selectedFunds = useMemo(() => sampleFunds.filter(f => selectedIds.includes(f.id)), [selectedIds]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_SELECT) return prev; // ignore if already at limit
      return [...prev, id];
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Compare Funds</h1>
      <p className="muted">Select up to {MAX_SELECT} funds to compare performance and key metrics.</p>

      <CompareSelector
        funds={sampleFunds}
        selectedIds={selectedIds}
        onToggle={toggleSelect}
        maxSelect={MAX_SELECT}
      />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <label><input type="checkbox" checked={normalize} onChange={(e)=>setNormalize(e.target.checked)} /> Normalize (start = 100)</label>
        <label style={{ marginLeft: 12 }}>Window:
          <select value={windowRange} onChange={(e)=>setWindowRange(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="1Y">1Y</option>
            <option value="3Y">3Y</option>
            <option value="5Y">5Y</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 18 }}>
        <PerformanceChart funds={selectedFunds} normalize={normalize} />
      </div>

      <div style={{ marginTop: 18 }}>
        <CompareTable funds={selectedFunds} />
      </div>
    </div>
  );
};

export default Compare;
