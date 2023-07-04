import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
// import IROLifeCycleStates from './extras/IROLifeCycleStates';

const IRODashboard = () => {
  const [IROCount, setIROCount] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  console.log(IROCount);
  console.log(closedIROCount);
  useEffect(() => {
    IROServices.getCount()
      .then((res) => setIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCloseCount()
      .then((res) => setClosedIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getReconciliationCount()
      .then((res) => setReconciliationCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <CommonPageLayout title="IRO Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage IRO" secondaryText={IROCount?.toString()} color="#003049" targetRoute="/iro/manage" />
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Closed IRO" secondaryText={closedIROCount?.toString()} color="#de2828" targetRoute="/iro/closed" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Reconciliation IRO " secondaryText={reconciliationCount?.toString()} color="#3cb043" targetRoute="/iro/Reconciliation" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;
