import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/homePage/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/email&password/Login";
import Register from "../pages/auth/email&password/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Contact from "../pages/contact/Contact";
import DashboardHome from "../pages/dashboard/dashboardHome/home/DashboardHome";
import WorkSheetPage from "../pages/dashboard/employ/workSheetPage/WorkSheetPage";
import UpdateProfile from "../pages/auth/updateProfile/UpdateProfile";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "update-profile",
        Component: UpdateProfile,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "work-sheet",
        Component: WorkSheetPage,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
export default router;
