import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Profile from "../components/Profile/Profile";
import styles from "../styles/mainpage.module.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.mainPage}>
      <div className={styles.fundo}></div>
      <Header>
        <Profile />
      </Header>
      <div className={styles.heroSection}>
        <img src="/BoraImpactar.png" alt="" />
        <h1>Doe hoje, transforme vidas para sempre!</h1>
        <p>
          No Bora Impactar, você pode doar recursos diretamente para ONGs que
          transformam vidas e comunidades todos os dias. Conecte-se a causas que
          precisam de você e ajude a construir um futuro mais justo e solidário.
          Juntos, podemos gerar um impacto real. Vem fazer parte dessa rede de
          transformação!
        </p>
        <div className={styles.buttonGroup}>
          <Button customClass={styles.customClass1}>Sou Voluntário</Button>
          <Button
            customClass={styles.customClass2}
            onClick={() => navigate("/login")}
          >
            Sou Ong
          </Button>
        </div>
        <div className={styles.dadosGrid}>
          <div className={styles.dados}>
            <span>350</span>
            <p>Ongs Registradas</p>
          </div>
          <div className={styles.dados}>
            <span>29.157</span>
            <p>Produtos Doados</p>
          </div>
          <div className={styles.dados}>
            <span>+ de 500</span>
            <p>Voluntários Cadastrados</p>
          </div>
        </div>
      </div>
      <div className={styles.causasSection}>
        <h2>Ajude as causas das ongs</h2>
        <Grid>
          <GridBox imgUrl={"./Alimentos.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Serviço.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Medicamentos.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Brinquedos.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Roupas.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Móveis.jpg"}>Doar Alimentos</GridBox>
        </Grid>
        <Button customClass={styles.customClass3}>Ver outras categorias</Button>
      </div>
      <div className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2>Sou Ong, como funciona?</h2>
          <div className={styles.aboutContentGrid}>
            <div className={styles.aboutContent}>
              <img src="./Recursos.svg" alt="" />
              <h3>Realocação de Recursos</h3>
              <p>
                Aproveite ao máximo os itens próximos da data de validade,
                garantindo seu rápido consumo e evitando desperdícios.
              </p>
            </div>
            <div className={styles.aboutContent}>
              <img src="./Trocas.svg" alt="" />
              <h3>Realocação de Recursos</h3>
              <p>
                Aproveite ao máximo os itens próximos da data de validade,
                garantindo seu rápido consumo e evitando desperdícios.
              </p>
            </div>
            <div className={styles.aboutContent}>
              <img src="./Doações.svg" alt="" />
              <h3>Realocação de Recursos</h3>
              <p>
                Aproveite ao máximo os itens próximos da data de validade,
                garantindo seu rápido consumo e evitando desperdícios.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ctaSection}>
        <h3>Faça parte dessa mudança. Bora Impactar!</h3>
        <div className={styles.buttonGroup}>
          <Button customClass={styles.customClass1}>Sou Voluntário</Button>
          <Button
            customClass={styles.customClass2}
            onClick={() => navigate("/login")}
          >
            Sou Ong
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
