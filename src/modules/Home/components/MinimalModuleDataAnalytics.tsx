import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/Authentication';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import DashBoardCard from '../../FR/components/DashBoardCard';
import FRServices from '../../FR/extras/FRServices';
import StaffServices from '../../HR/extras/StaffServices';
import IROServices from '../../IRO/extras/IROServices';
import PermissionChecks from '../../User/components/PermissionChecks';
import WorkersServices from '../../Workers/extras/WorkersServices';

const MinimalModuleDataAnalytics = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [divisionsCount, setDivisionsCount] = useState<string | null>(null);
  const [curDivision, setCurDivision] = useState<string | null>(null);
  const [subDivisionsCount, setSubDivisionsCount] = useState<string | null>(null);
  const [staffsCount, setStaffsCount] = useState<string | null>(null);
  const [workersCount, setWorkersCount] = useState<string | null>(null);
  const [frCount, setFrCount] = useState<string | null>(null);
  const [iroCount, setIroCount] = useState<string | null>(null);
  const user = useAuth();

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

      {(user.user as User).kind !== 'worker' ?
        <PermissionChecks permissions={['READ_ALL_DIVISIONS']} granted={
          <Grid item xs={6} md={3} xl={4}>

            <DashBoardCard
              secondaryText='Divisions'
              count={divisionsCount?.toString()}
              color={'#005eb8'}
              targetRoute="/divisions/"
              // icon={<NotificationsIcon color="secondary" sx={{ fontSize: 70 }} />}
              icon={<img src="/mod_icons/division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            />

          </Grid>} /> :
        <PermissionChecks permissions={['READ_DIVISIONS']} granted={
          <Grid item xs={6} md={3} xl={4}>

            <DashBoardCard secondaryText='Division'
              icon={<img src="/mod_icons/division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} count={divisionsCount?.toString()}
              color="#005eb8" targetRoute={`/divisions/details/${(user.user as User).division}`} />


          </Grid>
        }
        />
      }

      < PermissionChecks permissions={['READ_DIVISIONS']} granted={
        <>
          {
            (user.user as User).kind !== 'worker' ?
              <Grid item xs={6} md={3} xl={4}>

                <DashBoardCard secondaryText='Sub-Divisions'
                  icon={<img src="/mod_icons/sub_division.png" alt="Logo"
                    style={{ width: '70px', height: '70px' }} />}
                  count={subDivisionsCount?.toString()} color={'#005eb8'} targetRoute="/divisions/" />

              </Grid> : <Grid item xs={6} md={3} xl={4}>
                <DashBoardCard secondaryText='Sub-Divisions' icon={<img src="/mod_icons/sub_division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  count={subDivisionsCount?.toString()} color="#005eb8" targetRoute={`/divisions/details/${(user.user as User).division}`} />
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
      {
        (user.user as User).kind !== 'worker' &&
        <>
          <PermissionChecks permissions={['READ_STAFFS']} granted={<Grid item xs={6} md={3} xl={4}>
            <DashBoardCard icon={<img src="/mod_icons/staff.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
              secondaryText=" Staffs" count={staffsCount?.toString()} color={'#005eb8'} targetRoute="/hr/" />
          </Grid>} />
          <PermissionChecks permissions={['READ_WORKERS']} granted={<Grid item xs={6} md={3} xl={4}>
            <DashBoardCard icon={<img src="/mod_icons/workers.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
              secondaryText=" Workers" count={workersCount?.toString()} color={'#005eb8'} targetRoute="/workers/" />
          </Grid>} />
        </>
      }
      <PermissionChecks permissions={['READ_FR']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/mod_icons/fr.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="FR" count={frCount?.toString()} color={'#005eb8'} targetRoute="/fr/" />
        </Grid>
      } />
      <PermissionChecks permissions={['READ_IRO']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/mod_icons/IRO.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="IRO" count={iroCount?.toString()} color={'#005eb8'} targetRoute="/iro/" />
        </Grid>
      } />
    </Grid >

  );
};

export default MinimalModuleDataAnalytics;

