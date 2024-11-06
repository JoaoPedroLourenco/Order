import { useState, useEffect } from "react";
import { dataBase } from "../firebase/Config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollections,
  search = null,
  uid = null
) => {
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribes = []; // Array para armazenar as funções de cancelamento de cada snapshot

    const fetchCollections = async () => {
      try {
        const collectionsData = {};

        docCollections.forEach((col) => {
          const collectionRef = collection(dataBase, col);
          let q;

          if (search) {
            q = query(
              collectionRef,
              where("nomeProduto", "==", search),
              orderBy("createdAt", "desc")
            );
          } else if (uid) {
            q = query(
              collectionRef,
              where("uid", "==", uid),
              orderBy("createdAt", "desc")
            );
          } else {
            q = query(collectionRef, orderBy("createdAt", "desc"));
          }

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            collectionsData[col] = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocuments((prev) => ({ ...prev, [col]: collectionsData[col] }));
            setLoading(false);
          });

          unsubscribes.push(unsubscribe); // Armazena a função de cancelamento
        });
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar documentos");
      }
    };

    fetchCollections();

    // Limpa as escutas ao desmontar o componente
    return () => unsubscribes.forEach((unsub) => unsub());
  }, [search, uid]);

  return { documents, loading, error };
};
