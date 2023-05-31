import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, InputAdornment, Alert, CircularProgress, CssBaseline } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

// eslint-disable-next-line import/namespace, import/default
import HomeServices from './extras/HomeServices';

const ForgottenPasswordFormPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [unknownError, setUnknownError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const execConfirmReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      HomeServices.requestForgottenPasswordReset(email)
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
      <CssBaseline />
      <Card
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          minWidth: 260,
          maxWidth: 360,
          borderRadius: 1,
        }}
      >
        <CardContent>
          <form onSubmit={execConfirmReset}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  Reset password
                </Typography>
              </Grid>
              {/* {unknownError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  Error: <b>{unknownError}</b>
                </Alert>
              </Grid>
            )} */}
              <Grid item xs={12}>
                <TextField
                  label="Enter your email"
                  type="text"
                  value={email}
                  helperText={'Please enter a valid email'}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUnknownError(null);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                  required
                  disabled={success === true}
                />
              </Grid>
              <Grid item xs={12}>
                {success && <Alert severity="success">A password rest email has been sent to {email}!</Alert>}
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
                    sx={{ p: 1 }}
                    disabled={isLoading || unknownError != null}
                    startIcon={isLoading && <CircularProgress size={20} />}
                    fullWidth
                  >
                    {isLoading ? 'Please wait...' : unknownError ? 'Oops!' : 'Proceed'}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgottenPasswordFormPage;
