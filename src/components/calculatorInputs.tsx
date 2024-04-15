import Renting from "./inputBlocks/renting.tsx";
import PaperWrapper from "./paper.tsx";
import Buying from "./inputBlocks/buying.tsx";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

function CalculatorInputs() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <PaperWrapper title={t("Buying")}>
        <Buying />
      </PaperWrapper>
      <PaperWrapper title={t("Renting")}>
        <Renting />
      </PaperWrapper>
      <br />
    </Stack>
  );
}

export default CalculatorInputs;
