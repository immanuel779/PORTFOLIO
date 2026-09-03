import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if the admin token exists in localStorage
  const token = localStorage.getItem('adminToken');

  // If no token, redirect straight to the login page
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // If token exists, show the dashboard
  return children;
}