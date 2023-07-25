import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import AppCountCard from './components/ApplicationCountCard';
import { useEffect, useState } from 'react';
import ApplicationServices from './extras/ApplicationServices';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';

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
        <Grid item xs={6} md={3} xl={2}>
          <AppCountCard targetRoute="/application/hr_approve" count={ApplicationCreatedCount?.toString()} secondaryText={'Created / Waiting for HR'} color="#0a1172" />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <AppCountCard targetRoute="/application/president_approve" count={ApplicationActiveCount?.toString()} secondaryText={'Active'} color={'#46458C'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <AppCountCard targetRoute="/application/manage" count={ApplicationApprovedCount?.toString()} secondaryText={'Approved'} color={'#116A7B'} />
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <AppCountCard targetRoute="/application/manage" count={ApplicationRejectedCount?.toString()} secondaryText={'Rejected'} color={'#F24C3D'} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage Application" secondaryText="" color="#29cc39" targetRoute="/application/manage" />
        </Grid>
        <PermissionChecks
          permissions={['MANAGE_APPLICATION']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application approval HR" color='#ec9706' secondaryText="" targetRoute="/application/hr_approve" />
            </Grid>)}/>
        <PermissionChecks
          permissions={['PRESIDENT_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application approval President" color='#ca3433' secondaryText="" targetRoute="/application/president_approve" />
            </Grid>)}/>
      </Grid>
    </CommonPageLayout>
  );
};

export default APPDashboard;
