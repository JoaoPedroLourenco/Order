import React from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Funcionarios/Funcionarios.module.css";

import { useState } from "react";

import CurrencyInput from "react-currency-input-field";

import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";
import { Link } from "react-router-dom";

const Funcionarios = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const {
    documents: funcionarios,
    loading,
    error,
  } = useFetchDocuments("funcionarios", null, uid);

  return (
    <>
      <Sidebar />
      <div className={styles.funcionarios}>
        <div className="title">
          <h1>Funcionários</h1>
        </div>
        <Link to="/funcionarios/editFuncionarios" className="btnLinkPage">
          Editar
        </Link>
        <div
          className={styles.containerFuncionarios}
          // style={{ display: diminuirContainer ? "none" : "block" }}
        >
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Funcionarios;
