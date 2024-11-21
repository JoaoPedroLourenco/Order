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

  const [estadoMesa, setEstadoMesa] = useState("livre");
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
    }
  }, [mesas]);

  return (
    <>
      <Sidebar />
      <div className="mesas">
        <div className="title">
          <h1>Mesas</h1>
        </div>
        <Link to="/mesas/editMesas">Editar Mesas</Link>

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
                          <button
                            onClick={() => deletarDocumento(mesa.id)}
                            className="deleteMesa"
                          >
                            X
                          </button>
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
                            {mesa.estadoMesa === "livre" ? (
                              <>
                                <div className="btnBorder">
                                  <PopUpReserva mesaId={mesa.id} />
                                </div>
                                <button
                                  onClick={() => setEstadoMesa("ocupada")}
                                  className="btnComBg"
                                >
                                  Ocupar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEstadoMesa("livre")}
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
                  <p>não tem nada não</p>
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
