import {Box, ThemeProvider} from "@mui/material"
import customTheme from "./theme.ts";
import PaperWrapper from "./components/paper.tsx";
import CalculatorInputs from "./components/calculatorInputs.tsx";
import Result from "./components/result/result.tsx";
import IntroBlock from "./components/inputBlocks/introBlock.tsx";
import Grid2 from "@mui/material/Unstable_Grid2";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: "#e3dede",
        }}
      >
        <Grid2 container spacing={2} justifyContent={"center"} sx={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Grid2 xs={12}>
            <PaperWrapper>
              <IntroBlock />
            </PaperWrapper>
          </Grid2>
          <Grid2 sm={12} lg={8}>
            <CalculatorInputs />
          </Grid2>
          <Grid2 sm={12} lg={4}>
            <PaperWrapper>
              <Result />
            </PaperWrapper>
          </Grid2>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}

export default App;
