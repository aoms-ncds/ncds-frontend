import { Link } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
  Add as AddIcon,

} from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Applications from '.';
import ApplicationServices from './extras/ApplicationServices';

const ApplicationManagePages = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [applications, setApplications] = useState<Applications[]|null>(null);
  useEffect(() => {
    setLoadCount((count) => count + 1);
    ApplicationServices.getAll()
      .then((res) =>{
        setLoadCount((count) => count - 1);
        console.log(res);
        setApplications(res.data);
      })
      .catch((res: any) => {
        setLoadCount((count) => count - 1);
        console.log(res);
      });
  }, []);
  const columns = [
    {
      field: '_manage',
      headerName: 'action',
      minwidth: 50,
      type: 'strig',
      rendercell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id='Application action'
          primaryText='Actions'
          key={'Application action'}
          items={[
            {
              id: 'view',
              text: 'View ',
              component: Link,
              to: '/application/view_applicaton/' + props.row_id,
              icon: PreviewIcon,
            },
            {
              id: 'Approve',
              text: 'Approve',
              component: Link,
              to: '/application/view_applicaton/' + props.row_id,
              icon: PreviewIcon,
            },
            {
              id: 'Reject',
              text: 'Reject',
              component: Link,
              to: '/application/view_applicaton/' + props.row_id,
              icon: PreviewIcon,
            },
          ]}
        />

      ),
    },
    { field: '_id', headerName: 'SI NO', width: 70 },
    { field: 'Name', headerName: 'Name', width: 70 },
    { field: 'reason', headerName: 'Reason', width: 70 },
    { field: 'status', headerName: 'Status', width: 70 },
  ];
  return (
    <CommonPageLayout title='Manage Workers' loadCount={loadCount}>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/Worker/apply"
      // onClick={() => {
      // }}
      >
        Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={applications??[]} columns={columns} getRowId={(row) => row._id} loading={Applications=== null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApplicationManagePages;
