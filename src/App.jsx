import "./App.css";

// react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// paginas
import Perfil from "./routes/Perfil/Perfil.jsx";
import Mesas from "./routes/Mesas/Mesas.jsx";
import Cardapio from "./routes/Cardapio/Cardapio.jsx";
import Estoque from "./routes/Estoque/Estoque.jsx";
import Renda from "./routes/Renda/Renda.jsx";
import Ajuda from "./routes/Ajuda/Ajuda.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import LandingPage from "./routes/Landing Page/LandingPage.jsx";
import Login from "./routes/Login/Login.jsx";
import Cadastro from "./routes/Cadastro/Cadastro.jsx";
import Funcionarios from "./routes/Funcionarios/Funcionarios.jsx";
import EditCardapio from "./routes/Cardapio/EditCardapio/EditCardapio.jsx";
import Search from "./routes/Search/Search.jsx";

// hooks
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuthentication } from "./hooks/useAuthentication.jsx";
import EditFuncionarios from "./routes/Funcionarios/EditFuncionarios/EditFuncionarios.jsx";
import FaleConosco from "./routes/FaleConosco/FaleConosco.jsx";
import Mesa from "./routes/Mesas/Mesa Individual/Mesa.jsx";
import Pedidos from "./routes/Pedidos/Pedidos.jsx";
import PopUpReserva from "./components/Pop up reserva/PopUpReserva.jsx";
import Reserva from "./routes/Reservas/Reserva.jsx";
import EditMesas from "./routes/Mesas/EditMesas/EditMesas.jsx";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <div className="loading">
        <div className="bouncing-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/*" element={<ErrorPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/faleConosco" element={<FaleConosco />} />
              <Route path="/search/" element={<Search />} />
              <Route
                path="/perfil"
                element={user ? <Perfil /> : <Navigate to="/" />}
              />
              <Route
                path="/mesas"
                element={user ? <Mesas /> : <Navigate to="/" />}
              />
              <Route
                path="/mesas/editMesas"
                element={user ? <EditMesas /> : <Navigate to="/" />}
              />
              <Route
                path="/mesas/reserva"
                element={user ? <PopUpReserva /> : <Navigate to="/" />}
              />
              <Route
                path="/mesas/:id"
                element={user ? <Mesa /> : <Navigate to="/" />}
              />
              <Route
                path="/estoque"
                element={user ? <Estoque /> : <Navigate to="/" />}
              />
              <Route
                path="/cardapio"
                element={user ? <Cardapio /> : <Navigate to="/" />}
              />
              <Route
                path="/cardapio/editCardapio"
                element={user ? <EditCardapio /> : <Navigate to="/" />}
              />
              <Route
                path="/renda"
                element={user ? <Renda /> : <Navigate to="/" />}
              />
              <Route
                path="/ajuda"
                element={user ? <Ajuda /> : <Navigate to="/" />}
              />
              <Route
                path="/funcionarios"
                element={user ? <Funcionarios /> : <Navigate to="/" />}
              />
              <Route
                path="/funcionarios/editFuncionarios"
                element={user ? <EditFuncionarios /> : <Navigate to="/" />}
              />
              <Route
                path="/pedidos"
                element={user ? <Pedidos /> : <Navigate to="/" />}
              />
              <Route
                path="/reserva/:id"
                element={user ? <Reserva /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
