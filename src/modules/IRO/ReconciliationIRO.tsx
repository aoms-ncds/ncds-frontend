/* eslint-disable react/no-multi-comp */
/* eslint-disable max-len */
import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import {
  AttachFile as AttachmentIcon,
  AttachMoney as AttachMoneyIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
// eslint-disable-next-line max-len
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Grid, Box, Container, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Divider, ListItemIcon, ListItemText, Menu, MenuItem, ToggleButton, ToggleButtonGroup, SelectChangeEvent, Checkbox, InputLabel, ListSubheader, Select } from '@mui/material';
// eslint-disable-next-line no-duplicate-imports
import { Send as SendIcon, Edit as EditIcon, Preview as PreviewIcon, Print as PrintIcon, Download as DownloadIcon } from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import MessageItem from '../../components/MessageItem';
import { MB } from '../../extras/CommonConfig';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { useAuth } from '../../hooks/Authentication';
import * as XLSX from 'xlsx';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import IROTemplate from './components/IROTemplate';
import ESignatureService from '../Settings/extras/ESignatureService';
import FRServices from '../FR/extras/FRServices';
import ReleaseAmount from './components/ReleaseAmountDialog';
import NotificationService from '../Notification/extras/NotificationService';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { hasPermissions } from '../User/components/PermissionChecks';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import FRReceiptTemplate from '../FR/components/FRReceiptTemplate';
import FRReceiptTempForDelhiDivision from '../FR/components/FRReceiptTempForHelhiDevision';
import LeaderDetailsService from '../Settings/extras/LeaderDetailsService';
import ReleaseAmountDialogEdit from './components/ReleaseAmountDialogEdit';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import formatAmount from '../Common/formatcode';

