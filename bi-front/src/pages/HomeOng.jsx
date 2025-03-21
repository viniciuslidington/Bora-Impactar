import { Outlet, NavLink } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import styles from "../styles/homeOng.module.css";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster
        containerStyle={{
          marginTop: "80px",
        }}
        toastOptions={{
          style: { borderRadius: "4px", backgroundColor: "#cef0ff" },
          position: "top-right",
        }}
      />
      <div className={styles.homeSection}>
        <div className={styles.postsSection}>
          <div className={styles.postsNav}>
            <NavLink to={"solicitacoes"} className={styles.navLink}>
              Solicitações
            </NavLink>
            <NavLink to={"repasse"} className={styles.navLink}>
              Repasse
            </NavLink>
          </div>
          <Outlet />
        </div>
        <div className={styles.gridTitle}>
          <h2>Encontrar recursos compartilhados por outras ONGs</h2>
          <p>Categorais Recorrentes</p>
        </div>
        <Grid>
          <GridBox imgUrl={"/Roupas.jpg"}>Roupas e Calçados</GridBox>
          <GridBox imgUrl={"/financeiro.jpg"}>
            Materiais Educativos e Culturais
          </GridBox>
          <GridBox imgUrl={"/Medicamentos.jpg"}>Saúde e Higiene</GridBox>
          <GridBox imgUrl={"/UtensiliosP.jpg"}>Utensílios Gerais</GridBox>
          <GridBox imgUrl={"/Inclusaoemobilidade.jpg"}>
            Itens de Inclusão e Mobilidade
          </GridBox>
          <GridBox imgUrl={"/Móveis.jpg"}>Eletrodomésticos e Móveis</GridBox>
          <GridBox imgUrl={"/pet.jpg"}>Itens Pet</GridBox>
          <GridBox imgUrl={"/Eletronicos.jpg"}>Eletrônicos</GridBox>
          <GridBox imgUrl={"/Outrosgrid.jpg"}>Outros</GridBox>
        </Grid>
      </div>
    </>
  );
}
