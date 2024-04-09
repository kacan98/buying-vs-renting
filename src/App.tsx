import "./App.css";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import customTheme from "./theme.tsx";
import PaperWrapper from "./components/paper.tsx";
import NumberField from "./components/numberField.tsx";
import { getAdornment } from "./helpers.tsx";
import CalculatorInputs from "./components/calculatorInputs.tsx";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Grid
        container
        spacing={2}
        sx={{
          margin: "auto",
          maxWidth: "1300px",
          textAlign: "center",
        }}
      >
        <Grid item xs={12}>
          <PaperWrapper>
            <Typography variant={"h1"}>
              Property Investment Calculator
            </Typography>
            <Typography variant={"body1"}>
              This calculator is designed to help you make an informed decision
              about whether to rent or buy a property.
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
          </PaperWrapper>
        </Grid>
        <Grid item sm={12} md={8}>
          <CalculatorInputs />
        </Grid>
        <Grid item sm={12} md={4}>
          <PaperWrapper>
            <div></div>
          </PaperWrapper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
