import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import WorkersServices from './extras/WorkersServices';
import GridLinkAction from '../../components/GridLinkAction';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, NoAccounts as NoAccountsIcon, Person as PersonIcon, Ballot as BallotIcon } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { hasPermissions } from '../User/components/PermissionChecks';
import DivisionsServices from '../Divisions/extras/DivisionsServices';


const ApproveWorkerPage = () => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  // useEffect(() => {
  //   DivisionsServices.getDivisions()
  //     .then((res) => {
  //       console.log(res.data);
  //       setDivisions(res.data);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, []);

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
    {
      field: 'actions',
      type: 'actions',
      width: 5,
      getActions: (params: GridRowParams) => (
        [
          <GridLinkAction
            key={1}
            label="View"
            icon={<PreviewIcon />}
            showInMenu
            to={`/users/worker/${params.row._id}`}
          />,
          <GridLinkAction
            key={2}
            label="Edit"
            icon={<EditIcon />}
            showInMenu
            to={`/workers/edit/${params.row._id}`}
          />,
          <GridLinkAction
            key={3}
            label="Remark"
            icon={<EditNoteIcon />}
            showInMenu
            onClick={() => {
              assignRemark(params.row._id);
            }}
          />,
          <GridLinkAction
            key={4}
            label="Approve"
            icon={<DoneIcon />}
            showInMenu
            onClick={() => {
              approveWorker(params.row._id);
            }}
          />,
          <GridLinkAction
            key={5}
            label="Reject"
            icon={<ClearIcon />}
            showInMenu
            onClick={() => {
              rejectWorker(params.row._id);
            }}
          />,
          false,
        ].filter((action) => action !== false) as JSX.Element[]
      ),
    },
    { field: 'workerCode', width: 170, renderHeader: () => (<b>{'Worker Code'}</b>),
      align: 'center',
      headerAlign: 'center' },
    {
      field: 'firstName',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>First Name</b>),
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'lastName',
      width: 130,
      renderHeader: () => (<b>Last Name</b>
      ),
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'phone', width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => ( <b>Phone</b>),
      valueGetter: (params) => params.row.basicDetails.phone,

    },
    { field: 'division', width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => ( <b>Division</b>),
      valueGetter: (params) => params.row.division?.details.name,
    },
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
