import React from "react";
import "../ErrorPage/ErrorPage.css";
import erroImage from "../../assets/imgs/erro.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <div className="titulo-erro">
        <p>
          Volte para à <Link to="/">Página Inicial</Link>
        </p>
      </div>

      <div className="img-erro">
        <img src={erroImage} alt="" className="erroImage" />
      </div>

      <div className="paragrafo-erro">
        <p>
          Parece que ocorreu um <span className="cor"> erro...</span>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
