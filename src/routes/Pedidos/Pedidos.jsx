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
          {loading && <p>Carregando...</p>}
          {pedidos && pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <div key={pedido.id}>
                <div className={styles.cardPedido}>
                  {pedido.pedidosLista && pedido.pedidosLista.length > 0 ? (
                    pedido.pedidosLista.map((item) => (
                      <div key={item.id} className={styles.pedidoLista}>
                        <div className={styles.nomeQtd}>
                          <p>Produto: {item.nomeProduto}</p>
                          <i>x{item.quantidade}</i>
                        </div>

                        <p>
                          Subtotal: R$
                          {parseFloat(
                            item.precoProduto * item.quantidade
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>Sem itens na lista de pedidos.</p>
                  )}
                </div>
                <div className={styles.valorTotal}>
                  <h3>Total: R${parseFloat(pedido.valorTotal).toFixed(2)}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum pedido encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
