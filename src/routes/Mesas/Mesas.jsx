import { useFetchMultipleCollections } from "../../hooks/useFetchMultiplosDocumentos";

import mesaCard from "../../assets/imgs/mesa.png";

import styles from "./Mesas.module.css";
import Sidebar from "../../components/Sidebar";

import { useAuthValue } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import PopUpReserva from "../../components/Pop up reserva/PopUpReserva";
import { useState } from "react";

const Mesas = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [estadoMesa, setEstadoMesa] = useState("livre");

  const { documentos, loading } = useFetchMultipleCollections(
    ["mesas", "reservas"],
    null,
    uid
  );

  const mesas = documentos.mesas;
  const reservas = documentos.reservas;

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Sidebar />
      <div className={styles.mesas}>
        <div className="title">
          <h1>Mesas</h1>
        </div>
        <Link to="/mesas/editMesas">Editar Mesas</Link>

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
