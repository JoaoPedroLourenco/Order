import { useState, useEffect, useReducer } from "react";
import { dataBase } from "../firebase/Config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const estadoInicial = {
  loading: null,
  error: null,
};

const inserirReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInserirItens = (docCollection) => {
  const [response, dispatch] = useReducer(inserirReducer, estadoInicial);
  const [cancelado, setCancelado] = useState(null);

  const checarCanceladoAntesDoDispatch = () => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const inserirItens = async (item) => {
    checarCanceladoAntesDoDispatch({ type: "LOADING" });

    try {
      const novoItem = {
        ...item,
        createdAt: Timestamp.now(),
      };

      const itemInserido = await addDoc(
        collection(dataBase, docCollection),
        novoItem
      );

      checarCanceladoAntesDoDispatch({
        type: "INSERTED_DOC",
        payload: itemInserido,
      });
    } catch (error) {
      checarCanceladoAntesDoDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  });

  return { inserirItens, response };
};
