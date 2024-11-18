import React, { useEffect, useState } from "react";
import { useFetchMultipleCollections } from "../../hooks/useFetchMultiplosDocumentos";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";

import mesaCard from "../../assets/imgs/mesa.png";

import styles from "./Mesas.module.css";
import Sidebar from "../../components/Sidebar";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import PopUpReserva from "../../components/Pop up reserva/PopUpReserva";
import { Timestamp } from "firebase/firestore";

const Mesas = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [nomeMesa, setNomeMesa] = useState("");
  const [contadorMesa, setContadorMesa] = useState(0);
  const [estadoMesa, setEstadoMesa] = useState("livre");

  const { documentos, loading } = useFetchMultipleCollections(
    ["mesas", "reservas"],
    null,
    uid
  );

  const mesas = documentos.mesas;
  const reservas = documentos.reservas;

  const { inserirDocumentos, response } = useInsertDocuments("mesas", user);

  const { deletarDocumento } = useDeleteDocumentos("mesas");

  const handleSubmit = (e) => {
    e.preventDefault();

    inserirDocumentos({
      nomeMesa,
      estadoMesa,
      createdAt: Timestamp.now(),
      createdBy: user.displayName,
    });
    setNomeMesa("");

    if (nomeMesa === "") {
      setContadorMesa(contadorMesa + 1);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const mudarEstadoMesa = () => {
      if (estadoMesa === "ocupado") {
        setEstadoMesa("ocupado");
      } else if (estadoMesa === "reservado") {
        setEstadoMesa("reservado");
      } else {
        setEstadoMesa("livre");
      }
    };

    return mudarEstadoMesa();
  }, [mesas]);

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
          {!response.loading && <button>Criar Mesa</button>}
          {response.loading && <button disabled>Aguarde...</button>}
        </form>

        <div className={styles.mesasContainer}>
          {!loading &&
            mesas &&
            mesas.map((mesa) => {
              const reservasDaMesa = reservas
                ? reservas.filter((reserva) => reserva.mesaId === mesa.id)
                : [];

              return (
                <div key={mesa.id}>
                  <div className={styles.mesaCard}>
                    <button
                      onClick={() => deletarDocumento(mesa.id)}
                      className={styles.deleteMesa}
                    >
                      X
                    </button>
                    <p>{`Mesa ${mesa.nomeMesa}` || `Mesa ${contadorMesa}`}</p>
                    <img src={mesaCard} alt="" />
                    {reservasDaMesa.length > 0 ? (
                      <div className={styles.reservasContainer}>
                        <div className={styles.reserva}>
                          {reservasDaMesa.map((reserva) => (
                            <Link to={`/reserva/${reserva.id}`}>
                              <div
                                key={reserva.id}
                                className={styles.infoReserva}
                              >
                                <p>Cliente: {reserva.nomeCliente}</p>
                                <p>
                                  Data: {formatDate(reserva.diaReserva)}{" "}
                                  {reserva.horaReserva}
                                </p>
                                <p></p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.btnsMesa}>
                      {estadoMesa === "livre" && (
                        <>
                          <div className={styles.btnBorder}>
                            <PopUpReserva mesaId={mesa.id} />
                          </div>
                          <button
                            onClick={() => setEstadoMesa("ocupada")}
                            className={styles.btnComBg}
                          >
                            Ocupar
                          </button>
                        </>
                      )}
                      {estadoMesa === "ocupada" && (
                        <>
                          <button
                            onClick={() => setEstadoMesa("livre")}
                            className={styles.btnBorder}
                          >
                            Cancelar
                          </button>
                          <button className={styles.btnComBg}>
                            <Link to={`/mesas/${mesa.id}`}>Marcar Pedido</Link>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

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
