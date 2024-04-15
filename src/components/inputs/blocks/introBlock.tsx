import { Typography } from "@mui/material";
import NumberField from "../fields/numberField.tsx";
import { getInputProps } from "../../adornments.tsx";
import useCalculatorSlice from "../../../../store/calculatorSlices/useCalculatorSlice.ts";
import { useTranslation } from "react-i18next";

const IntroBlock = () => {
  const { stateSlice: predictionsState, createStateUpdateFc } =
    useCalculatorSlice("futurePredictions");

  const { t } = useTranslation();
  return (
    <>
      <Typography variant={"h1"} gutterBottom>
        {t("Property Investment Calculator")}
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        {t(
          "This calculator is designed to help you make an informed decision about whether to rent or buy a property",
        )}
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        {t("How long do you plan to stay in the property?")}
      </Typography>
      <NumberField
        value={predictionsState.yearsStaying}
        InputProps={getInputProps({
          endAdornment: t("years"),
        })}
        onChange={createStateUpdateFc("yearsStaying")}
      />
    </>
  );
};

export default IntroBlock;
