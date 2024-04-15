import { getInputProps, usePercentageAdornment } from "../../adornments.tsx";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import NumberFields from "../fields/numberFields.tsx";
import useCalculatorSlice from "../../../../store/calculatorSlices/useCalculatorSlice.ts";
import {
  getLoanAmount,
  simulateTimePassage,
} from "../../../services/buying/buying.service.ts";
import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useMortgageDetails } from "../../../services/buying/useMortgageDetails.ts";
import { useLocaleCurrencyFormatter } from "../../../../store/settings/useLocale.ts";
import { useTranslation } from "react-i18next";

function Buying() {
  const { t } = useTranslation();
  const theme = useTheme();
  const getPercentageAdornment = usePercentageAdornment();
  const { createStateUpdateFc, stateSlice: buyingState } =
    useCalculatorSlice("buying");

  const {
    propertyPrice,
    propertyValueGrowthPercentage,
    loanTerm,
    interestRate,
    buyingCostsPercentage,
    sellingCostsPercentage,
    yearlyOwnershipCost,
    depositPercentage,
  } = buyingState;

  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();

  const deposit = propertyPrice * (depositPercentage / 100);

  const { mortgagePerMonth, sellingCost, buyingCost } = useMortgageDetails();

  const yearsStaying = useSelector(
    (state: RootState) => state.calculator.futurePredictions.yearsStaying,
  );

  const loanAmount = getLoanAmount({
    deposit,
    initialPropertyValue: propertyPrice,
  });

  const { totalPrincipalPaid, totalInterestPaid } = simulateTimePassage({
    initialPropertyValue: propertyPrice,
    depositPercentage,
    yearlyOwnershipCost,

    yearsStaying,
    loanTerm,

    interestRate,
    loanAmount,
    propertyValueGrowthPercentage,
    buyingCostsPercentage,
    sellingCostsPercentage,

    mortgagePerMonth,
  });

  return (
    <Stack
      spacing={2}
      paddingBottom={2}
      sx={{
        textAlign: "left",
      }}
    >
      <NumberFields
        inputs={[
          {
            label: t("Property Price"),
            value: propertyPrice,
            onChange: createStateUpdateFc("propertyPrice"),
            formatAsCurrency: true,
          },
          {
            label: t("Property Value Growth"),
            value: propertyValueGrowthPercentage,
            onChange: createStateUpdateFc("propertyValueGrowthPercentage"),
            InputProps: getPercentageAdornment(true),
          },
        ]}
      />
      <Typography variant="h4">{t("Mortgage")}</Typography>
      <NumberFields
        inputs={[
          {
            label: t("Loan Term"),
            value: loanTerm,
            onChange: createStateUpdateFc("loanTerm"),
            InputProps: getInputProps({
              endAdornment: "years",
            }),
          },
          {
            label: t("Deposit percentage"),
            helperText: formatAsCurrency(
              propertyPrice * (depositPercentage / 100),
            ),
            value: depositPercentage,
            onChange: createStateUpdateFc("depositPercentage"),
            InputProps: getPercentageAdornment(),
          },
          {
            label: t("Interest Rate"),
            InputProps: getPercentageAdornment(true),
            value: interestRate,
            onChange: createStateUpdateFc("interestRate"),
          },
        ]}
      />
      <Typography variant="body1">
        {t(`You would pay {amount} per month`, {
          amount: formatAsCurrency(mortgagePerMonth),
        })}
      </Typography>
      <Grid container justifyContent={"center"}>
        {totalPrincipalPaid !== 0 && totalInterestPaid && (
          <PieChart
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "top", horizontal: "right" },
                padding: 0,
              },
            }}
            colors={[theme.palette.secondary.main, theme.palette.primary.main]}
            series={[
              {
                data: [
                  {
                    id: 1,
                    value: Math.round(totalInterestPaid),
                    label: t("Total interest paid"),
                  },
                  {
                    id: 0,
                    value: Math.round(totalPrincipalPaid),
                    label: t("Total principal paid"),
                  },
                ],
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </Grid>
      <Typography variant="h4">{t("Buying And Selling Costs")}</Typography>
      <NumberFields
        inputs={[
          {
            label: t("Buying costs"),
            InputProps: getPercentageAdornment(),
            value: buyingCostsPercentage,
            onChange: createStateUpdateFc("buyingCostsPercentage"),
            helperText: formatAsCurrency(buyingCost),
          },
          {
            label: t("Selling costs"),
            InputProps: getPercentageAdornment(),
            value: sellingCostsPercentage,
            onChange: createStateUpdateFc("sellingCostsPercentage"),
            helperText: formatAsCurrency(sellingCost),
          },
        ]}
      />
      <Typography variant="h4">{t("Yearly costs")}</Typography>
      <NumberFields
        inputs={[
          {
            label: t("Ownership costs"),
            helperText: t("helperText under ownership costs"),
            InputProps: getPercentageAdornment(true),
            value: yearlyOwnershipCost,
            onChange: createStateUpdateFc("yearlyOwnershipCost"),
            formatAsCurrency: true,
          },
        ]}
      />
    </Stack>
  );
}

export default Buying;
