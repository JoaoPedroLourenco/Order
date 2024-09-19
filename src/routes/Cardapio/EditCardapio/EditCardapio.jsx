import React, { useState } from "react";

import styles from "../EditCardapio/EditCardapio.module.css";

const EditCardapio = () => {
  const [imagemProduto, setImagemProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState(0.0);

  function previewImagem(e) {
    // o .files cria um array quando uma imagem é selecionada
    // colocando o índice 0 indica que o que queremos é a primeira imagem
    const arquivoSelecionado = e.target.files[0];
    setImagemProduto(arquivoSelecionado); // Armazena o arquivo de imagem
  }

  return (
    <div className={styles.editCardapio}>
      <div className="title">
        <h1>Editar Cardápio</h1>
      </div>

      <form>
        <div className={styles.uploadImagemProduto}>
          <div className={styles.imagePreview}>
            {imagemProduto && (
              <img
                src={URL.createObjectURL(imagemProduto)}
                alt="imagem do produto"
              />
            )}
          </div>
          <input type="file" name="imagemProduto" onChange={previewImagem} />
        </div>

        <div className={styles.infoProdutos}>
          <input
            type="text"
            name="nomeProduto"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <input
            type="text"
            name="descProduto"
            value={descProduto}
            onChange={(e) => setDescProduto(e.target.value)}
          />
          <input
            type="number"
            name="precoProduto"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />
          <button>Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCardapio;
