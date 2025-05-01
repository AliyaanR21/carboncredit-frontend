// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { SetAuthToken, AxiosBaseUrl } from '../config/axios-configuration';

// AxiosBaseUrl(); // ✅ Initialize axios base URL globally once

// const EmployerDashboard = () => {
//   const [trips, setTrips] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [actionError, setActionError] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       SetAuthToken(token);
//     }

//     const fetchTrips = async () => {
//       try {
//         const response = await axios.get('/trip/admin/trips');
//         const tripsData = response.data.trips || [];
//         setTrips(tripsData);
//       } catch (err) {
//         console.error('Error fetching trips:', err);
//         setError('Failed to fetch trip requests.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);

//   const handleApprove = async (tripId) => {
//     try {
//       setActionError('');
//       setMessage('');
//       await axios.post(`/trip/admin/trip/${tripId}/approve`);
//       setTrips(prevTrips =>
//         prevTrips.map(trip =>
//           trip._id === tripId ? { ...trip, tripStatus: 'verified' } : trip
//         )
//       );
//       setMessage('Trip approved successfully.');
//     } catch (err) {
//       console.error('Error approving trip:', err);
//       const errMsg = err.response?.data?.error || err.response?.data?.message;
//       setActionError(errMsg || 'Failed to approve the trip.');
//     }
//   };

//   const handleReject = async (tripId) => {
//     try {
//       setActionError('');
//       setMessage('');
//       await axios.post(`/trip/admin/trip/${tripId}/reject`);
//       setTrips(prevTrips =>
//         prevTrips.map(trip =>
//           trip._id === tripId ? { ...trip, tripStatus: 'rejected' } : trip
//         )
//       );
//       setMessage('Trip rejected successfully.');
//     } catch (err) {
//       console.error('Error rejecting trip:', err);
//       const errMsg = err.response?.data?.error || err.response?.data?.message;
//       setActionError(errMsg || 'Failed to reject the trip.');
//     }
//   };

//   const displayedTrips = filter === 'all'
//     ? trips
//     : trips.filter(trip => trip.tripStatus === filter);

//   if (loading) return <div>Loading trip requests...</div>;
//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <div className="employer-dashboard">
//       <div style={{ marginBottom: '1rem' }}>
//         <label>
//           Show:
//           <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: '0.5rem' }}>
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="verified">Verified</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </label>
//       </div>

//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {actionError && <p style={{ color: 'red' }}>Error: {actionError}</p>}

//       {displayedTrips.length === 0 ? (
//         <p>No trip requests found.</p>
//       ) : (
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Date</th>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Mode</th>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Distance</th>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Credits</th>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Status</th>
//               <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '8px' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedTrips.map((trip) => (
//               <tr key={trip._id}>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{trip.tripDate}</td>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{trip.tripMode}</td>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{trip.tripDistance}</td>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{trip.tripCredits}</td>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{trip.tripStatus}</td>
//                 <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
//                   {trip.tripStatus === 'pending' ? (
//                     <>
//                       <button onClick={() => handleApprove(trip._id)} style={{ marginRight: '0.5rem' }}>Approve</button>
//                       <button onClick={() => handleReject(trip._id)}>Reject</button>
//                     </>
//                   ) : '---'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default EmployerDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Select, MenuItem, Box, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Button, Alert
} from '@mui/material';
import { SetAuthToken, AxiosBaseUrl } from '../config/axios-configuration';

AxiosBaseUrl();

const EmployerDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      SetAuthToken(token);
    }

    const fetchTrips = async () => {
      try {
        const response = await axios.get('/trip/admin/trips');
        setTrips(response.data.trips || []);
      } catch (err) {
        setError('Failed to fetch trip requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleApprove = async (tripId) => {
    try {
      setActionError('');
      setMessage('');
      await axios.post(`/trip/admin/trip/${tripId}/approve`);
      setTrips(prevTrips =>
        prevTrips.map(trip =>
          trip._id === tripId ? { ...trip, tripStatus: 'verified' } : trip
        )
      );
      setMessage('Trip approved successfully.');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message;
      setActionError(errMsg || 'Failed to approve the trip.');
    }
  };

  const handleReject = async (tripId) => {
    try {
      setActionError('');
      setMessage('');
      await axios.post(`/trip/admin/trip/${tripId}/reject`);
      setTrips(prevTrips =>
        prevTrips.map(trip =>
          trip._id === tripId ? { ...trip, tripStatus: 'rejected' } : trip
        )
      );
      setMessage('Trip rejected successfully.');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message;
      setActionError(errMsg || 'Failed to reject the trip.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/sign-in';
  };

  const displayedTrips = filter === 'all'
    ? trips
    : trips.filter(trip => trip.tripStatus === filter);

  if (loading) return <div>Loading trip requests...</div>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employer Dashboard</Typography>
        <Button onClick={handleLogout} color="error" variant="outlined">Logout</Button>
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="subtitle1" mr={2}>Filter:</Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="verified">Verified</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}

      {displayedTrips.length === 0 ? (
        <Typography>No trip requests found.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedTrips.map(trip => (
                <TableRow key={trip._id}>
                  <TableCell>{trip.tripDate}</TableCell>
                  <TableCell>{trip.tripMode}</TableCell>
                  <TableCell>{trip.tripDistance}</TableCell>
                  <TableCell>{trip.tripCredits}</TableCell>
                  <TableCell>{trip.tripStatus}</TableCell>
                  <TableCell>
                    {trip.tripStatus === 'pending' ? (
                      <>
                        <Button size="small" onClick={() => handleApprove(trip._id)} sx={{ mr: 1 }} variant="contained" color="success">
                          Approve
                        </Button>
                        <Button size="small" onClick={() => handleReject(trip._id)} variant="contained" color="error">
                          Reject
                        </Button>
                      </>
                    ) : '---'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default EmployerDashboard;
