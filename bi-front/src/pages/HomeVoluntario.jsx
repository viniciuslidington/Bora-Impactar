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
        <GridBox imgUrl={"/Alimentos.jpg"}>Alimentos</GridBox>
        <GridBox imgUrl={"/Serviço.jpg"}>Serviços</GridBox>
        <GridBox imgUrl={"/Medicamentos.jpg"}>
          Medicamentos e Itens de Higiene
        </GridBox>
        <GridBox imgUrl={"/Brinquedos.jpg"}>Brinquedos e livros</GridBox>
        <GridBox imgUrl={"/Roupas.jpg"}>Roupas</GridBox>
        <GridBox imgUrl={"/Móveis.jpg"}>Móveis</GridBox>
        <GridBox imgUrl={"/pet.jpg"}>Alimentos e itens para pet</GridBox>
        <GridBox imgUrl={"/financeiro.jpg"}>Ajuda financeira</GridBox>
        <GridBox imgUrl={"/utensilio.jpg"}>Utensílios</GridBox>
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
