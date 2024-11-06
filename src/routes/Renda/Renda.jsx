import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Renda/Renda.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

import func from "../../assets/imgs/funcionarios.png";

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

  return (
    <>
      <Sidebar />
      <div className={styles.renda}>
        <div className="title">
          <h1>Renda</h1>
        </div>

        {loading && <p>Carregando...</p>}
        <div
          className={styles.cardTotalSalario}
          // style={{ display: diminuirContainer ? "none" : "block" }}
        >
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
      </div>
    </>
  );
};

export default Renda;
