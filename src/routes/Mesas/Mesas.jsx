import React, { useState } from "react";
import { useFetchDocumentos } from "../../hooks/useResgatarProdutos";
import { useInserirMesas } from "../../hooks/useInserirMesas";

import mesaCard from "../../assets/imgs/mesa.png";

import styles from "./Mesas.module.css";
import Sidebar from "../../components/Sidebar";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";

const Mesas = () => {
  const [nomeMesa, setNomeMesa] = useState("");
  const [contadorMesa, setContadorMesa] = useState(0);

  const { documentos, loading } = useFetchDocumentos("mesas");
  const { inserirMesas, response } = useInserirMesas("mesas");

  const { deletarDocumento } = useDeleteDocumentos("mesas");

  const handleSubmit = (e) => {
    e.preventDefault();

    inserirMesas({ nomeMesa });
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
            documentos.map((mesa, index) => (
              <div key={index}>
                <div className={styles.mesaCard}>
                  <button
                    onClick={() => deletarDocumento(mesa.id)}
                    className={styles.deleteMesa}
                  >
                    X
                  </button>
                  <p>{mesa.mesa.nomeMesa || `Mesa ${contadorMesa}`}</p>
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
