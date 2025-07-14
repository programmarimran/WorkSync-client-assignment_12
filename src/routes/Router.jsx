import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/homePage/home/Home";
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
]);
export default router;
