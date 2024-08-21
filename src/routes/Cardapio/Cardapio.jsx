import styles from "./Cardapio.module.css";

import { useState } from "react";

const Cardapio = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleClick = (divNumber) => {
    setActiveDiv(divNumber);
  };

  return (
    <div className={styles.cardapio}>
      <div className="title">
        <h1>Cardápio</h1>
      </div>

      <div className={styles.navItens}>
        <button
          className={activeDiv === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          Pratos Principais
        </button>
        <button
          className={activeDiv === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          Bebidas
        </button>
        <button
          className={activeDiv === 3 ? "active" : ""}
          onClick={() => handleClick(3)}
        >
          Outros
        </button>
      </div>

      <div className="containerProdutos">
        {activeDiv === 1 && <div className="pratosPrincipais">Div 1</div>}
        {activeDiv === 2 && <div className="bebidas">Div 2</div>}
        {activeDiv === 3 && <div className="outros">Div 3</div>}
      </div>
    </div>
  );
};

export default Cardapio;
