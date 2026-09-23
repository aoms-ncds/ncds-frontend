import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ButtonCard from '../../../components/ButtonCard';
import CommonPageLayout from '../../../components/CommonPageLayout';
import StaffServices from '../../HR/extras/StaffServices';
import WorkerServices from '../../Workers/extras/WorkersServices';
const ProfileReports = () => {
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
          <ButtonCard secondaryText="Associates Details Report" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            targetRoute="/custom-report/worker-details-report" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Spouse Details Report" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            targetRoute="/custom-report/spouse-details-report" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <ButtonCard secondaryText="Child Details Reporter" color={'#fff'} icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            targetRoute="/custom-report/child-details-report" />
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

export default ProfileReports;
