import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../EditCardapio/EditCardapio.module.css";
import { useInserirProdutos } from "../../../hooks/useInserirProdutos";
import { useFetchDocumentos } from "../../../hooks/useResgatarProdutos";

const EditCardapio = () => {
  const [imagemProduto, setImagemProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState(0.0);

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
          {/* <select
            name="selectArea"
            value={selectArea}
            onChange={(e) => setSelectArea(e.target.value)}
          >
            <option value="pratosPrincipais">Pratos Principais</option>
            <option value="bebidas">Bebidas</option>
            <option value="outros">Outros</option>
          </select> */}

          {!response.loading && <button>Confirmar</button>}
          {response.loading && <button>Aguarde...</button>}
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
                    {produto.precoProduto}
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
