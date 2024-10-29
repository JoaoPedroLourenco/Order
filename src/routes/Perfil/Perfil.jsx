import React, { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "../Perfil/Perfil.module.css";
import { useAuthValue } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

const Perfil = () => {
  const [popUp, setPopUp] = useState(false);

  const abrirPopUp = () => {
    setPopUp(!popUp);
  };

  const { user } = useAuthValue();

  const { sairDaConta } = useAuthentication();

  return (
    <>
      <Sidebar />
      <div className={styles.perfil}>
        <div className="title">
          <h1>Perfil</h1>
        </div>

        <div className={styles.infoUser}>
          {user && (
            <>
              <p>Nome do Restaurante: </p>
              <span>{user.displayName}</span>
              <p>Email: </p>
              <span>{user.email}</span>
            </>
          )}
        </div>

        <button onClick={abrirPopUp} className={styles.openPopUp}>
          Sair da Conta
        </button>
        {popUp && (
          <div className={styles.popUpLogOut}>
            <div className={styles.popUpCard}>
              <p>Certeza que deseja sair?</p>

              <div className={styles.btnsPopUp}>
                <button onClick={abrirPopUp} className={styles.cancelar}>
                  Cancelar
                </button>
                <button onClick={sairDaConta} className={styles.signOut}>
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Perfil;
