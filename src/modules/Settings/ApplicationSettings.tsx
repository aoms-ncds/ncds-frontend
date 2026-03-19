import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';

import ButtonCard from '../../components/ButtonCard';


const ApplicationSettings = () => {
  return (
    <CommonPageLayout title="Settings">
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Application Name" color="#fff" targetRoute="/settings/applicationName" />
        </Grid>
        <Grid item xs={12} md={4} xl={3} width={350}>
          <ButtonCard secondaryText="Applied for" color="#fff" targetRoute="/settings/appliedFor" />
        </Grid>


      </Grid>


    </CommonPageLayout>
  );
};

export default ApplicationSettings;
