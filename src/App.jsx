// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashboardRouter from './routes/DashboardRouter';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
      <Route path="/dashboard/employer" element={<EmployerDashboard />} />
    </Routes>
  );
}

export default App;
