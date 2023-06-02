import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';


const SettingsDashboard = () => {
  return (
    <CommonPageLayout title="Languages">
      <Grid item xs={12} md={6} xl={3} width={350}>
        <DashboardCardButton primaryText="View" secondaryText="Languages" color="#29cc39" targetRoute="/settings/Languages" />
      </Grid>
    </CommonPageLayout>
  );
};

export default SettingsDashboard;
