import { useEffect, useState } from "react";
import { dataBase } from "../firebase/Config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

// produtos do cardápio
export const useResgatarProdutos = (docCollection) => {
  const [produtos, setProdutos] = useState(null);
  const [mesas, setMesas] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // indica se os dados estão sendo carregados

  useEffect(() => {
    const collectionRef = collection(dataBase, docCollection);
    const ordenar = query(collectionRef, orderBy("createdAt", "desc"));

    const cancelamento = onSnapshot(
      ordenar,
      (querySnapshot) => {
        console.log("Snapshot atualizado");
        if (querySnapshot.empty) {
          setProdutos([]);
          setMesas([]);
        } else {
          setProdutos(
            querySnapshot.docs.map((produto) => ({
              id: produto.id,
              ...produto.data(),
            }))
          );
        }
        setLoading(false); // Atualiza o loading ao final da busca
        console.log(
          "Produtos atualizados:",
          querySnapshot.docs.map((doc) => doc.data())
        ); // Novo log para debug
      },
      (error) => {
        console.log(error);
        setError("Erro ao buscar produtos");
        setLoading(false);
      }
    );

    return () => {
      console.log("Desmontando o listener");
      cancelamento();
    };
  }, []);

  return {
    produtos,
    mesas,
    loading,
    error,
  };
};

// mesas
export const useResgatarMesas = (docCollection) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  const resgatarMesas = async () => {
    setLoading(true);
    try {
      const collectionRef = (dataBase, docCollection);

      await addDoc(collectionRef, {
        mesas,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      setError("Erro ao criar mesa");
      setLoading(false);
    }
  };

  return {
    resgatarMesas,
    loading,
    error,
  };
};
