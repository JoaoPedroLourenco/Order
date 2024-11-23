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
  // troca de divs
  const [areaProdutos, setAreaProdutos] = useState(1);

  const handleClick = (divNumber) => {
    setAreaProdutos(divNumber);
  };

  // user data
  const { user } = useAuthValue();
  const uid = user.uid;

  // states de criação de produto
  const [imagemDocumento, setImagemDocumento] = useState(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descProduto, setDescProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("pratosPrincipais");

  // filtragem de itens por tipo
  const [pratosPrincipaisArea, setPratosPrincipaisArea] = useState([]);
  const [bebidasArea, setBebidasArea] = useState([]);
  const [outrosArea, setOutrosArea] = useState([]);

  // hooks
  const { documents: produtos, loading } = useFetchDocuments(
    "produtos",
    null,
    uid
  );
  const { inserirDocumentos, response } = useInsertDocuments("produtos", user);
  const { deletarDocumento } = useDeleteDocumentos("produtos");

  // submit form
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
    setTipoProduto("pratosPrincipais");
    setImagemDocumento(null);

    if (tipoProduto === "pratosPrincipais") {
      setPratosPrincipaisArea((prevPratos) => [...prevPratos]);
    } else if (tipoProduto === "bebidas") {
      setBebidasArea((prevBebidas) => [...prevBebidas]);
    } else {
      setOutrosArea((prevOutros) => [...prevOutros]);
    }
  };

  // preview da imagem no form
  const previewImagem = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagemDocumento(arquivoSelecionado);
  };

  // filtragem de itens
  useEffect(() => {
    if (produtos) {
      setPratosPrincipaisArea(
        produtos.filter((item) => item.tipoProduto === "pratosPrincipais")
      );
      setBebidasArea(produtos.filter((item) => item.tipoProduto === "bebidas"));
      setOutrosArea(produtos.filter((item) => item.tipoProduto === "outros"));
    }
  }, [produtos]);

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
              Tipo de produto:
              <option value="pratosPrincipais">Pratos Principais</option>
              <option value="bebidas">Bebidas</option>
              <option value="outros">Outros</option>
            </select>
            <button className="form_btn" disabled={response.loading}>
              {response.loading ? "Aguarde..." : "Confirmar"}
            </button>
          </div>
        </form>

        <div className={styles.allItensContainer}>
          <div className={styles.btnsAreaProduto}>
            <button
              className={areaProdutos === 1 ? "active" : ""}
              onClick={() => handleClick(1)}
            >
              Pratos Principais
            </button>
            <button
              className={areaProdutos === 2 ? "active" : ""}
              onClick={() => handleClick(2)}
            >
              Bebidas
            </button>
            <button
              className={areaProdutos === 3 ? "active" : ""}
              onClick={() => handleClick(3)}
            >
              Outros
            </button>
          </div>
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
          <div className={styles.itensContainer}>
            {areaProdutos === 1 && (
              <div className={styles.pratosPrincipais}>
                {pratosPrincipaisArea.map((prato) => (
                  <div className={styles.cardProduto} key={prato.id}>
                    <button
                      onClick={() =>
                        deletarDocumento(prato.id, prato.imagemDocumento)
                      }
                      className={styles.deleteProduto}
                    >
                      X
                    </button>
                    <img src={prato.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {prato.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{prato.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(prato.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {areaProdutos === 2 && (
              <div className={styles.bebidas}>
                {bebidasArea.map((bebida) => (
                  <div className={styles.cardProduto} key={bebida.id}>
                    <button
                      onClick={() =>
                        deletarDocumento(bebida.id, bebida.imagemDocumento)
                      }
                      className={styles.deleteProduto}
                    >
                      X
                    </button>
                    <img src={bebida.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {bebida.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{bebida.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(bebida.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {areaProdutos === 3 && (
              <div className={styles.outros}>
                {outrosArea.map((outro) => (
                  <div className={styles.cardProduto} key={outro.id}>
                    <button
                      onClick={() =>
                        deletarDocumento(outro.id, outro.imagemDocumento)
                      }
                      className={styles.deleteProduto}
                    >
                      X
                    </button>
                    <img src={outro.imagemDocumento} alt="" />
                    <div className={styles.cardEsq}>
                      <h1 className={styles.tituloProduto}>
                        {outro.nomeProduto}
                      </h1>
                      <p className={styles.descProduto}>{outro.descProduto}</p>
                      <p className={styles.preco}>
                        <span>R$</span>
                        <span className={styles.precoProduto}>
                          {parseFloat(outro.precoProduto).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCardapio;
