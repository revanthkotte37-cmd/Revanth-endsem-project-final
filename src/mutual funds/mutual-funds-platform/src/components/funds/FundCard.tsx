import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box
} from '@mui/material';
import type { MutualFund } from '../../types/fund';

interface FundCardProps {
  fund: MutualFund;
}

const FundCard: React.FC<FundCardProps> = ({ fund }) => {
  const navigate = useNavigate();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'moderate': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {fund.name}
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          <Chip 
            label={fund.category} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={`${fund.riskLevel} risk`} 
            size="small" 
            color={getRiskColor(fund.riskLevel)} 
          />
        </Stack>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            NAV: ₹{fund.nav.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AUM: ₹{(fund.aum / 10000000).toFixed(2)}Cr
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expense Ratio: {fund.expenseRatio}%
          </Typography>
        </Box>
        <Typography variant="subtitle2" gutterBottom>
          Returns
        </Typography>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            1Y: {fund.returns.oneYear}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            3Y: {fund.returns.threeYear}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            5Y: {fund.returns.fiveYear}%
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={() => navigate(`/fund/${fund.id}`)}
        >
          View Details
        </Button>
        <Button 
          size="small" 
          color="primary"
          onClick={() => navigate(`/invest/${fund.id}`)}
        >
          Invest Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default FundCard;