import styles from "./Cardapio.module.css";

import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import Sidebar from "../../components/Sidebar";
import { useAuthValue } from "../../context/AuthContext";

const Cardapio = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: produtos, loading } = useFetchDocuments("produtos", uid);

  return (
    <>
      <Sidebar />
      <div className={styles.cardapio}>
        <div className="title">
          <h1>Cardápio</h1>
        </div>
        <Link to="/cardapio/editCardapio">Editar Cardápio</Link>

        <div className={styles.itensContainer}>
          {!loading &&
            produtos &&
            produtos.map((produto, index) => (
              <div key={index}>
                <div className={styles.cardProduto}>
                  <img src={produto.imagemProduto} alt="" />
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
