/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Card, CardContent, Grid, LinearProgress, MenuItem, TextField, Typography } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
import PermissionChecks from '../User/components/PermissionChecks';
import FRCountCard from '../FR/components/FRCountCard';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authentication';
import { ArrowBackIos } from '@mui/icons-material';
import FROperationalSummary from '../FR/components/FROperationalSummary';
import formatAmount from '../Common/formatcode';

const IRODashboard = () => {
  const navigate = useNavigate();

  interface Icounts {
    IRAppliedCount:number;
  }
  const [waitingtoofficemanagerCount, setWaitingToOfficeManagerCount] = useState<number>();
  const [totApproved, setTotApproved] = useState<number>();
  const [totTotalPendingReconcilation, setTotalPendingReconcilation] = useState<number>();
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  const [pendingRelease, setPendingReleases] = useState<number | null>(null);
  const [revert, setrevert] = useState<number | null>(null);
  const [disapprove, setDisapprovet] = useState<number | null>(null);
  const [reopen, setReopen] = useState<number | null>(null);
  const [amountReleasedCount, setAmountReleasedCount] = useState<number | null>(null);
  const [dayCount1, setDayCount1] = useState<number | null>(null);
  const [dayCount2, setDayCount2] = useState<number | null>(null);
  const [dayCount3, setDayCount3] = useState<number | null>(null);
  const [dayCount4, setDayCount4] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);
  const [iroDivCOunt, setIroDivCount] = useState<number | null>(null);
  const [divisionBasedCount, setDivisionBasedCount] = useState<number | null>(null);
  const auth:any = useAuth();
  console.log(iroDivCOunt, 'iroDivCOunt');
  console.log(divisionBasedCount, 'divisionBasedCount');
  console.log(auth, 'auth user');
  /**
 * Convert number to short Indian currency format (K, L, Cr)
 */
  function formatShortIndianAmount(amount: number) {
    if (!amount) return '0';

    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + ' Cr';
    }
    if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + ' L';
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + ' K';
    }

    return amount.toString();
  }
  const [totalSanctionedAmount, setTotalSanctionedAmount] = useState<number>(0);
  const [totaltransferredAmount, setTotaltransferredAmount] = useState<number>(0);
  const [totaltransferredTotalAmount, setTotaltransferredTotalAmount] = useState<number>(0);
  const getFinancialYear = (date = new Date()) => {
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
  // useEffect(() => {
  //   IROServices.totalAmount({ total: 'sanctioned', year: year }).then((res) => {
  //     setTotalSanctionedAmount((res.data as any).totalSanctionedAmount);
  //   });
  //   IROServices.totalAmount({ total: 'transferred', year: year }).then((res) => {
  //     setTotaltransferredAmount((res.data as any).totalTranfferedAmount);
  //   });
  //   IROServices.totalAmount({ total: 'reconciliation' }).then((res) => {
  //     setTotaltransferredTotalAmount((res.data as any).totalTranfferedAmount);
  //   });
  // }, [year]);


  useEffect(() => {
    //   IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR })
    //   .then((res) => {
    //     console.log('WAITING_FOR_ACCOUNTS_MNGR:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE })
    //   .then((res) => {
    //     console.log('WAITING_FOR_ACCOUNTS_STATE:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount({ status: IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT })
    //   .then((res) => {
    //     console.log('WAITTING_FOR_RELEASE_AMOUNT:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount({ status: IROLifeCycleStates.IRO_REJECTED })
    //   .then((res) => {
    //     console.log('IRO_REJECTED:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount({ status: IROLifeCycleStates.IRO_IN_PROCESS })
    //   .then((res) => {
    //     console.log('IRO_IN_PROCESS:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount({ status: IROLifeCycleStates.REVERTED_TO_DIVISION })
    //   .then((res) => {
    //     console.log('REVERTED_TO_DIVISION:', res.data);
    //     setIroDivCount(res.data);
    //   });


    // IROServices.getCount({ status: IROLifeCycleStates.REOPENED })
    //   .then((res) => {
    //     console.log('REOPENED:', res.data);
    //     setIroDivCount(res.data);
    //   });

    // IROServices.getCount()
    //   .then((res) => setIROCount(res.data))
    //   .catch((error) => {
    //     console.log(error);
    //   });


    IROServices.getAppliedCountByID(auth?.user?.division)
     .then((res) => {
       console.log(res?.data, 'divisionBasedCount');
       setDivisionBasedCount(res.data as number);
     });

    IROServices.getCount({ status: IROLifeCycleStates.IRO_CLOSED, year: year})
      .then((res) => setClosedIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.countDay({ status: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR, day: '30', year: year })
      .then((res) => setDayCount1(res.data),
      )
      .catch((error) => {
        console.log(error);
      });
    IROServices.countDay({ status: IROLifeCycleStates.REVERTED_TO_DIVISION, day: '3', year: year })
      .then((res) => setDayCount2(res.data),
      )
      .catch((error) => {
        console.log(error);
      });
    IROServices.countDay({ status: IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT, day: '45', year: year })
      .then((res) => setDayCount3(res.data),
      )
      .catch((error) => {
        console.log(error);
      });
    IROServices.countDay({ status: IROLifeCycleStates.APPROVED, day: '200', year: year })
      .then((res) => setDayCount4(res.data),
      )
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT, year: year })
      .then((res) => setPendingReleases(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.REVERTED_TO_DIVISION, year: year })
      .then((res) => setrevert(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.REJECTED, year: year })
      .then((res) => setDisapprovet(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.REOPENED, year: year })
      .then((res) => setReopen(res.data))
      .catch((error) => {
        console.log(error);
      });

    IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, year: year })
      .then((res) => setTotApproved(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR, year: year })
      .then((res) => setIroDivCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getAppliedCount({ year: year })
     .then((res) => {
       console.log(res?.data, 'response here');
       setWaitingToOfficeManagerCount(res.data as number);
     })
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.AMOUNT_RELEASED, year: year })
      .then((res) => setAmountReleasedCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.RECONCILIATION_DONE, year: year })
      .then((res) => setReconciliationCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
  }, [year]);
  const data = [
    {
      title: 'Total Applied (FY 24–25)',
      count: '1,284',
      amount: '$8.2M',
      color: '#2F80ED',
    },
    {
      title: 'Total Approved',
      count: '1,046',
      percent: 81,
      subtitle: 'Approval Rate',
      color: '#8E7CC3',
    },
    {
      title: 'Total Approved',
      count: '1,046',
      percent: 81,
      subtitle: 'Closure Rate',
      color: '#F2C94C',
    },
    {
      title: 'Total Closed',
      count: '982',
      percent: 76,
      subtitle: 'Closure Rate',
      color: '#F2994A',
    },
  ];

  return (
    <CommonPageLayout>
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
      Financial Year Summary (Count -Based to FY)
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

                    '& .MuiSelect-select': {
                      display: 'flex',
                      justifyContent: 'flex-end',
                      textAlign: 'right',
                      paddingRight: '32px !important',
                      paddingLeft: '8px',
                    },

                    '& .MuiSelect-icon': {
                      color: '#3B32E6',
                      right: 6,
                    },

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
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
          Financial Year - {yr}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={3} xl={3}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={waitingtoofficemanagerCount?.toString()}
                // amount={'1000'}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Total Applied"
                color="#0026ff"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={totApproved?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Total Approved"
                color="#ffc400"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={amountReleasedCount?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Total Pending Reconcilation"
                color="#ba00f3"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={closedIROCount?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Total Closed"
                color="#00ddff"
              />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <Typography variant="h6" fontWeight={600} color="#060f71">
               Operational Summary (Amount-Based to FY filters)
                {/* <Divider /> */}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Awaiting Approv.
"
                color="#0004ff"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={pendingRelease?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Rele Amt. Pending"
                color="#ff0000"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={revert?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Reverted"
                color="#5eff00"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={disapprove?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Disapprov."
                color="#46006e"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={reopen?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Re-Opened."
                color="#46006e"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Custom."
                color="#46006e"
              />
            </Grid>

            {/* <Grid item xs={12} md={12} xl={12}>
              <Typography variant="h6" fontWeight={600} color="#060f71">
               Financial Exposure
               
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} xl={4}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                // count={iroDivCOunt?.toString()}
                amount={totalSanctionedAmount}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Total IRO Amount"
                color="#1d006e"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={4}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                amount={totaltransferredAmount}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Pending Approval Amount"
                color="#004e5a"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={4}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                amount={totaltransferredTotalAmount || 0}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Pending Reconciliation Amount"
                color="#68006b"
              />
            </Grid> */}
            <Grid item xs={12} md={12} xl={12}>
              <Typography variant="h6" fontWeight={600} color="#060f71">
               Overdue & Compliance
                {/* <Divider /> */}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                // count={iroDivCOunt?.toString()}
                count={dayCount1?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Overdue Approval"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={dayCount2?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Overdew Resubmit"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={dayCount3?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Overdew reconcilation"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={dayCount4?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Over dew Closing "
                color="#ff9100"
              />
            </Grid>
            {/* <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="High-Value IRO's"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Custom IRO"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="Average Approval Time"
                color="#ff9100"
              />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <FROperationalSummary
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                count={iroDivCOunt?.toString()}
                onClick={() => navigate(`/iro/manage?id=${5}`)}
                secondaryText="SLA Brach Count"
                color="#ff9100"
              />
            </Grid> */}

          </Grid>
        </CardContent>
      </Card>
      <br />
      {/* <Grid container spacing={3}>


        <PermissionChecks
          permissions={['MANAGE_IRO']}
          granted={
            <Grid item xs={12} md={3} xl={2.4}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                onClick={() => navigate(`/iro/manage?id=${4}`)}
                count={waitingtoofficemanagerCount?.toString()}
                secondaryText="Total Applied"
                color="#eb0000"
              />
            </Grid>
          }
          denied={() => (
            <Grid item xs={12} md={3} xl={2.4}>
              <FRCountCard
                icon={
                  <img
                    src="/mod_icons/Approved IRO.png"
                    alt="Logo"
                    style={{ width: '50px', height: '50px' }}
                  />
                }
                onClick={() => navigate('/iro/manage')}
                count={divisionBasedCount?.toString()}
                secondaryText="Total Applied"
                color="#51ff00"
              />
            </Grid>
          )}
        />


        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={
              <img
                src="/mod_icons/Approved IRO.png"
                alt="Logo"
                style={{ width: '50px', height: '50px' }}
              />
            }
            count={iroDivCOunt?.toString()}
            onClick={() => navigate(`/iro/manage?id=${5}`)}
            secondaryText="Pending Approval"
            color="#00ddff"
          />
        </Grid>


        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Amount Released.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            onClick={() => navigate(`/iro/manage/?id=${1}`)}
            count={amountReleasedCount?.toString()}
            secondaryText="Amount Released"
            color="#005eff"
          />
        </Grid>


        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Reconciliation on Process.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            onClick={() => navigate(`/iro/manage/?id=${2}`)}
            count={reconciliationCount?.toString()}
            secondaryText="Reconciliation"
            color="#8800ff"
          />
        </Grid>


        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Closed .png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            count={closedIROCount?.toString()}
            secondaryText="Closed"
            color="#ff00e5"
            onClick={() => navigate('/iro/closed')}
          />
        </Grid>

      </Grid> */}

      {/* <br /> */}
      <br />

      <Card
        sx={{
          borderRadius: 4,
          p: { xs: 2, sm: 3 },
          background: '#fff',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="#060f71">
                Manage
          {/* <Divider /> */}
        </Typography>
        <CardContent>


          <Grid container spacing={3}>

            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Manage IRO" color="#fff" targetRoute="/iro/manage" />
            </Grid>
            <PermissionChecks
              permissions={['OFFICE_MNGR_ACCESS']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Awaiting for Approval (P1)" secondaryText="Approval" color="#fff" targetRoute="/IRO/office_approve" />
                </Grid>
              )} />
            <PermissionChecks
              permissions={['MANAGE_IRO']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount (P2) " color="#fff" targetRoute="/iro/release_amount" />
                  </Grid>
                  {/* <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount FM Request" color="#fff" targetRoute="/iro/release_amount_fm_request" />
              </Grid> */}

                </>
              )} />
            <PermissionChecks
              permissions={['ACCOUNTS_MNGR_ACCESS']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Verify Release Amount (P3)" color="#fff" targetRoute="/iro/release_amount_fm_request" />
                  </Grid>

                </>
              )} />
            <PermissionChecks
              permissions={['MANAGE_IRO']}
              granted={(

                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Pending Reconciliation (P4) " color="#fff" targetRoute="/iro/reconciliation" />
                </Grid>
              )} />


            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Closed IRO (P5)" color="#fff" targetRoute="/iro/closed" />
            </Grid>
            <PermissionChecks
              permissions={['CUSTOM_FR_IRO']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Custom IRO/FR" color="#fff" targetRoute="/fr/CustomFR" />
                </Grid>
              )} />
            <PermissionChecks
              permissions={[]}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                    primaryText="Re Opened" secondaryText="IRO" color="#fff" targetRoute="/iro/reopened" />
                </Grid>
              )} />
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Reverted IRO" color="#fff" targetRoute="/iro/reverted" />
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Disapproved IRO" color="#fff" targetRoute="/iro/disapproved" />
            </Grid>
            {/* <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Rejected IRO" color="#fff" targetRoute="/iro/rejected" />
            </Grid> */}
            <PermissionChecks
              permissions={['AUDIT_VIEW']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount Audit" color="#fff" targetRoute="/iro/release_amount_audit" />
                  </Grid>

                </>
              )} />


          </Grid>
        </CardContent>

      </Card>
    </CommonPageLayout>
  );
};

export default IRODashboard;


