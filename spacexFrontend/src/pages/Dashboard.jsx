import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
});

function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'operator',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch users
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new user
  const addOrder = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/users', formData);
      fetchOrders(); // Refresh users
      setFormData({ username: '', password: '', role: '' }); // Clear inputs
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteOrder = async (userId) => {
    try {
      console.log('Deleting user with ID:', userId);
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      
      // Check if the response is successful
      if (response.status === 200) {
        console.log('User deleted successfully');
        fetchOrders(); // Refresh the orders after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again.');
    }
  };
  
  

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">Users</Typography>

          {/* Input Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
            <TextField
              label="Email/Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 300 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 300 }}
            />
            <TextField
              label="Role"
              name="role"
              select
              value={formData.role}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 300 }}
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
            </TextField>

            {/* Add User Button */}
            <Button variant="contained" onClick={addOrder}>Add User</Button>
          </Box>

          {/* Display Users */}
          {orders.map((order) => (
            <Box key={order._id} sx={{ mt: 2, p: 2, border: '1px solid #ccc' }}>
              <Typography>Username: {order.username}</Typography>
              <Typography>Password: {order.password}</Typography>
              <Typography>Role: {order.role}</Typography>

              {/* Delete Button */}
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => deleteOrder(order._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = { window: PropTypes.func };
export default Dashboard;
