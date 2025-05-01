// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { signInUser } from '../api/auth';
// import { SetAuthToken } from '../config/axios-configuration';

// function SignIn() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const { token, user } = await signInUser(formData);

//       // ✅ Set token globally for axios and store in localStorage
//       SetAuthToken(token);
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));

//       // ✅ Role-based navigation
//       if (user.userRole === 'employee') {
//         navigate('/dashboard/employee');
//       } else if (user.userRole === 'employer') {
//         navigate('/dashboard/employer');
//       }
      

//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Sign In</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/sign-up">Sign Up</Link>
//       </p>
//     </div>
//   );
// }

// export default SignIn;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../api/auth';
import { SetAuthToken } from '../config/axios-configuration';

import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Alert,
  Paper
} from '@mui/material';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token, user } = await signInUser(formData);
      SetAuthToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.userRole === 'employee') {
        navigate('/dashboard/employee');
      } else if (user.userRole === 'employer') {
        navigate('/dashboard/employer');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>

        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignIn;
