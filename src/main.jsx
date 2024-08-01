import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Perfil from "./routes/Perfil/Perfil.jsx";
import Mesas from "./routes/Mesas/Mesas.jsx";
import Cardapio from "./routes/Cardapio/Cardapio.jsx";
import Estoque from "./routes/Estoque/Estoque.jsx";
import Renda from "./routes/Renda/Renda.jsx";
import Configuracoes from "./routes/Configuracoes/Configuracoes.jsx";
import Ajuda from "./routes/Ajuda/Ajuda.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import LandingPage from "./routes/Landing Page/LandingPage.jsx";

import Layout from "./components/Layout.jsx";
import Login from "./routes/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/perfil",
        element: (
          <Layout>
            <Perfil />
          </Layout>
        ),
      },
      {
        path: "/mesas",
        element: (
          <Layout>
            <Mesas />
          </Layout>
        ),
      },
      {
        path: "/cardapio",
        element: (
          <Layout>
            <Cardapio />
          </Layout>
        ),
      },
      {
        path: "/estoque",
        element: (
          <Layout>
            <Estoque />
          </Layout>
        ),
      },
      {
        path: "/renda",
        element: (
          <Layout>
            <Renda />
          </Layout>
        ),
      },
      {
        path: "/configuracoes",
        element: (
          <Layout>
            <Configuracoes />
          </Layout>
        ),
      },
      {
        path: "/ajuda",
        element: (
          <Layout>
            <Ajuda />
          </Layout>
        ),
      },
      {
        path: "/login",
        element: <Login/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
