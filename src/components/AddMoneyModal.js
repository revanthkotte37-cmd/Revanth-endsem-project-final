import React, { useState } from 'react';
import sampleFunds from '../data/funds';

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
};
const boxStyle = { background: '#fff', padding: 20, width: 400, borderRadius: 8 };

export default function AddMoneyModal({ open, onClose, onSubmit, portfolio }) {
  const [fundId, setFundId] = useState(portfolio && portfolio.positions && portfolio.positions[0] ? portfolio.positions[0].fundId : (sampleFunds[0] && sampleFunds[0].id));
  const [amount, setAmount] = useState('');

  if (!open) return null;

  const fundsList = sampleFunds.map(f => ({ id: f.id, name: f.name }));

  const handleConfirm = () => {
    const fund = sampleFunds.find(f => f.id === fundId) || fundsList[0];
    const nav = fund.nav || 100;
    const units = +(parseFloat(amount || 0) / nav).toFixed(6);
    const tx = {
      id: `t_add_${Date.now()}`,
      type: 'buy',
      date: new Date().toISOString().split('T')[0],
      fundId: fund.id,
      fundName: fund.name,
      units,
      amount: +parseFloat(amount || 0),
      currentNav: nav
    };
    onSubmit(tx);
    setAmount('');
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={e => e.stopPropagation()}>
        <h3>Add money</h3>
        <label style={{ display: 'block', marginBottom: 8 }}>Select fund</label>
        <select value={fundId} onChange={e => setFundId(e.target.value)} style={{ width: '100%', marginBottom: 12 }}>
          {fundsList.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <label style={{ display: 'block', marginBottom: 8 }}>Amount (INR)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '8px 12px' }}>Cancel</button>
          <button onClick={handleConfirm} style={{ padding: '8px 12px' }} disabled={!amount || parseFloat(amount) <= 0}>Add</button>
        </div>
      </div>
    </div>
  );
}
