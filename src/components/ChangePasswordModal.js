import React, { useState } from 'react';

const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 };
const box = { background: '#fff', padding: 20, width: 420, borderRadius: 8 };

import { hashPassword } from '../utils/hash';

export default function ChangePasswordModal({ open, onClose, user, onSave }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const hasPassword = !!(user && user.password);

  const handleSave = async () => {
    setError('');
    if (!next || next.length < 6) return setError('Password must be at least 6 characters');
    if (next !== confirm) return setError('Passwords do not match');
    if (hasPassword) {
      if (!current) return setError('Please enter your current password');
      // accept either plaintext or hashed current
      const currentHash = await hashPassword(current);
      if (current !== user.password && currentHash !== user.password) return setError('Current password is incorrect');
    }
    const newHash = await hashPassword(next);
    const updated = { ...user, password: newHash, passwordHashed: true };
    try { localStorage.setItem('mf_user', JSON.stringify(updated)); } catch (e) {}
    if (onSave) onSave(updated);
    onClose();
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{hasPassword ? 'Change password' : 'Set a password'}</h3>
        {hasPassword && (
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 13 }}>Current password</label>
            <input type="password" value={current} onChange={e=>setCurrent(e.target.value)} style={{ width: '100%', padding: 8 }} />
          </div>
        )}
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontSize: 13 }}>{hasPassword ? 'New password' : 'Password'}</label>
          <input type="password" value={next} onChange={e=>setNext(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontSize: 13 }}>Confirm password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '8px 12px' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '8px 12px' }}>Save</button>
        </div>
      </div>
    </div>
  );
}
