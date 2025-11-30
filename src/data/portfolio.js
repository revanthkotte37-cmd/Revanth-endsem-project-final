// Mock portfolio data for demo purposes
const mockPortfolio = {
  id: 'p1',
  ownerId: 'user-1',
  history: [
    { date: '2025-01-01', value: 15000 },
    { date: '2025-02-01', value: 15500 },
    { date: '2025-03-01', value: 16000 },
    { date: '2025-04-01', value: 16250 },
    { date: '2025-05-01', value: 16800 },
    { date: '2025-06-01', value: 17200 },
    { date: '2025-07-01', value: 17650 },
    { date: '2025-08-01', value: 17900 },
    { date: '2025-09-01', value: 18250 },
    { date: '2025-10-01', value: 18800 },
    { date: '2025-11-01', value: 18500 }
  ],
  positions: [
    { fundId: 1, fundName: 'HDFC Top 100 Fund', units: 80, avgCost: 95.0, currentNav: 120.45 },
    { fundId: 3, fundName: 'Axis Bluechip Fund', units: 150, avgCost: 30.5, currentNav: 45.75 },
    { fundId: 5, fundName: 'ICICI Prudential Balanced Advantage Fund', units: 40, avgCost: 60.0, currentNav: 67.88 }
  ],
  transactions: [
    { id: 't1', type: 'buy', date: '2025-10-12', fundId: 1, fundName: 'HDFC Top 100 Fund', units: 50, amount: 4750 },
    { id: 't2', type: 'sip', date: '2025-09-01', fundId: 3, fundName: 'Axis Bluechip Fund', units: 10, amount: 305 },
    { id: 't3', type: 'buy', date: '2025-06-20', fundId: 5, fundName: 'ICICI Prudential Balanced Advantage Fund', units: 40, amount: 2400 }
  ],
  goals: [
    { id: 'g1', name: 'Retirement', targetAmount: 2000000, targetDate: '2040-01-01', currentAmount: 18500 }
  ]
};

export default mockPortfolio;
