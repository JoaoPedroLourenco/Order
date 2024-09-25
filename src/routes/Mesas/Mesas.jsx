import React, { useState } from "react";
import { useResgatarMesas } from "../../hooks/useResgatarProdutos";
import { useInserirProdutos } from "../../hooks/useInserirProdutos";

const Mesas = () => {
  const [nomeMesa, setNomeMesa] = useState("");

  const { resgatarMesas, loading, error } = useResgatarMesas("mesas");
  const { inserirProdutos, response } = useInserirProdutos("mesas");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirProdutos(nomeMesa);
  };

  return (
    <div>
      <div className="title">
        <h1>Mesas</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeMesa"
          value={nomeMesa}
          onChange={(e) => setNomeMesa(e.target.value)}
        />
        {!loading && <button>Criar Mesa</button>}
        {loading && <button disabled>Aguarde...</button>}

        <div></div>
      </form>
    </div>
  );
};

export default Mesas;
