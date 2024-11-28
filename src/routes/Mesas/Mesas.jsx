import { useFetchMultipleCollections } from "../../hooks/useFetchMultiplosDocumentos";

import mesaCard from "../../assets/imgs/mesa.png";

import "./Mesas.css";
import Sidebar from "../../components/Sidebar";

import { useAuthValue } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import PopUpReserva from "../../components/Pop up reserva/PopUpReserva";
import { useState, useEffect } from "react";

const Mesas = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [estadoMesas, setEstadoMesas] = useState({}); // Armazena o estado de cada mesa individualmente
  const [doisLugares, setDoisLugares] = useState([]);
  const [quatroLugares, setQuatroLugares] = useState([]);
  const [seisLugares, setSeisLugares] = useState([]);
  const [oitoLugares, setOitoLugares] = useState([]);
  const [dezMaisLugares, setDezMaisLugares] = useState([]);

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

  useEffect(() => {
    if (mesas) {
      console.log(mesas);
      setDoisLugares(mesas.filter((qtd) => qtd.qtdLugares === "2"));
      setQuatroLugares(mesas.filter((qtd) => qtd.qtdLugares === "4"));
      setSeisLugares(mesas.filter((qtd) => qtd.qtdLugares === "6"));
      setOitoLugares(mesas.filter((qtd) => qtd.qtdLugares === "8"));
      setDezMaisLugares(mesas.filter((qtd) => qtd.qtdLugares === "10"));

      // Inicializa o estado das mesas como "livre"
      const estadoInicial = {};
      mesas.forEach((mesa) => {
        estadoInicial[mesa.id] = "livre";
      });
      setEstadoMesas(estadoInicial);
    }
  }, [mesas]);

  const alterarEstadoMesa = (id, novoEstado) => {
    setEstadoMesas((prevState) => ({
      ...prevState,
      [id]: novoEstado,
    }));
  };

  return (
    <>
      <Sidebar />
      <div className="mesas">
        <div className="title">
          <h1>Mesas</h1>
        </div>
        <Link to="/mesas/editMesas" className="btnLinkPage">
          Editar Mesas
        </Link>

        <div className="mesasContainer">
          <div className="qtdContainer">
            {[
              { label: "2 lugares", data: doisLugares },
              { label: "4 lugares", data: quatroLugares },
              { label: "6 lugares", data: seisLugares },
              { label: "8 lugares", data: oitoLugares },
              { label: "10+ lugares", data: dezMaisLugares },
            ].map(({ label, data }) => (
              <fieldset key={label}>
                <legend>{label}</legend>
                {!loading && data && data.length > 0 ? (
                  data.map((mesa) => {
                    const reservasDaMesa = reservas
                      ? reservas.filter((reserva) => reserva.mesaId === mesa.id)
                      : [];

                    return (
                      <div key={mesa.id}>
                        <div className="mesaCard">
                          <p>
                            {`Mesa ${mesa.nomeMesa}` || `Mesa ${contadorMesa}`}
                          </p>
                          <img src={mesaCard} alt="" />
                          {reservasDaMesa.length > 0 && (
                            <div className="reservasContainer">
                              <div className="reserva">
                                {reservasDaMesa.map((reserva) => (
                                  <Link
                                    key={reserva.id}
                                    to={`/reserva/${reserva.id}`}
                                  >
                                    <div className="infoReserva">
                                      <p>Cliente: {reserva.nomeCliente}</p>
                                      <p>
                                        Data: {formatDate(reserva.diaReserva)}{" "}
                                        {reserva.horaReserva}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="btnsMesa">
                            {estadoMesas[mesa.id] === "livre" ? (
                              <>
                                <div className="btnBorder">
                                  <PopUpReserva mesaId={mesa.id} />
                                </div>
                                <button
                                  onClick={() =>
                                    alterarEstadoMesa(mesa.id, "ocupada")
                                  }
                                  className="btnComBg"
                                >
                                  Ocupar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    alterarEstadoMesa(mesa.id, "livre")
                                  }
                                  className="btnBorder"
                                >
                                  Cancelar
                                </button>
                                <button className="btnComBg">
                                  <Link to={`/mesas/${mesa.id}`}>
                                    Marcar Pedido
                                  </Link>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Você não possui mesas inseridas nessa sessão ainda...</p>
                )}
              </fieldset>
            ))}
          </div>

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
