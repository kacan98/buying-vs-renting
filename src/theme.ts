import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#094fec",
    },
    secondary: {
      main: "#c0c0c0",
    },
    error: {
      main: "#ee0000",
    },
  },
  typography: {
    h1: {
      fontFamily: "DM Serif Display",
      fontSize: "4rem",
      fontWeight: 100,
    },
    fontSize: 18,
    fontFamily: "Jost, sans-serif",
    h2: {
      fontSize: "6rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    caption: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "1.6rem", // Change this value to adjust the font size
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem", // Change this value to adjust the font size
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "white",
          color: "black",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
      },
    },
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
    MuiTypography: {
      styleOverrides: {
        h1: {
          wordBreak: "break-word",
        },
        h2: {
          wordBreak: "break-word",
        },
        h3: {
          wordBreak: "break-word",
        },
        h4: {
          wordBreak: "break-word",
        },
        h5: {
          wordBreak: "break-word",
        },
        h6: {
          wordBreak: "break-word",
        },
      },
    },
  },
});

export default customTheme;
