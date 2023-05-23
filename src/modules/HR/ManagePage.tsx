import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UsersList from '../User/components/UsersList';
import StaffServices from './extras/StaffServices';
import { Staff } from './extras/StaffTypes';


const HRManagePage = () => {
  const [staffs, setStaffs] = useState<Staff[] >([]);


  useEffect(() => {
    StaffServices.getAll()
    .then((staffsRes) => setStaffs(staffsRes.data))
    .catch((err) => {
      console.log(err);
    });
  }, []);


  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to='/hr/add'
      >
          Add new
      </Button>
      <br/><br/>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <UsersList<Staff>
            value={staffs}
            onChange={(newStaffs) => setStaffs(newStaffs)}
            action={'view'}
            options={{ kind: 'staff' }}
          />

        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
