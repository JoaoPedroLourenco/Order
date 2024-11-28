import "../Landing Page/LandingPage.css";

import Header from "../../components/Header";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import imgLandingPage from "../../assets/imgs/Team work-bro 2.png";
import tela1 from "../../assets/imgs/tela1.png";
import tela2 from "../../assets/imgs/tela2.png";
import tela3 from "../../assets/imgs/tela3.png";
import tela4 from "../../assets/imgs/tela4.png";
import tela5 from "../../assets/imgs/tela5.png";
import logoGrande from "../../assets/imgs/logoGrande.png";

const LandingPage = () => {
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/mesas");
    }
  }, [user]);
  return (
    <div className="containerLandingPage">
      <Header />

      <main>
        <div className="lado-esq-home">
          <h1>
            <span style={{ color: "#EF233C" }}>ORGANIZE</span>
            <br />
            FACILMENTE <br />
            COM <span style={{ color: "#EF233C" }}>ORDER!</span>
          </h1>
          <p>
            Sistema web para organização de <br />
            restaurantes e criação de comandas!
          </p>
          <button>Começar gratuitamente</button>
        </div>
        <div className="lado-dir-home">
          <img
            src={imgLandingPage}
            className="img-ladodir"
            alt="Order, Organização de restaurantes."
          />
        </div>
      </main>
      <div className="btn-saibamais">
        <a href="#scroll">
          <button className="saibamais">
            <b>↓</b>
          </button>
        </a>
        <p className="text-saibamais">Saiba Mais</p>
      </div>
      <section id="scroll">
        <div></div>
      </section>
      <div className="tela1">
        <div className="left">
          <p className="titulo-tela1">
            <b>
              ORGANIZE SUAS <span style={{ color: "#EF233C" }}>MESAS</span>
            </b>
          </p>
          <p className="text-tela1">
            Configure as mesas com base no seu restaurante <br />e tenha total
            controle com apenas alguns cliques!
          </p>
        </div>
        <img src={tela1} className="img-tela1" alt="" />
      </div>

      <div className="tela1">
        <div className="left">
          <p className="titulo-tela1">
            <b>
              ATUALIZE O <span style={{ color: "#EF233C" }}>CARDÁPIO</span>
            </b>
          </p>
          <p className="text-tela1">
            Adicione quantos pratos desejar criando um menu <br />
            digital para seu restaurante!
          </p>
        </div>
        <img src={tela2} className="img-tela1" alt="" />
      </div>

      <div className="tela1">
        <div className="left">
          <p className="titulo-tela1">
            <b>
              {" "}
              CONTROLE O <span style={{ color: "#EF233C" }}>ESTOQUE</span>
            </b>
          </p>
          <p className="text-tela1">
            Tenha controle total de seu estoque e nunca mais <br />
            sofra com a falta de produtos!
          </p>
        </div>
        <img src={tela3} className="img-tela1" alt="" />
      </div>

      <div className="tela1">
        <div className="left">
          <p className="titulo-tela1">
            <b>
              {" "}
              CONTROLE DE <span style={{ color: "#EF233C" }}>MESAS</span>
            </b>
          </p>
          <p className="text-tela1">
            Tenha controle total das mesas e pedidos!
          </p>
        </div>
        <img src={tela4} className="img-tela1" alt="" />
      </div>

      <div className="tela1">
        <div className="left">
          <p className="titulo-tela1">
            <b>
              {" "}
              CONTROLE DE <span style={{ color: "#EF233C" }}>RENDA</span>
            </b>
          </p>
          <p className="text-tela1">
            Tenha controle da sua renda diária, mensal e anual.
          </p>
        </div>
        <img src={tela5} className="img-tela1" alt="" />
      </div>
      <div className="address">
        <address>
          <b>Emails para contato:</b> <br />
          lourencodossantosjoaopedro@gmail.com <br />
          lauramellodesena@gmail.com <br />
          enzotakaku07@gmail.com
        </address>

        <img src={logoGrande} className="logo-address" alt="" />
      </div>

      <footer>
        <p> &copy; 2024 Order - Todos os direitos reservados</p>
        <p>People illustrations by Storyset</p>
      </footer>
    </div>
  );
};

export default LandingPage;
