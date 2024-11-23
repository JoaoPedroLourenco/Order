import Sidebar from "../../../components/Sidebar";
import React, { useEffect, useState } from "react";
import { useFetchMultipleCollections } from "../../../hooks/useFetchMultiplosDocumentos";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import { useInsertDocuments } from "../../../hooks/useInsertDocuments";

import mesaCard from "../../../assets/imgs/mesa.png";

import "../EditMesas/EditMesas.css";
import { useDeleteDocumentos } from "../../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../../context/AuthContext";

import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const EditMesas = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [nomeMesa, setNomeMesa] = useState("");
  const [contadorMesa, setContadorMesa] = useState(0);
  const [estadoMesa, setEstadoMesa] = useState("livre");
  const [qtdLugares, setQtdLugares] = useState("2");
  const [doisLugares, setDoisLugares] = useState([]);
  const [quatroLugares, setQuatroLugares] = useState([]);
  const [seisLugares, setSeisLugares] = useState([]);
  const [oitoLugares, setOitoLugares] = useState([]);
  const [dezMaisLugares, setDezMaisLugares] = useState([]);

  // const { documentos, loading } = useResgatar(
  //   ["mesas", "reservas"],
  //   null,
  //   uid
  // );

  const { documents: mesas, loading } = useFetchDocuments("mesas", null, uid);

  const { inserirDocumentos, response } = useInsertDocuments("mesas", user);

  const { deletarDocumento } = useDeleteDocumentos("mesas");

  const handleSubmit = (e) => {
    e.preventDefault();

    inserirDocumentos({
      nomeMesa,
      estadoMesa,
      qtdLugares,
      createdAt: Timestamp.now(),
      createdBy: user.displayName,
    });
    setNomeMesa("");

    if (nomeMesa === "") {
      setContadorMesa(contadorMesa + 1);
    }

    if (qtdLugares === "2") {
      setDoisLugares((...prev2Lugares) => [
        ...prev2Lugares,
        { nomeMesa, qtdLugares },
      ]);
    } else if (qtdLugares === "4") {
      setQuatroLugares((...prev4Lugares) => [
        ...prev4Lugares,
        { nomeMesa, qtdLugares },
      ]);
    } else if (qtdLugares === "6") {
      setSeisLugares((...prev6Lugares) => [
        ...prev6Lugares,
        { nomeMesa, qtdLugares },
      ]);
    } else if (qtdLugares === "8") {
      setOitoLugares((...prev8Lugares) => [
        ...prev8Lugares,
        { nomeMesa, qtdLugares },
      ]);
    } else {
      setDezMaisLugares((...prev10Lugares) => [
        ...prev10Lugares,
        { nomeMesa, qtdLugares },
      ]);
    }
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
      <div className="editMesas">
        <div className="title">
          <h1>Edit Mesas</h1>
        </div>
        <Link to="/mesas" className="btnLinkPage">
          Voltar para Mesas
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nomeMesa"
            placeholder="Insira o nome da mesa"
            value={nomeMesa}
            onChange={(e) => setNomeMesa(e.target.value)}
          />
          <select
            name="qtdLugares"
            value={qtdLugares}
            onChange={(e) => setQtdLugares(e.target.value)}
          >
            <option value="2">2 Lugares</option>
            <option value="4">4 Lugares</option>
            <option value="6">6 Lugares</option>
            <option value="8">8 Lugares</option>
            <option value="10">10+ Lugares</option>
          </select>
          {!response.loading && (
            <button className="form_btn">Criar Mesa</button>
          )}
          {response.loading && <button disabled>Aguarde...</button>}
        </form>

        <div className="mesasContainer">
          <div className="qtdContainer">
            <fieldset>
              <legend>2 lugares</legend>
              {!loading && doisLugares && doisLugares.length > 0 ? (
                doisLugares.map((mesas) => (
                  <>
                    <div key={mesas.id}>
                      <div className="mesaCard">
                        <button
                          onClick={() => deletarDocumento(mesas.id)}
                          className="deleteMesa"
                        >
                          X
                        </button>
                        <p>
                          {`Mesa ${mesas.nomeMesa}` || `Mesa ${contadorMesa}`}
                        </p>
                        <img src={mesaCard} alt="" />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>não tem nada não</p>
              )}
            </fieldset>

            <fieldset>
              <legend>4 lugares</legend>
              {!loading && quatroLugares && quatroLugares.length > 0 ? (
                quatroLugares.map((mesas) => (
                  <>
                    <div key={mesas.id}>
                      <div className="mesaCard">
                        <button
                          onClick={() => deletarDocumento(mesas.id)}
                          className="deleteMesa"
                        >
                          X
                        </button>
                        <p>
                          {`Mesa ${mesas.nomeMesa}` || `Mesa ${contadorMesa}`}
                        </p>
                        <img src={mesaCard} alt="" />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>não tem nada não</p>
              )}
            </fieldset>

            <fieldset>
              <legend>6 lugares</legend>
              {!loading && seisLugares && seisLugares.length > 0 ? (
                seisLugares.map((mesas) => (
                  <>
                    <div key={mesas.id}>
                      <div className="mesaCard">
                        <button
                          onClick={() => deletarDocumento(mesas.id)}
                          className="deleteMesa"
                        >
                          X
                        </button>
                        <p>
                          {`Mesa ${mesas.nomeMesa}` || `Mesa ${contadorMesa}`}
                        </p>
                        <img src={mesaCard} alt="" />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>não tem nada não</p>
              )}
            </fieldset>

            <fieldset>
              <legend>8 lugares</legend>
              {!loading && oitoLugares && oitoLugares.length > 0 ? (
                oitoLugares.map((mesas) => (
                  <>
                    <div key={mesas.id}>
                      <div className="mesaCard">
                        <button
                          onClick={() => deletarDocumento(mesas.id)}
                          className="deleteMesa"
                        >
                          X
                        </button>
                        <p>
                          {`Mesa ${mesas.nomeMesa}` || `Mesa ${contadorMesa}`}
                        </p>
                        <img src={mesaCard} alt="" />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>não tem nada não</p>
              )}
            </fieldset>

            <fieldset>
              <legend>10+ lugares</legend>

              {!loading && dezMaisLugares && dezMaisLugares.length > 0 ? (
                dezMaisLugares.map((mesas) => (
                  <>
                    <div key={mesas.id}>
                      <div className="mesaCard">
                        <button
                          onClick={() => deletarDocumento(mesas.id)}
                          className="deleteMesa"
                        >
                          X
                        </button>
                        <p>
                          {`Mesa ${mesas.nomeMesa}` || `Mesa ${contadorMesa}`}
                        </p>
                        <img src={mesaCard} alt="" />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>não tem nada não</p>
              )}
            </fieldset>
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

export default EditMesas;
