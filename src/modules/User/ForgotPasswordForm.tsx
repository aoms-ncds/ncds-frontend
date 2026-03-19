import React, { useEffect, useState } from 'react';
import { Grid, Button, InputAdornment, Alert, CircularProgress, CssBaseline, Box, InputBase } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import UserServices from './extras/UserServices';

const ForgottenPasswordFormPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [unknownError, setUnknownError] = useState<string | null>(null);
  const [email, setEmail] = useState('');


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('email');

  useEffect(()=>{
    if (product) {
      setEmail(product);
    }
  }, [product]);

  const execConfirmReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      UserServices.requestForgottenPasswordReset(email)
        .then((res) => {
          console.log({ res });
          if (res.success) {
            setLoading(false);
            setSuccess(true);
            setUnknownError(null);
          } else {
            setLoading(false);
            setSuccess(false);
            setUnknownError(res.message ?? 'Something went wrong!');
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setSuccess(false);
          setUnknownError(err.message ?? 'Something went wrong!');
        });
    }
  };

  return (
    <>
      <Box sx={{
        height: '100vh',
        width: '100vw', paddingLeft: '0', paddingRight: '0',
        paddingBottom: '0',
        paddingTop: '0',
        backgroundImage:
          'url(/loginBg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center', /* Center the background image */
        backgroundAttachment: 'fixed',
        // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)','
        filter: 'brightness(100%)',
      }}></Box>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: '65%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          minWidth: 260,
          maxWidth: 360,
          borderRadius: 1,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          // filter: 'brightness(100%) !important',
          // filter: 'brightness(100%)',
        }}
      >
        <form onSubmit={execConfirmReset}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
                Reset password
              </Typography>
            </Grid> */}
            {/* {unknownError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  Error: <b>{unknownError}</b>
                </Alert>
              </Grid>
            )} */}
            <Grid item xs={12}>
              <Box>
                <InputBase
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUnknownError(null);
                  }}
                  placeholder="Email ID/User Name"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#fff' }} />
                    </InputAdornment>
                  }
                  required
                  disabled={success === true}
                  sx={{
                    'background': 'rgba(255,255,255,0.15)',
                    'borderRadius': 40,
                    'px': 2,
                    'py': 1.5,
                    'backdropFilter': 'blur(5px)',
                    'border': '1px solid rgba(255,255,255,0.2)',
                    'transition': '0.3s',

                    // 🔥 FIX INNER INPUT
                    '& input': {
                      color: '#fff',
                      background: 'transparent !important',
                    },

                    '& input::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                    },

                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 100px transparent inset',
                      WebkitTextFillColor: '#fff',
                    },

                    // ✨ hover + focus effect
                    '&:hover': {
                      background: 'rgba(255,255,255,0.2)',
                    },
                    '&:focus-within': {
                      boxShadow: '0 0 0 2px rgba(255,255,255,0.25)',
                    },

                    // disabled style
                    ...(success === true && {
                      opacity: 0.6,
                    }),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              {success && <Alert severity="success">A password reset email has been sent to {email}!</Alert>}
              {unknownError && (
                <Alert severity="error">
                  Error: <b>{unknownError}</b>
                </Alert>
              )}
              <br />
              {!success && (
                <Button
                  type="submit"
                  variant={'contained'}
                  color={success ? 'success' : unknownError ? 'error' : 'primary'}
                  sx={{ p: 1, backgroundColor: 'gray', borderRadius: 40 }}
                  disabled={isLoading || unknownError != null}
                  startIcon={isLoading && <CircularProgress size={20} />}
                  fullWidth
                >
                  {isLoading ? 'Please wait...' : unknownError ? 'Oops!' : ' Reset password'}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ForgottenPasswordFormPage;
