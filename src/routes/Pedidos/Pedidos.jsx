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
                <h3>
                  Valor Total: R${parseFloat(pedido.valorTotal).toFixed(2)}
                </h3>

                {/* Verifica se pedidosLista existe e possui itens */}
                {pedido.pedidosLista && pedido.pedidosLista.length > 0 ? (
                  pedido.pedidosLista.map((item) => (
                    <div key={item.id}>
                      <p>Produto: {item.nomeProduto}</p>
                      <p>Preço: R${item.precoProduto}</p>
                      <p>Quantidade: {item.quantidade}</p>
                    </div>
                  ))
                ) : (
                  <p>Sem itens na lista de pedidos.</p>
                )}
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
