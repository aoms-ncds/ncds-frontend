/* eslint-disable react/jsx-key */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../../components/GridLinkAction';
import { hasPermissions } from '../../User/components/PermissionChecks';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import {
  Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, NoAccounts as NoAccountsIcon, Person as PersonIcon, Ballot as BallotIcon, Work, Handshake,
  History as HistoryIcon,
} from '@mui/icons-material';
import StaffServices from '../../HR/extras/StaffServices';
import EditNoteIcon from '@mui/icons-material/EditNote';
import WorkersServices from '../extras/WorkersServices';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageItem from '../../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import ReasonforDeactivationService from '../../Settings/extras/ReasonforDeactivationService';
import CloseIcon from '@mui/icons-material/Close';
import UserServices from '../../User/extras/UserServices';
import UsersLogDialog from '../../User/components/UsersLogDialog';

interface UserCardProps {
  user: IWorker;
  reason: IReason[];
  removeUser: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, reason, removeUser }) => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deactivateModel, setDeactivateModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [rowID, setRowID] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  // const [reason, setReason] = useState<IReason[]>([]);
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [reasonDialog, setReasonDialog] = useState(false);
  const [logOpen, setLogOpen] = useState<string | null>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    // ReasonforDeactivationService.getAll().then((res) => {
    //   setReason(res.data);
    // });
  }, []);
  const assignRemark = (id: string) => {
    toggleOpenRemarks(true);
    setSelectedUser(id);

    WorkersServices.getAllRemarksById(id)
      .then((res) => setRemarks(res.data ?? []))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  };

  const activateWorker = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Activating Worker',
      variant: 'info',
    });
    WorkersServices.activate(id)
      .then((res) => {
        if (res.success) {
          window.location.reload();
          //   const newWorkerRequests = user.value.filter((workerRequests: { _id: string; }) => workerRequests._id !== id);
          //   user.onChange(newWorkerRequests);
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const deactivateWorker = (id: string, reason: any) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Worker',
      variant: 'info',
    });
    WorkersServices.deactivate(id, reason)
      .then((res) => {
        console.log(reason);
        window.location.reload();
        // if (props.value) {
        //   const newWorkerRequests = props.value.filter((workerRequests) => workerRequests._id !== id);
        //   props.onChange(newWorkerRequests);
        // }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const handleView = () => {
    // navigate(`/users/worker/${user._id}`);
    // onClick={() => {
    window.open(`/users/worker/${user._id}`);
    // }}
  };
  console.log(user, 'jfdks');

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader avatar={<Avatar alt={user.basicDetails.firstName} src={user.imageURL?.replace('uc', 'thumbnail')} />} title={user.basicDetails.firstName + ' ' + user.basicDetails.lastName} />
        <CardContent>
          <Typography variant="body2" color="black">
            Email: {user.basicDetails.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Worker Code: {user.workerCode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Division: {user.division?.details.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
  Sub-Division: {
              user.officialDetails.divisionHistory?.length ?
                user.officialDetails.divisionHistory[
          user.officialDetails.divisionHistory.length - 1
                ]?.subDivision?.name :
                ''
            }
          </Typography>
        </CardContent>
        <Grid container spacing={2}>
          <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} sx={{ marginLeft: '85%' }}>
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {[
              <MenuItem onClick={handleView}>View</MenuItem>,
              hasPermissions(['MANAGE_WORKER']) && (
                <MenuItem
                  onClick={() => {
                    window.open(`/workers/edit/${user._id}`);
                  }}
                >
                  Edit
                </MenuItem>
              ),
              hasPermissions(['ADMIN_ACCESS']) && (
                <MenuItem
                  onClick={() => {
                    // WorkersServices.delete(user._id)
                    //   .then((res) => {
                    //     removeUser(user._id);
                    //     enqueueSnackbar({ message: res.message, variant: 'success' });
                    //   })
                    //   .catch((err) => {
                    //     enqueueSnackbar({ message: err.message, variant: 'error' });
                    //   });
                    setDeleteModel(true);
                  }}
                >
                  Delete
                </MenuItem>
              ),
              <MenuItem
                onClick={() => {
                  assignRemark(user._id);
                }}
              >
                Remarks
              </MenuItem>,
              hasPermissions(['MANAGE_WORKER']) &&
                (user.status == UserLifeCycleStates.ACTIVE ? (
                  <MenuItem
                    onClick={() => {
                      setRowID(user._id);
                      // setReasonDialog(true);
                      setDeactivateModel(true);
                    }}
                  >
                    Deactivate
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      activateWorker(user._id);
                    }}
                  >
                    Activate
                  </MenuItem>
                )),
              hasPermissions(['ADMIN_ACCESS']) && (
                <MenuItem
                  onClick={() => {
                    // navigate(`/users/${user._id}/permission_manager`);
                    // onClick={() => {
                    window.open(`/users/${user._id}/permission_manager`);
                    // }}
                  }}
                >Permission Manager</MenuItem>
              ),

              hasPermissions(['ADMIN_ACCESS']) && (
                <MenuItem
                  onClick={() => {
                    setLogOpen(user._id);
                  }}
                >Log</MenuItem>
              ),
              false,
            ].filter((action) => action !== false)}
          </Menu>
        </Grid>
      </Card>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ?
            remarks.map((remark) => (
              // eslint-disable-next-line max-len
              <MessageItem
                key={remark._id}
                sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName}
                time={remark.updatedAt}
                body={remark.remark}
                isSent={true}
              />
            )) :
            'No Data Found '}
        </DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (remark.remark) {
              WorkersServices.addRemarks(remark)
                .then((res) => {
                  const x = [...remarks, res.data];

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
                  user: selectedUser ?? '',
                  remark: e.target.value,
                }))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
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
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>Reason</DialogTitle>

        <DialogContent>
          <br />

          <Autocomplete<IReason|any>
            options={reason ?? []}
            value={reasonForDeactivation}
            getOptionLabel={(option) => option?.reason ?? ''}
            onChange={(_, selectedReason) => {
              setReasonForDeactivation(selectedReason);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Reason for Deactivation"
                required
              />
            )}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              if (reasonForDeactivation) {
                deactivateWorker(rowID, reasonForDeactivation);
              }
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
        {/* <DialogContent>
          <Typography sx={{ color: 'red' }}>Are you sure you want to delete this User?</Typography>
        </DialogContent> */}
        <DialogContent>
          <Typography sx={{ color: 'red' }}>If this Worker is a coordinator, please change the coordinator in the division before deleting</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteModel(false)}>Close</Button>
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              WorkersServices.delete(user._id)
                .then((res) => {
                  removeUser(user._id);
                  enqueueSnackbar({ message: res.message, variant: 'success' });
                  setDeleteModel(false);
                })
                .catch((err) => {
                  enqueueSnackbar({ message: err.message, variant: 'error' });
                });
            }}
          >
                 Delete
          </Button>
        </DialogActions>

      </Dialog>;
      <Dialog open={Boolean(deactivateModel)} onClose={() => setDeactivateModel(false)}>
        {/* <DialogContent>
          <Typography sx={{ color: 'red' }}>Are you sure you want to delete this User?</Typography>
        </DialogContent> */}
        <DialogContent>
          <Typography sx={{ color: 'red' }}>If this Worker is a coordinator, please change the coordinator in the division before deactivating</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setDeactivateModel(false)}>Close</Button>
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              setReasonDialog(true);
            } }
          >
                 Deactivate
          </Button>
        </DialogActions>

      </Dialog>;
      {logOpen && <UsersLogDialog open={Boolean(logOpen)} onClose={() => setLogOpen(null)} userId={logOpen} key={user._id} />}
    </>
  );
};

