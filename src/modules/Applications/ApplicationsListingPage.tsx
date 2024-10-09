import React, { SetStateAction, useEffect, useState } from 'react';
import {
  Edit as EditIcon, Preview as PreviewIcon, Add as AddIcon, Download as DownloadIcon,
  Attachment as AttachmentIcon,
} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';
// import { useParams } from 'react-router-dom';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import moment from 'moment';
import * as XLSX from 'xlsx';
import ApplicationLifeCycleStates from './extras/ApplicationLifCyclrStates';
import ReasonforDeactivationService from '../Settings/extras/ReasonforDeactivationService';


const ApplicationsListingPage = (props: { action: 'manage' | 'hr' | 'president' }) => {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showApplicationFormDialog, setShowApplicationFormDialog] = useState<boolean>(false);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [remarkDialog, setRemarkDialog] = useState(false);
  const [editid, setEditId] = useState<string>();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [statusId, setStatusId] = useState<string>();
  const [applicationFormState, setApplicationFormState] = useState<CreatableApplication>({
    applicationCode: '',
    name: '',
    reason: '',
    status: '',
    division: {
      _id: '',
      details: {
        name: '',
        divisionId: '',
        contactNumber: '',
        email: '',
        address: {
          buildingName: '',
          street: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
        },
        coordinator: {},
        seniorLeader: {},
        juniorLeader: {},
        president: {},
        officeManager: {},
      },
      subDivisions: [
        {
          _id: '',
          name: '',
        },
      ],
      DivisionBankFCRA: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      DivisionBankLocal: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank1: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank2: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank3: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank4: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank5: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank6: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank7: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank8: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank9: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank10: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank11: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank12: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank13: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank14: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank15: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank16: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank17: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank18: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank19: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      BeneficiaryBank20: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },

      createdAt: moment(),
      updatedAt: moment(),
    },
    attachment: [],
  });
  const [reason, setReason] = useState<IReason[]>([]);
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [remark, setRemark] = useState<IReason | null | string>();


  const showLinkAction = props.action === 'manage';
  useEffect(() => {
    if (props.action == 'hr') {
      ApplicationServices.getAll({ status: UserLifeCycleStates.CREATED })
        .then((res) => {
          setApplications(res.data);
        }).catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'president') {
      ApplicationServices.getAll({ status: ApplicationLifeCycleStates.SENT_TO_PRESIDENT })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else {
      ApplicationServices.getAll()
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    }
    ReasonforDeactivationService.getAll().then((res) => {
      setReason(res.data);
    });
  }, []);

  const EditApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editid) {
      ApplicationServices.editApplication(editid, applicationFormState)
        .then((res) => {
          setShowApplicationFormDialog(false);
          enqueueSnackbar({
            message: res.message,
            variant: 'success',
          });
          setApplicationFormState({
            applicationCode: '',
            name: '',
            reason: '',
            status: '',
            attachment: [],
          });

          return ApplicationServices.getAll();
        })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.message,
            variant: 'error',
          });
        });
    }
  };
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (applications ?? []).filter((row) => {
    if ((row.name && row.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.applicationCode && row.applicationCode.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.createdBy?.basicDetails.firstName && row.createdBy?.basicDetails.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.createdBy?.basicDetails.lastName && row.createdBy?.basicDetails.lastName.toLowerCase().includes(searchText.toLowerCase()))

    ) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });
  const [showFileUploader, setShowFileUploader] = useState<boolean>(false);
  const AddApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Request' : 'Updating Request',
      variant: 'info',
    });

    ApplicationServices.create(applicationFormState)
      .then((res) => {
        setShowApplicationFormDialog(false);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });

        setApplications((prevApps) => (!prevApps ? [res.data] : [...prevApps, res.data]));
        setApplicationFormState(() => ({
          applicationCode: '',
          name: '',
          reason: '',
          status: '',
          attachment: [],
        }));
      })
      .catch((err) => {
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const columns: GridColDef<Application>[] = [
    {
      field: 'actions',
      type: 'actions',
      headerClassName: 'super-app-theme--header',
      renderHeader: () => (<b>Action</b>),
      width: 80,
      getActions: (params: GridRowParams) => ([
        <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/application/${params.id}/approval`} />,
        showLinkAction && <GridLinkAction
          key={2}
          label="Edit"
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setEditId(params.id as string);
            setAction('edit');
            ApplicationServices.getById(params.row._id)
              .then((res) => setApplicationFormState(res.data));
            setShowApplicationFormDialog(true);
          }}
        />,
        <GridLinkAction
          key={2}
          label="Add Remark"
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setRemarkDialog(true);
            setEditId(params.id as string);
          }}
        />,
        (props.action == 'hr' || props.action == 'president') && (hasPermissions(['MANAGE_APPLICATION']) || hasPermissions(['PRESIDENT_ACCESS'])) &&
        <GridLinkAction
          key={3}
          label="Approve"
          icon={<DoneIcon />}
          showInMenu
          onClick={() => {
            setStatusId(params.id as string);
            const snackbarId = enqueueSnackbar({
              message: 'Approving...',
              variant: 'info',
            });
            ApplicationServices.approve(params.id as string)
              .then((res) => {
                if (applications) {
                  const filteredApplications = applications?.filter((application) => {
                    return application._id !== params.id;
                  });
                  setApplications(filteredApplications);
                }
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: res.message,
                  variant: 'success',
                });
              })
              .catch((err) => {
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: err.message,
                  variant: 'error',
                });
              });
          }}
        />,
        // props.action == 'hr' && hasPermissions(['MANAGE_APPLICATION']) &&
        // <GridLinkAction
        //   key={3}
        //   label="Forward to president"
        //   icon={<ArrowForwardIcon />}
        //   showInMenu
        //   onClick={() => {
        //     setStatusId(params.id as string);
        //     const snackbarId = enqueueSnackbar({
        //       message: 'Activating...',
        //       variant: 'info',
        //     });
        //     ApplicationServices.active(params.id as string)
        //       .then((res) => {
        //         if (applications) {
        //           const filteredApplications = applications?.filter((application) => {
        //             return application._id !== params.id;
        //           });
        //           setApplications(filteredApplications);
        //         }
        //         closeSnackbar(snackbarId);
        //         enqueueSnackbar({
        //           message: res.message,
        //           variant: 'success',
        //         });
        //       })
        //       .catch((err) => {
        //         closeSnackbar(snackbarId);
        //         enqueueSnackbar({
        //           message: err.message,
        //           variant: 'error',
        //         });
        //       });
        //   }}
        // />,
        props.action === 'hr' || props.action === 'president' && hasPermissions(['MANAGE_APPLICATION']) &&
        <GridLinkAction
          key={4}
          label="Reject"
          icon={<CloseIcon />}
          showInMenu
          onClick={() => {
            setReasonDialog(true);
            setStatusId(params.id as string);
          }}
        />,
      ].filter((action) => action !== false) as JSX.Element[]),
    },
    // { field: '_id', headerName: 'SI NO', width: 150 },
    {
      field: 'applicationCode', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Application No</b>), width: 150,
    },
    {
      field: 'name', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Name</b>), width: 150,
    },
    {
      field: 'reason', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Reason</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.value}
        </p>),
      width: 250,
    },
    {
      field: 'presidentSanction', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>President Sanction</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row.presidentSanction? 'Yes' : 'No'}
        </p>),
      width: 250,
    },
    {
      field: 'createdBy', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Applied By</b>), renderCell: (props) =>
        // <p> {props.row.createdBy?.basicDetails.firstName  + ' ' + props.row.createdBy?.basicDetails?.middleName + ' ' + props.row.createdBy?.basicDetails.lastName} </p>,
        <p>
          {props.row.createdBy?.basicDetails?.firstName || ''} {' '}
          {props.row.createdBy?.basicDetails?.middleName || ''} {' '}
          {props.row.createdBy?.basicDetails?.lastName || ''}
        </p>,
      width: 170, headerAlign: 'center', align: 'center',
    },
    {
      field: 'division', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Division</b>), renderCell: (props) =>
        <p> {props.row.division?.details?.name}</p>,
      width: 170, headerAlign: 'center', align: 'center',
    },
    {
      field: 'remark', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Remark</b>), renderCell: (props) =>
        <p> {props.row?.remark?? 'N/A'}</p>,
      width: 170, headerAlign: 'center', align: 'center',
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      renderHeader: () => (<b>Status</b>),
      width: 205,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.value == CommonLifeCycleStates.CREATED ? 'Waiting for HR' :
          params.value == CommonLifeCycleStates.APPROVED ? 'APPROVED' :
            params.value == ApplicationLifeCycleStates.SENT_TO_PRESIDENT ? 'WAITING FOR PRESIDENT':
              params.value == CommonLifeCycleStates.REJECTED ? 'REJECTED' : 'Unknown Status ';
      },
    },
    // {
    //   field: 'reasonForDeactivation', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Reason For Reject</b>), renderCell: (props) =>
    //     <p> {props.row.reasonForDeactivation?? 'N/A'}</p>,
    //   width: 170, headerAlign: 'center', align: 'center',
    // },
  ];
  return (
    <CommonPageLayout title="Application Manages ">

      <Dialog open={showApplicationFormDialog} onClose={() => setShowApplicationFormDialog(false)} PaperProps={{ style: { width: '500px' } }}>
        <form onSubmit={action === 'add' ? AddApplication : EditApplication}>
          <DialogTitle>{action === 'add' ? 'Add Request' : 'Edit Request:'}</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  &ensp;
                  <TextField
                    label="Name"
                    value={applicationFormState.name}
                    onChange={(e) => {
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        name: e.target.value,
                      }));
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Reason"
                    value={applicationFormState.reason}
                    onChange={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        reason: e.target.value,
                      }));
                    }}
                    fullWidth
                    multiline
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" sx={{ backgroundColor: 'orange' }} onClick={() => {
                    ApplicationServices.sentToPresident(applicationFormState)
                     .then((res) => {
                       // handleClose();
                       // closeSnackbar(snackbarId);
                       setShowApplicationFormDialog(false);
                       enqueueSnackbar({
                         message: res.message,
                         variant: 'success',
                       });
                     });
                  }}>
                    Sent to president
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button>
            <Button type="submit">{action === 'add' ? 'Add' : 'Edit'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <FileUploader
        title="Attachments"
        action='add'
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={applicationFormState.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
            .then((res) => {
              setApplicationFormState(() => ({
                ...applicationFormState,
                attachment: [...applicationFormState.attachment, res.data],
              }));
              return res;
            });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          setApplicationFormState(() => ({
            ...applicationFormState,
            attachment: applicationFormState.attachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setApplicationFormState(() => ({
            ...applicationFormState,
            attachment: applicationFormState.attachment.filter((file) => file._id !== fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />


      <Grid item xs={12} md={12}>
        <Card sx={{ maxWidth: '78vw', alignItems: 'center' }}>
          <Grid container spacing={0} justifyContent="space-between" padding={2}>
            <Grid item xs={6}>
              {/* <Grid sx={{ width: '30px', paddingLeft: '85%', paddingTop: '2px' }}> */}
              <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
                style={{ width: '25%', alignItems: 'start' }}
              />
              {/* </Grid> */}
            </Grid>
            <Grid item xs={6} >
              <>
                <PermissionChecks
                  permissions={['MANAGE_APPLICATION']}
                  granted={(
                    <Button
                      onClick={async () => {
                        const sheet =
                          applications ?
                            applications.map((application: Application) => ([
                              application.applicationCode,
                              application.name,
                              application.reason,
                              application.createdBy && (application.createdBy?.basicDetails.firstName + ' ' + application.createdBy?.basicDetails.lastName),
                              application.division?.details?.name,
                              Number(application.status) == CommonLifeCycleStates.CREATED ? 'Waiting for HR' :
                                Number(application.status) == CommonLifeCycleStates.ACTIVE ? 'WAITING FOR PRESIDENT' :
                                  Number(application.status) == CommonLifeCycleStates.APPROVED ? 'APPROVED' :
                                    Number(application.status) == CommonLifeCycleStates.REJECTED ? 'REJECTED' : 'Unknown Status ',
                              Number(application.status) == ApplicationLifeCycleStates.SENT_TO_PRESIDENT ? 'WAITING FOR PRESIDENT' : 'Unknown Status ',
                            ])) :
                            [];
                        const headers = [
                          'Application No',
                          'Name',
                          'Reason',
                          'President Sanction',
                          'Applied By',
                          'Division',
                          'Status',
                        ];
                        const worksheet = XLSX.utils.json_to_sheet(sheet);
                        const workbook = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                        XLSX.writeFile(workbook, 'ApplicationReport.xlsx', { compression: true });
                      }}
                      startIcon={<DownloadIcon />}
                      color="primary" sx={{ float: 'right', m: 2 }}
                      variant="contained"
                    >Export</Button>
                  )}
                />

                <PermissionChecks
                  permissions={['WRITE_APPLICATION']}
                  granted={(
                    <Button
                      style={{ display: props.action !== 'manage' ? 'none' : '' }}
                      variant="contained"
                      sx={{ float: 'right', m: 2 }}
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setShowApplicationFormDialog(true);
                        setAction('add');
                      }}
                    >
                      Add new
                    </Button>
                  )}
                />
              </>
            </Grid>
            <Grid item xs={12} >
              <Card sx={{
                'height': '66vh', 'width': '100%',
                '& .super-app-theme--header': {
                  backgroundColor: '#f1f5fa',
                  fontSize: '16px',
                  fontWeight: '500',
                },
              }}>

                <Box
                  sx={{
                    'height': 500,
                    'width': '100%',
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

                  <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={applications === null} getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  } />
                </Box>
              </Card>
            </Grid>
          </Grid>

        </Card>

      </Grid>
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setReasonForDeactivation(e.target.value)}
            label="Reason for rejection"
            required
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
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });
              ApplicationServices.reject(statusId as string, reasonForDeactivation as string)
                .then((res) => {
                  if (applications) {
                    const filteredApplications = applications?.filter((application) => {
                      return application._id !== statusId;
                    });
                    setApplications(filteredApplications);
                  }
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: res.message,
                    variant: 'success',
                  });
                })
                .catch((err) => {
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: err.message,
                    variant: 'error',
                  });
                });
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={remarkDialog} fullWidth maxWidth="md">
        <DialogTitle>Remark</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            label="Remark"
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setRemarkDialog(false);
              false;
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>

          <Button
            variant="contained"
            onClick={async () => {
              ApplicationServices.addRemark(editid as string, remark as string)
              .then((res) => setApplicationFormState(res.data));
              const snackbarId = enqueueSnackbar({
                message: 'Remark added...',
                variant: 'success',
              });
              setRemarkDialog(false);
              window.location.reload();
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>

    </CommonPageLayout>
  );
};

export default ApplicationsListingPage;
