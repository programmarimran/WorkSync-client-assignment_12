import { Navigate, useLocation } from "react-router";

import LoadingPage from "../components/Loadingpage";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if ( roleLoading ) {
    return <LoadingPage />;
  }
if(loading){
  return <LoadingPage/>
}
  if (user && role === "Employee") {
    return children;
  }

  if (user && role !== "Employee") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default EmployeeRoute;
