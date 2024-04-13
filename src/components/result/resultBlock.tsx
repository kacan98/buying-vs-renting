import {Box, Divider, Stack, Tooltip, Typography, useMediaQuery, useTheme} from "@mui/material"
import { toLocaleCurrencyString } from "../../helpers/financialFcs.ts";
import * as React from "react"

export type ResultBlockProps = {
  heading: string;
  description?: string;
  rows: ({ label: string; value: number; tooltip?: React.ReactNode } | 'divider')[];
};

function ResultBlock({ rows, heading, description }: ResultBlockProps) {
  
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'))
  
  return (
    <>
      <Typography variant={"h5"}
      gutterBottom
      >{heading}</Typography>
      {description && <Typography variant={"body1"}>{description}</Typography>}
      <Stack>
        {rows.map((row, index) => {
          if(row === 'divider') return (<Divider key={index}/>)
          
          const { label, value, tooltip } = row;
          const typography = (
            <Typography
              key={label}
              variant={"body1"}
              color={value < 0 ? "error" : undefined}
            >
              {label}: {toLocaleCurrencyString(value || 0)}
            </Typography>
          );
          return (
            <Box key={index}>
              {tooltip ? (
                <Tooltip
                  title={
                    tooltip
                  }
                  
                  placement={isBigScreen ? "left" : 'bottom'}
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

export default ResultBlock;
