import PaperWrapper from "../../paper.tsx";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Buying from "../blocks/buying.tsx";
import Renting from "../blocks/renting.tsx";

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
