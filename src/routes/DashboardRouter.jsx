// src/routes/DashboardRouter.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardRouter() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/sign-in');
      return;
    }
    setRole(user.userRole.toLowerCase());
    navigate(`/dashboard/${user.userRole.toLowerCase()}`);
  }, [navigate]);

  return <p>Redirecting...</p>;
}

export default DashboardRouter;
