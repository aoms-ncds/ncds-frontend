import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Router from './Router';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            default: prefersDarkMode ? '#121212' : '#e1e0e0',
          },
          // primary: {
          //   main: '#FF0000',
          // },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
