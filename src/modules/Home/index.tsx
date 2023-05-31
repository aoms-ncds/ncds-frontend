import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import MinimalModuleDataAnalytics from './components/MinimalModuleDataAnalytics';

const HomePage = () => {
  return (
    <CommonPageLayout title="Home Page">
      {/* <Container> */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <MinimalModuleDataAnalytics />
        </Grid>
      </Grid>
      {/* </Container> */}
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
