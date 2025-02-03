import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { Button, Box } from '@mui/material';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData) => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      username: formData.get('email'),
      password: formData.get('password'),
    });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/home';
  } catch (err) {
    alert('Invalid credentials');
  }
};

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          title: { children: 'Login' }, // Change title
          submitButton: { children: 'Login' }, // Change button text
        }}
      />
      <Box textAlign="center"  mt={-15}>
        <Button variant="outlined" onClick={() => navigate('/register')}>
          Register
        </Button>
      </Box>
    </AppProvider>
  );
}
