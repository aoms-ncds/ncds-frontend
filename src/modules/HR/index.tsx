import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import StaffServices from './extras/StaffServices';
import WorkerServices from '../Workers/extras/WorkersServices';
import WorkerLifeCycleStates from '../Workers/extras/WorkerLifeCycleStates';

const HRDashboard = () => {
  const [staffCount, setStaffCount] = useState<number | null>(null);
  const [workersCount, setWorkerCount] = useState<number | null>(null);
  const [unapprovedWorkersCount, setUnapprovedWorkersCount] = useState<number | null>(null);

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
  }, []);

  useEffect(() => {
    StaffServices.getCount().then((res) => setStaffCount(res.data));
  }, []);

  return (
    <CommonPageLayout title="HR Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage Staff" secondaryText={staffCount ? staffCount?.toString() : undefined} color="#002366" targetRoute="/hr/manage" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage Workers" secondaryText={workersCount?.toString()} color="#6d579a" targetRoute="/workers" />
        </Grid>
        {/* <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Approve New Worker" secondaryText={unapprovedWorkersCount?.toString()} color="#f77f00" targetRoute="/workers/approve" />
        </Grid> */}
      </Grid>
    </CommonPageLayout>
  );
};

export default HRDashboard;
