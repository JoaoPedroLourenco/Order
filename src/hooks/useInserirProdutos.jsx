import { useState, useEffect, useReducer } from "react";
import { dataBase, storage } from "../firebase/Config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";


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



export const useInserirProdutos = (docCollection) => {
  const [response, dispatch] = useReducer(inserirReducer, estadoInicial);
  const [cancelado, setCancelado] = useState(false);

  const checarCanceladoAntesDoDispatch = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const inserirProdutos = async (dados, imagemProduto) => {
    checarCanceladoAntesDoDispatch({ type: "LOADING" });
  
    try {
      let imageURL = "";
  
      if (imagemProduto) {
        const storageRef = ref(storage, `images/${imagemProduto.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imagemProduto);
        imageURL = await getDownloadURL(uploadTask.ref);
      }
  
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

  
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }
  
      const novoProduto = {
        ...dados,
        ...(imageURL && { imagemProduto: imageURL }),
        uid: userId, 
        createdAt: Timestamp.now(),
      };
  
      const produtoInserido = await addDoc(collection(dataBase, docCollection), novoProduto);
  
      checarCanceladoAntesDoDispatch({ type: "INSERTED_DOC", payload: produtoInserido });
    } catch (error) {
      checarCanceladoAntesDoDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { inserirProdutos, response };
};
