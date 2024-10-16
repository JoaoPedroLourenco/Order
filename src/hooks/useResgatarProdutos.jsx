import { useState, useEffect } from "react";
import { dataBase } from "../firebase/Config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(dataBase, docCollection);

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where("nomeProduto", "==", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
