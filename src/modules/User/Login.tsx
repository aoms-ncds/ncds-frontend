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
          backgroundImage: 'url(/loginBg.jpeg)',
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
        {/* <Typography variant='body1' > molestias maiores debitis repellendus. Deleniti fugit eveniet reiciendis sint enim unde itaque. Voluptates, nostrum.</Typography> */}
        {verifyOTP ? (
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 4,
                  backdropFilter: 'blur(5px)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* 🔙 Back Button */}
                <Box
                  sx={{
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setverifyOTP(false);
                      setotpRequest({
                        OTP: '',
                        auth_process_id: '',
                      });
                    }}
                    sx={{ color: '#fff' }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

      &nbsp;&nbsp;

                {/* 🔢 OTP Input */}
                <InputBase
                  type="text"
                  // inputProps={{ inputMode: 'numeric', maxLength: 4 }} value={otpRequest.OTP}
                  onChange={(e) => {
                    setotpRequest((otpRequest: any) => ({
                      ...otpRequest,
                      OTP: e.target.value,
                    }));
                    if (e.target.value.length === 4) {
                      setLoading(true);

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
                console.log(user, 'dd');
                const urlParams = new URLSearchParams(window.location.search);
                subscribe();
                const redirectURL = urlParams.get('redirect');
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
                    'flex': 1,
                    'borderRadius': 50,
                    'px': 3,
                    'py': 1.2,
                    'background': 'rgba(255,255,255,0.15)',
                    'backdropFilter': 'blur(10px)',

                    // 🔥 remove white input box
                    '& input': {
                      textAlign: 'center',
                      letterSpacing: '20px',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#fff',
                      background: 'transparent !important',
                    },

                    '& input::placeholder': {
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '20px',
                    },

                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 100px transparent inset',
                      WebkitTextFillColor: '#fff',
                    },

                    // ✨ focus glow
                    '&:focus-within': {
                      boxShadow: '0 0 0 2px rgba(255,255,255,0.2)',
                    },
                  }}
                  inputProps={{
                    maxLength: 4,
                    style: { letterSpacing: 20, textAlign: 'center' },
                  }}
                  disabled={isLoading}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <form onSubmit={doLogin}>
            <Box

            >
              <Box
                sx={{
                  flexWrap: 'wrap', // responsive for small screens
                  width: 350,
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: 'blur(5px)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  color: '#fff',
                }}
              >
                {/* 🔹 Small Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    flexWrap: 'wrap', // responsive for small screens
                    textAlign: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src="/favicon.ico"
                    alt="logo"
                    sx={{
                      width: { xs: 30, sm: 40, md: 60 },
                      height: { xs: 30, sm: 40, md: 60 },
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: 1,
                      fontSize: { xs: 12, sm: 14, md: 16 },
                    }}
                  >
    NAVJEEVAN COMMUNITY DEVELOPMENT SOCIETY
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 3,
                    letterSpacing: 1,
                  }}
                >
      NCDS LOGIN
                </Typography>

                <Grid container spacing={2}>
                  {/* Email */}
                  <Grid item xs={12}>
                    <InputBase
                      value={loginCred.email}
                      onChange={(e) =>
                        setLoginCred((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Email / Username"
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#fff' }} />
                        </InputAdornment>
                      }
                      sx={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 40,
                        px: 2,
                        py: 1.2,
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    {emailError && (
                      <Typography sx={{ color: '#ff6b6b', mt: 1, fontSize: 12 }}>
            Please enter a valid email
                      </Typography>
                    )}
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12}>
                    <InputBase
                      value={loginCred.password}
                      onChange={(e) =>
                        setLoginCred((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Password"
                      type={passwordVisible ? 'text' : 'password'}
                      fullWidth
                      startAdornment={
                        <InputAdornment position="start">
                          <KeyIcon sx={{ color: '#fff' }} />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setPasswordVisibility((visible) => !visible)
                            }
                            sx={{ color: '#fff' }}
                          >
                            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 40,
                        px: 2,
                        py: 1.2,
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    {passwordError && (
                      <Typography sx={{ color: '#ff6b6b', mt: 1, fontSize: 12 }}>
            Please enter a valid password
                      </Typography>
                    )}
                  </Grid>

                  {/* Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading}
                      startIcon={isLoading && <CircularProgress size={20} />}
                      sx={{
                        'mt': 1,
                        'borderRadius': 40,
                        'py': 1,
                        'background': 'linear-gradient(135deg, #ffffff, #dcdcff)',
                        'color': '#3B32E6',
                        'fontWeight': 600,
                        '&:hover': {
                          background: '#fff',
                        },
                      }}
                    >
                      {isLoading ? 'Logging in...' : 'LOG IN'}
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        float: 'right',
                        fontSize: 11,
                        mt: 1,
                        color: '#fff',
                        textTransform: 'none',
                      }}
                      component={Link}
                      to="/users/reset_password_form"
                    >
          Reset Password?
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
