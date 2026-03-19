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
import { Link, useLocation } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, ListItemText, ListSubheader, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
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
import FRReceiptTemplatePrev from './components/FRReceiptTemplatePrev';
import FRReceiptTempForHelhiDevisionPrev from './components/FRReceiptTempForHelhiDevisionPrev';
import TransactionLogDialog from './components/TransactionLogDialog';
import SanctionLetter from './components/authLatter';
import formatAmount from '../Common/formatcode';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';

const ManageFrPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const finder =Number(params.get('id'));
  console.log(finder, 'oo5');
  const [FRRequests, setFRRequests] = useState<FR[] | null>(null);
  const [FR, setFR] = useState<FR | null>(null);
  const [searchText, setSearchText] = useState('');
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [sendNotification, toggleSendNotification] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string | null>(null);
  const [selectedFRData, setSelectedFRData] = useState<FR | null>(null);
  const [data, setData] = useState<FR | null>(null);
  const [data2, setData2] = useState<FR | null>(null);
  const [data4, setData4] = useState<FR | null>(null);
  const [data5, setData5] = useState<FR | null>(null);
  const [data6, setData6] = useState<FR | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [viewFileUploader, setViewFileUploader] = useState(false);

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
  const [supportAttachmentChild, setSupportAttachmentChild] = useState<boolean>(false);
  const [openReason, setOpenReason] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [open, setOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [openPrintFr, setOpenPrintFr] = useState(false);
  const [openPrintFrPrev, setOpenPrintFrPrev] = useState(false);
  const [openPrintFrPrevDelhi, setOpenPrintFrPrevDelhi] = useState(false);
  const [openLog, setOpenLog] = useState(false);
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
  const [statusFilter1, setStatusFilter1] = useState<'Support' | 'Expanse'| 'Resubmitted'| 'Custom'|null| 'All'>(null); // default WFA: Waiting for access or Reverted
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
  useEffect(() => {
    if (finder === 1) {
      setStatusFilter([FRLifeCycleStates.FR_APPROVED]);
    } else if (finder === 2) {
      setStatusFilter([FRLifeCycleStates.WAITING_FOR_PRESIDENT]);
    } else if (finder === 3) {
      setStatusFilter([FRLifeCycleStates.WAITING_FOR_ACCOUNTS]);
    }
  }, [finder]); // Runs only when finder changes

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
    FRServices.getAllOptimized({ dateRange: dateRange, status: statusFilter })
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
    Promise.all([
      FRServices.getAllOptimized({ dateRange, status: statusFilter }),
      FRServices.getAllCustom({ dateRange, status: statusFilter }),
    ])
    .then(([optimizedRes, customRes]) => {
      const optimizedData = optimizedRes.data ?? [];
      const customData = customRes.data ?? [];

      const combinedData = [...optimizedData, ...customData].map(
        (fr, index) => ({
          ...fr,
          serialNumber: index + 1,
        }),
      );

      setFRRequests(combinedData);
    })
    .catch((err) => console.log(err));
  }, [dateRange, statusFilter]);
  useEffect(() => {
    FRServices.getAllOptimizedExSupprt({ dateRange: dateRange, support: statusFilter1, status: statusFilter })
      .then((res) => {
        if (res.data) {
          setFRRequests(res.data?.map((fr, index) => ({ ...fr, serialNumber: index + 1 })));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [statusFilter1, finder]);

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
              // to: `/fr/${props.row._id}/view`,
              onClick: () => {
                if ((props.row as any).isCustom) {
                  window.open(`/fr/${props.row._id}/viewCustom`, '_blank');
                } else {
                  window.open(`/fr/${props.row._id}/view`, '_blank');
                }
              },
              icon: PreviewIcon,

            },
            // {
            //   id: 'View Attachment',
            //   // component: Link,
            //   // to: `/fr/${props.row._id}/edit`,
            //   icon: EditIcon,
            //   onClick: () => {
            //     setViewFileUploader(true);
            //     setAttachments(props.row.particulars[0]);
            //   },
            //   text: '',
            // },
            ...(hasPermissions(['WRITE_FR']) && !hasPermissions(['PRESIDENT_ACCESS'])&& props.row.status == FRLifeCycleStates.FR_SEND_BACK|| hasPermissions(['ADMIN_ACCESS'])?
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
            ...(hasPermissions(['ADMIN_ACCESS']) && props.row.status == FRLifeCycleStates.FR_APPROVED?
              [
                {
                  id: 'edit',
                  text: 'Edit for admin',
                  // component: Link,
                  // to: `/fr/${props.row._id}/edit`,
                  icon: EditIcon,
                  onClick: () => {
                    window.open(`/fr/${props.row._id}/editAdmin`, '_blank');
                  },
                },
              ] :
              []),
            {
              id: 'print',
              text: 'Print FR',
              icon: PrintIcon,
              onClick: () => {
                FRServices.getAllOptimizedById(props.row?._id).then((res)=>{
                  console.log(props.row?._id, 'propsid1');
                  console.log(res.data, 'daa988');
                  setData2(res.data);
                });
                setOpenPrintFr(true);
                setTimeout(() => {
                  setOpenPrintFr(false);
                }, 2000);
              },
            },
            ...(props.row.specialsanction =='Yes' ?
              [

                {
                  id: 'print',
                  text: 'Print FR Auth letter',
                  icon: PrintIcon,
                  onClick: () => {
                    FRServices.getAllOptimizedById(props.row?._id).then((res)=>{
                      console.log(res.data, 'daa98');
                      setData6(res.data);
                    });
                    setOpenPrintFr(true);
                    setTimeout(() => {
                      setOpenPrintFr(false);
                    }, 2000);
                  },
                },
              ]:[]),
            ...(hasPermissions(['DELHI_DIVISION_ACCESS']) ?
              [
                {
                  id: 'print',
                  text: 'Print FR HQ DELHI',
                  icon: PrintIcon,
                  onClick: async () => {
                    const delhiHQ = (await DivisionsServices.getDivisionById(
                      '658270549efadc163550a28c',
                    )).data;

                    const rowData = (await FRServices.getAllOptimizedById(props.row?._id)).data;
                    console.log(rowData, 'rowData');
                    console.log(delhiHQ, 'delhiHQ');

                    rowData.division?.details &&
  setData4({
    ...props.row,
    division: {
      ...rowData.division,
      details: {
        ...rowData.division.details,
        seniorLeader: delhiHQ.details.seniorLeader,
        juniorLeader: delhiHQ.details.juniorLeader,
        president: delhiHQ.details.president,
      },
    },
  });
                  },
                },
              ] :
              []),
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
            ...(props.row.reasonForReject || props.row.reasonForSentBack ?
              [
                {
                  id: 'resaons',
                  text: 'View Reasons',
                  component: Link,
                  // to: '/fr/view_FR/' + props.row._id,
                  onClick: () => {
                    setOpenReason(true);
                    setSelectedFRData(props.row);
                  },
                  icon: EditNoteIcon,
                },
              ]:[]),
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
              id: 'print',
              text: 'Prev Cord Print FR',
              icon: PrintIcon,
              onClick: () => {
                FRServices.getAllOptimizedById(props.row?._id).then((res)=>{
                  console.log(res.data, 'data came her');
                  setData5(res.data);
                });
                setOpenPrintFrPrev(true);
                setTimeout(() => {
                  setOpenPrintFrPrev(false);
                }, 2000);
              },
            },
            ...(hasPermissions(['DELHI_DIVISION_ACCESS']) ?
              [
                {
                  id: 'print',
                  text: 'Prev Cord Print FR HQ DELHI',
                  icon: PrintIcon,
                  onClick: async () => {
                    const delhiHQ=(await DivisionsServices.getDivisionById('658270549efadc163550a28c')).data;
                    const rowData= (await FRServices.getAllOptimizedById(props.row?._id)).data;

                    rowData.division?.details&& setData4({
                      ...props.row,
                      status: 'Prev Cord' as any,
                      division: {
                        ...rowData.division,
                        details: {
                          ...rowData.division?.details,
                          // seniorLeader: delhiHQ.details.seniorLeader,
                          seniorLeader: delhiHQ.details.seniorLeader,
                          juniorLeader: delhiHQ.details.juniorLeader,
                        },
                      },
                    });
                    setOpenPrintFrPrevDelhi(true);
                    setTimeout(() => {
                      setOpenPrintFrPrevDelhi(false);
                    }, 2000);
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


            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   document: <FRReceiptTemplate rowData={props.row as FR} />,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },


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
              id: 'log',
              text: 'FR Log',
              icon: PreviewIcon,
              onClick: () => {
                setSelectedFR(props.row._id);
                setOpenLog(true);
              },
            },
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
      field: 'status',
      headerClassName: 'status-header',
      renderHeader: () => <b>Status</b>,
      cellClassName: (params) => {
        const statusName = params.formattedValue;
        if (params.value == null) return '';

        switch (statusName) {
        case 'REVERTED':
          return clsx('status-cell2');
        case 'PENDING VERIF.':
          return clsx('status-cell', 'VERIF');
        case 'IRO CLOSED':
        case 'FR VERIFIED':
        case 'FR CLOSED':
          return clsx('status-cell1');
        case ' FR_REJECTED':
          return clsx('status-cell', 'red');
        case 'AWAITING APPROV.':
          return clsx('status-cell', 'Appr');
        case 'RE-SUBMITTED':
          return clsx('status-cell', 're-sum');
        case 'CUSTOM FR':
          return clsx('status-cell3');
        case 'IRO DISAPPROVED':
          return clsx('status-cell', 'red-dark');
        case 'FR DISAPPROVED':
          return clsx('status-cell', 'DIS');
        default:
          return 'status-cell';
        }
      },
      width: 205,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        let statusName =
      IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
        const iscustom = (params.row as any)?.isCustom;
        switch (statusName) {
        case 'SEND_BACK':
          statusName = 'REVERTED';
          break;
        case 'FR_APPROVED':
          statusName = 'FR VERIFIED';
          break;
        case 'WAITING_FOR_ACCOUNTS':
          if ((params.row as any)?.isReverted === true) {
            statusName = 'RE-SUBMITTED';
          } else if (iscustom === true) {
            statusName = 'CUSTOM FR';
          } else {
            statusName = 'PENDING VERIF.';
          }
          break;
        case 'WAITING_FOR_PRESIDENT':
          statusName = 'AWAITING APPROV.';
          break;
        case 'FR_REJECTED':
          statusName = 'FR DISAPPROVED';
          break;
        case 'IRO_REJECTED':
        case 'REOPEND':
          statusName = 'IRO DISAPPROVED';
          break;
        default:
          statusName = statusName.replaceAll('_', ' ');
          break;
        }
        return statusName;
      },
    },

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

      renderCell: (params) => {
        const mainCategory =
      params.row?.particulars?.[0]?.mainCategory
        ?.split(' ')
        ?.at(0) ?? '';

        const { subCategory1, subCategory2, subCategory3 } =
      params.row?.particulars?.[0] || {};

        let subCategory = subCategory1;

        if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '.') {
          subCategory = subCategory3;
        } else if (subCategory2 && subCategory2 !== 'Select') {
          subCategory = subCategory2;
        }

        return (
          <p
            style={{
              maxWidth: 240,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {mainCategory} / {subCategory}
          </p>
        );
      },
    },
    // {
    //   field: 'subCategory',
    //   headerClassName: 'super-app-theme--cell',
    //   renderHeader: () => <b>Sub Category</b>,
    //   width: 240,
    //   align: 'center',
    //   headerAlign: 'center',
    //   valueGetter: (params) => {
    //     const subCategory3 = params.row.particulars?.[0]?.subCategory3;
    //     const subCategory2 = params.row.particulars?.[0]?.subCategory2;
    //     const subCategory1 = params.row.particulars?.[0]?.subCategory1;
    //     if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '' && subCategory3 !== '.') {
    //       return subCategory3;
    //     } else if (subCategory2 && subCategory2 !== 'Select' && subCategory2 !== '') {
    //       return subCategory2;
    //     } else {
    //       return subCategory1;
    //     }
    //   },
    //   renderCell: (params) => {
    //     return (
    //       <p
    //         style={{
    //           maxWidth: 240,
    //           whiteSpace: 'normal',
    //           wordBreak: 'break-word',
    //           justifyContent: 'center',
    //           textAlign: 'center',
    //         }}
    //       >
    //         {params.value}
    //       </p>
    //     );
    //   },
    // },
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
        return formatAmount(particularAmount.toFixed(2));
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
    const divisionMatch = selectedDivisions.length === 0 ||
    selectedDivisions.includes(row?.division?.details.name?? '');

    if (!searchText) return divisionMatch;

    const searchLower = searchText.toLowerCase();


    const searchMatch =
    (row.FRno && row.FRno.toLowerCase().includes(searchLower)) ||
    (row.FRdate && row.FRdate.format('DD/MM/YYYY').toLowerCase().includes(searchLower)) ||
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
  // console.log(filteredRows, 'filteredRows');

  return (
    <CommonPageLayout
      title="Manage FR"
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
      <PermissionChecks
        permissions={['READ_FR']}
        granted={
          <>
            <Grid item xs={12} lg={6}>

              <Grid item xs={12} md={12}>
                <Card sx={{ maxWidth: '78vw', height: '100vh', alignItems: 'center' }}>
                  <Grid container spacing={2} padding={1}>
                    <Grid item xs={6}>
                      {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                      <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        placeholder='Enter FRno or FRDate or Division or SubCategory'
                        onChange={handleSearchChange}
                        fullWidth
                        // style={{ height: '10%' }}
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
                    <Grid item xs={3} sx={{ px: 2 }}>
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

                      <PermissionChecks
                        permissions={['WRITE_FR']}
                        granted={
                          <>
                            <Button
                              variant="contained"
                              sx={{ float: 'right', marginBottom: 1, mr: 2 }}
                              startIcon={<AddIcon />}
                              component={Link}
                              to="/fr/apply"
                              // onClick={() => {
                              // }}
                            >
                              Add new
                            </Button>
                          </>
                        }
                      />
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Card elevation={2}>
                          <CardContent>
                            <Grid
                              container
                              spacing={2}
                              alignItems="center"
                            >
                              {/* LEFT TOGGLE */}
                              <Grid item xs={12} md={6} minWidth={0}>
                                <ToggleButtonGroup
                                  fullWidth
                                  exclusive
                                  size="small"
                                  value={
                                    statusFilter.includes(FRLifeCycleStates.WAITING_FOR_ACCOUNTS) ?
                                      'WFA' :
                                      statusFilter.includes(FRLifeCycleStates.FR_APPROVED) ?
                                        'VRY' :
                                        statusFilter.includes(FRLifeCycleStates.REJECTED) ?
                                          'DIS' :
                                          statusFilter.includes(FRLifeCycleStates.WAITING_FOR_PRESIDENT) ?
                                            'PRES' :
                                            statusFilter.includes(FRLifeCycleStates.FR_SEND_BACK) ?
                                              'RVT' :
                                              'ALL'
                                  }
                                  onChange={(_, val) => {
                                    if (!val) return;
                                    setStatusFilter(
                                      val === 'WFA' ?
                                        [FRLifeCycleStates.WAITING_FOR_ACCOUNTS] :
                                        val === 'VRY' ?
                                          [FRLifeCycleStates.FR_APPROVED] :
                                          val === 'RVT' ?
                                            [FRLifeCycleStates.FR_SEND_BACK] :
                                            val === 'PRES' ?
                                              [FRLifeCycleStates.WAITING_FOR_PRESIDENT] :
                                              val === 'DIS' ?
                                                [FRLifeCycleStates.REJECTED] :
                                                [],
                                    );
                                  }}
                                  sx={{ whiteSpace: 'nowrap' }}
                                >
                                  <ToggleButton value="ALL">All</ToggleButton>
                                  <ToggleButton value="WFA">Pending</ToggleButton>
                                  <ToggleButton value="RVT">Reverted</ToggleButton>
                                  <ToggleButton value="VRY">Verified</ToggleButton>
                                  <ToggleButton value="DIS">Disapprove</ToggleButton>
                                  <ToggleButton value="PRES">Awaiting Approv.</ToggleButton>
                                </ToggleButtonGroup>
                              </Grid>

                              {/* RIGHT TOGGLE */}
                              <Grid item xs={12} md={6} minWidth={0}>
                                <ToggleButtonGroup
                                  fullWidth
                                  exclusive
                                  size="small"
                                  value={statusFilter1}
                                  onChange={(_, val) => val && setStatusFilter1(val)}
                                  sx={{ whiteSpace: 'nowrap' }}
                                >
                                  <ToggleButton value="Resubmitted">Re-Submitted</ToggleButton>
                                  <ToggleButton value="Support">Support</ToggleButton>
                                  <ToggleButton value="Expanse">Expense</ToggleButton>
                                  <ToggleButton value="All">Both</ToggleButton>
                                  <ToggleButton value="Custom">Custom FR</ToggleButton>
                                </ToggleButtonGroup>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

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
                      <Button
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
                      </Button>
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
                          // setSelectedFR(null);
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
              {/* <Dialog
  open={openPrintFrDelhi}
  onClose={() => {
    setOpenPrintFrDelhi(false);
    setData4(null);
  }}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle>Print FR HQ DELHI</DialogTitle>
  <DialogContent>
    <Container>
      Download the FR Receipt HQ Delhi for {data4?.FRno}
      <br />

      {data4 && (
        <PDFDownloadLink
          document={
            <FRReceiptTempForHelhiDevisionPrev
              label={Label}
              president={selectedSignaturePresident}
              rowData={data4 as FR}
            />
          }
          fileName="FRReceiptDelhi.pdf"
          style={{ color: 'blue' }}
        >
          FRReceiptDelhi.pdf
        </PDFDownloadLink>
      )}
    </Container>
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => {
        setOpenPrintFrDelhi(false);
        setData4(null);
      }}
      variant="text"
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog> */}

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
                          console.log('🚀 ~ file: ManageFrPage.tsx:201 ~ .then ~ x:', x);

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
                        // setSelectedFR(null);
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
                </form>
                {/* <Button onClick={()=>{
                  // setSelectedFR(props.row._id);
                  toggleSendNotification(true);
                }}>
            Sent notufication
                </Button> */}
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
                <BlobProvider document={<IROReconciliationPdf data={pdfProps} />}>
                  {({ loading, url }) => (
                    loading ? (
                      <span>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="WorkersSignatureSheet.pdf"
                        style={{ color: 'blue' }}
                      >
        WorkersSignatureSheet.pdf
                      </a>
                    )
                  )}
                </BlobProvider>
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
                  {selectedFRData?.reasonForSentBack? 'FR REASON FOR REVERT': 'FR REASON FOR DISAPPROVE'}
                </Typography>

                <IconButton onClick={() => setOpenReason(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider />

              {/* CONTENT */}
              <Box sx={{ mt: 2 }}>
                <Typography fontSize={14} mb={1}>
                  <b>FR No:</b> {selectedFRData?.FRno}
                </Typography>

                {/* REVERT REASON */}
                {selectedFRData?.reasonForSentBack && (
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
                        {selectedFRData?.reasonForSentBack}
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
                        {(selectedFRData as any)?.revertedBy || 'Admin'}
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
                {selectedFRData?.reasonForReject && (
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
                        {selectedFRData?.reasonForReject}
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
                        {(selectedFRData as any)?.disapprovedBy || 'ASL'}
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
                  {({ loading, url }) => (
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
                  )}
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
                  Download the FR Receipt, Delhi for {data?.FRno} <br />
                  {data && (
                    <PDFDownloadLink
                      document={<FRReceiptTempForDelhiDivision label={Label} president={selectedSignaturePresident} rowData={data as unknown as FR} />}
                      fileName="FRReceiptDelhi.pdf"
                      style={{ color: 'blue' }}
                    >
                      {openPrintFr ? '....' : 'FRReceiptDelhi.pdf'}
                    </PDFDownloadLink>
                  )}{' '}
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
            <Dialog open={Boolean(data4)} onClose={() => setData4(null)} maxWidth="xs" fullWidth>
              <DialogTitle> Print Prev Fr</DialogTitle>
              <DialogContent>
                <Container>
                  Download the FR Receipt, Delhi for {data4?.FRno} <br />
                  {data4 && (
                    <PDFDownloadLink
                      document={<FRReceiptTempForHelhiDevisionPrev label={Label} president={selectedSignaturePresident} rowData={data4 as unknown as FR} />}
                      fileName="FRReceiptDelhi.pdf"
                      style={{ color: 'blue' }}
                    >
                      {openPrintFrPrevDelhi ? '....' : 'FRReceiptDelhi.pdf'}
                    </PDFDownloadLink>
                  )}{' '}
                </Container>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setData4(null);
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
                        <FRReceiptTemplate
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
            <Dialog open={Boolean(data6)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
              <DialogTitle> Print Fr</DialogTitle>
              <DialogContent>
                <Container>
    Download the FR Auth Letter for {data6?.FRno}
                  <br />

                  {data6 && (
                    <BlobProvider
                      document={<SanctionLetter data={data6 as any} />}
                    >
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
            <FileUploader
              title="Attachments"
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
              open={viewFileUploader}
              action='view'
              onClose={() => setViewFileUploader(false)}
              // getFiles={TestServices.getBills}
              getFiles={attachments}
              // deleteFile={(fileId: string) => {
              //   setNewParticular((particularDetails) => ({
              //     ...particularDetails,
              //     attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
              //   }));
              //   return FileUploaderServices.deleteFile(fileId);
              // }}
            />
            <Dialog open={Boolean(data5)} onClose={() => setData5(null)} maxWidth="xs" fullWidth>
              <DialogTitle> Print Prev Fr</DialogTitle>
              <DialogContent>
                <Container>
    Downloading the FRReceipt for {data5?.FRno}
                  <br />

                  {data5 && (
                    <BlobProvider
                      document={
                        <FRReceiptTemplatePrev
                          rowData={data5 as any}
                          president={selectedSignaturePresident}
                        />
                      }
                    >
                      {({ loading, url }) =>
                        loading || openPrintFrPrev ? (
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
                    setData5(null);
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
      {selectedFR&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedFR}/>}

    </CommonPageLayout>
  );
};

export default ManageFrPage;
