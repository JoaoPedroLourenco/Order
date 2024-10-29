import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import styles from "../Pedidos/Pedidos.module.css";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useAuthValue } from "../../context/AuthContext";

const Pedidos = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: pedidos, loading } = useFetchDocuments(
    "pedidos",
    null,
    uid
  );

  return (
    <>
      <Sidebar />
      <div className={styles.pedidos}>
        <div className="title">
          <h1>Pedidos</h1>
        </div>

        <div className={styles.containerPedidos}>
          {pedidos &&
            pedidos.map((pedido) => (
              <div key={pedido.id}>
                {parseFloat(pedido.valorTotal).toFixed(2)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
