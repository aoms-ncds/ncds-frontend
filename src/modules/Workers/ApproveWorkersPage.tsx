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
      .then(() => {
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
      .then(() => {
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
    { field: 'workerCode', width: 170, renderHeader: () => (<b>{'Worker Code'}</b>),
    },
    {
      field: 'firstName',
      width: 130,
      renderHeader: () => (<b>First Name</b>),
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      field: 'lastName',
      width: 130,
      renderHeader: () => (<b>Last Name</b>
      ),
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'view',
      width: 130,
      renderHeader: () => (<b>View</b>),
      renderCell: (props) => (
        <Button component={Link} to={`/users/worker/${props.row._id}`} variant="contained">
          View
        </Button>
      ),
    },
    {
      field: 'Approve',
      width: 130,
      renderHeader: () => (<b>Approve</b>),
      renderCell: (props) => (
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
      width: 130,
      renderHeader: () => (<b>Reject</b>),
      renderCell: (props) => (
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
    { field: 'phone', width: 130, renderHeader: () => ( <b>Phone</b>),
    },
    { field: 'division', width: 130, renderHeader: () => ( <b>Division</b>) },
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
