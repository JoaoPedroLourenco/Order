// componente
import Sidebar from "../../components/Sidebar";

// estilo
import styles from "../Pedidos/Pedidos.module.css";

// hooks
import React, { useState, useEffect } from "react";
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

  const [pedidosRemovidos, setPedidosRemovidos] = useState([]);

  // Função para adicionar o ID do pedido no array de removidos
  useEffect(() => {
    const pedidosSalvos =
      JSON.parse(localStorage.getItem("pedidosRemovidos")) || [];
    setPedidosRemovidos(pedidosSalvos);
  }, []);

  const tirarPedido = (id) => {
    const novosPedidos = [...pedidosRemovidos, id];
    setPedidosRemovidos(novosPedidos);
    localStorage.setItem("pedidosRemovidos", JSON.stringify(novosPedidos));
  };

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
            pedidos
              // Filtra os pedidos que não estão no array `pedidosRemovidos`
              .filter((pedido) => !pedidosRemovidos.includes(pedido.id))
              .map((pedido) => (
                <div
                  key={pedido.id}
                  style={{
                    display: pedidosRemovidos.includes(pedido.id)
                      ? "none"
                      : "block",
                  }}
                >
                  <div className={styles.nomeMesa}>
                    <button
                      onClick={() => tirarPedido(pedido.id)}
                      className={styles.retirarPedido}
                    >
                      X
                    </button>
                    <h1>Mesa {pedido.mesaNome}</h1>
                  </div>
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
                  <div className={styles.anotacoes}>
                    <p>{pedido.anotacoes}</p>
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
