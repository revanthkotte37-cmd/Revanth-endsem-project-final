import { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { Grid } from '../components/common/CustomGrid';
import type { SelectChangeEvent } from '@mui/material';
import FundCard from '../components/funds/FundCard';
import type { MutualFund } from '../types/fund';

const FundsList = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [risk, setRisk] = useState('all');

  const [funds] = useState<MutualFund[]>([
    {
      id: '1',
      name: 'Large Cap Growth Fund',
      category: 'Equity',
      riskLevel: 'moderate',
      nav: 245.67,
      aum: 15000000000,
      expenseRatio: 1.2,
      returns: {
        oneYear: 12.5,
        threeYear: 15.3,
        fiveYear: 14.2
      },
      holdings: [
        { name: 'HDFC Bank', percentage: 8.5 },
        { name: 'Infosys', percentage: 7.2 },
      ],
      description: 'A large-cap focused equity fund aiming for long-term capital appreciation.'
    },
  ]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleRiskChange = (event: SelectChangeEvent) => {
    setRisk(event.target.value);
  };

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || fund.category === category;
    const matchesRisk = risk === 'all' || fund.riskLevel === risk;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Explore Mutual Funds
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Funds"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Debt">Debt</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="Index">Index</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={risk}
                label="Risk Level"
                onChange={handleRiskChange}
              >
                <MenuItem value="all">All Risk Levels</MenuItem>
                <MenuItem value="low">Low Risk</MenuItem>
                <MenuItem value="moderate">Moderate Risk</MenuItem>
                <MenuItem value="high">High Risk</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredFunds.map((fund) => (
          <Grid item xs={12} sm={6} md={4} key={fund.id}>
            <FundCard fund={fund} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FundsList;
