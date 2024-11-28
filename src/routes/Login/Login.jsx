import { useEffect, useState } from "react";

import "./Login.css";

import mockUpLoginImage from "../../assets/imgs/MacBook Pro and iPhone 15 Pro Mockup.png";
import logoBg from "../../assets/imgs/LogoBackground.png";
import google from "../../assets/imgs/Google.png";

import Header from "../../components/Header";
import { useAuthentication } from "../../hooks/useAuthentication";

import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const {
    login,
    entrarComGoogle,
    erro: authError,
    loading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const usuario = {
      email,
      senha,
    };

    const res = await login(usuario);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setErro(authError);
    }
  }, [authError]);

  return (
    <>
      {user ? navigate("/mesas") : ""}

      <Header />
      <div className="login_container">
        <div className="formContainer">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
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

            {erro && <p className="erro">{erro}</p>}
          </form>
        </div>

        <div
          className="lado_dir"
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
          <img src={mockUpLoginImage} alt="Use Order!" className="mockUp" />
        </div>
      </div>
    </>
  );
};

export default Login;
