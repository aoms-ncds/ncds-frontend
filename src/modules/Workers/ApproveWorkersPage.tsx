import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import WorkersServices from './extras/WorkersServices';


const ApproveWorkerPage = () => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  const approveWorker = (id: string) => {
    WorkersServices.approve(id)
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
    WorkersServices.reject(id)
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
  const assignRemark = (id: string) => {
    console.log('setremark', id);
    toggleOpenRemarks(true);
    setSelectedUser(id);
    console.log({ selectedUser });
    WorkersServices.getAllRemarksById(id)
                  .then((res) => setRemarks(res.data??[]))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
  };

  useEffect(() => {
    WorkersServices.getAll({ status: UserLifeCycleStates.CREATED })
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
      renderCell: (props) => (
        <Button component={Link} to={`/users/worker/${props.row._id}`} variant="contained">
          View
        </Button>
      ),
    },
    {
      field: 'remark',
      headerName: 'Remark',
      width: 130,
      renderCell: (props) => (
        <Button
          variant="contained"
          color="info"
          type="submit"
          onClick={() => {
            assignRemark(props.row._id);
          }}
        >
          Remark
        </Button>
      ),
    },
    {
      field: 'Approve',
      headerName: 'Approve',
      width: 130,
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
      headerName: 'Reject',
      width: 130,
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
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            // eslint-disable-next-line max-len
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
          )):'No Data Found '}
        </DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (remark.remark) {
              WorkersServices.addRemarks(remark)
        .then((res) => {
          const x = [...remarks, res.data];
          console.log('user ', x);

          setRemarks((remarks) => [...remarks, res.data]);
          setRemark((remark) => ({
            ...remark,
            remark: '',
          }));
        })
        .catch((error) => {
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          });
        });
            }
          }}
        >
          <DialogActions>
            <TextField
              id="remarkTextfield"
              placeholder="Remarks"
              multiline
              value={remark?.remark}
              onChange={(e) =>
                setRemark((remark) => ({
                  ...remark,
                  user: selectedUser??'',
                  remark: e.target.value,
                }))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type='submit'
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => {
                toggleOpenRemarks(false);
                setSelectedUser(null);
              }}
              sx={{ mx: '1rem', py: 1.7 }}
            >
            close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ApproveWorkerPage;
