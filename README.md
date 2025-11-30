# Mutual Funds Platform — Project README & Specs

This repository contains a React-based Mutual Funds investment platform (bootstrapped with Create React App). The README includes a short specification, feature list, and local dev notes.

## High-level specification

- Product: Mutual Funds Platform (web)
- Audience: Retail investors, financial advisors
- Goals: Browse funds, compare funds, open accounts, track investments, and view reports.

## Key pages and behaviour

- Home: Marketing and quick-links to core flows (Explore, Compare, Dashboard)
- Funds list: Filterable list of mutual funds with cards and quick actions
- Fund details: Full details, historical performance chart, key facts and risk indicators
- Compare: Side-by-side comparison of selected funds
- Dashboard: Portfolio tracking, holdings, and performance over time
- Auth: Login / Signup / Protected routes for investor dashboards

## UX / Visual guidelines

- Responsive header with search, primary CTA (Get Started), and theme toggle
- Accessible components (keyboard navigable, aria labels on interactive elements)
- Clean, minimal visual design with a blue accent (#2563eb) for primary actions

## Local development - change dev server port

Create React App reads PORT from `.env` in the project root. This project includes a `.env` with `PORT=3002` so the dev server will start at http://localhost:3002.

## Available scripts

In the `sample-project` directory you can run:

### `npm start`

Runs the app in development mode. The dev server will open on the port set in `.env` (default for this repo: `3002`).

### `npm test`, `npm run build`, `npm run eject`

See the original Create React App docs for further details.

---

Below is the original create-react-app README content (kept for reference):
