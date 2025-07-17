import { Navigate, useLocation } from "react-router";

import LoadingPage from "../components/Loadingpage";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <LoadingPage />;
  }

  if (user && role === "admin") {
    return children;
  }

  if (user && role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
