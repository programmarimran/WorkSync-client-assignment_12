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
import PaymentHistory from "../pages/dashboard/employ/payment/PaymentHistory";
import EmployeeListPage from "../pages/dashboard/hr/employeeListPage/EmployeeListPage";
import EmployeeDetailsPage from "../pages/dashboard/hr/details/EmployeeDetailsPage";
import DashboardProfileUpdate from "../pages/auth/updateProfile/DashboardProfileUpdate";
import ForbiddenPage from "../pages/error/ForbiddenPage";
import EmployeeRoute from "./EmployeeRoute";
import HrRoute from "./HrRoute";
import ProgressPage from "../pages/dashboard/hr/progress/Progresspage";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: ErrorPage,
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
    errorElement: ErrorPage,
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
    errorElement: ErrorPage,
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
        path: "profile-update",
        Component: DashboardProfileUpdate,
      },
      {
        path: "work-sheet",
        element: (
          <EmployeeRoute>
            <WorkSheetPage />
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory />
          </EmployeeRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HrRoute>
            <EmployeeListPage />
          </HrRoute>
        ),
      },
      {
        path: "details/:slug",
        element: (
          <HrRoute>
            <EmployeeDetailsPage />
          </HrRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HrRoute>
            <ProgressPage />
          </HrRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "forbidden",
    Component: ForbiddenPage,
  },
]);
export default router;
