import "./App.css";

// react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Config.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuthentication } from "./hooks/useAuthentication.jsx";

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
    return <p>Carregando usuário...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route
                path="/perfil"
                element={ user ? (<Layout>
                  <Perfil />
                </Layout>) : (<Navigate to="/"/>)
                  
                }
              />
              <Route
                path="/mesas"
                element={ user ?  <Layout>
                  <Mesas />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
              <Route
                path="/estoque"
                element={ user ?  <Layout>
                  <Estoque />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
              <Route
                path="/cardapio"
                element={ user ?  <Layout>
                  <Cardapio />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
              <Route
                path="/renda"
                element={ user ?  <Layout>
                  <Renda />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
              <Route
                path="/ajuda"
                element={ user ?  <Layout>
                  <Ajuda />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
              <Route
                path="/configuracoes"
                element={ user ?  <Layout>
                  <Configuracoes />
                </Layout> : 
                 <Navigate to="/"/>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
