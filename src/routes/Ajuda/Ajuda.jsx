import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import "../Ajuda/Ajuda.css";

import downArrow from "../../assets/imgs/downArrowAjuda.png";

const Ajuda = () => {
  const [expandirPergunta, setExpandirPergunta] = useState(null);

  const perguntas = [
    {
      id: 1,
      titulo: "Como adicionar itens?",
      explicacao:
        "Vá até a página onde deseja adicionar algo e procure pelo botão de editar as informações (exemplo: na página de mesas existe o botão 'Editar mesas') coloque as informações e clique no botão para cadastrar os dados",
    },
    {
      id: 2,
      titulo: "Como editar itens?",
      explicacao:
        "Procure pelo item na lista, clique no botão de editar, altere as informações e salve.",
    },
    {
      id: 3,
      titulo: "Como deletar itens?",
      explicacao:
        "Encontre o item que deseja excluir, clique no botão de deletar e confirme a exclusão.",
    },
  ];

  const expandir = (id) => {
    setExpandirPergunta((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Sidebar />
      <div className="ajudaContainer">
        <div className="title">
          <h1>Ajuda</h1>
        </div>

        <form>
          <h1>Como podemos ajudar?</h1>
          <textarea
            name="message"
            placeholder="Digite sua dúvida..."
          ></textarea>
          <button>Enviar</button>
        </form>

        <div className="faq">
          <h2>Perguntas frequentes</h2>
          <div className="perguntas">
            <div className="pergunta">
              {perguntas.map((pergunta) => (
                <>
                  <button
                    onClick={() => expandir(pergunta.id)}
                    className="expandirPerguntaBtn"
                  >
                    <div className="titlePergunta">
                      <h3>{pergunta.titulo}</h3>

                      <img
                        src={downArrow}
                        alt="expandir"
                        style={{
                          rotate:
                            expandirPergunta === pergunta.id
                              ? "180deg"
                              : "0deg",
                          transition: ".2s",
                        }}
                      />
                    </div>
                    {expandirPergunta === pergunta.id ? (
                      <div className="explicacao">{pergunta.explicacao}</div>
                    ) : (
                      ""
                    )}
                  </button>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ajuda;
