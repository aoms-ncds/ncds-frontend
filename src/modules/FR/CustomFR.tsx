/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { Alert, Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../../components/MessageItem';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import * as XLSX from 'xlsx';
import moment from 'moment';
import FRReceiptTemplate from './components/FRReceiptTemplate';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import clsx from 'clsx';
import FRReceiptTempForDelhiDivision from './components/FRReceiptTempForHelhiDevision';
import LeaderDetailsService from '../Settings/extras/LeaderDetailsService';
import ESignatureService from '../Settings/extras/ESignatureService';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import IROReconciliationPdf from '../IRO/components/IROReconciliationPdf';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import FRReceiptTemplateCustom from './components/FRReceiptTemplateCustom';
import TransactionLogDialog from './components/TransactionLogDialog';
import CustomIRO from '../IRO/CustomIRO';
import CustomIROTab from '../IRO/CustomIROTab';

const CustomFR = () => {
  const [FRRequests, setFRRequests] = useState<FR[] | null>(null);
  const [FR, setFR] = useState<FR | null>(null);
  const [searchText, setSearchText] = useState('');
  const [frId, setFRId] = useState('');
  const [openLog, setOpenLog] = useState(false);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [sendNotification, toggleSendNotification] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string | null>(null);
  const [data, setData] = useState<FR | null>(null);
  const [data2, setData2] = useState<FR | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [data3, setData3] = useState<FR | null>(null);
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
  const [pdfPropsChild, setPdfPropsChild] = useState<{
    purpose: FRPurpose | null;
    divisionId: string | null;
    workerId: string | null;
    designationParticularID: string | null;
    subDivisionId: string | null;
    IRONo: string | null;
    month: string | null;
    date: string | null;
  } | null>(null);
  const [supportAttachment, setSupportAttachment] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [supportAttachmentChild, setSupportAttachmentChild] = useState<boolean>(false);

  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [open, setOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [openPrintFr, setOpenPrintFr] = useState(false);

  const [Label, setLeaderHeading] = useState<ILeaderDetails[] | null>(null);
  const [selectedSignaturePresident, setSignaturePresident] = useState<EsignaturePresident>({
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


  const [statusFilter, setStatusFilter] = useState([FRLifeCycleStates.WAITING_FOR_ACCOUNTS]); // default WFA: Waiting for access or Reverted
  const [tab, setTab] = useState(1);
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

  console.log(selectedFR, 'statusFilter');

  const deleteFR = (id: string) => {
    console.log(id, 'log');

    const snackbarId = enqueueSnackbar({
      message: 'Removing FR',
      variant: 'info',
    });
    FRServices.deleteFr(id)
      .then((res) => {
        if (FRRequests) {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const fr = FRRequests.filter((FRRequests) => {
            return FRRequests._id !== id;
          });
          setFRRequests(fr);
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

  useEffect(() => {
    FRServices.getAllCustom({ dateRange: dateRange, status: statusFilter })
      .then((res) => {
        console.log(res, 'rr');
        setFRRequests(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    LeaderDetailsService.getAll()
      .then((res) => {
        setLeaderHeading(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    FRServices.getAllCustom({ dateRange: dateRange, status: statusFilter })
      .then((res) => {
        if (res.data) {
          setFRRequests(res.data?.map((fr, index) => ({ ...fr, serialNumber: index + 1 })));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [dateRange, statusFilter]);

  const columns: GridColDef<FR>[] = [
    {
      field: '_manage',
      headerClassName: 'super-app-theme--cell',
      headerName: '',
      renderHeader: () => <b>Action</b>,
      width: 80,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      // getActions: (props: GridRowParams) => (
      //       [

      // <GridLinkAction
      //   key={1}
      //   label="View And Manage"
      //   icon={<PreviewIcon />}
      //   showInMenu
      //   to={`/fr/${props.row._id}/view`}/>,
      // hasPermissions(['WRITE_FR']) &&
      // <GridLinkAction
      //   key={2}
      //   label="Edit"
      //   icon={<EditIcon />}
      //   showInMenu
      //   to={ `/fr/${props.row._id}/edit`}
      // />,
      // <GridLinkAction
      //   key={3}
      //   label="Send Back to Division"
      //   icon={<PreviewIcon />}
      //   showInMenu
      //   onClick={() => {
      //     enqueueSnackbar({
      //       message: 'Sent back to division',
      //       variant: 'success',
      //     });
      //   } } />,
      // <GridLinkAction
      //   key={4}
      //   label="Remarks"
      //   icon={<EditIcon />}
      //   showInMenu
      //   onClick={() => {
      //     toggleOpenRemarks(true);
      //     setSelectedFR(props.row._id);
      //     FRServices.getAllRemarksById(props.row._id)
      //         .then((res) => setRemarks(res.data ?? []))
      //         .catch((error) => {
      //           enqueueSnackbar({
      //             variant: 'error',
      //             message: error.message,
      //           });
      //         });
      //   } } />,
      //         <GridLinkAction
      //           key={5}
      //           label="Print FR"
      //           icon={<PrintIcon />}
      //           component={ PDFDownloadLink,}
      //           document={ <FRReceiptTemplate rowData={props.row}/>},
      //           showInMenu />,
      //         false,
      //       ].filter((action) => action !== false) as JSX.Element[]
      // ),

      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="FR action"
          primaryText="Actions"
          key={'FR action'}
          items={[
            {
              id: 'View',
              text: 'View And Manage',
              component: Link,
              // to: `/fr/${props.row._id}/viewCustom`,
              onClick: () => {
                window.open(`/fr/${props.row._id}/viewCustom`, '_blank');
              },
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              // component: Link,
              // to: `/fr/${props.row._id}/edit`,
              icon: EditIcon,
              onClick: () => {
                window.open(`/fr/${props.row._id}/editCustom`, '_blank');
              },
            },
            ...(hasPermissions(['WRITE_FR']) && props.row.status == FRLifeCycleStates.FR_SEND_BACK ?
              [
                {
                  id: 'edit',
                  text: 'Edit',
                  // component: Link,
                  // to: `/fr/${props.row._id}/edit`,
                  icon: EditIcon,
                  onClick: () => {
                    window.open(`/fr/${props.row._id}/edit`, '_blank');
                  },
                },
              ] :
              []),
            ...(hasPermissions(['ADMIN_ACCESS']) ?
              [
                {
                  id: 'delete',
                  text: 'Delete',
                  component: Link,
                  icon: DeleteIcon,
                  onClick: () => {
                    FRServices.getById(props.row._id?? '').then((res) => {
                      setFR(res.data);
                    });
                    // deleteFR(props.row._id);
                    setSelectedFR(props.row._id);
                    setDeleteModel(true);
                  },
                },
              ] :
              []),
            // {
            //   id: 'sendBackDivision1',
            //   text: 'Send Back to Division',
            //   onClick: () => {
            //     enqueueSnackbar({
            //       message: 'Sent back to division',
            //       variant: 'success',
            //     });
            //   },
            //   icon: PreviewIcon,
            // },
            {
              id: 'remarks',
              text: 'Remarks',
              component: Link,
              // to: '/fr/view_FR/' + props.row._id,
              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedFR(props.row._id);
                FRServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              icon: EditNoteIcon,
            },

            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   document: <FRReceiptTemplate rowData={props.row as FR} />,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },
            ...(hasPermissions(['DELHI_DIVISION_ACCESS']) ?
              [
                {
                  id: 'print',
                  text: 'Print FR HQ DELHI',
                  icon: PrintIcon,
                  onClick: async () => {
                    const delhiHQ=(await DivisionsServices.getDivisionById('658270549efadc163550a28c')).data;
                    props.row.division?.details&& setData({ ...props.row,
                      division: {
                        ...props.row.division,
                        details: {
                          ...delhiHQ.details, // ✅ USE DELHI HQ
                          coordinator: props.row as any,
                          seniorLeader: delhiHQ.details.seniorLeader,
                          juniorLeader: delhiHQ.details.juniorLeader,
                        },
                      },
                    });
                    setOpenPrintFr(true);
                    setTimeout(() => {
                      setOpenPrintFr(false);
                    }, 2000);
                  },
                },
              ] :
              []),

            {
              id: 'print',
              text: 'Print FR',
              icon: PrintIcon,
              onClick: () => {
                setData2(props.row);
                setOpenPrintFr(true);
                setTimeout(() => {
                  setOpenPrintFr(false);
                }, 2000);
              },
            },
            ...(hasPermissions(['HR_DPARTMENT_ACCESS'])&&props.row.workerSupport ?
              [
                {
                  id: 'print_Sign',
                  text: 'Signature Sheet',
                  icon: PrintIcon,
                  onClick: async () => {
                    setData3(props.row);
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
                        IRONo: null,
                        month: props.row.particulars[0].month,
                        date: null,
                      });
                      setSupportAttachment(true);
                    }
                    setOpenPrintFr(true);
                    setTimeout(() => {
                      setOpenPrintFr(false);
                    }, 2000);
                  },
                },
              ] :
              []),
            ...(hasPermissions(['HR_DPARTMENT_ACCESS'])&&props.row.childSupport ?
              [
                {
                  id: 'print_Sign',
                  text: 'Signature Sheet Child',
                  icon: PrintIcon,
                  onClick: async () => {
                    setData3(props.row);

                    if (props.row.childSupport) {
                      setPdfPropsChild({
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
                        IRONo: null,
                        month: props.row.particulars[0].month,
                        date: null,
                      });
                      setSupportAttachmentChild(true);
                    }
                    setOpenPrintFr(true);
                    setTimeout(() => {
                      setOpenPrintFr(false);
                    }, 2000);
                  },
                },
              ] :
              []),
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedFR(props.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
            },
            {
              id: 'log',
              text: 'FR Log',
              icon: PreviewIcon,
              onClick: () => {
                setFRId(props.row._id);
                setOpenLog(true);
              },
            },
          ]}
        />
      ),
    },

    // {
    //   field: 'serialNumber',
    //   renderHeader: () => (<b>SL No</b>),
    //   width: 100,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'FRno',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>FR No</b>,
      width: 150,
      align: 'center',

      headerAlign: 'center',
    },
    // {
    //   field: 'FRdate',
    //   renderHeader: () => (<b>FR Date</b>),
    //   renderCell: (props) => (<p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    //   ), width: 80, align: 'center', headerAlign: 'center',
    // },
    {
      field: 'FRdate',
      headerName: 'FR Date',
      headerClassName: 'super-app-theme--cell',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'divisionName',
    //   renderHeader: () => (<b>Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
    //   width: 130,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'status',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b>Status</b>,
    //   cellClassName: (params) => {
    //     console.log('CellClassName params:', params);
    //     const statusName = params.formattedValue;
    //     console.log('Status Name###:', statusName);
    //     if (params.value == null) {
    //       return '';
    //     }
    //     switch (statusName) {
    //     case 'REVERTED':
    //       return clsx('red-light');
    //     case 'WAITING FOR ACCOUNTS':
    //       return clsx('orange');
    //     case 'IRO CLOSED':
    //       return clsx('green');
    //     case 'FR VERIFIED':
    //       return clsx('green');
    //     case 'FR CLOSED':
    //       return clsx('green');
    //     case ' FR_REJECTED':
    //       return clsx('red');
    //     case 'WAITING FOR PRESIDENT':
    //       return clsx('orange');
    //     case 'IRO DISAPPROVED':
    //       return clsx('red-dark');
    //     default:
    //       console.log('No class applied');
    //       return '';
    //     }
    //   },
    //   width: 205,
    //   align: 'center',
    //   headerAlign: 'center',
    //   valueGetter: (params) => {
    //     let statusName = IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
    //     console.log(statusName, 'lolpß');
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
    //     case 'IRO_REJECTED':
    //       statusName = 'IRO DISAPPROVED'; // Change to whatever new name you want
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
      field: 'divisionName',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Division'}</b>,
      valueGetter: (params) => params.row.division?.details.name,
    },
    // {
    //   field: 'subDivisionName',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   valueGetter: (params) => (<p> {params.row.purposeSubdivision?.name}</p>
    //   ),
    //   width: 160,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'sub_division',
      headerClassName: 'super-app-theme--cell',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,
    },
    {
      field: 'mainCategory',
      headerClassName: 'super-app-theme--cell',
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
      headerClassName: 'super-app-theme--cell',
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
      field: 'requestedAmount',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Requested Amount</b>,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter(params) {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0);
        return particularAmount.toFixed(2);
      },
    },
    // {
    //   field: 'updatedAt',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b>Last Updated</b>,
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   width: 130,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'sanctionedAsPer',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b> Sanction as per</b>,
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
    //       {props.row?.sanctionedAsPer?.toString()}
    //     </p>
    //   ),
    //   width: 200,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
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
          {props.row.specialsanction=='Yes' ? 'President': 'No'}
        </p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'reasonForSentBack',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b>Reason For Revert</b>,
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
    //       {props.row.reasonForSentBack}
    //     </p>
    //   ),
    //   width: 200,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'reasonForReject',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b>Reason For Reject</b>,
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
    //       {props.row.reasonForReject}
    //     </p>
    //   ),
    //   width: 200,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'updatedAt',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Last Updated</b>,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
  ];
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const filteredRows = (FRRequests ?? []).filter((row) => {
    const searchTextLower = searchText.toLowerCase();

    if (
      (row.FRno && row.FRno.toLowerCase().includes(searchTextLower)) ||
      (row.FRdate && row.FRdate.format('DD/MM/YYYY').toLowerCase().includes(searchTextLower)) ||
      (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchTextLower))
    ) {
      return true;
    }
    // Check for subcategories within the particulars
    // const subCategoryMatch = row.particulars?.some((particular) =>
    //   (particular?.subCategory1?.toLowerCase().includes(searchTextLower) || '') ||
    //   (particular?.subCategory2?.toLowerCase().includes(searchTextLower) || '') ||
    //   (particular?.subCategory3?.toLowerCase().includes(searchTextLower) || ''),
    // );
    // if (subCategoryMatch) {
    //   return true;
    // }
    // Main filter logic

    // Fallback: Check if any other row value matches the search text
    return Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchTextLower));
  });

  if (searchText && filteredRows.length ===0) {
    enqueueSnackbar({
      message: ` ${searchText} not found`,
      variant: 'warning',
    });
  }
  // console.log(filteredRows, 'filteredRows');

  return (
    <CommonPageLayout
      title="Custom FR/IRO"
      momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setFRRequests((fr) => (fr ? fr.filter((fr) => fr.FRdate.isSameOrAfter(newDateRange.startDate) && fr.FRdate.isSameOrBefore(newDateRange.endDate)) : []));
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }}
    >
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile

      >
        <Tab label="Custom FR" value={1} />
        <Tab label="Custom IRO" value={2} />
      </Tabs>
      {tab === 1 ? (

        <PermissionChecks
          permissions={['READ_FR']}
          granted={
            <>
              <Grid item xs={12} lg={6}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }}>
                    <Grid container spacing={2} padding={2}>
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

                      <Grid item xs={6} sx={{ px: 2 }}>
                        {/* <br /> */}

                        <PermissionChecks
                          permissions={['MANAGE_FR']}
                          granted={
                            <Button
                              onClick={async () => {
                                const sheet = FRRequests ?
                                  FRRequests.map((fr: FR) => [
                                    fr.FRno,
                                    fr.FRdate.format('DD/MM/YYYY'),
                                    fr.division?.details.name,
                                    fr.purposeSubdivision?.name,
                                    fr?.mainCategory,
                                    fr.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0),
                                    fr.sanctionedAmount,
                                    fr.sanctionedBank,
                                    fr.sanctionedAsPer,
                                    IROLifeCycleStates.getStatusNameByCodeTransaction(fr.status).replaceAll('_', ' '),
                                  ]) :
                                  [];
                                const headers = ['FR No', 'Date', 'Division', 'Sub Division', 'Main Category', 'Requested Amt', 'Sanctioned Amt', 'Sanctioned Bank', 'Sanctioned As per', 'Status'];
                                const worksheet = XLSX.utils.json_to_sheet(sheet);
                                const workbook = XLSX.utils.book_new();
                                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                                XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                                XLSX.writeFile(workbook, 'FRReport.xlsx', { compression: true });
                              }}
                              startIcon={<DownloadIcon />}
                              color="primary"
                              sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                              variant="contained"
                            >
                            Export
                            </Button>
                          }
                        />

                        <Button
                          variant="contained"
                          sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                          startIcon={<AddIcon />}
                          component={Link}
                          to="/fr/applyCustom"
                        // onClick={() => {
                        // }}
                        >
                              Add new
                        </Button>
                      </Grid>
                      {/* <Grid item >
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="Filter"
                          value={statusFilter.includes(FRLifeCycleStates.WAITING_FOR_ACCOUNTS)?'WFA': statusFilter.includes(FRLifeCycleStates.FR_SEND_BACK)? 'RVT':'ALL'}
                          onChange={(e) =>setStatusFilter(e.target.value==='WFA'?[FRLifeCycleStates.WAITING_FOR_ACCOUNTS]: e.target.value==='RVT'? [FRLifeCycleStates.FR_SEND_BACK]:[])}
                          name="Filter"
                          row
                        >
                          <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
                          <FormControlLabel value="WFA" control={<Radio />} label="Waiting for Accounts" />
                          <FormControlLabel value="RVT" control={<Radio />} label="Reverted" />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}
                    </Grid>

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
                        '& .red-light': {
                          backgroundColor: '#ff7f7f',
                        },
                        '& .red-dark': {
                          backgroundColor: '#c90606',
                        },
                      }}
                    >
                      <DataGrid
                        rows={filteredRows ?? []}
                        columns={columns}
                        getRowId={(row) => row._id}
                        loading={FRRequests === null}
                        style={{ height: '66vh', width: '100%' }}
                        getRowClassName={(params) => {
                          if (params.row.specialsanction == 'Yes') {
                            return 'special-sanction'; // Class for rows with special sanction
                          }
                          return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
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
                        {/* <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 260 }}
                        onClick={() => {
                          FRServices.sendNotifications('president', selectedFR ?? '')
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((res) => {
                              console.log(res);
                            });
                        }}
                        endIcon={<SendIcon />}
                      >
                        {' '}
                        Send to President
                      </Button> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ width: 260 }}
                          onClick={() => {
                            FRServices.sendNotifications('accounts', selectedFR ?? '')
                            .then((res) => {
                              console.log(res);
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
                          color="inherit"
                          sx={{ width: 260 }}
                          onClick={() => {
                            FRServices.sendNotifications('division_head', selectedFR ?? '')
                            .then((res) => {
                              console.log(res);
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
                        <br />
                        <br />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            toggleSendNotification(false);
                            setSelectedFR(null);
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
                        FRServices.addRemarks(remark)
                        .then((res) => {
                          const x = [...remarks, res.data];
                          console.log('🚀 ~ file: CustomFR.tsx:201 ~ .then ~ x:', x);

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
                            FR: selectedFR ?? '',
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
                          setSelectedFR(null);
                        }}
                      // sx={{ ml: 'auto' }}
                      >
                      close
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </Grid>
              <Dialog open={supportAttachment} onClose={() => setSupportAttachment(false)} maxWidth="xs" fullWidth>
                <DialogTitle> Signature Attachment </DialogTitle>
                <DialogContent>
                  <Container>Please download the signature sheet: &nbsp;
                    {data3?.signatureSheet ?<> <a href="#" onClick={async () => {
                      const file = (await FileUploaderServices.getFile(data3?.signatureSheet ?? '')).data;
                      if (file.downloadURL) {
                        const link = document.createElement('a');
                        link.href = file.downloadURL;
                        link.download = 'WorkersSignatureSheet.pdf'; // You can specify a custom file name here
                        link.click();
                      }
                    }}>WorkersSignatureSheet.pdf</a> <br /></>: (pdfProps &&
              <>
                <PDFDownloadLink
                  document={<IROReconciliationPdf data={pdfProps} />}
                  fileName="WorkersSignatureSheet.pdf"
                  style={{ color: 'blue' }}
                >
                  {((params: any) => (
                    <span>
                      {params.loading ? '....' : 'WorkersSignatureSheet.pdf'}
                    </span>
                  )) as any}
                </PDFDownloadLink>
              </>)} NB: Ignore if already attached </Container>
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
              <Dialog open={supportAttachmentChild} onClose={() => setSupportAttachmentChild(false)} maxWidth="xs" fullWidth>
                <DialogTitle> Signature Attachment </DialogTitle>
                <DialogContent>
                  <Container>Please download the signature sheet: &nbsp;
                    {data3?.signatureSheet ?<> <a href="#" onClick={async () => {
                      const file = (await FileUploaderServices.getFile(data3?.signatureSheet ?? '')).data;
                      if (file.downloadURL) {
                        const link = document.createElement('a');
                        link.href = file.downloadURL;
                        link.download = 'ChildrenSignatureSheet.pdf'; // You can specify a custom file name here
                        link.click();
                      }
                    }}>ChildrenSignatureSheet.pdf</a> <br /></>: (pdfProps &&
              <>
                <BlobProvider document={<IROReconciliationPdf data={pdfProps} />}>
                  {({ loading, url }) =>
                    loading ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="ChildrenSignatureSheet.pdf"
                        style={{ color: 'blue' }}
                      >
        ChildrenSignatureSheet.pdf
                      </a>
                    )
                  }
                </BlobProvider>
                <br />
              </>)} NB: Ignore if already attached </Container>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setSupportAttachmentChild(false);
                      window.location.reload();
                    }}
                    variant="text"
                  >
            Ok
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{'Use Google\'s location service?'}</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText id="alert-dialog-slide-description"> */}
                Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                  {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button> */}
                </DialogActions>
              </Dialog>
              <Dialog open={Boolean(data)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
                <DialogTitle> Print Fr</DialogTitle>
                <DialogContent>
                  <Container>
  Download the FR Receipt, Delhi for {data?.FRno}
                    <br />

                    {data && (
                      <BlobProvider
                        document={
                          <FRReceiptTempForDelhiDivision
                            label={Label}
                            president={selectedSignaturePresident}
                            rowData={data as FR}
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
                      setData(null);
                    }}
                    variant="text"
                  >
                  Cancel
                  </Button>
                </DialogActions>
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
                          <FRReceiptTemplateCustom
                            rowData={data2 as FR}
                            president={selectedSignaturePresident}
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
              <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
                <DialogContent>
                  <Typography sx={{ color: 'red' }}>{`Are you sure you want to delete this FR No ${FR?.FRno} from  ${FR?.division?.details.name} ?`}</Typography>
                </DialogContent>

                <DialogActions>
                  <Button onClick={()=>setDeleteModel(false)}>Close</Button>
                  <Button
                    endIcon={<DeleteIcon />}
                    variant="contained"
                    color="info"
                    onClick={async () => {
                      deleteFR(selectedFR?.toString() ?? '');
                    } }
                  >
                 Delete
                  </Button>
                </DialogActions>

              </Dialog>
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

      ):(
        <CustomIROTab dateRange={dateRange} />
      )}
      {frId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={frId}/>}

    </CommonPageLayout>
  );
};

export default CustomFR;
