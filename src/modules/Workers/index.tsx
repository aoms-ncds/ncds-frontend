import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import WorkerServices from './extras/WorkersServices';
import WorkerLifeCycleStates from './extras/WorkerLifeCycleStates';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useAuth } from '../../hooks/Authentication';
import PermissionChecks from '../User/components/PermissionChecks';
import ButtonCard from '../../components/ButtonCard';

const WorkersDashboard = () => {
  const [workersCount, setWorkerCount] = useState<number | null>(null);
  const [unapprovedWorkersCount, setUnapprovedWorkersCount] = useState<number | null>(null);
  const [rejectedWorkersCount, setRejectedWorkersCount] = useState<number | null>(null);
  const [deactivateWorkersCount, setDeactivateWorkersCount] = useState<number | null>(null);

  const user = useAuth();
  console.log(user);
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
    WorkerServices.getCount({ status: WorkerLifeCycleStates.INACTIVE })
      .then((res) => setDeactivateWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="Workers Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Manage Workers" count={workersCount?.toString()} color="#005eb8" targetRoute="/workers/manage" />
        </Grid>
        <PermissionChecks permissions={['MANAGE_WORKER']} granted={
          <Grid item xs={12} md={4} xl={3}>
            <ButtonCard secondaryText="Approve  Workers" count={unapprovedWorkersCount?.toString()} color="#005eb8" targetRoute="/workers/approve" />
          </Grid>
        }
        />
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="In Process Workers" count={rejectedWorkersCount?.toString()} color="#005eb8" targetRoute="/workers/reject" />
        </Grid>

        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Deactivated Workers" count={deactivateWorkersCount?.toString()} color="#005eb8" targetRoute="/workers/deactivated" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
