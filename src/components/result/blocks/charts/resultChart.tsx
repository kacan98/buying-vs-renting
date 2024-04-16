import { LineChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { Typography, useTheme } from "@mui/material";
import { useMortgageDetails } from "../../../../services/buying/useMortgageDetails.ts";
import { useRentDetails } from "../../../../services/renting/useRentDetails.ts";

export function ResultChart() {
  const theme = useTheme();

  const { t } = useTranslation();

  const { yearValueChangeTotals: mortgageYearlyValueTotals } =
    useMortgageDetails();
  const { yearlyValuesRenting: rentYearlyValueTotals } = useRentDetails();

  const mortgageData = {
    id: "mortgage",
    label: t("Mortgage"),
    data: mortgageYearlyValueTotals.map((v) => Math.round(v)),
    color: theme.palette.primary.main,
  };

  const rentData = {
    id: "rent",
    label: t("Rent"),
    data: rentYearlyValueTotals.map((v) => Math.round(v)),
    color: theme.palette.primary.light,
  };

  if (mortgageYearlyValueTotals.length === 0) return <></>;

  const customize = {
    height: 250,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  const years: number[] = mortgageYearlyValueTotals.map((_, index) => {
    const year = new Date(
      new Date().setFullYear(new Date().getFullYear() + index),
    );
    return year.getFullYear();
  });

  return (
    <>
      <Typography variant={"caption"}>
        {t("Mortgage vs Renting value")}:
      </Typography>
      <LineChart
        xAxis={[
          {
            valueFormatter: (value) => value.toString(),
            data: years,
          },
        ]}
        series={[mortgageData, rentData]}
        {...customize}
      />
    </>
  );
}

export default ResultChart;
