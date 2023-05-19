import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, Link, TextField } from '@mui/material';
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

  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="attendance action"
          primaryText="Actions"
          key={'attendance action'}
          items={[
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              icon: EditIcon,
              onClick: () => {
                // TODO: Implement
              },
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                const snackbarId = enqueueSnackbar({
                  message: 'Removing staff',
                  variant: 'info',
                });
                HRServices.markAsRemove(props.row._id)
                  .then((res) => {
                    if (staffs) {
                      const newDepartment = staffs.filter((staffs) => {
                        return staffs._id !== props.row._id;
                      });
                      setStaffs(newDepartment);
                    }
                    closeSnackbar(snackbarId);
                    enqueueSnackbar({
                      message: res.message,
                      variant: 'success',
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    closeSnackbar(snackbarId);
                    enqueueSnackbar({
                      message: err.message,
                      variant: 'error',
                    });
                  });
              },
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'dob', headerName: 'DOB', width: 130 },
    { field: 'doj', headerName: 'DOJ', width: 130 },
    { field: 'designation', headerName: 'Designation', renderCell: (props: any) => (
      <p> {props.row.designation?.name}</p>
    ), width: 130 },
    { field: 'department', headerName: 'Department', renderCell: (props: any) => (
      <p> {props.row.department?.name}</p>
    ), width: 130 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'spouse', headerName: 'Spouse of another employee', width: 130 },
    { field: 'idFormat', headerName: 'ID Format', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          // TODO: Implement
        }}
      >
          Add new
      </Button>
      <br/><br/>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={staffs??[]} columns={columns} getRowId={(row) => row._id} loading={staffs === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
