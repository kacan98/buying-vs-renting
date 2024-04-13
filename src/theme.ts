import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    error: {
      main: "#f11111",
    },
    background: {
      default: "#e3dede",
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          textAlign: "left",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "15px",
          margin: 0,
          textAlign: "left",
          borderRadius: "6px",
        },
      },
    },
  },
});

export default customTheme;
