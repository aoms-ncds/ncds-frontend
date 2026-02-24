/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
import PermissionChecks from '../User/components/PermissionChecks';
import FRCountCard from '../FR/components/FRCountCard';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authentication';

const IRODashboard = () => {
  const navigate = useNavigate();

  interface Icounts {
    IRAppliedCount:number;
  }
  const [waitingtoofficemanagerCount, setWaitingToOfficeManagerCount] = useState<number>();
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  const [amountReleasedCount, setAmountReleasedCount] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);
  const [iroDivCOunt, setIroDivCount] = useState<number | null>(null);
  const [divisionBasedCount, setDivisionBasedCount] = useState<number | null>(null);
  const auth:any = useAuth();
  console.log(iroDivCOunt, 'iroDivCOunt');
  console.log(divisionBasedCount, 'divisionBasedCount');
  console.log(auth, 'auth user');

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

    IROServices.getCount({ status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => setClosedIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR })
      .then((res) => setIroDivCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getAppliedCount()
     .then((res) => {
       console.log(res?.data, 'response here');
       setWaitingToOfficeManagerCount(res.data as number);
     })
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.AMOUNT_RELEASED })
      .then((res) => setAmountReleasedCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.RECONCILIATION_DONE })
      .then((res) => setReconciliationCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return (
    <CommonPageLayout title="IRO Dashboard">
      <Grid container spacing={3}>

        {/* Total Applied – permission based */}


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
          denied={() => ( // division baset total count
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

        {/* New Applied – always visible */}
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
            secondaryText="New Applied"
            color="#00ddff"
          />
        </Grid>

        {/* Amount Released */}
        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Amount Released.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            onClick={() => navigate(`/iro/manage/?id=${1}`)}
            count={amountReleasedCount?.toString()}
            secondaryText="Amount Released"
            color="#005eff"
          />
        </Grid>

        {/* Reconciliation */}
        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Reconciliation on Process.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            onClick={() => navigate(`/iro/manage/?id=${2}`)}
            count={reconciliationCount?.toString()}
            secondaryText="Reconciliation"
            color="#8800ff"
          />
        </Grid>

        {/* Closed */}
        <Grid item xs={12} md={3} xl={2.4}>
          <FRCountCard
            icon={<img src="/mod_icons/Closed .png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
            count={closedIROCount?.toString()}
            secondaryText="Closed"
            color="#ff00e5"
            onClick={() => navigate('/iro/closed')}
          />
        </Grid>

      </Grid>

      <br />
      <br />

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

            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Manage IRO" color="#fff" targetRoute="/iro/manage" />
            </Grid>
            <PermissionChecks
              permissions={['OFFICE_MNGR_ACCESS']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Awaiting Approval" secondaryText="Approval" color="#fff" targetRoute="/IRO/office_approve" />
                </Grid>
              )} />
            <PermissionChecks
              permissions={['MANAGE_IRO']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount " color="#fff" targetRoute="/iro/release_amount" />
                  </Grid>
                  {/* <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount FM Request" color="#fff" targetRoute="/iro/release_amount_fm_request" />
              </Grid> */}
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="For Reconciliation " color="#fff" targetRoute="/iro/reconciliation" />
                  </Grid>

                </>
              )} />
            <PermissionChecks
              permissions={['ACCOUNTS_MNGR_ACCESS']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount FM Request" color="#fff" targetRoute="/iro/release_amount_fm_request" />
                  </Grid>

                </>
              )} />
            <PermissionChecks
              permissions={['AUDIT_VIEW']}
              granted={(
                <>
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Release Amount Audit" color="#fff" targetRoute="/iro/release_amount_audit" />
                  </Grid>

                </>
              )} />

            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Closed IRO" color="#fff" targetRoute="/iro/closed" />
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Rejected IRO" color="#fff" targetRoute="/iro/rejected" />
            </Grid>
            <PermissionChecks
              permissions={[]}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />}
                    primaryText="Re Opened" secondaryText="IRO" color="#fff" targetRoute="/iro/reopened" />
                </Grid>
              )} />

            <PermissionChecks
              permissions={['CUSTOM_FR_IRO']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Custom IRO" color="#fff" targetRoute="/iro/custom" />
                </Grid>
              )} />
          </Grid>
        </CardContent>

      </Card>
    </CommonPageLayout>
  );
};

export default IRODashboard;


