import { Box } from "@mui/material";
import NumberField from "./numberInput.tsx";

function Buying() {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <NumberField placeholder={'1000000'} label="Property Price"/>
      </Box>
    </>
  );
}

export default Buying;
