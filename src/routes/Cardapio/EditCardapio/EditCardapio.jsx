import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../EditCardapio/EditCardapio.module.css";
import { useInserirProdutos } from "../../../hooks/useInserirProdutos";
import { useFetchDocumentos } from "../../../hooks/useResgatarProdutos";

import uploadImagem from "../../../assets/imgs/imageUpload.png";

const EditCardapio = () => {
  const [imagemProduto, setImagemProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const { documentos, loading } = useFetchDocumentos("produtos");
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

    setNomeProduto("");
    setDescProduto("");
    setPrecoProduto(0);
    setImagemProduto(null);
  };

  const previewImagem = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagemProduto(arquivoSelecionado); // Armazena o arquivo de imagem
  };

  return (
    <div className={styles.editCardapio}>
      <div className="title">
        <h1>Editar Cardápio</h1>
      </div>

      <Link to="/cardapio">Voltar ao Cardápio</Link>

      <form onSubmit={handleSubmit}>
        <div className={styles.uploadImagemProduto}>
          <div className={styles.imagePreview}>
            {!imagemProduto && <p>Preview da imagem</p>}
            {imagemProduto && (
              <img
                src={URL.createObjectURL(imagemProduto)}
                alt="imagem do produto"
              />
            )}
          </div>
          <label className={styles.enviarImagem}>
            <img src={uploadImagem} alt="" />
            Insira uma imagem
            <input type="file" name="imagemProduto" onChange={previewImagem} />
          </label>
        </div>

        <div className={styles.infoProdutos}>
          <input
            type="text"
            name="nomeProduto"
            value={nomeProduto}
            placeholder="Insira o nome do produto"
            required
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <textarea
            name="descProduto"
            value={descProduto}
            placeholder="Insira uma descrição para o produto"
            required
            onChange={(e) => setDescProduto(e.target.value)}
          ></textarea>

          <input
            type="number"
            name="precoProduto"
            value={precoProduto}
            placeholder="Insira o preço do produto"
            required
            onChange={(e) => setPrecoProduto(e.target.value)}
          />

          {!response.loading && <button className="form_btn">Confirmar</button>}
          {response.loading && <button className="form_btn">Aguarde...</button>}
        </div>
      </form>

      <div className={styles.itensContainer}>
        {!loading &&
          documentos &&
          documentos.map((produto, index) => (
            <div key={index}>
              <div className={styles.cardProduto}>
                <img src={produto.imagemProduto} alt="" />
                <div className={styles.cardEsq}>
                  <h1 className={styles.tituloProduto}>
                    {produto.nomeProduto}
                  </h1>
                  <p className={styles.descProduto}>{produto.descProduto}</p>
                  <p className={styles.preco}>
                    <span>R$</span>
                    <span className={styles.precoProduto}>
                      {produto.precoProduto}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        {loading && (
          <div className="loading">
            <div className="bouncing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCardapio;
