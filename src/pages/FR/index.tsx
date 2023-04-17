import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import { Grid } from '@mui/material';
import FRCountCard from './components/FRCountCard';
const frDashboard = () => {
  return (
    <CommonPageLayout title='FR Dashboard'>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={140}
            secondaryText='Applied'
            color='#29cc39'/>
        </Grid>
        <Grid item xs={6} md={3} xl={2}>
          <FRCountCard count={140} secondaryText={'Approved'} color={'#0dcaf0'} />
        </Grid>
      </Grid><br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Apply New'
            secondaryText='Finance Request'
            color='#29cc39'
            targetRoute="/fr/apply"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage'
            secondaryText='Finance Request'
            color='#0dcaf0'
            targetRoute="/fr/manage_FR"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Closed'
            secondaryText='Finance Request'
            color='#ffc107'
            targetRoute="fr/closed_FR"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <DashboardCardButton
            primaryText='Manage'
            secondaryText='IRO'
            color='#8833ff'
            targetRoute="/iro"
          />
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default frDashboard;

