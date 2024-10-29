import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Renda/Renda.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

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
          className={styles.containerFuncionarios}
          // style={{ display: diminuirContainer ? "none" : "block" }}
        >
          <h2>Funcionários</h2>
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Salário</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios &&
                funcionarios.map((funcionario) => (
                  <>
                    <tr key={funcionario.id}>
                      <td>
                        <img
                          src={funcionario.imagemDocumento}
                          alt={funcionario.nomeFuncionario}
                          className={styles.imagemTabela}
                        />
                      </td>
                      <td>{funcionario.nomeFuncionario}</td>
                      <td>{funcionario.cargoFuncionario}</td>
                      <td>R$ {funcionario.salarioFuncionario}</td>
                    </tr>
                  </>
                ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className={styles.totalSalario}>
                  Total: <span>R${parseFloat(somaSalarios).toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Renda;
