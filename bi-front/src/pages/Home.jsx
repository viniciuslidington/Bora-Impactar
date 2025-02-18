import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import styles from "../styles/solicitacoes.module.css";
import { Outlet, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.solicitacoesSection}>
      <div className="postsSection">
        <div className="postsNav">
          <NavLink to={"solicitacoes"}>Solicitações</NavLink>
          <NavLink to={"trocas"}>Trocas</NavLink>
        </div>
        <Outlet />
      </div>
      <Grid>
        <GridBox imgUrl={"/Alimentos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Serviço.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Medicamentos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Brinquedos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Roupas.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Móveis.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Alimentos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Serviço.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"/Medicamentos.jpg"}>Doar Alimentos</GridBox>
      </Grid>
    </div>
  );
}
