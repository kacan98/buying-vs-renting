import "./App.css";
import { Grid, ThemeProvider } from "@mui/material";
import customTheme from "./theme.tsx";
import PaperWrapper from "./components/paper.tsx";
import CalculatorInputs from "./components/calculatorInputs.tsx";
import Result from "./components/result/result.tsx";
import IntroBlock from "./components/inputBlocks/introBlock.tsx";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        sx={{
          maxWidth: "1300px",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <PaperWrapper>
            <IntroBlock />
          </PaperWrapper>
        </Grid>
        <Grid item sm={12} md={8}>
          <CalculatorInputs />
        </Grid>
        <Grid item sm={12} md={4}>
          <PaperWrapper>
            <Result />
          </PaperWrapper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
