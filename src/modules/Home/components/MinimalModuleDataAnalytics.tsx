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
  const [divisionsCountit, setDivisionsCountit] = useState<any | null>(null);
  const [curDivision, setCurDivision] = useState<string | null>(null);
  const [subDivisionsCount, setSubDivisionsCount] = useState<string | null>(null);
  const [subDivisionsCountit, setSubDivisionsCountit] = useState<string | null>(null);
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
    DivisionsServices.getCountIT()
      .then((res) => {
        setDivisionsCountit(res.data.filter((res:Division)=>res.details.isIT ==true).length);
        // Get Sub-divisions count
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setDivisionsCountit('Unable to load!');
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
    DivisionsServices.getSubDivisionsCountIt()
      .then((res) => {
        setSubDivisionsCountit(res.data.toString());
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setSubDivisionsCountit('Unable to load!');
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

    <Grid container spacing={3} >

      {(user.user as User).kind !== 'worker' ?
        <PermissionChecks permissions={['READ_ALL_DIVISIONS']} granted={
          <><Grid item xs={6} md={3} xl={4}>
            <DashBoardCard
              secondaryText='Divisions'
              count={divisionsCountit?.toString()}
              // dot={'.'}
              color={'#fff'}
              targetRoute="/divisions/"
              // icon={<NotificationsIcon color="secondary" sx={{ fontSize: 70 }} />}
              icon={<img src="/mod_icons/division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} />

          </Grid>
          </>
        } /> :
        <PermissionChecks permissions={['READ_DIVISIONS']} granted={
          <Grid item xs={6} md={3} xl={4}>

            <DashBoardCard secondaryText='Division'
              icon={<img src="/mod_icons/division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
              // count={divisionsCount?.toString()}
              dot={'.'}
              count={Number(divisionsCount) === 0 ? '1' : divisionsCount || '1'}
              color="#fff" targetRoute={`/divisions/details/${(user.user as User).division}`} />
          </Grid>
        }
        />
      }

      < PermissionChecks permissions={['READ_DIVISIONS']} granted={
        <>
          {
            (user.user as User).kind !== 'worker' ?
              <><Grid item xs={6} md={3} xl={4}>

                <DashBoardCard secondaryText='Sub-Divisions'
                  icon={<img src="/mod_icons/sub_division.png" alt="Logo"
                    style={{ width: '70px', height: '70px' }} />}
                  // dot={'.'}
                  count={subDivisionsCountit?.toString()?? '0'}
                  color={'#fff'} targetRoute="/divisions/" />

              </Grid>
              <Grid item xs={6} md={3} xl={4}>
                <DashBoardCard
                  secondaryText='Other Divisions'
                  count={((Number(divisionsCount) || 0) - (Number(divisionsCountit) || 0)).toString()}
                  // dot={'.'}
                  color={'#fff'}
                  targetRoute="/divisions/"
                  // icon={<NotificationsIcon color="secondary" sx={{ fontSize: 70 }} />}
                  icon={<img src="/mod_icons/division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />} />

              </Grid>
              <Grid item xs={6} md={3} xl={4}>

                <DashBoardCard secondaryText='Other Sub-Divisions'
                  icon={<img src="/mod_icons/sub_division.png" alt="Logo"
                    style={{ width: '70px', height: '70px' }} />}
                  // dot={'.'}
                  count={((Number(subDivisionsCount) || 0) - (Number(subDivisionsCountit) || 0)).toString()}
                  color={'#fff'} targetRoute="/divisions/" />

              </Grid></> :
              <Grid item xs={6} md={3} xl={4}>
                <DashBoardCard secondaryText='Sub-Divisions' icon={<img src="/mod_icons/sub_division.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
                  // count={subDivisionsCount?.toString()}
                  dot={'.'}
                  color="#fff" targetRoute={`/divisions/details/${(user.user as User).division}`} />
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
              secondaryText=" Staffs" count={staffsCount?.toString()} color={'#fff'} targetRoute="/hr/" />
          </Grid>} />
          <PermissionChecks permissions={['READ_WORKERS']} granted={<Grid item xs={6} md={3} xl={4}>
            <DashBoardCard icon={<img src="/mod_icons/workers.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
              secondaryText=" Associates" count={workersCount?.toString()} color={'#fff'} targetRoute="/workers/" />
          </Grid>} />
        </>
      }
      <PermissionChecks permissions={['READ_FR']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/mod_icons/fr.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="FR" count={frCount?.toString()} color={'#fff'} targetRoute="/fr/" />
        </Grid>
      } />
      <PermissionChecks permissions={['READ_IRO']} granted={
        <Grid item xs={6} md={3} xl={4}>
          <DashBoardCard icon={<img src="/mod_icons/IRO.png" alt="Logo" style={{ width: '70px', height: '70px' }} />}
            secondaryText="IRO" count={iroCount?.toString()} color={'#fff'} targetRoute="/iro/" />
        </Grid>
      } />
    </Grid >

  );
};

export default MinimalModuleDataAnalytics;

