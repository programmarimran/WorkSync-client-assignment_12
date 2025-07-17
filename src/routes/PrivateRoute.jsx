import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router";
import LoadingPage from "../components/Loadingpage";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location.pathname;
// console.log(loading)
  if (loading) {
    return <LoadingPage/>;
  }

  if (!user) {
    return <Navigate to="/login" state={from} replace />;
  }

  return children;
};

export default PrivateRoute;
