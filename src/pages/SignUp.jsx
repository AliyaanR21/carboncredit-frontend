// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { signUpUser } from '../api/auth';

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     userRole: 'employee'
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await signUpUser(formData);
//       navigate('/sign-in');
//     } catch (err) {
//       setError(err?.response?.data?.error || 'Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//         <br />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <br />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <br />
//         <select name="userRole" value={formData.userRole} onChange={handleChange}>
//           <option value="employee">Employee</option>
//           <option value="employer">Employer</option>
//         </select>
//         <br />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <Link to="/sign-in">Sign in here</Link></p>
//     </div>
//   );
// }

// export default SignUp;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../api/auth';

import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper
} from '@mui/material';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userRole: 'employee'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signUpUser(formData);
      navigate('/sign-in');
    } catch (err) {
      setError(err?.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
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
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <FormControl fullWidth margin="normal">
            <InputLabel>User Role</InputLabel>
            <Select
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              required
              label="User Role"
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2">
          Already have an account?{' '}
          <Link to="/sign-in" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign in here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignUp;
