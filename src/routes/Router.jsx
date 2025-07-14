import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/homePage/home/Home";
import ErrorPage from "../pages/error/ErrorPage";
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
    path:"*",
    Component:ErrorPage
  }
]);
export default router;
