import styles from "./Sidebar.module.css";

import logo from "../assets/imgs/logoMenor.png";
import perfil from "../assets/imgs/Male User.png";
import mesa from "../assets/imgs/mesaIcone.png";
import cardapio from "../assets/imgs/Restaurant Menu.png";
import estoque from "../assets/imgs/New Product.png";
import renda from "../assets/imgs/Money Bag.png";
import configuracoes from "../assets/imgs/Settings.png";
import ajuda from "../assets/imgs/Help.png";

// router
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}>
        <img src={logo} alt="Order" />
      </div>
      <aside>
        <nav>
          <ul className={styles.links_list}>
            <li>
              <NavLink
                className={styles.link}
                style={({ isActive }) => ({
                  transition: ".2s",
                  backgroundColor: isActive ? "#b4b4b483" : "",
                  boxShadow: isActive ? "0px 2px 2px #0000003a" : "",
                })}
                to="/perfil"
              >
                <img src={perfil} alt="Perfil" />
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
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
