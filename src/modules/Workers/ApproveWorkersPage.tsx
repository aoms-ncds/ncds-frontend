import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useLoader } from '../../hooks/Loader';
const ApproveWorkerPage = () => {
  const loader = useLoader();
  const [WorkerRequests, setWorkerRequests] = useState<IETWorker[]|null>(null);
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
    loader.onLoad();
    WorkerServices.getAll()
   .then((res) => {
     loader.afterLoad();
     console.log(res);
     setWorkerRequests(res.data);
   })
  .catch((res) => {
    loader.afterLoad();
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
