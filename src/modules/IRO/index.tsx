import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
import PermissionChecks from '../User/components/PermissionChecks';
import FRCountCard from '../FR/components/FRCountCard';
import IROLifeCycleStates from './extras/IROLifeCycleStates';

const IRODashboard = () => {
  const [waitingtoofficemanagerCount, setWaitingToOfficeManagerCount] = useState<number | null>(null);
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  const [amountReleasedCount, setAmountReleasedCount] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);


  useEffect(() => {
    // IROServices.getCount()
    //   .then((res) => setIROCount(res.data))
    //   .catch((error) => {
    //     console.log(error);
    //   });
    IROServices.getCount({ status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => setClosedIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR })
      .then((res) => setWaitingToOfficeManagerCount(res.data))
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
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={waitingtoofficemanagerCount?.toString()} secondaryText={'Applied'} color="#fff" />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard count={amountReleasedCount?.toString()} secondaryText={'Amount released'} color={'#fff'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={reconciliationCount?.toString()} secondaryText={'Reconciliation'} color={'#fff'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={closedIROCount?.toString()} secondaryText={'Closed'} color={'#fff'} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage IRO" color="#fff" targetRoute="/iro/manage" />
        </Grid>

        <PermissionChecks
          permissions={['MANAGE_IRO']}
          granted={(
            <>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount " color="#fff" targetRoute="/iro/release_amount" />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Reconciliation IRO " color="#fff" targetRoute="/iro/reconciliation" />
              </Grid>

            </>
          )} />

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Closed IRO" color="#fff" targetRoute="/iro/closed" />
        </Grid>
        <PermissionChecks
          permissions={['ACCOUNTS_MNGR_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Accounts Manager  " secondaryText="Approval" color="#fff" targetRoute="/IRO/account_approve" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['OFFICE_MNGR_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Office Manager " secondaryText="Approval" color="#fff" targetRoute="/IRO/office_approve" />
            </Grid>
          )} />
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;


