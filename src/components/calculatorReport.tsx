import Grid2 from "@mui/material/Unstable_Grid2";
import PaperWrapper from "./paper.tsx";
import IntroBlock from "./inputs/blocks/introBlock.tsx";
import CalculatorInputs from "./inputs/fields/calculatorInputs.tsx";
import ResultSection from "./result/resultSection.tsx";
import Button from "@mui/material/Button";
import { Settings } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

type ReportProps = {
  onSettingsButtonClicked: () => void;
};

export function CalculatorReport({ onSettingsButtonClicked }: ReportProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
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
          onClick={onSettingsButtonClicked}
          variant={theme.palette.mode === "dark" ? "contained" : "outlined"}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
          endIcon={<Settings />}
        >
          {t("Settings")}
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default CalculatorReport;