interface UserListProps {
  users: IWorker[];
  reason: IReason[];
  onScroll: () => void; // Define onScroll function prop
  deleteUser: (id: string) => void;
}

// eslint-disable-next-line react/no-multi-comp
const WorkerList: React.FC<UserListProps> = ({ users, reason, onScroll, deleteUser }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    console.log('hi therw');
    if (!listRef.current) return;
    console.log('eeeeee');
    // const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    // useEffect(()=>{
    //   setReason(reason);
    // });
    // Calculate the threshold, e.g., 100 pixels from the bottom
    const threshold = 100;
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      console.log('bottom reached');
      onScroll(); // Call the onScroll function when reaching the bottom of the list
    }
  }, [onScroll]);

  // Attach scroll event listener when component mounts
  React.useEffect(() => {
    const element = listRef.current;
    if (!element) {
      return () => {}; //  consistent return
    }

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const callDelete = (userId: string) => {
    deleteUser(userId);
  };


  return (
    <><Grid container spacing={2} ref={listRef} style={{ maxHeight: '550px', overflowY: 'auto' }}>
      {users.map((user) => (
        <Grid item key={user._id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} reason={reason} key={user._id} removeUser={callDelete} />
        </Grid>
      ))}
    </Grid>
    </>

  );
};

export default WorkerList;
