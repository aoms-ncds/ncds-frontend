import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import WorkerServices from './extras/WorkersServices';

const WorkersDashboard = () => {
  const [loadCount, setLoadCount] = useState<unknown>();
  useEffect(() => {
    WorkerServices.getCount()
   .then((res) => {
     console.log(res);
     setLoadCount(res.data);
   })
  .catch((error) => {
    console.log(error);
  });
  }, []);
  return (
    <CommonPageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage Workers'
            secondaryText={loadCount as string}
            color='#29cc39'
            targetRoute="/workers/manage"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Approve New Workers'
            secondaryText={loadCount as string}
            color='#0dcaf0'
            targetRoute="/workers/approve"
          />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
