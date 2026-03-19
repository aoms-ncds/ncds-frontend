import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Email as EmailIcon, Key as KeyIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authentication';
import UserServices from './extras/UserServices';
import { subscribe } from '../../extras/Firebase/messaging';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [loginCred, setLoginCred] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [otpRequest, setotpRequest] = useState<IVerifyOTPRequest>({
    auth_process_id: '',
    OTP: '',
  });
  const [passwordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unknownError, setUnknownError] = useState<string>();
  const [resetrequest, setResetRequest] = useState(false);
  const [verifyOTP, setverifyOTP] = useState(false);


  const doLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    UserServices.login(loginCred)
      .then((res) => {
        setLoading(false);
        setverifyOTP(true);
        setotpRequest((authProcessId) => ({
          ...authProcessId,
          auth_process_id: res.data.auth_process_id,
        }));
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
        if (err.message === 'Phone number not found') {
          return setUnknownError(err.message);
        }
        if (err.message === 'Incorrect password') {
          return setPasswordError(true);
        } else if (err.message === 'Password Reset Required') {
          setResetRequest(true);
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

  const handleClose = () => {
    setResetRequest(false);
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
          top: verifyOTP ? '50%' : '65%',
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
        {verifyOTP ? (
          <Grid container>
            <Grid item xs={12}>
              {/* <Grid item xs={12}>
                <Typography variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
                  Enter OTP
                </Typography>
              </Grid> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ borderRadius: '50%', backgroundColor: '#f4f5f4', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => {
                      setverifyOTP(false);
                      setotpRequest({
                        OTP: '',
                        auth_process_id: '',
                      });
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                &nbsp; &nbsp;
                <InputBase
                  type="number"
                  value={otpRequest.OTP}
                  onChange={(e) => {
                    setotpRequest((otpRequest: any) => ({
                      ...otpRequest,
                      OTP: e.target.value,
                    }));
                    if (e.target.value.length === 4) {
                      setLoading(true);
                      /* I know its dumb but since the state update is asynchronous , the request will get send before updating the 4th digit
                         to the state. 
                      */
                      UserServices.verifyOTP({
                        auth_process_id: otpRequest.auth_process_id,
                        OTP: e.target.value,
                      })
                        .then((res) => {
                          console.log(res, 'res');
                          
                          setLoading(false);
                          localStorage.setItem('userToken', res.data.token);
                          localStorage.setItem('userData', JSON.stringify(res.data.user));
                          setUser(res.data.user as Staff | IWorker);
                          console.log(user,'dd');
                          const urlParams = new URLSearchParams(window.location.search);
                          subscribe();
                          const redirectURL = urlParams.get('redirect');
                          // navigate(redirectURL ?? '/');
                          navigate('/');
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoading(false);
                          if (err.message === 'OTP Expired! Generate a new one!') {
                            setverifyOTP(false);
                            setotpRequest({
                              OTP: '',
                              auth_process_id: '',
                            });
                            setUnknownError(err.message);
                          }
                        });
                    }
                  }}
                  placeholder="OTP"
                  sx={{
                    background: '#f4f5f4',
                    borderRadius: 50,
                    padding: 1,
                    paddingLeft: 4,
                    latterSpacing: 5,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  inputProps={{ maxLength: 4, style: { letterSpacing: 40, textAlign: 'center' } }}
                  disabled={isLoading}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <form onSubmit={doLogin}>
            <Grid container spacing={1}>
              {/* <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Log in to AOMS
              </Typography>
            </Grid> */}

              <Grid item xs={12}>
                <Box>
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
                  {emailError && <Typography sx={{ color: 'red', ml: 5, textAlign: 'left' }}>Please enter a valid email</Typography>}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
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
                      </InputAdornment>
                    }
                    required
                  />

                  {passwordError && <Typography sx={{ color: 'red', ml: 5, textAlign: 'left' }}>Please enter a valid password</Typography>}
                </Box>
                <br />
                <br />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ p: 1, backgroundColor: 'gray', borderRadius: 40 }}
                  disabled={isLoading}
                  startIcon={isLoading && <CircularProgress size={20} />}
                  fullWidth
                >
                  {isLoading ? 'Login in...' : 'LOG IN'}
                </Button>
                <Button variant="text" sx={{ float: 'right', fontSize: 10, marginTop: 2, color: 'white' }} component={Link} to="/users/reset_password_form">
                  Reset Password?
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        <Dialog open={resetrequest} onClose={handleClose} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">{'Password Reset Required'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Your password is outdated!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="text" component={Link} to={`/users/reset_password_form?email=${loginCred.email}`}>
              Reset Password
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* </CardContent>
      </Card> */}
    </>
  );
};

export default LoginPage;