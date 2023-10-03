/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Key as KeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';


import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../../Router';
// import config from '../../config';
import UserServices from './extras/UserServices';

const ResetPasswordFormPage = () => {
  // eslint-disable-next-line no-useless-escape
  const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  const [unknownError, setUnknownError] = useState();
  const [passwordVisible, setPasswordVisiblity] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | false>(false);
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
    </Card>
  );
};

export default ResetPasswordFormPage;
