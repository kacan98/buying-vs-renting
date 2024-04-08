import {createTheme} from "@mui/material"
import {grey} from "@mui/material/colors"

 const customTheme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    text: {
      primary: "#fff",
      secondary: "#000"
    },
    background: {
      default: "#000",
      paper: "#000"
    },
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#000"
    },
    divider: grey[50],
    
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
        },
      },
    },
  },
  
})

export default customTheme