import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import WorkerServices from './extras/WorkersServices';
import WorkerLifeCycleStates from './extras/WorkerLifeCycleStates';
import CommonPageLayout from '../../components/CommonPageLayout';

const WorkersDashboard = () => {
  const [workersCount, setWorkerCount] = useState<number | null>(null);
  const [unapprovedWorkersCount, setUnapprovedWorkersCount] = useState<number | null>(null);
  const [rejectedWorkersCount, setRejectedWorkersCount] = useState<number | null>(null);

  useEffect(() => {
    WorkerServices.getCount()
      .then((res) => setWorkerCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.CREATED })
      .then((res) => setUnapprovedWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.REJECTED })
      .then((res) => setRejectedWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="Workers Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage Workers" secondaryText={workersCount?.toString()} color="#003049" targetRoute="/workers/manage" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Approve New Workers" secondaryText={unapprovedWorkersCount?.toString()} color="green" targetRoute="/workers/approve" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Send Back workers" secondaryText={rejectedWorkersCount?.toString()} color="#f77f00" targetRoute="/workers/reject" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Deactivated Workers" secondaryText={rejectedWorkersCount?.toString()} color="red" targetRoute="/workers/deactivated" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
