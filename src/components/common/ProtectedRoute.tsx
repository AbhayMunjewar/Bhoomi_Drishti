import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, getAuthorizedPortalPath } = useAuthStore();

  // 1. If not authenticated, redirect to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If user role is not authorized for this specific portal, redirect to their assigned portal
  if (!allowedRoles.includes(user.role)) {
    const defaultPath = getAuthorizedPortalPath();
    return <Navigate to={defaultPath} replace />;
  }

  // 3. Authorized access granted
  return <Outlet />;
};
