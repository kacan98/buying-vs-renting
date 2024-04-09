import "./App.css";
import Renting from "./components/renting.tsx";
import { ThemeProvider } from "@mui/material";
import customTheme from "./theme.tsx";
import PaperWrapper from "./components/paper.tsx";
import Buying from "./components/buying.tsx";
import leasing from "/leasing.png";
import buying from "/buying.png";
import FuturePredictions from "./components/futurePredictions.tsx"

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <PaperWrapper>
          <h1>Property Investment Calculator</h1>
          <p>
            This calculator is designed to help you make an informed decision
            about whether to rent or buy a property.
          </p>
        </PaperWrapper>
        <PaperWrapper title={"Renting"} image={leasing}>
          <Renting />
        </PaperWrapper>
        <PaperWrapper title={"Buying"} image={buying}>
          <Buying />
        </PaperWrapper>
        <PaperWrapper title={"Future Predictions"}>
          <FuturePredictions />
        </PaperWrapper>
      </div>
    </ThemeProvider>
  );
}

export default App;
