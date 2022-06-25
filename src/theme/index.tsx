import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    // 'white' would override other palette properties
    paletteWhite: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    paletteWhite: true;
  }
}

const CustomThemeProvider: React.FC = ({ children }) => {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColorHex: string) =>
    augmentColor({
      color: { main: mainColorHex },
    });

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "Heebo",
    },
    palette: {
      paletteWhite: createColor("#FFFFFF"),
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
