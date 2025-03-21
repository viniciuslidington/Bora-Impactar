import { useNavigate } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Button from "../components/Button/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="absolute top-[88px] left-0 -z-10 h-[620px] w-full"
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.64) 100%),
          linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 64.5%),
          url('/homevoluntario.jpg')
        `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>{" "}
      <div className="flex h-[620px] w-[1366px] max-w-full flex-col justify-center gap-8 px-[123px]">
        <h1 className="text-[56px] font-bold">
          Encontre a Oportunidade Perfeita para Ajudar
        </h1>

        <p className="w-[816px] max-w-full leading-[1.8]">
          Conecte-se com ONGs que precisam do seu apoio. Explore as publicações
          e descubra onde suas habilidades e vontade de fazer a diferença são
          mais necessárias.
        </p>
        <div className="flex gap-8">
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            onClick={() => navigate("/ver-demandas")}
          >
            Ver demandas
          </Button>
        </div>
      </div>
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
      </div>
    </div>
  );
}
