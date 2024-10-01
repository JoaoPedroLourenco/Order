import React, { useState } from "react";

import { useInserirItens } from "../../hooks/useInserirItens";
import { useFetchDocumentos } from "../../hooks/useResgatarProdutos";

import styles from "./Estoque.module.css";

const Estoque = () => {
  const [nomeItem, setNomeItem] = useState("");
  const [qtdItem, setQtdItem] = useState("");

  const { inserirItens, response } = useInserirItens("itensEstoque");
  const { documentos, loading, error } = useFetchDocumentos("itensEstoque");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirItens({
      nomeItem,
      qtdItem,
    });

    setNomeItem("");
    setQtdItem("");
  };

  return (
    <div>
      <div className="title">
        <h1>Estoque</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeItem"
          value={nomeItem}
          onChange={(e) => setNomeItem(e.target.value)}
        />
        <input
          type="number"
          name="qtdItem"
          value={qtdItem}
          onChange={(e) => setQtdItem(e.target.value)}
        />
        {!response.loading && <button>Confirmar</button>}
        {response.loading && <button disabled>Aguarde...</button>}
      </form>

      <div className={styles.containerItens}>
        {!loading &&
          documentos &&
          documentos.map((item, index) => (
            <div key={index} className={styles.cardItem}>
              <p>{item.nomeItem}</p>
              <p>{item.qtdItem}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Estoque;
