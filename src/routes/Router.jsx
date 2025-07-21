import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/homePage/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/email&password/Login";
import Register from "../pages/auth/email&password/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
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
import AllEmployeeListPage from "../pages/dashboard/admin/allEmploypagelist/AllEmployeeListPage";
import AdminRoute from "./AdminRoute";
import AdminPayrollPage from "../pages/dashboard/admin/payrollPage/AdminPayrollPage";
import ContactUs from "../pages/contact/ContactUs";
import AdminContactMessages from "../pages/dashboard/admin/contacmessage/AdminContactMessages";
import EmployeeAttendance from "../pages/dashboard/dashboardHome/employeeDashboard/EmployeeAttendance";
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
        path: "contact-us",
        Component: ContactUs,
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
        path: "employee-attendence",
        element: (
          <EmployeeRoute>
            <EmployeeAttendance />
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
      {
        path: "all-employee-list",
        element: (
          <AdminRoute>
            <AllEmployeeListPage />
          </AdminRoute>
        ),
      },
      {
        path: "admin-payroll",
        element: (
          <AdminRoute>
            <AdminPayrollPage />
          </AdminRoute>
        ),
      },
      {
        path: "contac-message",
        element: (
          <AdminRoute>
            <AdminContactMessages />
          </AdminRoute>
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
