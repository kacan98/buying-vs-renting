import "./App.css";
import Renting from "./components/renting.tsx";
import { ThemeProvider } from "@mui/material";
import customTheme from "./theme.tsx";
import PaperWrapper from "./components/paper.tsx";
import Buying from "./components/buying.tsx"
import leasing from "../public/leasing.png";
import buying from "../public/buying.png";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <PaperWrapper
        title={'Renting'}
        image={leasing}>
          <Renting />
        </PaperWrapper>
        <PaperWrapper
          title={'Buying'}
          image={buying}>
          <Buying />
        </PaperWrapper>
      </div>
    </ThemeProvider>
  );
}

export default App;
