import styles from "./Cardapio.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import Sidebar from "../../components/Sidebar";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";

const Cardapio = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search/q=${query}`);
    }
  };

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

        <div className={styles.searchForm}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Procure por produtos"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Procurar</button>
          </form>
        </div>

        <div className={styles.itensContainer}>
          {!loading &&
            produtos &&
            produtos.map((produto, index) => (
              <div key={index}>
                <div className={styles.cardProduto}>
                  <img src={produto.imagemDocumento} alt="" />
                  <div className={styles.cardEsq}>
                    <h1 className={styles.tituloProduto}>
                      {produto.nomeProduto}
                    </h1>
                    <p className={styles.descProduto}>{produto.descProduto}</p>
                    <p className={styles.preco}>
                      <span>R$</span>
                      <span className={styles.precoProduto}>
                        {produto.precoProduto}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cardapio;
