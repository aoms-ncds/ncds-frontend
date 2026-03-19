/* eslint-disable max-len */

import { Grid, TextField, Button, Box, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, FormControlLabel, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Checkbox, InputLabel, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { GridColDef, GridCellParams, DataGrid } from '@mui/x-data-grid';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import { useState, SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import ESignatureService from '../Settings/extras/ESignatureService';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { Preview as PreviewIcon, Print as PrintIcon, AttachFile as AttachmentIcon, Download as DownloadIcon, Edit as EditIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import CommonPageLayout from '../../components/CommonPageLayout';
import FRReceiptTemplate from '../FR/components/FRReceiptTemplate';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import IROServices from './extras/IROServices';
import FRServices from '../FR/extras/FRServices';
import IROTemplate from './components/IROTemplate';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { useAuth } from '../../hooks/Authentication';
import { set } from 'mongoose';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import ReleaseAmountDialogEdit from './components/ReleaseAmountDialogEdit';
import ReleaseAmountDialog from './components/ReleaseAmountDialog';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import formatAmount from '../Common/formatcode';

const ReopenedIRO = () => {
  const [closedFRs, setClosedFRs] = useState<IROrder[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCoordinator, setisCoordinator] = useState<any>(false);
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [dialogAction, setDialogAction] = useState<boolean>(false);
  const [frNo, setFrNo] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [openLog, setOpenLog] = useState(false);

  const [mngrName, setMngrName] = useState('');
  const [attachment, setAttachment] = useState<boolean>(false);
  const [fileUploaderAction, setFileUploaderAction] = useState<'add' | 'manage'>('add');
  const [file, setFile] = useState<boolean>(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [openReleaseEdit, setOpenReleaseEdit] = useState(false);
  const [openRelease, setOpenRelease] = useState(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| null>('All'); // default WFA: Waiting for access or Reverted
  const [statusFilter, setStatusFilter] = useState<any>(IROLifeCycleStates.REOPENED); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted

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
      '&:last-of-type': { borderRight: 'none' },
      '&.Mui-selected': {
        backgroundColor: '#eaeaea',
        color: '#000',
      },
    },
  };
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
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const user = useAuth();
  console.log(selectedIRO, 'selectedIRO');
  useEffect(() => {
    // Check if `selectedIRO` has a valid ID and `billAttachment` is not empty
    if (selectedIRO._id !== '' && selectedIRO.billAttachment.length > 0) {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [file]);
  const [printIroLoading, setPrintIroLoading] = useState(false);
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
  const [FrData, setFrData] = useState<FR | null>(null);
  const [conform, setConform] = useState<boolean>(false);
  const [conform1, setConform1] = useState<boolean>(false);
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
    setFrNo(FrData?.FRno ?? '');
  }, []);
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
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
  const filteredRows = (closedFRs ?? []).filter((row) => {
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
            // const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
            //   return reconciliationIROs._id !== res.data.iro._id;
            // });
            // setReconcilationIRO(filterIRO);
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
            window.location.reload();
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

  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const columns:GridColDef<IROrder>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[

            ...(hasPermissions(['ADMIN_ACCESS']) || isCoordinator ?
              [
                {
                  id: 'Attachments',
                  text: 'IRO Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setAttachment(true);
                    setFileUploaderAction('add');
                    setSelectedIRO(props.row);
                    if (props.row.workerSupport) {
                      setPdfProps({
                        purpose: props.row.purpose ?? 'Division',
                        divisionId: props.row.division?._id ?? null,
                        workerId:
                                      props.row.purpose == 'Coordinator' && props.row.purposeCoordinator ?
                                        props.row.purposeCoordinator?._id :
                                        props.row.purpose == 'Worker' && props.row.purposeWorker?._id ?
                                          props.row.purposeWorker?._id :
                                          null,
                        subDivisionId: props.row.purposeSubdivision?._id ?? null,
                        designationParticularID: props.row.designationParticular ?? null,
                        IRONo: props.row.IROno,
                        month: props.row.particulars[0].month,
                        date: moment(props.row.releaseAmount?.transferredDate).format('DD/MM/YYYY'),
                      });
                      // setSupportAttachment(true);
                    }
                  },
                },
              ] :
              [
                {
                  id: 'Attachments',
                  text: 'IRO Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setViewFileUploader(true);
                    setSelectedIRO(props.row);
                  },
                },
              ]),
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: Link,
            //   to: '/view' + props.row._id,
            //   icon: PrintIcon,
            // },
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   document: <FRReceiptTemplate president={selectedSignaturePresident} rowData={props.row as FR }/>,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },
            {
              id: 'View',
              text: 'View IRO',
              // component: Link,
              // to: `/iro/${params.row._id}`,
              icon: PreviewIcon,
              onClick: () => {
                window.open( `/iro/${props.row._id}`, '_blank');
              },
            },
            ...(!hasPermissions(['ADMIN_ACCESS']) || !hasPermissions(['OFFICE_MNGR_ACCESS']) || !hasPermissions(['ACCOUNTS_MNGR_ACCESS'])||!hasPermissions(['LOCAL_ACCOUNT_ACCESS'])||!hasPermissions(['FCRA_ACCOUNTS_ACCESS'])?
              [
                ...(isCoordinator ?[

                  {
                    id: 'edit',
                    text: 'Edit IRO - Coordinator',
                    component: Link,
                    // to: `/iro/${params.row._id}/edit`,
                    onClick: () => {
                      window.open(`/iro/${props.row._id}/EditIROForRevert`, '_blank');
                    },
                    icon: EditIcon,
                  },
                ]:[]),

              ]:[]),
            ...(!isCoordinator|| hasPermissions(['ADMIN_ACCESS']) ?[

              ...(hasPermissions(['ADMIN_ACCESS']) || hasPermissions(['OFFICE_MNGR_ACCESS']) || hasPermissions(['ACCOUNTS_MNGR_ACCESS'])||hasPermissions(['LOCAL_ACCOUNT_ACCESS'])||hasPermissions(['FCRA_ACCOUNTS_ACCESS'])?
                [

                  {
                    id: 'edit',
                    text: 'Edit IRO ',
                    component: Link,
                    // to: `/iro/${params.row._id}/edit`,
                    onClick: () => {
                      window.open(`/iro/${props.row._id}/edit`, '_blank');
                    },
                    icon: EditIcon,
                  },
                ]:[]),
            ]:[]),
            ...(!isCoordinator || hasPermissions(['ADMIN_ACCESS']) ?[

              {
                id: 'Close IRO',
                text: 'Close IRO',
                icon: PreviewIcon,
                onClick: () => {
                  setIroData(props.row);
                  setConform1(true);
                  if (props?.row.FR) {
                    FRServices.getById((props.row.FR as any)._id).then((res) => {
                      setFrData(res.data);
                      console.log(res.data, 'fr');
                    });
                  }
                  setPrintIroLoading(true);
                  setTimeout(() => {
                    setPrintIroLoading(false);
                    // window.location.reload();
                  }, 2000);
                },
              },
            ]:[]),
            {
              id: 'View',
              text: 'View FR ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(props.row as any).FR?._id}/view`, '_blank');
              },

            },
            ...(hasPermissions(['ADMIN_ACCESS']) || hasPermissions(['FCRA_ACCOUNTS_ACCESS']) || hasPermissions(['LOCAL_ACCOUNT_ACCESS']) ?
              [
                {
                  id: 'Release',
                  text: 'Edit Release Amount',
                  onClick: () => [setOpenReleaseEdit(true), setReleaseAmountIROs([props.row])],
                  icon: PreviewIcon,
                },
              ] :
              []),
            ...(
              [
                {
                  id: 'Release',
                  text: 'View Release Amount',
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([props.row])],
                  icon: PreviewIcon,
                },
              ]
            ),
            ...(!isCoordinator || hasPermissions(['ADMIN_ACCESS']) ?[
              {
                id: 'edit',
                text: 'Change FR No',
                component: Link,
                // to: `/iro/${params.row._id}/edit`,
                onClick: () => {
                  if (props?.row.FR) {
                    FRServices.getById((props.row.FR as any)._id).then((res) => {
                      setFrData(res.data);
                      setFrNo(res.data.FRno);
                      console.log(res.data, 'fr');
                    });
                  }
                  setDialogAction(true);
                  // window.open(`/iro/${props.row._id}/EditIROForRevert`, '_blank');
                },
                icon: EditIcon,
              },
            ]:[]),
            {
              id: 'log',
              text: 'IRO Log',
              icon: PreviewIcon,
              onClick: () => {
                setSelectedIRO(props.row);
                setOpenLog(true);
              },
            },
            // {
            //   id: 'View',
            //   text: 'Close IRO ',
            //   component: Link,
            //   onClick: async () => {
            //     try {
            //       // Fetch the first API data

            //       // Update the state

            //       // Wait for the state update to complete
            //       await new Promise((resolve) => setTimeout(resolve, 0));

            //       // Perform the second API call using the updated requisition
            //       const res2 = await IROServices.close(props.row._id);
            //       console.log(res2);

            //       // Show success message
            //       // enqueueSnackbar({
            //       //   message: 'FR Reopened',
            //       //   variant: 'success',
            //       // });
            //       window.location.reload();
            //     } catch (error) {
            //       // Handle errors
            //       enqueueSnackbar({
            //         variant: 'error',
            //         // message: err.message,
            //       });
            //     }
            //   },
            //   icon: PreviewIcon,
            // },

          ]}

        />
      ),
    },
    { field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 130, align: 'center',
      headerAlign: 'center' },
    // { field: 'FRdate', align: 'center',
    //   headerAlign: 'center', renderHeader: () => (<b>FR Date</b>), width: 90, renderCell: (props) => (
    //     <p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    //   ) },
    {
      field: 'IRODate',
      headerName: 'IRODate',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 150,
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
      valueGetter: (params) => params.row.purposeSubdivision?.name,

      width: 170,
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
          {props.row.particulars[0]?.mainCategory}
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
      renderHeader: () => (<b>Requested Amount</b>),
      width: 140,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0), // Ensure we handle potential undefined values
          0,
        );
        return particularAmount.toFixed(2) || 0; // Return 0 if the total is undefined
      },
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0),
          0,
        );
        return <p>{particularAmount.toFixed(2)}</p>;
      },
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
    { field: 'updatedAt', align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Last Updated</b>),
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter })
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [dateRange, statusFilter, exstatusFilter]);
  useEffect(() => {
    IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1 })
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [dateRange, statusFilter1, exstatusFilter]);
  return (
    <CommonPageLayout status='REOPENED ' title="Reopened IRO" momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setClosedFRs((fr) => (fr ? fr.filter((fr) => fr?.iroClosedOn?.isSameOrAfter(newDateRange.startDate) && fr.iroClosedOn?.isSameOrBefore(newDateRange.endDate)) : []));
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>
      <Card sx={{ maxWidth: '78vw', height: '100vh', alignItems: 'center' }} >
        <Grid container spacing={2} padding={2} >
          <Grid item xs={6}>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              placeholder='Enter FRno or FRDate or Division or SubCategory'
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

          <>
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
            {/* ===== STATUS FILTER (ALL / NON BANK TRANSFERS) ===== */}
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
                    setStatusFilter([IROLifeCycleStates.REOPENED]);
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

            {/* ===== CATEGORY FILTER (SUPPORT / EXPENSE / BOTH) ===== */}

          </>

          {/* <Grid item>

          </Grid> */}
          {/* <Grid item xs={6} sx={{ px: 2 }}>
            <PermissionChecks
              permissions={['MANAGE_FR']}
              granted={(
                <Button
                  onClick={async () => {
                    const sheet =
                    closedFRs ?
                      closedFRs.map((fr:FR) => ([
                        fr.FRno,
                        fr.FRdate.format('DD/MM/YYYY'),
                        fr.division?.details.name,
                        fr.purposeSubdivision?.name,
                        fr.mainCategory,
                        fr.particulars?.reduce(
                          (total, particular) => total + Number(particular.requestedAmount),
                          0,
                        ),
                        fr.sanctionedAmount,
                        fr.sanctionedBank,
                        fr.sanctionedAsPer,
                        IROLifeCycleStates.getStatusNameByCodeTransaction(fr.status).replaceAll('_', ' '),
                      ])) :
                      [];
                    const headers=[
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
                    XLSX.writeFile(workbook, 'Closed_FR_Report.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadIcon />}
                  color="primary" sx={{ float: 'right', mt: 2, mr: 2 }}
                  variant="contained"
                >
                              Export
                </Button>
              )}/>
          </Grid> */}
          <Grid item xs={12} >
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

              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={closedFRs === null} style={{ height: '70vh', width: '100%' }}
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
      <Dialog open={Boolean(conform1)} onClose={() => setConform1(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Container>
            {`Are you sure you want to close this IRO No ${iroData?.IROno}
    from ${iroData?.division?.details.name}
    related to FR No ${FrData?.FRno ?? ''} ?`}
            <br />

            {iroData && mngrName && selectedSignature && (
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
            {iroData && mngrName&&selectedSignature&& (

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
      <Dialog open={dialogAction} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            IROServices.editFrNo(FrData?.FRno?? '', frNo).then((res) => {
              enqueueSnackbar({
                message: 'FrNo updated',
                variant: 'success',
              });
            });
            // setDialogAction(false);
          }}
        >
          <DialogTitle>Change FRno</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="leaders"
              label="Enter New FrNo"
              type="text"
              fullWidth
              variant="outlined"
              value={frNo}
              onChange={(e) => setFrNo(e.target.value)}
              required
            />
            <br />
            <Typography sx={{ color: 'red' }}>
            This action will replace the current FR No and cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialogAction(false);
                setFrNo('');
              }}
              variant="contained"
              sx={{ right: 20, marginBottom: 2 }}
              color="error"
            >
                            Close
            </Button>
            <Button type="submit" variant="contained" sx={{ right: 20, marginBottom: 2 }} color="success">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <FileUploader
        title=" Bill Upload"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        // accept={['video/*']}
        open={attachment}
        action={fileUploaderAction}
        postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
        onClose={() => {
          setAttachment(false), setFile(false);
          // window.location.reload();
        }}
        // getFiles={TestServices.getBills}
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
          return FileUploaderServices.deleteFile(fileId).then((res) => {
            setSelectedIRO(() => ({ ...selectedIRO, billAttachment: []}));
            return res;
          });
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
        getFiles={selectedIRO?.billAttachment ?? []}
      />
      <ReleaseAmountDialogEdit action={'add'} onClose={() => setOpenReleaseEdit(false)} open={openReleaseEdit} data={ releaseAmountIROs?.length === 0 ? [] : releaseAmountIROs} />
      <ReleaseAmountDialog action={'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={ releaseAmountIROs?.length === 0 ? [] : releaseAmountIROs} />
      {selectedIRO._id&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIRO._id}/>}

    </CommonPageLayout>
  );
};

export default ReopenedIRO;
