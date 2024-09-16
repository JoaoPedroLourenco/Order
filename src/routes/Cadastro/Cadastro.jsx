import styles from "./Cadastro.module.css";

import Header from "../../components/Header";

import mockUpCadastroImage from "../../assets/imgs/mockUpCelular.png";
import logoBg from "../../assets/imgs/LogoBackground.png";
import olhoNormal from "../../assets/imgs/olhoNormal.png";
import olhoRiscado from "../../assets/imgs/olhoRiscado.png";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Cadastro = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const { criarUsuario, erro: authError, loading } = useAuthentication();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas precisam ser iguais");
      return;
    }

    const usuario = {
      nomeRestaurante,
      email,
      senha,
    };

    const res = await criarUsuario(usuario);

    console.log(res);

    navigate("/mesas");
  };

  useEffect(() => {
    if (authError) {
      setErro(authError);
    }
  }, [authError]);

  return (
    <div>
      <>
        <Header />
        <div className={styles.cadastro_container}>
          <div className={styles.form_container}>
            <h1>Cadastro</h1>

            <form onSubmit={handleSubmit}>
              <label>
                Nome do Restaurante:
                <input
                  type="text"
                  name="email"
                  value={nomeRestaurante}
                  required
                  onChange={(e) => setNomeRestaurante(e.target.value)}
                />
              </label>
              <label>
                E-mail:
                <input
                  type="text"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Senha:
                <input
                  type="password"
                  name="senha"
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
                {/* <button
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="btn_mostrar_senha"
                >
                  {mostrarSenha ? (
                    <img src={olhoRiscado} />
                  ) : (
                    <img src={olhoNormal} />
                  )}
                </button> */}
              </label>
              <label>
                Confirmar Senha:
                <input
                  type="password"
                  name="confirmarSenha"
                  value={confirmarSenha}
                  required
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                {/* <button
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="btn_mostrar_senha"
                >
                  {mostrarConfirmarSenha ? (
                    <img src={olhoRiscado} />
                  ) : (
                    <img src={olhoNormal} />
                  )}
                </button> */}
              </label>

              {!loading && <button className="form_btn">Confirmar</button>}
              {loading && (
                <button className="form_btn" disabled>
                  Aguarde...
                </button>
              )}
              {erro && <p className="erro">{erro}</p>}
            </form>
          </div>

          <div
            className={styles.lado_dir}
            style={{
              backgroundImage: `url(${logoBg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "50%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={mockUpCadastroImage} alt="Use Order!" />
          </div>
        </div>
      </>
    </div>
  );
};

export default Cadastro;
