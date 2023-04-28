import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import HRServices from './extras/HRServices';

const HRDashboard = () => {
  const [loadCount, setLoadCount] = useState<unknown>();
  useEffect(() => {
    HRServices.getCount()
   .then((res) => {
     console.log(res);
     setLoadCount(res.data);
   })
  .catch((error) => {
    console.log(error);
  });
  }, []);
  return (
    <CommonPageLayout title='HR Dashboard'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage Staff'
            secondaryText={loadCount as string}
            color='#29cc39'
            targetRoute="/hr/manage"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage workers'
            secondaryText={loadCount as string}
            color='#0dcaf0'
            targetRoute="/hr/worker"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Approve new worker'
            secondaryText={loadCount as string}
            color='#8833ff'
            targetRoute="/hr/approve"
          />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRDashboard;
