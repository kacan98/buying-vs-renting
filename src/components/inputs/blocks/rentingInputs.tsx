import NumberFields from "../fields/numberFields.tsx";
import useCalculatorSlice from "../../../../store/calculatorSlices/useCalculatorSlice.ts";
import { NumberFieldProps } from "../fields/numberField.tsx";
import { getInputProps, usePercentageAdornment } from "../../adornments.tsx";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleInvestDifference } from "../../../../store/calculatorSlices/renting.ts";
import { useMortgageDetails } from "../../../services/buying/useMortgageDetails.ts";
import { useLocaleCurrencyFormatter } from "../../../../store/settings/useLocale.ts";
import { useTranslation } from "react-i18next";
import { PieChart } from "@mui/x-charts";
import { useAlternativeInvestmentReturns } from "../../../services/useAlternativeInvestment.ts";

const RentingInputs = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { stateSlice: rentingState, createStateUpdateFc } =
    useCalculatorSlice("renting");

  const { mortgagePerMonth, deposit: mortgageDeposit } = useMortgageDetails();

  const dispatch = useDispatch();
  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();

  const getPercentageAdornment = usePercentageAdornment();

  const alternativeInvestment = useAlternativeInvestmentReturns();

  const inputs: NumberFieldProps[] = [
    {
      label: t("Monthly Rent"),
      value: rentingState.monthlyRent,
      onChange: createStateUpdateFc("monthlyRent"),
      formatAsCurrency: true,
    },
    {
      label: t("Deposit"),
      value: rentingState.initialInvestment,
      onChange: createStateUpdateFc("initialInvestment"),
      formatAsCurrency: true,
    },
    {
      label: t("Rent Growth"),
      value: rentingState.yearlyRentGrowth,
      onChange: createStateUpdateFc("yearlyRentGrowth"),
      InputProps: getInputProps({
        endAdornment: t("% per year"),
      }),
    },
  ];

  const monthlyDifference = mortgagePerMonth - (rentingState.monthlyRent || 0);

  const differenceBetweenRentAndMortgageDeposit =
    mortgageDeposit - (rentingState.initialInvestment || 0);

  return (
    <>
      <Typography variant="body1" mb={2}>
        {t(`Introduction to renting inputs`)}
      </Typography>
      <NumberFields inputs={inputs} />
      {(monthlyDifference > 0 ||
        differenceBetweenRentAndMortgageDeposit > 0) && (
        <>
          <FormControlLabel
            control={<Checkbox checked={rentingState.investDifference} />}
            onChange={(_, checked) => {
              console.log(checked);
              dispatch(toggleInvestDifference(checked));
            }}
            label={t("Invest the difference between buying and renting?")}
          />
          {rentingState.investDifference && (
            <>
              <Typography variant={"body1"}>
                {differenceBetweenRentAndMortgageDeposit > 0 &&
                  t("The required deposit will be lower by {thisMuch}", {
                    thisMuch: formatAsCurrency(
                      differenceBetweenRentAndMortgageDeposit,
                    ),
                  })}{" "}
                {monthlyDifference > 0 &&
                  t(
                    "If you decide to purchase a property, you would pay {thisMuch} less per month",
                    {
                      thisMuch: formatAsCurrency(monthlyDifference),
                    },
                  )}{" "}
                {t("You can invest this money instead")}
              </Typography>
              <br />
              <NumberFields
                inputs={[
                  {
                    label: t("Alternative investment return"),
                    InputProps: getPercentageAdornment(true),
                    value: rentingState.alternativeInvestmentReturnPercentage,
                    onChange: createStateUpdateFc(
                      "alternativeInvestmentReturnPercentage",
                    ),
                  },
                ]}
              ></NumberFields>
              <Grid container justifyContent={"center"}>
                <PieChart
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: { vertical: "top", horizontal: "right" },
                    },
                  }}
                  colors={[
                    theme.palette.secondary.main,
                    theme.palette.secondary.light,
                    theme.palette.primary.main,
                  ]}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: Math.round(
                            alternativeInvestment.allMonthlyInvestment,
                          ),
                          label: t("All monthly investments"),
                        },
                        {
                          id: 1,
                          value: Math.round(alternativeInvestment.initialCash),
                          label: t("Initial investment"),
                        },
                        {
                          id: 2,
                          value: Math.round(alternativeInvestment.valueAdded),
                          label: t("Interest income"),
                        },
                      ],
                      innerRadius: 50,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                    },
                  ]}
                  width={500}
                  height={350}
                />
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};

export default RentingInputs;