const ReconciliationIRO = () => {
  const [reconciliationIRO, setReconcilationIRO] = useState<IROrder[]>();
  const user = useAuth();
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [openRelease, setOpenRelease] = useState(false);
  const [openReleaseEdit, setOpenReleaseEdit] = useState(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const [sendNotification, toggleSendNotification] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [openPrintFr, setOpenPrintFr] = useState(false);
  const [messages, setMessages] = useState<number | null>(0);
  const [statusFilter, setStatusFilter] = useState([IROLifeCycleStates.AMOUNT_RELEASED, IROLifeCycleStates.RECONCILIATION_DONE]); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted
  const [openAttachReceipt1, setOpenAttachReceipt1] = useState(false);
  const [data2, setData2] = useState<any | null>(null);
  const [data5, setData5] = useState<any | null>(null);
  const [Label, setLeaderHeading] = useState<ILeaderDetails[] | null>(null);
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| null>('All'); // default WFA: Waiting for access or Reverted

  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [conform, setConform] = useState<boolean>(false);
  const [conform1, setConform1] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<boolean>(false);
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
  const [divisions, setDivisions] = useState<string[]>([]);
  const [divisionSearch, setDivisionSearch] = useState('');
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);

  useEffect(() => {
    DivisionsServices.getDivisions().then((res) => {
      const names = res.data.map((d: any) => d.details.name);
      setDivisions(names);
    });
  }, []);
  const filteredDivisions = divisions.filter((name) =>
    name
      .toLowerCase()
      .replace(/\s/g, '') // remove spaces
      .includes(divisionSearch.toLowerCase().replace(/\s/g, '')),
  );
  const handleDivisionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    if (value.includes('__ALL__')) {
      ([]); // empty = show all
      return;
    }
    setSelectedDivisions(value);
  };
  const [loading, setLoading] = useState(false);
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [FrData, setFrData] = useState<FR | null>(null);
  const [printIroLoading, setPrintIroLoading] = useState(false);
  const [mngrName, setMngrName] = useState('');
  const [count, setCount] = useState(0);
  // const [openPrintIro, setOpenPrintIro] = useState(false);
  const [FR, setFR] = useState<FR>();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
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
  const [selectedSignature, setSignature] = useState<Esignature>({
    _id: '',
    officeManagerSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  const [signaturePresident, setSignaturePresident] = useState<EsignaturePresident>({
    _id: '',
    presidentSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignature(res.data as Esignature);
        setMngrName((res.data as { officeManagerName: string }).officeManagerName);
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
    LeaderDetailsService.getAll()
    .then((res) => {
      setLeaderHeading(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    // setLoading((loading) => loading + 1);
    NotificationService.getMyMessagesCountForBill()
      .then((res) => {
        setMessages(res.data);
        setCount(res.data);
      })
      .catch((res) => {
        console.log(res);
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, [count]);
  // useEffect(()=>{
  //   FRServices.getById(iroData?.FR ?? '').then((res)=>{
  //     setFR(res.data);
  //   });
  // }, [iroData]);
  const attach = async (blob: Blob) => {
    try {
      if (iroData) {
        // File Blob creation
        const fileBlob = blob instanceof Blob ? new File([blob], `${iroData?.IROno}_Receipt.pdf`, { type: 'application/pdf' }) : null;
        if ( fileBlob) {
          // File upload
          const file = await FileUploaderServices.uploadFile(fileBlob, undefined, 'FR', fileBlob.name);

          if (file.success) {
            // Update FR request
            const res= await IROServices.close(iroData._id, file.data._id);
            const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
              return reconciliationIROs._id !== res.data.iro._id;
            });
            setReconcilationIRO(filterIRO);
            // Update local state and UI
            setIroData(null);
            setConform1(false);
            enqueueSnackbar({
              message: 'File Attached',
              variant: 'success',
            });
            enqueueSnackbar({
              message: 'IRO updated',
              variant: 'success',
            });
          }
        }
      }
    } catch (error) {
      // Handle error
      console.error('Error attaching files:', error);
      enqueueSnackbar({
        message: 'Error attaching files',
        variant: 'error',
      });
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (reconciliationIRO ?? []).filter((row) => {
    const divisionMatch = selectedDivisions.length === 0 ||
    selectedDivisions.includes(row?.division?.details.name ?? '');

    if (!searchText) return divisionMatch;

    const searchLower = searchText.toLowerCase();

    // Check all searchable fields
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
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const permissions = (user.user as User)?.permissions;
  console.log(data2, 'FRDD');
  useEffect(() => {
    if (permissions?.FCRA_ACCOUNTS_ACCESS && !permissions?.LOCAL_ACCOUNT_ACCESS) {
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange, sourceOfAccount: 'FCRA', support: statusFilter1 })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (permissions?.LOCAL_ACCOUNT_ACCESS && !permissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange, sourceOfAccount: 'Local', support: statusFilter1 })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (permissions?.LOCAL_ACCOUNT_ACCESS && permissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange, support: statusFilter1 })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        });
    }
  }, [attachment, dateRange, selectedIRO, statusFilter, exstatusFilter, statusFilter1]);
  const handlePrintIRO = (row: any) => {
    IROServices.getByIdOptimized(row._id).then((res) => {
      setData(res.data[0]);
    });

    setOpenPrintFr(true);

    setTimeout(() => {
      setOpenPrintFr(false);
    }, 2000);
  };

  const handlePrintFR = (row: any) => {
    if (!row.FR) {
      enqueueSnackbar({
        message: 'FR not found',
        variant: 'warning',
      });
      return;
    }

    IROServices.getByIdOptimized(row._id).then((res) => {
      setData2(res.data[0].FR);
    });

    setOpenPrintFr(true);

    setTimeout(() => {
      setOpenPrintFr(false);
    }, 2000);
  };

  const handlePrintDelhi = async (row: any) => {
    try {
      const [rowRes, delhiRes] = await Promise.all([
        IROServices.getByIdOptimized(row._id),
        DivisionsServices.getDivisionById('658270549efadc163550a28c'),
      ]);

      const rowData = rowRes.data?.[0];
      const delhiHQ = delhiRes.data;

      if (rowData?.division?.details) {
        setData5({
          ...row,
          division: {
            ...rowData.division,
            details: {
              ...rowData.division.details,
              seniorLeader: delhiHQ?.details?.seniorLeader,
              juniorLeader: delhiHQ?.details?.juniorLeader,
            },
          },
        });
      }

      setOpenPrintFr(true);

      setTimeout(() => {
        setOpenPrintFr(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to load IRO / Division data', error);
    }
  };
  const handleCloseIRO = (row: any) => {
  // same logic you already had
    setIroData(row);
    setConform1(true);

    if (row?.FR) {
      FRServices.getById(row.FR)
      .then((res) => {
        setFrData(res.data);
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
    }

    setPrintIroLoading(true);

    setTimeout(() => {
      setPrintIroLoading(false);
    }, 2000);
  };
  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      minWidth: 20,
      type: 'string',
      renderHeader: () => <b>Action</b>,
      align: 'center',
      headerAlign: 'center',

      renderCell: (props) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

        const Section = ({ title }: { title: string }) => (
          <Typography
            sx={{
              px: 2,
              pt: 1.5,
              pb: 0.5,
              fontSize: 12,
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            {title}
          </Typography>
        );

        return (
          <>
            {/* ACTION ICON */}
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>

            {/* MENU */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  width: 280,
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              {/* ================= VIEW ================= */}
              <Section title="VIEW" />

              <MenuItem onClick={() => {
                setAttachment(true);
                setSelectedIRO(props.row);
              }}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Reconciliation" />
              </MenuItem>
              <MenuItem onClick={() => window.open(`/iro/${props.row._id}`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="View IRO" />
              </MenuItem>

              <MenuItem onClick={() => window.open(`/fr/${props.row.FR}/view`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="View FR" />
              </MenuItem>

              {props.row.status >= IROLifeCycleStates.AMOUNT_RELEASED && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([props.row])]}>
                  <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="View Release Amount" />
                </MenuItem>
              )}

              <MenuItem onClick={() => {
                setSelectedIROId(props.row._id);
                setOpenLog(true);
              }}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="IRO Log" />
              </MenuItem>

              <Divider />

              {/* ================= EDIT / UPDATE ================= */}
              <Section title="EDIT / UPDATE" />

              {(hasPermissions(['ADMIN_ACCESS']) ||
            hasPermissions(['FCRA_ACCOUNTS_ACCESS']) ||
            hasPermissions(['LOCAL_ACCOUNT_ACCESS'])) && (
                <MenuItem onClick={() => [setOpenReleaseEdit(true), setReleaseAmountIROs([props.row])]}>
                  <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Edit Release Amount" />
                </MenuItem>
              )}

              <MenuItem onClick={() => {
                toggleOpenRemarks(true);
                setSelectedIROId(props.row._id);
              }}>
                <ListItemIcon><EditNoteIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Add Remark" />
              </MenuItem>

              <MenuItem onClick={() => {
                setAttachments(props.row.billAttachment);
                setViewFileUploader(true);
              }}>
                <ListItemIcon><AttachFileIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Attachments" />
              </MenuItem>

              <Divider />

              {/* ================= PRINT ================= */}
              <Section title="PRINT" />

              <MenuItem onClick={() => handlePrintIRO(props.row)}>
                <ListItemIcon><PrintIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Print IRO" />
              </MenuItem>

              <MenuItem onClick={() => handlePrintFR(props.row)}>
                <ListItemIcon><PrintIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Print FR" />
              </MenuItem>

              {hasPermissions(['DELHI_DIVISION_ACCESS']) && (
                <MenuItem onClick={() => handlePrintDelhi(props.row)}>
                  <ListItemIcon><PrintIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Print FR – HQ Delhi" />
                </MenuItem>
              )}

              <Divider />

              {/* ================= SYSTEM ================= */}
              <Section title="SYSTEM" />

              <MenuItem
                sx={{ color: 'error.main' }}
                onClick={() => handleCloseIRO(props.row)}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <CloseIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Close IRO" />
              </MenuItem>

              <MenuItem onClick={() => {
                setSelectedIROId(props.row._id);
                toggleSendNotification(true);
              }}>
                <ListItemIcon><MessageIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Send Notification" />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
    // {
    //   field: 'status',
    //   renderHeader: () => (<b>Status</b>),
    //   // renderCell: (props) => (
    //   //   <p
    //   //     style={{
    //   //       maxWidth: 205,
    //   //       whiteSpace: 'normal',
    //   //       wordBreak: 'break-word',
    //   //     }}
    //   //   >
    //   //     {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
    //   //   </p>
    //   // ),
    //   align: 'center',
    //   width: 250,
    //   headerAlign: 'center',
    //   valueGetter: (params) => {
    //     return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
    //   },
    // },
    { field: 'IROno', headerName: 'IRO No', width: 130, renderHeader: () => (<b>IRO No</b>), align: 'center', headerAlign: 'center' },
    {
      field: 'IRODate', headerName: 'IRO Date', width: 130, renderHeader: () => (<b>IRO Date</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      renderHeader: () => <b>Sub Division Name</b>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'subDivisionName',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>
    //   ),
    //   width: 160,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
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
    // {
    //   field: 'requestAmount', headerName: 'Requested Amount', width: 150, align: 'center', headerAlign: 'center',
    //   renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
    //   renderCell: (params: GridCellParams) => {
    //     const frRequest = params.row as IROrder;
    //     const particularAmount = frRequest.particulars?.reduce(
    //       (total, particular) => total + Number(particular.requestedAmount),
    //       0,
    //     );
    //     return <p>{particularAmount}</p>;
    //   },
    // },
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
    //   field: 'updatedAt', headerName: 'Last Updated', width: 130, renderHeader: () => (<b>Last Updated</b>),
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    // },
    {
      field: 'Mode of Transfer',
      headerName: 'Mode of Transfer',
      width: 200,
      valueGetter: (params) => {
        return params.row.releaseAmount?.modeOfPayment;
      },
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,

      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      width: 200,
      valueGetter: (params) => {
        const transferredDate = params.row.releaseAmount?.transferredDate;
        if (transferredDate) {
          const formattedDate = moment(transferredDate).format('DD/MM/YYYY'); // Adjust the format as needed
          return formattedDate;
        } else {
          return 'N/A';
        }
      },
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,

      align: 'center',
      headerAlign: 'center',
    },
    // { field: 'sanction', headerName: 'Special Sanction', width: 130, renderHeader: () => (<b>Special Sanction</b>), align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 130,
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount;
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0).toFixed(2);
        }
        return 0; // or return a suitable default value
      }, renderHeader: () => (<b>Sanctioned Amount</b>), align: 'center', headerAlign: 'center' },
    {
      field: 'Transferred',
      headerName: 'Transferred Amount',
      width: 180,
      renderHeader: () => <b>Transferred Amount</b>,

      valueGetter: (params: any) => {
        if (params.row.sanctionedAmount !== undefined) {
          return formatAmount(Number(params.row.sanctionedAmount));
        }

        if (Array.isArray(params.row.particulars)) {
          const total = params.row.particulars.reduce(
            (sum: number, item: any) =>
              sum + (Number(item.sanctionedAmount) || 0),
            0,
          );

          return formatAmount(total);
        }

        return formatAmount(0);
      },
      align: 'center' as const,
      headerAlign: 'center' as const,
    },

    {
      field: 'totalTransferred',
      headerName: 'Total Transferred Amount',
      width: 180,
      renderHeader: () => <b>Total Transferred Amount</b>,
      valueGetter: (params: any) => {
        return formatAmount(
          Number(params.row.releaseAmount?.transferredAmount) || 0,
        );
      },
      align: 'center' as const,
      headerAlign: 'center' as const,
    },
    {
      field: 'specialsanction',
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
    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 150, renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center', headerAlign: 'center' },


    {
      field: 'updatedAt', headerName: 'Last Updated', width: 130, renderHeader: () => (<b>Last Updated</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    },
  ];
  return (
    <CommonPageLayout status='AMOUNT RELEASED' title="For Reconciliation" momentFilter={

      {
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setReconcilationIRO((iroReq) => (iroReq ? iroReq.filter((iro) => iro.IRODate.isSameOrAfter(newDateRange.startDate) && iro.IRODate.isSameOrBefore(newDateRange.endDate)) : []));
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }

    } >
      <Card sx={{ maxWidth: '78vw', height: '100vh', alignItems: 'center' }}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>

                {/* Search Field */}
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchText}
                  placeholder="Enter IROno, IRODate, Division, or SubCategory"
                  onChange={handleSearchChange}
                  sx={{ width: '60%' }}
                />
                {/* Count Box with Reset Button */}

                <Grid item xs={3}>
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
                {/* Export Button */}
                <Button
                  onClick={async () => {
                    const sheet =
          reconciliationIRO ?
            reconciliationIRO.map((iro: IROrder) => [
              iro.IROno,
              iro.IRODate.format('DD/MM/YYYY'),
              iro.division?.details.name,
              iro.purposeSubdivision?.name,
              iro.mainCategory,
              iro.particulars?.reduce(
                (total, particular) => total + Number(particular.requestedAmount),
                0,
              ),
              iro.sanctionedAmount,
              iro.sanctionedBank,
              iro.sanctionedAsPer,
              iro.releaseAmount?.releaseAmount,
              iro.releaseAmount?.transferredDate?.format('DD/MM/YYYY'),
              IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
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
                      'Released Amt',
                      'Released Date',
                      'Status',
                    ];
                    const worksheet = XLSX.utils.json_to_sheet(sheet);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                    XLSX.writeFile(workbook, 'FRReport.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadIcon />}
                  color="primary"
                  variant="contained"
                  sx={{ whiteSpace: 'normal' }}
                >
      Export
                </Button>

              </Box>

              <br />
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
                wrap="wrap"
              >
                {/* ================= STATUS FILTER ================= */}
                <Grid item>
                  <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={exstatusFilter.includes(69) ? 'NonBankTransfers' : 'All'}
                    onChange={(_, value) => {
                      if (!value) return;

                      if (value === 'NonBankTransfers') {
                        setExStatusFilter([69]);
                      } else {
                        setExStatusFilter([]);
                        setStatusFilter([IROLifeCycleStates.AMOUNT_RELEASED]);
                      }
                    }}
                    sx={toggleSx}
                  >
                    <ToggleButton value="All">ALL</ToggleButton>
                    <ToggleButton value="NonBankTransfers">
        NON BANK TRANSFERS
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* ================= CATEGORY FILTER ================= */}
                <Grid item>
                  <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={statusFilter1}
                    onChange={(_, value) => {
                      if (!value) return;
                      setStatusFilter1(
                        value === 'Support' ?
                          'Support' :
                          value === 'Expanse' ?
                            'Expanse' :
                            'All',
                      );
                    }}
                    sx={toggleSx}
                  >
                    <ToggleButton value="Support">SUPPORT</ToggleButton>
                    <ToggleButton value="Expanse">EXPENSE</ToggleButton>
                    <ToggleButton value="All">BOTH CATEGORIES</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* ================= INFO BOX (UNCHANGED) ================= */}
                <Grid item xs={12} md="auto">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: '#f5f5f5',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      boxShadow: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
        New Bills Attached:
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{
                        background: '#fff',
                        px: 2,
                        py: 1,
                        borderRadius: '4px',
                        boxShadow: 1,
                      }}
                    >
                      {count}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={async () =>
                        await NotificationService
            .markAllAsReadForBill()
            .then(() => setCount(0))
                      }
                    >
        Reset
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

          </Grid>


          <Grid item xs={12}>
            <Box
              sx={{
                'height': 450,
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
              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '70vh', width: '100%' }}
                isRowSelectable={(params:any) =>
                  selectedDivisions.length === 0 ?
                    true :
                    selectedDivisions.includes(params?.row?.division?.details?.name)
                }
                getRowClassName={(params) => {
                  if (params.row.specialsanction == 'Yes') {
                    return 'special-sanction'; // Class for rows with special sanction
                  }
                  return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                }}
              />

            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
            <Grid item>
              <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Send Notifications
              </Typography>
              {/* <Divider /> */}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 260 }}
                onClick={() => {
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
                }}
                endIcon={<SendIcon />}
              >
                {' '}
                        Send to President
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="info"
                sx={{ width: 260 }}
                onClick={() => {
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
                }}
                endIcon={<SendIcon />}
              >
                {' '}
                        Send to accounts
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="warning"
                sx={{ width: 260 }}
                onClick={() => {
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
                }}
                endIcon={<SendIcon />}
              >
                {' '}
                        Send to office manager
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: 260 }}
                onClick={() => {
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
                }}
                endIcon={<SendIcon />}
              >
                {' '}
                        Send to account manager
              </Button>
              {/* <br /><br /> */}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="inherit"
                sx={{ width: 260 }}
                onClick={() => {
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
                }}
                endIcon={<SendIcon />}
              >
                {' '}
                        Send to division head
              </Button>
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
      <Dialog open={Boolean(data2)} onClose={() => setData2(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Fr</DialogTitle>
        <DialogContent>


          <Container>
  Downloading the FRReceipt for {data2?.FRno}
            <br />

            {data2 && (
              <BlobProvider
                document={
                  <FRReceiptTemplate
                    rowData={data2 as FR}
                    president={signaturePresident}
                  />
                }
              >
                {({ loading, url }) =>
                  loading || openPrintFr ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="FRReceipt.pdf"
                      style={{ color: 'blue' }}
                    >
            FRReceipt.pdf
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setData2(null);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={ openAttachReceipt1 } onClose={() => setOpenAttachReceipt1(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure</DialogTitle>
        <DialogContent>

          <Container>
  Do you want to download receipt for {iroData?.IROno}?
            <br />

            {iroData && mngrName && selectedSignature && FrData && (
              <BlobProvider
                document={
                  <IROTemplate
                    prev={true}
                    rowData={iroData}
                    mngrName={mngrName}
                    officeMngrSign={selectedSignature}
                    fr={FrData as FR}
                    president={signaturePresident}
                  />
                }
              >
                {({ loading, url }) =>
                  loading || printIroLoading ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download={`${iroData?.IROno}_Receipt.pdf`}
                      style={{ color: 'blue' }}
                    >
                      {`${iroData?.IROno}_Receipt.pdf`}
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIroData(null);
              setOpenAttachReceipt1(false);
            }}
            variant="text"
          >
            Cancel
          </Button>
          <>
            {/* {iroData && mngrName&&selectedSignature&&FrData&& (
              <>
                <PDFDownloadLink document={<IROTemplate
                  rowData={iroData} mngrName={mngrName} prev={true} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
                fileName={`${iroData?.IROno}_Receipt.pdf`} style={{ color: 'blue' }}>
                  {({ blob, loading }) =>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={async () => {
                        if (blob) {
                          setLoading(true);
                          attach(blob);
                        }
                      }}
                      disabled={loading || printIroLoading}
                    >
                      {loading || printIroLoading ? 'Loading...' : 'Yes, Attach'}
                    </Button> }
                </PDFDownloadLink>

              </>
            )} */}
          </>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(data5)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Fr</DialogTitle>
        <DialogContent>
          <Container>
  Download the FR Receipt, Delhi for {data5?.FRno}
            <br />

            {data5 && (
              <BlobProvider
                document={
                  <FRReceiptTempForDelhiDivision
                    label={Label}
                    president={signaturePresident}
                    rowData={data5 as FR}
                  />
                }
              >
                {({ loading, url }) =>
                  loading || openPrintFr ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="FRReceiptDelhi.pdf"
                      style={{ color: 'blue' }}
                    >
            FRReceiptDelhi.pdf
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setData5(null);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={Boolean(data)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print IRO</DialogTitle>
        <DialogContent>

          <Container>
  Downloading the IROReceipt for {data?.IRONo}
            <br />

            {data && (
              <BlobProvider
                document={
                  <IROTemplate
                    rowData={data as IROrder}
                    fr={data.FR}
                    president={signaturePresident}
                    officeMngrSign={selectedSignature}
                  />
                }
              >
                {({ loading, url }) =>
                  loading || openPrintFr ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="IROReceipt.pdf"
                      style={{ color: 'blue' }}
                    >
            IROReceipt.pdf
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setData(null);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName}
              time={remark.updatedAt} body={remark.remark} isSent={true} />
          )) : 'No Data Found '}
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
            close
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
        title=" Bill Upload"
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
        open={attachment}
        action='manage'
        postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
        onClose={() => setAttachment(false)}
        // getFiles={TestServices.getBills}
        getFiles={selectedIRO?.billAttachment ?? []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name)
            .then((res) => {
              setSelectedIRO(() => ({
                ...selectedIRO,
                billAttachment: selectedIRO?.billAttachment.length > 0 ? [...selectedIRO.billAttachment, res.data] : [res.data],
              }));

              return res;
            });
        }}
        renameFile={(fileId: string, newName: string) => {
          setSelectedIRO(() => ({
            ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setSelectedIRO(() => ({
            ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.filter((file) => file._id !== fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />

      <FileUploader
        title="Attachments"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={viewFileUploader}
        action="view"
        onClose={() => setViewFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={attachments}
      // uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
      //   const resp = FileUploaderServices.uploadFile(file, onProgress, 'FR', file.name).then((res) => {
      //     setNewParticular((particularDetails) => ({
      //       ...particularDetails,
      //       attachment: [...particularDetails.attachment, res.data],
      //     }));
      //     return res;
      //   });
      //   return resp;
      // }}
      // renameFile={(fileId: string, newName: string) => {
      //   setNewParticular((particularDetails) => ({
      //     ...particularDetails,
      //     attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
      //   }));
      //   return FileUploaderServices.renameFile(fileId, newName);
      // }}
      // deleteFile={(fileId: string) => {
      //   setNewParticular((particularDetails) => ({
      //     ...particularDetails,
      //     attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
      //   }));
      //   return FileUploaderServices.deleteFile(fileId);
      // }}
      />
      {/* <Dialog open={openPrintIro} onClose={() => setOpenPrintIro(false)} maxWidth="xs" fullWidth>
        <DialogTitle> Print IRO Receipt </DialogTitle>
        <DialogContent>
          <Container>  Download the IRO for {selectedIRO?.IROno} &nbsp;
            {selectedIRO.closedIroPdf&&<a href="#" onClick={async () => {
              const file = (await FileUploaderServices.getFile(selectedIRO?.closedIroPdf ?? '')).data;
              if (file.downloadURL) {
                const link = document.createElement('a');
                link.href = file.downloadURL;
                link.download = file.filename; // You can specify a custom file name here
                link.click();
              }
            }}>{`${selectedIRO.IROno}_Receipt.pdf`}</a>}</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenPrintIro(false);
            }}
            variant="text"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog open={Boolean(conform1)} onClose={() => setConform1(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Container>
            {`Are you sure you want to close this IRO No ${iroData?.IROno}
    from ${iroData?.division?.details.name}
    related to FR No ${FrData?.FRno ?? ''} ?`}
            <br />

            {iroData && mngrName && selectedSignature && FrData && (
              <BlobProvider
                document={
                  <IROTemplate
                    rowData={iroData}
                    mngrName={mngrName}
                    officeMngrSign={selectedSignature}
                    fr={FrData as FR}
                    president={signaturePresident}
                  />
                }
              >
                {({ loading, url }) =>
                  loading || printIroLoading ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download={`${iroData?.IROno}_Receipt.pdf`}
                      style={{ color: 'blue' }}
                    >
                      {`${iroData?.IROno}_Receipt.pdf`}
                    </a>
                  )
                }
              </BlobProvider>
            )}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConform1(false);
            }}
            variant="text"
          >
            Cancel
          </Button>
          <>
            {iroData && mngrName&&selectedSignature&&FrData&& (

              <>
                <BlobProvider
                  document={
                    <IROTemplate
                      rowData={iroData}
                      mngrName={mngrName}
                      officeMngrSign={selectedSignature}
                      fr={FrData as FR}
                      president={signaturePresident}
                    />
                  }
                >
                  {({ blob, loading }) => (
                    <Button
                      variant="contained"
                      color="info"
                      onClick={async () => {
                        if (blob) {
                          setLoading(true);
                          await attach(blob);
                        }
                      }}
                      disabled={loading || printIroLoading}
                    >
                      {loading || printIroLoading ? 'Loading...' : 'Yes, Close'}
                    </Button>
                  )}
                </BlobProvider>

              </>
            )}
          </>
        </DialogActions>
      </Dialog>
      {loading&&
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Animations.loading,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={200}
        width={200}
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        // isStopped={.state.isStopped}
        // isPaused={.state.isPaused}
      />}
      <Dialog open={Boolean(conform)} onClose={() => setConform(false)}>
        <DialogContent>
          <Typography sx={{ color: 'red' }}>{`Are you sure you want to close this IRO No ${iroData?.IROno} from ${iroData?.division?.details.name} related to FR No ${FR?.FRno?? ''} ?`}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setConform(false)}>No</Button>
          <Button
            // endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              setConform1(true);
              setConform(false);
            } }
          >
                 Yes
          </Button>
        </DialogActions>

      </Dialog>
      <ReleaseAmount action={'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={ releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
      <ReleaseAmountDialogEdit action={'add'} onClose={() => setOpenReleaseEdit(false)} open={openReleaseEdit} data={ releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
      {selectedIROId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIROId}/>}

    </CommonPageLayout>
  );
};

export default ReconciliationIRO;
