import { useEffect, useState } from "react";
import { dataBase } from "../firebase/Config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useResgatarProdutos = (docCollection) => {
  const [produtos, setProdutos] = useState(null);
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
  }, [docCollection]);

  return {
    produtos,
    loading,
    error,
  };
};
