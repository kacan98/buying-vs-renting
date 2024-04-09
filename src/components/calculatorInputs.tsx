import FuturePredictions from "./futurePredictions.tsx";
import Renting from "./renting.tsx";
import PaperWrapper from "./paper.tsx";
import leasing from "/leasing.png";
import buying from "/buying.png";
import Buying from "./buying.tsx";
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
