import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { useEffect, useState } from 'react';
import ApplicationServices from './extras/ApplicationServices';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import FRCountCard from '../FR/components/FRCountCard';

const APPDashboard = () => {
  const [ApplicationCreatedCount, setApplicationCreatedCount] = useState<number| null>(null);
  const [ApplicationActiveCount, setApplicationActiveCount] = useState<number |null>(null);
  const [ApplicationApprovedCount, setApplicationApprovedCount] = useState<number |null>(null);
  const [ApplicationRejectedCount, setApplicationRejectedCount] = useState<number |null>(null);
  useEffect(() => {
    ApplicationServices.getCount({ status: UserLifeCycleStates.CREATED })
    .then((res) => setApplicationCreatedCount(res.data))
    .catch((error) => {
      console.log(error);
    });
    ApplicationServices.getCount({ status: UserLifeCycleStates.ACTIVE })
    .then((res) => setApplicationActiveCount(res.data))
    .catch((error) => {
      console.log(error);
    });
    ApplicationServices.getCount({ status: UserLifeCycleStates.APPROVED })
    .then((res) => setApplicationApprovedCount(res.data))
    .catch((error) => {
      console.log(error);
    });
    ApplicationServices.getCount({ status: UserLifeCycleStates.REJECTED })
    .then((res) => setApplicationRejectedCount(res.data))
    .catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <CommonPageLayout title="Application Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard count={ApplicationCreatedCount?.toString()} secondaryText={'Created / Waiting for HR'} color="#1093eb" />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={ApplicationActiveCount?.toString()} secondaryText={'Active'} color={'#1093eb'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={ApplicationApprovedCount?.toString()} secondaryText={'Approved'} color={'#1093eb'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={ApplicationRejectedCount?.toString()} secondaryText={'Rejected'} color={'#1093eb'} />
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage Application" secondaryText="" color="#005eb8" targetRoute="/application/manage" />
        </Grid>
        <PermissionChecks
          permissions={['MANAGE_APPLICATION']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application approval HR" color='#005eb8' secondaryText="" targetRoute="/application/hr_approve" />
            </Grid>)}/>
        <PermissionChecks
          permissions={['PRESIDENT_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application approval President" color='#005eb8' secondaryText="" targetRoute="/application/president_approve" />
            </Grid>)}/>
      </Grid>
    </CommonPageLayout>
  );
};

export default APPDashboard;
