import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import { Grid, Alert } from '@mui/material';
import FRCountCard from './components/FRCountCard';
import FRServices from './extras/FRServices';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import PermissionChecks from '../User/components/PermissionChecks';
const frDashboard = () => {
  const [appliedFrCount, setappliedFrCount] = useState<number | null>(null);
  const [approvedfrCount, setapprovedfrCount] = useState<number | null>(null);

  useEffect(() => {
    FRServices.getCount()
      .then((res) => setappliedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.ACCOUNTS_APPROVED })
      .then((res) => setapprovedfrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="FR Dashboard">
      <PermissionChecks
        permissions={['ADMIN_ACCESS', 'READ_FR', 'WRITE_FR', 'PRESIDENT_ACCESS', 'ACCOUNTS_ACCESS']}
        granted={(
          <>

            <Grid container spacing={3}>
              <Grid item xs={6} md={3} xl={2}>
                <FRCountCard count={appliedFrCount?.toString()} secondaryText="Applied" color="#0a1172" />
              </Grid>
              <Grid item xs={6} md={3} xl={2}>
                <FRCountCard count={approvedfrCount?.toString()} secondaryText={'Approved'} color={'#3cb043'} />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DashboardCardButton primaryText="Apply New" secondaryText="Finance Request" color="#003049" targetRoute="/fr/apply" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DashboardCardButton primaryText="Manage" secondaryText="Finance Request" color="#de2828" targetRoute="/fr/manage" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DashboardCardButton primaryText="Closed" secondaryText="Finance Request" color="#f77f00" targetRoute="/fr/closed" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DashboardCardButton primaryText="Manage" secondaryText="IRO" color="#fcbf49" targetRoute="/iro" />
              </Grid>
            </Grid>

          </>
        )}
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity='error'>
                Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />


    </CommonPageLayout>
  );
};

export default frDashboard;
