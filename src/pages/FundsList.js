import React, { useState, useMemo } from 'react';
import FundCard from '../components/FundCard';
import sampleFunds from '../data/funds';

const PAGE_SIZE = 6;

const FundsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('returns_desc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let arr = sampleFunds.slice();
    if (searchTerm.trim()) {
      arr = arr.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== 'all') arr = arr.filter(f => f.category === categoryFilter);
    if (riskFilter !== 'all') arr = arr.filter(f => f.riskLevel === riskFilter);

    if (sortBy === 'returns_desc') arr.sort((a,b)=> b.returns - a.returns);
    if (sortBy === 'aum_desc') arr.sort((a,b)=> b.aum - a.aum);
    if (sortBy === 'expense_asc') arr.sort((a,b)=> a.expenseRatio - b.expenseRatio);

    return arr;
  }, [searchTerm, categoryFilter, riskFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Explore Mutual Funds</h1>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search funds..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minWidth: 200 }}
        />

        <select value={categoryFilter} onChange={(e)=>{ setCategoryFilter(e.target.value); setPage(1); }} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="all">All Categories</option>
          {Array.from(new Set(sampleFunds.map(f=>f.category))).map(c=> <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={riskFilter} onChange={(e)=>{ setRiskFilter(e.target.value); setPage(1); }} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="all">All Risk Levels</option>
          {Array.from(new Set(sampleFunds.map(f=>f.riskLevel))).map(r=> <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={sortBy} onChange={(e)=>{ setSortBy(e.target.value); setPage(1); }} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="returns_desc">Sort: 1Y Returns (high → low)</option>
          <option value="aum_desc">Sort: AUM (high → low)</option>
          <option value="expense_asc">Sort: Expense Ratio (low → high)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px 0' }}>
        {pageItems.map(fund => (<FundCard key={fund.id} fund={fund} />))}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        <button onClick={()=> setPage(p=> Math.max(1, p-1))} disabled={page===1}>Prev</button>
        <div>Page {page} / {totalPages}</div>
        <button onClick={()=> setPage(p=> Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
      </div>
    </div>
  );
};

export default FundsList;