import React from 'react'
import {grey} from "@mui/material/colors"
import {Paper, Typography} from "@mui/material"

type PaperWrapperProps = {
  children: React.ReactNode;
  image?: string;
  title?: string;
};

const PaperWrapper = ({ children, image, title }: PaperWrapperProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: grey[400],
      }}
    >
      {image && <img src={image} className="logo" alt="" />}
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

export default PaperWrapper