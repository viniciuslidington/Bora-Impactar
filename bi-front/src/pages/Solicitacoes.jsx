import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";

export default function Solicitacoes() {
  return (
    <>
      <Grid>
        <GridBox imgUrl={"./Alimentos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"./Serviço.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"./Medicamentos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"./Brinquedos.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"./Roupas.jpg"}>Doar Alimentos</GridBox>
        <GridBox imgUrl={"./Móveis.jpg"}>Doar Alimentos</GridBox>
      </Grid>
    </>
  );
}
