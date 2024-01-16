import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Upload from './pages/upload';
import Home from './pages/home'; // Corrected import path


//TODO make react router work
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home /> // Added Home route
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/upload",
    element: <Upload />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);