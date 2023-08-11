import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Router from './extras/CommonRouter';
import CommonHelpers from './extras/CommonHelpers';
import { useLoader } from './hooks/Loader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';

axios.defaults.baseURL = window.location.hostname === 'localhost' ? 'http://localhost:8002' : 'https://iet-apis.pro910.app';

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
            default: prefersDarkMode ? '#121212' : '#FFFFEA',
          },
          primary: {
            main: '#c4161c',
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: prefersDarkMode ? '#1b253d' : '#ece6ce',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: prefersDarkMode ? '#1b253d' : '#ece6ce',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#c4161c',
              },
            },
          },

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
