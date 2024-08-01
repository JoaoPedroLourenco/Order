import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Definindo as rotas onde a barra lateral deve aparecer
  const showSidebarRoutes = [
    "/perfil",
    "/mesas",
    "/cardapio",
    "/estoque",
    "/renda",
    "/configuracoes",
    "/ajuda",
  ];

  // Determina se a barra lateral deve ser mostrada
  const showSidebar = showSidebarRoutes.includes(location.pathname);

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
