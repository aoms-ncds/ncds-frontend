import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DashboardCardButton from '../../components/DashboardCardButton';
import { Grid, Alert } from '@mui/material';
import FRCountCard from './components/FRCountCard';
import FRServices from './extras/FRServices';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import PermissionChecks from '../User/components/PermissionChecks';
const frDashboard = () => {
  const [appliedFrCount, setAppliedFrCount] = useState<number | null>(null);
  const [approvedFrCount, setApprovedFrCount] = useState<number | null>(null);
  const [waitingForPresidentFrCount, setWaitingForPresidentFrCount] = useState<number | null>(null);
  const [waitingForAccountFrCount, setWaitingForAccountFrCount] = useState<number | null>(null);

  useEffect(() => {
    FRServices.getCount()
      .then((res) => setAppliedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.FR_APPROVED })
      .then((res) => setApprovedFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_PRESIDENT })
      .then((res) => setWaitingForPresidentFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    FRServices.getCount({ status: FRLifeCycleStates.WAITING_FOR_ACCOUNTS })
      .then((res) => setWaitingForAccountFrCount(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <CommonPageLayout title="FR Dashboard">
      <PermissionChecks
        permissions={['READ_FR']}
        granted={(
          <>

            <Grid container spacing={3}>
              <Grid item xs={6} md={3} xl={2}>
                <FRCountCard targetRoute="/fr/manage" count={appliedFrCount?.toString()} secondaryText="Applied" color="#0e4d92" />
              </Grid>
              <Grid item xs={6} md={3} xl={2}>
                <FRCountCard targetRoute="/fr/manage" count={approvedFrCount?.toString()} secondaryText={'Approved'} color={'#74b72e'} />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard targetRoute="/fr/manage" count={waitingForPresidentFrCount?.toString()} secondaryText={'Waiting to President'} color={'#fcae1e'} />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard targetRoute="/fr/manage" count={waitingForAccountFrCount?.toString()} secondaryText={'Waiting to Account'} color={'#87CEEB'} />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Manage" secondaryText="Finance Request" color="#003049" targetRoute="/fr/manage" />
              </Grid>
              <PermissionChecks
                permissions={['WRITE_FR']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton primaryText="Apply New" secondaryText="Finance Request" color="green" targetRoute="/fr/apply" />
                  </Grid>
                )}/>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Closed" secondaryText="Finance Request" color="red" targetRoute="/fr/closed" />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Manage" secondaryText="IRO" color="#f77f00" targetRoute="/iro" />
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
