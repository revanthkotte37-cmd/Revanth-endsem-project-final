export interface FundReturns {
  oneYear: number;
  threeYear: number;
  fiveYear: number;
}

export interface Holding {
  name: string;
  percentage: number;
}

export interface MutualFund {
  id: string;
  name: string;
  category: string;
  riskLevel: 'low' | 'moderate' | 'high' | string;
  nav: number;
  aum: number;
  expenseRatio: number;
  returns: FundReturns;
  holdings?: Holding[];
  description?: string;
}
