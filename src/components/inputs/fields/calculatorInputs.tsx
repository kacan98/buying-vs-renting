import PaperWrapper from "../../paper.tsx";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import BuyingInputs from "../blocks/buyingInputs.tsx";
import RentingInputs from "../blocks/rentingInputs.tsx";

function CalculatorInputs() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <PaperWrapper title={t("Buying")}>
        <BuyingInputs />
      </PaperWrapper>
      <PaperWrapper title={t("Renting")}>
        <RentingInputs />
      </PaperWrapper>
      <br />
    </Stack>
  );
}

export default CalculatorInputs;
