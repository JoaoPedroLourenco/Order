import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Renda/Renda.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useFetchMultipleCollections } from "../../hooks/useFetchMultiplosDocumentos";
import { useAuthValue } from "../../context/AuthContext";

import func from "../../assets/imgs/funcionarios.png";
import pedidoImg from "../../assets/imgs/pedidos.png";
import gastos from "../../assets/imgs/Money With Wings.png";
import lucros from "../../assets/imgs/Stack of Money.png";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

const Renda = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const usarForm = () => {
    setMostrarForm(!mostrarForm);
  };

  const { user } = useAuthValue();
  const uid = user.uid;

  const [infoRenda, setInfoRenda] = useState("");
  const [precoRenda, setPrecoRenda] = useState("");
  const [tipoRenda, setTipoRenda] = useState("lucros");

  const [lucrosContainer, setLucrosContainer] = useState([]);
  const [gastosContainer, setGastosContainer] = useState([]);

  const { inserirDocumentos } = useInsertDocuments("renda", user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirDocumentos({
      infoRenda,
      precoRenda,
      tipoRenda,
      createdAt: Timestamp.now(),
      createdBy: user.displayName,
    });

    setInfoRenda("");
    setPrecoRenda("");
    setTipoRenda("lucros");

    if (tipoRenda === "lucros") {
      setLucrosContainer((prevLucros) => [...prevLucros]);
    } else if (tipoRenda === "gastos") {
      setGastosContainer((prevGastos) => [...prevGastos]);
    }
  };

  const { documentos, loading, error } = useFetchMultipleCollections(
    ["funcionarios", "pedidos", "renda"],
    null,
    uid
  );

  const pedidos = documentos.pedidos;
  const funcionarios = documentos.funcionarios;
  const renda = documentos.renda;

  useEffect(() => {
    if (renda) {
      setLucrosContainer(() =>
        renda.filter((item) => item.tipoRenda === "lucros")
      );
      setGastosContainer(() =>
        renda.filter((item) => item.tipoRenda === "gastos")
      );
    }
  }, [renda]);

  // Função para calcular a soma dos salários
  const calcularSomaSalarios = () => {
    // o reduce passa por cada elemento de um array fazendo o que a função manda
    return funcionarios?.reduce((add, funcionario) => {
      // o ? serve para checar se é null ou undefined
      const salario = parseFloat(funcionario.salarioFuncionario) || 0; // Converte para número
      return add + salario;
    }, 0);
  };

  const somaSalarios = calcularSomaSalarios();

  const calcularSomaPedidos = () => {
    return pedidos?.reduce((add, pedido) => {
      const valorPedidos = parseFloat(pedido.valorTotal) || 0;
      return add + valorPedidos;
    }, 0);
  };

  const totalPedidos = calcularSomaPedidos();

  const calcularSomaLucros = (tipo) => {
    return renda?.reduce((add, lucro) => {
      if (lucro.tipoRenda === tipo) {
        const lucroTotal = parseFloat(lucro.precoRenda) || 0;
        return add + lucroTotal;
      }
      return add;
    }, 0);
  };

  const totalLucro = calcularSomaLucros("lucros");
  const totalGastos = calcularSomaLucros("gastos");

  const somarTotalCalculado = () => {
    return (
      parseFloat(totalLucro) +
      parseFloat(totalPedidos) -
      (parseFloat(somaSalarios) + parseFloat(totalGastos))
    );
  };

  const totalCalculado = somarTotalCalculado();

  return (
    <>
      <Sidebar />
      <div className={styles.renda}>
        <div className="title">
          <h1>Renda</h1>
        </div>

        <button onClick={usarForm} className={styles.expandBtn}>
          Adicionar dados
        </button>
        {mostrarForm === true ? (
          <div className={styles.formRenda}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="infoRenda"
                value={infoRenda}
                onChange={(e) => setInfoRenda(e.target.value)}
                placeholder="Insira o nome do item"
              />
              <input
                type="number"
                name="precoRenda"
                value={precoRenda}
                onChange={(e) => setPrecoRenda(e.target.value)}
                placeholder="Insira o valor"
              />
              <label>
                Tipo de renda:
                <select
                  name="tipoRenda"
                  value={tipoRenda}
                  onChange={(e) => setTipoRenda(e.target.value)}
                >
                  <option value="lucros">Lucros</option>
                  <option value="gastos">Gastos</option>
                </select>
              </label>

              <button className={styles.formRendaBtn}>Inserir</button>
            </form>
          </div>
        ) : (
          ""
        )}

        <div className={styles.containerCardsRenda}>
          {loading && <p>Carregando...</p>}

          {/* ---------------- Gastos --------------- */}

          <div className={styles.gastos}>
            <div className={styles.titulo}>
              <div className={styles.icon}>
                <img src={gastos} alt="" />
              </div>
              <h1>Gastos</h1>
            </div>
            <div className={styles.listaGastos}>
              {gastosContainer.length > 0
                ? gastosContainer.map((gastos) => (
                    <div key={gastos.id} className={styles.gasto}>
                      <h3>{gastos.infoRenda}</h3>
                      <p>R${gastos.precoRenda}</p>
                    </div>
                  ))
                : ""}
            </div>
            <div className={styles.totalGastos}>
              <p>Total: R${parseFloat(totalGastos).toFixed(2)}</p>
            </div>
          </div>

          {/* ------------------------ */}

          {/* ---------------- Lucros --------------- */}

          <div className={styles.lucros}>
            <div className={styles.titulo}>
              <div className={styles.icon}>
                <img src={lucros} alt="" />
              </div>
              <h1>Lucros</h1>
            </div>
            <div className={styles.listaLucros}>
              {lucrosContainer.length > 0
                ? lucrosContainer.map((lucros) => (
                    <div key={lucros.id} className={styles.lucro}>
                      <h3>{lucros.infoRenda}</h3>
                      <p>{lucros.precoRenda}</p>
                    </div>
                  ))
                : ""}
            </div>
            <div className={styles.totalLucros}>
              <p>Total: R${parseFloat(totalLucro).toFixed(2)}</p>
            </div>
          </div>

          {/* ------------------------ */}

          <div className={styles.columnCards}>
            {/* ---------------- Funcionarios --------------- */}
            <div className={styles.cardTotalSalario}>
              <div className={styles.titleCard}>
                <img src={func} alt="func" />
                <p>Funcionários</p>
              </div>
              <div className={styles.totalFuncionarios}>
                <p>Total:</p>
                <span>R$ {parseFloat(somaSalarios).toFixed(2)}</span>
                <div className={styles.qtdFuncionarios}>
                  <p>Funcionários: {funcionarios && funcionarios.length}</p>
                </div>
                <div className={styles.listaFuncionarios}>
                  {funcionarios &&
                    funcionarios.map((funcionario) => (
                      <div key={funcionario.id} className={styles.infoFunc}>
                        <p>{funcionario.nomeFuncionario}</p>
                        <p>R${funcionario.salarioFuncionario}</p>
                      </div>
                    ))}
                </div>
                <Link to="/funcionarios">Ver detalhes</Link>
              </div>
            </div>
            {/* ------------------------ */}

            {/* ---------------- Pedidos --------------- */}
            <div className={styles.cardTotalPedidos}>
              <div className={styles.titleCard}>
                <img src={pedidoImg} alt="" />
                <p>Pedidos</p>
              </div>
              <div className={styles.totalPedidos}>
                <p>Total:</p>
                <span>R$ {parseFloat(totalPedidos).toFixed(2)}</span>
                <div className={styles.qtdFuncionarios}>
                  <p>Pedidos: {pedidos && pedidos.length}</p>
                </div>
              </div>
            </div>
            {/* ------------------------ */}
          </div>
        </div>

        {/* ---------------- Calculo Total --------------- */}
        <div className={styles.totalCalculado}>
          {totalCalculado > 0 ? (
            <p> Total Calculado: R$ {parseFloat(totalCalculado)}</p>
          ) : (
            <p>
              {" "}
              Total Calculado:{" "}
              <span style={{ color: "red" }}>
                R${parseFloat(totalCalculado).toFixed(2)}
              </span>
            </p>
          )}
        </div>
        {/* ------------------------ */}
      </div>
    </>
  );
};

export default Renda;
