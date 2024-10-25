import Sidebar from "../../../components/Sidebar";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import styles from "../Mesa Individual/Mesa.module.css";

import { Link, useParams } from "react-router-dom";

import seta from "../../../assets/imgs/downArrow.png";
import { useAuthValue } from "../../../context/AuthContext";

const Mesa = () => {
  const { id } = useParams();

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );

  return (
    <>
      <Sidebar />
      <div className={styles.mesa}>
        <Link to="/mesas" className={styles.voltar}>
          <img src={seta} alt="" />
        </Link>
        <div className="title">
          <h1>Mesa {id}</h1>
        </div>

        <div className={styles.itensContainer}>
          {loading && <p>Carregando...</p>}
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

export default Mesa;
