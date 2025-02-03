import React from 'react';

const AccessDenied = () => {
  

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Access Denied</h1>
        <p style={styles.message}>
          You do not have permission to view this page. Please contact the administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    color: '#d9534f',
    fontSize: '36px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#f0ad4e',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AccessDenied;
