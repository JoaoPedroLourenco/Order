import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Renda/Renda.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useFetchMultipleCollections } from "../../hooks/useFetchMultiplosDocumentos";
import { useAuthValue } from "../../context/AuthContext";

import func from "../../assets/imgs/funcionarios.png";
import pedidoImg from "../../assets/imgs/pedidos.png";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { Timestamp } from "firebase/firestore";

const Renda = () => {
  // const [diminuirContainer, setDiminuirContainer] = useState(false);

  // const hideContainer = () => {
  //   setDiminuirContainer(!diminuirContainer);
  // };

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
    setTipoRenda("");

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



  const calcularSomaLucros = () => {
    return renda?.reduce((add, lucro) => {

        const lucroTotal = parseFloat(lucro.precoRenda) || 0
        return add + lucroTotal
      
      
    }, 0)
  }

  const totalLucro = calcularSomaLucros()

  console.log(totalLucro)

  return (
    <>
      <Sidebar />
      <div className={styles.renda}>
        <div className="title">
          <h1>Renda</h1>
        </div>

        <div className={styles.formRenda}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="infoRenda"
              value={infoRenda}
              onChange={(e) => setInfoRenda(e.target.value)}
            />
            <input
              type="text"
              name="precoRenda"
              value={precoRenda}
              onChange={(e) => setPrecoRenda(e.target.value)}
            />
            <select
              name="tipoRenda"
              value={tipoRenda}
              onChange={(e) => setTipoRenda(e.target.value)}
            >
              <option value="lucros">Lucros</option>
              <option value="gastos">Gastos</option>
            </select>

            <button>Confirmar</button>
          </form>
        </div>

        <div className={styles.containerCardsRenda}>
          {loading && <p>Carregando...</p>}

          <div className={styles.gastos}>
            <h1>Gastos</h1>
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
          </div>
          <div className={styles.lucros}>
            <h1>Lucros</h1>
            <div className={styles.listaLucros}>
              {lucrosContainer.length > 0
                ? lucrosContainer.map((lucros) => (
                    <div key={lucros.id} className={styles.lucro}>
                      <p>{lucros.infoRenda}</p>
                      <p>{lucros.precoRenda}</p>
                    </div>
                  ))
                : ""}
                
            </div>
            <p>R${parseFloat(totalLucro).toFixed(2)}</p>
          </div>
          <div className={styles.columnCards}>
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
              </div>
            </div>
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
          </div>
        </div>
        {/* <div>
            {renda && renda.length > 0 ? (
            renda.map((rendas) => (
              <div key={rendas.id}>
                <p>{rendas.infoRenda}</p>
                <p>{rendas.precoRenda}</p>
              </div>
            ))
          ) : (
            <p>Não há dados de renda disponíveis</p>
          )}
          </div> */}
        <div className={styles.totalCalculado}>
          <p> Total Calculado: R$ ....</p>
        </div>
      </div>
    </>
  );
};

export default Renda;
