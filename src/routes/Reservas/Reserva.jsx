import React from "react";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../../firebase/Config";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";

import "../Reservas/Reservas.css";

const Reserva = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Captura o ID da URL
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);

  const { deletarDocumento } = useDeleteDocumentos("reservas");

  useEffect(() => {
    const fetchReserva = async () => {
      setLoading(true);
      try {
        const docRef = doc(dataBase, "reservas", id); // Referência do documento
        const docSnap = await getDoc(docRef); // Busca o documento
        if (docSnap.exists()) {
          setReserva(docSnap.data()); // Armazena os dados
        } else {
          console.error("Reserva não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao buscar reserva:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!reserva) {
    return <p>Reserva não encontrada.</p>;
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async () => {
    const success = await deletarDocumento(id);
    if (success) {
      navigate("/mesas");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="paginaReserva">
        <div className="title">
          <h1>Detalhes da Reserva </h1>
        </div>
        <div className="dadosContainer">
          <div className="dadosReserva">
            <label>
              Cliente:
              <p>{reserva.nomeCliente}</p>
            </label>
            <label>
              Dia:<p> {formatDate(reserva.diaReserva)}</p>
            </label>
            <label>
              Hora:<p>{reserva.horaReserva}</p>
            </label>
            <label>
              Observação: <p className="obs">{reserva.obsReserva}</p>
            </label>
            <div className="btnsReserva">
              <button onClick={handleDelete}>Retirar reserva</button>
              <button onClick={() => navigate("/mesas")}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reserva;
