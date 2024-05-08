import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646BD9',
    },
    secondary: {
      main: '#FF61F6',
    },
    background: {
      default: '#ffffff', 
    },
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#62D682',
    },
    secondary: {
      main: '#62D682',
    },
    background: {
      default: '#232121', 
    },
  },
});
