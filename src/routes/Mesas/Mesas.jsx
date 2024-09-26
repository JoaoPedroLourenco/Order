import React, { useState } from "react";
import { useFetchDocumentos } from "../../hooks/useResgatarProdutos";
import { useInserirMesas } from "../../hooks/useInserirMesas";

const Mesas = () => {
  const [nomeMesa, setNomeMesa] = useState("");

  const { documentos, loading } = useFetchDocumentos("mesas");
  const { inserirMesas, response } = useInserirMesas("mesas");

  const handleSubmit = (e) => {
    e.preventDefault();

    inserirMesas(nomeMesa);
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

        <div>
          {!response.loading &&
            documentos &&
            documentos.map((mesa, index) => (
              <div key={index}>
                <p>{mesa.nomeMesa}</p>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Mesas;
