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

function BuyingInputs() {
  const { t } = useTranslation();
  const theme = useTheme();
  const getPercentageAdornment = usePercentageAdornment();
  const { createStateUpdateFc, stateSlice: buyingState } =
    useCalculatorSlice("buying");

  const {
    propertyPrice: price,
    propertyValueGrowthPercentage,
    loanTerm,
    interestRate,
    buyingCostsPercentage,
    sellingCostsPercentage,
    yearlyOwnershipCost,
    depositPercentage: depositPct,
  } = buyingState;
  const propertyPrice = price || 0;
  const depositPercentage = depositPct || 0;

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
    yearlyOwnershipCost: yearlyOwnershipCost || 0,

    yearsStaying: yearsStaying || 0,
    loanTerm: loanTerm || 0,

    interestRate: interestRate || 0,
    loanAmount: loanAmount || 0,
    propertyValueGrowthPercentage: propertyValueGrowthPercentage || 0,
    buyingCostsPercentage: buyingCostsPercentage || 0,
    sellingCostsPercentage: sellingCostsPercentage || 0,

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
      <Typography variant="body1">
        {t(`Introduction to buying inputs`)}
      </Typography>
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
      <Typography variant="body1">{t("mortgage intro")}</Typography>
      <NumberFields
        inputs={[
          {
            label: t("Loan Term"),
            value: loanTerm,
            onChange: createStateUpdateFc("loanTerm"),
            InputProps: getInputProps({
              endAdornment: t("years"),
            }),
          },
          {
            label: t("Deposit percentage"),
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
      <Typography variant="h4" textAlign={"center"} fontWeight={600}>
        {t("Total mortgage amount is {mortgageAmount}", {
          mortgageAmount: formatAsCurrency(
            propertyPrice * (1 - depositPercentage / 100),
          ),
        })}
        {". "}
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
      <Typography variant="h4">{t("Buying And Selling")}</Typography>
      <Typography variant="body1">
        {t("helperText under buying/selling costs")}
      </Typography>
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
      <Typography variant="h4">{t("Ownership costs")}</Typography>
      <Typography variant="body1">
        {t("helperText under ownership costs")}
      </Typography>
      <NumberFields
        inputs={[
          {
            label: t("Ownership costs"),
            InputProps: getInputProps({
              endAdornment: t("per year"),
            }),
            value: yearlyOwnershipCost,
            onChange: createStateUpdateFc("yearlyOwnershipCost"),
            formatAsCurrency: true,
          },
        ]}
      />
    </Stack>
  );
}

export default BuyingInputs;
