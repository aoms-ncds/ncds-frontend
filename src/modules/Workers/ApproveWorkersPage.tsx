import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
const ApproveWorkerPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<BasicDetails[]|null>(null);
  const approveWorker = (id: string) => {
    WorkerServices.approveWorker(id)
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
