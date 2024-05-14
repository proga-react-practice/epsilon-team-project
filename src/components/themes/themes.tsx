import { PaletteOptions, createTheme } from "@mui/material/styles";

interface CustomPaletteOptions extends PaletteOptions {
  customColor1?: {
    main: string;
  };
  customColor2?: {
    main: string;
  };
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#646BD9",
    },
    secondary: {
      main: "#FF61F6",
    },
    background: {
      default: "#ffffff",
    },
    customColor1: {
      main: "#ffffff",
    },
  } as CustomPaletteOptions,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#62D682",
    },
    secondary: {
      main: "#62D682",
    },
    background: {
      default: "#232121",
    },
    customColor1: {
      main: "#62D682",
    },
  } as CustomPaletteOptions,
});
