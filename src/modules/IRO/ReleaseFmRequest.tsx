/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Alert, Typography, Divider, Box, Container, Tooltip, FormControl, FormControlLabel, Radio, RadioGroup, Chip, Popover, ToggleButton, ToggleButtonGroup, SelectChangeEvent, Checkbox, InputLabel, ListItemText, ListSubheader, MenuItem, Select, ListItemIcon, Menu } from '@mui/material';
// eslint-disable-next-line max-len
import {
  Print as PrintIcon,
  Edit as EditIcon,
  AttachFile as AttachmentIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  AttachMoney as AttachMoneyIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  Delete as DeleteIcon,
  MoreVertOutlined,
} from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
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
import { useAuth } from '../../hooks/Authentication';
import * as XLSX from 'xlsx';
import IROTemplate from './components/IROTemplate';
import clsx from 'clsx';
import IROReconciliationPdf from './components/IROReconciliationPdf';
import ESignatureService from '../Settings/extras/ESignatureService';
import { IfAny } from 'mongoose';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import FRServices from '../FR/extras/FRServices';
// import IROTemplate from './components/IROTemplate';
import InfoIcon from '@mui/icons-material/Info';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import ReleaseAmountDialogEdit from './components/ReleaseAmountDialogEdit';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import formatAmount from '../Common/formatcode';
import React from 'react';

