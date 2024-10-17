import React from "react";
import Sidebar from "../../components/Sidebar";

import styles from '../Renda/Renda.module.css';

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

const Renda = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: funcionarios, loading } = useFetchDocuments("funcionarios", null, uid);

  // Função para calcular a soma dos salários
  const calcularSomaSalarios = () => { // o reduce passa por cada elemento de um array fazendo o que a função manda
    return funcionarios?.reduce((total, funcionario) => { // o ? serve para checar se é null ou undefined
      const salario = parseFloat(funcionario.salarioFuncionario) || 0; // Converte para número
      return total + salario;
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

        {funcionarios && funcionarios.map((funcionario) => (
          <div key={funcionario.id}>
            <p>{funcionario.nomeFuncionario}</p>
            <p>{funcionario.salarioFuncionario}</p>
          </div>
        ))}

        <div>
          <h2>Soma dos Salários: {somaSalarios}</h2> {/* Formatação para 2 casas decimais */}
        </div>
      </div>
    </>
  );
};

export default Renda;
