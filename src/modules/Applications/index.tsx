import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';

const APPDashboard = () => {
  return (
    <CommonPageLayout title="Application Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage Application" secondaryText="" color="#0077b6" targetRoute="/application/manage" />
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
