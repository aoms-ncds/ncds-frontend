import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import WorkersServices from '../../Workers/extras/WorkersServices';
import FRServices from '../../FR/extras/FRServices';
import IROServices from '../../IRO/extras/IROServices';
import StaffServices from '../../HR/extras/StaffServices';
import FRCountCard from '../../FR/components/FRCountCard';

const MinimalModuleDataAnalytics = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [divisionsCount, setDivisionsCount] = useState<string | null>(null);
  const [staffsCount, setStaffsCount] = useState<string | null>(null);
  const [workersCount, setWorkersCount] = useState<string | null>(null);
  const [frCount, setFrCount] = useState<string | null>(null);
  const [iroCount, setIroCount] = useState<string | null>(null);

  useEffect(() => {
    // Get divisions count
    DivisionsServices.getCount()
      .then((res) => {
        setDivisionsCount(res.data.toString());
        console.log(res);
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setDivisionsCount('Unable to load!');
      });

    // Get staffs count
    StaffServices.getCount()
      .then((res) => {
        setStaffsCount(res.data.toString());
        console.log(res);
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setStaffsCount('Unable to load!');
      });

    // Get workers count
    WorkersServices.getCount()
      .then((res) => {
        setWorkersCount(res.data.toString());
        console.log(res);
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setWorkersCount('Unable to load!');
      });

    // Get FR count
    FRServices.getCount()
      .then((res) => {
        setFrCount(res.data.toString());
        console.log(res);
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setFrCount('Unable to load!');
      });

    // Get IRO count
    IROServices.getCount()
      .then((res) => {
        setIroCount(res.data.toString());
        console.log(res);
      })
      .catch((error) => {
        setErrors((errors) => [...errors, error.message]);
        setIroCount('Unable to load!');
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3} xl={4}>
        <FRCountCard secondaryText='Divisions' count={divisionsCount?.toString()} color="#003049" targetRoute="/divisions/"/>
      </Grid>
      <Grid item xs={6} md={3} xl={4}>
        <FRCountCard secondaryText=" Staffs" count={staffsCount?.toString()} color="#de2828" targetRoute="/hr/"/>
      </Grid>
      <Grid item xs={6} md={3} xl={4}>
        <FRCountCard secondaryText=" Workers" count={workersCount?.toString()} color="#f77f00" targetRoute="/workers/"/>
      </Grid>
      <Grid item xs={6} md={3} xl={4}>
        <FRCountCard secondaryText="FR" count={frCount?.toString()} color="#fcbf49" targetRoute="/fr/"/>
      </Grid>
      <Grid item xs={6} md={3} xl={4}>
        <FRCountCard secondaryText="IRO" count={iroCount?.toString()} color="#3cb043" targetRoute="/iro/"/>
      </Grid>
    </Grid>
  );
};

export default MinimalModuleDataAnalytics;
