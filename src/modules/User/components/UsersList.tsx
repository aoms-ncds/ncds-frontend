import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, NoAccounts as NoAccountsIcon, Person as PersonIcon, Ballot as BallotIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import StaffServices from '../../HR/extras/StaffServices';
import UserLifeCycleStates from '../extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';
import GridLinkAction from '../../../components/GridLinkAction';
import { hasPermissions } from './PermissionChecks';
import moment from 'moment';
import { useState } from 'react';
import MessageItem from '../../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import EditNoteIcon from '@mui/icons-material/EditNote';


const UsersList = <StaffOrWorker extends User>(props: FormComponentProps<StaffOrWorker[], { kind: UserKind;status?:'reject'|'active' }>) => {
  const StaffOrWorkerServices = props.options?.kind === 'staff' ? StaffServices : WorkersServices;

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });


  const execDelete = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: `Removing ${props.options?.kind}`,
      variant: 'info',
    });

    StaffOrWorkerServices.delete(id)
      .then((res) => {
        if (props.value) {
          props.onChange(props.value.filter((user) => user._id !== id));
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({ message: res.message, variant: 'success' });
      })
      .catch((err) => {
        closeSnackbar(snackbarId);
        enqueueSnackbar({ message: err.message, variant: 'error' });
      });
  };

  const deactivateWorker = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Worker',
      variant: 'info',
    });
    StaffOrWorkerServices.deactivate(id)
      .then((res) => {
        if (props.value) {
          const newWorkerRequests = props.value.filter((workerRequests) => workerRequests._id !== id);
          props.onChange(newWorkerRequests);
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
  const activateWorker = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Activating Worker',
      variant: 'info',
    });
    StaffOrWorkerServices.activate(id)
      .then((res) => {
        if (props.value) {
          const newWorkerRequests = props.value.filter((workerRequests) => workerRequests._id !== id);
          props.onChange(newWorkerRequests);
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
  const assignRemark = (id: string) => {
    toggleOpenRemarks(true);
    setSelectedUser(id);

    WorkersServices.getAllRemarksById(id)
                  .then((res) => setRemarks(res.data??[]))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
  };

  // const x = hasPermissions(['READ_ACCESS']) && [
  //   <GridLinkAction
  //     key={5}
  //     label="Manage Permissions"
  //     icon={<BallotIcon />}
  //     showInMenu
  //     to={`/users/${params.row._id}/permission_manager`}
  //   />,
  // ];
  const columns: GridColDef<StaffOrWorker>[] = [

    {
      field: 'actions',
      type: 'actions',
      width: 5,

      // renderCell: (renderCellParams) => (
      //   <DropdownButton
      //     useIconButton={true}
      //     id="user action"
      //     primaryText="Actions"
      //     key={'User action'}
      //     items={[
      //       {
      //         id: 'View',
      //         text: 'View',
      //         component: Link,
      //         to: `/users/${props.options?.kind}/${renderCellParams.row._id}`,
      //         icon: PreviewIcon,
      //       },
      //       {
      //         id: 'edit',
      //         text: 'Edit',
      //         component: Link,
      //         to: `/${props.options?.kind == 'worker' ? 'workers' : 'hr'}/edit/${renderCellParams.row._id}`,
      //         icon: EditIcon,
      //       },
      //       {
      //         id: 'delete',
      //         text: 'Delete',
      //         component: Link,
      //         icon: DeleteIcon,
      //         onClick: () => {
      //           execDelete(renderCellParams.row._id);
      //         },
      //       },
      //       renderCellParams.row.status == UserLifeCycleStates.ACTIVE ?
      //         {
      //           id: 'deactivate',
      //           text: 'Deactivate',
      //           component: Link,
      //           icon: NoAccountsIcon,
      //           onClick: () => {
      //             deactivateWorker(renderCellParams.row._id);
      //           },
      //         } :
      //         {
      //           id: 'activate',
      //           text: 'Activate',
      //           component: Link,
      //           icon: PersonIcon,
      //           onClick: () => {
      //             activateWorker(renderCellParams.row._id);
      //           },
      //         },
      //       {
      //         id: 'permission_manager',
      //         text: 'Manage Permissions',
      //         component: Link,
      //         to: `/users/${renderCellParams.row._id}/permission_manager`,
      //         icon: BallotIcon,
      //       },
      //     ]}
      //   />
      // ),
      getActions: (params: GridRowParams) => (
        [
          <GridLinkAction
            key={1}
            label="View"
            icon={<PreviewIcon />}
            showInMenu
            to={`/users/${props.options?.kind}/${params.row._id}`}
          />,
          <GridLinkAction
            key={2}
            label="Edit"
            icon={<EditIcon />}
            showInMenu
            to={`/${props.options?.kind == 'worker' ? 'workers' : 'hr'}/edit/${params.row._id}`}
          />,
          <GridLinkAction
            key={3}
            label="Delete"
            icon={<DeleteIcon />}
            showInMenu
            onClick={() => {
              execDelete(params.row._id);
            }}
          />,
          <GridLinkAction
            key={4}
            label="Remarks"
            icon={<EditNoteIcon />}
            showInMenu
            onClick={() => {
              assignRemark(params.row._id);
            }}
          />,
          (props.options?.status != 'reject' && (
            (params.row.status == UserLifeCycleStates.ACTIVE ? (
              <GridLinkAction
                key={5}
                label="Deactivate"
                icon={<NoAccountsIcon />}
                showInMenu
                onClick={() => {
                  deactivateWorker(params.row._id);
                }}
              />
            ) : (
              <GridLinkAction
                key={5}
                label="Activate"
                icon={<PersonIcon />}
                showInMenu
                onClick={() => {
                  activateWorker(params.row._id);
                }}
              />
            ))
          )),
          hasPermissions(['ADMIN_ACCESS']) &&
            <GridLinkAction
              key={6}
              label="Manage Permissions"
              icon={<BallotIcon />}
              showInMenu
              to={`/users/${params.row._id}/permission_manager`}
            />,
          false,
        ].filter((action) => action !== false) as JSX.Element[]
      ),

    },
    {
      field: 'imageURL',
      headerName: '',
      width: 25,
      minWidth: 65,
      type: 'string',
      renderCell: (props) => {
        return <Avatar src={props.value} />;
      },
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    { field: `${props.options?.kind}Code`,
      headerName: `${props.options?.kind == 'staff'?'Staff':'Worker'} Code`,
      width: 120,
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {`${props.options?.kind == 'staff'?'Staff':'Worker'} Code`}
        </b>
      ) },
    {
      field: 'firstName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'First Name'}
        </b>
      ),
      valueGetter: (params) => params.row.basicDetails.firstName,

    },
    {
      field: 'lastName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'Last Name'}
        </b>
      ),
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'division',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'Division'}
        </b>
      ),
      valueGetter: (params) => params.row.division?.details.name,
    },
    {
      field: 'sub_division',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'Sub-Division'}
        </b>
      ),
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails.divisionHistory.length-1].subDivision?.name,
    },
    //
    //   field: 'highestQualification',
    //   headerName: 'Highest Qualification',
    //   width: 160,
    //   valueGetter: (params) => params.row.basicDetails.highestQualification,
    // },
    // {
    //   field: 'motherTongue',
    //   headerName: 'Mother Tongue',
    //   width: 130,
    //   valueGetter: (params) => params.row.basicDetails.motherTongue,
    // },
    // {
    //   field: 'communicationLanguage',
    //   headerName: 'Communication Language',
    //   width: 185,
    //   valueGetter: (params) => params.row.basicDetails.communicationLanguage,
    // },
    // {
    //   field: 'languagesKnown',
    //   headerName: 'Languages Known',
    //   width: 140,
    //   valueGetter: (params) => params.row.basicDetails.knownLanguages?.join(', '),
    // },
    {
      field: 'designation',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'Designation'}
        </b>
      ),
      valueGetter: (params) => params.row.supportDetails?.designation?.name,
    },
    {
      field: 'phone',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (
        <b>
          {'Mobile Number'}
        </b>
      ),
      valueGetter: (params) => params.row.basicDetails.phone,
    },
    // {
    //   field: 'alternativeMobileNumber',
    //   width: 220,
    //   align: 'center',
    //   renderHeader: () => (
    //     <b>
    //       {'Alternative Mobile Number'}
    //     </b>
    //   ),
    //   valueGetter: (params) => params.row.basicDetails.alternativePhone,
    // },
    {
      field: 'email',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <b>
          {'Email Id'}
        </b>
      ),
      valueGetter: (params) => params.row.basicDetails.email,
    },
    // {
    //   field: 'PANnumber',
    //   headerName: 'PAN Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.PANNo,
    // },
    // {
    //   field: 'aadhaarNumber',
    //   headerName: 'Aadhaar Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.aadhaar?.aadhaarNo,
    // },
    // {
    //   field: 'voterId',
    //   headerName: 'Voter Id',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.voterId?.voterIdNo,
    // },
    // {
    //   field: 'licenseNumber',
    //   headerName: 'License Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.licenseNumber,
    // },
  ];
  return (
    <>
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '66vh', width: '100%' }}>
          <DataGrid
            rows={props.value ?? []}
            columns={columns}
            getRowId={(row) => row._id}
            loading={props.value === null}
          />
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
    </>
  );
};

export default UsersList;
