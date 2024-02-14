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
          <ButtonCard secondaryText="Manage Workers" icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={workersCount?.toString()} color="#fff" targetRoute="/workers/manage" />
        </Grid>
        <PermissionChecks permissions={['MANAGE_WORKER']} granted={
          <Grid item xs={12} md={4} xl={3}>
            <ButtonCard secondaryText="Approve  Workers" icon={<img src="/mod_icons/ApproveWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={unapprovedWorkersCount?.toString()} color="#fff" targetRoute="/workers/approve" />
          </Grid>
        }
        />
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="In Process workers" icon={<img src="/mod_icons/Process Worker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={rejectedWorkersCount?.toString()} color="#fff" targetRoute="/workers/reject" />
        </Grid>

        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Deactivated Workers" icon={<img src="/mod_icons/Deactivated Workers.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={deactivateWorkersCount?.toString()} color="#fff" targetRoute="/workers/deactivated" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
