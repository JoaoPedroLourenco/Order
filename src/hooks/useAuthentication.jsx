import { dataBase } from "../firebase/Config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  // lidando com vazamento de memória
  const [cancelado, setCancelado] = useState(false);

  // usado para não deixar "resquícios" de funções usadas
  function checarSeFoiCancelado() {
    if (cancelado) {
      return;
    }
  }

  // entrar usando o google
  const entrarComGoogle = async () => {
    checarSeFoiCancelado();
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
    }

    setError(error);
    setLoading(false);
  };

  // função de cadastro de usuário
  const criarUsuario = async (data) => {
    checarSeFoiCancelado();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );

      // é preciso atualizar o perfil adicionando o nome de display
      // o firebase permite que crie contas com email e senha apenas
      const usuario = userCredential.user;

      await updateProfile(usuario, {
        displayName: data.displayName,
      });

      // Recarrega os dados do usuário para garantir que o displayName foi atualizado
      await usuario.reload();

      return usuario;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let mensagemErroDoSistema;

      if (error.message.includes("password")) {
        mensagemErroDoSistema = "A senha precisa ter pelo menos 6 caractéres!";
      } else if (error.message.includes("email-already")) {
        mensagemErroDoSistema = "E-mail já cadastrado.";
      } else {
        mensagemErroDoSistema = "Ocorreu um erro, tente novamente mais tarde";
      }

      setLoading(false);
      setError(mensagemErroDoSistema);
    }
  };

  // função de login
  const login = async (data) => {
    checarSeFoiCancelado();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.senha);
      setLoading(false);
    } catch (error) {
      let mensagemErroDoSistema;
      if (error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
        mensagemErroDoSistema = "Email ou Senha incorretos";
      }

      setError(mensagemErroDoSistema);
      setLoading(false);
    }

    setLoading(false);
  };

  // função de logOut / sair da conta
  const sairDaConta = () => {
    checarSeFoiCancelado();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return {
    auth,
    criarUsuario,
    error,
    loading,
    entrarComGoogle,
    login,
    sairDaConta,
  };
};
