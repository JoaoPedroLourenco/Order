import React, { useState } from "react";
// import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from '../Perfil/Perfil.module.css'

const Perfil = () => {
  // const { user } = useAuthValue();

  const [popUp, setPopUp] = useState(false)

  const abrirPopUp = () => {
    setPopUp(!popUp)
  }
  

  const {logOut} = useAuthentication()

  return (
    <div>
      <div className="title">
        <h1>Perfil</h1>
      </div>
      {/* <p>{user.email}</p> */}


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
              <button onClick={logOut} className={styles.signOut}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Perfil;
