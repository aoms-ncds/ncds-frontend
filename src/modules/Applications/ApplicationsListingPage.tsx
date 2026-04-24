import React, { SetStateAction, useEffect, useState } from 'react';
import {
  Edit as EditIcon, Preview as PreviewIcon, Add as AddIcon, Download as DownloadIcon,
  Attachment as AttachmentIcon,
  Delete,
} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ApplicationNamesService from '../Settings/extras/ApplicationNamesService';
import AppliedForService from '../Settings/extras/AppliedForService';
import formatAmount from '../Common/formatcode';
import WorkersServices from '../Workers/extras/WorkersServices';
import WelfareForm from './WelfareForm';
import Section from './Section';
import { set } from 'mongoose';


const ApplicationsListingPage = (props: { action: 'manage' | 'hr' | 'president' |'welfare'| 'welfarePresident' | 'revertHr' | 'revertDivision'| 'allRevert'}) => {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showApplicationFormDialog, setShowApplicationFormDialog] = useState<boolean>(false);
  const [showApplicationFormDialog1, setShowApplicationFormDialog1] = useState<boolean>(false);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [form, setForm] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [err, setErr] = useState(false);
  const [form1Signature, setForm1Signature] = useState(false);
  const [form1Signature0, setForm1Signature0] = useState(false);
  const [form1Signature2, setForm1Signature2] = useState(false);
  const [form1Signature3, setForm1Signature3] = useState(false);
  const [form1Signature4, setForm1Signature4] = useState(false);
  const [remarkDialog, setRemarkDialog] = useState(false);
  const [editid, setEditId] = useState<string>();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [statusId, setStatusId] = useState<string>();
  const [applicationsNames, setApplicationsNames] = useState<any >();
  const [appliedFor, setAppliedFor] = useState<any >();
  const [deleteModel, setDeleteModel] = useState(false);
  const [workers, setWorkers] = useState<any[] | any[]>();
  const [workersName, setWorkersName] = useState<IWorker[] | Staff[]>();
  const [statusFilter, setStatusFilter] = useState([ApplicationLifeCycleStates.CREATED]); // default WFA: Waiting for access or Reverted
  console.log(statusFilter, 'statusFilter');

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
  console.log(applicationFormState, 'ui99');

  const [reason, setReason] = useState<IReason[]>([]);
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [remark, setRemark] = useState<IReason | null | string>();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });

  const [forms, setForms] = useState<any>({});
  console.log(forms, ' forms ');

  const handleChange = (e: any) => {
  // e.target.name  = the input's name attribute (e.g., "email", "username")
  // e.target.value = what the user typed

    // 1. Update local `forms` state
    setForms({
      ...forms, // keep all existing fields
      [e.target.name]: e.target.value, // override just the changed field
    });

    // 2. Update nested `formData` inside `applicationFormState`
    setApplicationFormState({
      ...applicationFormState as any, // keep all top-level fields
      formData: {
        ...(applicationFormState as any).formData, // keep all existing formData fields
        [e.target.name]: e.target.value, // override just the changed field
      },
    });
  };

  // const handleChange = (e: any) => {
  //   setForm({ ...forms, [e.target.name]: e.target.value });
  // };

  const handleCheckbox = (e: any) => {
    setForm({ ...forms, [e.target.name]: e.target.checked });
  };
  const names=[
    'Education Support',
    'Window/Widower help',
    'Marriage help',
    'Financial Assistance for medical treatment',
  ];

  const showLinkAction = props.action === 'manage';
  const removeDivisions = (id: any) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Application',
      variant: 'info',
    });
    ApplicationServices.delete(id)
        .then((res) => {
          if (applications) {
            const newDivisions = applications.filter((appl) => {
              return appl._id !== id;
            });
            setApplications(newDivisions);
          }
          setDeleteModel(false);
          // closeSnackbar(snackbarId);
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
  useEffect(() => {
    WorkersServices.getWorkersByDivision()
        .then((res) => {
          setWorkers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    if (props.action == 'hr') {
      ApplicationServices.getAll({ dateRange: dateRange, status: UserLifeCycleStates.CREATED })
        .then((res) => {
          setApplications(res.data);
        }).catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'president') {
      ApplicationServices.getAll({ dateRange: dateRange, status: ApplicationLifeCycleStates.SENT_TO_PRESIDENT })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'welfare') {
      ApplicationServices.getAll({ dateRange: dateRange, status: ApplicationLifeCycleStates.CREATED })
        .then((res) => {
          setApplications(res.data.filter((res:any)=>res.welfare ==true));
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'revertHr') {
      ApplicationServices.getAll({ dateRange: dateRange, status: ApplicationLifeCycleStates.REVERT_TO_HR })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'allRevert') {
      ApplicationServices.getAll({ dateRange: dateRange, status: [ApplicationLifeCycleStates.REVERT_TO_DIVISION, ApplicationLifeCycleStates.REVERT_TO_HR]})
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'revertDivision') {
      ApplicationServices.getAll({ dateRange: dateRange, status: [ApplicationLifeCycleStates.REVERT_TO_DIVISION]})
        .then((res) => {
          setApplications(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else if (props.action == 'welfarePresident') {
      ApplicationServices.getAll({ dateRange: dateRange, status: ApplicationLifeCycleStates.SENT_TO_PRESIDENT })

        .then((res) => {
          setApplications(res.data.filter((res:any)=>res.welfare ==true));
        })
        .catch((error) => {
          enqueueSnackbar({
            message: error.message,
            variant: 'error',
          });
        });
    } else {
      ApplicationServices.getAll({ dateRange: dateRange, statusFilter: statusFilter })
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
    ApplicationNamesService.getAll()
    .then((res) => {
      setApplicationsNames(res.data);
    })
    .catch((res) => {
      enqueueSnackbar({
        message: res.message,
        variant: 'error',
      });
    });
    AppliedForService.getAll()
    .then((res) => {
      setAppliedFor(res.data);
    })
    .catch((res) => {
      enqueueSnackbar({
        message: res.message,
        variant: 'error',
      });
    });
  }, [dateRange, statusFilter]);
  console.log(applicationFormState, '787');
  const selectedWorker = workers?.find(
    (w) => w._id === ((applicationFormState.workersName as any)?._id || applicationFormState.workersName),
  ) || null;
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
  console.log(applicationFormState, 'applications');

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

    ApplicationServices.create(applicationFormState, forms)
      .then((res) => {
        setShowApplicationFormDialog(false);
        closeSnackbar(snackbarId);
        window.location.reload();
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
  const ApproveApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snackbarId = enqueueSnackbar({
      message: 'Updating Request',
      variant: 'info',
    });

    ApplicationServices.editApplication( editid as any, applicationFormState)
              .then((res) => {
                if (applications) {
                  // const filteredApplications = applications?.filter((application) => {
                  //   return application._id !== params.id;
                  // });
                  // setApplications(filteredApplications);
                  window.location.reload();
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
        // showLinkAction && params.row.status !== ApplicationLifeCycleStates.APPROVED && <GridLinkAction
        //   key={2}
        //   label="Edit"
        //   icon={<EditIcon />}
        //   showInMenu
        //   onClick={() => {
        //     setEditId(params.id as string);
        //     setAction('edit');
        //     ApplicationServices.getById(params.row._id)
        //       .then((res) => setApplicationFormState(res.data));
        //     setShowApplicationFormDialog(true);
        //   }}
        // />,

        Number(params.row.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION &&
          <GridLinkAction
            key="edit"
            label="Edit"
            icon={<EditIcon />}
            showInMenu
            onClick={() => {
              setEditId(params.id as string);
              setAction('edit');

              ApplicationServices.getById(params.row._id)
        .then((res) => setApplicationFormState(res.data));
              if (params.row.welfare==true) {
                setShowApplicationFormDialog1(true);
              } else {
                setShowApplicationFormDialog(true);
              }
            }}
          />,
        Number(params.row.status) === ApplicationLifeCycleStates.REVERT_TO_HR &&
          <GridLinkAction
            key="edit"
            label="Edit"
            icon={<EditIcon />}
            showInMenu
            onClick={() => {
              setEditId(params.id as string);
              setAction('edit');

              ApplicationServices.getById(params.row._id)
        .then((res) => setApplicationFormState(res.data));

              if (params.row.welfare==true) {
                setShowApplicationFormDialog1(true);
              } else {
                setShowApplicationFormDialog(true);
              }
            }}
          />,

        showLinkAction && params.row.status == ApplicationLifeCycleStates.APPROVED && hasPermissions(['ADMIN_ACCESS']) && <GridLinkAction
          key={2}
          label="Edit for admin"
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setEditId(params.id as string);
            setAction('edit');
            ApplicationServices.getById(params.row._id)
              .then((res) => setApplicationFormState(res.data));
            if (params.row.welfare==true) {
              setShowApplicationFormDialog1(true);
            } else {
              setShowApplicationFormDialog(true);
            }
          }}
        />,

        // <GridLinkAction
        //   key={2}
        //   label="Revert to Division"
        //   icon={<EditIcon />}
        //   showInMenu
        //   onClick={() => {
        //     setRemarkDialog(true);
        //     setEditId(params.id as string);
        //   }}
        // />,
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
        (props.action == 'hr' || props.action == 'welfare') && hasPermissions(['MANAGE_APPLICATION']) &&
        <GridLinkAction
          key={3}
          label="Sent to president"
          icon={<ArrowForwardIcon />}
          showInMenu
          onClick={() => {
            setStatusId(params.id as string);
            const snackbarId = enqueueSnackbar({
              message: 'Activating...',
              variant: 'info',
            });
            ApplicationServices.active(params.id as string)
               .then((res) => {
                 if (applications) {
                   const filteredApplications = applications?.filter((application) => {
                     return application._id !== params.id;
                   });
                   setApplications(filteredApplications);
                 }
                 // handleClose();
                 // closeSnackbar(snackbarId);
                 setShowApplicationFormDialog(false);
                 //  navigate('/application');
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
        hasPermissions(['ADMIN_ACCESS']) &&
        <GridLinkAction
          key={5}
          label="Delete"
          icon={<Delete />}
          showInMenu
          onClick={() => {
            setDeleteModel(true);
            setStatusId(params.id as string);
          }}
        />,
        props.action === 'hr' && hasPermissions(['MANAGE_APPLICATION']) &&
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
      ].filter((action:any) => action !== false) as JSX.Element[]),
    },
    // { field: '_id', headerName: 'SI NO', width: 150 },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      renderHeader: () => (<b>Status</b>),
      width: 205,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.value == CommonLifeCycleStates.CREATED ? 'WAITING FOR HR' :
          params.value == CommonLifeCycleStates.APPROVED ? 'APPROVED' :
            params.value == ApplicationLifeCycleStates.SENT_TO_PRESIDENT ? 'WAITING FOR PRESIDENT':
              params.value == ApplicationLifeCycleStates.REVERT_TO_DIVISION ? 'REVERTED TO DIVISION':
                params.value == ApplicationLifeCycleStates.REVERT_TO_HR ? 'REVERTED TO HR':
                  params.value == CommonLifeCycleStates.REJECTED ? 'REJECTED' : 'Unknown Status ';
      },
      cellClassName: (params) => {
        console.log('CellClassName params:', params);
        const statusName = params.formattedValue;
        console.log('Status Name###:', statusName);
        if (params.value == null) {
          return '';
        }
        switch (statusName) {
        case 'WAITING FOR PRESIDENT':
          return clsx('orange');
        case 'APPROVED':
          return clsx('green');
        case 'REJECTED':
          return clsx('red');
        case 'WAITING FOR HR':
          return clsx('HR');
        case 'REVERTED TO DIVISION':
          return clsx('RevertDivision');
        case 'REVERTED TO HR':
          return clsx('HRRevert');
        default:
          console.log('No class applied');
          return '';
        }
      },
    },
    {
      field: 'applicationCode', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Application No</b>), width: 150,
    },
    {
      field: 'divisionName', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Division Name</b>), renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row?.division?.details?.name}
        </p>), width: 150,
    },
    {
      field: 'name', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Application Name</b>), width: 150,
    },
    {
      field: 'createdBy',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Applied By</b>),
      renderCell: (props) => (
        <p>
          {props.row.createdBy?.basicDetails?.firstName || ''} {' '}
          {props.row.createdBy?.basicDetails?.middleName || ''} {' '}
          {props.row.createdBy?.basicDetails?.lastName || ''}
        </p>
      ),
      width: 170,
      // Adding valueGetter for filter compatibility
      valueGetter: (props) => [
        props.row.createdBy?.basicDetails?.firstName || '',
        props.row.createdBy?.basicDetails?.middleName || '',
        props.row.createdBy?.basicDetails?.lastName || '',
      ].join(' ').trim(),
    },
    {
      field: 'appliedFor', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Applied For</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row?.appliedFor}
        </p>),
      width: 250,
    },
    {
      field: 'applicantName', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Applicant Name</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row?.applicantName}
        </p>),
      width: 250,
    },


    {
      field: 'requestedAmount', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Requested Amount</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {formatAmount(params.row?.requestedAmount)}
        </p>),
      width: 250,
    },
    {
      field: 'sanctionedAmount', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Sanctioned Amount</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {formatAmount(params.row?.sanctionedAmount)?? 'N/A'}
        </p>),
      width: 250,
    },

    // {
    //   field: 'reason', align: 'center', headerClassName: 'super-app-theme--header',
    //   headerAlign: 'center', renderHeader: () => (<b>Remark</b>),
    //   renderCell: (params) => (
    //     <p style={{
    //       maxWidth: 250,
    //       whiteSpace: 'normal',
    //       wordBreak: 'break-word',
    //       display: '-webkit-box',
    //       WebkitBoxOrient: 'vertical',
    //       WebkitLineClamp: 3,
    //     }}>
    //       {params.value}
    //     </p>),
    //   width: 250,
    // },


    {
      field: 'President Remarks', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>President Remarks</b>), renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row?.presidentRemark}
        </p>), width: 150,
    },
    {
      field: 'createdAt', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Applied Date</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row.createdAt ?
            moment(params.row.createdAt).format('DD/MM/YYYY hh:mm A') :
            'N/A'}
        </p>),
      width: 250,
    },
    {
      field: 'approvedDate', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Approved Date</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row.approvedDate ?
            moment(params.row.approvedDate).format('DD/MM/YYYY hh:mm A') :
            'N/A'}
        </p>),
      width: 250,
    },
    {
      field: 'presidentSanction',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderHeader: () => (<b>President Sanction</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {params.row.presidentSanction ? 'Yes' : 'No'}
        </p>
      ),
      width: 250,
      // Adding valueGetter for filter compatibility
      valueGetter: (params) => params.row.presidentSanction ? 'Yes' : 'No',
    },


    // {
    //   field: 'division',
    //   headerClassName: 'super-app-theme--header',
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderHeader: () => (<b>Division</b>),
    //   renderCell: (props) => (
    //     <p>{props.row.division?.details?.name || ''}</p>
    //   ),
    //   width: 170,
    //   // Adding valueGetter for filter compatibility
    //   valueGetter: (props) => props.row.division?.details?.name || '',
    // },
    {
      field: 'remark', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Addn. Remark</b>), renderCell: (props) =>
        <p> {props.row?.remark?? 'N/A'}</p>,
      width: 250, headerAlign: 'center', align: 'center',
    },
    {
      field: 'revertReason', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Reason For Revert</b>),
      renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {(params.row as any)?.reasonForRevert}
        </p>),
      width: 250,
    },
    {
      field: 'coorName', align: 'center', headerClassName: 'super-app-theme--header',
      headerAlign: 'center', renderHeader: () => (<b>Coordinator Name</b>), renderCell: (params) => (
        <p style={{
          maxWidth: 250,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {(params.row as any)?.coordinatorName?.basicDetails?.firstName} {(params.row as any)?.coordinatorName?.basicDetails?.lastName}
        </p>), width: 150,
    },
    // {
    //   field: 'reasonForDeactivation', headerClassName: 'super-app-theme--header', renderHeader: () => (<b>Reason For Reject</b>), renderCell: (props) =>
    //     <p> {props.row.reasonForDeactivation?? 'N/A'}</p>,
    //   width: 170, headerAlign: 'center', align: 'center',
    // },
  ];
  return (
    <CommonPageLayout title="Application Manages " momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setApplications((fr) =>
          fr ?
            fr.filter((fr) =>
              moment(fr.createdAt).isSameOrAfter(moment(newDateRange.startDate)) &&
                moment(fr.createdAt).isSameOrBefore(moment(newDateRange.endDate)),
            ) :
            [],
        );
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>

      <Dialog open={showApplicationFormDialog} onClose={() => setShowApplicationFormDialog(false)} PaperProps={{ style: { width: '500px' } }}>
        {/* <Grid item md={2}>

          <Typography sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
  X
          </Typography>
        </Grid> */}
        <form onSubmit={action === 'add' ? AddApplication: Number(applicationFormState.status)==ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
          Number(applicationFormState.status)==ApplicationLifeCycleStates.REVERT_TO_DIVISION ? ApproveApplication: EditApplication}>
          <DialogTitle>{action === 'add' ? 'Create New Application' : 'Edit  Application:'}</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
  &ensp;
                  <Autocomplete
                    disablePortal
                    id="application-name"
                    options={applicationsNames} // Array of available application names
                    getOptionLabel={(option) => (option as any).name || ''} // Ensure labels are strings
                    value={applicationsNames?.find((app: { name: string }) => app.name === applicationFormState.name) || null}
                    onChange={(_e, newValue) => {
                      setApplicationFormState((prev) => ({
                        ...prev,
                        name: newValue ? newValue.name : '', // Preserve appliedFor
                      }));
                    }}

                    renderInput={(params) => (

                      <TextField {...params} label="Application Name" fullWidth required />
                    )}
                  />
                </Grid>

                <Grid item md={12}>
                  <Autocomplete
                    disablePortal
                    id="applied-for"
                    options={appliedFor} // Array of selectable options
                    getOptionLabel={(option) => (option as any).name || ''} // Ensure labels are strings
                    value={appliedFor?.find((option: { name: string | undefined }) => option.name === applicationFormState.appliedFor) || null}
                    onChange={(_e, newValue) => {
                      setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        appliedFor: newValue ? newValue.name : '', // Preserve name
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Applied For" fullWidth required />
                    )}
                  />
                </Grid>
                {applicationFormState.appliedFor =='Worker' &&(

                  <>
                    {/* 1. WORKER SELECTION */}
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
        Choose Worker *
                      </Typography>
                      <Autocomplete
                        fullWidth
                        options={workers || []}
                        // Matches the label style from your images
                        getOptionLabel={(worker) =>
                          worker?.basicDetails ?
                            `${worker.basicDetails.firstName} ${worker.basicDetails.lastName} (${worker.staffCode || worker.workerCode || ''})` :
                            ''
                        }
                        // Ensures the field is never empty in Edit OR Add mode
                        value={selectedWorker}
                        isOptionEqualToValue={(option, value) => option._id === value?._id}
                        onChange={(_e, newValue) => {
                          setApplicationFormState((prev) => ({
                            ...prev,
                            // Save the ID to keep the state light for the backend
                            workersName: newValue?._id || '',
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select a worker..."
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                'borderRadius': '8px', // Matching Image 2 style
                                'backgroundColor': '#fff',
                                '& fieldset': { borderColor: '#e0e0e0' },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>

                    {/* 2. AUTOMATIC WORKER CODE (READ ONLY) */}
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Worker Code"
                        // Uses the helper variable 'selectedWorker' to find the code easily
                        value={selectedWorker?.staffCode || selectedWorker?.workerCode || ''}
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: '#f5f5f5', // Visual cue that it's disabled
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item md={12}>
                  <TextField label="Applicant Name" value={applicationFormState.applicantName}
                    onChange={(e)=>setApplicationFormState((prevRequest) => ({
                      ...prevRequest,
                      applicantName: e.target.value,
                    }))}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth />
                </Grid>
                <Grid item md={12}>
                  <TextField type='number' label="Requested Amount" value={applicationFormState.requestedAmount}
                    onChange={(e)=>setApplicationFormState((prevRequest) => ({
                      ...prevRequest,
                      requestedAmount: Number(e.target.value),
                    }))}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth />
                </Grid>
                {action == 'edit' && applicationFormState.presidentSanction&&(
                  <><Grid item md={12}>
                    <TextField type='number' label="Sanctioned Amount" value={applicationFormState.sanctionedAmount}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        sanctionedAmount: Number(e.target.value),
                      }))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth />
                  </Grid><Grid item md={12}>
                    <TextField type='text' label="Enter Validity" value={applicationFormState.validityDate}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        validityDate: String(e.target.value),
                      }))}
                      fullWidth />
                  </Grid><Grid item md={12}>
                    <TextField type='text' label="President Remarks" value={applicationFormState.presidentRemark}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        presidentRemark: String(e.target.value),
                      }))}
                      fullWidth />
                  </Grid></>
                )}


                <Grid item md={12}>
                  <TextField
                    label="Remark"
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
                    // required
                  />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>

                {/* <WelfareForm/> */}

              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Grid item md={6}>
              {Number(applicationFormState.status) !== ApplicationLifeCycleStates.REVERT_TO_HR &&(

                <Button variant="contained" sx={{ backgroundColor: 'orange' }} onClick={() => {
                  if (applicationFormState.name !=''&& applicationFormState.appliedFor!='') {
                    if (Number(applicationFormState.status) == ApplicationLifeCycleStates.REVERT_TO_DIVISION) {
                      ApplicationServices.active(editid as any)
                       .then((res) => {
                         // handleClose();
                         window.location.reload();
                         // closeSnackbar(snackbarId);
                         setShowApplicationFormDialog(false);
                         enqueueSnackbar({
                           message: res.message,
                           variant: 'success',
                         });
                       });
                    } else {
                      ApplicationServices.sentToPresident(applicationFormState)
                         .then((res) => {
                           // handleClose();
                           window.location.reload();
                           // closeSnackbar(snackbarId);
                           setShowApplicationFormDialog(false);
                           enqueueSnackbar({
                             message: res.message,
                             variant: 'success',
                           });
                         });
                    }
                  } else {
                    enqueueSnackbar({
                      message: 'Enter Required Fields',
                      variant: 'info',
                    });
                  }
                }}>
                    Send to president
                </Button>
              )}
            </Grid>
            {/* <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button> */}
            <Grid item md={6}>

              <Button variant="contained" sx={{ backgroundColor: 'blue' }} type="submit">{action === 'add' ?
                'Send to Hr' : Number(applicationFormState.status) == ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
                Number(applicationFormState.status) == ApplicationLifeCycleStates.REVERT_TO_HR? 'Submit': 'Edit'}</Button>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={showApplicationFormDialog1} onClose={() => setShowApplicationFormDialog1(false)} PaperProps={{ style: { width: '500px' } }}>
        {/* <Grid item md={2}>

          <Typography sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
  X
          </Typography>
        </Grid> */}
        <form onSubmit={action === 'add' ? AddApplication: Number(applicationFormState.status)==ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
          Number(applicationFormState.status)==ApplicationLifeCycleStates.REVERT_TO_DIVISION ? ApproveApplication: EditApplication}>
          <DialogTitle>{action === 'add' ? 'Create New Application' : 'Edit  Application Welfare:'}</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
  &ensp;
                  <Autocomplete
                    disablePortal
                    id="application-name"
                    options={names} // Array of available application names
                    getOptionLabel={(option) => (option as any) || ''} // Ensure labels are strings
                    value={names?.find((app) => app === applicationFormState.name) || null}
                    onChange={(_e, newValue) => {
                      setApplicationFormState((prev) => ({
                        ...prev,
                        name: newValue ? newValue : '', // Preserve appliedFor
                      }));
                    }}

                    renderInput={(params) => (

                      <TextField {...params} label="Application Name" fullWidth required />
                    )}
                  />
                </Grid>

                <Grid item md={12}>
                  <Autocomplete
                    disablePortal
                    id="applied-for"
                    options={appliedFor} // Array of selectable options
                    getOptionLabel={(option) => (option as any).name || ''} // Ensure labels are strings
                    value={appliedFor?.find((option: { name: string | undefined }) => option.name === applicationFormState.appliedFor) || null}
                    onChange={(_e, newValue) => {
                      setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        appliedFor: newValue ? newValue.name : '', // Preserve name
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Applied For" fullWidth required />
                    )}
                  />
                </Grid>
                {applicationFormState.appliedFor =='Worker' &&(

                  <>
                    {/* 1. WORKER SELECTION */}
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
        Choose Worker *
                      </Typography>
                      <Autocomplete
                        fullWidth
                        options={workers || []}
                        // Matches the label style from your images
                        getOptionLabel={(worker) =>
                          worker?.basicDetails ?
                            `${worker.basicDetails.firstName} ${worker.basicDetails.lastName} (${worker.staffCode || worker.workerCode || ''})` :
                            ''
                        }
                        // Ensures the field is never empty in Edit OR Add mode
                        value={selectedWorker}
                        isOptionEqualToValue={(option, value) => option._id === value?._id}
                        onChange={(_e, newValue) => {
                          setApplicationFormState((prev) => ({
                            ...prev,
                            // Save the ID to keep the state light for the backend
                            workersName: newValue?._id || '',
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select a worker..."
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                'borderRadius': '8px', // Matching Image 2 style
                                'backgroundColor': '#fff',
                                '& fieldset': { borderColor: '#e0e0e0' },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>

                    {/* 2. AUTOMATIC WORKER CODE (READ ONLY) */}
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Worker Code"
                        // Uses the helper variable 'selectedWorker' to find the code easily
                        value={selectedWorker?.staffCode || selectedWorker?.workerCode || ''}
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: true }}
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: '#f5f5f5', // Visual cue that it's disabled
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item md={12}>
                  <TextField label="Applicant Name" value={applicationFormState.applicantName}
                    onChange={(e)=>setApplicationFormState((prevRequest) => ({
                      ...prevRequest,
                      applicantName: e.target.value,
                    }))}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth />
                </Grid>
                <Grid item md={12}>
                  <TextField type='number' label="Requested Amount" value={applicationFormState.requestedAmount}
                    onChange={(e)=>setApplicationFormState((prevRequest) => ({
                      ...prevRequest,
                      requestedAmount: Number(e.target.value),
                    }))}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth />
                </Grid>
                {action == 'edit' && applicationFormState.presidentSanction&&(
                  <><Grid item md={12}>
                    <TextField type='number' label="Sanctioned Amount" value={applicationFormState.sanctionedAmount}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        sanctionedAmount: Number(e.target.value),
                      }))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth />
                  </Grid><Grid item md={12}>
                    <TextField type='text' label="Enter Validity" value={applicationFormState.validityDate}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        validityDate: String(e.target.value),
                      }))}
                      fullWidth />
                  </Grid><Grid item md={12}>
                    <TextField type='text' label="President Remarks" value={applicationFormState.presidentRemark}
                      onChange={(e) => setApplicationFormState((prevRequest) => ({
                        ...prevRequest,
                        presidentRemark: String(e.target.value),
                      }))}
                      fullWidth />
                  </Grid></>
                )}


                <Grid item md={12}>
                  <TextField
                    label="Remark"
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
                    // required
                  />
                </Grid>
                <Grid item md={4}>
                  <Button variant="contained" onClick={() => {
                    if (applicationFormState.name =='Education Support') {
                      setForm(true);
                    } else if (applicationFormState.name =='Window/Widower help') {
                      setForm2(true);
                    } else if (applicationFormState.name =='Marriage help') {
                      setForm3(true);
                    } else if (applicationFormState.name =='Financial Assistance for medical treatment') {
                      setForm4(true);
                    }
                  }}
                  >
                    {action == 'edit' ? 'Edit' : 'Fill'} Form
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>

                {/* <WelfareForm/> */}

              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={form} onClose={() => setForm(false)} maxWidth="lg">
        <DialogTitle>Application Form</DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography variant="h6">Application for Educational Support</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" name="division" value={(applicationFormState as any).formData?.division} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Scholarship Help No" name="scholarshipNo" value={(applicationFormState as any).formData?.scholarshipNo} onChange={handleChange} />
                </Grid>
                {err && <Typography color="error">Please fill the required fields in the Basic Information section.</Typography>}
              </Section>

              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Name of Applicant" name="name" value={(applicationFormState as any).formData?.name} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applicationFormState as any).formData?.workerCode} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applicationFormState as any).formData?.schemeId} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Father’s Name" name="fatherName" value={(applicationFormState as any).formData?.fatherName} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date"
                    InputLabelProps={{ shrink: true }} name="joiningDate" value={(applicationFormState as any).formData?.joiningDate} onChange={handleChange} />
                </Grid>

                {/* <Grid item xs={6}>
                  <TextField fullWidth label="Help Requesting For" name="helpFor" onChange={handleChange} />
                </Grid> */}
                <Grid item xs={6}>
                  <TextField select fullWidth label="Help Requesting For" name="helpFor" value={(applicationFormState as any).formData?.helpFor} onChange={handleChange}>
                    <MenuItem value="self">Self</MenuItem>
                    <MenuItem value="son">Spouse</MenuItem>
                    <MenuItem value="daughter">Son</MenuItem>
                    <MenuItem value="daughter">Daughter</MenuItem>
                  </TextField>
                </Grid>
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" name="ministry" value={(applicationFormState as any).formData?.ministry} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applicationFormState as any).formData?.place} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile No" name="mobile" value={(applicationFormState as any).formData?.mobile} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Course */}
              <Section title="Course Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="College/University Name" name="college" value={(applicationFormState as any).formData?.college} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Name" name="course" value={(applicationFormState as any).formData?.course} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Duration" name="duration" value={(applicationFormState as any).formData?.duration} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Course Type (Full/Part/Distance)" name="courseType" value={(applicationFormState as any).formData?.courseType} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Class Start Date"
                    InputLabelProps={{ shrink: true }} name="startDate" value={(applicationFormState as any).formData?.startDate} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place" name="collegePlace" value={(applicationFormState as any).formData?.collegePlace} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="College Email ID" name="collegeEmail" value={(applicationFormState as any).formData?.collegeEmail} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Financial */}
              <Section title="Financial Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Bills Attached" name="bills" value={(applicationFormState as any).formData?.bills} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Fee (Rs)" name="totalFee" value={(applicationFormState as any).formData?.totalFee} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Yearly Fee (Rs)" name="yearlyFee" value={(applicationFormState as any).formData?.yearlyFee} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hostel Fee (Rs)" name="hostelFee" value={(applicationFormState as any).formData?.hostelFee} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Other Expenses (Rs)" name="other" value={(applicationFormState as any).formData?.other} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" name="total" value={(applicationFormState as any).formData?.total} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applicationFormState as any).formData?.requested} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField select fullWidth label="Funds Received From" name="received" value={(applicationFormState as any).formData?.received} onChange={handleChange}>
                    <MenuItem value="self">Church</MenuItem>
                    <MenuItem value="son">Family</MenuItem>
                    <MenuItem value="daughter">Friends</MenuItem>
                    <MenuItem value="daughter">Ngo</MenuItem>
                    <MenuItem value="daughter">Gvt</MenuItem>
                  </TextField>
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Area Supervisor Comments" name="supervisor" value={(applicationFormState as any).formData?.supervisor} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name & Signature" name="supervisorSign" value={(applicationFormState as any).formData?.supervisorSign} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applicationFormState as any).formData?.coordinator} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" name="signDate" value={(applicationFormState as any).formData?.signDate} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature(true)} startIcon={<AttachmentIcon />}>
                    Signature
                  </Button>
                </Grid>
              </Section>

              {/* Bank */}
              <Section title="Bank Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Bank Name" name="bankName" value={(applicationFormState as any).formData?.bankName} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Account Holder Name" name="accountName" value={(applicationFormState as any).formData?.accountName} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Account Number" name="accountNumber" value={(applicationFormState as any).formData?.accountNumber} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Branch Name & Code" name="branch" value={(applicationFormState as any).formData?.branch} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="IFS Code" name="ifsc" value={(applicationFormState as any).formData?.ifsc} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Declaration */}
              <Section title="Declaration">
                <Typography>
        I hereby declare that the information provided is true and correct.
                </Typography>

                {/* <Grid item xs={4}>
                  <TextField fullWidth label="Declaration" name="Declaration" onChange={handleChange} />
                </Grid> */}

                <Grid item xs={6}>
                  <TextField fullWidth label="Name" name="declName" value={(applicationFormState as any).formData?.declName} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} name="declDate" value={(applicationFormState as any).formData?.declDate} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature2(true)} startIcon={<AttachmentIcon />}>
                    Signature Of Student
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On"
                    InputLabelProps={{ shrink: true }} name="receivedDate" value={(applicationFormState as any).formData?.receivedDate} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applicationFormState as any).formData?.sanctioned} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date of Fund Release"
                    InputLabelProps={{ shrink: true }} name="releaseDate" value={(applicationFormState as any).formData?.releaseDate} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date Applicant
                   Informed" InputLabelProps={{ shrink: true }} name="informedDate" value={(applicationFormState as any).formData?.informedDate} onChange={handleChange} />
                </Grid>

                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature3(true)} startIcon={<AttachmentIcon />}>
                    Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature4(true)} startIcon={<AttachmentIcon />}>
                    Authorized Person Signature
                  </Button>
                </Grid>
              </Section>

            </Box>
          </Box>
        </DialogContent>
        <DialogActions>

          {/* <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button> */}
          <Grid item md={6}>
            <form
              onSubmit={
                forms.division &&
                action === 'add' ?
                  AddApplication :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    ApproveApplication :
                    EditApplication
              }
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'blue' }}
                onClick={() => {
                  if (!forms.division) {
                    setErr(true);
                  }
                }}
              >

                {action === 'add' ?
                  'Send to Hr' :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    'Submit' :
                    'Edit'}
              </Button>
            </form>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={form2} onClose={() => setForm2(false)} maxWidth="lg">
        <DialogTitle>Application Form</DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Widow / Widower Help Application</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={12}>
                  <TextField fullWidth label="Division" name="division" value={(applicationFormState as any).formData?.division || ''} onChange={handleChange} />
                </Grid>
              </Section>
              {err && <Typography color="error">Please fill the required fields in the Basic Information section.</Typography>}
              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Applicant Name" name="name" value={(applicationFormState as any).formData?.name || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applicationFormState as any).formData?.workerCode || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applicationFormState as any).formData?.schemeId || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date"
                    InputLabelProps={{ shrink: true }} name="joiningDate" value={(applicationFormState as any).formData?.joiningDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Spouse/Husband Name" name="spouse" value={(applicationFormState as any).formData?.spouse || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Children Table */}
              <Section title="Children Details">
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <Grid item xs={3}>
                      <TextField fullWidth label="Name" name={`childName${i}`} value={(applicationFormState as any).formData?.[`childName${i}`] || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Age" name={`childAge${i}`} value={(applicationFormState as any).formData?.[`childAge${i}`] || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Studying" name={`childStudy${i}`} value={(applicationFormState as any).formData?.[`childStudy${i}`] || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth label="Married" name={`childMarried${i}`} value={(applicationFormState as any).formData?.[`childMarried${i}`] || ''} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField fullWidth label="Working" name={`childWork${i}`} value={(applicationFormState as any).formData?.[`childWork${i}`] || ''} onChange={handleChange} />
                    </Grid>
                  </React.Fragment>
                ))}
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Ministry at time of death" name="ministry" value={(applicationFormState as any).formData?.ministry || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applicationFormState as any).formData?.place || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Reason for Death" name="reason" value={(applicationFormState as any).formData?.reason || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date of Death"
                    InputLabelProps={{ shrink: true }} name="deathDate" value={(applicationFormState as any).formData?.deathDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Death (Hospital/Home)" name="deathPlace" value={(applicationFormState as any).formData?.deathPlace || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Doctor Name" name="doctor" value={(applicationFormState as any).formData?.doctor || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Family */}
              <Section title="Family Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Spouse Qualification" name="qualification" value={(applicationFormState as any).formData?.qualification || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Income Details (Rs)" name="income" value={(applicationFormState as any).formData?.income || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applicationFormState as any).formData?.requested || ''} onChange={handleChange} />
                </Grid>

                {/* Living */}
                <Grid item xs={12}>
                  <Typography>Living Arrangement</Typography>
                  <FormControlLabel control={<Checkbox onChange={handleCheckbox} name="rented" checked={(applicationFormState as any).formData?.rented || false} />} label="Rented House" />
                  <FormControlLabel control={<Checkbox onChange={handleCheckbox} name="own" checked={(applicationFormState as any).formData?.own || false} />} label="Own House" />
                  <FormControlLabel control={<Checkbox onChange={handleCheckbox}
                    name="withChildren" checked={(applicationFormState as any).formData?.withChildren || false} />} label="With Children" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Other (Specify)" name="otherLiving" value={(applicationFormState as any).formData?.otherLiving || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Documents Attached" name="documents" value={(applicationFormState as any).formData?.documents || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Death Certificate" name="deathCertificate" value={(applicationFormState as any).formData?.deathCertificate || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" value={(applicationFormState as any).formData?.supervisor || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Supervisor Name & Signature" name="supervisorSign" value={(applicationFormState as any).formData?.supervisorSign || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applicationFormState as any).formData?.coordinator || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Recommended Amount" name="recommend" value={(applicationFormState as any).formData?.recommend || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" name="signDate" value={(applicationFormState as any).formData?.signDate || ''} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature(true)} startIcon={<AttachmentIcon />}>
                    Signature
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Application Received On" InputLabelProps={{ shrink: true }} name="receivedDate" value={(applicationFormState as any).formData?.receivedDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applicationFormState as any).formData?.sanctioned || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Fund Release Date" InputLabelProps={{ shrink: true }}
                    name="releaseDate" value={(applicationFormState as any).formData?.releaseDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Applicant Informed Date" InputLabelProps={{ shrink: true }}
                    name="informedDate" value={(applicationFormState as any).formData?.informedDate || ''} onChange={handleChange} />
                </Grid>


                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature3(true)} startIcon={<AttachmentIcon />}>
                    Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature4(true)} startIcon={<AttachmentIcon />}>
                    Authorized Person Signature
                  </Button>
                </Grid>

              </Section>

              {/* <Button variant="contained" fullWidth size="large">
          Submit
              </Button> */}

            </Box>
          </Box>
        </DialogContent>
        <DialogActions>

          {/* <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button> */}
          <Grid item md={6}>

            <form
              onSubmit={
                forms.division &&
                action === 'add' ?
                  AddApplication :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    ApproveApplication :
                    EditApplication
              }
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'blue' }}
                onClick={() => {
                  if (!forms.division) {
                    setErr(true);
                  }
                }}
              >
                {action === 'add' ?
                  'Send to Hr' :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    'Submit' :
                    'Edit'}
              </Button>
            </form>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={form3} onClose={() => setForm3(false)} maxWidth="lg">
        <DialogTitle>Application Form</DialogTitle>
        <DialogContent>
          <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
            <Box maxWidth="900px" mx="auto" px={2}>

              {/* Header */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Marriage Help Application</Typography>
              </Paper>

              {/* Basic */}
              <Section title="Basic Information">
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" name="division" value={(applicationFormState as any).formData?.division || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Marriage Aid No" name="aidNo" value={(applicationFormState as any).formData?.aidNo || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField select fullWidth label="For" name="forWhom" value={(applicationFormState as any).formData?.forWhom || ''} onChange={handleChange}>
                    <MenuItem value="self" >Self</MenuItem>
                    <MenuItem value="son" >Son</MenuItem>
                    <MenuItem value="daughter" >Daughter</MenuItem>
                  </TextField>
                </Grid>
                {err && <Typography color="error">Please fill the required fields in the Basic Information section.</Typography>}

              </Section>

              {/* Personal */}
              <Section title="Personal Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Applicant Name" name="name" value={(applicationFormState as any).formData?.name || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applicationFormState as any).formData?.workerCode || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applicationFormState as any).formData?.schemeId || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date"
                    InputLabelProps={{ shrink: true }} name="joiningDate" value={(applicationFormState as any).formData?.joiningDate || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Ministry */}
              <Section title="Ministry Details">
                <Grid item xs={12}>
                  <TextField fullWidth label="Ministry Details" name="ministryDetails" value={(applicationFormState as any).formData?.ministryDetails || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" name="ministry" value={(applicationFormState as any).formData?.ministry || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applicationFormState as any).formData?.place || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile Number" name="mobile" value={(applicationFormState as any).formData?.mobile || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Marriage */}
              <Section title="Marriage Details">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Marriage Date"
                    InputLabelProps={{ shrink: true }} name="marriageDate" value={(applicationFormState as any).formData?.marriageDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Marriage Solemnised By" name="solemnisedBy" value={(applicationFormState as any).formData?.solemnisedBy || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Place & Church" name="church" value={(applicationFormState as any).formData?.church || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Documents */}
              <Section title="Documents Attached">
                <Grid item xs={4}>
                  <TextField fullWidth label="Invitation Card" name="invitation" value={(applicationFormState as any).formData?.invitation || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={4}>
                  <TextField fullWidth label="Marriage Photo" name="photo" value={(applicationFormState as any).formData?.photo || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={4}>
                  <TextField fullWidth label="Marriage Certificate" name="certificate" value={(applicationFormState as any).formData?.certificate || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Financial */}
              <Section title="Financial Details">
                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" name="total" value={(applicationFormState as any).formData?.total || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applicationFormState as any).formData?.requested || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Funds Received (Church/Family/Loan)" name="received" value={(applicationFormState as any).formData?.received || ''} onChange={handleChange} />
                </Grid>
              </Section>

              {/* Recommendations */}
              <Section title="Recommendations">
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" value={(applicationFormState as any).formData?.supervisor || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Supervisor Name & Signature" name="supervisorSign" value={(applicationFormState as any).formData?.supervisorSign || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applicationFormState as any).formData?.coordinator || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Signature with Date" name="signDate" value={(applicationFormState as any).formData?.signDate || ''} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature(true)} startIcon={<AttachmentIcon />}>
                   Supervisor Signature
                  </Button>
                </Grid>
              </Section>

              {/* Declaration */}
              <Section title="Declaration">
                <Typography>
            I hereby declare that the information provided is true and correct.
                </Typography>

                {/* <Grid item xs={4}>
                  <TextField fullWidth label="Signature" name="signature" onChange={handleChange} />
                </Grid> */}

                <Grid item xs={6}>
                  <TextField fullWidth label="Name" name="declName" value={(applicationFormState as any).formData?.declName || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date"
                    InputLabelProps={{ shrink: true }} name="declDate" value={(applicationFormState as any).formData?.declDate || ''} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature0(true)} startIcon={<AttachmentIcon />}>
                    Signature
                  </Button>
                </Grid>
              </Section>

              {/* Office */}
              <Section title="Office Use Only">
                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Application Received On"
                    InputLabelProps={{ shrink: true }} name="receivedDate" value={(applicationFormState as any).formData?.receivedDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applicationFormState as any).formData?.sanctioned || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Fund Release Date" InputLabelProps={{ shrink: true }} name="releaseDate" value={(applicationFormState as any).formData?.releaseDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Applicant Informed Date" InputLabelProps={{ shrink: true }} name="informedDate" value={(applicationFormState as any).formData?.informedDate || ''} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature3(true)} startIcon={<AttachmentIcon />}>
                    Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature4(true)} startIcon={<AttachmentIcon />}>
                    Authorized Person Signature
                  </Button>
                </Grid>
              </Section>


            </Box>
          </Box>
        </DialogContent>
        <DialogActions>

          {/* <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button> */}
          <Grid item md={6}>

            <form
              onSubmit={
                forms.division &&
                action === 'add' ?
                  AddApplication :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    ApproveApplication :
                    EditApplication
              }
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'blue' }}
                onClick={() => {
                  if (!forms.division) {
                    setErr(true);
                  }
                }}
              >
                {action === 'add' ?
                  'Send to Hr' :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    'Submit' :
                    'Edit'}
              </Button>
            </form>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={form4} onClose={() => setForm4(false)} maxWidth="lg">
        <DialogTitle>Application Form</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 4 }}>
            <Paper sx={{ p: 4 }}>

              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
                <Typography variant="h5">Welfare Ministry</Typography>
                <Typography>Financial Assistance for medical treatment</Typography>
              </Paper>
              <Grid container spacing={2}>

                {/* Division */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Division" name="division" value={(applicationFormState as any).formData?.division || ''} onChange={handleChange} />
                </Grid>

                {/* Ailment */}
                <Grid item xs={3}>
                  <TextField fullWidth label="Ailment No" name="ailmentNo" value={(applicationFormState as any).formData?.ailmentNo || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={3}>
                  <TextField select fullWidth label="For" name="ailmentType" value={(applicationFormState as any).formData?.ailmentType || ''} onChange={handleChange}>
                    <MenuItem value="self" >Self</MenuItem>
                    <MenuItem value="spouse">Spouse</MenuItem>
                    <MenuItem value="children">Children</MenuItem>
                  </TextField>
                </Grid>

                {/* PERSONAL DETAILS */}
                <Grid item xs={12}>
                  <Typography variant="h6">Personal Details</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Name of Applicant" name="name" value={(applicationFormState as any).formData?.name || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Worker Code" name="workerCode" value={(applicationFormState as any).formData?.workerCode || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Welfare Scheme ID" name="schemeId" value={(applicationFormState as any).formData?.schemeId || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Joining Date"
                    InputLabelProps={{ shrink: true }} name="joiningDate" value={(applicationFormState as any).formData?.joiningDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name of Spouse" name="spouse" value={(applicationFormState as any).formData?.spouse || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Number of Children" name="children" value={(applicationFormState as any).formData?.children || ''} onChange={handleChange} />
                </Grid>

                {/* MINISTRY */}
                <Grid item xs={12}>
                  <Typography variant="h6">Ministry Details</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Present Ministry" name="ministry" value={(applicationFormState as any).formData?.ministry || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Place of Ministry" name="place" value={(applicationFormState as any).formData?.place || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile Number" name="mobile" value={(applicationFormState as any).formData?.mobile || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Email ID" name="email" value={(applicationFormState as any).formData?.email || ''} onChange={handleChange} />
                </Grid>

                {/* MEDICAL */}
                <Grid item xs={12}>
                  <Typography variant="h6">Medical Details</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Details of Sickness" name="sickness" value={(applicationFormState as any).formData?.sickness || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth label="Date Treatment Started" InputLabelProps={{ shrink: true }}
                    name="treatmentDate" value={(applicationFormState as any).formData?.treatmentDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hospital Name" name="hospital" value={(applicationFormState as any).formData?.hospital || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Doctor Name" name="doctor" value={(applicationFormState as any).formData?.doctor || ''} onChange={handleChange} />
                </Grid>

                {/* FINANCIAL */}
                <Grid item xs={12}>
                  <Typography variant="h6">Financial Details</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Bills Attached" name="bills" value={(applicationFormState as any).formData?.bills || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Doctor Fee (Rs)" name="doctorFee" value={(applicationFormState as any).formData?.doctorFee || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Hospital Charges (Rs)" name="hospitalCharges" value={(applicationFormState as any).formData?.hospitalCharges || ''} onChange={handleChange} />
                </Grid>


                <Grid item xs={6}>
                  <TextField select fullWidth label="Investigations (Rs)" name="investigation" value={(applicationFormState as any).formData?.investigation || ''} onChange={handleChange}>
                    <MenuItem value="self">Lab</MenuItem>
                    <MenuItem value="son">Blood</MenuItem>
                    <MenuItem value="daughter">X-ray</MenuItem>
                    <MenuItem value="daughter">MRI</MenuItem>
                    <MenuItem value="daughter">Others</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Medicines (Rs)" name="medicines" value={(applicationFormState as any).formData?.medicines || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Other Expenses (Rs)" name="other" value={(applicationFormState as any).formData?.other || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Total Expenses (Rs)" name="total" value={(applicationFormState as any).formData?.total || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Requested Amount (Rs)" name="requested" value={(applicationFormState as any).formData?.requested || ''} onChange={handleChange} />
                </Grid>


                <Grid item xs={6}>
                  <TextField select fullWidth label="Funds Received From" name="received" value={(applicationFormState as any).formData?.received || ''} onChange={handleChange}>
                    <MenuItem value="self" >Church</MenuItem>
                    <MenuItem value="son">Family</MenuItem>
                    <MenuItem value="daughter">Friends</MenuItem>
                    <MenuItem value="daughter">NGO</MenuItem>
                    <MenuItem value="daughter">Gvt</MenuItem>
                  </TextField>
                </Grid>

                {/* RECOMMENDATION */}
                <Grid item xs={12}>
                  <Typography variant="h6">Recommendations</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" value={(applicationFormState as any).formData?.supervisor || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Name & Signature" name="supervisorSign" value={(applicationFormState as any).formData?.supervisorSign || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" value={(applicationFormState as any).formData?.coordinator || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Recommendation Amount (Rs)" name="recommend" value={(applicationFormState as any).formData?.recommend || ''} onChange={handleChange} />
                </Grid>

                {/* <Grid item xs={3}>
                  <TextField fullWidth label="Signature" name="signature" onChange={handleChange} />
                </Grid> */}

                <Grid item xs={3}>
                  <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} name="date" value={(applicationFormState as any).formData?.date || ''} onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature(true)} startIcon={<AttachmentIcon />}>
                    Signature
                  </Button>
                </Grid>
                {/* OFFICE */}
                <Grid item xs={12}>
                  <Typography variant="h6">Office Use Only</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Application Received On" InputLabelProps={{ shrink: true }} name="receivedDate" value={(applicationFormState as any).formData?.receivedDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Amount Sanctioned" name="sanctioned" value={(applicationFormState as any).formData?.sanctioned || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Fund Release Date" InputLabelProps={{ shrink: true }} name="releaseDate" value={(applicationFormState as any).formData?.releaseDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  <TextField type="date" fullWidth
                    label="Applicant Informed Date" InputLabelProps={{ shrink: true }} name="informedDate" value={(applicationFormState as any).formData?.informedDate || ''} onChange={handleChange} />
                </Grid>

                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature3(true)} startIcon={<AttachmentIcon />}>
                    Dealing Person Signature
                  </Button>
                </Grid> <Grid item md={6}>
                  <Button variant="contained" onClick={() => setForm1Signature4(true)} startIcon={<AttachmentIcon />}>
                    Authorized Person Signature
                  </Button>
                </Grid>

                {/* Submit */}


              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button> */}
          <Grid item md={6}>

            <form
              onSubmit={
                forms.division &&
                action === 'add' ?
                  AddApplication :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    ApproveApplication :
                    EditApplication
              }
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'blue' }}
                onClick={() => {
                  if (!forms.division) {
                    setErr(true);
                  }
                }}
              >
                {action === 'add' ?
                  'Send to Hr' :
                  Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_DIVISION ||
        Number(applicationFormState.status) === ApplicationLifeCycleStates.REVERT_TO_HR ?
                    'Submit' :
                    'Edit'}
              </Button>
            </form>
          </Grid>
        </DialogActions>
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
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
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
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
        maxItemSize: 6 * MB,
                  maxItemCount: 10,
                  maxTotalSize: 30 * MB,
        }}
        open={form1Signature}
        onClose={() => setForm1Signature(false)}

        getFiles={forms?.SupervisorSignature || (applicationFormState as any).formData?.SupervisorSignature || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        // 1. Update `forms` — append new item to SupervisorSignature array
        setForms((prev: any) => ({
          ...prev, // keep all other fields
          SupervisorSignature: [
            ...(prev.SupervisorSignature || []), // keep existing array (or empty if null/undefined)
            res.data, // append the new item
          ],
        }));

        // 2. Update `applicationsNames` — append only the filename
        setApplicationFormState({
          ...applicationFormState as any, // keep all top-level fields
          formData: {
            ...(applicationFormState as any).formData, // keep all existing formData fields
            SupervisorSignature: [
              ...((applicationFormState as any).formData?.SupervisorSignature || []), // keep existing files
              res.data, // append new file
            ],
          },
        });
        return res;
      })
        }


        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}
        deleteFile={(fileId) => {
          setForms((prev: any) => ({
            ...prev,
            signature: (prev.signature || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        open={form1Signature0 }
        onClose={() => setForm1Signature0(false)}

        getFiles={forms?.Signature || (applicationFormState as any).formData?.Signature || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        setForms((prev: any) => ({
          ...prev,
          Signature: [...(prev.Signature || []), res.data],
        }));
        return res;
      })
        }

        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}

        deleteFile={(fileId) => {
          setForms((prev: any) => ({
            ...prev,
            signature: (prev.signature || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        open={form1Signature2}
        onClose={() => setForm1Signature2(false)}

        getFiles={forms?.signatureOfStudent ||  (applicationFormState as any).formData?.signatureOfStudent || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        setForms((prev: any) => ({
          ...prev,
          signatureOfStudent: [...(prev.signatureOfStudent || []), res.data],
        }));

        setApplicationFormState({
          ...applicationFormState as any, // keep all top-level fields
          formData: {
            ...(applicationFormState as any).formData, // keep all existing formData fields
            signatureOfStudent: [
              ...((applicationFormState as any).formData?.signatureOfStudent || []), // keep existing files
              res.data, // append new file
            ],
          },
        });
        return res;
      })
        }

        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}

        deleteFile={(fileId) => {
          setForms((prev: any) => ({
            ...prev,
            signature: (prev.signature || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        open={form1Signature3}
        onClose={() => setForm1Signature3(false)}

        getFiles={forms?.DealingPersonSignature ||  (applicationFormState as any).formData?.DealingPersonSignature || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        setForms((prev: any) => ({
          ...prev,
          DealingPersonSignature: [...(prev.DealingPersonSignature || []), res.data],
        }));
        // return res;
        setApplicationFormState({
          ...applicationFormState as any, // keep all top-level fields
          formData: {
            ...(applicationFormState as any).formData, // keep all existing formData fields
            DealingPersonSignature: [
              ...((applicationFormState as any).formData?.DealingPersonSignature || []), // keep existing files
              res.data, // append new file
            ],
          },
        });
        return res;
      })
        }

        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}

        deleteFile={(fileId) => {
          setForms((prev: any) => ({
            ...prev,
            signature: (prev.signature || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Signature"
        action="add"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',
        ]}
        limits={{
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        open={form1Signature4}
        onClose={() => setForm1Signature4(false)}

        getFiles={forms?.AuthorizedPersonSignature || (applicationFormState as any).formData?.AuthorizedPersonSignature || []}

        uploadFile={(file, onProgress) =>
          FileUploaderServices.uploadFile(file, onProgress, 'Applications', file.name)
      .then((res) => {
        setForms((prev: any) => ({
          ...prev,
          AuthorizedPersonSignature: [...(prev.AuthorizedPersonSignature || []), res.data],
        }));
        setApplicationFormState({
          ...applicationFormState as any, // keep all top-level fields
          formData: {
            ...(applicationFormState as any).formData, // keep all existing formData fields
            AuthorizedPersonSignature: [
              ...((applicationFormState as any).formData?.AuthorizedPersonSignature || []), // keep existing files
              res.data, // append new file
            ],
          },
        });
        return res;
      })
        }

        // renameFile={(fileId, newName) => {
        //   setFormData((prev: any) => ({
        //     ...prev,
        //     signature: (prev.signature || []).map((file: any) =>
        //       file._id === fileId ? { ...file, filename: newName } : file
        //     ),
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}

        deleteFile={(fileId) => {
          setForms((prev: any) => ({
            ...prev,
            signature: (prev.signature || []).filter(
              (file: any) => file._id !== fileId,
            ),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />


      <Grid item xs={12} md={12}>
        <Card sx={{ maxWidth: '78vw', alignItems: 'center' }}>
          <Grid container spacing={0} justifyContent="space-between" padding={2}>
            <Grid container spacing={2} alignItems="center">

              {/* LEFT - SEARCH */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchText}
                  onChange={handleSearchChange}
                  fullWidth
                />
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
                              Number(application.status) == CommonLifeCycleStates.CREATED ? 'WAITING FOR HR' :
                                Number(application.status) == CommonLifeCycleStates.ACTIVE ? 'WAITING FOR PRESIDENT' :
                                  Number(application.status) == CommonLifeCycleStates.APPROVED ? 'APPROVED' :
                                    Number(application.status) == CommonLifeCycleStates.REJECTED ? 'REJECTED':
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
                          setApplicationFormState({
                            applicationCode: '',
                            name: '',
                            reason: '',
                            status: '',
                            attachment: [],
                          });
                        }}
                      >
                      Add new
                      </Button>
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
                          setShowApplicationFormDialog1(true);
                          setAction('add');
                          setApplicationFormState({
                            applicationCode: '',
                            name: '',
                            reason: '',
                            status: '',
                            attachment: [],
                          });
                        }}
                      >
                      Apply Welfare
                      </Button>
                    )}
                  />
                </>
              </Grid>
              {/* RIGHT - FILTER */}
              {props.action =='manage' &&(

                <Grid item xs={12} md={12}>
                  <Box >
                    <Card elevation={2}>
                      <CardContent sx={{ p: 1 }}>
                        <ToggleButtonGroup
                          exclusive
                          size="medium"
                          value={
                            statusFilter.includes(ApplicationLifeCycleStates.APPROVED) ?
                              'a2' :
                              statusFilter.includes(ApplicationLifeCycleStates.REJECTED) ?
                                '`a3`' :
                                statusFilter.includes(ApplicationLifeCycleStates.CREATED) ?
                                  'a4' :
                                  statusFilter.includes(ApplicationLifeCycleStates.SENT_TO_PRESIDENT) ?
                                    'a5' :
                                    statusFilter.includes(ApplicationLifeCycleStates.REVERT_TO_HR) ?
                                      'a7' :
                                      statusFilter.includes(ApplicationLifeCycleStates.REVERT_TO_DIVISION) ?
                                        'a8' :
                                        statusFilter.includes(70) ?
                                          'a6' :
                                          'a1'
                          }
                          onChange={(_, val) => {
                            if (!val) return;
                            setStatusFilter(
                              val === 'a2' ?
                                [ApplicationLifeCycleStates.APPROVED] :
                                val === 'a3' ?
                                  [ApplicationLifeCycleStates.REJECTED] :
                                  val === 'a4' ?
                                    [ApplicationLifeCycleStates.CREATED] :
                                    val === 'a5' ?
                                      [ApplicationLifeCycleStates.SENT_TO_PRESIDENT] :
                                      val === 'a6' ?
                                        [70] :
                                        val === 'a7' ?
                                          [ApplicationLifeCycleStates.REVERT_TO_HR] :
                                          val === 'a8' ?
                                            [ApplicationLifeCycleStates.REVERT_TO_DIVISION] :
                                            [],
                            );
                          }}
                          sx={{ whiteSpace: 'nowrap' }}
                        >
                          <ToggleButton value="a1">All</ToggleButton>
                          <ToggleButton value="a2">Approved</ToggleButton>
                          <ToggleButton value="a3">Reject</ToggleButton>
                          <ToggleButton value="a4">Waiting For Hr</ToggleButton>
                          <ToggleButton value="a5">Waiting For President</ToggleButton>
                          <ToggleButton value="a6">Sanctioned</ToggleButton>
                          <ToggleButton value="a7">REVERTED TO HR</ToggleButton>
                          <ToggleButton value="a8">REVERTED TO DIVISION</ToggleButton>
                        </ToggleButtonGroup>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              )}

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
                    '& .orange': {
                      backgroundColor: '#00897B',
                      color: '#fff',
                      fontWeight: '600',
                    },
                    '& .green': {
                      backgroundColor: '#7EC82F',
                      color: '#fff',
                      fontWeight: '600',
                    },
                    '& .red': {
                      backgroundColor: '#E2445C',
                      color: '#fff',
                      fontWeight: '600',
                    },
                    '& .HR': {
                      backgroundColor: '#3b32e6',
                      color: '#fff',
                      fontWeight: '600',
                    },
                    '& .HRRevert': {
                      backgroundColor: '#c323f3',
                      color: '#fff',
                      fontWeight: '600',
                    },
                    '& .RevertDivision': {
                      backgroundColor: '#003764',
                      color: '#fff',
                      fontWeight: '600',
                    },
                  }}
                >


                  <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={applications === null}
                    getRowClassName={(params) => {
                      console.log('looh88', params.row.presidentSanction);

                      if (params.row.presidentSanction == true) {
                        return 'special-sanction'; // Class for rows with special sanction
                      }
                      return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>

        </Card>

      </Grid>
      <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
        <DialogContent>
          <Typography sx={{ color: 'red' }}>{'Are you sure you want to delete this Application ?'}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setDeleteModel(false)}>Close</Button>
          <Button
            endIcon={<Delete />}
            variant="contained"
            color="info"
            onClick={async () => {
              removeDivisions(statusId);
            } }
          >
                 Delete
          </Button>
        </DialogActions>

      </Dialog>
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>Remark</DialogTitle>
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
