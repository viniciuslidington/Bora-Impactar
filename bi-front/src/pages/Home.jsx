import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import styles from "../styles/home.module.css";
import { Outlet, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.homeSection}>
      <div className={styles.postsSection}>
        <div className={styles.postsNav}>
          <NavLink to={"solicitacoes"} className={styles.navLink}>
            Solicitações
          </NavLink>
          <NavLink to={"trocas"} className={styles.navLink}>
            Trocas
          </NavLink>
        </div>
        <Outlet />
      </div>
      <Grid>
        <GridBox imgUrl={"/Alimentos.jpg"}>Alimentos</GridBox>
        <GridBox imgUrl={"/Serviço.jpg"}>Serviços</GridBox>
        <GridBox imgUrl={"/Medicamentos.jpg"}>
          Medicamentos e Itens de Higiene
        </GridBox>
        <GridBox imgUrl={"/Brinquedos.jpg"}>brinquedos e livros</GridBox>
        <GridBox imgUrl={"/Roupas.jpg"}>Roupas</GridBox>
        <GridBox imgUrl={"/Móveis.jpg"}>Móveis</GridBox>
        <GridBox imgUrl={"/pet.jpg"}>Alimentos e itens para pet</GridBox>
        <GridBox imgUrl={"/financeiro.jpg"}>Ajuda financeira</GridBox>
        <GridBox imgUrl={"/utensilio.jpg"}>Utensílios</GridBox>
      </Grid>
    </div>
  );
}
