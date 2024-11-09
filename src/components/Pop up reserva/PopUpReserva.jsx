import React, { useState } from "react";

import styles from "../Pop up reserva/PopUpReserva.module.css";

const PopUpReserva = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [diaReserva, setDiaReserva] = useState("");
  const [horaReserva, setHoraReserva] = useState("");
  const [obsReserva, setObsReserva] = useState("");

  return (
    <div className={styles.PopUpReserva}>
      <form>
        <input
          type="text"
          name="nomeCliente"
          value={nomeCliente}
          placeholder="Nome do cliente"
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        <input
          type="date"
          name="diaReserva"
          value={diaReserva}
          placeholder="Dia da reserva"
          onChange={(e) => setDiaReserva(e.target.value)}
        />
        <input
          type="time"
          name="horaReserva"
          value={horaReserva}
          placeholder="Hora da reserva"
          onChange={(e) => setHoraReserva(e.target.value)}
        />
        <textarea
          name="obsReserva"
          value={obsReserva}
          placeholder="Observação"
          onChange={(e) => setObsReserva(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default PopUpReserva;
