import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { hashPassword } from '../utils/hash';

const initial = {
  name: '',
  email: '',
  goal: 'wealth_growth',
  risk: 'moderate',
  amount: '',
  password: '',
  confirm: ''
};

const Signup = () => {
  const [data, setData] = useState(initial);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // prefill from provisional user if exists
    try {
      const raw = localStorage.getItem('mf_user');
      if (raw) {
        const u = JSON.parse(raw);
        setData(d => ({ ...d, email: u.email || d.email, name: u.name || d.name, goal: u.goal || d.goal, risk: u.risk || d.risk }));
      }
    } catch (e) {}
  }, []);

  const next = () => {
    setError('');
    if (step === 1) {
      if (!data.name.trim()) return setError('Please enter your name');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) return setError('Please enter a valid email address');
      setStep(2);
      return;
    }
    if (step === 2) setStep(3);
    if (step === 3) setStep(4);
  };

  const prev = () => setStep(s => Math.max(1, s-1));

  const submit = () => {
    setError('');
    if (!data.amount || Number(data.amount) <= 0) return setError('Please enter a valid initial amount');
    if (!data.password || data.password.length < 6) return setError('Please choose a password (min 6 characters)');
    if (data.password !== data.confirm) return setError('Passwords do not match');

    // ensure email uniqueness
    try {
      const existingRaw = localStorage.getItem('mf_user');
      if (existingRaw) {
        const existing = JSON.parse(existingRaw);
        if (existing.email && existing.email.toLowerCase() === (data.email || '').toLowerCase()) {
          return setError('An account with this email already exists. Please sign in instead.');
        }
      }
    } catch (e) {}

    (async () => {
      // hash password before storing (demo improvement)
  const pwdHash = await hashPassword(data.password);
  const user = { ...data, password: pwdHash, createdAt: new Date().toISOString(), passwordHashed: true, email: (data.email || '').toLowerCase() };
      try { localStorage.setItem('mf_user', JSON.stringify(user)); } catch (e) {}
      // redirect to dashboard
      navigate('/dashboard');
    })();
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Get Started</h2>
        <p className="muted">Create your account and set financial goals. We'll personalize fund recommendations.</p>

        {step === 1 && (
          <div className="form">
            <label className="label">Full name</label>
            <input className="input" value={data.name} onChange={e=>setData({...data, name:e.target.value})} />
            <label className="label">Email address</label>
            <input className="input" value={data.email} onChange={e=>setData({...data, email:e.target.value})} />
          </div>
        )}

        {step === 2 && (
          <div className="form">
            <label className="label">What's your primary goal?</label>
            <select className="input" value={data.goal} onChange={e=>setData({...data, goal:e.target.value})}>
              <option value="wealth_growth">Wealth growth</option>
              <option value="retirement">Retirement planning</option>
              <option value="children">Children's education</option>
              <option value="tax_savings">Tax savings</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="form">
            <label className="label">Risk preference</label>
            <div className="risk-row">
              <label><input type="radio" name="risk" checked={data.risk==='low'} onChange={()=>setData({...data, risk:'low'})} /> Low</label>
              <label><input type="radio" name="risk" checked={data.risk==='moderate'} onChange={()=>setData({...data, risk:'moderate'})} /> Moderate</label>
              <label><input type="radio" name="risk" checked={data.risk==='high'} onChange={()=>setData({...data, risk:'high'})} /> High</label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form">
            <label className="label">Initial investment amount (₹)</label>
            <input className="input" type="number" value={data.amount} onChange={e=>setData({...data, amount:e.target.value})} />
            <label className="label" style={{ marginTop: 8 }}>Password</label>
            <input className="input" type="password" value={data.password} onChange={e=>setData({...data, password: e.target.value})} />
            <label className="label" style={{ marginTop: 8 }}>Confirm password</label>
            <input className="input" type="password" value={data.confirm} onChange={e=>setData({...data, confirm: e.target.value})} />
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <div className="actions">
          {step > 1 && <button className="btn btn--ghost" onClick={prev}>Back</button>}
          {step < 4 && <button className="btn btn--primary" onClick={next}>Next</button>}
          {step === 4 && <button className="btn btn--primary" onClick={submit}>Create account</button>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
