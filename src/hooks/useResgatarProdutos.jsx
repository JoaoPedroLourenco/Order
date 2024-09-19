import { useEffect, useState } from "react";
import { dataBase } from "../firebase/Config";

import { collection, query, orderBy, onSnapshot} from "firebase/firestore";


export const useInserirProdutos = (docCollection) => {
    const [produtos, setProdutos] = useState(null)
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(true) // indica se os dados estão sendo carregados

    useEffect(() => {
        const collectionRef = collection(dataBase, docCollection)

        // ordernar os itens inseridos com base na ordem de criação e em ordem decrescente
        const ordenar = query(collectionRef, orderBy("createdAt", "desc"))

        const cancelamento = onSnapshot(
            ordenar,
            (querySnapshot) => {
                if(querySnapshot.empty){
                    setProdutos([])
                }
                else{
                    setProdutos(
                        querySnapshot.docs.map((produto) => ({
                            id: produto.id,
                            ...produto.data()
                        }))
                    )
                }
                (error) => {
                    console.log(error)
                    setError("Erro ao buscar produtos")
                    setLoading(false)
                }
                
            }
            
        )
        return () => cancelamento()
    }, [docCollection])


    return{
        produtos,
        loading,
        error
    }
}