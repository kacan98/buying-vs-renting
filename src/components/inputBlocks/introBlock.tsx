import { Typography } from "@mui/material";
import NumberField from "../numberField.tsx"
import {getAdornment} from "../adornment.tsx"

const IntroBlock = () => {
  return (
    <>
      <Typography variant={"h2"} component={"h1"}>
        Property Investment Calculator
      </Typography>
      <Typography variant={"body1"}>
        This calculator is designed to help you make an informed decision about
        whether to rent or buy a property.
      </Typography>
      <Typography variant={"body1"}>
        How long do you plan to stay in the property?
      </Typography>
      <NumberField
        placeholder={"5"}
        InputProps={getAdornment({
          position: "end",
          adornmentString: "years",
        })}
      />
    </>
  );
};

export default IntroBlock;
