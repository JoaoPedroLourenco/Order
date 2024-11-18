import { useState, useEffect } from "react";
import { dataBase } from "../firebase/Config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useFetchMultipleCollections = (
  collections,
  search = null,
  uid = null
) => {
  const [documentos, setDocumentos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribes = [];

    collections.forEach((collectionName) => {
      const collectionRef = collection(dataBase, collectionName);

      let q = query(collectionRef);
      if (search) {
        q = query(collectionRef, where("campo", "==", search));
      } else if (uid) {
        q = query(collectionRef, where("uid", "==", uid));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocumentos((prev) => ({ ...prev, [collectionName]: docs }));
      });

      unsubscribes.push(unsubscribe);
    });

    setLoading(false);

    return () => unsubscribes.forEach((unsub) => unsub());
  }, [search, uid]);

  return { documentos, setDocumentos, loading };
};
