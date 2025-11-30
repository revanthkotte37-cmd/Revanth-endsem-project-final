import { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material';
import { Grid } from '../components/common/CustomGrid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import DashboardLayout, { DashboardCard } from '../components/dashboard/DashboardLayout';
import UserFormDialog from '../components/admin/UserFormDialog';
import AuditLogComponent from '../components/admin/AuditLogComponent';
import type { User } from '../types/user';

const AdminDashboard = () => {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Mock data - would come from Redux store in real app
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'investor@example.com',
      name: 'John Doe',
      role: 'investor',
      createdAt: new Date('2025-01-01')
    },
    {
      id: '2',
      email: 'advisor@example.com',
      name: 'Jane Smith',
      role: 'advisor',
      createdAt: new Date('2025-02-15')
    }
  ]);

  const platformStats = {
    totalUsers: users.length,
    totalFunds: 45,
    totalTransactions: 1250,
    totalAUM: '₹2,500 Cr'
  };

  const handleAddUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    // Would dispatch to Redux action in real app
    console.log('Adding user:', userData);
    setOpenUserForm(false);
    setSnackbar({
      open: true,
      message: 'User added successfully',
      severity: 'success'
    });
  };

  const handleDeleteUser = (userId: string) => {
    // Would dispatch to Redux action in real app
    console.log('Deleting user:', userId);
    setSnackbar({
      open: true,
      message: 'User deleted successfully',
      severity: 'success'
    });
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Platform Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Users</Typography>
              <Typography variant="h4">{platformStats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Funds</Typography>
              <Typography variant="h4">{platformStats.totalFunds}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Transactions</Typography>
              <Typography variant="h4">{platformStats.totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total AUM</Typography>
              <Typography variant="h4">{platformStats.totalAUM}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Management */}
      <Box sx={{ mt: 4 }}>
        <DashboardCard title="User Management">
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenUserForm(true)}
            >
              Add New User
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt ? user.createdAt.toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => console.log('Edit user:', user.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      </Box>

      {/* System Settings */}
      <Box sx={{ mt: 4 }}>
        <DashboardCard title="System Settings">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" fullWidth>
                Configure Email Notifications
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" fullWidth>
                Manage Platform Settings
              </Button>
            </Grid>
          </Grid>
        </DashboardCard>
      </Box>

      {/* Audit Log */}
      <Box sx={{ mt: 4 }}>
        <AuditLogComponent />
      </Box>

      {/* Dialogs and Notifications */}
      <UserFormDialog
        open={openUserForm}
        onClose={() => setOpenUserForm(false)}
        onSubmit={handleAddUser}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default AdminDashboard;