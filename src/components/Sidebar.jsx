import styles from "./Sidebar.module.css";

// imagens
import logo from "../assets/imgs/logoMenor.png";
import perfil from "../assets/imgs/Male User.png";
import mesa from "../assets/imgs/mesaIcone.png";
import cardapio from "../assets/imgs/Restaurant Menu.png";
import estoque from "../assets/imgs/New Product.png";
import renda from "../assets/imgs/Money Bag.png";
import configuracoes from "../assets/imgs/Settings.png";
import ajuda from "../assets/imgs/Help.png";
import funcionarios from "../assets/imgs/funcionarios.png";
import pedidos from "../assets/imgs/pedidos.png";

// router
import { NavLink } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuthValue();

  return (
    <div className={styles.sideBar}>
      <aside>
        <nav>
          <ul className={styles.links_list}>
            <li>
              <NavLink
                className={styles.perfilLink}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
                to="/perfil"
              >
                <img src={perfil} alt="Perfil" />
                <div className={styles.nomeEmail}>
                  <p className={styles.nomeUsuario}>{user.displayName}</p>
                  <p className={styles.emailUsuario}>{user.email}</p>
                </div>
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink
                to="/mesas"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={mesa} alt="Mesas" />
                <p>Mesas</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cardapio"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={cardapio} alt="Cardápio" />
                <p>Cardápio</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/estoque"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={estoque} alt="Estoque" />
                <p>Estoque</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pedidos"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={pedidos} alt="Estoque" />
                <p>Pedidos</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/funcionarios"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={funcionarios} alt="Estoque" />
                <p>Funcionários</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/renda"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={renda} alt="Renda" />
                <p>Renda</p>
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink
                to="/configuracoes"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={configuracoes} alt="Configurações" />
                <p>Config.</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ajuda"
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
              >
                <img src={ajuda} alt="Ajuda" />
                <p>Ajuda</p>
              </NavLink>
            </li>
          </ul>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
