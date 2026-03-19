import { ThemeProvider, createTheme } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useMemo } from 'react';
import CommonHelpers from './extras/CommonHelpers';
import Router from './extras/CommonRouter';
import { useLoader } from './hooks/Loader';

// const serverURL = 'http://localhost:8002';
// const serverURL = 'https://iet-staging.apis.pro910.app/';
// const serverURLOld = 'https://iet-apis.pro910.app';//old


const serverURL = 'https://iet-apis.ietapps.org';// neww

axios.defaults.baseURL = serverURL;
// window.location.hostname === 'localhost' ? 'http://localhost:8002' : 'https://iet-apis.pro910.app';

const App = () => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  CommonHelpers.setLoader(useLoader());
  CommonHelpers.setEnqueueSnackbar(enqueueSnackbar);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          // mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            // default: prefersDarkMode ? '#121212' : '#e1e0e0',
            default: '#e1e0e1',
          },
          primary: {
            main: '#3b32e6',
          },
        },
        typography: {
          fontFamily: '\'Inter\', sans-serif',
          fontSize: 13,
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                // backgroundColor: prefersDarkMode ? '#1b253d' : '#ffffff',
                backgroundColor: '#ffffff',
                fontWeight: 'bold',
                lineHeight: '1.2em',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                // backgroundColor: prefersDarkMode ? '#1b253d' : '#ffffff',
                backgroundColor: '#ffffff',
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
    [],
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
