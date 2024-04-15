import Grid2 from "@mui/material/Unstable_Grid2";
import PaperWrapper from "../paper.tsx";
import ResultBlock from "./blocks/resultBlock.tsx";
import BuyingResultBlock from "./blocks/buyingResultBlock.tsx";
import RentingResultBlock from "./blocks/rentingResultBlock.tsx";

function ResultSection() {
  return (
    <Grid2 container spacing={2} justifyContent={"stretch"}>
      <Grid2 xs={12}>
        <PaperWrapper>
          <ResultBlock />
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
