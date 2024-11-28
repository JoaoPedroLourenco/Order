import styles from "./Cardapio.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import Sidebar from "../../components/Sidebar";
import { useAuthValue } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const Cardapio = () => {
  const [query, setQuery] = useState("");

  // troca de divs
  const [areaProdutos, setAreaProdutos] = useState(1);

  const handleClick = (divNumber) => {
    setAreaProdutos(divNumber);
  };

  // filtragem de itens por tipo
  const [pratosPrincipaisArea, setPratosPrincipaisArea] = useState([]);
  const [bebidasArea, setBebidasArea] = useState([]);
  const [outrosArea, setOutrosArea] = useState([]);

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );

  useEffect(() => {
    if (produtos) {
      setPratosPrincipaisArea(
        produtos.filter((item) => item.tipoProduto === "pratosPrincipais")
      );
      setBebidasArea(produtos.filter((item) => item.tipoProduto === "bebidas"));
      setOutrosArea(produtos.filter((item) => item.tipoProduto === "outros"));
    }
  }, [produtos]);

  return (
    <>
      <Sidebar />
      <div className={styles.cardapio}>
        <div className="title">
          <h1>Cardápio</h1>
        </div>
        <Link to="/cardapio/editCardapio" className="btnLinkPage">
          Editar Cardápio
        </Link>

        <div className={styles.allItensContainer}>
          <div className={styles.btnsAreaProduto}>
            <button
              className={areaProdutos === 1 ? "active" : ""}
              onClick={() => handleClick(1)}
            >
              Pratos Principais
            </button>
            <button
              className={areaProdutos === 2 ? "active" : ""}
              onClick={() => handleClick(2)}
            >
              Bebidas
            </button>
            <button
              className={areaProdutos === 3 ? "active" : ""}
              onClick={() => handleClick(3)}
            >
              Outros
            </button>
          </div>
          {loading && (
            <div className="loading">
              <div className="bouncing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
          <div className={styles.itensContainer}>
            {!loading && areaProdutos === 1 && (
              <div className={styles.pratosPrincipais}>
                {pratosPrincipaisArea.map((prato) => (
                  <div className={styles.cardProduto} key={prato.id}>
                    <img src={prato.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {prato.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{prato.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(prato.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && areaProdutos === 2 && (
              <div className={styles.bebidas}>
                {bebidasArea.map((bebida) => (
                  <div className={styles.cardProduto} key={bebida.id}>
                    <img src={bebida.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {bebida.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{bebida.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(bebida.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && areaProdutos === 3 && (
              <div className={styles.outros}>
                {outrosArea.map((outro) => (
                  <div className={styles.cardProduto} key={outro.id}>
                    <img src={outro.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {outro.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{outro.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(outro.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cardapio;
