import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { dataBase } from "../firebase/Config";
import { useEffect, useState } from "react";

export const useFetchMultipleCollections = (
  collections,
  search = null,
  uid = null
) => {
  const [documentos, setDocumentos] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelado, setCancelado] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      if (cancelado) return;
      setLoading(true);

      try {
        const fetchCollectionData = async (docCollection) => {
          const collectionRef = collection(dataBase, docCollection);
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

          return new Promise((resolve) => {
            onSnapshot(q, (querySnapshot) => {
              resolve(
                querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
              );
            });
          });
        };
        const results = await Promise.all(
          collections.map(async (col) => {
            const data = await fetchCollectionData(col);
            return { [col]: data };
          })
        );
        setDocumentos(results.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    }

    carregarDados();
    setCancelado(false);
  }, [search, uid, cancelado]);

  useEffect(() => () => setCancelado(true), []);

  return { documentos, loading, error };
};
