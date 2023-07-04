import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
import FRCountCard from '../FR/components/FRCountCard';
import IROLifeCycleStates from './extras/IROLifeCycleStates';

const IRODashboard = () => {
  const [waitingtoofficemanagerCount, setWaitingtoofficemanagerCount] = useState<number | null>(null);
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  const [amountreleasedCount, setAmountreleasedCount] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);


  console.log( IROLifeCycleStates.WAITING_TO_OFFICE_MNGR );
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
    IROServices.getCount({ status: IROLifeCycleStates.WAITING_TO_OFFICE_MNGR })
      .then((res) => setWaitingtoofficemanagerCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.AMOUNT_RELEASED })
      .then((res) => setAmountreleasedCount(res.data))
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
          <FRCountCard count={waitingtoofficemanagerCount?.toString()} secondaryText={'Applied'} color="#0a1172" />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard count={amountreleasedCount?.toString()} secondaryText={'Amount released'} color={'#46458C'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={reconciliationCount?.toString()} secondaryText={'Reconcilation'} color={'#116A7B'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={closedIROCount?.toString()} secondaryText={'Closed'} color={'#F24C3D'} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage IRO" color="#003049" targetRoute="/iro/manage" />
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Closed IRO" color="#de2828" targetRoute="/iro/closed" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Reconciliation IRO" color="#3cb043" targetRoute="/iro/Reconciliation" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;


