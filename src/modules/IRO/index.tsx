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
          <FRCountCard targetRoute="/iro/manage" count={waitingtoofficemanagerCount?.toString()} secondaryText={'Applied'} color="#75C2F6" />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard targetRoute="/iro/release_amount" count={amountReleasedCount?.toString()} secondaryText={'Amount released'} color={'#75C2F6'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard targetRoute="/iro/reconciliation" count={reconciliationCount?.toString()} secondaryText={'Reconcilation'} color={'#75C2F6'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard targetRoute="/iro/closed" count={closedIROCount?.toString()} secondaryText={'Closed'} color={'#75C2F6'} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage IRO" color="#75C2F6" targetRoute="/iro/manage" />
        </Grid>

        <PermissionChecks
          permissions={['MANAGE_IRO']}
          granted={(
            <>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount " color="#75C2F6" targetRoute="/iro/release_amount" />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Reconciliation IRO " color="#75C2F6" targetRoute="/iro/reconciliation" />
              </Grid>

            </>
          )}/>

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Closed IRO" color="#75C2F6" targetRoute="/iro/closed" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;


