import { useState, useEffect, useReducer } from "react";
import { dataBase, storage } from "../firebase/Config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

export const useInsertDocuments = (docCollection, user) => {
  const [response, dispatch] = useReducer(inserirReducer, estadoInicial);

  const [cancelado, setCancelado] = useState(false);

  const checarCanceladoAntesDoDispatch = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const inserirDocumentos = async (dados, imagemDocumento) => {
    checarCanceladoAntesDoDispatch({ type: "LOADING" });

    try {
      let imageURL = "";

      if (imagemDocumento) {
        const storageRef = ref(storage, `images/${imagemDocumento.name}`);

        const uploadTask = await uploadBytesResumable(
          storageRef,
          imagemDocumento
        );
        imageURL = await getDownloadURL(uploadTask.ref);
      }

      const novoDocumento = {
        ...dados,
        ...(imageURL && { imagemDocumento: imageURL }),
        uid: user.uid,
        createdAt: Timestamp.now(),
      };

      const documentoInserido = await addDoc(
        collection(dataBase, docCollection),
        novoDocumento,
        { merge: true }
      );

      checarCanceladoAntesDoDispatch({
        type: "INSERTED_DOC",

        payload: documentoInserido,
      });
    } catch (error) {
      checarCanceladoAntesDoDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { inserirDocumentos, response };
};
