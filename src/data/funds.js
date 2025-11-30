// Shared sample data for funds (used by FundsList and FundDetails)
const sampleFunds = [
  {
    id: 1,
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    nav: 120.45,
    returns: 12.5,
    returns3m: 3.2,
    aum: 8200, // crores
    expenseRatio: 1.05,
    inception: '2008-05-12',
    riskLevel: "Moderate",
    description: "A diversified large cap equity fund focused on bluechip Indian companies with long-term growth potential.",
    holdings: [
      { name: 'Reliance Industries', weight: 5.2 },
      { name: 'HDFC Bank', weight: 4.8 },
      { name: 'ICICI Bank', weight: 3.9 }
    ]
    ,
    history: [
      { date: '2025-01-01', value: 95 },
      { date: '2025-02-01', value: 98 },
      { date: '2025-03-01', value: 102 },
      { date: '2025-04-01', value: 108 },
      { date: '2025-05-01', value: 112 },
      { date: '2025-06-01', value: 115 },
      { date: '2025-07-01', value: 118 },
      { date: '2025-08-01', value: 119 },
      { date: '2025-09-01', value: 121 },
      { date: '2025-10-01', value: 123 },
      { date: '2025-11-01', value: 120 }
    ]
  },
  {
    id: 2,
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    nav: 85.3,
    returns: 15.8,
    returns3m: 6.1,
    aum: 2400,
    expenseRatio: 1.45,
    inception: '2012-09-04',
    riskLevel: "High",
    description: "An actively managed small-cap fund aiming for capital appreciation by investing in high-growth small companies.",
    holdings: [
      { name: 'SmallCo A', weight: 2.1 },
      { name: 'SmallCo B', weight: 1.8 }
    ]
    ,
    history: [
      { date: '2025-01-01', value: 60 },
      { date: '2025-02-01', value: 62 },
      { date: '2025-03-01', value: 65 },
      { date: '2025-04-01', value: 70 },
      { date: '2025-05-01', value: 74 },
      { date: '2025-06-01', value: 78 },
      { date: '2025-07-01', value: 80 },
      { date: '2025-08-01', value: 82 },
      { date: '2025-09-01', value: 84 },
      { date: '2025-10-01', value: 86 },
      { date: '2025-11-01', value: 85 }
    ]
  },
  {
    id: 3,
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    nav: 45.75,
    returns: 10.2,
    returns3m: 2.0,
    aum: 5600,
    expenseRatio: 0.95,
    inception: '2010-03-18',
    riskLevel: "Moderate",
    description: "Focused portfolio of large-cap leaders with a long-term investment horizon.",
    holdings: [
      { name: 'TCS', weight: 6.1 },
      { name: 'Infosys', weight: 4.2 }
    ]
    ,
    history: [
      { date: '2025-01-01', value: 40 },
      { date: '2025-02-01', value: 42 },
      { date: '2025-03-01', value: 44 },
      { date: '2025-04-01', value: 46 },
      { date: '2025-05-01', value: 47 },
      { date: '2025-06-01', value: 48 },
      { date: '2025-07-01', value: 49 },
      { date: '2025-08-01', value: 49.5 },
      { date: '2025-09-01', value: 50 },
      { date: '2025-10-01', value: 51 },
      { date: '2025-11-01', value: 50.5 }
    ]
  },
  {
    id: 4,
    name: "Nippon India Multi Cap Fund",
    category: "Multi Cap",
    nav: 102.12,
    returns: 9.4,
    returns3m: 1.6,
    aum: 3100,
    expenseRatio: 1.12,
    inception: '2015-11-22',
    riskLevel: "Moderate",
    description: "Flexible multi-cap fund with allocation across market caps to capture opportunities across cycles.",
    holdings: [
      { name: 'Hindustan Unilever', weight: 3.4 },
      { name: 'Asian Paints', weight: 2.9 }
    ]
    ,
    history: [
      { date: '2025-01-01', value: 95 },
      { date: '2025-02-01', value: 96 },
      { date: '2025-03-01', value: 97 },
      { date: '2025-04-01', value: 98 },
      { date: '2025-05-01', value: 100 },
      { date: '2025-06-01', value: 101 },
      { date: '2025-07-01', value: 103 },
      { date: '2025-08-01', value: 104 },
      { date: '2025-09-01', value: 105 },
      { date: '2025-10-01', value: 104 },
      { date: '2025-11-01', value: 102 }
    ]
  },
  {
    id: 5,
    name: "ICICI Prudential Balanced Advantage Fund",
    category: "Hybrid",
    nav: 67.88,
    returns: 8.7,
    returns3m: 1.2,
    aum: 9800,
    expenseRatio: 0.85,
    inception: '2006-01-10',
    riskLevel: "Low-Moderate",
    description: "Hybrid fund that dynamically allocates between equity and debt to manage risk and returns.",
    holdings: [
      { name: 'HDFC', weight: 2.1 },
      { name: 'Government Bonds', weight: 35.0 }
    ]
    ,
    history: [
      { date: '2025-01-01', value: 58 },
      { date: '2025-02-01', value: 59 },
      { date: '2025-03-01', value: 60 },
      { date: '2025-04-01', value: 61 },
      { date: '2025-05-01', value: 62 },
      { date: '2025-06-01', value: 63 },
      { date: '2025-07-01', value: 64 },
      { date: '2025-08-01', value: 64.5 },
      { date: '2025-09-01', value: 65 },
      { date: '2025-10-01', value: 66 },
      { date: '2025-11-01', value: 65.5 }
    ]
  }
];

export default sampleFunds;
