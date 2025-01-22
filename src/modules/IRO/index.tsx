import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import IROServices from './extras/IROServices';
import PermissionChecks from '../User/components/PermissionChecks';
import FRCountCard from '../FR/components/FRCountCard';
import IROLifeCycleStates from './extras/IROLifeCycleStates';

const IRODashboard = () => {
  interface Icounts {
    IRAppliedCount:number;
  }
  const [waitingtoofficemanagerCount, setWaitingToOfficeManagerCount] = useState<Icounts>();
  const [reconciliationCount, setReconciliationCount] = useState<number | null>(null);
  const [amountReleasedCount, setAmountReleasedCount] = useState<number | null>(null);
  const [closedIROCount, setClosedIROCount] = useState<number | null>(null);
  const [iroDivCOunt, setIroDivCount] = useState<number | null>(null);
  console.log(iroDivCOunt, 'iroDivCOunt');

  useEffect(() => {
  // IROServices.getCount()
  //   .then((res) => setIROCount(res.data))
  //   .catch((error) => {
  //     console.log(error);
  //   });
    IROServices.getCount({ status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => setClosedIROCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getCount({ status: IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR })
      .then((res) => setIroDivCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    IROServices.getAppliedCount()
      .then((res) => setWaitingToOfficeManagerCount(res.data as unknown as Icounts))
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.AMOUNT_RELEASED })
      .then((res) => setAmountReleasedCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
    IROServices.getCount({ status: IROLifeCycleStates.RECONCILIATION_DONE })
      .then((res) => setReconciliationCount(res.data))
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return (
    <CommonPageLayout title="IRO Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} xl={3}>
          <PermissionChecks
            permissions={['MANAGE_IRO']}
            granted={(
              <><FRCountCard icon={<img src="/mod_icons/Approved IRO.png" alt="Logo"
                style={{ width: '70px', height: '70px' }} />} count={waitingtoofficemanagerCount?.IRAppliedCount.toString()} secondaryText={'Total Applied'} color="#fff" /><br /></>
            )} />
          <FRCountCard icon={<img src="/mod_icons/Approved IRO.png" alt="Logo"
            style={{ width: '70px', height: '70px' }} />} count={iroDivCOunt?.toString()} secondaryText={'New Applied'} color="#fff" />

        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Amount Released.png" alt="Logo"
            style={{ width: '70px', height: '70px' }} />} count={amountReleasedCount?.toString()} secondaryText={'Amount Released'} color={'#fff'} />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Reconciliation on Process.png"
            alt="Logo" style={{ width: '70px', height: '70px' }} />} count={reconciliationCount?.toString()} secondaryText={'Reconciliation'} color={'#fff'} />
        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Closed .png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={closedIROCount?.toString()} secondaryText={'Closed'} color={'#fff'} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage IRO" color="#fff" targetRoute="/iro/manage" />
        </Grid>
        <PermissionChecks
          permissions={['OFFICE_MNGR_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Office Manager " secondaryText="Approval" color="#fff" targetRoute="/IRO/office_approve" />
            </Grid>
          )} />
        <PermissionChecks
          permissions={['MANAGE_IRO']}
          granted={(
            <>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount " color="#fff" targetRoute="/iro/release_amount" />
              </Grid>
              {/* <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount FM Request" color="#fff" targetRoute="/iro/release_amount_fm_request" />
              </Grid> */}
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="For Reconciliation " color="#fff" targetRoute="/iro/reconciliation" />
              </Grid>

            </>
          )} />
        <PermissionChecks
          permissions={['ACCOUNTS_MNGR_ACCESS']}
          granted={(
            <>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount FM Request" color="#fff" targetRoute="/iro/release_amount_fm_request" />
              </Grid>

            </>
          )} />
        <PermissionChecks
          permissions={['AUDIT_VIEW']}
          granted={(
            <>
              <Grid item xs={12} md={4} xl={3}>
                <DashboardCardButton primaryText="Release Amount Audit" color="#fff" targetRoute="/iro/release_amount_audit" />
              </Grid>

            </>
          )} />

        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Closed IRO" color="#fff" targetRoute="/iro/closed" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Rejected IRO" color="#fff" targetRoute="/iro/rejected" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            primaryText="Re Opened" secondaryText="IRO" color="#fff" targetRoute="/fr/reopened" />
        </Grid>
        <PermissionChecks
          permissions={['CUSTOM_FR_IRO']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Custom IRO" color="#fff" targetRoute="/iro/custom" />
            </Grid>
          )} />
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;


