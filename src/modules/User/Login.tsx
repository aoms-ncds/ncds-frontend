import { Button, Card, CardContent, CircularProgress, CssBaseline, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Email as EmailIcon, Key as KeyIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authentication';
import UserServices from './extras/UserServices';
import { subscribe } from '../../extras/Firebase/messaging';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [loginCred, setLoginCred] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unknownError, setUnknownError] = useState<string>();


  const doLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    UserServices.login(loginCred)
      .then((res) => {
        setLoading(false);
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        setUser(res.data.user as Staff|IWorker);
        const urlParams = new URLSearchParams(window.location.search);
        subscribe();
        const redirectURL = urlParams.get('redirect');
        navigate(redirectURL ?? '/');
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
        if (err.message !== 'Incorrect email' && err.message !== 'Incorrect password') {
          setEmailError(false);
          setPasswordError(false);
          return setUnknownError(err.message);
        }
        if (err.message === 'Incorrect email') {
          return setEmailError(true);
        } else {
          setEmailError(false);
          setUnknownError(undefined);
        }
        if (err.message === 'Incorrect password') {
          return setPasswordError(true);
        } else {
          setPasswordError(false);
          setUnknownError(undefined);
        }
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  useEffect(() => {
    console.log('unknownError', unknownError);
  }, [unknownError]);
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
          <form onSubmit={doLogin}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  Hey, welcome back
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={loginCred.email}
                  error={emailError}
                  helperText={emailError && 'Please enter a valid email'}
                  onChange={(e) =>
                    setLoginCred((loginCred) => ({
                      ...loginCred,
                      email: e.target.value,
                    }))
                  }
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={loginCred.password}
                  error={passwordError}
                  helperText={passwordError && 'Please enter a valid password'}
                  onChange={(e) =>
                    setLoginCred((loginCred) => ({
                      ...loginCred,
                      password: e.target.value,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={() => setPasswordVisibility((visible) => !visible)}>{!passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  fullWidth
                  required
                />
                <Button variant="text" sx={{ float: 'right', fontSize: 10, marginTop: 2 }} component={Link} to="/tests/ForgotPasswordForm">
                  Forgotten password?
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{ p: 1 }} disabled={isLoading} startIcon={isLoading && <CircularProgress size={20} />} fullWidth>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
