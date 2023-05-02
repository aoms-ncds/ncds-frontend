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
            secondaryText=''
            color='#29cc39'
            targetRoute='/application/list'
          />
        </Grid>
        {/* <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Application Manage'
            secondaryText='27'
            color='#8833ff'
            targetRoute='application/manage/'
          />
        </Grid> */}
      </Grid>
    </CommonPageLayout>

  );
};

export default APPDashboard;
