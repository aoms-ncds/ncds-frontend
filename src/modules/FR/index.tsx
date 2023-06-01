import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import { Grid } from '@mui/material';
import FRCountCard from './components/FRCountCard';
import FRServices from './extras/FRServices';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
const frDashboard = () => {
  const [appliedFrCount, setappliedFrCount] = useState<number | null>(null);
  const [approvedfrCount, setapprovedfrCount] = useState<number | null>(null);

  useEffect(() => {
    FRServices.getCount()
      .then((res) => setappliedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_APPROVED })
      .then((res) => setapprovedfrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="FR Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={appliedFrCount?.toString()} secondaryText="Applied" color="#29cc39" />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={approvedfrCount?.toString()} secondaryText={'Approved'} color={'#0dcaf0'} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Apply New" secondaryText="Finance Request" color="#29cc39" targetRoute="/fr/apply" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage" secondaryText="Finance Request" color="#0dcaf0" targetRoute="/fr/manage" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Closed" secondaryText="Finance Request" color="#ffc107" targetRoute="/fr/closed" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage" secondaryText="IRO" color="#8833ff" targetRoute="/iro" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default frDashboard;
