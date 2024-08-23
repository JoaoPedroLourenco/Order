import "./App.css";

import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// paginas
import Perfil from "./routes/Perfil/Perfil.jsx";
import Mesas from "./routes/Mesas/Mesas.jsx";
import Cardapio from "./routes/Cardapio/Cardapio.jsx";
import Estoque from "./routes/Estoque/Estoque.jsx";
import Renda from "./routes/Renda/Renda.jsx";
import Configuracoes from "./routes/Configuracoes/Configuracoes.jsx";
import Ajuda from "./routes/Ajuda/Ajuda.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import LandingPage from "./routes/Landing Page/LandingPage.jsx";
import Login from "./routes/Login/Login.jsx";
import Cadastro from "./routes/Cadastro/Cadastro.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/perfil"
              element={
                <Layout>
                  <Perfil />
                </Layout>
              }
            />
            <Route
              path="/mesas"
              element={
                <Layout>
                  <Mesas />
                </Layout>
              }
            />
            <Route
              path="/estoque"
              element={
                <Layout>
                  <Estoque />
                </Layout>
              }
            />
            <Route
              path="/cardapio"
              element={
                <Layout>
                  <Cardapio />
                </Layout>
              }
            />
            <Route
              path="/renda"
              element={
                <Layout>
                  <Renda />
                </Layout>
              }
            />
            <Route
              path="/ajuda"
              element={
                <Layout>
                  <Ajuda />
                </Layout>
              }
            />
            <Route
              path="/configuracoes"
              element={
                <Layout>
                  <Configuracoes />
                </Layout>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
