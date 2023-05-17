import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import WorkerServices from './extras/WorkersServices';
import { useLoader } from '../../hooks/Loader';

const WorkersDashboard = () => {
  const loader = useLoader();
  const [workersCount, setWorkerCount] = useState<number|null>(null);
  useEffect(() => {
    loader.onLoad();
    WorkerServices.getCount()
   .then((res) => {
     console.log(res);
     setWorkerCount(res.data);
   })
  .catch((error) => {
    console.log(error);
  })
  .finally(loader.afterLoad);
  }, []);
  return (
    <CommonPageLayout>
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage Workers'
            secondaryText={workersCount?.toString()}
            color='#29cc39'
            targetRoute="/workers/manage"
          />
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Approve New Workers'
            secondaryText={workersCount?.toString()}
            color='#0dcaf0'
            targetRoute="/workers/approve"
          />
        </Grid>

      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
