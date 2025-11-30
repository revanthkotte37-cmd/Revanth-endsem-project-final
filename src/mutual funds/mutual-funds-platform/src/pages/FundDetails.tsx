import React from 'react';
import {
  Box,
  Typography,
  Paper,

  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Grid } from '../components/common/CustomGrid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data - in a real app this would come from an API / Redux store
const mockFund = {
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
    fiveYear: 14.2,
  },
  holdings: [
    { name: 'HDFC Bank', percentage: 8.5 },
    { name: 'Infosys', percentage: 7.2 },
    { name: 'TCS', percentage: 6.1 },
  ],
};

// Generate sample NAV history
const navHistory = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  nav: +(230 + Math.sin(i / 4) * 5 + i * 0.4).toFixed(2),
}));

const chartData = {
  labels: navHistory.map((d) => d.date),
  datasets: [
    {
      label: 'NAV',
      data: navHistory.map((d) => d.nav),
      borderColor: '#3f51b5',
      backgroundColor: 'rgba(63,81,181,0.1)',
      tension: 0.2,
      pointRadius: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: '30-day NAV History' },
  },
  scales: {
    x: { display: true },
    y: { display: true },
  },
};

const FundDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real app we'd load the fund by id; here we use the mock
  const fund = mockFund;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {fund.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography color="textSecondary">Category: {fund.category}</Typography>
                  <Typography color="textSecondary">Risk: {fund.riskLevel}</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>NAV: ₹{fund.nav.toFixed(2)}</Typography>
                  <Typography color="textSecondary">AUM: ₹{(fund.aum / 10000000).toFixed(2)}Cr</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/invest/${id || fund.id}`)}>
                    Invest
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Key Returns</Typography>
              <Typography>1Y: {fund.returns.oneYear}%</Typography>
              <Typography>3Y: {fund.returns.threeYear}%</Typography>
              <Typography>5Y: {fund.returns.fiveYear}%</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Fund Details</Typography>
              <Typography variant="body2">Expense Ratio: {fund.expenseRatio}%</Typography>
              <Typography variant="body2">Fund ID: {fund.id}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Top Holdings</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Holding</TableCell>
                  <TableCell align="right">%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fund.holdings?.map((h) => (
                  <TableRow key={h.name}>
                    <TableCell>{h.name}</TableCell>
                    <TableCell align="right">{h.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FundDetails;
