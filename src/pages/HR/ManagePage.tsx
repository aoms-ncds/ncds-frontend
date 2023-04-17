import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,

} from '@mui/icons-material';

const HRManagePage = () => {
  const [staffs, setStaffs] = useState<Staff[]>();
  useEffect(() => {
    HRServices.getStaffs()
      .then((res) => {
        console.log(res);
        setStaffs(res.data);
      })
      .catch((res) => {
        console.log(res);
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
              to: '/edit' + props.row._id,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'id', width: 70 },
    { field: 'Name', headerName: 'Name', width: 70 },
    { field: 'DOB_DOJ', headerName: 'DOB, DOJ', width: 130 },
    { field: 'Designation', headerName: 'Designation', width: 130 },
    { field: 'Department', headerName: 'Department', width: 130 },
    { field: 'Phone_email', headerName: 'Phone & email', width: 130 },
    { field: 'Spouse_of_another_employee', headerName: 'Spouse_of_another_employee', width: 130 },
    { field: 'ID_format', headerName: 'ID_format', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        // onClick={() => {
        // }}
      >
          Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={staffs??[]} columns={columns} getRowId={(row) => row._id}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
