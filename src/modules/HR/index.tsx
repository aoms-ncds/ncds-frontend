import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import StaffServices from './extras/StaffServices';
import WorkerServices from '../Workers/extras/WorkersServices';
// import WorkerLifeCycleStates from '../Workers/extras/WorkerLifeCycleStates';
import ButtonCard from '../../components/ButtonCard';
import PermissionChecks from '../User/components/PermissionChecks';

const HRDashboard = () => {
  const [staffCount, setStaffCount] = useState<number | null>(null);
  const [workersCount, setWorkerCount] = useState<number | null>(null);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    WorkerServices.getCount()
      .then((res) => setWorkerCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    // WorkerServices.getCount({ status: WorkerLifeCycleStates.CREATED })
    //   .then((res) => setUnapprovedWorkersCount(res.data))
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  useEffect(() => {
    StaffServices.getCount().then((res) => setStaffCount(res.data));
  }, []);

  return (
    <CommonPageLayout title="HR Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Manage Staff" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={staffCount ? staffCount?.toString() : undefined} targetRoute="/hr/manage" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Manage Workers" icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={workersCount?.toString()} color="#fff" targetRoute="/workers" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="PMA deduction master file " icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            color="#fff" targetRoute="/hr/pmaDeduction" />
        </Grid>
        <PermissionChecks
          permissions={['ADMIN_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <ButtonCard secondaryText="Login Logs" dot={'.'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '77px' }} />}
                color="#fff" targetRoute="/hr/login_log" />
            </Grid>)} />

        {/* <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Approve New Worker" secondaryText={unapprovedWorkersCount?.toString()} color="#f77f00" targetRoute="/workers/approve" />
        </Grid> */}
      </Grid>
    </CommonPageLayout>
  );
};

export default HRDashboard;
