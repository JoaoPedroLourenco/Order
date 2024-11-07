import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Renda/Renda.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

import func from "../../assets/imgs/funcionarios.png";
// import pedidoImg from "../../assets/imgs/pedidos.png";

const Renda = () => {
  // const [diminuirContainer, setDiminuirContainer] = useState(false);

  // const hideContainer = () => {
  //   setDiminuirContainer(!diminuirContainer);
  // };

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: funcionarios, loading } = useFetchDocuments(
    "funcionarios",
    null,
    uid
  );

  // Função para calcular a soma dos salários
  const calcularSomaSalarios = () => {
    // o reduce passa por cada elemento de um array fazendo o que a função manda
    return funcionarios?.reduce((add, funcionario) => {
      // o ? serve para checar se é null ou undefined
      const salario =
        parseFloat(funcionario.salarioFuncionario.replace(/\./g, "")) || 0; // Converte para número
      return add + salario;
    }, 0);
  };

  const somaSalarios = calcularSomaSalarios();

  // const calcularSomaPedidos = () => {
  //   return pedidos?.reduce((add, pedido) => {
  //     const valorPedidos = parseFloat(pedido.valorTotal) || 0;
  //     return add + valorPedidos;
  //   }, 0);
  // };

  // const totalPedidos = calcularSomaPedidos();

  return (
    <>
      <Sidebar />
      <div className={styles.renda}>
        <div className="title">
          <h1>Renda</h1>
        </div>

        <div className={styles.containerCardsRenda}>
          {loading && <p>Carregando...</p>}
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
          {/* <div className={styles.cardTotalPedidos}>
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Renda;
