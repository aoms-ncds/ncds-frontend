import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { useEffect, useState } from 'react';
import ApplicationServices from './extras/ApplicationServices';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import FRCountCard from '../FR/components/FRCountCard';
import { useAuth } from '../../hooks/Authentication';


const APPDashboard = () => {
  const [ApplicationCreatedCount, setApplicationCreatedCount] = useState<number | null>(null);
  const [ApplicationActiveCount, setApplicationActiveCount] = useState<number | null>(null);
  const [ApplicationApprovedCount, setApplicationApprovedCount] = useState<number | null>(null);
  const [ApplicationRejectedCount, setApplicationRejectedCount] = useState<number | null>(null);
  const [applications, setApplications] = useState<number|null >(null);
  const [applicationsPresident, setApplicationsPresident] = useState<number|null >(null);
  const [applicationsApprove, setApplicationsApprove] = useState<number|null >(null);
  const [applicationsReject, setApplicationsReject] = useState<number|null >(null);

  const auth :any = useAuth();
  useEffect(() => {
    ApplicationServices.getAll({ status: UserLifeCycleStates.CREATED })
      .then((res) =>{
        console.log(res?.data);

        setApplicationCreatedCount(()=>res.data.filter((dd)=>dd.division?._id==auth?.user?.division ).length);
      })
      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) =>setApplicationActiveCount(()=>res.data.filter((dd)=>dd.division?._id==(auth?.user?.division)).length))

      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.APPROVED })
      .then((res) =>setApplicationApprovedCount(()=>res.data.filter((dd)=>dd.division?._id==(auth?.user?.division)).length))

      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.REJECTED })
      .then((res) =>setApplicationRejectedCount(()=>res.data.filter((dd)=>dd.division?._id==(auth?.user?.division)).length))
      .catch((error) => {
        console.log(error);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.CREATED })
      .then((res) => {
        setApplications(res.data.length);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.ACTIVE })
      .then((res) => {
        setApplicationsPresident(res.data.length);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.APPROVED })
      .then((res) => {
        setApplicationsApprove(res.data.length);
      });
    ApplicationServices.getAll({ status: UserLifeCycleStates.REJECTED })
      .then((res) => {
        setApplicationsReject(res.data.length);
      });
  }, []);
  return (
    <CommonPageLayout title="Application Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={6} md={3} xl={3}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={applications?.toString()}
            secondaryText={'Created / Waiting for HR'} color="#fff" />
          ):(
            <FRCountCard icon={<img src="/mod_icons/Applied Application.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={ApplicationCreatedCount?.toString()}
            secondaryText={'Created / Waiting for HR'} color="#fff" />
          )
          }
        </Grid>

        <Grid item xs={6} md={3} xl={2}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Approved IRO.png"
              alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={applicationsPresident?.toString()} secondaryText={'Waiting for President'} color={'#fff'} />

          ):(
            <FRCountCard icon={<img src="/mod_icons/Approved IRO.png"
              alt="Logo" style={{ width: '70px', height: '70px' }} />}
            count={ApplicationActiveCount?.toString()} secondaryText={'Waiting for President'} color={'#fff'} />

          )}

        </Grid>

        <Grid item xs={6} md={3} xl={2}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Completed.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={applicationsApprove?.toString()} secondaryText={'Approved'} color={'#fff'} />
          ):(
            <FRCountCard icon={<img src="/mod_icons/Completed.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={ApplicationApprovedCount?.toString()} secondaryText={'Approved'} color={'#fff'} />
          )
          }

        </Grid>

        <Grid item xs={6} md={3} xl={2}>
          {(hasPermissions(['MANAGE_APPLICATION'])) ?(
            <FRCountCard icon={<img src="/mod_icons/Rejected.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={applicationsReject?.toString()} secondaryText={'Rejected'} color={'#fff'} />

          ):(
            <FRCountCard icon={<img src="/mod_icons/Rejected.png" alt="Logo"
              style={{ width: '70px', height: '70px' }} />} count={ApplicationRejectedCount?.toString()} secondaryText={'Rejected'} color={'#fff'} />

          )}
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <DashboardCardButton primaryText="Manage Application" secondaryText="" color="#fff" targetRoute="/application/manage" />
        </Grid>
        <PermissionChecks
          permissions={['MANAGE_APPLICATION']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application Approval HR" color='#fff' secondaryText="" targetRoute="/application/hr_approve" />
            </Grid>)} />
        <PermissionChecks
          permissions={['PRESIDENT_ACCESS']}
          granted={(
            <Grid item xs={12} md={4} xl={3}>
              <DashboardCardButton primaryText="Application Approval President" color='#fff' secondaryText="" targetRoute="/application/president_approve" />
            </Grid>)} />
      </Grid>
    </CommonPageLayout>
  );
};

export default APPDashboard;
