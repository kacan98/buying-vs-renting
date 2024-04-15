import { LineChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { Typography, useTheme } from "@mui/material";
import { useMortgageDetails } from "../../../../services/buying/useMortgageDetails.ts";

export function ResultChart() {
  const theme = useTheme();

  const { t } = useTranslation();

  // const rentingData  = useRentDetails()
  const { yearValueChangeTotals } = useMortgageDetails();

  const mortgageData = {
    id: "mortgage",
    label: t("Mortgage"),
    data: yearValueChangeTotals,
    color: theme.palette.primary.main,
  };

  if (yearValueChangeTotals.length === 0) return <></>;

  const customize = {
    height: 250,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  const years: number[] = yearValueChangeTotals.map((_, index) => {
    const year = new Date(
      new Date().setFullYear(new Date().getFullYear() + index),
    );
    return year.getFullYear();
  });

  return (
    <>
      <Typography variant={"caption"}>
        {t("Monthly costs of buying")}:
      </Typography>
      <LineChart
        xAxis={[
          {
            valueFormatter: (value) => value.toString(),
            data: years,
          },
        ]}
        series={[mortgageData]}
        {...customize}
      />
    </>
  );
}

export default ResultChart;
