import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import WorkersServices from '../../Workers/extras/WorkersServices';
import FRServices from '../../FR/extras/FRServices';
import IROServices from '../../IRO/extras/IROServices';
import StaffServices from '../../HR/extras/StaffServices';
import DashBoardCard from '../../FR/components/DashBordCard';
import FRCountCard from '../../FR/components/FRCountCard';
import PermissionChecks from '../../User/components/PermissionChecks';
import { useAuth } from '../../../hooks/Authentication';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const MinimalModuleDataAnalytics = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [divisionsCount, setDivisionsCount] = useState<string | null>(null);
  const [curDivision, setCurDivision] = useState<string | null>(null);
  const [subDivisionsCount, setSubDivisionsCount] = useState<string | null>(null);
  const [staffsCount, setStaffsCount] = useState<string | null>(null);
  const [workersCount, setWorkersCount] = useState<string | null>(null);
  const [frCount, setFrCount] = useState<string | null>(null);
  const [iroCount, setIroCount] = useState<string | null>(null);
  const user=useAuth();

  useEffect(() => {
    DivisionsServices.getDivisionById(((user.user as User).division as unknown as string))
    .then((res) => {
      setCurDivision(res.data.details.name);
    })
    .catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setCurDivision('Unable to load!');
    });

    // Get divisions count
    DivisionsServices.getCount()
      .then((res) => {
        setDivisionsCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setDivisionsCount('Unable to load!');
      });

    // Get Sub-divisions count
    DivisionsServices.getSubDivisionsCount()
      .then((res) => {
        setSubDivisionsCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setSubDivisionsCount('Unable to load!');
      });

    // Get staffs count
    StaffServices.getCount()
      .then((res) => {
        setStaffsCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setStaffsCount('Unable to load!');
      });

    // Get workers count
    WorkersServices.getCount()
      .then((res) => {
        setWorkersCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setWorkersCount('Unable to load!');
      });

    // Get FR count
    FRServices.getCount()
      .then((res) => {
        setFrCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setFrCount('Unable to load!');
      });

    // Get IRO count
    IROServices.getCount()
      .then((res) => {
        setIroCount(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setIroCount('Unable to load!');
      });
  }, []);
  return (

    <Grid container spacing={3}>

      <PermissionChecks permissions={['READ_DIVISIONS']} granted={
        <>
          {(user.user as User).kind !== 'worker' ?
            <Grid item xs={6} md={3} xl={4}>

              <DashBoardCard
                secondaryText='Divisions'
                count={divisionsCount?.toString()}
                color="#5b7f95eb"
                targetRoute="/divisions/"
                // icon={<NotificationsIcon color="secondary" sx={{ fontSize: 70 }} />}
                icon={<img src="/divisionLogo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
              />

            </Grid> :
            <Grid item xs={6} md={3} xl={4}>

              <DashBoardCard secondaryText='Division'
                icon={<img src="/divisionLogo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={curDivision?.toString()}
                color="#e12901" targetRoute={`/divisions/details/${(user.user as User).division}`} />

            </Grid>
          }
        </>
      }
      />

      <PermissionChecks permissions={['READ_DIVISIONS']} granted={
        <>
          {(user.user as User).kind !== 'worker' ?
            <Grid item xs={6} md={3} xl={4}>

              <DashBoardCard secondaryText='Sub-Divisions'
                icon={<img src="/subDivisionLogo.png" alt="Logo"
                  style={{ width: '70px', height: '70px' }} />}
                count={subDivisionsCount?.toString()} color="#5b7f95eb" targetRoute="/divisions/" />

            </Grid>: <Grid item xs={6} md={3} xl={4}>
              <DashBoardCard secondaryText='Sub-Divisions' icon={<img src="/divisionLogo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                count={subDivisionsCount?.toString()} color="#90021f" targetRoute={`/divisions/details/${(user.user as User).division}`} />
            </Grid>

          }
        </>
      }
      />
      {/* {(user.user as User).kind !== 'worker' ?
        <Grid item xs={6} md={3} xl={4}>
          <FRCountCard secondaryText='Sub-Divisions' count={subDivisionsCount?.toString()} color="#90021f" targetRoute={'/divisions/'} />
        </Grid>: <Grid item xs={6} md={3} xl={4}>
          <FRCountCard secondaryText='Sub-Divisions' count={subDivisionsCount?.toString()} color="#90021f" targetRoute={`/divisions/details/${(user.user as User).division}`} />
        </Grid>} */}
      {(user.user as User).kind !== 'worker' &&
      <>
        <PermissionChecks permissions={['READ_STAFFS']} granted={<Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/staffs.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText=" Staffs" count={staffsCount?.toString()} color="#5b7f95eb" targetRoute="/hr/" />
        </Grid>} />
        <PermissionChecks permissions={['READ_WORKERS']} granted={<Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/workers.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText=" Workers" count={workersCount?.toString()} color="#5b7f95eb" targetRoute="/workers/" />
        </Grid>}/>
      </>}
      <PermissionChecks permissions={['READ_FR']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/FrLogo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="FR" count={frCount?.toString()} color="#5b7f95eb" targetRoute="/fr/" />
        </Grid>
      } />
      <PermissionChecks permissions={['READ_IRO']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/IroLogo.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="IRO" count={iroCount?.toString()} color="#5b7f95eb" targetRoute="/iro/" />
        </Grid>
      }/>
    </Grid>

  );
};

export default MinimalModuleDataAnalytics;

