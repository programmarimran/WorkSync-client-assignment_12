import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/homePage/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/email&password/Login";
import Register from "../pages/auth/email&password/Register";
const router = createBrowserRouter([
  {
    path: "/",
    Component:HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      }
    ]
  }
  ,
  {
    path:"*",
    Component:ErrorPage
  }
]);
export default router;