const ReleaseFmRequest = (props: { action: 'manage' | 'release' }) => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [openReleaseEdit, setOpenReleaseEdit] = useState(false);

  const [FrData, setFrData] = useState<FR | null>(null);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [showHRFileUploader, setShowHRFileUploader] = useState(false);
  const [showAccountFileUploader, setShowAccountFileUploader] = useState(false);
  const [showAccountManagerFileUploader, setShowAccountManagerFileUploader] = useState(false);
  const [attachment, setAttachment] = useState<boolean>(false);
  const [supportAttachment, setSupportAttachment] = useState<boolean>(false);
  const [sendNotification, toggleSendNotification] = useState<boolean>(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const [addSignature, toggleAddSignature] = useState(false);
  const user = useAuth();
  const [searchText, setSearchText] = useState('');
  const [mngrName, setMngrName] = useState('');
  const [statusFilter, setStatusFilter] = useState([]); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| 'Sanctioned'| null>('All'); // default WFA: Waiting for access or Reverted

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
    // releaseAmount: {
    //   _id: '',
    //   modeOfPayment: '',
    //   releaseAmount: 0,
    //   transactionNumber: '',
    //   transferredAmount: 0,
    //   transferredDate: null,
    //   transferredBank: {
    //     bankName: '',
    //     branchName: '',
    //     accountNumber: '',
    //     IFSCCode: '',
    //   },
    //   attachment: [],
    //   division: '',
    // },
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

  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [openRelease, setOpenRelease] = useState(false);
  const [openReleaseConform, setOpenReleaseConform] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>([]);
  const [groupIro, setGroupIro] = useState<any>([]);
  const [fileUploaderAction, setFileUploaderAction] = useState<'add' | 'manage'>('add');
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [printIroLoading, setPrintIroLoading] = useState(false);
  const [openPrintIro, setOpenPrintIro] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedIroNo, setSelectedIroNo] = useState(null); // State to hold the selected iroNo
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
  let total = 0;
  selectedIRO?.particulars?.forEach((particular) => {
    if (particular?.sanctionedAmount) {
      total += particular?.sanctionedAmount;
    }
  });
  const [divisions, setDivisions] = useState<string[]>([]);
  const [divisionSearch, setDivisionSearch] = useState('');
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const handleCloseIRO = (row: IROrder) => {
    setIroData(row);

    if (row?.FR) {
      FRServices.getById(row.FR).then((res) => {
        setFrData(res.data);
        console.log(res.data, 'fr');
      });
    }

    setPrintIroLoading(true);

    setTimeout(() => {
      setPrintIroLoading(false);
    }, 2000);
  };
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIros, setSelectedIros] = useState<string[]>([]);
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
  const handleOpen = (event: React.MouseEvent<HTMLElement>, iros: string[]) => {
    setAnchorEl(event.currentTarget);
    setSelectedIros(iros);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIros([]);
  };
  console.log(releaseAmountIROs, '#ODD');
  console.log(groupIro, '#NEW');
  const [pdfProps, setPdfProps] = useState<{
    purpose: FRPurpose | null;
    divisionId: string | null;
    workerId: string | null;
    designationParticularID: string | null;
    subDivisionId: string | null;
    IRONo: string | null;
    month: string | null;
    date: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  // console.log(IROrder, 'selectedIROId');
  const [releaseAmount, setReleaseAmount] = useState<IReleaseAmount>({
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
  });
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
            await IROServices.close(iroData._id, file.data._id);

            // Update local state and UI
            setIroData(null);
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
  // useEffect(()=>{
  // }, [releaseAmountIROs]);

  const userPermissions = (user.user as User)?.permissions;
  //   if (props.action === 'release') {
  //     // if (userPermissions?.ACCOUNTS_MNGR_ACCESS) {
  //     //   IROServices.getAll({ Exstatus: exstatusFilter, status: statusFilter, dateRange: dateRange })
  //     //     .then((res) => {
  //     //       // console.log(res.data, 'sds');
  //     //       // setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //     //   if (userPermissions?.FCRA_ACCOUNTS_ACCESS) {
  //     //     IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sourceOfAccount: 'FCRA' })
  //     //       .then((res) => {
  //     //         // console.log(res.data, 'KKK');
  //     //         setIROrder(() => [...res.data]);
  //     //       })
  //     //       .catch((error) => {
  //     //         console.error(error);
  //     //       });
  //     //   }
  //     //   if (userPermissions?.LOCAL_ACCOUNT_ACCESS) {
  //     //     IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sourceOfAccount: 'Local' })
  //     //       .then((res) => {
  //     //         // console.log(res?.data, 'KKK');;

  //     //         setIROrder(() => [...res.data]);
  //     //       })
  //     //       .catch((error) => {
  //     //         console.error(error);
  //     //       });
  //     //   }
  //     // if (userPermissions?.OTHER_ACCOUNTS_ACCESS) {
  //     //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank' })
  //     //     .then((res) => {
  //     //       console.log(res.data, 'UIOP');
  //     //       setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //     // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_1) {
  //     //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 1' })
  //     //     .then((res) => {
  //     //       console.log(res.data, 'UIOP');

  //     //       setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //     // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_2) {
  //     //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 2' })
  //     //     .then((res) => {
  //     //       console.log(res.data, 'UIOP');

  //     //       setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //     // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_3) {
  //     //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 3' })
  //     //     .then((res) => {
  //     //       console.log(res.data, 'UIOP');

  //     //       setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //     // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_4) {
  //     //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 4' })
  //     //     .then((res) => {
  //     //       console.log(res.data, 'UIOP');

  //     //       setIROrder(() => [...res.data]);
  //     //     })
  //     //     .catch((error) => {
  //     //       console.error(error);
  //     //     });
  //     // }
  //   //   if (userPermissions?.LOCAL_ACCOUNT_ACCESS && userPermissions?.FCRA_ACCOUNTS_ACCESS && userPermissions.ACCOUNTS_MNGR_ACCESS) {
  //   //     IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE }).then((res) => {
  //   //       setIROrder(res.data);
  //   //       // console.log(res.data, 'datgajdfj');
  //   //     });
  //   //   }
  //   // } else {
  //   //   IROServices.getAll().then((res) => {
  //   //     setIROrder(res.data.filter((iro) => iro.IRODate.isSameOrAfter(dateRange.startDate) && iro.IRODate.isSameOrBefore(dateRange.endDate)));
  //   //   });
  //   }
  // }, [openRelease, attachment, addSignature, dateRange, iroData, exstatusFilter, statusFilter]);
  // // console.log(mngrName, 'mngrName');

  useEffect(() => {
    ESignatureService.getESignature().then((res) => {
      setMngrName((res.data as { officeManagerName: string }).officeManagerName);
    });
  }, []);
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
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignature(res.data as Esignature);
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
    IROServices.groupedIRO({ Exstatus: exstatusFilter, dateRange, support: statusFilter1 }).then((res)=>{
      console.log(res, 'res90');
      setGroupIro(res.data);
    });
  }, [statusFilter, exstatusFilter, dateRange, statusFilter1]);

  const deleteIRO = (id: string) => {
    console.log(id, 'as is');

    const snackbarId = enqueueSnackbar({
      message: 'Removing IRO',
      variant: 'info',
    });
    IROServices.deleteIRO(id)
      .then((res) => {
        if (IROrder) {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const IRO = IROrder.filter((IROrder) => {
            return IROrder._id !== id;
          });
          setIROrder(IRO);
          setDeleteModel(false);
        }
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
  const flattenedData = groupIro.reduce((acc: any, item: { IRO: IROrder[]; _id: any}, parentIndex: any) => {
    console.log(parentIndex, 'ppopo');

    const iros = Array.isArray(item.IRO) ? // Ensure IRO is an array before mapping
      item.IRO.map((iro: IROrder) => ({
        ...iro,
        parentId: item._id,
        IRODate: moment(iro.IRODate), // Format the date here
        parentGroupIndex: parentIndex, // Track which parent group this IRO belongs to
      })) :
      []; // If IRO is not an array, return an empty array

    return [...acc, ...iros.filter((e)=>e.status == IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT)];
  }, []);
  // Rest of your component code...
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
      renderHeader: () => <b>Action</b>,
      width: 80,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

        // eslint-disable-next-line react/no-multi-comp
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
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertOutlined fontSize="small" />
            </IconButton>

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

              {/* VIEW */}
              <Section title="VIEW" />

              <MenuItem onClick={() => window.open(`/iro/${params.row._id}`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="View IRO" />
              </MenuItem>

              <MenuItem onClick={() => window.open(`/fr/${params.row.FR}/view`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="View FR" />
              </MenuItem>

              {params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="View Release Amount" />
                </MenuItem>
              )}

              <MenuItem onClick={() => {
                setSelectedIROId(params.row._id);
                setOpenLog(true);
              }}>
                <ListItemIcon><PreviewIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="IRO Log" />
              </MenuItem>

              <Divider />

              {/* EDIT */}
              <Section title="EDIT / UPDATE" />

              {hasPermissions(['ACCOUNTS_MNGR_ACCESS']) && (
                <MenuItem onClick={() => window.open(`/iro/${params.row._id}/edit`, '_blank')}>
                  <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
              )}

              <MenuItem onClick={() => [setOpenReleaseEdit(true), setReleaseAmountIROs([params.row])]}>
                <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Edit Release Amount" />
              </MenuItem>

              {(params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE ||
      (IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR && props.action === 'release')) && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon><CurrencyRupeeIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Release Amount" />
                </MenuItem>
              )}

              <MenuItem onClick={() => {
                toggleOpenRemarks(true);
                setSelectedIROId(params.row._id);
              }}>
                <ListItemIcon><EditNoteIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Remarks" />
              </MenuItem>

              <MenuItem onClick={() => {
                setViewFileUploader(true);
                setSelectedIRO(params.row);
              }}>
                <ListItemIcon><AttachmentIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Attachments" />
              </MenuItem>

              <Divider />

              {/* PRINT */}
              {params.row.closedIroPdf && (
                <>
                  <Section title="PRINT" />

                  <MenuItem onClick={() => {
                    setSelectedIRO(params.row);
                    setOpenPrintIro(true);
                  }}>
                    <ListItemIcon><PrintIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Print IRO" />
                  </MenuItem>
                </>
              )}

              <Divider />

              {/* SYSTEM */}
              <Section title="SYSTEM" />

              <MenuItem
                sx={{ color: 'error.main' }}
                onClick={() => handleCloseIRO(params.row)}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <CloseIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Close IRO" />
              </MenuItem>

              <MenuItem onClick={() => {
                setSelectedIROId(params.row._id);
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
    //   renderHeader: () => <b>Status</b>,
    //   width: 300,
    //   align: 'center',
    //   headerAlign: 'center',
    //   cellClassName: (params) => {
    //     const statusName = params.formattedValue;
    //     if (params.value == null) {
    //       return '';
    //     }
    //     switch (statusName) {
    //     case 'WAITING FOR OFFICE MNGR':
    //       return clsx('orange');
    //     case 'WAITING FOR ACCOUNTS STATE':
    //       return clsx('orange');
    //     case 'IRO CLOSED':
    //       return clsx('green');
    //     case 'WAITING FOR ACCOUNTS MNGR':
    //       return clsx('green');
    //     case 'AMOUNT RELEASED':
    //       return clsx('green');
    //     case 'RECONCILIATION DONE':
    //       return clsx('green');
    //     case 'WAITING FOR RELEASE AMOUNT':
    //       return clsx('orange');
    //     default:
    //       // console.log('No class applied');
    //       return '';
    //     }
    //   },

    //   valueGetter: (params) => {
    //     let statusName = IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
    //     // Check if the status name needs to be changed
    //     switch (statusName) {
    //     case 'SEND_BACK':
    //       statusName = 'REVERTED';
    //       break;
    //     case 'FR_APPROVED':
    //       statusName = 'FR VERIFIED'; // Change to whatever new name you want
    //       break;
    //     case 'FR_REJECTED':
    //       statusName = ' FR DISAPPROVED'; // Change to whatever new name you want
    //       break;
    //     case 'WAITTING_FOR_RELEASE_AMOUNT':
    //       statusName = 'WAITING FOR RELEASE AMOUNT'; // Change to whatever new name you want
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
    {
      field: 'IROno',
      headerName: 'IRO No',
      width: 130,
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
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
      field: 'iroGroup',
      headerName: 'IroGroup',
      width: 350,
      renderHeader: () => <b>Groups IROs</b>,
      valueGetter: (params) => params.row.groupIros?.filter((e) => e !== params.row._id),
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const parentGroupIndex = (params.row as any).parentGroupIndex;
        let backgroundColor;

        // Apply color based on the parent group index
        if (parentGroupIndex % 3 === 0) {
          backgroundColor = '#ffe39a'; // Light red
        } else if (parentGroupIndex % 3 === 1) {
          backgroundColor = '#f3c6c1'; // Light green
        } else {
          backgroundColor = '#E1F5FE '; // Light blue
        }

        return (
          <Box
            onClick={(e) => handleOpen(e, params.row?.groupIros || [])}
            sx={{
              backgroundColor: backgroundColor,
              px: 1.5,
              py: 1,
              borderRadius: 1,
              cursor: 'pointer',
              width: '100%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontSize: 13,
            }}
          >
            {params.row?.groupIros?.join(', ')}
          </Box>
        );
      },
    },


    {
      field: 'divisionName',
      renderHeader: () => <b>Division Name</b>,
      valueGetter: (params) => params.row.division?.details?.name,
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
    {
      field: 'mainCategory',
      renderHeader: () => <b>Main Category</b>,
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
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      width: 200,
      valueGetter: (params) =>
        params.row.releaseAmount?.transferredDate ?
          moment(params.row.releaseAmount.transferredDate).format('DD/MM/YYYY') :
          'N/A',

      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,

      align: 'center',
      headerAlign: 'center',
    },
    // { field: 'sanction', headerName: 'Special Sanction', width: 150, renderHeader: () => <b>Special Sanction</b>, align: 'center', headerAlign: 'center' },
    // {
    //   field: 'sanctionedAmount',

    //   headerName: 'Sanctioned Amount',
    //   width: 150,
    //   renderHeader: () => <b>Sanctioned Amount</b>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'sanctionedAmount',
      headerName: 'Sanctioned Amount',
      width: 180,
      renderHeader: () => <b>Sanctioned Amount</b>,
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount?.toFixed(2);
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0).toFixed(2);
        }
        return 0; // or return a suitable default value
      }, align: 'center',
      headerAlign: 'center',
    },
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

    // {
    //   field: 'sanctionedAsPer',

    //   renderHeader: () => <b>Sanction As Per</b>,
    //   renderCell: (props) => (
    //     <p
    //       style={{
    //         maxWidth: 200,
    //         whiteSpace: 'normal',
    //         wordBreak: 'break-word',
    //         justifyContent: 'center',
    //         textAlign: 'center',
    //       }}
    //     >
    //       {' '}
    //       {props.row.sanctionedAsPer.toString()}
    //     </p>
    //   ),
    //   width: 200,
    //   align: 'center',
    //   headerAlign: 'center',
    // },

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
    {
      field: 'sanctionedBank',
      headerName: 'Sanctioned Bank',
      width: 150,
      renderHeader: () => <b>Sanctioned Bank</b>,
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 300,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {' '}
          {props.row.sanctionedBank?.split('-')[0] || ''}
        </p>
      ),
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'beneficiary',
      headerName: 'Beneficiary Name',
      width: 200,
      renderHeader: () => <b>Beneficiary Name</b>,
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 300,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {props.row.sanctionedBank?.split('-')[1] || ''}
        </p>
      ),
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.sanctionedBank?.split('-')[1] || '',
    },
    // {
    //   field: 'status',

    //   renderHeader: () => <b>Status</b>,
    //   width: 300,
    //   align: 'center',
    //   headerAlign: 'center',
    //   cellClassName: (params) => {
    //     const statusName = params.formattedValue;
    //     if (params.value == null) {
    //       return '';
    //     }
    //     switch (statusName) {
    //     case 'WAITING FOR OFFICE MNGR':
    //       return clsx('orange');
    //     case 'WAITING FOR ACCOUNTS STATE':
    //       return clsx('orange');
    //     case 'IRO CLOSED':
    //       return clsx('green');
    //     case 'WAITING FOR ACCOUNTS MNGR':
    //       return clsx('green');
    //     case 'AMOUNT RELEASED':
    //       return clsx('green');
    //     case 'RECONCILIATION DONE':
    //       return clsx('green');
    //     case 'WAITTING FOR RELEASE AMOUNT':
    //       return clsx('orange');
    //     default:
    //       // console.log('No class applied');
    //       return '';
    //     }
    //   },

    //   valueGetter: (params) => {
    //     let statusName = IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
    //     // Check if the status name needs to be changed
    //     switch (statusName) {
    //     case 'SEND_BACK':
    //       statusName = 'REVERTED';
    //       break;
    //     case 'FR_APPROVED':
    //       statusName = 'FR VERIFIED'; // Change to whatever new name you want
    //       break;
    //     case 'FR_REJECTED':
    //       statusName = ' FR DISAPPROVED'; // Change to whatever new name you want
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
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 130,
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
          {moment(props.row.updatedAt).format('DD/MM/YYYY')}
        </p>
      ),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
  ];
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (flattenedData ?? []).filter((row: IROrder) => {
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
  return (
    <CommonPageLayout
      title={props.action == 'manage' ? 'Manage IRO' : 'Fm Request'}
      status={'WAITING FOR RELEASE AMOUNT'}
      momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setGroupIro((iroReq: any) =>
            iroReq ?
              iroReq.filter((iro:any) => {
                if (!iro?.IRODate) return false; // Skip invalid entries

                const iroDate = moment(iro.IRODate); // Convert to moment object
                return (
                  iroDate.isSameOrAfter(moment(dateRange?.startDate)) &&
                    iroDate.isSameOrBefore(moment(dateRange?.endDate))
                );
              }) :
              [],
          );
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }}
    >
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
                <Grid item xs={3} >
                  <PermissionChecks
                    permissions={['MANAGE_IRO']}
                    granted={
                      <Button
                        onClick={async () => {
                          const sheet = IROrder ?
                            IROrder.map((iro: IROrder) => [
                              iro.IROno,
                              iro.IRODate.format('DD/MM/YYYY'),
                              iro.division?.details.name,
                              iro.purposeSubdivision?.name,
                              iro.mainCategory,
                              iro.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0),
                              iro.sanctionedAmount?? iro.particulars?.reduce((total, particular) => Number(particular.sanctionedAmount), 0),
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
                          XLSX.writeFile(workbook, props.action == 'manage' ? 'IRO_Report.xlsx' : 'Release_Amt_IRO_Report.xlsx', { compression: true });
                        }}
                        startIcon={<DownloadIcon />}
                        color="primary"
                        sx={{ float: 'right', mr: 2, mt: 2 }}
                        variant="contained"
                      >
                        Export
                      </Button>
                    }
                  />
                  {hasPermissions(['MANAGE_IRO']) && props.action == 'release' ? (
                    <Button
                      variant="contained"
                      sx={{ float: 'right', mt: 2, mr: 2 }}
                      startIcon={<AttachMoneyIcon />}
                      disabled={releaseAmountIROs.length == 0}
                      onClick={() => {
                        if (releaseAmountIROs.every((iro) => iro.sanctionedBank== releaseAmountIROs[0].sanctionedBank)) {
                          // setOpenRelease(true);
                          IROServices.getReleaseAmountById(releaseAmountIROs[0]?.releaseAmount?._id?? '').then((res) => {
                            setReleaseAmount(res.data);
                          });
                          setOpenReleaseConform(true);
                          setNewTest(releaseAmountIROs);
                        } else {
                          enqueueSnackbar({ message: 'IRO of Different Sanctioned Bank selected', variant: 'error' });
                        }
                      }}
                    >
                      Bulk Release
                    </Button>
                  ) : null}
                </Grid>
                <>
                  {/* ================= STATUS FILTER ================= */}
                  <Grid item>
                    <ToggleButtonGroup
                      exclusive
                      size="small"
                      value={exstatusFilter.includes(69) ? 'NonBankTransfers' :exstatusFilter.includes(71) ? 'BankTransfers': 'All'}
                      onChange={(_, value) => {
                        if (!value) return;

                        if (value === 'NonBankTransfers') {
                          setExStatusFilter([69]);
                        } else if (value === 'BankTransfers') {
                          setExStatusFilter([71]);
                        } else {
                          setExStatusFilter([]);
                          setStatusFilter([]);
                        }
                      }}
                      sx={toggleSx}
                    >
                      <ToggleButton value="All">ALL</ToggleButton>
                      <ToggleButton value="NonBankTransfers">
        NON BANK TRANSFERS
                      </ToggleButton>
                      <ToggleButton value="BankTransfers">BANK TRANSFERS</ToggleButton>

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
                            value === 'Sanctioned' ?
                              'Sanctioned' :
                              value === 'Expanse' ?
                                'Expanse' :
                                'All',
                        );
                      }}
                      sx={toggleSx}
                    >
                      <ToggleButton value="All">All</ToggleButton>
                      <ToggleButton value="Support">SUPPORT</ToggleButton>
                      <ToggleButton value="Expanse">EXPENSE</ToggleButton>
                      <ToggleButton value="Sanctioned">SANCTIONED</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      'height': '66vh',
                      'width': '100%',
                      '& .super-app-theme--cell': {
                        backgroundColor: '#f1f5fa',
                        fontSize: '16px',
                        fontWeight: '500',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        'height': 300,
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
                        '& .green': {
                          backgroundColor: '#80f76a',
                        },
                        '& .orange': {
                          backgroundColor: '#ffd35c',
                        },
                        '& .red': {
                          backgroundColor: '#ff6166',
                        },
                      }}
                    >
                      <div style={{ height: '65vh', width: '100%' }}>
                        <DataGrid
                          rows={filteredRows}
                          columns={columns}
                          getRowId={(row) => row._id}
                          checkboxSelection={props.action === 'release'}
                          disableRowSelectionOnClick={props.action === 'release'}

                          isRowSelectable={(params:any) =>
                            selectedDivisions.length === 0 ?
                              true :
                              selectedDivisions.includes(params?.row?.division?.details?.name)
                          }
                          onRowSelectionModelChange={(newRowSelectionModel) => {
                            console.log(newRowSelectionModel, 'newRowSelectionModel');
                            const selectedRow = flattenedData.find((iro: IROrder) => iro._id === newRowSelectionModel[0] );
                            setSelectedIroNo(selectedRow?.IROno|| null); // Accessing the inner iroNo
                            setReleaseAmountIROs(() => {
                              const selectedIROs = flattenedData.filter((iro: any) => newRowSelectionModel.includes(iro._id));
                              return selectedIROs;
                            });
                          }}
                          // getRowClassName={(params) => {
                          //   const parentGroupIndex = (params.row as any).parentGroupIndex;
                          //   // Apply color based on the parent group index
                          //   if (parentGroupIndex % 3 === 0) {
                          //     return 'group-color-1';
                          //   } else if (parentGroupIndex % 3 === 1) {
                          //     return 'group-color-2';
                          //   } else {
                          //     return 'group-color-3';
                          //   }
                          // }}
                        />
                      </div>
                    </Box>
                    {/* <DataGrid
                      rows={filteredRows ?? []}
                      columns={columns}
                      getRowId={(row) => row._id}
                      checkboxSelection={props.action == 'release'}
                      disableRowSelectionOnClick={props.action == 'release'}
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        // setSelectedIROrelease(newRowSelectionModel);

                        setReleaseAmountIROs(() => {
                          const selectedIROs = IROrder ? IROrder.filter((iro) => newRowSelectionModel.includes(iro._id)) : [];

                          return selectedIROs;
                        });
                      }}
                      style={{ height: '80vh', width: '100%' }}
                    // rowSelectionModel={selectedIROrelease}
                    //
                    /> */}
                  </Card>
                </Grid>

              </Grid>

            </Card>


            <Grid>
              <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }}>
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
              <Dialog open={addSignature} sx={{ width: 400, margin: '0 auto' }}>
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
                          IROServices.getAll().then((res) => {
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
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file?.name).then((res) => {
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
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name, selectedIRO._id).then((res) => {
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
            <ReleaseAmount action={'manage'} onClose={() => setOpenRelease(false)} open={openRelease} data={ releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
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
        getFiles={selectedIRO?.billAttachment ?? []}
      />
      <Dialog open={supportAttachment} onClose={() => setSupportAttachment(false)} maxWidth="xs" fullWidth>
        <DialogTitle> Signature Attachment </DialogTitle>
        <DialogContent>
          <Container>Please download and attach the signature sheet: &nbsp;
            {selectedIRO.signatureSheet?<a href="#" onClick={async () => {
              const file = (await FileUploaderServices.getFile(selectedIRO?.signatureSheet ?? '')).data;
              if (file.downloadURL) {
                const link = document.createElement('a');
                link.href = file.downloadURL;
                link.download = 'WorkersSignatureSheet.pdf'; // You can specify a custom file name here
                link.click();
              }
            }}>WorkersSignatureSheet.pdf</a>:(pdfProps&&
            <>
              <BlobProvider document={<IROReconciliationPdf data={pdfProps} />}>
                {({ loading, url }) =>
                  loading ? (
                    <span style={{ color: 'blue' }}>....</span>
                  ) : (
                    <a
                      href={url ?? ''}
                      download="WorkersSignatureSheet.pdf"
                      style={{ color: 'blue' }}
                    >
        WorkersSignatureSheet.pdf
                    </a>
                  )
                }
              </BlobProvider>
              <br />
            </>)}NB: Ignore if already attached </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSupportAttachment(false);
            }}
            variant="text"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPrintIro} onClose={() => setOpenPrintIro(false)} maxWidth="xs" fullWidth>
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
      </Dialog>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: 400, maxHeight: 300, overflowY: 'auto' }}>
          <Typography fontWeight={600} mb={1}>
      Group IROs
          </Typography>

          {selectedIros.map((iro, index) => (
            <Chip
              key={index}
              label={iro}
              sx={{ mr: 1, mb: 1 }}
              size="small"
            />
          ))}
        </Box>
      </Popover>
      <Dialog open={Boolean(iroData)} onClose={() => setIroData(null)} maxWidth="xs" fullWidth>
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
              setIroData(null);
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
      <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
        <DialogContent>
          <Typography sx={{ color: 'red' }}>Are you sure you want to delete this IRO?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setDeleteModel(false)}>Close</Button>
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              deleteIRO(selectedIROId?.toString()?? '');
            } }
          >
                 Delete
          </Button>
        </DialogActions>

      </Dialog>
      <Dialog open={Boolean(openReleaseConform)} onClose={() => setOpenReleaseConform(false)}>
        <DialogTitle>Reminder</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'red' }}>
         This {selectedIroNo} is part of a bulk release, the following IROs will also be released along with it:{releaseAmount?.IRO?.map((e)=><li>{e.IROno}</li>)}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setOpenReleaseConform(false)}>Close</Button>
          <Button
            // endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              setOpenRelease(true);
            } }
          >
                 Confirm
          </Button>
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
      {selectedIROId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIROId}/>}
      <ReleaseAmountDialogEdit action={'add'} onClose={() => setOpenReleaseEdit(false)} open={openReleaseEdit} data={ releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />

    </CommonPageLayout>
  );
};

export default ReleaseFmRequest;
