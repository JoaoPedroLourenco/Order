import { dataBase } from "../firebase/Config";

import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  // cleanup
  // lidando com vazamento de memória
  function checarSeFoiCancelado() {
    if (cancelled) {
      return;
    }
  }

  const criarUsuario = async (data) => {
    checarSeFoiCancelado();
    setLoading(true);
    setErro(null);

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
        displayName: data.nomeRestaurante,
      });

      return usuario;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setLoading(false);
      setErro(systemErrorMessage);
    }
  };

  const login = async (data) => {
    checarSeFoiCancelado();

    setLoading(true);
    setErro(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.senha);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
    }
  };

  const logOut = () => {
    checarSeFoiCancelado();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    loading,
    erro,
    criarUsuario,
    login,
    logOut,
  };
};
