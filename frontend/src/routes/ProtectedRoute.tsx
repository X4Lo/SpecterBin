import React from "react";
import { Navigate } from "react-router-dom";
import authService from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
