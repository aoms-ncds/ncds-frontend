/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Alert, Typography, Divider, Box, Container, Tooltip, FormControl, FormControlLabel, Radio, RadioGroup, ListSubheader,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  ListItemIcon,
  Menu,
} from '@mui/material';
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
  MoreHorizOutlined,
} from '@mui/icons-material';

import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
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
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import SanctionLetter from '../FR/components/authLatter';
import formatAmount from '../Common/formatcode';
import React from 'react';


type BankDetails = {
  accountNumber?: string;
  beneficiary?: string;
};

const ManageIRO = (props: { action: 'manage' | 'release' }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const finder =Number(params.get('id'));
  console.log(finder, 'oo5');
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [statusFilter, setStatusFilter] = useState([IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE]); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'|'Custom'|'Sanctioned'| null>('All'); // default WFA: Waiting for access or Reverted
  const [openPrintFr, setOpenPrintFr] = useState(false);
  const [data6, setData6] = useState<FR | null>(null);
  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [divisionSearch, setDivisionSearch] = useState('');


  const [FrData, setFrData] = useState<FR | null>(null);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [showHRFileUploader, setShowHRFileUploader] = useState(false);
  const [showAccountFileUploader, setShowAccountFileUploader] = useState(false);
  const [showAccountManagerFileUploader, setShowAccountManagerFileUploader] = useState(false);
  const [attachment, setAttachment] = useState<boolean>(false);
  const [file, setFile] = useState<boolean>(false);
  const [supportAttachment, setSupportAttachment] = useState<boolean>(false);
  const [sendNotification, toggleSendNotification] = useState<boolean>(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const [addSignature, toggleAddSignature] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const user = useAuth();
  const [searchText, setSearchText] = useState('');
  const [mngrName, setMngrName] = useState('');
  const [isCoordinator, setisCoordinator] = useState<any>(false);
  console.log(releaseAmountIROs, 'exstatusFilter');
  const [openLog, setOpenLog] = useState(false);
  const toggleSx = {
    'display': 'flex',
    'flexWrap': 'wrap', // ✅ allow natural wrapping
    'gap': 1, // spacing between buttons

    '& .MuiToggleButton-root': {
      'border': '1px solid #dcdcdc',
      'borderRadius': 2,
      'textTransform': 'none',
      'fontSize': '0.85rem',
      'fontWeight': 500,
      'px': 2.5,
      'py': 1,
      'minWidth': 'fit-content', // ✅ important
      'whiteSpace': 'nowrap', // prevent text break

      '&.Mui-selected': {
        backgroundColor: '#eaeaea',
        color: '#000',
        fontWeight: 600,
      },
    },
  };
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
  const [openReason, setOpenReason] = useState(false);

  const [openReleaseConform, setOpenReleaseConform] = useState(false);
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [openRelease, setOpenRelease] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>([]);
  const [IRO, setIRO] = useState<IROrder>();
  const [FR, setFR] = useState<FR>();
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
  const [selectedIROData, setSelectedIROData] = useState<IROrder | null>(null);

  let total = 0;
  selectedIRO?.particulars?.forEach((particular) => {
    if (particular?.sanctionedAmount) {
      total += particular?.sanctionedAmount;
    }
  });
  console.log(FR, '#ODD');
  console.log(newTest, '#NEW');
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
  console.log(statusFilter, 'selectedIROId');
  useEffect(() => {
    if (finder === 1|| 0) {
      setStatusFilter([IROLifeCycleStates.AMOUNT_RELEASED]);
    } else if (finder === 2|| 0) {
      setStatusFilter([IROLifeCycleStates.RECONCILIATION_DONE]);
    } else if (finder === 3) {
      setStatusFilter([FRLifeCycleStates.WAITING_FOR_ACCOUNTS]);
    } else if (finder === 4) {
      setStatusFilter([]);
    } else if (finder === 5) {
      setStatusFilter([IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR]);
    }
  }, [finder]);
  const attach = async (blob: Blob) => {
    try {
      if (iroData) {
        // File Blob creation
        const fileBlob = blob instanceof Blob ? new File([blob], `${iroData?.IROno}_Receipt.pdf`, { type: 'application/pdf' }) : null;
        if (fileBlob) {
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
  //   // IROServices.getById(selectedIROId ?? '').then((res)=>{
  //   //   setIRO(res.data);
  //   // });
  //   FRServices.getById(IRO?.FR ?? '').then((res)=>{
  //     setFR(res.data);
  //   });
  // }, [selectedIROId]);

  const userPermissions = (user.user as User)?.permissions;
  useEffect(() => {
    if (props.action === 'release') {
      // if (userPermissions?.ACCOUNTS_MNGR_ACCESS) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT })
      //     .then((res) => {
      //       // console.log(res.data, 'sds');
      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      if (userPermissions?.FCRA_ACCOUNTS_ACCESS && !userPermissions?.LOCAL_ACCOUNT_ACCESS) {
        IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, sourceOfAccount: 'FCRA', ...(statusFilter !== undefined && { status: statusFilter }) })
          .then((res) => {
            // console.log(res.data, 'KKK');
            setNotFound(true);
            setIROrder(() => [...res.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (userPermissions?.LOCAL_ACCOUNT_ACCESS && !userPermissions?.FCRA_ACCOUNTS_ACCESS) {
        IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, sourceOfAccount: 'Local' })
          .then((res) => {
            // console.log(res?.data, 'KKK');;
            setNotFound(true);

            setIROrder(() => [...res.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      if (userPermissions?.LOCAL_ACCOUNT_ACCESS && userPermissions?.FCRA_ACCOUNTS_ACCESS) {
        IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter }).then((res) => {
          setIROrder(res.data);
          setNotFound(true);
          // console.log(res.data, 'datgajdfj');
        });
      }
    } else {
      Promise.all([
        IROServices.getAllOptimized({
          Exstatus: exstatusFilter,
          dateRange: dateRange,
          status: statusFilter,
        }),
        IROServices.getAllCustom({
          dateRange: dateRange,
          status: statusFilter,
        }),
      ]).then(([optimizedRes, customRes]) => {
        setNotFound(true);

        const filteredOptimized = optimizedRes.data.filter((iro) =>
          iro.IRODate.isSameOrAfter(dateRange.startDate) &&
    iro.IRODate.isSameOrBefore(dateRange.endDate),
        );
        // let filteredCustom;
        const filteredCustom = customRes.data.filter((iro) =>
          iro.IRODate.isSameOrAfter(dateRange.startDate) &&
      iro.IRODate.isSameOrBefore(dateRange.endDate),
        );


        // ✅ MERGE BOTH
        const combinedData = [...filteredOptimized, ...filteredCustom];

        setIROrder(combinedData); // or whatever main list state
      });
    }
  }, [attachment, addSignature, dateRange, iroData, statusFilter, exstatusFilter]);
  // console.log(mngrName, 'mngrName');
  useEffect(()=>{
    if (userPermissions?.LOCAL_ACCOUNT_ACCESS && !userPermissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1, sourceOfAccount: 'Local' }).then((res) => {
        setNotFound(true);
        setIROrder(res.data.filter((iro) => iro.IRODate.isSameOrAfter(dateRange.startDate) && iro.IRODate.isSameOrBefore(dateRange.endDate)));
      });
    } else if (userPermissions?.FCRA_ACCOUNTS_ACCESS && !userPermissions?.LOCAL_ACCOUNT_ACCESS) {
      IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1, sourceOfAccount: 'FCRA' }).then((res) => {
        setNotFound(true);
        setIROrder(res.data.filter((iro) => iro.IRODate.isSameOrAfter(dateRange.startDate) && iro.IRODate.isSameOrBefore(dateRange.endDate)));
      });
    } else {
      IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1 }).then((res) => {
        setNotFound(true);
        setIROrder(res.data.filter((iro) => iro.IRODate.isSameOrAfter(dateRange.startDate) && iro.IRODate.isSameOrBefore(dateRange.endDate)));
      });
    }
  }, [statusFilter1, finder]);

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
  // Refering to existing method
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
        setMngrName((res.data as { officeManagerName: string }).officeManagerName);
        setSignature(res.data as Esignature);
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });

    DivisionsServices.isCoordinator()
      .then((res) => {
        setisCoordinator(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

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
  // Rest of your component code...
  useEffect(() => {
    // Check if `selectedIRO` has a valid ID and `billAttachment` is not empty
    if (selectedIRO._id !== '' && selectedIRO.billAttachment.length > 0) {
      IROServices.updateIRO(selectedIRO._id, selectedIRO, false, true);
    }
  }, [file]);

  //  const getTransferredAccountNumber = (iro: IROrder): string | null => {
  //   const division = iro.division;
  //   if (!division || !iro.sanctionedBank) return null;

  //   const bank = iro.sanctionedBank.split('-')[0].trim();
  //   console.log(bank, 'bank here');

  //   switch (bank) {
  //     case 'FCRA Bank Details':
  //       return division.FCRABankDetails?.accountNumber ?? null;

  //     case 'local Bank Details':
  //       return division.localBankDetails?.accountNumber ?? null;

  //     case 'otherBankDetails':
  //       return division.otherBankDetails?.accountNumber ?? null;

  //     case 'Division Bank FCRA':
  //       return division.DivisionBankFCRA?.accountNumber ?? null;

  //     case 'Division Bank Local':
  //       return division.DivisionBankLocal?.accountNumber ?? null;

  //     case 'Local Bank':
  //       return division.localBankDetails?.accountNumber ?? null;

  //     case 'FCRA':
  //       return division.FCRABankDetails?.accountNumber ?? null;

  //     case 'Beneficiary Bank 1':
  //       return division.BeneficiaryBank1?.accountNumber ?? null;

  //     case 'Beneficiary Bank 2':
  //       return division.BeneficiaryBank2?.accountNumber ?? null;

  //     case 'Beneficiary Bank 3':
  //       return division.BeneficiaryBank3?.accountNumber ?? null;

  //     case 'Beneficiary Bank 4':
  //       return division.BeneficiaryBank4?.accountNumber ?? null;

  //     case 'Beneficiary Bank 5':
  //       return division.BeneficiaryBank5?.accountNumber ?? null;

  //     case 'Beneficiary Bank 6':
  //       return division.BeneficiaryBank6?.accountNumber ?? null;

  //     case 'Beneficiary Bank 7':
  //       return division.BeneficiaryBank7?.accountNumber ?? null;

  //     default:
  //       return null;
  //   }
  // };


  const getTransferredAccountNumber = (iro: IROrder): string | null => {
    const division = iro.division;
    if (!division || !iro.sanctionedBank) return null;
    const [bankName, beneficiaryName] = iro.sanctionedBank
    .split('-')
    .map((v) => v.trim());
    const divisionRecord =
    division as unknown as Record<string, BankDetails | undefined>;
    if (bankName.startsWith('Beneficiary Bank')) {
      for (const key in divisionRecord) {
        if (!key.startsWith('BeneficiaryBank')) continue;

        const bank = divisionRecord[key];

        if (bank?.beneficiary === beneficiaryName) {
          return bank.accountNumber ?? null;
        }
      }
      return divisionRecord['otherBankDetails']?.accountNumber ?? null;
    }

    const fixedMap: Record<string, string> = {
      'FCRA Bank Details': 'FCRABankDetails',
      'local Bank Details': 'localBankDetails',
      'otherBankDetails': 'otherBankDetails',
      'Division Bank FCRA': 'DivisionBankFCRA',
      'Division Bank Local': 'DivisionBankLocal',
      'Local Bank': 'localBankDetails',
      'FCRA': 'FCRABankDetails',
    };
    const key = fixedMap[bankName];
    if (key) {
      return divisionRecord[key]?.accountNumber ?? null;
    }
    return null;
  };


  useEffect(() => {
    DivisionsServices.getDivisions().then((res) => {
      const names = res.data.map((d: any) => d.details.name);
      setDivisions(names);
    });
  }, []);

  // Handle division selection change
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
              <MoreHorizOutlined fontSize="small" />
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

              {/* ================= VIEW ================= */}

              <Section title="VIEW" />


              {/* Release Amount */}
              {(
                params.row.status === IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE ||
  (params.row.status === IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR &&
    props.action === 'release')
              ) && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon>
                    <CurrencyRupeeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Release Amount" />
                </MenuItem>
              )}

              {/* View Release Amount */}
              {params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon>
                    <PreviewIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="View Release Amount" />
                </MenuItem>
              )}
              <MenuItem onClick={() => window.open(`/iro/${params.row._id}`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="View & Manage"/>
              </MenuItem>

              <MenuItem onClick={() => window.open(`/fr/${(params?.row?.FR as any)?._id}/view`, '_blank')}>
                <ListItemIcon><PreviewIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="View FR"/>
              </MenuItem>

              {(params.row.reasonForRejectIRO || (params.row as any).reasonForRevertToDivision) && (
                <MenuItem onClick={()=>{
                  setOpenReason(true);
                  setSelectedIROData(params.row);
                }}>
                  <ListItemIcon><EditNoteIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="View Reasons"/>
                </MenuItem>
              )}

              {params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon><PreviewIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="View Release Amount"/>
                </MenuItem>
              )}

              <MenuItem onClick={()=>{
                setSelectedIROId(params.row._id);
                setOpenLog(true);
              }}>
                <ListItemIcon><PreviewIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="IRO Log"/>
              </MenuItem>

              <Divider/>

              {/* ================= EDIT / UPDATE ================= */}

              <Section title="EDIT / UPDATE"/>
              {(hasPermissions(['ADMIN_ACCESS']) ||
  hasPermissions(['FCRA_ACCOUNTS_ACCESS']) ||
  hasPermissions(['LOCAL_ACCOUNT_ACCESS']) ||
  hasPermissions(['ACCOUNTS_MNGR_ACCESS'])) && (
                <MenuItem onClick={() => [setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit Release Amount" />
                </MenuItem>
              )}
              {(props.action !== 'manage' &&
        (hasPermissions(['ACCOUNTS_MNGR_ACCESS']) ||
        hasPermissions(['FCRA_ACCOUNTS_ACCESS']) ||
        hasPermissions(['LOCAL_ACCOUNT_ACCESS']) ||
        hasPermissions(['ADMIN_ACCESS'])) ||
        IROLifeCycleStates.REVERTED_TO_DIVISION === params.row.status && !isCoordinator) && (
                <MenuItem onClick={()=> window.open(`/iro/${params.row._id}/edit`, '_blank')}>
                  <ListItemIcon><EditIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="Edit"/>
                </MenuItem>
              )}

              {(isCoordinator || hasPermissions(['ADMIN_ACCESS'])) &&
      (params.row.status === IROLifeCycleStates.REOPENED ||
      params.row.status === IROLifeCycleStates.REVERTED_TO_DIVISION) && (
                <MenuItem onClick={()=> window.open(`/iro/${params.row._id}/EditIROForRevert`, '_blank')}>
                  <ListItemIcon><EditIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="Edit for coordinator"/>
                </MenuItem>
              )}

              {/* {(params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE ||
      (IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR && props.action === 'release')) && (
                <MenuItem onClick={()=>[setOpenRelease(true), setReleaseAmountIROs([params.row])]}>
                  <ListItemIcon><CurrencyRupeeIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="Release Amount"/>
                </MenuItem>
              )} */}

              <MenuItem onClick={()=>{
                toggleOpenRemarks(true);
                setSelectedIROId(params.row._id);

                IROServices.getAllRemarksById(params.row._id)
          .then((res)=> setRemarks(res.data ?? []))
          .catch((error)=>{
            enqueueSnackbar({
              variant: 'error',
              message: error.message,
            });
          });
              }}>
                <ListItemIcon><EditNoteIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="Remarks"/>
              </MenuItem>

              <Divider/>

              {/* ================= PRINT ================= */}

              <Section title="PRINT"/>

              {params.row.closedIroPdf && (
                <MenuItem onClick={()=>{
                  setSelectedIRO(params.row);
                  setOpenPrintIro(true);
                }}>
                  <ListItemIcon><PrintIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="Print IRO"/>
                </MenuItem>
              )}

              {params.row.specialsanction === 'Yes' && (
                <MenuItem onClick={()=>{
                  FRServices.getAllOptimizedById((params.row?.FR as any)?._id).then((res)=>{
                    setData6(res.data);
                  });
                  setOpenPrintFr(true);
                  setTimeout(()=>setOpenPrintFr(false), 2000);
                }}>
                  <ListItemIcon><PrintIcon fontSize="small"/></ListItemIcon>
                  <ListItemText primary="Print FR Auth Letter"/>
                </MenuItem>
              )}

              <Divider/>

              {/* ================= COMMUNICATION ================= */}

              <Section title="COMMUNICATION"/>

              <MenuItem onClick={()=>{
                setSelectedIROId(params.row._id);
                toggleSendNotification(true);
              }}>
                <ListItemIcon><MessageIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="Send Notification"/>
              </MenuItem>

              <Divider/>

              {/* ================= DOCUMENTS ================= */}

              <Section title="DOCUMENTS"/>

              <MenuItem onClick={()=>{
                setViewFileUploader(true);
                setSelectedIRO(params.row);
              }}>
                <ListItemIcon><AttachmentIcon fontSize="small"/></ListItemIcon>
                <ListItemText primary="Attachments"/>
              </MenuItem>

              <Divider/>

              {/* ================= SYSTEM ================= */}

              <Section title="SYSTEM"/>

              {hasPermissions(['ADMIN_ACCESS']) && (
                <MenuItem
                  sx={{ color: 'error.main' }}
                  onClick={()=>{
                    FRServices.getById((params.row?.FR as any)?._id ?? '').then((res)=>{
                      setFR(res.data);
                    });

                    setSelectedIROId(params.row._id);
                    setDeleteModel(true);
                    setIRO(params.row);
                  }}
                >
                  <ListItemIcon sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Delete"/>
                </MenuItem>
              )}

            </Menu>
          </>
        );
      },
    },
    ...(props.action === 'manage' ?
      [
        {
          field: 'status',
          headerClassName: 'status-header',

          renderHeader: () => <b>Status</b>,
          width: 250,
          align: 'center' as const,
          headerAlign: 'center' as const,

          cellClassName: (params: any) => {
            const statusName = params.formattedValue;

            if (params.value == null) {
              return '';
            }

            switch (statusName) {
            case 'WAITING APPROV.':
              return clsx('status-cell', 'yellow-light');

            case 'WAITING FOR ACCOUNTS MNGR':
              return clsx('status-cell', 'yellow-dark');

            case 'IRO APPROVED':
              return clsx('status-cell', 'orange-light');
            // case 'RE-SUBMITTED':
            case 'CUSTOM IRO':
              return clsx('status-cell', 'status-cell', 're-sum');

            case 'WAITING RELEASE.':
              return clsx('status-cell', 'orange-dark');
            case 'REOPENED':
              return clsx('status-cell', 'status-cell', 're-color');

            case 'AMT RELEASED':
              return clsx('status-cell', 'green-light');

            case 'RECONCILIATION DONE':
              return clsx('status-cell', 'green-medium');

            case 'IRO CLOSED':
              return clsx('status-cell', 'green-dark');

            case 'IRO DISAPPROVED':
              return clsx('status-cell', 'status-cell', 'status-cell', 'red-light');

            case 'IN PROCESS':
              return clsx('status-cell', 'status-cell', 'dark-orange');

            case 'REVERTED':
              return clsx('status-cell', 'revert');
            case 'DISAPPROVED':
              return clsx('status-cell', 'DISAPPROVED');
            case 'IRO PROCESS':
              return clsx('status-cell', 'DISAPPROVED');

            default:
              return '';
            }
          },

          valueGetter: (params: any) => {
            let statusName =
            IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);

            const iscustom = (params.row as any)?.isCustom;

            if (iscustom === true) {
              return 'CUSTOM IRO';
            }

            switch (statusName) {
            case 'SEND_BACK':
              statusName = 'REVERTED';
              break;
            case 'REVERTED_TO_DIVISION':
              statusName = 'REVERTED';
              break;
            case 'REOPENED':
              statusName = 'REOPENED';
              break;

            case 'FR_APPROVED':
              statusName = 'FR VERIFIED';
              break;

            case 'FR_REJECTED':
              statusName = 'DISAPPROVED';
              break;

            case 'WAITING_FOR_OFFICE_MNGR':
              statusName = 'WAITING APPROV.';
              break;
            case 'WAITTING_FOR_RELEASE_AMOUNT':
              statusName = 'WAITING RELEASE.';
              break;

            case 'WAITING_FOR_ACCOUNTS_STATE':
              statusName = 'IRO APPROVED';
              break;
            case 'AMOUNT_RELEASED':
              statusName = 'AMT RELEASED';
              break;

            case 'IRO_IN_PROCESS':
              statusName = 'IRO PROCESS';
              break;

            default:
              statusName = statusName?.replaceAll('_', ' ');
              break;
            }

            return statusName;
          },
        },
      ] :
      []),


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
      field: 'divisionName',
      renderHeader: () => <b>Division Name</b>,
      valueGetter: (params) =>
        `${params.row.division?.details?.name || ''}${
          params.row.purposeSubdivision?.name ? ' / ' : ''
        }${params.row.purposeSubdivision?.name || ''}`,
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'subDivisionName',
    //   renderHeader: () => <b>Sub Division Name</b>,
    //   valueGetter: (params) => params.row.purposeSubdivision?.name,
    //   width: 160,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
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
          {props.row?.particulars[0]?.mainCategory}
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
        if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '' && subCategory3 !== '.') {
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
        return formatAmount(particularAmount.toFixed(2));
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
    // {
    //   field: 'Amount Release Date',
    //   headerName: 'Amount Release Date',
    //   width: 200,
    //   valueGetter: (params) => params.row.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? 'N/A',
    //   renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
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
          return formatAmount(params.row.sanctionedAmount as number);
        }
        if (Array.isArray(params.row.particulars)) {
          return formatAmount(
            params.row.particulars.reduce(
              (sum, item) => sum + (Number(item.sanctionedAmount) || 0),
              0,
            ).toFixed(2));
        }
        return 0; // or return a suitable default value
      }, align: 'center',
      headerAlign: 'center',
    },
    ...(props.action === 'manage' ?
      [
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
      ] :
      []),

    // {
    //   field: 'sanctionedAsPer',

    //   renderHeader: () => <b>Sanction As Per</b>,
    //   renderCell: (props) => (
    //     <p
    //       style={{
    //         maxWidth: 200,
    //         whiteSviewpace: 'normal',
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
    // ...(props.action !== 'release' ?
    //   [
    //     {
    //       field: 'reasonForRejectIRO',

    //       headerName: 'Beneficiary Name',
    //       width: 200,
    //       renderHeader: () => <b>Reason For Reject</b>,
    //       renderCell: (props:any) => (
    //         <p
    //           style={{
    //             maxWidth: 300,
    //             whiteSpace: 'normal',
    //             wordBreak: 'break-word',
    //             justifyContent: 'center',
    //             textAlign: 'center',
    //           }}
    //         >
    //           {props.row.reasonForRejectIRO}
    //         </p>
    //       ),
    //       align: 'center' as const, // Explicitly cast to `GridAlignment`
    //       headerAlign: 'center' as const,
    //     },
    //   ] :
    //   []),
    // ...(props.action !== 'release' ?
    //   [
    //     {
    //       field: 'reasonForRevertToDivision',

    //       headerName: 'Beneficiary Name',
    //       width: 250,
    //       renderHeader: () => <b>Reason For Revert To Division</b>,
    //       renderCell: (props:any) => (
    //         <p
    //           style={{
    //             maxWidth: 300,
    //             whiteSpace: 'normal',
    //             wordBreak: 'break-word',
    //             justifyContent: 'center',
    //             textAlign: 'center',
    //           }}
    //         >
    //           {props.row.reasonForRevertToDivision}
    //         </p>
    //       ),
    //       align: 'center' as const, // Explicitly cast to `GridAlignment`
    //       headerAlign: 'center' as const,
    //     },
    //   ] :
    //   []),

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
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  // Update the filteredRows function to include division filtering
  const filteredRows = (IROrder ?? []).filter((row: any) => {
  // Division filtering logic
    const divisionMatch = selectedDivisions.length === 0 ||
    selectedDivisions.includes(row?.division?.details.name);

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
      title={props.action == 'manage' ? 'Manage IRO' : 'Release Amount'}
      status={props.action == 'manage' ? '' : 'IRO APPROVED'}
      momentFilter={
        {
          dateRange: dateRange,
          onChange: (newDateRange) => {
            setDateRange(newDateRange);
            setIROrder((iroReq) => (iroReq ? iroReq.filter((iro) => iro.IRODate.isSameOrAfter(newDateRange.startDate) && iro.IRODate.isSameOrBefore(newDateRange.endDate)) : []));
          },
          rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
          initialRange: 'months',
        }
      }
    >
      <PermissionChecks
        permissions={['READ_IRO']}
        granted={
          <>
            <Card sx={{ maxWidth: '78vw', height: '100vh', alignItems: 'center' }}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={5}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    placeholder='Enter IROno, IRODate, Division,Sub ,Division, Main & SubCategory, Sanctioned Bank, Beneficiary Name'
                    onChange={handleSearchChange}
                    fullWidth
                  />
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

                <Grid item xs={4}>
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
                              iro.particulars[0].subCategory1,
                              iro.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0),
                              iro.sanctionedAmount ?? iro.particulars?.reduce((total, particular) => Number(particular.sanctionedAmount), 0),
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
                            'Sub Category',
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
                      disabled={releaseAmountIROs.length === 0}
                      onClick={() => {
                        if (releaseAmountIROs.length === 1) {
                          enqueueSnackbar({
                            message: 'Select atleast two items for release',
                            variant: 'error',
                          });
                          return;
                        }

                        const allowedPaymentMethods = [
                          'Debit Card',
                          'Net Banking',
                          'Other',
                          'UPI',
                          'Online Payment',
                          'Cash',
                          'NEFT',
                          'Credit Card',
                          'Closing Balance Adjsted',
                          'Website Payment',
                        ].map((method) => method.toLowerCase().trim());

                        const allowedPaymentMethodsInclude = releaseAmountIROs.some(
                          (iro) =>
                            iro.sanctionedBank &&
                            allowedPaymentMethods.some((method) =>
                              iro.sanctionedBank.toLowerCase().trim().includes(method),
                            ),
                        );

                        if (allowedPaymentMethodsInclude) {
                          const sameSanctionedBank = releaseAmountIROs.every(
                            (iro) => iro.sanctionedBank === releaseAmountIROs[0].sanctionedBank,
                          );

                          if (!sameSanctionedBank) {
                            enqueueSnackbar({
                              message: 'IRO of Different Sanctioned Bank selected',
                              variant: 'error',
                            });
                            return;
                          } else {
                            setOpenRelease(true);
                            setNewTest(releaseAmountIROs);
                            return;
                          }
                        } else {
                          const sameSanctionedBank = releaseAmountIROs.every(
                            (iro) => iro.sanctionedBank === releaseAmountIROs[0].sanctionedBank,
                          );
                          if (!sameSanctionedBank) {
                            enqueueSnackbar({
                              message: 'IRO of Different Sanctioned Bank or diffrent Beneficiary Name selected',
                              variant: 'error',
                            });
                            return;
                          }
                          const normalizeAccount = (acc?: string | null) =>
                            acc?.toString().replace(/\s+/g, '').trim() ?? null;

                          const accountNumbers = releaseAmountIROs.map((iro) =>
                            normalizeAccount(getTransferredAccountNumber(iro)),
                          );
                          console.log(accountNumbers, 'accountNumbers');

                          if (accountNumbers.some((acc) => !acc)) {
                            enqueueSnackbar({
                              message: 'Account number missing for one or more selected IROs',
                              variant: 'error',
                            });
                            return;
                          }

                          const isSameAccountNumber = accountNumbers.every(
                            (acc) => acc === accountNumbers[0],
                          );

                          if (!isSameAccountNumber) {
                            enqueueSnackbar({
                              message: 'Selected IROs have different account numbers',
                              variant: 'error',
                            });
                            return;
                          }

                          setOpenRelease(true);
                          setNewTest(releaseAmountIROs);
                        }
                      }}
                    >
                      Bulk Release
                    </Button>
                  ) : null}
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card
                      elevation={2}
                      sx={{
                        border: '1px solid #dcdcdc',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <CardContent sx={{ pb: '20px !important' }}>

                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          wrap="wrap"
                        >
                          {/* ================= MANAGE MODE ================= */}
                          {props.action === 'manage' && (
                            <>
                              {/* LEFT STATUS FILTER */}
                              <Grid item xs={12} lg={12}>
                                <ToggleButtonGroup
                                  exclusive
                                  size="small"
                                  value={
                                    exstatusFilter.includes(69) ? 'NonBankTransfers' :
                                      exstatusFilter.includes(71) ? 'BankTransfers' :
                                        exstatusFilter.includes(70) ? 'Custom' :
                                          statusFilter.includes(IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE) ? 'WFA' :
                                            statusFilter.includes(IROLifeCycleStates.AMOUNT_RELEASED) ? 'AMT' :
                                              statusFilter.includes(IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR) ? 'WFORA' :
                                                statusFilter.includes(IROLifeCycleStates.IRO_CLOSED) ? 'CLS' :
                                                  statusFilter.includes(IROLifeCycleStates.REJECTED) ? 'DIS' :
                                                    statusFilter.includes(IROLifeCycleStates.REOPENED) ? 'REOPN' :
                                                      statusFilter.includes(IROLifeCycleStates.IRO_IN_PROCESS) ? 'INP' :
                                                        statusFilter.includes(IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT) ? 'WR' :
                                                          statusFilter.includes(IROLifeCycleStates.REVERTED_TO_DIVISION) ? 'RTD' :
                                                            'ALL'
                                  }
                                  onChange={(_, value) => {
                                    if (!value) return;

                                    if (value === 'WFA') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE]);
                                    } else if (value === 'RTD') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.REVERTED_TO_DIVISION]);
                                    } else if (value === 'AMT') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.AMOUNT_RELEASED]);
                                    } else if (value === 'WFORA') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.WAITING_FOR_OFFICE_MNGR]);
                                    } else if (value === 'CLS') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.IRO_CLOSED]);
                                    } else if (value === 'DIS') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.REJECTED]);
                                    } else if (value === 'REOPN') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.REOPENED]);
                                    } else if (value === 'INP') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.IRO_IN_PROCESS]);
                                    } else if (value === 'WR') {
                                      setExStatusFilter([]);
                                      setStatusFilter([IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT]);
                                    } else if (value === 'Custom') {
                                      setExStatusFilter([70]);
                                      setStatusFilter([]);
                                    } else if (value === 'NonBankTransfers') {
                                      setExStatusFilter([69]);
                                      setStatusFilter([]);
                                    } else if (value === 'BankTransfers') {
                                      setExStatusFilter([71]);
                                      setStatusFilter([]);
                                    } else {
                                      setExStatusFilter([]);
                                      setStatusFilter([]);
                                    }
                                  }}
                                  sx={toggleSx}
                                >
                                  <ToggleButton value="ALL">ALL</ToggleButton>
                                  <ToggleButton value="WFORA">WAITING APPROV.</ToggleButton>
                                  <ToggleButton value="WFA">APPROVED</ToggleButton>
                                  <ToggleButton value="INP">IN PROCESS</ToggleButton>
                                  <ToggleButton value="WR">WAITING RELEASE</ToggleButton>
                                  <ToggleButton value="AMT">AMT RELEASED</ToggleButton>
                                  <ToggleButton value="RTD">REVERTED</ToggleButton>
                                  <ToggleButton value="CLS">CLOSED</ToggleButton>
                                  <ToggleButton value="DIS">DISPROVED</ToggleButton>
                                  <ToggleButton value="REOPN">REOPENED</ToggleButton>
                                  <ToggleButton value="Custom">CUSTOM</ToggleButton>
                                  <ToggleButton value="NonBankTransfers">NON BANK TRANSFERS</ToggleButton>
                                  <ToggleButton value="BankTransfers">BANK TRANSFERS</ToggleButton>
                                </ToggleButtonGroup>
                              </Grid>

                              {/* RIGHT CATEGORY FILTER */}
                            </>
                          )}
                          <Grid item xs={12} lg={5}>
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
                                      value === 'Sanctioned' ?
                                        'Sanctioned' :
                                        value === 'Custom' ?
                                          'Custom' :
                                          'All',
                                );
                              }}
                              sx={toggleSx}
                            >
                              <ToggleButton value="All">All</ToggleButton>
                              <ToggleButton value="Support">SUPPORT</ToggleButton>
                              <ToggleButton value="Expanse">EXPENSE</ToggleButton>
                              <ToggleButton value="Sanctioned">SANCTIONED</ToggleButton>
                              {/* <ToggleButton value="NonBankTransfers">Non Bank Transfers</ToggleButton> */}

                              {/* <ToggleButton value="Custom">Custom IRO</ToggleButton> */}
                            </ToggleButtonGroup>
                          </Grid>


                          {/* ================= RELEASE MODE ================= */}
                          {props.action === 'release' && (
                            <>
                              {/* RELEASE STATUS */}
                              <Grid item xs={12} md="auto">
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
                                      setStatusFilter([IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE]);
                                    }
                                  }}
                                  sx={toggleSx}
                                >
                                  <ToggleButton value="All">ALL</ToggleButton>
                                  <ToggleButton value="NonBankTransfers">NON BANK TRANSFERS</ToggleButton>
                                  <ToggleButton value="BANK TRANS.">BANK TRANS.</ToggleButton>
                                </ToggleButtonGroup>
                              </Grid>

                              {/* DIVISION FILTER */}
                            </>
                          )}


                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      'height': '100vh',
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
                        '& .orange-light': {
                          backgroundColor: '#7EC82F',
                          // backgroundColor: '#3949AB',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '& .orange-dark': {
                          backgroundColor: '#3949AB',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '& .yellow-light': {
                          backgroundColor: '#a964f4',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '& .yellow-dark ': {
                          backgroundColor: '#ffd700',
                        },
                        '& .green-light ': {
                          backgroundColor: '#E2445C',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '& .green-medium': {
                          backgroundColor: '#32cd32',
                        },
                        '& .green-dark ': {
                          backgroundColor: '#3b32e6 ',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '&  .red-light ': {
                          backgroundColor: '#ff7f7f',
                        },
                        '&   .red-dark ': {
                          backgroundColor: '#ff0000',
                        },
                        '&   .dark-orange': {
                          backgroundColor: '#00897B',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '&   .revert': {
                          backgroundColor: '#F57C00',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '&   .DISAPPROVED': {
                          backgroundColor: '#D32F2F',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '&   .InPro': {
                          backgroundColor: '#FDAB3D',
                          color: '#fff',
                          fontWeight: '600',
                        },
                        '& .re-color': {
                          backgroundColor: '#7B1FA2',
                          color: '#fff',
                          fontWeight: '600',
                        },
                      }} >
                      <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        getRowId={(row) => row._id}
                        checkboxSelection={props.action == 'release'}
                        disableRowSelectionOnClick={props.action == 'release'}
                        rowSelectionModel={rowSelectionModel}

                        isRowSelectable={(params:any) =>
                          selectedDivisions.length === 0 ?
                            true :
                            selectedDivisions.includes(params?.row?.division?.details?.name)
                        }

                        onRowSelectionModelChange={(newSelection) => {
                          setRowSelectionModel(newSelection as string[]);

                          const selectedIROs =
                            IROrder?.filter((iro) => newSelection.includes(iro._id)) ?? [];

                          setReleaseAmountIROs(selectedIROs);
                        }}

                        getRowClassName={(params) => {
                          if (params.row.specialsanction == 'Yes') {
                            return 'special-sanction';
                          }
                          return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
                        }}
                        style={{ height: '65vh', width: '100%' }}
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Card>

            {/* Rest of the component remains the same */}
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
                        Send to account manager
                      </Button>
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
                        Send to division head
                      </Button>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          toggleSendNotification(false);
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon />}
                      >
                        close
                      </Button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>

              {/* Rest of the dialogs and components remain the same */}
              <Dialog open={Boolean(data6)} onClose={() => setData6(null)} maxWidth="xs" fullWidth>
                <DialogTitle> Print Fr</DialogTitle>
                <DialogContent>
                  <Container>
                    Download the FR Auth Letter for {data6?.FRno}
                    <br />
                    {data6 && (
                      <BlobProvider document={<SanctionLetter data={data6 as any} />}>
                        {({ loading, url }) =>
                          loading || openPrintFr ? (
                            <span style={{ color: 'blue' }}>....</span>
                          ) : (
                            <a
                              href={url ?? ''}
                              download="AuthLetter.pdf"
                              style={{ color: 'blue' }}
                            >
                              AuthLetter.pdf
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
                      setData6(null);
                    }}
                    variant="text"
                  >
                    Cancel
                  </Button>
                </DialogActions>
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
                          setShowHRFileUploader(true);
                        }}
                      >
                        HR signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: 260 }}
                        onClick={() => {
                          setShowAccountManagerFileUploader(true);
                        }}
                      >
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
                        }}
                      >
                        Accountant Signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedIROId('');
                          toggleAddSignature(false);
                          IROServices.getAllOptimized().then((res) => {
                            setIROrder(res.data);
                            setNotFound(true);
                          });
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon />}
                      >
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Grid>
            <Dialog
              open={openReason}
              onClose={() => setOpenReason(false)}
              maxWidth="sm"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  p: 2,
                },
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} fontSize={18}>
                  {(selectedIROData as any)?.reasonForRevertToDivision? 'IRO REASON FOR REVERT': 'IRO REASON FOR DISAPPROVE'}
                </Typography>

                <IconButton onClick={() => setOpenReason(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider />

              {/* CONTENT */}
              <Box sx={{ mt: 2 }}>
                <Typography fontSize={14} mb={1}>
                  <b>FR No:</b> {selectedIROData?.IROno}
                </Typography>

                {/* REVERT REASON */}
                {(selectedIROData as any)?.reasonForRevertToDivision && (
                  <Box
                    sx={{
                      backgroundColor: '#FFF9E6',
                      borderLeft: '5px solid #FFA000',
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Reason Row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          minWidth: 140,
                          color: '#333',
                        }}
                      >
        Reason for Revert:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#D84315',
                        }}
                      >
                        {(selectedIROData as any)?.reasonForRevertToDivision}
                      </Typography>
                    </Box>

                    {/* Reverted By Row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          minWidth: 140,
                          color: '#333',
                        }}
                      >
        Reverted By:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1976D2',
                        }}
                      >
                        {(selectedIROData as any)?.revertedBy || 'Admin'}
                      </Typography>
                    </Box>

                    {/* Info */}
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#1976D2',
                        mt: 1,
                      }}
                    >
      ℹ️ Info: Resubmit the FR within 3 days
                    </Typography>
                  </Box>
                )}

                {/* REJECT REASON */}
                {selectedIROData?.reasonForRejectIRO && (
                  <Box
                    sx={{
                      backgroundColor: '#FFF5F5',
                      borderLeft: '5px solid #D32F2F',
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Reason Row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          minWidth: 140,
                          color: '#333',
                        }}
                      >
        Reason for Disapprove:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#D32F2F',
                        }}
                      >
                        {(selectedIROData as any)?.reasonForRejectIRO}
                      </Typography>
                    </Box>

                    {/* Disapproved By Row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          minWidth: 140,
                          color: '#333',
                        }}
                      >
        Disapproved By:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1976D2',
                        }}
                      >
                        {(selectedIROData as any)?.disapprovedBy || 'ASL'}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* FOOTER */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#5B4BEB',
                    borderRadius: 2,
                    px: 3,
                  }}
                  onClick={() => setOpenReason(false)}
                >
      Close
                </Button>
              </Box>
            </Dialog>
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
                    toggleSendNotification(true);
                  }}
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
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              open={showHRFileUploader}
              onClose={() => setShowHRFileUploader(false)}
              getFiles={selectedIRO?.signature?.hrSignature ? [selectedIRO.signature.hrSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
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
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
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
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
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

            <Dialog open={Boolean(openReleaseConform)} onClose={() => setOpenReleaseConform(false)}>
              <DialogTitle>Reminder</DialogTitle>
              <DialogContent>
                <Typography sx={{ color: 'red' }}>
                  This {IROrder?.[0]?.IROno} is part of a bulk release, the following IROs will also be released along with it:<li></li>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOpenReleaseConform(false)}>Close</Button>
                <Button
                  endIcon={<DeleteIcon />}
                  variant="contained"
                  color="info"
                  onClick={async () => {
                    setOpenRelease(true);
                  } }
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <FileUploader
              title=" Bill Upload"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                maxItemSize: 6 * MB,
                maxItemCount: 10,
                maxTotalSize: 30 * MB,
              }}
              open={attachment}
              action={fileUploaderAction}
              postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
              onClose={() => {
                setAttachment(false), setFile(false);
              }}
              getFiles={selectedIRO?.billAttachment ?? []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name, selectedIRO._id).then((res) => {
                  setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.length > 0 ? [...selectedIRO.billAttachment, res.data] : [res.data]}));
                  setFile(true);
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

            <ReleaseAmount action={props.action == 'release' ? 'add' : 'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
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
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        open={viewFileUploader}
        action="view"
        onClose={() => setViewFileUploader(false)}
        getFiles={selectedIRO?.billAttachment ?? []}
      />

      <Dialog open={supportAttachment} onClose={() => setSupportAttachment(false)} maxWidth="xs" fullWidth>
        <DialogTitle> Signature Attachment </DialogTitle>
        <DialogContent>
          <Container>
            Please download and attach the signature sheet:&nbsp;
            {selectedIRO.signatureSheet ? (
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  const file = (
                    await FileUploaderServices.getFile(
                      selectedIRO?.signatureSheet ?? '',
                    )
                  ).data;

                  if (file.downloadURL) {
                    const link = document.createElement('a');
                    link.href = file.downloadURL;
                    link.download = 'WorkersSignatureSheet.pdf';
                    link.click();
                  }
                }}
              >
                WorkersSignatureSheet.pdf
              </a>
            ) : (
              pdfProps && (
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
                </>
              )
            )}
            NB: Ignore if already attached
          </Container>
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
          <Container>
            Download the IRO for {selectedIRO?.IROno} &nbsp;
            {selectedIRO.closedIroPdf && <a href="#" onClick={async () => {
              const file = (await FileUploaderServices.getFile(selectedIRO?.closedIroPdf ?? '')).data;
              if (file.downloadURL) {
                const link = document.createElement('a');
                link.href = file.downloadURL;
                link.download = file.filename;
                link.click();
              }
            }}>{`${selectedIRO.IROno}_Receipt.pdf`}</a>}
          </Container>
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

      <Dialog open={Boolean(iroData)} onClose={() => setIroData(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Container>
            {`Are you sure you want to close this IRO No ${iroData?.IROno} from ${iroData?.division?.details.name} related to FR No ${FrData?.FRno ?? ''} ?`}
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
            {iroData && mngrName && selectedSignature && FrData && (
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
          <Typography sx={{ color: 'red' }}>{`Are you sure you want to delete this IRO No ${IRO?.IROno?? '...'} from ${IRO?.division?.details?.name?? '...'} related to FR No ${FR?.FRno?? ''} ?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModel(false)}>Close</Button>
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              deleteIRO(selectedIROId?.toString() ?? '');
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading &&
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
        />
      }
      {selectedIROId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIROId}/>}
    </CommonPageLayout>
  );
};

export default ManageIRO;
