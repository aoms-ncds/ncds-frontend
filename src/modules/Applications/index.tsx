import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';

const APPDashboard = () => {
  return (
    <CommonPageLayout title='Application Dashboard'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Application'
            secondaryText='12'
            color='#29cc39'
            targetRoute=""
          />
        </Grid>
      </Grid>
    </CommonPageLayout>

  );
};

export default APPDashboard;
