import Sidebar from "../../../components/Sidebar";
import React, { useEffect, useState } from "react";
import { useFetchMultipleCollections } from "../../../hooks/useFetchMultiplosDocumentos";
import { useInsertDocuments } from "../../../hooks/useInsertDocuments";

import mesaCard from "../../../assets/imgs/mesa.png";

import "../EditMesas/EditMesas.css";
import { useDeleteDocumentos } from "../../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../../context/AuthContext";

import { Link } from "react-router-dom";
import PopUpReserva from "../../../components/Pop up reserva/PopUpReserva";
import { Timestamp } from "firebase/firestore";

const EditMesas = () => {
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

  return (
    <>
      <Sidebar />
      <div className="editMesas">
        <div className="title">
          <h1>Edit Mesas</h1>
        </div>
        <Link to="/mesas">Voltar para Mesas</Link>
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

        <div className="mesasContainer">
          {!loading &&
            mesas &&
            mesas.map((mesa) => {
              const reservasDaMesa = reservas
                ? reservas.filter((reserva) => reserva.mesaId === mesa.id)
                : [];

              return (
                <div key={mesa.id}>
                  <div className="mesaCard">
                    <button
                      onClick={() => deletarDocumento(mesa.id)}
                      className="deleteMesa"
                    >
                      X
                    </button>
                    <p>{`Mesa ${mesa.nomeMesa}` || `Mesa ${contadorMesa}`}</p>
                    <img src={mesaCard} alt="" />
                    {reservasDaMesa.length > 0 ? "" : ""}
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

export default EditMesas;
