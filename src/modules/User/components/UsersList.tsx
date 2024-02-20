import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, NoAccounts as NoAccountsIcon, Person as PersonIcon, Ballot as BallotIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Autocomplete, Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import StaffServices from '../../HR/extras/StaffServices';
import UserLifeCycleStates from '../extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';
import GridLinkAction from '../../../components/GridLinkAction';
import PermissionChecks, { hasPermissions } from './PermissionChecks';
import { SetStateAction, useEffect, useState } from 'react';
import MessageItem from '../../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import * as XLSX from 'xlsx';
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ChildrenServices from '../../Workers/extras/ChildrenServices';
import SpousesServices from '../../Workers/extras/SpousesServices';

const UsersList = <StaffOrWorker extends User>(props: FormComponentProps<StaffOrWorker[], { kind: UserKind; status?: 'reject' | 'active'; showEditButton?: boolean }>) => {
  const StaffOrWorkerServices = props.options?.kind === 'staff' ? StaffServices : WorkersServices;
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [rowID, setRowID] = useState<string>('');
  const [reasonForDeactivation, setReasonForDeactivation] = useState<string | null>('');
  const [users, setUsers] = useState<IWorker[]>([]);
  const [spouseList, setSpouseList] = useState<Spouse[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  const [currentTab, setCurrentTab] = useState(0);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };



  useEffect(() => {
    if (currentTab == 0) {
      WorkersServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 1) {
      SpousesServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (currentTab == 2) {
      ChildrenServices.getAll({ status: UserLifeCycleStates.ACTIVE })
        .then((res) => {
          setChildList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [currentTab]);
  useEffect(() => {
    StaffServices.getAll()
      .then((staffsRes) => setStaffs(staffsRes.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // useEffect(()=>{
  //   UserServices.coordinatorOrNot()
  //   .then((res)=>{
  //     setCoordinatorOrNote(res.data);
  //     console.log(res.data, 'res.data for coordinator');
  //   });
  // });

  const deactivateWorker = (id: string, reason: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Worker',
      variant: 'info',
    });
    StaffOrWorkerServices.deactivate(id, reason)
      .then((res) => {
        console.log(reason);
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
      .then((res) => setRemarks(res.data ?? []))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  };
  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (props.value ?? []).filter(row => {
    if ((row.basicDetails.firstName && row.basicDetails.firstName.toLowerCase().includes(searchText.toLowerCase())) || (row.basicDetails.lastName && row.basicDetails.lastName.toLowerCase().includes(searchText.toLowerCase()))) {
      return true;
    }
    return Object.values(row).some(value =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

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
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>{'Action'}</b>,
      width: 80,
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/users/${props.options?.kind}/${params.row._id}`} />,
          (hasPermissions(['MANAGE_WORKER']) || props?.options?.showEditButton === true) && (
            <GridLinkAction key={2} label="Edit" icon={<EditIcon />} showInMenu to={`/${props.options?.kind === 'worker' ? 'workers' : 'hr'}/edit/${params.row._id}`} />
          ),
          (hasPermissions(['ADMIN_ACCESS']) || props?.options?.showEditButton === true) && (
            <GridLinkAction
              key={2}
              label="Delete"
              icon={<DeleteIcon />}
              showInMenu
              onClick={() => {
                StaffOrWorkerServices.delete(params.row._id)
                  .then((res) => {
                    if (props.value) {
                      props.onChange(props.value.filter((user) => user._id !== params.row._id));
                    }

                    enqueueSnackbar({ message: res.message, variant: 'success' });
                  })
                  .catch((err) => {
                    enqueueSnackbar({ message: err.message, variant: 'error' });
                  });
              }}
            // to={`/${props.options?.kind === 'worker' ? 'workers' : 'hr'}/edit/${params.row._id}`}
            />
          ),
          <GridLinkAction
            key={4}
            label="Remarks"
            icon={<EditNoteIcon />}
            showInMenu
            onClick={() => {
              assignRemark(params.row._id);
            }}
          />,
          props.options?.status != 'reject' &&
          hasPermissions(['MANAGE_WORKER']) &&
          (params.row.status == UserLifeCycleStates.ACTIVE ? (
            <GridLinkAction
              key={5}
              label="Deactivate"
              icon={<NoAccountsIcon />}
              showInMenu
              onClick={() => {
                setRowID(params.row._id);
                setReasonDialog(true);
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
          )),
          hasPermissions(['ADMIN_ACCESS']) && <GridLinkAction key={6} label="Manage Permissions" icon={<BallotIcon />} showInMenu to={`/users/${params.row._id}/permission_manager`} />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    {
      field: 'imageURL',
      headerName: '',
      headerClassName: 'super-app-theme--cell',
      width: 25,
      minWidth: 65,
      type: 'string',
      renderCell: (props) => {
        return <Avatar src={props.value?.replace('uc', 'thumbnail')} />;
      },
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    {
      field: `${props.options?.kind}Code`,
      headerName: `${props.options?.kind == 'staff' ? 'Staff' : 'Worker'} Code`,
      width: 120,
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => <b>{`${props.options?.kind == 'staff' ? 'Staff' : 'Worker'} Code`}</b>,
    },
    {
      field: 'firstName',
      align: 'center',
      headerClassName: 'super-app-theme--cell',

      headerAlign: 'center',
      renderHeader: () => <b>{'First Name'}</b>,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      field: 'lastName',
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => <b>{'Last Name'}</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'division',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Division'}</b>,
      valueGetter: (params) => params.row?.division?.details?.name,
    },
    {
      field: 'sub_division',
      width: 130,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
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
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Designation'}</b>,
      valueGetter: (params) => params.row.supportDetails?.designation?.name,
    },
    {
      field: 'phone',
      width: 130,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Mobile Number'}</b>,
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
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <b>{'Email ID'}</b>,
      valueGetter: (params) => params.row.basicDetails.email,
    },
    {
      field: 'Reason',
      width: 180,
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <b>{'Reason'}</b>,
      valueGetter: (params) => params.row.officialDetails.reasonForDeactivation,
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
    // {S
    //   field: 'licenseNumber',
    //   headerName: 'License Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.licenseNumber,
    // },
  ];
  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          {/* <Grid sx={{ width: '30px', paddingLeft: '85%', paddingTop: '2px' }}> */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            style={{ width: '25%' }}
          />
          {/* </Grid> */}
        </Grid>
        {props.options?.kind === 'staff' ? (
          <Grid item xs={6}>
            {/* <Grid item xs={12} lg={3} sx={{ px: 5, py: 2 }}> */}
            <PermissionChecks
              permissions={['WRITE_STAFFS']}
              granted={(
                <>
                  <Button
                    onClick={async () => {
                      const sheet =
                        staffs ?
                          staffs.map((user: Staff) => ([
                            user.staffCode,
                            user.basicDetails.firstName,
                            user.basicDetails.lastName,
                            user.supportDetails.designation?.name,
                            user.supportDetails.department?.name,
                            user.officialDetails.divisionHistory[user.officialDetails.divisionHistory.length - 1].subDivision,
                            user.basicDetails.phone,
                            user.basicDetails.email,
                            user.basicDetails.alternativePhone,
                            user.basicDetails.dateOfBirth,
                            user.basicDetails.field,
                            user.basicDetails.martialStatus,
                            user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                            user.basicDetails.highestQualification,
                            user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                            user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                            user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                              user.officialDetails.dateOfLeaving?.from(user.officialDetails.dateOfJoining, true) :
                              (user.officialDetails.dateOfJoining?.fromNow(true)),
                            ((user.supportStructure?.basic ?? 0) +
                              (user.supportStructure?.HRA ?? 0) +
                              (user.supportStructure?.spouseAllowance ?? 0) +
                              (user.supportStructure?.positionalAllowance ?? 0) +
                              (user.supportStructure?.specialAllowance ?? 0) +
                              (user.supportStructure?.telAllowance ?? 0)),
                            user.insurance?.impactNo,
                          ])) :
                          [];
                      const headers = [
                        'Staff Code',
                        'First Name',
                        'Last Name',
                        'Designation',
                        'Department',
                        'Mobile No',
                        'Email ID',
                        'Alt Phone',
                        'DOB',
                        'Field',
                        'Status',
                        'Date of Joining',
                        'No of year in Org',
                        'Net Support',
                      ];
                      const worksheet = XLSX.utils.json_to_sheet(sheet);
                      const workbook = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                      XLSX.writeFile(workbook, 'Staff_Report.xlsx', { compression: true });
                    }}
                    startIcon={<DownloadIcon />}
                    color="primary" sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                    variant="contained"
                  >Export</Button>
                  <Button variant="contained" sx={{ float: 'right', marginBottom: 3, mr: 2 }} startIcon={<AddIcon />} component={Link} to="/hr/add">
                    Add new
                  </Button>
                </>
              )}
            />
          </Grid>
        ) : (
          <Grid item xs={12} lg={4}>

            <PermissionChecks
              permissions={['WRITE_WORKERS']}
              granted={currentTab === 0 && (
                <>
                  <Button
                    onClick={async () => {
                      const sheet =
                        users ?
                          users.map((user: IWorker) => ([
                            user.workerCode,
                            user.basicDetails.firstName,
                            user.basicDetails.lastName,
                            user.division?.details.name,
                            user?.officialDetails?.divisionHistory[user?.officialDetails?.divisionHistory?.length - 1]?.subDivision,
                            user.basicDetails.phone,
                            user.basicDetails.email,
                            user.basicDetails.alternativePhone,
                            user.basicDetails.dateOfBirth,
                            user.basicDetails.field,
                            user.basicDetails.martialStatus,
                            user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                            user.basicDetails.highestQualification,
                            user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                            user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                            user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                              moment(user.officialDetails.dateOfLeaving)?.from(user.officialDetails.dateOfJoining, true) :
                              (moment(user.officialDetails.dateOfJoining)?.fromNow(true)),
                            user.spouse?.spouseCode,
                            user.spouse && user.spouse?.firstName + ' ' + user.spouse?.lastName,
                            ((user.supportStructure?.basic ?? 0) +
                              (user.supportStructure?.HRA ?? 0) +
                              (user.supportStructure?.spouseAllowance ?? 0) +
                              (user.supportStructure?.positionalAllowance ?? 0) +
                              (user.supportStructure?.specialAllowance ?? 0) +
                              (user.supportStructure?.telAllowance ?? 0)),
                            user.insurance?.impactNo,
                          ])) :
                          [];
                      const headers = [
                        'Workers Code',
                        'First Name',
                        'Last Name',
                        'Division',
                        'Sub Division',
                        'Mobile No',
                        'Email ID',
                        'Alt Phone',
                        'DOB',
                        'Field',
                        'Marital Status',
                        'Known Languages',
                        'Highest Qualifications',
                        'Status',
                        'Date of Joining',
                        'No of year in Org',
                        'Spouse Code',
                        'Spouse Name',
                        'Net Support',
                        'Insurance No',
                      ];
                      const worksheet = XLSX.utils.json_to_sheet(sheet);
                      const workbook = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                      XLSX.writeFile(workbook, 'WorkerReport.xlsx', { compression: true });
                    }}
                    startIcon={<DownloadIcon />}
                    color="primary" sx={{ float: 'right', mt: 2, mr: 2 }}
                    variant="contained"
                  >Export</Button>
                  <Button
                    variant="contained"
                    sx={{ float: 'right', mt: 2, mr: 2 }}
                    startIcon={<AddIcon />}
                    component={Link}
                    to={'/workers/add'}
                  >
                    Add New
                  </Button>
                </>
              ) || null}
            />
          </Grid>
        )}

      </Grid>

      {/* </Grid> */}


      <Grid item xs={12} md={12}>
        <Card style={{ height: '62vh', width: '100%' }}>
          <Box
            sx={{
              height: 300,
              width: '100%',
              '& .super-app-theme--cell': {
                backgroundColor: '#f1f5fa',
                color: 'black',
                fontWeight: '600',
              },
              '& .super-app.negative': {
                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                color: '#1a3e72',
                fontWeight: '600',
              },
              '& .super-app.positive': {
                backgroundColor: '#d47483',
                color: '#1a3e72',
                fontWeight: '600',
              },
              '& .even': {
                backgroundColor: '#DEDAFF', // Change to red for even rows
              },
              '& .odd': {
                backgroundColor: '#fff', // Change to blue for odd rows
              },
            }}
          >

            <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={props.value === null} getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            } />
          </Box>

        </Card>
      </Grid>

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
          <Autocomplete<string>
            options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
            value={reasonForDeactivation}
            onChange={(e, selectedReason) => {
              setReasonForDeactivation(selectedReason);
            }}
            renderInput={(params) => <TextField {...params} label="Reason for Deactivation" required />}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
              false;
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
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersList;
