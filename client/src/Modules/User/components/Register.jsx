// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Alert
// } from '@mui/material';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// function Register() {
//   const API_HOST = "http://localhost:5002";
//   const API_ENDPOINT = "/api/user/Useradd";

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });
    
//     axios.post(`${API_HOST}${API_ENDPOINT}`, formData)
//       .then((res) => {
//         setMessage({ type: 'success', text: 'Registration successful!' });
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           address: '',
//           password: '',
//         });
//       })
//       .catch((err) => {
//         setMessage({ type: 'error', text: 'There was an error submitting the form!' });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: '2rem' }}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <Card style={{ background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(30px)' }}>
//             <CardContent>
//               <Typography variant="h4" gutterBottom>
//                 Sign up now
//               </Typography>
//               {message.text && (
//                 <Alert severity={message.type} style={{ marginBottom: '1rem' }}>
//                   {message.text}
//                 </Alert>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Name"
//                       name="name"
//                       fullWidth
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Email"
//                       name="email"
//                       type="email"
//                       fullWidth
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Phone"
//                       name="phone"
//                       type="tel"
//                       fullWidth
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Address"
//                       name="address"
//                       fullWidth
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Password"
//                       name="password"
//                       type="password"
//                       fullWidth
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                 </Grid>
//                 <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
//                   {loading ? 'Signing Up...' : 'Sign Up'}
//                 </Button>
//               </form>
//               <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
//                 Already have an account?{' '}
//                 <Link to="/Login" style={{ textDecoration: 'none', color: '#3f51b5' }}>
//                   Log in
//                 </Link>
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <img
//             src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
//             alt="Decorative"
//             style={{ width: '100%', borderRadius: '4px', boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.1)' }}
//           />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';

function Register() {
  const API_HOST = "http://localhost:5002";
  const API_ENDPOINT = "/api/user/Useradd";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validate = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'address':
        if (!value) {
          error = 'Address is required';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are valid
    const isValid = Object.keys(formData).every((key) => validate(key, formData[key]));
    if (!isValid) {
      setMessage({ type: 'error', text: 'Please fix the errors in the form' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    axios.post(`${API_HOST}${API_ENDPOINT}`, formData)
      .then((res) => {
        setMessage({ type: 'success', text: 'Registration successful!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          password: '',
        });
        setErrors({});
      })
      .catch((err) => {
        setMessage({ type: 'error', text: 'There was an error submitting the form!' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              Register
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
                    label="Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
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
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
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
                    label="Phone"
                    name="phone"
                    type="tel"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
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
                    label="Address"
                    name="address"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={!!errors.address}
                    helperText={errors.address}
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
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      style: { color: 'white' }
                    }}
                    InputLabelProps={{
                      style: { color: 'white' }
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="remember" color="primary" />}
                    label="I agree to the terms and conditions"
                    style={{ color: 'white' }}
                  />
                </Grid> */}
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
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
            <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
              Already have an account?{' '}
              <Link to="/Login" style={{ textDecoration: 'none', color: 'white' }}>
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
