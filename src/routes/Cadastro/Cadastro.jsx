import styles from "./Cadastro.module.css";

import Header from "../../components/Header";

import mockUpCadastroImage from "../../assets/imgs/mockUpCelular.png";
import logoBg from "../../assets/imgs/LogoBackground.png";
import olhoNormal from "../../assets/imgs/olhoNormal.png";
import olhoRiscado from "../../assets/imgs/olhoRiscado.png";

import { useState } from "react";

const Cadastro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
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
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="btn_mostrar_senha"
                >
                  {mostrarSenha ? (
                    <img src={olhoRiscado} />
                  ) : (
                    <img src={olhoNormal} />
                  )}
                </button>
              </label>
              <label>
                Confirmar Senha:
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  value={confirmarSenha}
                  required
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <button
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
                </button>
              </label>

              <button className="form_btn">Confirmar</button>
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
