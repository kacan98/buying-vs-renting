import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FuturePredictionsState } from "../../store/calculatorSlices/futurePreditions.ts";
import { RentingState } from "../../store/calculatorSlices/renting.ts";
import {calculateRent} from "../helpers/financialFcs.ts"

function Result() {
  const { monthlyRent, yearlyRentGrowth }: RentingState = useSelector(
    (state: RootState) => state.renting,
  );
  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.futurePredictions,
  );

  const toLocaleString = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const rentingRows: [string, string][] = [
    ["Rent", calculateRent({
      startingMonthlyRent: monthlyRent,
      increaseRate: yearlyRentGrowth/100,
      yearsStaying,
    })],
  ];

  return (
    <Box
      sx={{
        textAlign: "left",
      }}
    >
      <Typography variant={"h5"}>{`Renting for ${yearsStaying} year${
        yearsStaying !== 1 ? "s" : ""
      }`}</Typography>
      <Stack>
        {rentingRows.map(([label, value]) => (
          <Typography key={label} variant={"body1"} color={"success"}>
            {label}: {toLocaleString(value)}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

export default Result;
