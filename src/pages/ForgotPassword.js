import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { hashPassword } from '../utils/hash';
import { UserContext } from '../context/UserContext';

const STORAGE_PREFIX = 'mf_reset_';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('request'); // request | verify
  const [token, setToken] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [visibleToken, setVisibleToken] = useState('');
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const sendReset = () => {
    setError('');
    const cleaned = (email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return setError('Please enter a valid email address');
    // generate token
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + (15 * 60 * 1000); // 15 min
    try { localStorage.setItem(STORAGE_PREFIX + cleaned, JSON.stringify({ code, expiry })); } catch (e) {}
    // demo: expose token in a small modal so tester doesn't need console
    setVisibleToken(code);
    setStage('verify');
  };

  const verifyAndSet = async () => {
    setError('');
  const cleaned = (email || '').trim().toLowerCase();
  const raw = localStorage.getItem(STORAGE_PREFIX + cleaned);
    if (!raw) return setError('No reset request found. Please request a reset first.');
    let info = null;
    try { info = JSON.parse(raw); } catch (e) { info = null; }
    if (!info || info.code !== token) return setError('Invalid token');
    if (Date.now() > (info.expiry || 0)) return setError('Token expired. Please request a new one.');
    if (!newPass || newPass.length < 6) return setError('Password must be at least 6 characters');
    if (newPass !== confirm) return setError('Passwords do not match');

    // find user
    let user = null;
    try { user = JSON.parse(localStorage.getItem('mf_user')); } catch (e) { user = null; }
  if (!user || (user.email || '').toLowerCase() !== cleaned) return setError('Account not found for this email');

    const pwdHash = await hashPassword(newPass);
    user.password = pwdHash;
    user.passwordHashed = true;
    try { localStorage.setItem('mf_user', JSON.stringify(user)); } catch (e) {}
    // remove reset token
  try { localStorage.removeItem(STORAGE_PREFIX + cleaned); } catch (e) {}
    // sign in via context and go to dashboard
    if (ctx && ctx.signIn) ctx.signIn(user);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '20px auto' }}>
      <h2>Reset password</h2>
      {visibleToken && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Demo reset token</div>
            <div style={{ fontSize: 20, letterSpacing: 2, marginBottom: 12 }}>{visibleToken}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn--ghost" onClick={() => setVisibleToken('')}>Close</button>
            </div>
          </div>
        </div>
      )}
      {stage === 'request' && (
        <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
          <label style={{ display: 'block' }}>Email address</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={sendReset} className="btn btn--primary">Send reset token</button>
            <button onClick={() => navigate('/login')} className="btn btn--ghost">Back to login</button>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#6b7280' }}>Demo: reset token will be shown on-screen for testing (no email provider configured).</div>
        </div>
      )}

      {stage === 'verify' && (
        <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
          <label style={{ display: 'block' }}>Enter token</label>
          <input value={token} onChange={e=>setToken(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <label style={{ display: 'block' }}>New password</label>
          <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          <label style={{ display: 'block' }}>Confirm password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8 }} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={verifyAndSet} className="btn btn--primary">Set new password</button>
            <button onClick={() => setStage('request')} className="btn btn--ghost">Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
