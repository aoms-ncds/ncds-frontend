import {
  ArrowUpward as ArrowUpwardIcon,
  CircleNotifications,
  RampRight,
} from '@mui/icons-material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Alert, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import MinimalModuleDataAnalytics from './components/MinimalModuleDataAnalytics';
import CHART1 from './components/chart1';
import CHART2 from './components/chart2';
import CHART3 from './components/chart3';
import CHART4 from './components/chart4';
import CHART5 from './components/chart5';
import CHART6 from './components/chart6';
import CHART7 from './components/chart7';
import { useEffect, useState } from 'react';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import WorkersServices from '../Workers/extras/WorkersServices';
import FRServices from '../FR/extras/FRServices';
import IROServices from '../IRO/extras/IROServices';
import StaffServices from '../HR/extras/StaffServices';
import { useAuth } from '../../hooks/Authentication';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [divisionsCount, setDivisionsCount] = useState<string | null>(null);
  const [workersCount, setWorkersCount] = useState<string | null>(null);
  const [frCount, setFrCount] = useState<string | null>(null);
  const [iroCount, setIroCount] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [divisionsCountit, setDivisionsCountit] = useState<any | null>(null);
  const [curDivision, setCurDivision] = useState<string | null>(null);
  const [subDivisionsCount, setSubDivisionsCount] = useState<string | null>(null);
  const [subDivisionsCountit, setSubDivisionsCountit] = useState<string | null>(null);
  const [staffsCount, setStaffsCount] = useState<string | null>(null);
  const [recentActivity, setRecentActivity] = useState<any | null>(null);
  const user = useAuth();
  console.log(user, '00909');
  const navigate = useNavigate();
  useEffect(() => {
    DivisionsServices.getDivisionById(((user.user as User).division as unknown as string))
        .then((res) => {
          setCurDivision(res.data.details.name);
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setCurDivision('Unable to load!');
        });
    DivisionsServices.recentactivity()
        .then((res) => {
          console.log(res.data, '9-909');
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setCurDivision('Unable to load!');
        });

    // Get divisions count
    DivisionsServices.getCount()
        .then((res) => {
          setDivisionsCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setDivisionsCount('Unable to load!');
        });
    DivisionsServices.getCountIT()
        .then((res) => {
          setDivisionsCountit(res.data.filter((res:Division)=>res.details.isIT ==true).length);
          // Get Sub-divisions count
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setDivisionsCountit('Unable to load!');
        });

    // Get Sub-divisions count
    DivisionsServices.getSubDivisionsCount()
        .then((res) => {
          setSubDivisionsCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setSubDivisionsCount('Unable to load!');
        });
    DivisionsServices.getSubDivisionsCountIt()
        .then((res) => {
          setSubDivisionsCountit(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setSubDivisionsCountit('Unable to load!');
        });

    // Get staffs count
    StaffServices.getCount()
        .then((res) => {
          setStaffsCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setStaffsCount('Unable to load!');
        });

    // Get workers count
    WorkersServices.getCount()
        .then((res) => {
          setWorkersCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setWorkersCount('Unable to load!');
        });

    // Get FR count
    FRServices.getCount()
        .then((res) => {
          setFrCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setFrCount('Unable to load!');
        });

    // Get IRO count
    IROServices.getCount()
        .then((res) => {
          setIroCount(res.data.toString());
        })
        .catch((error) => {
          setErrors((errors) => [...errors, error.message]);
          setIroCount('Unable to load!');
        });
  }, []);
  useEffect(()=>{
    // DivisionsServices.getCountIT()
    // .then((res) => {
    //   console.log(res?.data, 'response');
    //   setDivisionsCount(res.data?.length?.toString());
    // })
    // .catch((error) => {
    //   setDivisionsCount('Unable to load!');
    // });

    WorkersServices.getCount()
    .then((res) => {
      setWorkersCount(res.data.toString());
    });
    WorkersServices.recentActivity()
    .then((res) => {
      setRecentActivity(res.data);
    })
    .catch((error) => {
      setWorkersCount('Unable to load!');
    });

    // Get FR count
    FRServices.getCount()
     .then((res) => {
       setFrCount(res.data.toString());
     })
     .catch((error) => {
       setFrCount('Unable to load!');
     });

    // Get IRO count
    IROServices.getCount()
     .then((res) => {
       setIroCount(res.data.toString());
     })
     .catch((error) => {
       setIroCount('Unable to load!');
     });
  }, []);
  return (
    <CommonPageLayout title="Home" >
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Card
          sx={{
            borderRadius: 4,
            p: { xs: 2, sm: 3 },
            background: '#fff',
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          }}
        >
          <Typography variant="h6" pb={1} fontWeight={600} color="text.primary">
   Manage
          </Typography>
          <Grid container spacing={2}>

            {/* Tile 1 */}
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 3,
                  background: '#f3f0ff',
                }}
              >
                <Box onClick={() =>divisionsCountit ==0 ? navigate(`/divisions/details/${(user.user as User).division}`) : navigate('/divisions')} display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: '#8b7cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/division.png" width="22" />
                  </Box>

                  <Box>
                    <Typography sx={{ color: '#6b6f82' }} fontWeight={700} fontSize={17}>Divisions
                    </Typography>
                    <Typography sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#5a5fcf',
                    }}>{divisionsCountit ==0 ? '1' : divisionsCountit}</Typography>
                  </Box>
                </Box>

                <RampRight />
              </Box>
            </Grid>

            {/* Tile 2 */}
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 3,
                  background: '#fff3d6',
                }}
                onClick={() => navigate('/workers')}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: '#f5c542',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/workers.png" width="22" />
                  </Box>

                  <Box>
                    <Typography fontWeight={700} sx={{ color: '#6b6f82' }} fontSize={17}>Workers</Typography>
                    <Typography sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#5a5fcf',
                    }}>
                      {workersCount}
                    </Typography>
                  </Box>
                </Box>

                <RampRight />
              </Box>
            </Grid>

            {/* Tile 3 */}
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 3,
                  background: '#e6f6ec',
                }}
                onClick={() => navigate('/iro')}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: '#34c759',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/IRO.png" width="22" />
                  </Box>

                  <Box>
                    <Typography fontWeight={700} sx={{ color: '#6b6f82' }} fontSize={17}>IRO</Typography>
                    <Typography sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#5a5fcf',
                    }}>
                      {iroCount}
                    </Typography>
                  </Box>
                </Box>

                <RampRight />
              </Box>
            </Grid>

            {/* Tile 4 */}
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: 3,
                  background: '#e9f4ff',
                }}
                onClick={() => navigate('/fr')}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: '#1da1f2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/fr.png" width="22" />
                  </Box>

                  <Box>
                    <Typography fontWeight={700} sx={{ color: '#6b6f82' }} fontSize={17}>FR</Typography>
                    <Typography sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#5a5fcf',
                    }}>
                      {frCount}
                    </Typography>
                  </Box>
                </Box>

                <RampRight />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <br />
      <Grid container spacing={3} >
   <Grid item xs={12} md={hasPermissions(['ADMIN_ACCESS']) ? 6 : 12} lg={hasPermissions(['ADMIN_ACCESS']) ? 8 : 12} xl={hasPermissions(['ADMIN_ACCESS']) ? 8 : 12}>

          <Card
            sx={{
              borderRadius: 4,
              p: { xs: 2, sm: 3 },
              background: '#fff',
            }}

          >
            <Typography variant="h6" fontWeight={600} color="text.primary">
                     Organization Overview
              {/* <Divider /> */}
            </Typography>
            <CardContent>
              <Grid container spacing={3} >

                <Grid item xs={12} md={6} xl={4}>
                  <Card
                    sx={{
                      'borderRadius': 3,
                      'p': 2,
                      'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                      'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                      'transition': '0.3s',
                      'cursor': 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => navigate('/divisions')}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">

                      {/* Left Section */}
                      <Box display="flex" alignItems="center" gap={2}>

                        {/* Icon Circle */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            background: '#e3e6f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src="/mod_icons/division.png"
                            alt="division"
                            style={{ width: 26, height: 26 }}
                          />
                        </Box>

                        {/* Text */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: '#6b6f82',
                              fontWeight: 500,
                            }}
                          >
            Total Divisions
                          </Typography>

                          <ArrowUpwardIcon
                            sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Right Number */}
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: '#5a5fcf',
                        }}
                      >
                        {divisionsCount}
                      </Typography>

                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Card
                    onClick={() => navigate('/divisions')}
                    sx={{
                      'borderRadius': 3,
                      'p': 2,
                      'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                      'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                      'transition': '0.3s',
                      'cursor': 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">

                      {/* Left Section */}
                      <Box display="flex" alignItems="center" gap={2}>

                        {/* Icon Circle */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            background: '#e3e6f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src="/mod_icons/division.png"
                            alt="division"
                            style={{ width: 26, height: 26 }}
                          />
                        </Box>

                        {/* Text */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: '#6b6f82',
                              fontWeight: 500,
                            }}
                          >
Total Sub-Div                          </Typography>

                          <ArrowUpwardIcon
                            sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Right Number */}
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: '#5a5fcf',
                        }}
                      >
                        {subDivisionsCount}
                      </Typography>

                    </Box>
                  </Card>
                </Grid>
                {hasPermissions(['ADMIN_ACCESS'])&& (

                  <Grid item xs={12} md={6} xl={4}>
                    <Card
                      onClick={() => navigate('/hr/manage')}
                      sx={{
                        'borderRadius': 3,
                        'p': 2,
                        'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                        'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                        'transition': '0.3s',
                        'cursor': 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="space-between">

                        {/* Left Section */}
                        <Box display="flex" alignItems="center" gap={2}>

                          {/* Icon Circle */}
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 2,
                              background: '#e3e6f5',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <img
                              src="/mod_icons/division.png"
                              alt="division"
                              style={{ width: 26, height: 26 }}
                            />
                          </Box>

                          {/* Text */}

                          <Box>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: '#6b6f82',
                                fontWeight: 500,
                              }}
                            >
            Total Staff
                            </Typography>

                            <ArrowUpwardIcon
                              sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                            />
                          </Box>
                        </Box>

                        {/* Right Number */}
                        <Typography
                          sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: '#5a5fcf',
                          }}
                        >
                          {staffsCount}
                        </Typography>

                      </Box>
                    </Card>
                  </Grid>
                )}
                <Grid item xs={12} md={6} xl={4}>
                  <Card
                    onClick={() => navigate('/workers/manage')}
                    sx={{
                      'borderRadius': 3,
                      'p': 2,
                      'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                      'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                      'transition': '0.3s',
                      'cursor': 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">

                      {/* Left Section */}
                      <Box display="flex" alignItems="center" gap={2}>

                        {/* Icon Circle */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            background: '#e3e6f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src="/mod_icons/division.png"
                            alt="division"
                            style={{ width: 26, height: 26 }}
                          />
                        </Box>

                        {/* Text */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: '#6b6f82',
                              fontWeight: 500,
                            }}
                          >
            Total Workers
                          </Typography>

                          <ArrowUpwardIcon
                            sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Right Number */}
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: '#5a5fcf',
                        }}
                      >
                        {workersCount}
                      </Typography>

                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                  <Card
                    onClick={() => navigate('/fr')}
                    sx={{
                      'borderRadius': 3,
                      'p': 2,
                      'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                      'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                      'transition': '0.3s',
                      'cursor': 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">

                      {/* Left Section */}
                      <Box display="flex" alignItems="center" gap={2}>

                        {/* Icon Circle */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            background: '#e3e6f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src="/mod_icons/division.png"
                            alt="division"
                            style={{ width: 26, height: 26 }}
                          />
                        </Box>

                        {/* Text */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: '#6b6f82',
                              fontWeight: 500,
                            }}
                          >
            Total FRs
                          </Typography>

                          <ArrowUpwardIcon
                            sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Right Number */}
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: '#5a5fcf',
                        }}
                      >
                        {frCount}
                      </Typography>

                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Card
                    onClick={() => navigate('/iro')}
                    sx={{
                      'borderRadius': 3,
                      'p': 2,
                      'background': 'linear-gradient(135deg,#f4f6fb,#eef1f8)',
                      'boxShadow': '0 4px 12px rgba(0,0,0,0.08)',
                      'transition': '0.3s',
                      'cursor': 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">

                      {/* Left Section */}
                      <Box display="flex" alignItems="center" gap={2}>

                        {/* Icon Circle */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            background: '#e3e6f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src="/mod_icons/division.png"
                            alt="division"
                            style={{ width: 26, height: 26 }}
                          />
                        </Box>

                        {/* Text */}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: '#6b6f82',
                              fontWeight: 500,
                            }}
                          >
            Total IROs
                          </Typography>

                          <ArrowUpwardIcon
                            sx={{ fontSize: 16, color: '#8a8fa6', mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Right Number */}
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: '#5a5fcf',
                        }}
                      >
                        {iroCount}
                      </Typography>

                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {hasPermissions(['ADMIN_ACCESS']) || (user as any)?.user.kind=='staff' ? (

          <Grid item xs={12} md={6} lg={4} xl={4}>

            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 1, sm: 2 },
                background: '#fff',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                maxHeight: '90%',
              }}
              onClick={() => navigate('/divisions')}
            >
              <Typography variant="h6" fontWeight={600} color="text.primary">
    Breakdowns
              </Typography>

              <CardContent sx={{ p: 0, mt: 2 }}>

                {/* Row 1 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: '#eef1ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/mod_icons/division.png" width="20" />
                    </Box>

                    <Typography fontSize={15}>IET Divisions</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight={600} color="#5a5fcf">
                      {divisionsCountit}
                    </Typography>
                    <RampRight fontSize="small" />
                  </Box>
                </Box>

                {/* Row 2 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: '#eef1ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/mod_icons/division.png" width="20" />
                    </Box>

                    <Typography fontSize={15}>IET Sub-Divisions</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight={600} color="#5a5fcf">
                      {subDivisionsCount}
                    </Typography>
                    <RampRight fontSize="small" />
                  </Box>
                </Box>

                {/* Row 3 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: '#eef1ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/mod_icons/division.png" width="20" />
                    </Box>

                    <Typography fontSize={15}>Other Divisions</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight={600} color="#5a5fcf">
                      {(Number(divisionsCount) || 0) - (Number(divisionsCountit) || 0)}
                    </Typography>
                    <RampRight fontSize="small" />
                  </Box>
                </Box>

                {/* Row 4 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        background: '#eef1ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/mod_icons/division.png" width="20" />
                    </Box>

                    <Typography fontSize={15}>Other Sub-Divisions</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight={600} color="#5a5fcf">
                      {subDivisionsCountit}
                    </Typography>
                    <RampRight fontSize="small" />
                  </Box>
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ):[]}

        <Grid item xs={12} md={12} lg={12} xl={12}>

          <Card
            sx={{
              borderRadius: 4,
              p: { xs: 2, sm: 3 },
              background: '#fff',
              boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="h6" fontWeight={600} color="text.primary">
    Recent Activity
            </Typography>

            <CardContent sx={{ p: 0, mt: 2 }}>

              {/* Row 1 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderBottom: '1px solid #eee',
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: '#efeaff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/fr.png" width="20" />
                  </Box>

                  <Typography fontSize={15}>
                    <b>{(recentActivity)?.FR}</b> New FRs Submitted
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  {/* <Typography fontSize={13} color="text.secondary">
          5m ago
                  </Typography> */}
                  <RampRight fontSize="small" />
                </Box>
              </Box>

              {/* Row 2 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderBottom: '1px solid #eee',
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: '#efeaff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/division.png" width="20" />
                  </Box>

                  <Typography fontSize={15}>
                    <b>{(recentActivity)?.IRO}</b> IRO Crated
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  {/* <Typography fontSize={13} color="text.secondary">
          15m ago
                  </Typography> */}
                  <RampRight fontSize="small" />
                </Box>
              </Box>

              {/* Row 3 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.5,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: '#efeaff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="/mod_icons/subdivision.png" width="20" />
                  </Box>

                  <Typography fontSize={15}>
                    <b>{recentActivity?.Users}</b> Users Joined
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  {/* <Typography fontSize={13} color="text.secondary">
          1h ago
                  </Typography> */}
                  <RampRight fontSize="small" />
                </Box>
              </Box>

            </CardContent>
          </Card>
        </Grid>


      </Grid>

      {/* </Container> */}
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
