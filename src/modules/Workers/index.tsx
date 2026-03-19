import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardCardButton from '../../components/DashboardCardButton';
import WorkerServices from './extras/WorkersServices';
import WorkerLifeCycleStates from './extras/WorkerLifeCycleStates';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useAuth } from '../../hooks/Authentication';
import PermissionChecks from '../User/components/PermissionChecks';
import ButtonCard from '../../components/ButtonCard';
import FRCountCard from '../FR/components/FRCountCard';
import SpousesServices from './extras/SpousesServices';
import ChildrenServices from './extras/ChildrenServices';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';

const WorkersDashboard = () => {
  const [workersCount, setWorkerCount] = useState<number | null>(null);
  const [unapprovedWorkersCount, setUnapprovedWorkersCount] = useState<number | null>(null);
  const [rejectedWorkersCount, setRejectedWorkersCount] = useState<number | null>(null);
  const [deactivateWorkersCount, setDeactivateWorkersCount] = useState<number | null>(null);
  const [disapproveWorkersCount, setDisapproveWorkersCount] = useState<number | null>(null);
  const [activeWorker, setActiveWorker] = useState<number | null>(null);
  const [activeSpouse, setActiveSpouse] = useState<number | null>(0);
  const [activeChild, setActiveChild] = useState<number | null>(0);
  const [gender, setGender] = useState<string | null>('');
  // console.log(activeChild?.length, 'activeSpouse');

  const user = useAuth();
  console.log(user);
  useEffect(() => {
    WorkerServices.getCount()
      .then((res) => setWorkerCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.CREATED })
      .then((res) => setUnapprovedWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.REJECTED })
      .then((res) => setRejectedWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.INACTIVE })
      .then((res) => setDeactivateWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.DISAPPROVE })
      .then((res) => setDisapproveWorkersCount(res.data))
      .catch((error) => {
        console.log(error);
      });
    WorkerServices.getCount({ status: WorkerLifeCycleStates.ACTIVE, gender: gender })
      .then((res) => setActiveWorker(res.data))
      .catch((error) => {
        console.log(error);
      });
    SpousesServices.getCount({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => setActiveSpouse(res.data))
      .catch((error) => {
        console.log(error);
      });
    ChildrenServices.getCount({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => setActiveChild(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(()=>{
    WorkerServices.getCount({ status: WorkerLifeCycleStates.ACTIVE, gender: gender })
      .then((res) => setActiveWorker(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [gender]);

  return (
    <CommonPageLayout title="Workers Dashboard">

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={3}>
          <FRCountCard
            icon={
              <img
                src="/mod_icons/Total Active Workers Counter Card.png"
                alt="Logo"
                style={{ width: '70px', height: '70px' }}
              />
            }
            onFilter={(value) => setGender(value)}
            genderFilter={gender}
            count={gender =='male'?activeWorker: gender =='female'? activeSpouse : (activeWorker ?? 0) + (activeSpouse ?? 0)}
            secondaryText="Total Workers"
            color="#fff"
          />        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Total Active Workers Counter Card.png"
            alt="Logo" style={{ width: '70px', height: '70px' }} />} count={activeWorker?.toString()} secondaryText="Active Worker" color="#fff" />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Total Active Spouse Counter Card.png"
            alt="Logo" style={{ width: '70px', height: '70px' }} />} count={activeSpouse?.toString()} secondaryText={'Active Spouse'} color={'#fff'} />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <FRCountCard icon={<img src="/mod_icons/Total Active Child Counter Cards.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={activeChild?.toString()}
            secondaryText={'Active Child'}
            color={'#fff'} />
        </Grid>
      </Grid>
      <br />
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
              <ButtonCard secondaryText="Manage Workers" icon={<img src="/mod_icons/manageWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                count={workersCount?.toString()} color="#fff" targetRoute="/workers/manage" />
            </Grid>
            <PermissionChecks permissions={['MANAGE_WORKER']} granted={
              <Grid item xs={12} md={4} xl={3}>
                <ButtonCard secondaryText="Awaiting Verification" icon={<img src="/mod_icons/ApproveWorker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={unapprovedWorkersCount?.toString()} color="#fff" targetRoute="/workers/approve" />
              </Grid>
            }
            />
            <Grid item xs={12} md={4} xl={3}>
              <ButtonCard secondaryText="In Process Workers" icon={<img src="/mod_icons/Process Worker.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                count={rejectedWorkersCount?.toString()} color="#fff" targetRoute="/workers/reject" />
            </Grid>

            <Grid item xs={12} md={4} xl={3}>
              <ButtonCard secondaryText="Deactivated Workers" icon={<img src="/mod_icons/Deactivated Workers.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                count={deactivateWorkersCount?.toString()} color="#fff" targetRoute="/workers/deactivated" />
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <ButtonCard secondaryText="Disapprove Workers" icon={<img src="/mod_icons/Deactivated Workers.jpeg" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                count={disapproveWorkersCount?.toString()} color="#fff" targetRoute="/workers/disapprove" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CommonPageLayout>
  );
};

export default WorkersDashboard;
