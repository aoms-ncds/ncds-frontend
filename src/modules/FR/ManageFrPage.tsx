import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
const ManageFrPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [FRRequests, setFRRequests] = useState<Frrequest[]|null>(null);

  useEffect(() => {
    setLoadCount((count) => count+1);
    FRServices.getAll()
   .then((res) => {
     setLoadCount((count) => count-1);
     console.log(res);
     setFRRequests(res.data);
   })
  .catch((res) => {
    setLoadCount((count) => count-1);
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
          id='FR action'
          primaryText='Actions'
          key={'FR action'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              to: '/fr/view_FR/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'sendbackDivision',
              text: 'Send Back to Division',
              component: Link,
              to: '/sendbackDivision' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'remarks',
              text: 'Remarks',
              component: Link,
              to: '/fr/view_FR/' + props.row._id,
              icon: EditIcon,
            },
            {
              id: 'print',
              text: 'Print FR',
              component: Link,
              to: '/view' + props.row._id,
              icon: PrintIcon,
            },
            {
              id: 'notification',
              text: 'Send notification',
              component: Link,
              to: '/view' + props.row._id,
              icon: MessageIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/edit/:frID' + props.row._id,
              icon: EditIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: '/fr/view_FR/' + props.row._id,
              icon: PreviewIcon,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'FRno', headerName: 'FR No', width: 70 },
    { field: 'FRdate', headerName: 'FR Date', width: 130 },
    { field: 'divisionName', headerName: 'Division Name', width: 150 },
    { field: 'subdivisionName', headerName: 'Sub Division Name', width: 170 },
    { field: 'mainCategory', headerName: 'Main Category', width: 150 },
    { field: 'requestAmount', headerName: 'Requested Amount', width: 130 },
    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130 },
    { field: 'sanction', headerName: 'Special Sanction', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage FR' loadCount={loadCount}>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/fr/apply"
        // onClick={() => {
        // }}
      >
          Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={FRRequests??[]} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ManageFrPage;
