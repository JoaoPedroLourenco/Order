import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../EditCardapio/EditCardapio.module.css";
import { useInsertDocuments } from "../../../hooks/useInsertDocuments";
import { useFetchDocuments } from "../../../hooks/useResgatarProdutos";
import uploadImagem from "../../../assets/imgs/imageUpload.png";
import Sidebar from "../../../components/Sidebar";
import { useDeleteDocumentos } from "../../../hooks/useDeleteDocumentos";
import { useAuthValue } from "../../../context/AuthContext";

import CurrencyInput from "react-currency-input-field";

const EditCardapio = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const [imagemDocumento, setImagemDocumento] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("pratosPrincipais");
  const [pratosPrincipaisArea, setPratosPrincipaisArea] = useState([]);
  const [bebidasArea, setBebidasArea] = useState([]);
  const [outrosArea, setOutrosArea] = useState([]);

  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );
  const { inserirDocumentos, response } = useInsertDocuments("produtos", user);
  const { deletarDocumento } = useDeleteDocumentos("produtos");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precoNumerico = parseFloat(
      precoProduto.replace(/[^0-9,-]+/g, "").replace(",", ".")
    );

    const novoProduto = {
      nomeProduto,
      descProduto,
      precoProduto: precoNumerico,
      tipoProduto,
      uid: user.uid,
      createdBy: user.displayName,
    };

    await inserirDocumentos(novoProduto, imagemDocumento);

    // Resetando os campos
    setNomeProduto("");
    setDescProduto("");
    setPrecoProduto("");
    setTipoProduto("");
    setImagemDocumento(null);

    if (tipoProduto === "pratosPrincipais") {
      setPratosPrincipaisArea((prevPratos) => [...prevPratos, novoProduto]);
    } else if (tipoProduto === "bebidas") {
      setBebidasArea((prevBebidas) => [...prevBebidas, novoProduto]);
    } else {
      setOutrosArea((prevOutros) => [...prevOutros, novoProduto]);
    }
  };

  useEffect(() => {
    if (produtos) {
      setPratosPrincipaisArea(
        produtos.filter((item) => item.tipoProduto === "pratosPrincipais")
      );
      setBebidasArea(produtos.filter((item) => item.tipoProduto === "bebidas"));
      setOutrosArea(produtos.filter((item) => item.tipoProduto === "Outros"));
    }
  }, [produtos]);

  const previewImagem = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagemDocumento(arquivoSelecionado);
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
              {!imagemDocumento ? (
                <p>Preview da imagem</p>
              ) : (
                <img
                  src={URL.createObjectURL(imagemDocumento)}
                  alt="imagem do produto"
                />
              )}
            </div>
            <label className={styles.enviarImagem}>
              <img src={uploadImagem} alt="" />
              Insira uma imagem
              <input
                type="file"
                name="imagemProduto"
                onChange={previewImagem}
              />
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
            <CurrencyInput
              value={precoProduto}
              name="precoProduto"
              prefix="R$"
              placeholder="R$"
              decimalsLimit={2}
              decimalSeparator=","
              groupSeparator="."
              onValueChange={(preco) => setPrecoProduto(preco)}
            />
            <select
              name="tipoProduto"
              value={tipoProduto}
              onChange={(e) => setTipoProduto(e.target.value)}
            >
              <option value="pratosPrincipais">Pratos Principais</option>
              <option value="bebidas">Bebidas</option>
              <option value="Outros">Outros</option>
            </select>
            <button className="form_btn" disabled={response.loading}>
              {response.loading ? "Aguarde..." : "Confirmar"}
            </button>
          </div>
        </form>

        <div className={styles.itensContainer}>
          {/* {loading ? (
            <div className="loading">
              <div className="bouncing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            produtos &&
            produtos.map((produto) => (
              <div key={produto.id}>
                <div className={styles.cardProduto}>
                  <button
                    onClick={() =>
                      deletarDocumento(produto.id, produto.imagemDocumento)
                    }
                    className={styles.deleteProduto}
                  >
                    X
                  </button>
                  <img src={produto.imagemDocumento} alt="" />
                  <div className={styles.cardEsq}>
                    <h1 className={styles.tituloProduto}>
                      {produto.nomeProduto}
                    </h1>
                    <p className={styles.descProduto}>{produto.descProduto}</p>
                    <p className={styles.preco}>
                      <span>R$</span>
                      <span className={styles.precoProduto}>
                        {parseFloat(produto.precoProduto).toFixed(2)}
                      </span>
                    </p>
                    <p>{produto.tipoProduto}</p>
                  </div>
                </div>
              </div>
            ))
          )} */}
          <div className={styles.itensContainer}>
            <div className={styles.pratosPrincipais}>
              <h2>Pratos Principais</h2>
              {pratosPrincipaisArea.map((prato) => (
                <div key={prato.id}>
                  <p>{prato.nomeProduto}</p>
                  <p>R$ {parseFloat(prato.precoProduto).toFixed(2)}</p>
                  <p>{prato.descProduto}</p>
                </div>
              ))}
            </div>

            <div className={styles.bebidas}>
              <h2>Bebidas</h2>
              {bebidasArea.map((bebida) => (
                <div key={bebida.id}>
                  <p>{bebida.nomeProduto}</p>
                  <p>R$ {parseFloat(bebida.precoProduto).toFixed(2)}</p>
                  <p>{bebida.descProduto}</p>
                </div>
              ))}
            </div>

            <div className={styles.outros}>
              <h2>Outros</h2>
              {outrosArea.map((outro) => (
                <div key={outro.id}>
                  <p>{outro.nomeProduto}</p>
                  <p>R$ {parseFloat(outro.precoProduto).toFixed(2)}</p>
                  <p>{outro.descProduto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCardapio;
