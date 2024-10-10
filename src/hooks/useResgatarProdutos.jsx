import { useState, useEffect } from "react";
import { dataBase } from "../firebase/Config";
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { useAuthValue } from "../context/AuthContext";

export const useFetchDocumentos = (docCollection) => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthValue();

  useEffect(() => {
    console.log("Verificando user:", user);
    if (!user) return;
  
    setLoading(true);
  
    const collectionRef = collection(dataBase, docCollection);
    const q = query(collectionRef, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
  
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Documentos recebidos:", docs);
        setDocumentos(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao buscar documentos:", err);
        setError("Erro ao buscar documentos");
        setLoading(false);
      }
    );
  
    return () => unsubscribe();
  }, [docCollection, user]);
  
  

  return { documentos, loading, error };
};
