import { Box, Typography } from "@mui/material";
import { useRentDetails } from "../../../services/renting/useRentDetails.ts";
import { useLocaleCurrencyFormatter } from "../../../../store/settings/useLocale.ts";
import { useTranslation } from "react-i18next";
import { useMortgageDetails } from "../../../services/buying/useMortgageDetails.ts";
import { ResultChart } from "./charts/resultChart.tsx";

function ResultBlock() {
  const { t } = useTranslation();
  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();

  const { totalBuying } = useMortgageDetails();
  const { totalRenting } = useRentDetails();

  const buyingIsBetter = totalBuying > totalRenting;
  const difference = buyingIsBetter
    ? totalRenting - totalBuying
    : totalBuying - totalRenting;

  return (
    <Box
      sx={{
        textAlign: "left",
      }}
    >
      <Typography variant={"h3"} gutterBottom>
        {t("Buying/renting is cheaper by", {
          buyingOrRenting: t(buyingIsBetter ? "Buying" : "Renting"),
          difference: formatAsCurrency(Math.abs(difference)),
        })}
      </Typography>
      <ResultChart />
    </Box>
  );
}

export default ResultBlock;
