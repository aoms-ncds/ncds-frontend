import { Alert, AlertTitle, Card, CardContent, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import HRServices from '../../HR/extras/HRServices';
import WorkersServices from '../../Workers/extras/WorkersServices';
import FRServices from '../../FR/extras/FRServices';
import IROServices from '../../IRO/extras/IROServices';

const MinimalModuleDataAnalytics = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [divisionsCount, setDivisionsCount] = useState<string|null>(null);
  const [staffsCount, setStaffsCount] = useState<string|null>(null);
  const [workersCount, setWorkersCount] = useState<string|null>(null);
  const [frCount, setFrCount] = useState<string|null>(null);
  const [iroCount, setIroCount] = useState<string|null>(null);

  useEffect(() => {
    // Get divisions count
    DivisionsServices.getCount().then((res) => {
      setDivisionsCount(res.data.toString());
      console.log(res);
    }).catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setDivisionsCount('Unable to load!');
    });

    // Get staffs count
    HRServices.getCount().then((res) => {
      setStaffsCount(res.data.toString());
      console.log(res);
    }).catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setStaffsCount('Unable to load!');
    });

    // Get workers count
    WorkersServices.getCount().then((res) => {
      setWorkersCount(res.data.toString());
      console.log(res);
    }).catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setWorkersCount('Unable to load!');
    });

    // Get FR count
    FRServices.getCount().then((res) => {
      setFrCount(res.data.toString());
      console.log(res);
    }).catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setFrCount('Unable to load!');
    });

    // Get IRO count
    IROServices.getCount().then((res) => {
      setIroCount(res.data.toString());
      console.log(res);
    }).catch((error) => {
      setErrors((errors) => [...errors, error.message]);
      setIroCount('Unable to load!');
    });
  }, []);
  return (
    errors?.length>5 ? <Alert color='error'>
      <AlertTitle><b>Something went wrong!</b></AlertTitle>
      Unable to show analytics. <br />
      {Array.from(new Set(errors)).join(',')}
    </Alert>:
      <Card>
        {errors.length>0 &&
        <CardContent>
          <Alert color='error'>
            <AlertTitle><b>Something went wrong!</b></AlertTitle>
            {Array.from(new Set(errors)).join(',')}
          </Alert>
        </CardContent>
        }
        <List>
          <ListItemButton>
            <ListItemText primary="No. of Divisions:" />
            <Typography variant='body1'>{divisionsCount}</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="No. of staffs:" />
            <Typography variant='body1'>{staffsCount}</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="No. of workers:" />
            <Typography variant='body1'>{workersCount}</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="FR:" />
            <Typography variant='body1'>{frCount}</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="IRO:" />
            <Typography variant='body1'>{iroCount}</Typography>
          </ListItemButton>
        </List>
      </Card>
  );
};

export default MinimalModuleDataAnalytics;
