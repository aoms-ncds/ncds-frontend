import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from '../Workers/extras/WorkersServices';
// import WorkerLifeCycleStates from '../Workers/extras/WorkerLifeCycleStates';
import ButtonCard from '../../components/ButtonCard';
import PermissionChecks from '../User/components/PermissionChecks';
import StaffServices from '../HR/extras/StaffServices';

const CustomReport = () => {
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
    <CommonPageLayout title="Custom Report Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="FR Report" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            targetRoute="/custom-report/custom-filter-fr" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="IRO Report" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            targetRoute="/custom-report/custom-filter-iro" />
        </Grid>
        {/* <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Custom Report FR" icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={workersCount?.toString()} color="#fff" targetRoute="/workers" />
        </Grid> */}


        {/* <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Approve New Worker" secondaryText={unapprovedWorkersCount?.toString()} color="#f77f00" targetRoute="/workers/approve" />
        </Grid> */}
      </Grid>
    </CommonPageLayout>
  );
};

export default CustomReport;
