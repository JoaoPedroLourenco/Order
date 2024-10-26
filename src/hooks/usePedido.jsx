import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase/Config";

const firestore = getFirestore(app);

function useFetchMenuItems(mesaId) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const produtosRef = collection(firestore, "produtos");
        // Cria uma query para buscar os produtos com base no "mesaId"
        const q = query(produtosRef, where("mesaId", "==", mesaId));
        const querySnapshot = await getDocs(q);

        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMenuItems(itemsData);
      } catch (err) {
        console.error("Erro ao buscar o cardápio:", err);
        setError("Erro ao buscar os itens do menu");
      } finally {
        setLoading(false);
      }
    };

    if (mesaId) {
      fetchMenuItems();
    } else {
      setMenuItems([]);
      setLoading(false);
    }
  }, [mesaId]);

  return { menuItems, loading, error };
}

export default useFetchMenuItems;
