import { Box, ThemeProvider, useMediaQuery } from "@mui/material";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SettingsDialog } from "./components/settingsDialog.tsx";
import { darkTheme, lightTheme } from "./theme.ts";
import CalculatorReport from "./components/calculatorReport.tsx";
import InitialSetup from "./components/setupSlider/setupSlider.tsx";
import { markIntroFinished } from "../store/settings/settings.ts";

function App() {
  const themeSettings = useSelector((state: RootState) => state.settings.theme);
  const locale = useSelector((state: RootState) => state.settings.locale);
  const currency = useSelector((state: RootState) => state.settings.currency);
  const introFinished = useSelector(
    (state: RootState) => state.settings.introFinished,
  );

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const themeMode =
    themeSettings === "auto"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : themeSettings;

  const themeUsed = themeMode === "dark" ? darkTheme : lightTheme;
  const isSmallScreen = useMediaQuery(themeUsed.breakpoints.down("md"));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dispatch = useDispatch();

  if (!settingsOpen && (!locale || !currency)) {
    setSettingsOpen(true);

    //I know this is a bit weird but if we are on a small screen, we want to skip the intro
    //and go directly to the report - it makes more sense as a flow this way...
    if (isSmallScreen && !introFinished) dispatch(markIntroFinished());
  }

  return (
    <ThemeProvider theme={themeUsed}>
      <Box
        sx={{
          backgroundColor: themeUsed.palette.secondary.light,
        }}
      >
        {locale &&
          currency &&
          (!introFinished ? (
            <InitialSetup
              open={true}
              finishSetup={() => dispatch(markIntroFinished())}
            />
          ) : (
            <CalculatorReport
              onSettingsButtonClicked={() => setSettingsOpen(true)}
            />
          ))}

        <SettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
