import { useState } from "react";

import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";

import styles from "./Estoque.module.css";
import Sidebar from "../../components/Sidebar";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../context/AuthContext";

const Estoque = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [nomeItem, setNomeItem] = useState("");
  const [qtdItem, setQtdItem] = useState("");

  const { inserirDocumentos, response } = useInsertDocuments(
    "itensEstoque",
    user
  );
  const { documents: itensEstoque, loading } = useFetchDocuments(
    "itensEstoque",
    null,
    uid
  );

  const { deletarDocumento } = useDeleteDocumentos("itensEstoque");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirDocumentos({
      nomeItem,
      qtdItem,
      createdBy: user.displayName,
    });

    setNomeItem("");
    setQtdItem("");
  };

  return (
    <>
      <Sidebar />
      <div className={styles.estoque}>
        <div className="title">
          <h1>Estoque</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nomeItem"
            placeholder="Nome do item em estoque"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
          />
          <input
            type="number"
            name="qtdItem"
            placeholder="Quantidade do item"
            value={qtdItem}
            onChange={(e) => setQtdItem(e.target.value)}
          />
          {!response.loading && <button className="form_btn">Confirmar</button>}
          {response.loading && <button disabled>Aguarde...</button>}
        </form>

        <div className={styles.containerItens}>
          {!loading &&
            itensEstoque &&
            itensEstoque.map((item, index) => (
              <div key={index} className={styles.cardItem}>
                <button
                  onClick={() => deletarDocumento(item.id)}
                  className={styles.deleteItem}
                >
                  X
                </button>
                <div className={styles.parteCimaCard}>
                  <div className={styles.nomeItem}>
                    <p>{item.nomeItem}</p>
                  </div>
                  <div className={styles.qtdItem}>
                    <p>{item.qtdItem}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Estoque;
