import LandingPageImage from "../../assets/imgs/Team work-bro 2.png";

import styles from './LandingPage.module.css'

import Header from "../../components/Header";

const LandingPage = () => {
  return (
    <div className={styles.landing_page}>
      <Header />
      <div className={styles.landing_page_content}>
      <div className={styles.lado_esq_home}>
        <h1>
          ORGANIZE SEU <br />
          RESTAURANTE <br />
          COM ORDER
        </h1>

        <p>Um ambiente de trabalho organizado faz a diferença!</p>

        <button>Começar gratuitamente</button>
      </div>
      <div className={styles.lado_dir_home}>
        <img
          src={LandingPageImage}
          alt="Order, Organização de restaurantes."
        />
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
