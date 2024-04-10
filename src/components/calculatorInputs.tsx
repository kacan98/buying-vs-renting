import FuturePredictions from "./inputBlocks/futurePredictions.tsx";
import Renting from "./inputBlocks/renting.tsx";
import PaperWrapper from "./paper.tsx";
import leasing from "/leasing.png";
import buying from "/buying.png";
import Buying from "./inputBlocks/buying.tsx";
import {Stack} from "@mui/material"

function CalculatorInputs() {
  return (
    <Stack spacing={3}>
      <PaperWrapper title={"Renting"} image={leasing}>
        <Renting />
      </PaperWrapper>
      <PaperWrapper title={"Buying"} image={buying}>
        <Buying />
      </PaperWrapper>
      <PaperWrapper title={"Future Predictions"}>
        <FuturePredictions />
      </PaperWrapper>
    </Stack>
  );
}

export default CalculatorInputs;
