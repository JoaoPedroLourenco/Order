import { useState, useEffect } from "react";
import { dataBase } from "../firebase/Config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useFetchDocumentos = (docCollection) => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(dataBase, docCollection);
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const cancelado = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocumentos(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao buscar documentos:", err);
        setError("Erro ao buscar documentos");
        setLoading(false);
      }
    );

    return () => cancelado();
  }, []);

  return { documentos, loading, error };
};
