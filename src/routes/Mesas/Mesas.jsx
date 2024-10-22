import React, { useState } from "react";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";

import mesaCard from "../../assets/imgs/mesa.png";

import styles from "./Mesas.module.css";
import Sidebar from "../../components/Sidebar";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../context/AuthContext";

const Mesas = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [nomeMesa, setNomeMesa] = useState("");
  const [contadorMesa, setContadorMesa] = useState(0);

  const { documents: mesas, loading } = useFetchDocuments("mesas", null, uid);
  const { inserirDocumentos, response } = useInsertDocuments("mesas", user);

  const { deletarDocumento } = useDeleteDocumentos("mesas");

  const handleSubmit = (e) => {
    e.preventDefault();

    inserirDocumentos({ nomeMesa, createdBy: user.displayName });
    setNomeMesa("");

    if (nomeMesa === "") {
      setContadorMesa(contadorMesa + 1);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.mesas}>
        <div className="title">
          <h1>Mesas</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nomeMesa"
            value={nomeMesa}
            onChange={(e) => setNomeMesa(e.target.value)}
          />
          {!loading && <button>Criar Mesa</button>}
          {loading && <button disabled>Aguarde...</button>}
        </form>

        <div className={styles.mesasContainer}>
          {!loading &&
            mesas &&
            mesas.map((mesa, index) => (
              <div key={index}>
                <div className={styles.mesaCard}>
                  <button
                    onClick={() => deletarDocumento(mesa.id)}
                    className={styles.deleteMesa}
                  >
                    X
                  </button>
                  <p>{`Mesa ${mesa.nomeMesa}` || `Mesa ${contadorMesa}`}</p>
                  <img src={mesaCard} alt="" />
                </div>
              </div>
            ))}
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
        </div>
      </div>
    </>
  );
};

export default Mesas;
