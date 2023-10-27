import { Box, Button, CircularProgress, CssBaseline, Grid, IconButton, InputAdornment, InputBase, Typography } from '@mui/material';
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
        setUser(res.data.user as Staff | IWorker);
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
      <Box sx={{
        height: '100vh',
        width: '100vw', paddingLeft: '0', paddingRight: '0',
        paddingBottom: '0',
        paddingTop: '0',
        backgroundImage:
          'url(/loginBg.jpg)',
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
        {/* <CardContent
        > */}
        <form onSubmit={doLogin}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Log in to AOMS
              </Typography>
            </Grid> */}

            <Grid item xs={12}>
              <Box >
                <InputBase
                  value={loginCred.email}
                  onChange={(e) =>
                    setLoginCred((loginCred) => ({
                      ...loginCred,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Email ID/User Name "
                  sx={{
                    background: '#f4f5f4',
                    borderRadius: 40,
                    padding: 1.5,
                    opacity: 0.85,
                  }}
                  // disabled={loading}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                  required
                />
                {emailError &&
                  <Typography sx={{ color: 'red', ml: 5, textAlign: 'left' }}>Please enter a valid email</Typography>
                }
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box >
                <InputBase
                  value={loginCred.password}
                  onChange={(e) =>
                    setLoginCred((loginCred) => ({
                      ...loginCred,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  sx={{
                    background: '#f4f5f4',
                    borderRadius: 40,
                    padding: 1.5,
                    opacity: 0.85,
                  }}
                  // disabled={loading}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton onClick={() => setPasswordVisibility((visible) => !visible)}>{!passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                    </InputAdornment>}
                  required
                />

                {passwordError &&
                  <Typography sx={{ color: 'red', ml: 5, textAlign: 'left' }}>Please enter a valid password</Typography>
                }
              </Box>
              <br />
              <br />
            </Grid>
            <Grid item xs={12} >
              <Button type="submit" variant="contained"
                sx={{ p: 1, backgroundColor: 'gray', borderRadius: 40 }}
                disabled={isLoading} startIcon={isLoading && <CircularProgress size={20} />} fullWidth>
                {isLoading ? 'Login in...' : 'LOG IN'}
              </Button><Button variant="text" sx={{ float: 'right', fontSize: 10, marginTop: 2, color: 'white' }} component={Link} to="/users/reset_password_form">
                Forgot Password?
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* </CardContent>
      </Card> */}
    </>
  );
};

export default LoginPage;
