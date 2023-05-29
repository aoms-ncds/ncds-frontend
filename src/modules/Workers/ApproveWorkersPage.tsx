import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';

const ApproveWorkerPage = () => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);

  const approveWorker = (id: string) => {
    WorkerServices.approve(id)
      .then((res) => {
        if (workers) {
          const newWorkers = workers.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkers(newWorkers);
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

  const rejectWorker = (id: string) => {
    WorkerServices.reject(id)
      .then((res) => {
        if (workers) {
          const newWorkers = workers.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkers(newWorkers);
        }
        enqueueSnackbar({
          message: 'Rejected',
          variant: 'warning',
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
    WorkerServices.getAll({ status: UserLifeCycleStates.CREATED })
      .then((res) => {
        console.log(res);
        setWorkers(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns: GridColDef<IWorker>[] = [
    { field: 'workerCode', headerName: 'Worker Code', width: 170 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 70,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      field: 'lastName',
      headerName: 'Last Name:',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'view',
      headerName: 'View',
      width: 130,
      renderCell: (props: any) => (
        <Button component={Link} to={`/users/worker/${props.row._id}`} variant="contained">
          View
        </Button>
      ),
    },
    {
      field: 'Approve',
      headerName: 'Approve',
      width: 130,
      renderCell: (props: any) => (
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={() => {
            approveWorker(props.row._id);
          }}
        >
          Approve
        </Button>
      ),
    },
    {
      field: 'Reject',
      headerName: 'Reject',
      width: 130,
      renderCell: (props: any) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            rejectWorker(props.row._id);
          }}
        >
          Reject
        </Button>
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'division', headerName: 'Division', width: 130 },
  ];
  return (
    <CommonPageLayout title="New Workers for Approval">
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={workers ?? []} columns={columns} getRowId={(row) => row._id} loading={workers === null} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApproveWorkerPage;
