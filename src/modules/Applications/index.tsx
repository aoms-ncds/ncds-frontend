/* eslint-disable max-len */
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { useEffect, useState } from 'react';
import ApplicationServices from './extras/ApplicationServices';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import FRCountCard from '../FR/components/FRCountCard';
import { useAuth } from '../../hooks/Authentication';
import ApplicationLifeCycleStates from './extras/ApplicationLifCyclrStates';


const APPDashboard = () => {
  const [ApplicationCreatedCount, setApplicationCreatedCount] = useState<number | null>(null);
  const [ApplicationActiveCount, setApplicationActiveCount] = useState<number | null>(null);
  const [ApplicationApprovedCount, setApplicationApprovedCount] = useState<number | null>(null);
  const [ApplicationRejectedCount, setApplicationRejectedCount] = useState<number | null>(null);
  const [applications, setApplications] = useState<number|null >(null);
  const [applicationsWelfare, setApplicationsWelfare] = useState<number|null >(null);
  const [applicationsTotal, setApplicationsTotal] = useState<number|null >(null);
  const [applicationsPresident, setApplicationsPresident] = useState<number|null >(null);
  const [applicationsApprove, setApplicationsApprove] = useState<number|null >(null);
  const [applicationsReject, setApplicationsReject] = useState<number|null >(null);

  const auth :any = useAuth();
  useEffect(() => {
    ApplicationServices.getCountByDiv({ status: UserLifeCycleStates.CREATED })
      .then((res) =>{
        console.log(res?.data);

        setApplicationCreatedCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getCountByDiv({ status: ApplicationLifeCycleStates.SENT_TO_PRESIDENT })
      .then((res) =>setApplicationActiveCount(res.data))

      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getCountByDiv({ status: UserLifeCycleStates.APPROVED })
      .then((res) =>setApplicationApprovedCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getCountByDiv({ status: UserLifeCycleStates.REJECTED })
      .then((res) =>setApplicationRejectedCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getCount({ status: UserLifeCycleStates.CREATED })
      .then((res) => {
        setApplications(res.data);
      });
    ApplicationServices.getCount()
      .then((res) => {
        setApplicationsTotal(res.data);
      });
    ApplicationServices.getCount({ status: ApplicationLifeCycleStates.SENT_TO_PRESIDENT })
      .then((res) => {
        setApplicationsPresident(res.data);
      });
    ApplicationServices.getCount({ status: UserLifeCycleStates.APPROVED })
      .then((res) => {
        setApplicationsApprove(res.data);
      });
    ApplicationServices.getCount({ status: UserLifeCycleStates.REJECTED })
      .then((res) => {
        setApplicationsReject(res.data);
      });
    ApplicationServices.getAll()
      .then((res) => {
        setApplicationsWelfare(res.data.filter((res)=>res.name =='For Welfare Help').length);
      });
  }, []);
  return (
    <CommonPageLayout title="Application Dashboard">
      <Grid container spacing={3}>

        <Grid item xs={6} md={3} xl={3}>

          <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
            style={{ width: '50px', height: '50px' }} />} count={applicationsTotal?.toString()}
          secondaryText={'Total Applications'} color="#ff0000" />


        </Grid>
        <Grid item xs={6} md={3} xl={3}>

          <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
            style={{ width: '50px', height: '50px' }} />} count={applicationsWelfare?.toString()}
          secondaryText={'New Welfare Appli.'} color="#ff0000" />


        </Grid>
        <Grid item xs={6} md={3} xl={3}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={applications?.toString()}
            secondaryText={'Created / Waiting for HR'} color="#ff0000" />
          ):(
            <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={ApplicationCreatedCount?.toString()}
            secondaryText={'Created / Waiting for HR'} color="#ffd900" />
          )
          }
        </Grid>

        <Grid item xs={6} md={3} xl={3}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Approved IRO.png"
              alt="Logo" style={{ width: '50px', height: '50px' }} />}
            count={applicationsPresident?.toString()} secondaryText={'Waiting for President'} color={'#0400ff'} />

          ):(
            <FRCountCard icon={<img src="/mod_icons/Approved IRO.png"
              alt="Logo" style={{ width: '50px', height: '50px' }} />}
            count={ApplicationActiveCount?.toString()} secondaryText={'Waiting for President'} color={'#00ff00'} />

          )}

        </Grid>

        <Grid item xs={6} md={3} xl={3}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Completed.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={applicationsApprove?.toString()} secondaryText={'Approved'} color={'#a201ff'} />
          ):(
            <FRCountCard icon={<img src="/mod_icons/Completed.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={ApplicationApprovedCount?.toString()} secondaryText={'Approved'} color={'#00f7ff'} />
          )
          }

        </Grid>

        <Grid item xs={6} md={3} xl={3}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Rejected.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={applicationsReject?.toString()} secondaryText={'Rejected'} color={'#00ff88'} />

          ):(
            <FRCountCard icon={<img src="/mod_icons/Rejected.png" alt="Logo"
              style={{ width: '50px', height: '50px' }} />} count={ApplicationRejectedCount?.toString()} secondaryText={'Rejected'} color={'#cf00f8'} />

          )}
        </Grid>
      </Grid>
      <br />
      <Card
        sx={{
          borderRadius: 4,
          p: { xs: 2, sm: 3 },
          background: '#fff',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="text.primary">
                Manage
          {/* <Divider /> */}
        </Typography>
        <CardContent>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Manage Application" secondaryText="" color="#fff" targetRoute="/application/manage" />
            </Grid>
            <PermissionChecks
              permissions={['MANAGE_APPLICATION']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Application Approval HR" color='#fff' secondaryText="" targetRoute="/application/hr_approve" />
                </Grid>)} />
            <PermissionChecks
              permissions={['PRESIDENT_ACCESS']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="Application Approval President" color='#fff' secondaryText="" targetRoute="/application/president_approve" />
                </Grid>)} />
            <PermissionChecks
              permissions={['PRESIDENT_ACCESS']}
              granted={(
                <Grid item xs={12} md={4} xl={3}>
                  <DashboardCardButton icon={<img src="/mod_icons/Waiting for Verification.png" alt="Logo" style={{ width: '50px', height: '50px' }} />} primaryText="New Welfare Application" color='#fff' secondaryText="" targetRoute="/application/Welfare" />
                </Grid>)} />
          </Grid>
        </CardContent>
      </Card>
    </CommonPageLayout>
  );
};

export default APPDashboard;
