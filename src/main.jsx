import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Register = lazy(() => import("./pages/Register/Register"));
const Home = lazy(() => import("./pages/Home/Home"));
// const Auth = lazy(() => import('./service/Auth/Auth'))
const Login = lazy(() => import('./pages/Login/Login.jsx'))
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
    // children: [
    //   {
    //     path: "/home",
    //     element: <Home />,
    //   },
    // ],
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<p>...Loading</p>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
