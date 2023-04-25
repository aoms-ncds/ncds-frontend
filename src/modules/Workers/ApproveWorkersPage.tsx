import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Preview as PreviewIcon,

} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
const ApproveWorkerPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<BasicDetails[]|null>(null);

  useEffect(() => {
    setLoadCount((count) => count+1);
    WorkerServices.getAll()
   .then((res) => {
     setLoadCount((count) => count-1);
     console.log(res);
     setWorkerRequests(res.data);
   })
  .catch((res) => {
    setLoadCount((count) => count-1);
    console.log(res);
  });
  }, []);
  const columns = [
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 70 },
    { field: 'secondName', headerName: 'Second Name', width: 130 },
    { field: 'view', headerName: 'View', width: 130, renderCell: (props: any) => (
      <Button
        component={Link}
        to={`/attendance/view_attendance/${props.row._id}`}
        variant="contained"
      >
          View
      </Button>
    ) },
    { field: 'Approve', headerName: 'Approve', width: 130, renderCell: (props: any) => (
      <Button
        component={Link}
        to={`/attendance/view_attendance/${props.row._id}`}
        variant='contained'
        color='success'
      >
            Approve
      </Button>
    ) },
    { field: 'mobileNumber', headerName: 'Phone', width: 130 },
    { field: 'division', headerName: 'Division', width: 130 },

  ];
  return (
    <CommonPageLayout title='New Workers for Approval ' loadCount={loadCount}>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={WorkerRequests??[]} columns={columns} getRowId={(row) => row._id} loading={WorkerRequests === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApproveWorkerPage;
