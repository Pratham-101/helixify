import React from "react";
import SidebarDrawer from "./components/SidebarDrawer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Appointment from "./components/Appointment";
import Symptoms from "./components/Symptoms";  
import ConnectDoctors from "./components/ConnectDoctors";  
import User from "./components/User";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SidebarDrawer />
      <Outlet />
    </React.Fragment>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
      {
        path: "symptoms",  // Add a route for Symptoms
        element: <Symptoms />,
      },
      {
        path: "connect-doctors",  // Ensure the path matches
        element: <ConnectDoctors />,
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
