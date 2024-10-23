import styles from "./Cadastro.module.css";

import Header from "../../components/Header";

import mockUpCadastroImage from "../../assets/imgs/mockUpCelular.png";
import logoBg from "../../assets/imgs/LogoBackground.png";
import google from "../../assets/imgs/Google.png";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const Cadastro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const {
    criarUsuario,
    entrarComGoogle,
    error: erroAutenticacao,
    loading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");

    const usuario = {
      displayName,
      email,
      senha,
    };

    if (senha !== confirmarSenha) {
      setErro("As senhas precisam ser iguais");
      return;
    }

    const response = await criarUsuario(usuario);

    console.log(response);
  };

  useEffect(() => {
    if (erroAutenticacao) {
      setErro(erroAutenticacao);
    }
  }, [erroAutenticacao]);

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
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </label>
              <label>
                E-mail:
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Senha:
                <input
                  type="password"
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </label>
              <label>
                Confirmar Senha:
                <input
                  type="password"
                  name="confirmarSenha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </label>
              <button onClick={entrarComGoogle} className="btnGoogle">
                <img src={google} alt="google" />
                Entrar com google
              </button>

              {!loading && <button className="form_btn">Confirmar</button>}
              {loading && (
                <button className="form_btn" disabled>
                  Aguarde...
                </button>
              )}

              {user ? navigate("/mesas") : ""}

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
