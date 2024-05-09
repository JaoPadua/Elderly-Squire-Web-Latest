import React from 'react';

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20vh',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
  },
};

export default ErrorPage;
