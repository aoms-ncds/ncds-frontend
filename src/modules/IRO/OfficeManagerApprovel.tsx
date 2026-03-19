/* eslint-disable max-len */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Alert, Typography, Divider, Box, Tooltip, FormControl, FormControlLabel, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Checkbox, InputLabel, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// eslint-disable-next-line max-len
import {
  Edit as EditIcon,
  Print as PrintIcon,
  AttachFile as AttachmentIcon,
  Preview as PreviewIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { enqueueSnackbar } from 'notistack';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import IROServices from './extras/IROServices';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import moment from 'moment';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import ReleaseAmount from './components/ReleaseAmountDialog';
import EditNoteIcon from '@mui/icons-material/EditNote';
import * as XLSX from 'xlsx';
import clsx from 'clsx';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import DivisionsServices from '../Divisions/extras/DivisionsServices';

const OfficeMangerApprove = (props: { action: 'manage' | 'release' }) => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [showHRFileUploader, setShowHRFileUploader] = useState(false);
  const [showAccountFileUploader, setShowAccountFileUploader] = useState(false);
  const [showAccountManagerFileUploader, setShowAccountManagerFileUploader] = useState(false);
  const [attachment, setAttachment] = useState<boolean>(false);
  const [sendNotification, toggleSendNotification] = useState<boolean>(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [addSignature, toggleAddSignature] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| 'Sanctioned'| null>('All'); // default WFA: Waiting for access or Reverted
  const toggleSx = {
    'border': '1px solid #dcdcdc',
    'borderRadius': 1,
    'overflow': 'hidden',
    'display': 'flex',
    '& .MuiToggleButton-root': {
      'border': 'none',
      'borderRight': '1px solid #dcdcdc',
      'textTransform': 'none',
      'fontSize': '0.85rem',
      'fontWeight': 500,
      'px': 2.5,
      'whiteSpace': 'nowrap',
      'minHeight': 36,
      '&:last-of-type': {
        borderRight: 'none',
      },
      '&.Mui-selected': {
        backgroundColor: '#eaeaea',
        color: '#000',
      },
    },
  };
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [divisionSearch, setDivisionSearch] = useState('');

  const [selectedIRO, setSelectedIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: 'Division',
    status: CommonLifeCycleStates.ACTIVE,
    kind: 'IRO',
    sanctionedAmount: 0,
    sanctionedAsPer: '',
    sanctionedBank: '',
    mainCategory: '',
    particulars: [],
    releaseAmount: {
      _id: '',
      modeOfPayment: '',
      releaseAmount: 0,
      transactionNumber: '',
      transferredAmount: 0,
      transferredDate: null,
      transferredBank: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
      },
      attachment: [],
      division: '',
    },
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
    createdBy: {
      workerCode: '',
      kind: 'worker',
      tokens: [],
      basicDetails: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        permanentAddress: {},
        currentOfficialAddress: {},
        residingAddress: {},
        dateOfBirth: moment(),
      },
      officialDetails: {
        divisionHistory: [],
        remarks: '',
        status: null,
        noOfChurches: 0,
      },
      supportDetails: {
        selfSupport: true,
        percentageofSelfSupport: 0,
        // totalNoOfYearsInMinistry: 10,
        withChurch: true,
      },
      supportStructure: {
        basic: 0,
        HRA: 0,
        spouseAllowance: 0,
        positionalAllowance: 0,
        specialAllowance: 0,
        impactDeduction: 0,
        telAllowance: 0,
        PIONMissionaryFund: 0,
        MUTDeduction: 0,
      },
      children: [],
      _id: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
    createdAt: moment(),
    updatedAt: moment(),
    billAttachment: [],
    signature: {},
    specialsanction: '',
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [openRelease, setOpenRelease] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>([]);
  const [fileUploaderAction, setFileUploaderAction] = useState<'add' | 'manage'>('add');
  const [statusFilter, setStatusFilter] = useState([IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR, IROLifeCycleStates.IRO_IN_PROCESS]); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted
  const [divisions, setDivisions] = useState<string[]>([]);
  useEffect(() => {
    DivisionsServices.getDivisions().then((res) => {
      const names = res.data.map((d: any) => d.details.name);
      setDivisions(names);
    });
  }, []);
  const handleDivisionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    if (value.includes('__ALL__')) {
      setSelectedDivisions([]); // empty = show all
      return;
    }
    setSelectedDivisions(value);
  };
  const filteredDivisions = divisions.filter((name) =>
    name
    .toLowerCase()
    .replace(/\s/g, '') // remove spaces
    .includes(divisionSearch.toLowerCase().replace(/\s/g, '')),
  );
  // const userPermissions = (user.user as User)?.permissions;
  //   useEffect(() => {
  //     if (props.action === 'release') {
  //       if (userPermissions?.FCRA_ACCOUNTS_ACCESS) {
  //         IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'FCRA' })
  //         .then((res) => {
  //           setIROrder(() => [...res.data]);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //       }
  //       if (userPermissions?.LOCAL_ACCOUNT_ACCESS) {
  //         IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Local Bank' })
  //         .then((res) => {
  //           setIROrder(() => [...res.data]);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //       }
  //       if (userPermissions?.PERSONAL_ACCOUNTS_ACCESS) {
  //         IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Personal Bank' })
  //         .then((res) => {
  //           setIROrder(() => [...res.data]);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //       }
  //       if (userPermissions?.PERSONAL_ACCOUNTS_ACCESS && userPermissions?.LOCAL_ACCOUNT_ACCESS && userPermissions?.FCRA_ACCOUNTS_ACCESS ) {
  //         IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE })
  //         .then((res) => {
  //           setIROrder(res.data);
  //         });
  //       }
  //     } else {
  //       IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR})
  //       .then((res) => {
  //         setIROrder(res.data);
  //       });
  //     }
  //   }, [openRelease, attachment, addSignature]);

  // Rest of your component code...

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (IROrder ?? []).filter((row) => {
    const divisionMatch = selectedDivisions.length === 0 ||
    selectedDivisions.includes(row?.division?.details.name?? '');
    if (!searchText) return divisionMatch;
    const searchLower = searchText.toLowerCase();

    const searchMatch =
    (row.IROno && row.IROno.toLowerCase().includes(searchLower)) ||
    (row.IRODate && row.IRODate.format('DD/MM/YYYY').toLowerCase().includes(searchLower)) ||
    (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchLower)) ||
    (row.purposeSubdivision?.name && row.purposeSubdivision.name.toLowerCase().includes(searchLower)) ||
    // Add subCategory search
    (row.particulars && row.particulars.some((particular:any) =>
      (particular.subCategory1 && particular.subCategory1.toLowerCase().includes(searchLower)) ||
      (particular.subCategory2 && particular.subCategory2.toLowerCase().includes(searchLower)) ||
      (particular.subCategory3 && particular.subCategory3.toLowerCase().includes(searchLower)),
    )) ||
    // Add mainCategory search
    (row.particulars && row.particulars.some((particular:any) =>
      particular.mainCategory && particular.mainCategory.toLowerCase().includes(searchLower),
    )) ||
    // Add beneficiary name search
    (row.sanctionedBank && row.sanctionedBank.toLowerCase().includes(searchLower));

    return divisionMatch && searchMatch;
  });
  if (searchText && filteredRows.length ===0) {
    enqueueSnackbar({
      message: ` ${searchText} not found`,
      variant: 'warning',
    });
  }
  useEffect(() => {
    IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter })
      .then((res) => {
        setIROrder(res.data);
      });
  }, [dateRange, statusFilter, exstatusFilter]);
  useEffect(() => {
    IROServices.getAllOptimized({ dateRange: dateRange, status: statusFilter })
      .then((res) => {
        setIROrder(res.data);
      });
  }, []);
  useEffect(() => {
    IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1 })
      .then((res) => {
        setIROrder(res.data);
      });
  }, [statusFilter1]);

  useEffect(() => {
    if (selectedIRO._id != '') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [selectedIRO.billAttachment]);
  useEffect(() => {
    if (selectedIRO._id != '') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [selectedIRO]);

  useEffect(() => {
    if (selectedIRO._id != '') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [selectedIRO.signature]);


  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      width: 70,
      align: 'center',
      renderHeader: () => <b>Action</b>,

      headerAlign: 'center',
      type: 'string',
      renderCell: (params) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            {
              id: 'View',
              text: 'View & Manage',
              // component: Link,
              // to: `/iro/${params.row._id}`,
              onClick: () => {
                window.open( `/iro/${params.row._id}`, '_blank');
              },
              icon: PreviewIcon,
            },
            {
              id: 'View',
              text: 'View Fr ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(params.row as any).FR._id}/view`, '_blank');
              },

            },
            ...(hasPermissions(['OFFICE_MNGR_ACCESS']) ?
              [
                {
                  id: 'edit',
                  text: 'Edit',
                  component: Link,
                  // to: `/iro/${params.row._id}/edit`,
                  onClick: () => {
                    window.open(`/iro/${params.row._id}/edit`, '_blank');
                  },
                  icon: EditIcon,
                },
              ] :
              []),
            ...(params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE && props.action == 'release' ?
              [
                {
                  id: 'Release',
                  text: 'Release Amount',
                  component: Link,
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([params.row])],
                  icon: CurrencyRupeeIcon,
                },
                {
                  id: 'Close IRO',
                  text: 'Close IRO',
                  icon: PreviewIcon,
                  onClick: () => {
                    IROServices.close(params.row._id)
                      .then((res) => {
                        // if (IROrder) {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        const filterIRO = IROrder?.filter((iro) => {
                          return iro._id !== params.row._id;
                        });
                        setIROrder(filterIRO);
                        // }

                        enqueueSnackbar({
                          message: res.message,
                          variant: 'success',
                        });
                      })
                      .catch((err) => {
                        enqueueSnackbar({
                          message: err.message,
                          variant: 'error',
                        });
                      });
                  },
                },
              ] :
              []),
            ...(params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Release',
                  text: 'View Release Amount',
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([params.row])],
                  icon: PreviewIcon,
                },
              ] :
              []),

            {
              id: 'remarks',
              text: 'Remarks',
              icon: EditNoteIcon,

              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedIROId(params.row._id);
                IROServices.getAllRemarksById(params.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              // onClick: () => {
              //   toggleOpenRemarks(true);
              //   IROServices.getAllRemarksById(params.row._id)
              //     .then((res: any) => {
              //       if (Array.isArray(res.data)) {
              //         setRemarks(res.data);
              //       } else {
              //         console.error('Invalid remarks data:', res.data);
              //       }
              //     })
              //     .catch((error: { message: any }) => {
              //       enqueueSnackbar({
              //         variant: 'error',
              //         message: error.message,
              //       });
              //     });
              // },
            },
            ...(params.row.status === IROLifeCycleStates.IRO_CLOSED || params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE ? [
              {
                id: 'print',
                text: 'Print IRO',
                icon: PrintIcon,
                component: PDFDownloadLink,
                document: <IROReceiptTemplate rowData={params.row} />,
                fileName: 'IROReceipt.pdf',
              }] : []),
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedIROId(params.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
            },
            {
              id: 'log',
              text: 'IRO Log',
              icon: PreviewIcon,
              onClick: () => {
                setSelectedIROId(params.row._id);
                setOpenLog(true);
              },
            },
            {
              id: 'log',
              text: 'FR Log',
              icon: PreviewIcon,
              onClick: () => {
                setSelectedIROId((params.row.FR as any)?._id);
                setOpenLog(true);
              },
            },
            // {
            //   id: 'signature',
            //   text: 'Add signature',
            //   onClick: () => {
            //     setSelectedIROId(params.row._id);
            //     setSelectedIRO(params.row);
            //     toggleAddSignature(true);
            //   },
            //   icon: FingerprintIcon,
            // },
            ...(hasPermissions(['WRITE_IRO']) && params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Attachments',
                  text: 'Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setAttachment(true);
                    setFileUploaderAction('add');
                    setSelectedIRO(params.row);
                  },
                },
              ] :
              []),
            // {
            //   id: 'Send Back',
            //   text: 'Send Back',
            //   icon: ReplyIcon,
            //   onClick: ()=>{
            //     IROServices.
            //     sendBack(params.row._id)
            //     .then((res)=>{
            //       if (IROrder) {
            //         // eslint-disable-next-line @typescript-eslint/naming-convention
            //         const filterIRO = IROrder?.filter((IROrders) => {
            //           return IROrders._id !== params.row._id;
            //         });
            //         setIROrder(filterIRO);
            //       }
            //
            //       enqueueSnackbar({
            //         message: res.message,
            //         variant: 'success',
            //       });
            //     })

            //     .catch((err) => {
            //       enqueueSnackbar({
            //         message: err.message,
            //         variant: 'error',
            //       });
            //     });
            //   },
            // },
          ]}
        />
      ),
    },
    // {
    //   field: 'status',
    //   renderHeader: () => <b>Status</b>,
    //   width: 250,
    //   align: 'center',
    //   headerAlign: 'center',
    //   cellClassName: (params) => {
    //     const statusName = params.formattedValue;
    //     if (params.value == null) {
    //       return '';
    //     }
    //     switch (statusName) {
    //     case 'WAITING FOR APPROVAL':
    //       return clsx('yellow-light');
    //     case 'WAITING FOR ACCOUNTS MNGR':
    //       return clsx('yellow-dark');
    //     case 'IRO APPROVED':
    //       return clsx('orange-light');
    //     case 'WAITING FOR RELEASE AMOUNT':
    //       return clsx('orange-dark');
    //     case 'AMOUNT RELEASED':
    //       return clsx('green-light');
    //     case 'RECONCILIATION DONE':
    //       return clsx('green-medium');
    //     case 'IRO CLOSED':
    //       return clsx('green-dark');
    //     case 'IRO DISAPPROVED':
    //       return clsx('red-light');
    //     case 'IRO IN PROCESS':
    //       return clsx('dark-orange');
    //     default:
    //       // console.log('No class applied');
    //       return '';
    //     }
    //   },

    //   valueGetter: (params) => {
    //     let statusName = IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
    //     // Check if the status name needs to be changed
    //     console.log(statusName, 'sjhivi');
    //     switch (statusName) {
    //     case 'SEND_BACK':
    //       statusName = 'REVERTED';
    //       break;
    //     case 'FR_APPROVED':
    //       statusName = 'FR VERIFIED'; // Change to whatever new name you want
    //       break;
    //     case 'FR_REJECTED':
    //       statusName = 'IRO DISAPPROVED'; // Change to whatever new name you want
    //       break;
    //     case 'WAITING_FOR_OFFICE_MNGR':
    //       statusName = 'WAITING FOR APPROVAL'; // Change to whatever new name you want
    //       break;
    //     case 'WAITING_FOR_ACCOUNTS_STATE':
    //       statusName = 'IRO APPROVED'; // Change to whatever new name you want
    //       break;
    //     case 'IRO_IN_PROCESS':
    //       statusName = 'IRO IN PROCESS'; // Change to whatever new name you want
    //       break;
    //       // case 'WAITING_FOR_ACCOUNTS_MNGR':
    //       //   statusName = 'WAITING FOR ACCOUNTS MNGR';
    //       //   if (props.action === 'release') {
    //       //     statusName = 'WAITTING FOR RELEASE AMOUNT'; // Change to whatever new name you want
    //       //   }
    //       break;
    //       // Add more cases for other status names you want to change
    //     default:
    //       statusName = statusName.replaceAll('_', ' ');
    //       break;
    //     }
    //     return statusName;
    //   },
    // },
    { field: 'IROno', headerName: 'IRO No', width: 130, renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'IRODate',
      headerName: 'IRO Date',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => <b>Division Name</b>,
      // renderCell: (props) => <p> {props.row.division?.details.name}</p>,
      valueGetter: (params) => params.row.division?.details.name,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },

    {
      field: 'subDivisionName',
      renderHeader: () => <b>Sub Division Name</b>,
      // renderCell: (props) => <p> {props.row.purposeSubdivision?.name}</p>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,

      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'mainCategory',
      renderHeader: () => (<b>Main Category</b>),
      width: 240,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {props.row.mainCategory}
        </p>
      ),
    },
    {
      field: 'subCategory',
      renderHeader: () => <b>Sub Category</b>,
      width: 240,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        const subCategory3 = params.row.particulars[0]?.subCategory3;
        const subCategory2 = params.row.particulars[0]?.subCategory2;
        const subCategory1 = params.row.particulars[0]?.subCategory1;
        if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '') {
          return subCategory3;
        } else if (subCategory2 && subCategory2 !== 'Select' && subCategory2 !== '') {
          return subCategory2;
        } else {
          return subCategory1;
        }
      },
      renderCell: (params) => {
        return (
          <p
            style={{
              maxWidth: 240,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {params.value}
          </p>
        );
      },
    },
    {
      field: 'requestAmount',
      headerName: 'Requested Amount',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      valueGetter(params) {
        const IRORequest = params.row as IROrder;
        const particularAmount = IRORequest.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0);
        return particularAmount.toFixed(2);
      },
    },
    // {
    //   field: 'updatedAt',
    //   headerName: 'Last Updated',
    //   width: 130,
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    // { field: 'sanction', headerName: 'Special Sanction', width: 150, renderHeader: () => <b>Special Sanction</b>, align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 150,
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount;
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0).toFixed(2);
        }
        return 0; // or return a suitable default value
      }, renderHeader: () => <b>Sanctioned Amount</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'specialsanction',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sanction as per</b>,
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 200,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {' '}
          {props.row.specialsanction == 'Yes'? 'President': 'No'}
        </p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 150, renderHeader: () => <b>Sanctioned Bank</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <CommonPageLayout title={'Office Manager Verify '} status={'WAITING FOR APPROVAL'} momentFilter={

      {
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setIROrder((iroReq) => (iroReq ? iroReq.filter((iro) => iro.IRODate.isSameOrAfter(newDateRange.startDate) && iro.IRODate.isSameOrBefore(newDateRange.endDate)) : []));
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }

    }>
      <PermissionChecks
        permissions={['READ_IRO']}
        granted={
          <>
            <Card sx={{ maxWidth: '78vw', height: '100vh', alignItems: 'center' }}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={6}>
                  {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    placeholder='Enter IROno or IRODate or Division or SubCategory'
                    onChange={handleSearchChange}
                    fullWidth
                    // style={{ width: '80%' }}
                  />
                  {/* </div> */}
                </Grid>
                <Grid item xs={6}>
                  {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                  {hasPermissions(['MANAGE_IRO']) && (
                    <Grid item xs={12} md="auto" sx={{
                      display: 'flex',
                      alignItems: 'center', // ✅ vertical center
                    }}>
                      <FormControl
                        sx={{
                          'minWidth': 200,
                          '& .MuiOutlinedInput-root': {
                            // height: 45, // ✅ control select height
                            fontSize: 13,
                            borderRadius: 1.5,
                          },
                        }}
                      >
                        <InputLabel id="division-label">
                    Division
                        </InputLabel>
                        <Select
                          multiple
                          value={selectedDivisions}
                          label="Division"
                          onChange={handleDivisionChange}
                          renderValue={(selected) =>
                            selected.length === 0 ? 'None' : selected.join(', ')
                          }
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 300, width: 250 },
                            },
                          }}
                        >
                          <ListSubheader>
                            <TextField
                              size="small"
                              placeholder="Search division..."
                              fullWidth
                              autoFocus
                              value={divisionSearch}
                              onChange={(e) => setDivisionSearch(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </ListSubheader>

                          <MenuItem value="__ALL__">
                            <Checkbox checked={selectedDivisions.length === 0} />
                            <ListItemText primary="None" />
                          </MenuItem>

                          {filteredDivisions.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={selectedDivisions.includes(name)} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  wrap="wrap"
                >
                  {/* ================= LEFT FILTERS ================= */}
                  <Grid item xs={12} md>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        pl: 2,
                      }}
                    >
                      {/* -------- STATUS FILTER -------- */}
                      <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={exstatusFilter.includes(69) ? 'NonBankTransfers' :exstatusFilter.includes(70) ? 'BankTransfers' :'All'}
                        onChange={(_, value) => {
                          if (!value) return;

                          if (value === 'NonBankTransfers') {
                            setExStatusFilter([69]);
                          } else if (value === 'BankTransfers') {
                            setExStatusFilter([70]);
                          } else {
                            setExStatusFilter([]);
                            setStatusFilter([
                              IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR,
                              IROLifeCycleStates.IRO_IN_PROCESS,
                            ]);
                          }
                        }}
                        sx={toggleSx}
                      >
                        <ToggleButton value="All">ALL</ToggleButton>
                        <ToggleButton value="NonBankTransfers">
          NON BANK TRANSFERS
                        </ToggleButton>
                        <ToggleButton value="BankTransfers">
          BANK TRANS.               </ToggleButton>
                      </ToggleButtonGroup>

                      {/* -------- CATEGORY FILTER -------- */}
                      <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={statusFilter1}
                        onChange={(_, value) => {
                          if (!value) return;

                          setStatusFilter1(
                            value === 'Support' ?
                              'Support' :
                              value === 'Sanctioned' ?
                                'Sanctioned' :
                                value === 'Expanse' ?
                                  'Expanse' :
                                  'All',
                          );
                        }}
                        sx={toggleSx}
                      >
                        <ToggleButton value="All">ALL </ToggleButton>
                        <ToggleButton value="Support">SUPPORT</ToggleButton>
                        <ToggleButton value="Expanse">EXPENSE</ToggleButton>
                        <ToggleButton value="Sanctioned">SANCTIONED</ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Grid>

                  {/* ================= EXPORT BUTTON ================= */}
                  <Grid
                    item
                    xs={12}
                    md="auto"
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    }}
                  >
                    <Button
                      onClick={async () => {
                        const sheet = IROrder ?
                          IROrder.map((iro: IROrder) => [
                            iro.IROno,
                            iro.IRODate.format('DD/MM/YYYY'),
                            iro.division?.details.name,
                            iro.purposeSubdivision?.name,
                            iro.mainCategory,
                            iro.particulars?.reduce(
                              (total, particular) =>
                                total + Number(particular.requestedAmount),
                              0,
                            ),
                            iro.sanctionedAmount,
                            iro.sanctionedBank,
                            iro.sanctionedAsPer,
                            IROLifeCycleStates.getStatusNameByCodeTransaction(
                              iro.status,
                            ).replaceAll('_', ' '),
                          ]) :
                          [];

                        const headers = [
                          'IRO No',
                          'Date',
                          'Division',
                          'Sub Division',
                          'Main Category',
                          'Requested Amt',
                          'Sanctioned Amt',
                          'Sanctioned Bank',
                          'Sanctioned As per',
                          'Status',
                        ];

                        const worksheet = XLSX.utils.json_to_sheet(sheet);
                        const workbook = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                        XLSX.writeFile(workbook, 'IRO_Office_Mngr.xlsx', {
                          compression: true,
                        });
                      }}
                      startIcon={<DownloadIcon />}
                      variant="contained"
                    >
      Export
                    </Button>
                  </Grid>
                </Grid>

                <br />
                <br />
                <br />
                <Box
                  sx={{
                    'height': 100,
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
                      backgroundColor: '#DEDAFF',
                    },
                    '& .odd': {
                      backgroundColor: '#fff',
                    },
                    '& .orange-light': {
                      backgroundColor: '#ffa500', /* Light orange */
                    },
                    '& .orange-dark': {
                      backgroundColor: '#cc8400', /* Darker orange */
                    },
                    '& .yellow-light': {
                      backgroundColor: '#ffffe0', /* Light yellow */
                    },
                    '& .yellow-dark ': {
                      backgroundColor: '#ffd700', /* Darker yellow */
                    },
                    '& .green-light ': {
                      backgroundColor: '#90ee90', /* Light green */
                    },
                    '& .green-medium': {
                      backgroundColor: '#32cd32', /* Medium green */
                    },
                    '& .green-dark ': {
                      backgroundColor: '#008000', /* Dark green */
                    },
                    '&  .red-light ': {
                      backgroundColor: '#ff7f7f', /* Light red */
                    },
                    '&   .red-dark ': {
                      backgroundColor: '#ff0000', /* Darker red */
                    },
                    '&   .dark-orange': {
                      backgroundColor: '#FFD243', /* Darker red */
                    },
                  }}
                >

                  <Grid item xs={12}>
                    <DataGrid
                      rows={filteredRows ?? []}
                      columns={columns}
                      getRowId={(row) => row._id}
                      checkboxSelection={props.action == 'release'}
                      disableRowSelectionOnClick={props.action == 'release'}

                      isRowSelectable={(params:any) =>
                        selectedDivisions.length === 0 ?
                          true :
                          selectedDivisions.includes(params?.row?.division?.details?.name)
                      }

                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setReleaseAmountIROs(() => {
                          const selectedIROs = IROrder ? IROrder.filter((iro) => newRowSelectionModel.includes(iro._id)) : [];

                          return selectedIROs;
                        });
                      }}
                      getRowClassName={(params) => {
                        if (params.row.specialsanction == 'Yes') {
                          return 'special-sanction'; // Class for rows with special sanction
                        }
                        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                      }}
                      style={{ height: '80vh', width: '100%' }}
                      // rowSelectionModel={selectedIROrelease}
                      //
                    />
                  </Grid>
                </Box>
              </Grid>
            </Card>
            <Grid>
              <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }} >
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                    <Grid item>
                      <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Send Notifications
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 260 }}

                        onClick={
                          () => {
                            IROServices.sendNotifications('president', selectedIROId ?? '')
                              .then(() => {
                                enqueueSnackbar({
                                  message: 'Message Sent',
                                  variant: 'success',
                                });
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                          }
                        }
                        endIcon={<SendIcon />}
                      > Send to President</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: 260 }}

                        onClick={
                          () => {
                            IROServices.sendNotifications('accounts', selectedIROId ?? '')
                              .then(() => {
                                enqueueSnackbar({
                                  message: 'Message Sent',
                                  variant: 'success',
                                });
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                          }
                        }
                        endIcon={<SendIcon />}
                      >  Send to accounts</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: 260 }}

                        onClick={
                          () => {
                            IROServices.sendNotifications('office_manager', selectedIROId ?? '')
                              .then(() => {
                                enqueueSnackbar({
                                  message: 'Message Sent',
                                  variant: 'success',
                                });
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                          }
                        }
                        endIcon={<SendIcon />}
                      >  Send to office manager</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 260 }}
                        onClick={
                          () => {
                            IROServices.sendNotifications('account_manager', selectedIROId ?? '')
                              .then(() => {
                                enqueueSnackbar({
                                  message: 'Message Sent',
                                  variant: 'success',
                                });
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                          }
                        }
                        endIcon={<SendIcon />}
                      >  Send to account manager</Button>
                      {/* <br /><br /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color='inherit'
                        sx={{ width: 260 }}
                        onClick={
                          () => {
                            IROServices.sendNotifications('division_head', selectedIROId ?? '')
                              .then(() => {
                                enqueueSnackbar({
                                  message: 'Message Sent',
                                  variant: 'success',
                                });
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                          }
                        }
                        endIcon={<SendIcon />}
                      >  Send to division head</Button>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          toggleSendNotification(false);
                          setSelectedIROId('');
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon />}
                      >
                        close
                      </Button>
                    </Grid>
                    {/* <Grid item xs={12}>
        <Button variant="contained" color='inherit'> Send to division head</Button>

      </Grid> */}
                  </Grid>
                </DialogContent>
              </Dialog>
              <Dialog open={addSignature} sx={{ width: 400, margin: '0 auto' }} >
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                    <Grid item>
                      <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Add Signatures
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 260 }}
                        onClick={() => {
                          // setShowAccountManagerFileUploader(false);
                          // setShowAccountFileUploader(false);
                          setShowHRFileUploader(true);
                          // toggleAddSignature(false);
                        }}
                      >
                        {' '}
                        HR signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: 260 }}
                        onClick={() => {
                          // setShowAccountFileUploader(false);
                          // setShowHRFileUploader(false);
                          // toggleAddSignature(false);
                          setShowAccountManagerFileUploader(true);
                        }}
                      >
                        {' '}
                        Account Manager Signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: 260 }}
                        onClick={() => {
                          setShowAccountFileUploader(true);
                          // setShowAccountManagerFileUploader(false);
                          // setShowHRFileUploader(false);
                          // toggleAddSignature(false);
                        }}
                      >
                        {' '}
                        Accountant Signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedIROId('');
                          toggleAddSignature(false);
                          IROServices.getAll()
                            .then((res) => {
                              setIROrder(res.data);
                            });
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon />}
                      >
                        Close
                      </Button>
                    </Grid>
                    {/* <Grid item xs={12}>
        <Button variant="contained" color='inherit'> Send to division head</Button>

      </Grid> */}
                  </Grid>
                </DialogContent>
              </Dialog>
            </Grid>
            <Dialog open={openRemarks} fullWidth maxWidth="md">
              <DialogTitle>Remarks</DialogTitle>
              <DialogContent>
                {remarks.length > 0 ?
                  remarks.map((remark) => (
                    <MessageItem
                      key={remark._id}
                      sender={remark.createdBy?.basicDetails?.firstName + ' ' + remark.createdBy?.basicDetails?.lastName}
                      time={remark.updatedAt}
                      body={remark.remark}
                      isSent={true}
                    />
                  )) :
                  'No Data Found '}
              </DialogContent>
              <DialogActions>
                <TextField
                  id="remarkTextfield"
                  placeholder="Remarks"
                  multiline
                  value={remark?.remark}
                  onChange={(e) =>
                    setRemark((remark) => ({
                      ...remark,
                      IRO: selectedIROId ?? '',
                      remark: e.target.value,
                    }))
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            remark.remark ?
                              IROServices.addRemarks(remark)
                                .then((res) => {
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
                                }) :
                              '';
                          }}
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
                    setSelectedIROId(null);
                  }}
                  sx={{ ml: 1, height: '60px' }}

                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    // setSelectedFR(props.row._id);
                    toggleSendNotification(true);
                  }}
                  // sx={{ ml: 'auto' }}
                >
                      Send notification
                </Button>
              </DialogActions>
            </Dialog>
            <FileUploader
              title="HR Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showHRFileUploader}
              onClose={() => setShowHRFileUploader(false)}
              // getFiles={selectedIRO?.signature?.hrSignature}
              getFiles={selectedIRO?.signature?.hrSignature ? [selectedIRO.signature.hrSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name)
                  .then((res) => {
                    setSelectedIRO(() => ({
                      ...selectedIRO,
                      signature: {
                        ...selectedIRO.signature,
                        hrSignature: res.data,
                      },
                    }));

                    return res;
                  });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    hrSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
            <FileUploader
              title="Account manager Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showAccountManagerFileUploader}
              onClose={() => setShowAccountManagerFileUploader(false)}
              getFiles={selectedIRO?.signature?.accountManagerSignature ? [selectedIRO.signature.accountManagerSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
                  setSelectedIRO(() => ({
                    ...selectedIRO,
                    signature: {
                      ...selectedIRO?.signature,
                      accountManagerSignature: res.data,
                    },
                  }));

                  return res;
                });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    accountManagerSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}

            />
            <FileUploader
              title="Accountant Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showAccountFileUploader}
              onClose={() => setShowAccountFileUploader(false)}
              getFiles={selectedIRO?.signature?.accountantSignature ? [selectedIRO.signature.accountantSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
                  setSelectedIRO((prevSelectedIRO) => ({
                    ...prevSelectedIRO,
                    signature: {
                      ...prevSelectedIRO.signature,
                      accountantSignature: res.data,
                    },
                  }));


                  return res;
                });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    accountantSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}


            />

            <FileUploader
              title=" Bill Upload"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 10,
                maxTotalSize: 30 * MB,
              }}
              // accept={['video/*']}
              open={attachment}
              action={fileUploaderAction}
              postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
              onClose={() => setAttachment(false)}
              // getFiles={TestServices.getBills}
              getFiles={selectedIRO?.billAttachment ?? []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name).then((res) => {
                  setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.length > 0 ? [...selectedIRO.billAttachment, res.data] : [res.data]}));

                  return res;
                });
              }}
              renameFile={(fileId: string, newName: string) => {
                setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)) }));
                return FileUploaderServices.renameFile(fileId, newName);
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.filter((file) => file._id !== fileId) }));
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
            <ReleaseAmount action={props.action == 'release' ? 'add' : 'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={releaseAmountIROs} />
          </>
        }
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity="error">
              Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />
      {selectedIROId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIROId}/>}

    </CommonPageLayout>
  );
};

export default OfficeMangerApprove;
