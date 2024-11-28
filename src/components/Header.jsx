import "./Header.css";
import { Link } from "react-router-dom";

import logoGrande from "../assets/imgs/logoGrande.png";
import logoMenor from "../assets/imgs/logoMenor.png";
import mais from "../assets/imgs/More.png";
import close from "../assets/imgs/Close.png";
import { useState } from "react";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);

  const openDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logoGrande} alt="" />
        </div>
        <ul>
          <Link to="/faleConosco">Fale Conosco</Link>
          <Link to="/">Sobre Nós</Link>
        </ul>
      </nav>
      <div className="login-navBar">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/cadastro">
          <button className="cadastro-btn">Comece de graça</button>
        </Link>
        <div className="btn-header">
          <button onClick={openDropDown}>
            <img src={mais} alt="" />
          </button>

          {dropDown === true ? (
            <div className={`dropDown ${dropDown ? "open" : "close"}`}>
              <div className="closeBtn">
                <button onClick={openDropDown}>
                  <img src={close} alt="Fechar" />
                </button>
              </div>
              <Link to="/faleConosco">Fale Conosco</Link>
              <Link to="/">Sobre Nós</Link>
              <Link to="/login">Login</Link>
              <Link to="/cadastro">Comece de graça</Link>
              <div className="logoDropDown">
                <img src={logoMenor} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
