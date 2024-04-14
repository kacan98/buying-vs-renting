import { Box, ThemeProvider } from "@mui/material";
import customTheme from "./theme.ts";
import PaperWrapper from "./components/paper.tsx";
import CalculatorInputs from "./components/calculatorInputs.tsx";
import Result from "./components/result/result.tsx";
import IntroBlock from "./components/inputBlocks/introBlock.tsx";
import Button from "@mui/material/Button";
import { Settings } from "@mui/icons-material";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SettingsDialog } from "./components/settingsDialog.tsx";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const locale = useSelector((state: RootState) => state.settings.locale);
  const currency = useSelector((state: RootState) => state.settings.currency);
  if (!settingsOpen && (!locale || !currency)) setSettingsOpen(true);

  return (
    <ThemeProvider theme={customTheme}>
      {locale && currency && (
        <Box
          sx={{
            backgroundColor: "#e3dede",
          }}
        >
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
              <PaperWrapper>
                <Result />
              </PaperWrapper>
            </Grid2>
            <Grid2 sm={12} mt={0}>
              <Button
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => setSettingsOpen(true)}
                variant="outlined"
                endIcon={<Settings />}
              >
                {t("Settings")}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      )}

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </ThemeProvider>
  );
}

export default App;
