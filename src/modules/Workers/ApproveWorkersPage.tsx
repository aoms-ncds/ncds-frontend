import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserServices from '../User/extras/UserServices';

const ApproveWorkerPage = () => {
  const [WorkerRequests, setWorkerRequests] = useState<User[]|null>(null);
  const approveWorker = (id: string) => {
    WorkerServices.approve(id)
      .then((res) => {
        if (WorkerRequests) {
          const newWorkers = WorkerRequests.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkerRequests(newWorkers);
        }
        enqueueSnackbar({
          message: 'Approved',
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  useEffect(() => {
    UserServices.getAll()
   .then((res) => {
     console.log(res);
     setWorkerRequests(res.data);
   })
  .catch((res) => {
    console.log(res);
  });
  }, []);
  const columns = [
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 70 },
    { field: 'secondName', headerName: 'Last Name:', width: 130 },
    { field: 'view', headerName: 'View', width: 130, renderCell: (props: any) => (
      <Button
        component={Link}
        to={`/workers/profile/${props.row._id}`}
        variant="contained"
      >
          View
      </Button>
    ) },
    { field: 'Approve', headerName: 'Approve', width: 130, renderCell: (props: any) => (
      <Button
        variant='contained'
        color='success'
        type="submit"
        onClick={() => {
          approveWorker(props.row._id);
        } }
      >
            Approve
      </Button>
    ) },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'division', headerName: 'Division', width: 130 },

  ];
  return (
    <CommonPageLayout title='New Workers for Approval'>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={WorkerRequests??[]} columns={columns} getRowId={(row) => row._id} loading={WorkerRequests === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApproveWorkerPage;
