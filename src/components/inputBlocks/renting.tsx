import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import { NumberFieldProps } from "../numberField.tsx";
import { getInputProps, usePercentageAdornment } from "../adornments.tsx";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleInvestDifference } from "../../../store/calculatorSlices/renting.ts";
import { useMortgageDetails } from "../../services/buying/useMortgageDetails.ts";
import { useLocaleCurrencyFormatter } from "../../../store/settings/useLocale.ts";
import { useTranslation } from "react-i18next";

const Renting = () => {
  const { t } = useTranslation();
  const { stateSlice: rentingState, createStateUpdateFc } =
    useCalculatorSlice("renting");

  const { paymentPerMonth: mortgageMonthlyPayment, deposit: mortgageDeposit } =
    useMortgageDetails();

  const dispatch = useDispatch();
  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();

  const getPercentageAdornment = usePercentageAdornment();

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

  const monthlyDifference = mortgageMonthlyPayment - rentingState.monthlyRent;

  const differenceBetweenRentAndMortgageDeposit =
    mortgageDeposit - rentingState.initialInvestment;

  return (
    <>
      <NumberFields inputs={inputs} />
      {(monthlyDifference > 0 ||
        differenceBetweenRentAndMortgageDeposit > 0) && (
        <>
          <FormControlLabel
            control={
              <Checkbox value={rentingState.investDifference} defaultChecked />
            }
            onChange={(_, checked) => dispatch(toggleInvestDifference(checked))}
            label={t("Invest the difference between buying and renting?")}
          />
          {rentingState.investDifference && (
            <>
              <Typography variant="h6">
                {t("Investing the difference")}
              </Typography>
              {monthlyDifference > 0 && (
                <Typography variant={"body1"}>
                  {t(
                    "If you decide to purchase a property, your monthly payments would be paying this much more per month",
                  )}
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                    p={1}
                  >
                    {formatAsCurrency(monthlyDifference)}
                  </Typography>
                </Typography>
              )}
              {differenceBetweenRentAndMortgageDeposit > 0 && (
                <Typography variant={"body1"}>
                  {t("The required deposit will be lower by")}
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                    p={1}
                  >
                    {formatAsCurrency(differenceBetweenRentAndMortgageDeposit)}
                  </Typography>
                </Typography>
              )}
              <Typography variant={"body1"}>
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default Renting;
