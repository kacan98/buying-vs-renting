import { Box, ThemeProvider } from "@mui/material";
import PaperWrapper from "./components/paper.tsx";
import CalculatorInputs from "./components/inputs/fields/calculatorInputs.tsx";
import Button from "@mui/material/Button";
import { Settings } from "@mui/icons-material";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SettingsDialog } from "./components/settingsDialog.tsx";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from "./theme.ts";
import ResultSection from "./components/result/resultSection.tsx";
import IntroBlock from "./components/inputs/blocks/introBlock.tsx";

function App() {
  const { t } = useTranslation();
  const themeSettings = useSelector((state: RootState) => state.settings.theme);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const locale = useSelector((state: RootState) => state.settings.locale);
  const currency = useSelector((state: RootState) => state.settings.currency);

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (!settingsOpen && (!locale || !currency)) setSettingsOpen(true);
  const themeMode =
    themeSettings === "auto"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : themeSettings;
  const themeUsed = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeUsed}>
      <Box
        sx={{
          backgroundColor: themeUsed.palette.secondary.light,
        }}
      >
        {locale && currency && (
          <Grid2
            container
            spacing={2}
            justifyContent={"center"}
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <Grid2 xs={12}>
              <PaperWrapper>
                <IntroBlock />
              </PaperWrapper>
            </Grid2>
            <Grid2 sm={12} lg={8}>
              <CalculatorInputs />
            </Grid2>
            <Grid2 sm={12} lg={4}>
              <ResultSection />
            </Grid2>
            <Grid2 sm={12} mt={0}>
              <Button
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => setSettingsOpen(true)}
                variant={
                  themeUsed.palette.mode === "dark" ? "contained" : "outlined"
                }
                color={
                  themeUsed.palette.mode === "dark" ? "secondary" : "primary"
                }
                endIcon={<Settings />}
              >
                {t("Settings")}
              </Button>
            </Grid2>
          </Grid2>
        )}

        <SettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
