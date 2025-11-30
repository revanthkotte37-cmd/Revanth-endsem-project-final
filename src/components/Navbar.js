import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ChangePasswordModal from './ChangePasswordModal';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, user, isAuthenticated, signOut } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <header className={`navbar ${theme === 'light' ? 'navbar--light' : 'navbar--dark'}`}>
      <div className="navbar__inner">
        <div className="navbar__brand">
          <Link to="/" className="navbar__logo">MF<span className="navbar__logo-accent">Platform</span></Link>
        </div>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((s) => !s)}
        >
          <span className={`hamburger ${mobileOpen ? 'is-active' : ''}`} />
        </button>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`} aria-label="Main navigation">
          <NavLink to="/funds" className="navbar__link" onClick={() => setMobileOpen(false)}>Explore Funds</NavLink>
          <NavLink to="/compare" className="navbar__link" onClick={() => setMobileOpen(false)}>Compare</NavLink>
          <NavLink to="/dashboard" className="navbar__link" onClick={() => setMobileOpen(false)}>Dashboard</NavLink>

          <form className="navbar__search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="navbar__searchInput"
              type="search"
              placeholder="Search funds, categories..."
              aria-label="Search funds"
            />
          </form>
        </nav>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <button className="btn btn--ghost" onClick={() => navigate('/dashboard')}>{user && user.name ? `Hi, ${user.name.split(' ')[0]}` : 'Dashboard'}</button>
              <button className="btn btn--ghost" onClick={() => setShowPasswordModal(true)}>{user && user.password ? 'Change password' : 'Set password'}</button>
              <button className="btn btn--ghost" onClick={() => { signOut(); navigate('/'); }}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">Login</Link>
              <Link to="/signup" className="btn btn--primary">Sign Up</Link>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      <ChangePasswordModal open={showPasswordModal} onClose={() => setShowPasswordModal(false)} user={user} onSave={(u) => { if (u && u.password) { /* update context */ if (typeof window !== 'undefined') { try { const evt = new CustomEvent('mf_user_updated', { detail: u }); window.dispatchEvent(evt); } catch(e){} } } }} />
    </header>
  );
};

export default Navbar;
