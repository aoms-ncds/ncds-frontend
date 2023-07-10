import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UsersList from '../User/components/UsersList';
import StaffServices from './extras/StaffServices';
import PermissionChecks from '../User/components/PermissionChecks';

const HRManagePage = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    StaffServices.getAll()
      .then((staffsRes) => setStaffs(staffsRes.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CommonPageLayout title="Manage Staff">
      <Grid item xs={12} md={12}>
        <Card style={{ height: '69vh', width: '100%' }}>
          <Grid item xs={12} lg={3} sx={{ px: 5, py: 2 }}>
            <PermissionChecks
              permissions={['WRITE_STAFFS']}
              granted={(
                <Button variant="contained" sx={{ float: 'right', marginBottom: 3 }} startIcon={<AddIcon />} component={Link} to="/hr/add">
            Add new
                </Button>
              )}
            />
          </Grid>
          <UsersList<Staff> value={staffs} onChange={(newStaffs) => setStaffs(newStaffs)} action={'view'} options={{ kind: 'staff' }} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
