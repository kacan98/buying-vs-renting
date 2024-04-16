import React from "react";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

type SlideWrapperProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

function SlideWrapper({ children, title, description }: SlideWrapperProps) {
  return (
    <Box>
      {title && <Typography variant={"h3"}>{title}</Typography>}
      {description && <Typography variant={"body1"}>{description}</Typography>}
      <Grid2 container>
        <Grid2>{children}</Grid2>
        <Grid2
          container
          justifyContent="space-between"
          sx={{
            width: "100%",
          }}
        ></Grid2>
      </Grid2>
    </Box>
  );
}

export default SlideWrapper;
