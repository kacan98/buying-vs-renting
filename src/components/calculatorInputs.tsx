import FuturePredictions from "./inputBlocks/futurePredictions.tsx";
import Renting from "./inputBlocks/renting.tsx";
import PaperWrapper from "./paper.tsx";
import Buying from "./inputBlocks/buying.tsx";
import { Stack } from "@mui/material";

function CalculatorInputs() {
  return (
    <Stack spacing={3}>
      <PaperWrapper title={"Renting"}>
        <Renting />
      </PaperWrapper>
      <PaperWrapper title={"Buying"}>
        <Buying />
      </PaperWrapper>
      <PaperWrapper title={"Future Predictions"}>
        <FuturePredictions />
      </PaperWrapper>
      <br />
    </Stack>
  );
}

export default CalculatorInputs;
