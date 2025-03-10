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
  const [reverted, setReverted] = useState<number | null>(null);

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
    FRServices.getCount({ status: FRLifeCycleStates.FR_SEND_BACK })
      .then((res) => setReverted(res.data))
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
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard icon={<img src="/mod_icons/APPLIED.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={appliedFrCount?.toString()} secondaryText="Applied" color="#fff" />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard icon={<img src="/mod_icons/VERIFIED.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={approvedFrCount?.toString()} secondaryText={'Verified'} color={'#fff'} />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard icon={<img src="/mod_icons/Waiting for President Sanction.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={waitingForPresidentFrCount?.toString()}
                  secondaryText={'Waiting for President'}
                  color={'#fff'} />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={waitingForAccountFrCount?.toString()} secondaryText={'Waiting for Account'} color={'#fff'} />
              </Grid>
              <Grid item xs={6} md={3} xl={3}>
                <FRCountCard icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={reverted?.toString()} secondaryText={'Reverted '} color={'#fff'} />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>

              <PermissionChecks
                permissions={['MANAGE_FR']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Manage" secondaryText="Finance Request" color="#fff" targetRoute="/fr/manage" />
                  </Grid>
                )} />
              <PermissionChecks
                permissions={['WRITE_FR']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Manage For Division" secondaryText="Finance Request" color="#fff" targetRoute="/fr/manageForDivision" />
                  </Grid>
                )} />

              <PermissionChecks
                permissions={['WRITE_FR']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Apply New" secondaryText="Finance Request" color="#fff" targetRoute="/fr/apply" />
                  </Grid>
                )} />


              <PermissionChecks
                permissions={['RAISE_WORKERS_FR']}
                granted={(<Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton primaryText="Apply" secondaryText="Workers Support" color="#fff" targetRoute="/fr/worker_support" />
                </Grid>)} />
              <PermissionChecks
                permissions={['RAISE_WORKERS_FR']}
                granted={(<Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton primaryText="Apply" secondaryText="Child Support" color="#fff" targetRoute="/fr/child_support" />
                </Grid>)} />
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} primaryText="Reverted"
                  secondaryText="FR" color="#fff" targetRoute="/fr/sentBack" />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} primaryText="Rejected"
                  secondaryText="FR" color="#fff" targetRoute="/fr/rejected" />
              </Grid>
              <PermissionChecks
                permissions={['PRESIDENT_ACCESS']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} primaryText="President"
                      secondaryText="Approval" color="#fff" targetRoute="/fr/Approve" />
                  </Grid>
                )} />
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  primaryText="Closed" secondaryText="Finance Request" color="#fff" targetRoute="/fr/closed" />
              </Grid>
              <PermissionChecks
                permissions={['HR_DPARTMENT_ACCESS']}
                granted={(
                  <><Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Support" secondaryText="FR" color="#fff" targetRoute="/fr/support" />
                  </Grid><Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Non Support" secondaryText="FR" color="#fff" targetRoute="/fr/Non-support" />
                  </Grid></>
                )} />
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  primaryText="Manage" secondaryText="IRO" color="#fff" targetRoute="/iro" />
              </Grid>
              <PermissionChecks
                permissions={[]}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Re Opened" secondaryText="FRs" color="#fff" targetRoute="/fr/reopened" />
                  </Grid>
                )} />

              <PermissionChecks
                permissions={['CUSTOM_FR_IRO']}
                granted={(
                  <Grid item xs={12} md={4} xl={3}>
                    <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                      primaryText="Custom" secondaryText="FRs" color="#fff" targetRoute="/fr/CustomFR" />
                  </Grid>
                )} />


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
