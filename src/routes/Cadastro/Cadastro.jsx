import styles from "./Cadastro.module.css";

import Header from "../../components/Header";

import mockUpCadastroImage from "../../assets/imgs/mockUpCelular.png";
import logoBg from "../../assets/imgs/LogoBackground.png";

import { useState } from "react";

const Cadastro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
                  type="password"
                  name="senha"
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
              </label>
              <label>
                Confirmar Senha:
                <input
                  type="password"
                  name="senha"
                  value={confirmarSenha}
                  required
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
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
