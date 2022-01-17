import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber, brown } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    fontSize:10,
    //   primary: brown,
    //   secondary: amber,
    type: 'dark',
    primary: {
      main: '#3d302c',
    },
    secondary: {
      main: '#e678ab',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;