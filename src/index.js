import React from "react";
import App from "./App.jsx";
import {createRoot} from "react-dom/client";
import {createHashRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import FormPage from "./pages/FormPage/FormPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {path: "/", element: <MainPage></MainPage>},
      {
        path: "/form",
        element: <FormPage></FormPage>,
      },
      {
        path: "/payment-redirect",
        element: <PaymentPage></PaymentPage>,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
