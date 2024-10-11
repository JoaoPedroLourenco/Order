import { useState, useEffect, useReducer } from "react";
import { dataBase, storage } from "../firebase/Config";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const estadoInicial = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocumentos = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, estadoInicial);
  const [cancelado, setCancelado] = useState(false);

  const checarCanceladoAntesDoDispatch = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const deletarDocumento = async (id, imagemProduto) => {
    console.log("Deletando documento...");
    checarCanceladoAntesDoDispatch({ type: "LOADING" });

    try {
      const documentoDeletado = await deleteDoc(
        doc(dataBase, docCollection, id)
      );
      console.log("Documento deletado com sucesso!");

      if (imagemProduto) {
        console.log("Deletando imagem...");
        const storageRef = ref(storage, imagemProduto);
        await deleteObject(storageRef);
        console.log("Imagem deletada com sucesso!");
      }

      checarCanceladoAntesDoDispatch({
        type: "DELETED_DOC",
        payload: documentoDeletado,
      });
    } catch (error) {
      console.error("Erro ao deletar documento ou imagem:", error);
      checarCanceladoAntesDoDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { deletarDocumento, response };
};
