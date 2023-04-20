import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';

const WorkersDashboard = () => {
  return (
    <CommonPageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage Workers'
            secondaryText='12'
            color='#29cc39'
            targetRoute="/workers/manage"
          />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
