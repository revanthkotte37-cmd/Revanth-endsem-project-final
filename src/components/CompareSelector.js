import React, { useState } from 'react';

const CompareSelector = ({ funds, selectedIds, onToggle, maxSelect=4 }) => {
  const [q, setQ] = useState('');

  const filtered = funds.filter(f => f.name.toLowerCase().includes(q.toLowerCase()) || f.category.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ border: '1px solid #e6e6e6', padding: 12, borderRadius: 8 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search funds or category" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
        <div style={{ alignSelf: 'center' }}>
          <small>{selectedIds.length}/{maxSelect} selected</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
        {filtered.map(f => (
          <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, background: selectedIds.includes(f.id) ? '#f0f9ff' : '#fff', border: '1px solid #f1f5f9' }}>
            <input type="checkbox" checked={selectedIds.includes(f.id)} onChange={()=>onToggle(f.id)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{f.category} • {f.riskLevel}</div>
            </div>
            <div style={{ fontWeight: 700 }}>₹{f.nav}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareSelector;
