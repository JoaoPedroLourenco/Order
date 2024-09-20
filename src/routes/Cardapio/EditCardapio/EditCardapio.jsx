import { useState } from "react";

import styles from "../EditCardapio/EditCardapio.module.css";
import { Link } from "react-router-dom";
import { useInserirProdutos } from "../../../hooks/useInserirProdutos";

import { useResgatarProdutos } from "../../../hooks/useResgatarProdutos";

const EditCardapio = () => {
  const [imagemProduto, setImagemProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState(0.0);

  const { produtos, loading } = useResgatarProdutos("produtos");

  const { inserirProdutos, response } = useInserirProdutos("produtos");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirProdutos(
      {
        nomeProduto,
        descProduto,
        precoProduto,
      },
      imagemProduto
    );
  };

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

      <Link to="/cardapio">Voltar ao Cardápio</Link>

      <form onSubmit={handleSubmit}>
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
          {!response.loading && <button>Confirmar</button>}
          {response.loading && <button>Aguarde...</button>}
        </div>
      </form>

      <div className={styles.itensContainer}>
        {!loading &&
          produtos &&
          produtos.map((produto, index) => (
            // Envolva o conteúdo em uma div ou outro elemento JSX
            <div className={styles.cardapioItens} key={index}>
              <div className={styles.card}>
                <img src={produto.imagemProduto} alt="" />
                <div className={styles.cardEsq}>
                  <p className={styles.tituloCard}>{produto.nomeProduto}</p>
                  <p>{produto.descProduto}</p>
                  <p className={styles.preco}>
                    <span>R$</span> {produto.precoProduto}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditCardapio;
