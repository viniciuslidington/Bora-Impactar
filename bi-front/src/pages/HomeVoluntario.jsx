import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Card from "../components/Card/Card";
import styles from "../styles/homeVoluntario.module.css";

export default function Home() {
  return (
    <div className={styles.homeSection}>
      <div className={styles.headings}>
        <h2>Saiba como você pode ajudar as Ongs</h2>
        <p>Categorias mais recorrentes</p>
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
      <div className={styles.headings}>
        <h2>Conheça nossos parceiros</h2>
        <p>
          Conheça mais sobre as ONGs e os projetos que fazem parte da nossa
          conexão.
        </p>
      </div>
      <div className="cards">
        <Card cardData={cardData} />
      </div>
    </div>
  );
}

const cardData = [
  {
    title: "Animais",
    imageUrl: "/animal.jpg",
    ongs: ["ONG 1", "ONG 2", "ONG 3", "ONG 4", "ONG 5"],
  },
  {
    title: "Criança e Adolescente",
    imageUrl: "/criança.jpg",
    ongs: ["ONG 1", "ONG 2", "ONG 3", "ONG 4", "ONG 5"],
  },
  {
    title: "Idoso",
    imageUrl: "/idoso.jpg",
    ongs: ["ONG 1", "ONG 2", "ONG 3", "ONG 4", "ONG 5"],
  },
  {
    title: "Meio Ambiente",
    imageUrl: "/meio-ambiente.jpg",
    ongs: ["ONG 1", "ONG 2", "ONG 3", "ONG 4", "ONG 5"],
  },
];
