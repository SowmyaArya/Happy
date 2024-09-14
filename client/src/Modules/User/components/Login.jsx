import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const API_HOST = "http://localhost:5002";
  const API_ENDPOINT = "/api/user/Login";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    axios.post(`${API_HOST}${API_ENDPOINT}`, formData)
      .then((res) => {
        if (res.data.success) {
          // Store the token and userId in localStorage
          localStorage.setItem('userToken', res.data.userToken);
          localStorage.setItem('userId', res.data.userId);

          setMessage({ type: 'success', text: 'Login successful!' });
          setLoginSuccess(true);
        } else {
          setMessage({ type: 'error', text: res.data.message });
        }
      })
      .catch((err) => {
        setMessage({ type: 'error', text: 'There was an error logging in!' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate('/'); // Adjust path as needed
      }, 2000); // Display the success message for 2 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [loginSuccess, navigate]);

  return (
    <div style={{
      background: 'linear-gradient(to left  ,#009900,#19334d ,#19334d)',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}>
      <Container maxWidth="xs">
        <Card style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '2rem'
        }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff' }}>
              Log In
            </Typography>
            {message.text && (
              <Alert severity={message.type} style={{ marginBottom: '1rem' }}>
                {message.text}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' }
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}
                style={{
                  marginTop: '1rem',
                  borderRadius: '50px',
                  background: 'white',
                  color: '#7b4397',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}>
                {loading ? 'Logging In...' : 'Log In'}
              </Button>
            </form>
            <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
              Don't have an account?{' '}
              <Link to="/Register" style={{ textDecoration: 'none', color: 'white' }}>
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
