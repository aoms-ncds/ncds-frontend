import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import { Grid, Alert, CardContent, Card, Typography, Divider, Box, IconButton, Stack, MenuItem, TextField } from '@mui/material';
import FRCountCard from './components/FRCountCard';
import FRServices from './extras/FRServices';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import PermissionChecks from '../User/components/PermissionChecks';
import { useNavigate } from 'react-router-dom';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FRNewCountCard from './components/FRNewCountCard';
const frDashboard = () => {
  const [appliedFrCount, setAppliedFrCount] = useState<number | null>(null);
  const [approvedFrCount, setApprovedFrCount] = useState<number | null>(null);
  const [waitingForPresidentFrCount, setWaitingForPresidentFrCount] = useState<number | null>(null);
  const [waitingForAccountFrCount, setWaitingForAccountFrCount] = useState<number | null>(null);
  const [reverted, setReverted] = useState<number | null>(null);
  const [resubmittedFrCount, setResubmittedFrCount] = useState<number | null>(null);
  const navigate = useNavigate();
  const [isCoordinator, setisCoordinator] = useState<any>(false);

  const actions = [
    {
      label: 'New FR',
      bg: '#EEF6FF',
      accent: '#2563EB',
      border: '#BFDBFE',
      route: '/fr/apply',
    },
    {
      label: 'New Associates Support',
      bg: '#F0FDF4',
      accent: '#16A34A',
      border: '#BBF7D0',
      route: '/fr/worker_support',
    },
    {
      label: 'New Child Support',
      bg: '#FFF7ED',
      accent: '#EA580C',
      border: '#FED7AA',
      route: '/fr/child_support',
    },
    {
      label: 'New Study help',
      bg: '#FFF7ED',
      accent: '#EA580C',
      border: '#FED7AA',
      route: '/fr/studyHelp',
    },
    {
      label: 'New Custom FR',
      bg: '#FEFCE8',
      accent: '#CA8A04',
      border: '#FDE68A',
      route: '/fr/applyCustom',
    },
    {
      label: 'New Custom IRO',
      bg: '#FDF4FF',
      accent: '#9333EA',
      border: '#E9D5FF',
      route: '/iro/applyCustom',
    },
  ]; const getFinancialYear = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // Jan = 0

    // Financial year starts in April
    const startYear = month >= 3 ? year : year - 1;
    const endYear = startYear + 1;

    return `${startYear}-${String(endYear).slice(2)}`;
  };
  const [year, setYear] = useState(getFinancialYear());
  const currentFYStartYear =
  new Date().getMonth() >= 3 ?
    new Date().getFullYear() :
    new Date().getFullYear() - 1;

  const years = Array.from({ length: 3 }, (_, i) => {
    const start = currentFYStartYear - i;
    return `${start}-${String(start + 1).slice(2)}`;
  });

  useEffect(() => {
    FRServices.getCount({ year: year })
      .then((res) => setAppliedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_APPROVED })
      .then((res) => setApprovedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_PRESIDENT })
      .then((res) => setWaitingForPresidentFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_ACCOUNTS })
      .then((res) => setWaitingForAccountFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_SEND_BACK })
      .then((res) => setReverted(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCustomCount({ isReSubmitted: true })
      .then((res) => setResubmittedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    DivisionsServices.isCoordinator()
      .then((res) => {
        setisCoordinator(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    FRServices.getCount({ year: year })
      .then((res) => setAppliedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_APPROVED, year: year })
      .then((res) => setApprovedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_PRESIDENT, year: year })
      .then((res) => setWaitingForPresidentFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_ACCOUNTS, year: year })
      .then((res) => setWaitingForAccountFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_SEND_BACK, year: year })
      .then((res) => setReverted(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCustomCount({ isReSubmitted: true, year: year })
      .then((res) => setResubmittedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [year]);

  return (
    <CommonPageLayout title="FR Dashboard">

      <PermissionChecks
        permissions={['READ_FR']}
        granted={(
          <>

            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3 },
                background: '#ffffff',
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} xl={12}>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography variant="h6" fontWeight={600} color="#060f71">
                     Count -Based to FY
                      </Typography>

                      <TextField
                        select
                        size="small"
                        value={year}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          setYear(e.target.value);
                        }}
                        sx={{
                          'minWidth': 120,

                          /* SELECT TEXT (important fix) */
                          '& .MuiSelect-select': {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            textAlign: 'right',
                            paddingRight: '32px !important', // space for arrow
                            paddingLeft: '8px',
                          },

                          /* DROPDOWN ICON */
                          '& .MuiSelect-icon': {
                            color: '#3B32E6',
                            right: 6,
                          },

                          /* OUTER BOX */
                          '& .MuiOutlinedInput-root': {
                            'height': 32,
                            'fontSize': 12,
                            'fontWeight': 600,
                            'borderRadius': 8,
                            'color': '#3B32E6',
                            'background': 'linear-gradient(135deg, #F4F6FF, #FFFFFF)',
                            'boxShadow': '0 2px 6px rgba(59,50,230,0.15)',
                            'transition': 'all 0.2s ease',

                            '& fieldset': {
                              borderColor: '#3B32E6',
                            },

                            '&:hover': {
                              background: '#EEF1FF',
                              boxShadow: '0 4px 10px rgba(59,50,230,0.25)',
                            },

                            '&.Mui-focused': {
                              background: '#FFFFFF',
                              boxShadow: '0 0 0 2px rgba(59,50,230,0.25)',
                            },

                            '&.Mui-focused fieldset': {
                              borderColor: '#3B32E6',
                            },
                          },
                        }}
                      >

                        {years.map((yr) => (
                          <MenuItem
                            key={yr}
                            value={yr}
                            sx={{
                              // justifyContent: 'flex-end',
                              // textAlign: 'right',
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
             Financial Year -  {yr}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>


                  <Grid item xs={12} sm={6} md={3} xl={3}>
                    <FRNewCountCard icon={<img src="/mod_icons/APPLIED.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      count={appliedFrCount?.toString()} secondaryText="Total Applied" color="#0feb21"
                      onClick={()=>{
                        if (isCoordinator) {
                          navigate('/fr/manageForDivision/');
                        } else {
                          navigate('/fr/manage/');
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} xl={3}>
                    <FRNewCountCard icon={<img src="/mod_icons/VERIFIED.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      onClick={()=>{
                        if (isCoordinator) {
                          navigate(`/fr/manageForDivision/?id=${1}`); // Pass numbers as query string
                        } else {
                          navigate(`/fr/manage/?id=${1}`); // Pass numbers as query string
                        }
                      }} count={approvedFrCount?.toString()} secondaryText={'Total Verified'} color={'#269811'} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} xl={3}>
                    <FRNewCountCard icon={<img src="/mod_icons/Waiting for President Sanction.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      count={waitingForPresidentFrCount?.toString()}
                      secondaryText={'Awaiting Approv.'}
                      onClick={()=>{
                        if (isCoordinator) {
                          navigate(`/fr/manageForDivision/?id=${2}`); // Pass numbers as query string
                        } else {
                          navigate(`/fr/manage/?id=${2}`); // Pass numbers as query string
                        }
                      }}
                      color={'#0b57d0'} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} xl={3}>
                    <FRNewCountCard icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      count={waitingForAccountFrCount?.toString()} secondaryText={'Pending Verif.'} color={'#889bfe'}
                      onClick={()=>{
                        if (isCoordinator) {
                          navigate(`/fr/manageForDivision/?id=${3}`); // Pass numbers as query string
                        } else {
                          navigate(`/fr/manage/?id=${3}`); // Pass numbers as query string
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} xl={3}>
                    <FRNewCountCard
                      icon={
                        <img
                          src="/mod_icons/Waiting for Verification.png"
                          alt="Logo"
                          style={{ width: '50px', height: '50px' }}
                        />
                      }
                      count={reverted?.toString()}
                      secondaryText="Reverted"
                      color="#fca017"
                      onClick={() => navigate('/fr/sentBack')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} xl={3}>

                    <FRNewCountCard
                      icon={
                        <img
                          src="/mod_icons/Waiting for Verification.png"
                          alt="Logo"
                          style={{ width: '50px', height: '50px' }}
                        />
                      }
                      count={resubmittedFrCount?.toString()}
                      secondaryText="Re-Submitted"
                      color="#4DB6AC"
                      onClick={() => navigate('/fr/resubmitted')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
            <br />
            {/* <Card sx={{ borderRadius: 4 }}>

              <CardContent>

              </CardContent>
            </Card> */}

            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 1 },
                background: '#fff',
              }}
            >
              <Typography variant="h6" fontWeight={600} color="text.primary" >
                Quick Actions
                {/* <Divider /> */}
              </Typography>
              <Stack
                direction="row"
                // spacing={1.5}

              >
                <Grid
                  container
                  spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 2 }}
                  sx={{ py: { xs: 2, sm: 3, md: 4 } }}
                >
                  {actions.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={item.label}>
                      <Box
                        onClick={() => navigate(item.route)}
                        sx={{
                          // Layout
                          'cursor': 'pointer',
                          'display': 'flex',
                          'alignItems': 'center',
                          'justifyContent': 'space-between',
                          'flexDirection': 'column',
                          'gap': { xs: 0.75, sm: 1, md: 1 },
                          'minHeight': { xs: '10px', sm: '12px', md: '14px' },
                          // 'width': '100%',

                          // Appearance
                          'backgroundColor': item.bg,
                          'border': `1.5px solid ${item.border}`,
                          'borderRadius': { xs: '12px', sm: '13px', md: '14px' },
                          'px': { xs: 1.5, sm: 2, md: 1 },
                          'py': { xs: 1, sm: 1.25, md: 1 },

                          // Transitions
                          'transition':
                'transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease, border-color 0.2s ease',

                          '&:hover': {
                            transform: { xs: 'translateY(-1px)', sm: 'translateY(-2px)' },
                            boxShadow: `0 8px 24px ${item.accent}22`,
                            borderColor: item.accent,
                          },
                          '&:active': {
                            transform: 'scale(0.98)',
                          },
                        }}
                      >
                        {/* Left: icon + label */}
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ minWidth: 0, width: '100%', justifyContent: 'center' }}
                        >
                          {/* Icon badge */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: { xs: 28, sm: 30, md: 32 },
                              height: { xs: 28, sm: 30, md: 32 },
                              borderRadius: { xs: '8px', sm: '8.5px', md: '9px' },
                              backgroundColor: `${item.accent}18`,
                              color: item.accent,
                              flexShrink: 0,
                            }}
                          >
                            <AddIcon sx={{ fontSize: { xs: 16, sm: 17, md: 18 } }} />
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.82rem' },
                              color: '#1e293b',
                              letterSpacing: '0.01em',
                              lineHeight: 1.3,
                              textAlign: 'center',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>

                        {/* Chevron */}
                        <Box
                          sx={{
                            color: `${item.accent}88`,
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            transition: 'transform 0.2s ease, color 0.2s ease',
                          }}
                        >
                          {/* <ChevronRightIcon sx={{ fontSize: 18 }} /> */}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Card>
            <br />
            {/* <br /> */}
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 2, sm: 3 },
                background: '#fff',
              }}
            >
              <Typography variant="h6" fontWeight={600} color="text.primary">
                Manage
                {/* <Divider /> */}
              </Typography>
              <CardContent>

                <Grid container spacing={3}>
                  <PermissionChecks
                    permissions={['MANAGE_FR']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Manage FR" secondaryText="Finance Request" color="#fff" targetRoute="/fr/manage" />
                      </Grid>
                    )} />
                  <PermissionChecks
                    permissions={['WRITE_FR']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Manage FR- Division" secondaryText="Finance Request" color="#fff" targetRoute="/fr/manageForDivision" />
                      </Grid>
                    )} />
                  <PermissionChecks
                    permissions={['PRESIDENT_ACCESS']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Awaiting for President Approval"
                          secondaryText="Approval" color="#fff" targetRoute="/fr/Approve" />
                      </Grid>
                    )} />

                  <PermissionChecks
                    permissions={['HR_DPARTMENT_ACCESS']}
                    granted={(
                      <><Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Support FR" secondaryText="FR" color="#fff" targetRoute="/fr/support" />
                      </Grid><Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Expense FR" secondaryText="FR" color="#fff" targetRoute="/fr/Non-support" />
                      </Grid></>
                    )} />
                  <PermissionChecks
                    permissions={['MANAGE_FR']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Welfare FR" secondaryText="FR" color="#fff" targetRoute="/fr/welfareFR" />
                      </Grid>
                    )} />
                  {/* <PermissionChecks
                permissions={['WRITE_FR']}
                granted={(
                  <Grid item xs={12} md={4} xl={2}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      primaryText="New FR" secondaryText="Finance Request" color="#fff" targetRoute="/fr/apply" />
                  </Grid>
                )} /> */}


                  {/* <PermissionChecks
                permissions={['RAISE_WORKERS_FR']}
                granted={(<Grid item xs={12} md={4} xl={2}>
                  <DashboardCardButton primaryText="New AssociatesSupport" secondaryText="AssociatesSupport" color="#fff" targetRoute="/fr/worker_support" />
                </Grid>)} /> */}
                  {/* <PermissionChecks
                permissions={['RAISE_WORKERS_FR']}
                granted={(<Grid item xs={12} md={4} xl={2}>
                  <DashboardCardButton primaryText="New Child Support" secondaryText="Child Support" color="#fff" targetRoute="/fr/child_support" />
                </Grid>)} /> */}
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Reverted FR"
                      secondaryText="FR" color="#fff" targetRoute="/fr/sentBack" />
                  </Grid>
                  <PermissionChecks
                    permissions={['MANAGE_FR']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Resubmitted FR" secondaryText="FR" color="#fff" targetRoute="/fr/resubmitted" />
                      </Grid>
                    )} />
                  <PermissionChecks
                    permissions={[]}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Re Opened FR" secondaryText="FRs" color="#fff" targetRoute="/fr/reopened" />
                      </Grid>
                    )} />
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Disapproved FR"
                      secondaryText="FR" color="#fff" targetRoute="/fr/rejected" />
                  </Grid>

                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                      primaryText="Closed FR" secondaryText="Finance Request" color="#fff" targetRoute="/fr/closed" />
                  </Grid>


                  <PermissionChecks
                    permissions={['CUSTOM_FR_IRO']}
                    granted={(
                      <Grid item xs={12} md={4} xl={3}>
                        <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                          primaryText="Custom FR/IRO" secondaryText="FRs" color="#fff" targetRoute="/fr/CustomFR" />
                      </Grid>
                    )} />


                </Grid>
              </CardContent>
            </Card>

          </>
        )}
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity='error'>
              Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />


    </CommonPageLayout>
  );
};

export default frDashboard;
