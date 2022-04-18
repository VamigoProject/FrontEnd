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
      main: green[500],
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          input: {
            color: 'black',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          input: {
            color: green[500],
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
  },
});

export { lightTheme, darkTheme };
