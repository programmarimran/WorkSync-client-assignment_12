import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location.pathname;

  if (loading) {
    return <p>.... loading</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={from} replace />;
  }

  return children;
};

export default PrivateRoute;
