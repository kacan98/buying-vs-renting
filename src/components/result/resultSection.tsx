import Grid2 from "@mui/material/Unstable_Grid2";
import PaperWrapper from "../paper.tsx";
import Result from "./result.tsx";
import BuyingResultBlock from "./buyingResultBlock.tsx";
import RentingResultBlock from "./rentingResultBlock.tsx";

function ResultSection() {
  return (
    <Grid2 container spacing={2} justifyContent={"stretch"}>
      <Grid2 xs={12}>
        <PaperWrapper>
          <Result />
        </PaperWrapper>
      </Grid2>
      <Grid2 xs={12}>
        <PaperWrapper>
          <BuyingResultBlock />
        </PaperWrapper>
      </Grid2>
      <Grid2 xs={12}>
        <PaperWrapper>
          <RentingResultBlock />
        </PaperWrapper>
      </Grid2>
    </Grid2>
  );
}

export default ResultSection;
