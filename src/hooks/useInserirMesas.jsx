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

export const useInserirMesas = (docCollection, user) => {
  const [response, dispatch] = useReducer(inserirReducer, estadoInicial);
  const [cancelado, setCancelado] = useState(null);

  const checarCanceladoAntesDoDispatch = () => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const inserirMesas = async (mesa) => {
    checarCanceladoAntesDoDispatch({ type: "LOADING" });

    try {
      const novaMesa = {
        ...mesa,
        uid: user.uid,
        createdAt: Timestamp.now(),
      };

      const mesaInserida = await addDoc(
        collection(dataBase, docCollection),
        novaMesa,
        { merge: true }
      );

      checarCanceladoAntesDoDispatch({
        type: "INSERTED_DOC",
        payload: mesaInserida,
      });
    } catch (error) {
      checarCanceladoAntesDoDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  });

  return { inserirMesas, response };
};
