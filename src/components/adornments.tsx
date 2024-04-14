import { InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";

type getAdornmentProps = {
  startAdornment?: string;
  endAdornment?: string;
};

export function getInputProps({
  startAdornment,
  endAdornment,
}: getAdornmentProps): {
  endAdornment?: JSX.Element;
  startAdornment?: JSX.Element;
} {
  const getAdornment = (adornment: string, position: "end" | "start") => (
    <InputAdornment position={position}>{adornment}</InputAdornment>
  );

  return {
    startAdornment: startAdornment
      ? getAdornment(startAdornment, "start")
      : undefined,
    endAdornment: endAdornment ? getAdornment(endAdornment, "end") : undefined,
  };
}

export function usePercentageAdornment() {
  const { t } = useTranslation();
  return (perYear = false) =>
    getInputProps({
      endAdornment: `%${perYear ? t(" per year") : ""}`,
    });
}
