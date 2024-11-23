import Sidebar from "../../../components/Sidebar";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import "../Mesa Individual/Mesa.css";

import { Link, useParams } from "react-router-dom";

import voltar from "../../../assets/imgs/Back.png";
import fundoCaderno from "../../../assets/imgs/fundoCaderno.jpg";

import useFetchMenuItems from "../../../hooks/usePedido";

import { useAuthValue } from "../../../context/AuthContext";

import { useInsertDocuments } from "../../../hooks/useInsertDocuments";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import { dataBase } from "../../../firebase/Config";

import { doc, getDoc } from "firebase/firestore";

const Mesa = () => {
  const { id } = useParams();

  const { user } = useAuthValue();
  const uid = user.uid;

  const [mesaNome, setMesaNome] = useState("");
  const navigate = useNavigate();
  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );
  const { inserirDocumentos } = useInsertDocuments("pedidos", user);
  const [pedidosLista, setPedidosLista] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [anotacoes, setAnotacoes] = useState("");

  // Buscar o nome da mesa ao carregar a página
  useEffect(() => {
    const fetchMesaNome = async () => {
      const mesaRef = doc(dataBase, "mesas", id);
      const mesaSnap = await getDoc(mesaRef);

      if (mesaSnap.exists()) {
        setMesaNome(mesaSnap.data().nomeMesa);
      } else {
        console.log("Mesa não encontrada.");
      }
    };
    fetchMesaNome();
  }, [id]);

  const salvarPedido = async (e) => {
    e.preventDefault();

    if (pedidosLista.length === 0) {
      throw new Error("insira produtos ao pedido");
    } else {
      await inserirDocumentos({
        mesaNome,
        pedidosLista,
        valorTotal,
        anotacoes,
        createdBy: user.displayName,
        uid: user.uid,
        createdAt: Timestamp.now(),
      });

      navigate("/pedidos");
      setPedidosLista([]);
      setValorTotal(0);
      setAnotacoes("");
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
        if (listaAtualizada[indiceItemExistente].quantidade <= 0) {
          listaAtualizada.splice(indiceItemExistente, 1);
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
    // if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
  }

  const limparPedido = () => {
    setPedidosLista([]);
    setValorTotal(0);
  };

  return (
    <>
      <Sidebar />
      <div className="mesa">
        <div className="title">
          <h1>{mesaNome ? `Mesa ${mesaNome}` : "Carregando..."}</h1>
        </div>

        <Link to="/mesas" className="voltar">
          <img src={voltar} alt="" />
        </Link>

        <div className="allItensContainer">
          <div className="containerProdutos">
            {!loading &&
              produtos &&
              produtos.map((produto, index) => (
                <div key={index}>
                  <div className="cardProduto">
                    <img src={produto.imagemDocumento} alt="" />
                    <div className="cardEsq">
                      <h1 className="tituloProduto">{produto.nomeProduto}</h1>
                      <p className="descProduto">{produto.descProduto}</p>
                      <p className="preco">
                        <button
                          onClick={() => addItemNaLista(produto)}
                          className="addItem"
                        >
                          +
                        </button>
                        <span>R$</span>
                        <span className="precoProduto">
                          {parseFloat(produto.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <ListaPedidos mesaId={id} />

          <div className="pedido_total">
            <div className="pedido">
              <p className="tituloCard">Itens adicionados</p>
              <div className="pedidoLista">
                {pedidosLista.map((item) => (
                  <div key={item.id} className="cardPedido">
                    <div className="produtoPreco">
                      <p>{item.nomeProduto}</p>
                      <p className="qtd">x{item.quantidade}</p>
                    </div>
                    <div className="subTotal">
                      <p>
                        Subtotal: R$
                        {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                      <button onClick={() => removeItemNaLista(item)}>-</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="limparPedido">
                <button onClick={limparPedido}>Limpar lista</button>
              </div>
            </div>
            <div className="totalPedido">
              <h3>Total: R${valorTotal.toFixed(2)}</h3>
            </div>
          </div>
          <div className="anotacoes">
            <p>Anotações</p>
            <textarea
              placeholder="Exemplo: X-Bacon sem salada..."
              value={anotacoes}
              onChange={(e) => setAnotacoes(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button onClick={salvarPedido} className="form_btn">
          Salvar Pedido
        </button>
      </div>
    </>
  );
};

export default Mesa;
