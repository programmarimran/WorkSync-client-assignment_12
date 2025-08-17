import { Outlet } from "react-router";
import Navbar from "../shared/navbar/Navbar";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const context = useAuth();
  const showNavAuthLayout = context.showNavAuthLayout;
  return (
    <>
      {showNavAuthLayout ? "" : <Navbar />}

      <Outlet></Outlet>
    </>
  );
};

export default AuthLayout;
