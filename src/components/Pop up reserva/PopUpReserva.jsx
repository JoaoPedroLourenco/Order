import React, { useState } from "react";

import styles from "../Pop up reserva/PopUpReserva.module.css";

import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

const PopUpReserva = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [diaReserva, setDiaReserva] = useState("");
  const [horaReserva, setHoraReserva] = useState("");
  const [obsReserva, setObsReserva] = useState("");

  const [popUp, setPopUp] = useState(false);

  const { user } = useAuthValue();
  const uid = user.uid;

  const { inserirDocumentos } = useInsertDocuments("reservas", user);
  const { documents: reservas, loading } = useFetchDocuments(
    "reservas",
    null,
    uid
  );

  const abrirFecharPopUp = () => {
    setPopUp(!popUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirDocumentos({
      nomeCliente,
      diaReserva,
      horaReserva,
      obsReserva,
      mesaId,
      createdBy: user.displayName,
    });

    setPopUp(false);
    setNomeCliente("");
    setDiaReserva("");
    setHoraReserva("");
    setDiaReserva("");
    setObsReserva("");
  };

  return (
    <>
      <button onClick={abrirFecharPopUp} className={styles.btnPopUp}>
        reservar
      </button>
      {popUp === true ? (
        <div className={styles.PopUpReserva}>
          <div className={styles.formReserva}>
            <form onSubmit={handleSubmit}>
              <h1>Marcar Reserva</h1>
              <label>
                Nome do cliente:
                <input
                  type="text"
                  name="nomeCliente"
                  value={nomeCliente}
                  placeholder="Nome do cliente"
                  onChange={(e) => setNomeCliente(e.target.value)}
                />
              </label>
              <div className={styles.dataHora}>
                <label>
                  Dia da reserva:
                  <input
                    type="date"
                    name="diaReserva"
                    value={diaReserva}
                    placeholder="Dia da reserva"
                    onChange={(e) => setDiaReserva(e.target.value)}
                  />
                </label>
                <label>
                  Hora da reserva:
                  <input
                    type="time"
                    name="horaReserva"
                    value={horaReserva}
                    placeholder="Hora da reserva"
                    onChange={(e) => setHoraReserva(e.target.value)}
                  />
                </label>
              </div>
              <label>
                Detalhes:
                <textarea
                  name="obsReserva"
                  value={obsReserva}
                  placeholder="Observação"
                  onChange={(e) => setObsReserva(e.target.value)}
                ></textarea>
              </label>
              <div className={styles.btnsReserva}>
                <button onClick={abrirFecharPopUp}>Cancelar</button>
                <button>Marcar Reserva</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PopUpReserva;
