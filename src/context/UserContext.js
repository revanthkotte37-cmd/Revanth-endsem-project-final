import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
	theme: 'light',
	toggleTheme: () => {},
	user: null,
	isAuthenticated: false,
	signIn: () => {},
	signOut: () => {}
});

export const UserProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');
	const [user, setUser] = useState(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem('mf_user');
			if (raw) setUser(JSON.parse(raw));
		} catch (e) {
			// ignore
		}

	}, []);

	// listen for external updates to mf_user (e.g., ChangePasswordModal) and update context
	useEffect(() => {
		const handler = (e) => {
			try {
				const u = e && e.detail ? e.detail : null;
				if (u) setUser(u);
				else {
					const raw = localStorage.getItem('mf_user');
					if (raw) setUser(JSON.parse(raw));
				}
			} catch (err) {}
		};
		if (typeof window !== 'undefined' && window.addEventListener) {
			window.addEventListener('mf_user_updated', handler);
		}
		return () => { if (typeof window !== 'undefined' && window.removeEventListener) window.removeEventListener('mf_user_updated', handler); };
	}, []);

	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

	const signIn = (userObj) => {
		const u = { ...(userObj || {}), signedAt: new Date().toISOString() };
		try { localStorage.setItem('mf_user', JSON.stringify(u)); } catch (e) {}
		setUser(u);
	};

	const signOut = () => {
		try { localStorage.removeItem('mf_user'); } catch (e) {}
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ theme, toggleTheme, user, isAuthenticated: !!user, signIn, signOut }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
