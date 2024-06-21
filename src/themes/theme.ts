import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#020317",
    },
    secondary: {
      main: "#b5d62e",
    },

    background: {
      default: "#020317",
    },
  },
});
