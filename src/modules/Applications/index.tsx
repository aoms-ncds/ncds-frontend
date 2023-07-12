import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';

const APPDashboard = () => {
  return (
    <CommonPageLayout title="Application Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Manage Application" secondaryText="" color="#29cc39" targetRoute="/application/manage" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Application approval HR" color='#8833ff' secondaryText="" targetRoute="/application/hr_approve" />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton primaryText="Application approval President" color='#8833ff' secondaryText="" targetRoute="/application/president_approve" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default APPDashboard;
