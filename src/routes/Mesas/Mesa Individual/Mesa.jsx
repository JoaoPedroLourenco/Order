import Sidebar from "../../../components/Sidebar";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import styles from "../Mesa Individual/Mesa.module.css";

import { Link, useParams } from "react-router-dom";

import seta from "../../../assets/imgs/downArrow.png";

import useFetchMenuItems from "../../../hooks/usePedido";

import { useAuthValue } from "../../../context/AuthContext";

import { useInsertDocuments } from "../../../hooks/useInsertDocuments";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const Mesa = () => {
  const { id } = useParams();

  const { user } = useAuthValue();
  const uid = user.uid;

  const navigate = useNavigate()

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );

  const { inserirDocumentos } = useInsertDocuments("pedidos", user);

  const [pedidosLista, setPedidosLista] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  const salvarPedido = async (e) => {
    e.preventDefault();

    if(pedidosLista.length === 0){
      throw new Error("insira produtos ao pedido")
    }
    else{
      await inserirDocumentos({
        pedidosLista,
        valorTotal,
        createdBy: user.displayName,
        uid: user.uid,
        createdAt: Timestamp.now()
      });

      navigate("/pedidos")
      setPedidosLista([])
      setValorTotal(0)
    }

    
  };

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

  const removeItemNaLista = (item) => {
    const preco = parseFloat(item.precoProduto);

    setPedidosLista((prevList) => {
      const indiceItemExistente = prevList.findIndex((i) => i.id === item.id);

      if (indiceItemExistente !== -1) {
        const listaAtualizada = [...prevList];
        listaAtualizada[indiceItemExistente].quantidade -= 1;
        if(listaAtualizada[indiceItemExistente].quantidade <= 0){

        }
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
              <button onClick={() => (item)}>
                Adicionar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // const { inserirDocumentos, response: insertResponse } = useInsertDocuments(
  //   "pedidos",
  //   user
  // );

  // const salvarPedido = async (e) => {
  //   e.preventDefault();

  //   const dadosPedido = {
  //     mesaId: id,
  //     pedidosLista,
  //     valorTotal,
  //     uid,
  //   };

  //   try {
  //     await inserirDocumentos(dadosPedido);
  //     setPedidosLista([]); // Limpar a lista de pedidos após salvar
  //     setValorTotal(0);
  //   } catch (error) {
  //     console.error("Erro ao salvar pedido:", error);
  //   }
  // };

  const limparPedido = () => {
    setPedidosLista([]);
    setValorTotal(0);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.mesa}>
        <Link to="/mesas" className={styles.voltar}>
          <img src={seta} alt="" />
        </Link>
        <div className="title"></div>
        <button onClick={salvarPedido}>Salvar Pedido</button>

        <div className={styles.itensContainer}>
          {loading && <p>Carregando...</p>}
          {!loading &&
            produtos &&
            produtos.map((produto, index) => (
              <div key={index}>
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
                      <button onClick={() => removeItemNaLista(item)}>
                        Adicionar
                      </button>
                </div>
              ))}
            </div>

            <div className={styles.pedidoTotal}>
              <h3>Valor Total: R${valorTotal.toFixed(2)}</h3>
              <button onClick={limparPedido}>Limpar</button>
              {/* <form onSubmit={salvarPedido}>
                <button>fechar pedido</button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mesa;
