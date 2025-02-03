import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const handleAuth = async (provider, formData, isRegister) => {
  try {
    const endpoint = isRegister ? 'register' : 'login';
    const response = await axios.post(`http://localhost:5000/${endpoint}`, {
      username: formData.get('email'),
      password: formData.get('password'),
    });
    if (!isRegister) {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    } else {
      window.location.href = '/login';
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Something went wrong');
  }
};

export function Login() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={(provider, formData) => handleAuth(provider, formData, false)} providers={providers} slotProps={{ emailField: { autoFocus: false } }} />
    </AppProvider>
  );
}

export function Register() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={(provider, formData) => handleAuth(provider, formData, true)} providers={providers} slotProps={{ emailField: { autoFocus: false } }} />
    </AppProvider>
  );
}