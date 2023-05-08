import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Router from './extras/CommonRouter';
import CommonHelpers from './extras/CommonHelpers';
import { useLoader } from './hooks/Loader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  CommonHelpers.setLoader(useLoader());
  CommonHelpers.setEnqueueSnackbar(enqueueSnackbar);

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
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Router />
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
