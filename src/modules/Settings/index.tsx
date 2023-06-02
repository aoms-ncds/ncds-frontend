import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';


const SettingsDashboard = () => {
  return (
    <CommonPageLayout title="Settings">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3} width={350}>
          <DashboardCardButton primaryText="Manage" secondaryText="Languages" color="#29cc39" targetRoute="/settings/Languages" />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
