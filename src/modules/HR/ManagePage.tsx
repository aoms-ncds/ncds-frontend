import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import UserServices from '../User/extras/UserServices';
import { Link } from 'react-router-dom';
import UsersList from '../Workers/components/UsersList';


const HRManagePage = () => {
  const [staffs, setStaffs] = useState<User[] | null>(null);


  useEffect(() => {
    UserServices.getAll().then((staffsRes) => {
      setStaffs(staffsRes.data);
    })
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
          <UsersList />

        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
