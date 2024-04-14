import React from "react";
import { Paper, Typography } from "@mui/material";

type PaperWrapperProps = {
  children: React.ReactNode;
  image?: string;
  title?: string;
  description?: React.ReactNode;
};

const PaperWrapper = ({
  children,
  image,
  title,
  description,
}: PaperWrapperProps) => {
  return (
    <Paper>
      {image && <img src={image} className="logo" alt="" />}
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

export default PaperWrapper;
