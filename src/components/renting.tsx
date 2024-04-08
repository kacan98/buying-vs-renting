import { Box } from "@mui/material";
import NumberField from "./numberInput.tsx";

const Renting = () => {
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
        <NumberField label="Monthly rent payments" />
        <NumberField label="Initial investment (e.g. deposit)" />
      </Box>
    </>
  );
};

export default Renting;
