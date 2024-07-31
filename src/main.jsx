import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Perfil from "./routes/Perfil.jsx";
import Mesas from "./routes/Mesas.jsx";
import Cardapio from "./routes/Cardapio.jsx";
import Estoque from "./routes/Estoque.jsx";
import Renda from "./routes/Renda.jsx";
import Configuracoes from "./routes/Configuracoes.jsx";
import Ajuda from "./routes/Ajuda.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Perfil />,
      },
      {
        path: "/mesas",
        element: <Mesas />,
      },
      {
        path: "/cardapio",
        element: <Cardapio />,
      },
      {
        path: "/estoque",
        element: <Estoque />,
      },
      {
        path: "/renda",
        element: <Renda />,
      },
      {
        path: "/configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/ajuda",
        element: <Ajuda />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
