import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Card from "../components/Card/Card";

export default function Home() {
  return (
    <div className="flex w-full max-w-[1366px] flex-col items-center gap-16 px-[123px] py-16">
      <div className="-mb-10 flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold">
          Saiba como você pode ajudar as Ongs
        </h2>
        <p className="text-base font-normal">Categorias mais recorrentes</p>
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
      <div className="-mb-10 flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold">Conheça nossos parceiros</h2>
        <p className="text-base font-normal">
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
