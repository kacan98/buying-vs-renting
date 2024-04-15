import {
  Box,
  Divider,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useLocaleCurrencyFormatter } from "../../../../store/settings/useLocale.ts";

export type ResultPanelProps = {
  heading: string;
  description?: string;
  rows: (
    | { label: string; value: number; tooltip?: React.ReactNode }
    | "divider"
  )[];
  chart?: React.ReactNode;
};

function BuyingOrSellingResultWrapper({
  rows,
  heading,
  description,
  chart,
}: ResultPanelProps) {
  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Typography variant={"h5"} gutterBottom>
        {heading}
      </Typography>
      {description && <Typography variant={"body1"}>{description}</Typography>}
      {chart}
      <Stack>
        {rows.map((row, index) => {
          if (row === "divider") return <Divider key={index} />;

          const { label, value, tooltip } = row;
          const typography = (
            <Typography
              variant={"body1"}
              color={value < 0 ? theme.palette.error.main : undefined}
            >
              {label}: {formatAsCurrency(value || 0)}
            </Typography>
          );
          return (
            <Box key={label}>
              {tooltip ? (
                <Tooltip
                  title={tooltip}
                  placement={isBigScreen ? "left" : "bottom"}
                  sx={{
                    cursor: "help",
                  }}
                >
                  {typography}
                </Tooltip>
              ) : (
                typography
              )}
              {index === rows.length - 1 ? null : (
                <Divider sx={{ margin: "3px 0" }} />
              )}
            </Box>
          );
        })}
      </Stack>
    </>
  );
}

export default BuyingOrSellingResultWrapper;
