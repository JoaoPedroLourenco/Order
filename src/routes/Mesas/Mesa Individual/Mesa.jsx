import Sidebar from "../../../components/Sidebar";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import styles from "../Mesa Individual/Mesa.module.css";

import { Link, useParams } from "react-router-dom";

import seta from "../../../assets/imgs/downArrow.png";

import useFetchMenuItems from "../../../hooks/usePedido";

import { useAuthValue } from "../../../context/AuthContext";

import { useState, useEffect } from "react";

const Mesa = () => {
  const { id } = useParams();

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );

  const [pedidosLista, setPedidosLista] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  const addItemNaLista = (item) => {
    const preco = parseFloat(item.precoProduto);

    setPedidosLista((prevList) => {
      const indiceItemExistente = prevList.findIndex((i) => i.id === item.id);

      if (indiceItemExistente !== -1) {
        const listaAtualizada = [...prevList];
        listaAtualizada[indiceItemExistente].quantidade += 1;
        return listaAtualizada;
      } else {
        return [...prevList, { ...item, quantidade: 1, preco }];
      }
    });
  };

  useEffect(() => {
    const novoTotal = pedidosLista.reduce((acc, item) => {
      return acc + (item.preco * item.quantidade || 0);
    }, 0);
    setValorTotal(novoTotal);
  }, [pedidosLista]);

  function ListaPedidos({ mesaId }) {
    const { menuItems, loading, error } = useFetchMenuItems(mesaId);
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.name} - R${parseFloat(item.preco).toFixed(2)}
              <button onClick={() => addItemToOrderList(item)}>
                Adicionar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={styles.mesa}>
        <Link to="/mesas" className={styles.voltar}>
          <img src={seta} alt="" />
        </Link>
        <div className="title">
          <h1>Mesa {id}</h1>
        </div>

        <div className={styles.itensContainer}>
          {loading && <p>Carregando...</p>}
          {!loading &&
            produtos &&
            produtos.map((produto, index) => (
              <div key={index}>
                {console.log("Produto:", produto)}
                <div className={styles.cardProduto}>
                  <img src={produto.imagemDocumento} alt="" />
                  <div className={styles.cardEsq}>
                    <h1 className={styles.tituloProduto}>
                      {produto.nomeProduto}
                    </h1>
                    <p className={styles.descProduto}>{produto.descProduto}</p>
                    <p className={styles.preco}>
                      <button onClick={() => addItemNaLista(produto)}>
                        Adicionar
                      </button>
                      <span>R$</span>
                      <span className={styles.precoProduto}>
                        {produto.precoProduto}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}

          <ListaPedidos mesaId={id} />

          <div className={styles.pedido}>
            <div className={styles.pedidoLista}>
              {pedidosLista.map((item) => (
                <div key={item.id} className={styles.cardPedido}>
                  <div className={styles.produtoPreco}>
                    <p>{item.nomeProduto}</p>
                    <p>x{item.quantidade}</p>
                  </div>
                  <div className={styles.subTotal}>
                    <p>
                      Subtotal: R$
                      {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pedidoTotal}>
              <h3>Valor Total: R${valorTotal.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mesa;