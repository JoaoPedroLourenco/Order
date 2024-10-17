import React from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Funcionarios/Funcionarios.module.css";

import { useState } from "react";

import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocumentos } from "../../hooks/useDeleteDocumentos";

const Funcionarios = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [imagemDocumento, setImagemDocumento] = useState(null);
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [salarioFuncionario, setSalarioFuncionario] = useState("");
  const [cargoFuncionario, setCargoFuncionario] = useState("");

  const { inserirDocumentos, response } = useInsertDocuments(
    "funcionarios",
    user
  );

  const { deletarDocumento } = useDeleteDocumentos("funcionarios");

  const {
    documents: funcionarios,
    loading,
    error,
  } = useFetchDocuments("funcionarios", null, uid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirDocumentos(
      {
        nomeFuncionario,
        salarioFuncionario,
        cargoFuncionario,
        uid: user.uid,
        createdBy: user.displayName,
      },
      imagemDocumento
    );

    setImagemDocumento(null);
    setNomeFuncionario("");
    setCargoFuncionario("");
    setSalarioFuncionario("");
  };

  const previewImagem = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagemDocumento(arquivoSelecionado);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.funcionarios}>
        <div className="title">
          <h1>Funcionários</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.fotoFuncionario}>
            {imagemDocumento ? (
              <img src={URL.createObjectURL(imagemDocumento)} alt="" />
            ) : (
              <p>Foto do funcionário</p>
            )}
          </div>
          <label className={styles.enviarImagem}>
            Insira a foto do funcionário
            <input
              type="file"
              name="fotoFuncionario"
              onChange={previewImagem}
            />
          </label>
          <input
            type="text"
            name="nomeFuncionario"
            value={nomeFuncionario}
            placeholder="Nome do funcionário"
            onChange={(e) => setNomeFuncionario(e.target.value)}
          />

          <input
            type="text"
            name="cargoFuncionario"
            value={cargoFuncionario}
            placeholder="Cargo do funcionário"
            onChange={(e) => setCargoFuncionario(e.target.value)}
          />

          <input
            type="number"
            name="salarioFuncionario"
            value={salarioFuncionario}
            placeholder="Salário do funcionário"
            onChange={(e) => setSalarioFuncionario(e.target.value)}
            step="any"
          />

          <button>Cadastrar funcionário</button>
        </form>

        <div className={styles.containerFuncionarios}>
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
                    <button
                      onClick={() =>
                        deletarDocumento(
                          funcionario.id,
                          funcionario.imagemDocumento
                        )
                      }
                      className={styles.deletDocument}
                    >
                      X
                    </button>
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
