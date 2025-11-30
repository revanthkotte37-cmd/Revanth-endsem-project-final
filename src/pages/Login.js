import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e||'').trim());

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const handleSignIn = async () => {
    setError('');
    const cleanedEmail = (email || '').trim().toLowerCase();
    if (!isValidEmail(cleanedEmail)) return setError('Please enter a valid email address.');
    if (!password || password.length < 6) return setError('Please enter your password (min 6 chars).');
    setLoading(true);
    try {
      let existing = null;
      try { existing = JSON.parse(localStorage.getItem('mf_user')); } catch (e) { existing = null; }
      if (!existing) {
        setError('No account found for this email. Please create an account.');
        setLoading(false);
        return;
      }
      const storedEmail = (existing.email || '').toLowerCase();
      if (storedEmail !== cleanedEmail) {
        setError('No account found for this email.');
        setLoading(false);
        return;
      }

      // hash provided password and compare. Accept legacy plaintext too and upgrade.
      const providedHash = await import('../utils/hash').then(m => m.hashPassword(password));
      const passwordMatches = (existing.password && existing.password === providedHash) || (existing.password && existing.password === password);
      if (!passwordMatches) {
        setError('Incorrect password.');
        setLoading(false);
        return;
      }

      // if stored password was plaintext, upgrade to hashed
      if (existing.password && existing.password !== providedHash) {
        existing.password = providedHash;
        existing.passwordHashed = true;
        try { localStorage.setItem('mf_user', JSON.stringify(existing)); } catch (e) {}
      }

      if (ctx && ctx.signIn) ctx.signIn(existing);
      navigate('/dashboard');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign in</h2>
        <p className="muted">Sign in with your email and password.</p>

        <div className="form">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />

          <label className="label" style={{ marginTop: 8 }}>Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button className="btn btn--primary" onClick={handleSignIn} disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <button className="btn btn--ghost" onClick={() => navigate('/signup')}>Create account</button>
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="/forgot">Forgot password?</a>
          </div>
        </div>

        <div className="login-footer muted small">By continuing you agree to our Terms and Privacy Policy.</div>
      </div>
    </div>
  );
};

export default Login;
