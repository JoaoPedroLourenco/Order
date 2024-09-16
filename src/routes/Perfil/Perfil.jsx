import React from "react";
import { useAuthValue } from "../../context/AuthContext";

const Perfil = () => {
  const { user } = useAuthValue();

  return (
    <div>
      <div className="title">
        <h1>Perfil</h1>
      </div>
      <p>{user.nomeRestaurante}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Perfil;
