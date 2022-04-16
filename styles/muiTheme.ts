import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
  },
});

export { lightTheme, darkTheme };
