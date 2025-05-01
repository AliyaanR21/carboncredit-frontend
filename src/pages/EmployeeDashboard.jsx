// // src/pages/EmployeeDashboard.jsx
// import { useEffect, useState } from 'react';
// import { AxiosBaseUrl } from '../config/axios-configuration';
// const axios = AxiosBaseUrl();

// import { useNavigate } from 'react-router-dom';

// function EmployeeDashboard() {
//   const [tripDate, setTripDate] = useState('');
//   const [tripMode, setTripMode] = useState('');
//   const [tripDistance, setTripDistance] = useState('');
//   const [tripProof, setTripProof] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [trips, setTrips] = useState([]);

//   const tripModes = ['bike', 'walk', 'bus', 'train', 'carpool', 'car', 'bicycle'];

//   const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   navigate('/sign-in');
// };

//   const fetchTrips = async () => {
//     try {
//       const response = await axios.get('/trip/my-trips');
//       setTrips(response.data.trips || []);
//     } catch (err) {
//       console.error('Error fetching trips:', err);
//       setError('Could not load trips.');
//     }
//   };

//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/trip/add-trip', {
//         tripDate,
//         tripMode,
//         tripDistance: Number(tripDistance),
//         tripCredits: Number(tripDistance) * 10,
//         tripProof
//       });
//       setMessage('Trip submitted successfully!');
//       setError('');
//       setTripDate('');
//       setTripMode('');
//       setTripDistance('');
//       setTripProof('');
//       fetchTrips(); // refresh list
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.error || 'Something went wrong');
//       setMessage('');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
//       <div style={{ flex: 1 }}>
//         <h2>Submit a New Trip</h2>
//         <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
//           <input type="date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} required />
//           <select value={tripMode} onChange={(e) => setTripMode(e.target.value)} required>
//             <option value="">Select mode</option>
//             {tripModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
//           </select>
//           <input type="number" value={tripDistance} onChange={(e) => setTripDistance(e.target.value)} placeholder="Distance (km)" required />
//           <input type="text" value={tripProof} onChange={(e) => setTripProof(e.target.value)} placeholder="Proof (URL or note)" />
//           <button type="submit">Submit</button>
//         </form>
//         {message && <p style={{ color: 'green' }}>{message}</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>

//       <div style={{ flex: 1, marginLeft: '2rem' }}>
//         <h2>Previous Trips</h2>
//         {trips.length === 0 ? (
//           <p>No trips submitted yet.</p>
//         ) : (
//           <table border="1" cellPadding="5">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Mode</th>
//                 <th>Distance</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {trips.map((trip) => (
//                 <tr key={trip._id}>
//                   <td>{trip.tripDate}</td>
//                   <td>{trip.tripMode}</td>
//                   <td>{trip.tripDistance} km</td>
//                   <td>{trip.tripStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDashboard;

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, MenuItem, Button, Alert, Table, TableHead,
  TableBody, TableRow, TableCell, Paper, Box
} from '@mui/material';
import axios from 'axios';
import { SetAuthToken, AxiosBaseUrl } from '../config/axios-configuration';

AxiosBaseUrl(); // Set the base URL globally once

const tripModes = ['bike', 'walk', 'bus', 'train', 'carpool', 'car', 'bicycle'];

function EmployeeDashboard() {
  const [form, setForm] = useState({
    tripDate: '',
    tripMode: '',
    tripDistance: '',
    tripProof: ''
  });
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load auth token and user's existing trips
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      SetAuthToken(token);
    }

    const fetchTrips = async () => {
      try {
        const res = await axios.get('/trip/my-trips');
        setTrips(res.data.trips || []);
      } catch (err) {
        setError('Failed to load your trips');
      }
    };

    fetchTrips();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      ...form,
      tripDistance: Number(form.tripDistance),
      tripCredits: Number(form.tripDistance) * 10
    };

    try {
      const res = await axios.post('/trip/add-trip', payload);
      setMessage('Trip submitted successfully!');
      setForm({ tripDate: '', tripMode: '', tripDistance: '', tripProof: '' });

      // Refresh trips
      const tripsRes = await axios.get('/trip/my-trips');
      setTrips(tripsRes.data.trips || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/sign-in';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employee Dashboard</Typography>
        <Button onClick={handleLogout} color="error" variant="outlined">Logout</Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Submit New Trip</Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="date"
            name="tripDate"
            label="Trip Date"
            InputLabelProps={{ shrink: true }}
            value={form.tripDate}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            name="tripMode"
            label="Trip Mode"
            value={form.tripMode}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            {tripModes.map(mode => (
              <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            type="number"
            name="tripDistance"
            label="Trip Distance (km)"
            value={form.tripDistance}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="tripProof"
            label="Proof (optional)"
            value={form.tripProof}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Trip
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>My Trips</Typography>
      {trips.length === 0 ? (
        <Typography>No trips submitted yet.</Typography>
      ) : (
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Distance (km)</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip._id}>
                <TableCell>{trip.tripDate}</TableCell>
                <TableCell>{trip.tripMode}</TableCell>
                <TableCell>{trip.tripDistance}</TableCell>
                <TableCell>{trip.tripCredits}</TableCell>
                <TableCell>{trip.tripStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default EmployeeDashboard;
