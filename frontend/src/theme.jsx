import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 10,
    allVariants: {
      color: "#c15c5c",
    },
  },

  /////////////////////////////////

  palette: {
    primary: {
      main: "#c15c5c",
      bg: "#f9efef",
    },
    secondary: {
      main: "#636464",
      bg: "#c15c5c",
    },
    disabled: {
      main: "#0000001f",
      // light: "#",
      font: "#00000042",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
