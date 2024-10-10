import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../EditCardapio/EditCardapio.module.css";
import { useInserirProdutos } from "../../../hooks/useInserirProdutos";
import { useFetchDocumentos } from "../../../hooks/useResgatarProdutos";
import uploadImagem from "../../../assets/imgs/imageUpload.png";
import Sidebar from "../../../components/Sidebar";
import { useDeleteDocumentos } from "../../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../../context/AuthContext";
import { addUidToDocuments } from "../../../hooks/updateUid";

const EditCardapio = () => {
  const [imagemProduto, setImagemProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const { documentos, loading } = useFetchDocumentos("produtos");
  const { inserirProdutos, response } = useInserirProdutos("produtos");
  const { deletarDocumento } = useDeleteDocumentos("produtos");
  const { user } = useAuthValue();

  useEffect(() => {
    const updateUids = async () => {
      await addUidToDocuments();
    };

    if (user) {
      updateUids();
    }
  }, [user]); // Chama a função quando o usuário muda ou é autenticado

  const handleSubmit = async (e) => {
    e.preventDefault();

    await inserirProdutos(
      {
        nomeProduto,
        descProduto,
        precoProduto,
        uid: user.uid,
      },
      imagemProduto
    );

    // Resetando os campos
    setNomeProduto("");
    setDescProduto("");
    setPrecoProduto("");
    setImagemProduto(null);
  };

  const previewImagem = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagemProduto(arquivoSelecionado);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.editCardapio}>
        <div className="title">
          <h1>Editar Cardápio</h1>
        </div>
        <Link to="/cardapio">Voltar ao Cardápio</Link>
        <form onSubmit={handleSubmit}>
          <div className={styles.uploadImagemProduto}>
            <div className={styles.imagePreview}>
              {!imagemProduto ? (
                <p>Preview da imagem</p>
              ) : (
                <img src={URL.createObjectURL(imagemProduto)} alt="imagem do produto" />
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
            />
            <input
              type="number"
              name="precoProduto"
              value={precoProduto}
              placeholder="Insira o preço do produto"
              required
              onChange={(e) => setPrecoProduto(e.target.value)}
            />
            <button className="form_btn" disabled={response.loading}>
              {response.loading ? "Aguarde..." : "Confirmar"}
            </button>
          </div>
        </form>

        <div className={styles.itensContainer}>
          {loading ? (
            <div className="loading">
              <div className="bouncing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            documentos.length > 0 ? (
              documentos.map((produto) => (
                <div key={produto.id}>
                  <div className={styles.cardProduto}>
                    <button
                      onClick={() => deletarDocumento(produto.id, produto.imagemProduto)}
                      className={styles.deleteProduto}
                    >
                      X
                    </button>
                    <img src={produto.imagemProduto} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>{produto.nomeProduto}</h1>
                      <p className={styles.descProduto}>{produto.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>{produto.precoProduto}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default EditCardapio;
