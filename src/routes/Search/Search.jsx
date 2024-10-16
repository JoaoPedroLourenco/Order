import React from "react";

import { useFetchDocuments } from "../../hooks/useResgatarProdutos";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q"); //função do useSearchParams

  return (
    <div>
      <h1>Procura</h1>
      <p>{search}</p>
    </div>
  );
};

export default Search;
