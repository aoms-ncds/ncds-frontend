import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';

const HRDashboard = () => {
  return (
    <CommonPageLayout title='HR Dashboard'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage Staff'
            secondaryText='12'
            color='#29cc39'
            targetRoute="/hr/manage"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage workers'
            secondaryText='556'
            color='#0dcaf0'
            targetRoute="/workers"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Approve new worker'
            secondaryText='27'
            color='#8833ff'
            targetRoute="/workers/approval"
          />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRDashboard;
