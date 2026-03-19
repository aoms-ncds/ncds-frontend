/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton, Alert, AlertTitle, CircularProgress, Box, CssBaseline, colors } from '@mui/material';
import { ArrowForwardIos as ArrowForwardIosIcon, Key as KeyIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../../Router';
// import config from '../../config';
import UserServices from './extras/UserServices';

const ResetPasswordFormPage = () => {
  // eslint-disable-next-line no-useless-escape
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  const [unknownError, setUnknownError] = useState();
  const [passwordVisible, setPasswordVisiblity] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | false | true>(false);
  const [passwordsMatchError, setpasswordsMatchError] = useState<string | false | true>(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const execConfirmReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (resetSuccess) {
      navigate('/Login');
    }
    const reset_token = searchParams.get('token');
    console.log({ reset_token });
    if (reset_token) {
      UserServices.confirmPasswordReset({
        reset_token,
        new_password: password,
      })
        .then((res) => {
          console.log({ res });
          if (res.success) {
            setResetSuccess(true);
            setResetError(null);
          } else {
            setResetSuccess(false);
            setResetError(res.message ?? 'Something went wrong!');
          }
        })
        .catch((err) => {
          console.error(err);
          setResetSuccess(false);
          setResetError(err.message ?? 'Something went wrong!');
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          paddingLeft: '0',
          paddingRight: '0',
          paddingBottom: '0',
          paddingTop: '0',
          backgroundImage: 'url(/loginBg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center' /* Center the background image */,
          backgroundAttachment: 'fixed',
          // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)','
          filter: 'brightness(100%)',
        }}
      ></Box>

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
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>
                Reset password
              </Typography>
            </Grid>
            {unknownError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Oops! Error: {unknownError}</AlertTitle>
                  Please <strong>reload the page</strong> and try again
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                sx={{
                  background: '#f4f5f4',
                  borderRadius: 40,
                  padding: 1.5,
                  opacity: 0.85,
                }}
                placeholder="Password"
                // label="Password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                error={password != '' && passwordError != false}
                helperText={passwordError ?? 'Please enter a valid email'}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(passwordRegex.test(e.target.value));
                  if (e.target.value != '' && !passwordRegex.test(e.target.value)) {
                    setPasswordError(true);
                  } else {
                    setPasswordError(false);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={() => setPasswordVisiblity((visible) => !visible)}>{!passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
                required
                disabled={resetSuccess === true}
              />
              {passwordError === true ? (
                <div>
                  <p style={{ color: 'red' }}>Enter a stronger password. Use at least 8 characters. Use a mix of letters (uppercase and lowercase), numbers, and symbols.</p>{' '}
                </div>
              ) : (
                ''
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{
                  background: '#f4f5f4',
                  borderRadius: 40,
                  padding: 1.5,
                  opacity: 0.85,
                }}
                // label="Confirm Password"
                placeholder="Confirm Password"
                type={passwordVisible ? 'text' : 'password'}
                value={confirmPassword}
                error={password != '' && password != confirmPassword}
                // helperText={'Password does not match!'}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  if (password !== newPassword) {
                    setpasswordsMatchError(true);
                  } else {
                    setpasswordsMatchError(false);
                  }

                  setConfirmPassword(newPassword);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={() => setPasswordVisiblity((visible) => !visible)}>{!passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
                required
                disabled={resetSuccess === true}
              />
              {passwordsMatchError === true ? <div > <p style={{ color: 'red' }}>Passwords do not match. Please make sure both passwords are the same.</p> </div> : ''}

            </Grid>
            <Grid item xs={12}>
              {resetSuccess && <Alert severity="success">Password changed successfully!</Alert>}
              {resetError && (
                <Alert severity="error">
                  Something went wrong: <b>{resetError}</b>
                </Alert>
              )}
              <br />
              <Button
                type="submit"
                variant={'contained'}
                color={resetSuccess ? 'success' : resetError ? 'error' : 'primary'}
                sx={{ p: 1, backgroundColor: 'gray', borderRadius: 40 }}
                disabled={isLoading || passwordError != false}
                startIcon={isLoading && <CircularProgress size={20} />}
                endIcon={resetSuccess && <ArrowForwardIosIcon />}
                fullWidth
              >
                {resetSuccess === null && !isLoading && 'Change password'}
                {isLoading && 'Changing password...'}
                {resetSuccess && 'Go to login page'}
                {resetError && 'OOPs!'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* <Card
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
              {unknownError && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Oops! Error: {unknownError}</AlertTitle>
                  Please <strong>reload the page</strong> and try again
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  error={password != '' && passwordError != false}
                  helperText={passwordError ?? 'Please enter a valid email'}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(passwordRegex.test(e.target.value));
                    if (
                      e.target.value != '' &&
                    !passwordRegex.test(e.target.value)
                    ) {
                      setPasswordError(
                        `Enter a stronger password:
                      Use at least 8 characters.
                      Use a mix of letters (uppercase and lowercase), numbers, and symbols. `,
                      );
                    } else {
                      setPasswordError(false);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() =>
                            setPasswordVisiblity((visible) => !visible)
                          }
                        >
                          {!passwordVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                  required
                  disabled={resetSuccess === true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={confirmPassword}
                  error={password != '' && password != confirmPassword}
                  helperText={'Password does not match!'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() =>
                            setPasswordVisiblity((visible) => !visible)
                          }
                        >
                          {!passwordVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                  required
                  disabled={resetSuccess === true}
                />
              </Grid>
              <Grid item xs={12}>
                {resetSuccess && (
                  <Alert severity="success">Password changed successfully!</Alert>
                )}
                {resetError && (
                  <Alert severity="error">
                  Something went wrong: <b>{resetError}</b>
                  </Alert>
                )}
                <br />
                <Button
                  type="submit"
                  variant={'contained'}
                  color={
                    resetSuccess ? 'success' : resetError ? 'error' : 'primary'
                  }
                  sx={{ p: 1 }}
                  disabled={isLoading || passwordError != false}
                  startIcon={isLoading && <CircularProgress size={20} />}
                  endIcon={resetSuccess && <ArrowForwardIosIcon />}
                  fullWidth
                >
                  {resetSuccess === null && !isLoading && 'Change password'}
                  {isLoading && 'Changing password...'}
                  {resetSuccess && 'Go to login page'}
                  {resetError && 'OOPs!'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card> */}
    </>
  );
};

export default ResetPasswordFormPage;
