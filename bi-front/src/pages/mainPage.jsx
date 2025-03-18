import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Profile from "../components/Profile/Profile";
import styles from "../styles/mainpage.module.css";
import { useUserData } from "../services/authService";

export default function MainPage() {
  const navigate = useNavigate();
  const { data } = useUserData();

  return (
    <div className={styles.mainPage}>
      <div className={styles.fundo}></div>
      <Header>
        <Profile />
      </Header>
      <div className={styles.heroSection}>
        <img src="/BoraImpactar.png" alt="Logo" />
        <h1>Doe hoje, transforme vidas para sempre!</h1>
        <p>
          No Bora Impactar, você pode doar recursos diretamente para ONGs que
          transformam vidas e comunidades todos os dias. Conecte-se a causas que
          precisam de você e ajude a construir um futuro mais justo e solidário.
          Juntos, podemos gerar um impacto real. Vem fazer parte dessa rede de
          transformação!
        </p>
        <div className={styles.buttonGroup}>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            onClick={() => navigate("voluntario")}
          >
            Sou Voluntário
          </Button>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#009fe3] bg-transparent px-2 py-3 text-[18px] font-[600] text-[#009fe3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#4eb3df13] disabled:opacity-70"
            onClick={() =>
              data ? navigate("/ong/home/solicitacoes") : navigate("/login")
            }
          >
            Sou ONG
          </Button>
        </div>
        <div className={styles.dadosGrid}>
          <div className={styles.dados}>
            <span>350</span>
            <p>ONGs Registradas</p>
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
        <h2>Ajude as causas das ONGs</h2>
        <Grid>
          <GridBox imgUrl={"./Alimentos.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Serviço.jpg"}>Voluntariar Horas</GridBox>
          <GridBox imgUrl={"./Medicamentos.jpg"}>
            Doar Medicamentos e Itens de Higiene
          </GridBox>
          <GridBox imgUrl={"./Brinquedos.jpg"}>
            Doar brinquedos e livros
          </GridBox>
          <GridBox imgUrl={"./Roupas.jpg"}>Doar Roupas</GridBox>
          <GridBox imgUrl={"./Móveis.jpg"}>Doar Alimentos</GridBox>
        </Grid>
        <Button className="h-[64px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70">
          Ver outras categorias
        </Button>
      </div>
      <div className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2>Sou ONG, como funciona?</h2>
          <div className={styles.aboutContentGrid}>
            <div className={styles.aboutContent}>
              <img src="./Recursos.svg" alt="recursos" />
              <h3>Realocação de Recursos</h3>
              <p>
                Aproveite ao máximo os itens próximos da data de validade,
                garantindo seu rápido consumo e evitando desperdícios.
              </p>
            </div>
            <div className={styles.aboutContent}>
              <img src="./Trocas.svg" alt="trocas" />
              <h3>Realocação de Recursos</h3>
              <p>
                Conecte-se a outras ONGs para trocar recursos e atender
                necessidades específicas.
              </p>
            </div>
            <div className={styles.aboutContent}>
              <img src="./Doações.svg" alt="doações" />
              <h3>Realocação de Recursos</h3>
              <p>
                Permita que voluntários contribuam com itens ou serviços,
                fortalecendo sua causa.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ctaSection}>
        <h3>Faça parte dessa mudança. Bora Impactar!</h3>
        <div className={styles.buttonGroup}>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            onClick={() => navigate("/voluntario/home")}
          >
            Sou Voluntário
          </Button>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#009fe3] bg-transparent px-2 py-3 text-[18px] font-[600] text-[#009fe3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#4eb3df13] disabled:opacity-70"
            onClick={() =>
              data ? navigate("/ong/home/solicitacoes") : navigate("/login")
            }
          >
            Sou ONG
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
