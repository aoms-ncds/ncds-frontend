import React, { SetStateAction, useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Grid,
  Checkbox, FormControlLabel,
  Typography, Container, Autocomplete,
  FormControl, InputLabel, Select, Box, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import { useAuth } from '../../hooks/Authentication';
import { enqueueSnackbar } from 'notistack';
import FRServices from '../FR/extras/FRServices';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CustomReportServices from './extras/CustomReportServices';
import SanctionedAsPerService from '../Settings/extras/SanctionedAsPerService';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import FileUploader from '../../components/FileUploader/FileUploader';
import MessageItem from '../../components/MessageItem';
import { MB } from '../../extras/CommonConfig';
import IROTemplate from '../IRO/components/IROTemplate';
import ReleaseAmount from '../IRO/components/ReleaseAmountDialog';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import IROServices from '../IRO/extras/IROServices';
import ESignatureService from '../Settings/extras/ESignatureService';
import { hasPermissions } from '../User/components/PermissionChecks';
import * as XLSX from 'xlsx';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Preview as PreviewIcon, Download as DownloadIcon, PictureAsPdf, Print, SaveAlt } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import PDFTemplateCustom from './components/PDFTemplateCustom';
import PDFTemplateCustomFR from './components/PDFTemplateCustomFR';
import PDFTemplateCustomFRAll from './components/PDFTemplateCustomFRAll';
import formatAmount from '../Common/formatcode';
import { ToWords } from 'to-words';

const CustomFooter = () => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f0f0', fontWeight: 'bold', borderTop: '1px solid black' }}>
    <span>Total:</span>
    <span>{'Net amt :0'}</span>
    <span>{'1000'}</span>
  </Box>
);

// eslint-disable-next-line react/no-multi-comp
const CustomReportFRFilterPage = () => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>();
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [data, setData] = useState<any[] | null>(null);
  const [print, setPrint] = useState<boolean>(false);
  const [page, setPage] = useState<boolean>(false);
  const [singleDivision, setSingleDivision] = useState<any | null>(null);

  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [FrData, setFrData] = useState<FR | null>(null);
  const [printIroLoading, setPrintIroLoading] = useState(false);
  const [mngrName, setMngrName] = useState('');
  const [openPrintIro, setOpenPrintIro] = useState(false);
  const [openAttachReceipt, setOpenAttachReceipt] = useState(false);
  const [openAttachReceipt1, setOpenAttachReceipt1] = useState(false);
  const [openRelease, setOpenRelease] = useState(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });

  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
    },
  });
  const totalRequested = data?.reduce(
    (total, e) =>
      total + (e.particularsData?.requestedAmount ?
        Number(e.particularsData.requestedAmount) :
        0),
    0,
  );

  const totalSanctioned = data?.reduce(
    (total, e) =>
      total + (e.particularsData?.sanctionedAmount ?
        Number(e.particularsData.sanctionedAmount) :
        0),
    0,
  );
  const requestedWords = toWords.convert(totalRequested || 0);
  const sanctionedWords = toWords.convert(totalSanctioned || 0);
  const options = [
    'IRO No',
    'Status',
    'Sub-Division',
    'Main Category',
    'Sub Category 1',
    'Sub Category 2',
    'Sub Category 3',
    'For the month',
    'Requested Amount',
    'Sanctioned Bank',
    'Beneficiary Name',
    'Source Of Account',
    'Last Updated',
  ];

  const [selectedData, setSelectedData] = useState<any[]>([
    'Sl No',
    'FR No',
    'Date',
    'Division',
    'Narration',
    'Sanction Amount',
    'Sanction as per',

  ]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  console.log(loading1, 'options');
  const originalOrder = [
    'Sl No',
    'FR No',
    'Date',
    'Division',
    'Narration',
    'Sanction Amount',
    'Sanction as per',
    'IRO No',
    'Status',
    'Sub-Division',
    'Main Category',
    'Sub Category 1',
    'Sub Category 2',
    'Sub Category 3',
    'For the month',
    'Requested Amount',
    'Sanctioned Bank',
    'Beneficiary Name',
    'Source Of Account',
    'Last Updated',
  ];
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
  const [prevselectedSignature, setPrevSignature] = useState<Esignature>({
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
        setPrevSignature(res.data as Esignature);
        setMngrName((res.data as { officeManagerName: string }).officeManagerName);
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
  }, []);
  const totalRequestedAmount = data?.reduce((grandTotal, e) => {
    const particulars = Array.isArray(e?.particularsData) ? e.particularsData : [];

    const subtotal = particulars.reduce((total: number, particular: { requestedAmount: any }) =>
      total + (Number(particular?.requestedAmount) || 0), 0,
    );

    return grandTotal + subtotal;
  }, 0);

  useEffect(()=>{
    DivisionsServices.getDivisionById((user?.user as any)?.division).then((res) => {
      console.log(res.data, 'resrrsa');
      setSingleDivision(res.data);
    });
  }, []);

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
      IROServices.getAll({ dateRange: dateRange, status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => {
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
      // Reset loading state
      setLoading(false);
      setIroData(null);
      setOpenAttachReceipt(false);
    }
  };

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const filteredRows = (data ?? []).filter((row: any) => {
    const search = searchText.toLowerCase();

    return (
      row.FRno?.toLowerCase().includes(search) ||
    row.IROdata?.IROno?.toLowerCase().includes(search) ||
    row.divisionData?.details?.name?.toLowerCase().includes(search) ||
    row.particularsData?.mainCategory?.toLowerCase().includes(search)
    );
  });

  console.log(filteredRows, 'filteredRows');

  if (searchText && filteredRows.length ===0) {
    enqueueSnackbar({
      message: ` ${searchText} not found`,
      variant: 'warning',
    });
  }

  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            // {
            //   id: 'View',
            //   text: 'Release Amount',
            //   component: Link,
            //   to: '/iro/release_amount/' + props.row._id,
            //   icon: PreviewIcon,
            // },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/iro/${props.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'View',
              text: 'View Fr ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(props.row as any).FR}/view`, '_blank');
              },

            },
            ...(props.row.status >= IROLifeCycleStates.IRO_CLOSED ?
              [
                {
                  id: 'Release',
                  text: 'View Release Amount',
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([props.row])],
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
                setSelectedIROId(props.row._id);
                IROServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
            },
            ...(props.row.closedIroPdf?
              [
                {
                  id: 'print',
                  text: 'Print IRO',
                  icon: PrintIcon,
                  onClick: () => {
                    setIroData(props.row);
                    setOpenPrintIro(true);
                  },
                },
              ] :
              []),

            ...(hasPermissions(['REOPEN_FR_IRO']) ?[

              {
                id: 'View',
                text: 'Reopen',
                component: Link,
                onClick: async () => {
                  try {
                    // Fetch the first API data
                    const res1 = await IROServices.getById(props.row._id as string);
                    const convertedData: IROrder = {
                      ...res1.data,
                      // requestAmount: res1.data?.requestedAmount, // Fix key access if needed
                    };

                    // Update the state
                    // setRequisition(convertedData);
                    console.log({ convertedData });

                    // Wait for the state update to complete
                    await new Promise((resolve) => setTimeout(resolve, 0));

                    // Perform the second API call using the updated requisition
                    const res2 = await IROServices.reopen(props.row._id);
                    console.log(res2);

                    // Show success message
                    enqueueSnackbar({
                      message: 'IRO Reopened',
                      variant: 'success',
                    });
                    // window.location.reload();
                  } catch (error) {
                    // Handle errors
                    enqueueSnackbar({
                      variant: 'error',
                      // message: err.message,
                    });
                  }
                },
                icon: PreviewIcon,
              },
            ]:[]),
            // {
            //   id: 'View',
            //   text: 'View Details ',
            //   component: Link,
            //   // to: `/fr/${props.row._id}/view`,
            //   to: `/iro/${props.row._id}`,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'Reconciliation',
            //   text: 'Reconciliation',
            //   icon: EditIcon,
            // },
            // ...(!props.row.closedIroPdf?
            //   [
            //     {
            //       id: 'Attach IRO receipt',
            //       text: 'Attach IRO reciept',
            //       icon: AttachFileIcon,
            //       onClick: () => {
            //         setOpenAttachReceipt(true);
            //         setIroData(props.row);
            //         if (props?.row.FR) {
            //           FRServices.getById(props.row.FR).then((res) => {
            //             setFrData(res.data);
            //             console.log(res.data, 'fr');
            //           });
            //         }
            //         setPrintIroLoading(true);
            //         setTimeout(() => {
            //           setPrintIroLoading(false);
            //         }, 2000);
            //       } }] :
            //   []),
            {
              id: 'Attach IRO receipt',
              text: 'Regenerate IRO',
              icon: AttachFileIcon,
              onClick: () => {
                setOpenAttachReceipt(true);
                setIroData(props.row);
                if (props?.row.FR) {
                  FRServices.getById(props.row.FR).then((res) => {
                    setFrData(res.data);
                    console.log(res.data, 'fr');
                  });
                }
                setPrintIroLoading(true);
                setTimeout(() => {
                  setPrintIroLoading(false);
                }, 2000);
              } },
            {
              id: 'Attach IRO receipt',
              text: 'Prev Regenerate IRO',
              icon: AttachFileIcon,
              onClick: () => {
                setOpenAttachReceipt1(true);
                setIroData(props.row);
                if (props?.row.FR) {
                  FRServices.getById(props.row.FR).then((res) => {
                    setFrData(res.data);
                    console.log(res.data, 'fr');
                  });
                }
                setPrintIroLoading(true);
                setTimeout(() => {
                  setPrintIroLoading(false);
                }, 2000);
              } },
            {
              id: 'Attachments',
              text: 'Attachments',
              icon: AttachFileIcon,
              onClick: () => {
                setAttachments(props.row.billAttachment);
                setViewFileUploader(true);
              },
            },
          ]}
        />
      ),
    },
    {
      field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 100, align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'IRODate',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>IRO Date</b>),
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   width: 130,
    // },
    {
      field: 'IRODate',
      headerName: 'IRO Date',
      width: 130,
      // valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'divisionName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details?.name,
      width: 150,
    },
    // {
    //   field: 'subDivisions',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
    //   width: 170,
    // },
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
      renderHeader: () => (<b>Main Category</b>),
      width: 240,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props:any) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {props.row.particulars.mainCategory}
        </p>
      ),
    },
    {
      field: 'subCategory',
      renderHeader: () => <b>Sub Category</b>,
      width: 240,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params:any) => {
        const subCategory3 = (params.row.particulars?.subCategory3);
        const subCategory2 = params.row.particulars?.subCategory2;
        const subCategory1 = params.row.particulars?.subCategory1;
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
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      valueGetter(params) {
        const IRORequest = params.row as IROrder;
        return IRORequest;
      },
    },

    // {
    //   field: 'updatedAt',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>Last Updated</b>),
    //   width: 150,
    //   renderCell: (props) => (
    //     <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
    //   ),
    // },
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      width: 200,
      // valueGetter: (params) => params.row.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? 'N/A',
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'IRO Close Date',
      headerName: 'IRO Closed Date',
      width: 200,
      // valueGetter: (params) => params.row.iroClosedOn?.format('DD/MM/YYYY') ?? 'N/A',
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sanctionedAmount', align: 'center',
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount;
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0);
        }
        return 0; // or return a suitable default value
      }, headerAlign: 'center', renderHeader: () => (<b>Sanctioned Amount</b>), width: 150,
    },
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
    {
      field: 'sanctionedBank', renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center',
      headerAlign: 'center', width: 130,
    },
    // {
    //   field: 'released amount ', headerName: 'Amount Transferred', width: 150, renderHeader: () => <b>Amount Transferred</b>, align: 'center', headerAlign: 'center',
    //   valueGetter: (params) => params.row.releaseAmount?.transferredAmount,
    // },
    // {
    //   field: 'updatedAt',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>Last Updated</b>),
    //   width: 150,
    //   renderCell: (props) => (
    //     <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
    //   ),
    // },
  ];
  useEffect(() => {
    // IROServices.getAll({ dateRange: dateRange })
    //   .then((res) => {
    //     setIROrder(res.data);
    //     setData(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });

    CustomReportServices.filterDataFR(filters, dateRange)
      .then((res) => {
        // setIROrder(res.data);
        setData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    // setData((iroReq) =>
    //   iroReq ?
    //     iroReq.filter((iro) =>
    //       moment(iro.IRODate).isSameOrAfter(moment(dateRange.startDate)) &&
    //           moment(iro.IRODate).isSameOrBefore(moment(dateRange.endDate)),
    //     ) :
    //     [],
    // );
  }, [dateRange]);
  console.log(dateRange, 'dateRange');

  const navigate = useNavigate();
  // State management for filters
  const [divisions, setDivisions] = useState<any[] | null>(null);
  const [division, setDivision] = useState<any[] | null>(null);
  const [subDivisions, setSubDivisions] = useState<any[] | null>(null);
  const [mainCategories, setMainCategories] = useState<any[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<any | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<any | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  const [IRO, setIRO] = useState<any>();
  const user = useAuth();
  const [filters, setFilters] = useState<any>({
    division: '',
    subdivision: '',
    allDivisions: false,
    frStatus: '',
    sanctionedAsPer: '',
    frDateFrom: '',
    frDateTo: '',
    reqAmountFrom: '',
    reqAmountTo: '',
    sanctAmountFrom: '',
    sanctAmountTo: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    beneficiaryName: '',
    sanctionedBank: '',
  });
  const [sanctionedAsPers, setSanctionedAsPers] = useState<any[]>([]);

  console.log(filters, '323');

  useEffect(()=>{
    if ((user?.user as any).permissions.READ_ALL_DIVISIONS) {
      DivisionsServices.getDivisions().then((res) => {
        //   setDivision(res.data ?? null);
        setDivisions(res.data);
      });
    }
    FRServices.getMainCategory()
          .then((res) => {
            setMainCategories(res.data);
          })
          .catch((res) => {
            console.log(res);
          });
    if (IRO) {
      FRServices.getById(IRO).then((res) =>{
        setIRO(res.data);
      }); // TODO: Implement REST API Call
    }
    let asPer;
    const ddata = SanctionedAsPerService.getAll().then((res) => {
      asPer = res.data.map((e:any)=>e.asPer ); setSanctionedAsPers(asPer);
      console.log(asPer);
    });
  }, []);
  useEffect(()=>{
    DivisionsServices.getSubDivisionsByDivisionId(filters.division?._id ?? '')
              .then((res2) => setSubDivisions(res2.data))
              // .then((res) => console.log(res.data, 'sec'))
              .catch((error) =>
                enqueueSnackbar({
                  variant: 'error',
                  message: error.message,
                }),
              );
  }, [filters.division]);
  console.log(divisions, 'DIVISION77');
  //   console.log(filters, 'DIVISION77');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: checked }));
  };

  return (
    <>
      {!page && <><Container>

        <div style={{ padding: '16px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="h4" gutterBottom>
            FR Report Filter
          </Typography>

          {/* Division Details Section */}
          <section>
            <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
              Division Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  aria-required
                  options={divisions ?? [singleDivision]} // Ensure options are not null or undefined
                  getOptionLabel={(option) => option?.details?.name || ''} // Fallback to an empty string if name is undefined
                  value={filters.division} // Match the value to an option in the divisions array
                  onChange={(event, newValue) => setFilters((prev: any) => ({
                    ...prev,
                    division: newValue ?? '', // Store the ID of the selected division
                  }))
                    // setDivision(newValue),
                  }
                  disabled={filters.allDivisions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Division"
                      name="division"
                      variant="outlined"
                      required />
                  )} />

              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={subDivisions ?? []} // Ensure options are not null or undefined
                  getOptionLabel={(option:any) =>option.name|| ''} // Adjust for plain strings or objects
                  value={filters.subdivision?? filters.subdivision} // Match the value to the corresponding object
                  onChange={(event, newValue) => setFilters((prev: any) => ({
                    ...prev,
                    subdivision: newValue?? filters.subdivision,
                  }))}
                  disabled={filters.allDivisions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Sub-division"
                      name="subdivision"
                      variant="outlined" />
                  )} />

              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={<Checkbox
                    name="allDivisions"
                    checked={filters.allDivisions}
                    disabled={(user?.user as any)?.permissions?.READ_ALL_DIVISIONS !==true}
                    onChange={handleCheckboxChange} />}
                  label="All Divisions" />
              </Grid>
            </Grid>
          </section>

          {/* IRO Details Section */}
          <section>
            <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
              FR Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="FR Status"
                  name="frStatus"
                  value={filters.frStatus}
                  onChange={handleInputChange}
                >
                  <MenuItem value="-200">FR CLOSED</MenuItem>
                  <MenuItem value="-201">REVERT</MenuItem>
                  <MenuItem value="220">REOPENED</MenuItem>
                  <MenuItem value="201">WAITING FOR PRESIDENT</MenuItem>
                  <MenuItem value="202">WAITING FOR ACCOUNTS</MenuItem>
                  <MenuItem value="203">FR APPROVED</MenuItem>
                  <MenuItem value="-102">FR DISAPPROVED</MenuItem>
                  <MenuItem value="217">IRO DISAPPROVED</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  aria-required
                  options={sanctionedAsPers ?? []} // Ensure options are not null or undefined
                  getOptionLabel={(option) => option || ''} // Fallback to an empty string if name is undefined
                  value={filters.sanctionedAsPer} // Match the value to an option in the divisions array
                  onChange={(event, newValue) => setFilters((prev: any) => ({
                    ...prev,
                    sanctionedAsPer: newValue ?? '', // Store the ID of the selected division
                  }))
                    // setDivision(newValue),
                  }
                  // disabled={filters.allDivisions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Sanctioned As Per"
                      name="sanctionedAsPer"
                      variant="outlined"
                      required />
                  )} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  fullWidth
                  label="FR Date From"
                  name="frDateFrom"
                  value={filters.frDateFrom}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  fullWidth
                  label="FR Date To"
                  name="frDateTo"
                  value={filters.frDateTo}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Req. Amount From"
                  name="reqAmountFrom"
                  value={filters.reqAmountFrom}
                  onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Req. Amount To"
                  name="reqAmountTo"
                  value={filters.reqAmountTo}
                  onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Sanct. Amount From"
                  name="sanctAmountFrom"
                  value={filters.sanctAmountFrom}
                  onChange={handleInputChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Sanct. Amount To"
                  name="sanctAmountTo"
                  value={filters.sanctAmountTo}
                  onChange={handleInputChange} />
              </Grid>
            </Grid>
          </section>

          {/* Category Details Section */}
          <section>
            <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
              Category Wise:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={selectedMainCategory ?? null}
                  options={mainCategories ?? []}
                  getOptionLabel={(mainCategory) => mainCategory.name}
                  onChange={(e, selectedMainCategory) => {
                    setFilters((prev: any) => ({
                      ...prev,
                      mainCategory: selectedMainCategory, // Store the ID of the selected division
                    }));
                    setSelectedMainCategory(selectedMainCategory);
                    setSelectedSubCategory1(null);
                    setSelectedSubCategory1(null);
                    setSelectedSubCategory1(null);
                  } }
                  renderInput={(params) => <TextField {...params} label="Choose Main Category" />}
                  fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={selectedSubCategory1}
                  options={selectedMainCategory?.subcategory1 ?? []}
                  getOptionLabel={(subcategory2) => subcategory2.name}
                  onChange={(_e, selectedSubCategory1) => {
                    setFilters((prev: any) => ({
                      ...prev,
                      subCategory1: selectedSubCategory1.name, // Store the ID of the selected division
                    }));
                    setSelectedSubCategory1(selectedSubCategory1);
                  } }
                  renderInput={(params) => <TextField {...params} label="Sub Category 1" required />}
                  fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  // disabled={props.disable==true}
                  value={selectedSubCategory2}
                  options={selectedSubCategory1?.subcategory2 ?? []}
                  getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                  onChange={(_e, selectedSubCategory2) => {
                    if (selectedSubCategory2) {
                      setFilters((prev: any) => ({
                        ...prev,
                        subCategory2: selectedSubCategory2.name, // Store the ID of the selected division
                      }));
                      setSelectedSubCategory2(selectedSubCategory2);
                    }
                    //   const subcat2 =selectedSubCategory2?.subcategory3.map((e)=>e.name);
                    //   if (subcat2?.includes('Select')) {
                    //     console.log('Select');
                    //     if (selectedSubCategory2) {
                    //       setNewParticular((particularDetails) => ({
                    //         ...particularDetails,
                    //         narration: selectedSubCategory2?.subcategory3[0].narration,
                    //       }));
                    //       setSelectedSubCategory3(selectedSubCategory3);
                    //     }
                    //   }
                  } }
                  renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                  fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  // disabled={props.disable==true}
                  value={selectedSubCategory3}
                  options={selectedSubCategory2?.subcategory3 ?? []}
                  getOptionLabel={(subCategory3) => subCategory3.name}
                  onChange={(e, selectedSubCategory3) => {
                    if (selectedSubCategory3) {
                      setFilters((prev: any) => ({
                        ...prev,
                        subCategory3: selectedSubCategory3.name, // Store the ID of the selected division
                      }));
                      setSelectedSubCategory3(selectedSubCategory3);
                    }
                  } }
                  renderInput={(params) => <TextField {...params} label="Sub Category 3" />}
                  fullWidth />
              </Grid>
            </Grid>
          </section>

          {/* Bank Details Section */}
          <section>
            <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
              Bank Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="Beneficiary_bank">Beneficiary Bank</InputLabel>
                  <Select
                    labelId="sanctioned_bank"
                    label="Sanctioned Bank"
                    value={filters.sanctionedBank ?? ''}
                    required
                    onChange={((e: any) => {
                      setFilters((prev: any) => ({
                        ...prev,
                        sanctionedBank: e.target.value, // ✅ Store the selected value instead of the event
                      }));
                    })}
                  >
                    <MenuItem value={filters.sanctionedBank}>{filters.sanctionedBank}</MenuItem>
                    {filters.division?.DivisionBankFCRA?.bankName != '' || filters.division?.FCRABankDetails?.bankName != '' ? (
                      <MenuItem value={`FCRA-${filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}`}>
                        {filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.DivisionBankLocal?.bankName || filters.division?.localBankDetails?.bankName ? (
                      <MenuItem value={`Local Bank-${filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}`}>
                        {filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank1?.bankName || filters.division?.otherBankDetails?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 1-${filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank2?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 2-${filters.division?.BeneficiaryBank2?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank2?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank3?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 3-${filters.division?.BeneficiaryBank3?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank3?.beneficiary}
                      </MenuItem>
                    ) : '1'}

                    {filters.division?.BeneficiaryBank4?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 4-${filters.division?.BeneficiaryBank4?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank4?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank5?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 5-${filters.division?.BeneficiaryBank5?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank5?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank6?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 6-${filters.division?.BeneficiaryBank6?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank6?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank7?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 7-${filters.division?.BeneficiaryBank7?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank7?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank8?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 8-${filters.division?.BeneficiaryBank8?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank8?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank9?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 9-${filters.division?.BeneficiaryBank9?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank9?.beneficiary}
                      </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank10?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 10-${filters.division?.BeneficiaryBank10?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank10?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank10?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 11-${filters.division?.BeneficiaryBank11?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank11?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank12?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 12-${filters.division?.BeneficiaryBank12?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank12?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank13?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 13-${filters.division?.BeneficiaryBank13?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank13?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank14?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 14-${filters.division?.BeneficiaryBank14?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank14?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank15?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 15-${filters.division?.BeneficiaryBank15?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank15?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank16?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 16-${filters.division?.BeneficiaryBank16?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank16?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank17?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 17-${filters.division?.BeneficiaryBank17?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank17?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank18?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 18-${filters.division?.BeneficiaryBank18?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank18?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank19?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 19-${filters.division?.BeneficiaryBank19?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank19?.beneficiary}
                      </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank20?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 20-${filters.division?.BeneficiaryBank20?.beneficiary}`}>
                        {filters.division?.BeneficiaryBank20?.beneficiary}
                      </MenuItem>
                    ) : ''}


                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                  <Select
                    labelId="sanctioned_bank"
                    label="Sanctioned Bank"
                    value={filters.sanctionedBank ?? ''}
                    required
                    onChange={((e: any) => {
                      setFilters((prev: any) => ({
                        ...prev,
                        sanctionedBank: e.target.value, // Store the ID of the selected division
                      }));
                    })}
                  >
                    <MenuItem value={filters.sanctionedBank}>{filters.sanctionedBank}</MenuItem>
                    {filters.division?.DivisionBankFCRA?.bankName != '' || filters.division?.FCRABankDetails?.bankName != '' ? (
                      <MenuItem value={`FCRA-${filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}`}>
                        Division Bank FCRA                   </MenuItem>
                    ) : ''}

                    {filters.division?.DivisionBankLocal?.bankName || filters.division?.localBankDetails?.bankName ? (
                      <MenuItem value={`Local Bank-${filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}`}>
                        Division Bank Local                     </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank1?.bankName || filters.division?.otherBankDetails?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 1-${filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}`}>
                        Beneficiary Bank 1                    </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank2?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 2-${filters.division?.BeneficiaryBank2?.beneficiary}`}>
                        Beneficiary Bank 2                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank3?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 3-${filters.division?.BeneficiaryBank3?.beneficiary}`}>
                        Beneficiary Bank 3                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank4?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 4-${filters.division?.BeneficiaryBank4?.beneficiary}`}>
                        Beneficiary Bank 4                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank5?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 5-${filters.division?.BeneficiaryBank5?.beneficiary}`}>
                        Beneficiary Bank 5                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank6?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 6-${filters.division?.BeneficiaryBank6?.beneficiary}`}>
                        Beneficiary Bank 6                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank7?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 7-${filters.division?.BeneficiaryBank7?.beneficiary}`}>
                        Beneficiary Bank 7                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank8?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 8-${filters.division?.BeneficiaryBank8?.beneficiary}`}>
                        Beneficiary Bank 8                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank9?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 9-${filters.division?.BeneficiaryBank9?.beneficiary}`}>
                        Beneficiary Bank 9                 </MenuItem>
                    ) : ''}

                    {filters.division?.BeneficiaryBank10?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 10-${filters.division?.BeneficiaryBank10?.beneficiary}`}>
                        Beneficiary Bank 10                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank10?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 11-${filters.division?.BeneficiaryBank11?.beneficiary}`}>
                        Beneficiary Bank 11                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank12?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 12-${filters.division?.BeneficiaryBank12?.beneficiary}`}>
                        Beneficiary Bank 12                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank13?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 13-${filters.division?.BeneficiaryBank13?.beneficiary}`}>
                        Beneficiary Bank 13                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank14?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 14-${filters.division?.BeneficiaryBank14?.beneficiary}`}>
                        Beneficiary Bank 14                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank15?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 15-${filters.division?.BeneficiaryBank15?.beneficiary}`}>
                        Beneficiary Bank 15                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank16?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 16-${filters.division?.BeneficiaryBank16?.beneficiary}`}>
                        Beneficiary Bank 16                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank17?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 17-${filters.division?.BeneficiaryBank17?.beneficiary}`}>
                        Beneficiary Bank 17                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank18?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 18-${filters.division?.BeneficiaryBank18?.beneficiary}`}>
                        Beneficiary Bank 18                 </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank19?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 19-${filters.division?.BeneficiaryBank19?.beneficiary}`}>
                        Beneficiary Bank 19                  </MenuItem>
                    ) : ''}
                    {filters.division?.BeneficiaryBank20?.bankName ? (
                      <MenuItem value={`Beneficiary Bank 20-${filters.division?.BeneficiaryBank20?.beneficiary}`}>
                        Beneficiary Bank 20
                      </MenuItem>
                    ) : ''}


                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </section>

          {/* Action Buttons */}
          <Grid container spacing={2} style={{ marginTop: '16px' }}>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  event.preventDefault(); // Prevents form submission
                  setLoading1(true);
                  CustomReportServices.filterDataFR(filters).then((res) => {
                    if (res.data.length >= 1) {
                      setPage(true);
                      setData(res.data);
                      setLoading1(false);
                    } else {
                      setLoading1(false);
                      enqueueSnackbar({
                        variant: 'info',
                        message: 'No data found!',
                      });
                    }
                    console.log(res.data, 'ee');
                    // if (res.data) {
                    //   navigate('/custom-report/custom-report-table', {
                    //     state: { reportData: JSON.stringify(res.data) }, // Convert to string
                    //   });
                    // }
                  });
                } }
              >
                Apply Filters
              </Button>


            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setFilters({
                  division: '',
                  subdivision: '',
                  allDivisions: false,
                  frStatus: '',
                  sanctionedAsPer: '',
                  frDateFrom: '',
                  frDateTo: '',
                  reqAmountFrom: '',
                  reqAmountTo: '',
                  sanctAmountFrom: '',
                  sanctAmountTo: '',
                  mainCategory: '',
                  subCategory1: '',
                  subCategory2: '',
                  subCategory3: '',
                  beneficiaryName: '',
                  sanctionedBank: '',
                })}
              >
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setPage(true)}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container><Dialog open={loading1} maxWidth="xs" fullWidth>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent>
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        Wait for a while...
              <CircularProgress color="secondary" sx={{ mt: 2 }} />
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
      </>
      }

      { page && <CommonPageLayout title="Custom report" momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setData((iroReq) =>
            iroReq ?
              iroReq.filter((iro) =>
                moment(iro.IRODate).isSameOrAfter(moment(newDateRange.startDate)) &&
                  moment(iro.IRODate).isSameOrBefore(moment(newDateRange.endDate)),
              ) :
              [],
          );
        },
        rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
        initialRange: 'months',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid sx={{ p: 1 }}>

            {/* <Button onClick={() => setData(null)} variant='contained' type='button'>
              Filters
            </Button> */}
          </Grid>
          {/* <Grid sx={{ p: 1 }}>

            <Button variant='contained' type='button'>
              PDF
            </Button>
          </Grid> */}
          {/* <Grid sx={{ p: 1 }}>

            <Button variant='contained' type='button'>
              Print
            </Button>
          </Grid> */}
          {/* <Button
            variant='contained'
            type='button'
            sx={{ marginLeft: 'auto' }}
            onClick={() => setOpen(true)} // Moves the button to the right
          >
            Select data
          </Button> */}
        </Box>

        <Card sx={{ maxWidth: '78vw', height: '90vh', alignItems: 'center' }}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={6}>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
              <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                placeholder='Enter IROno or IRODate or Division or SubCategory'
                onChange={handleSearchChange}
                fullWidth />
              {/* </div> */}
            </Grid>
            <Grid item xs={6}>


            </Grid>


            {/* <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '75vh', width: '100%' }} getRowClassName={(params) => {
                  if (params.row.specialsanction == 'Yes') {
                    return 'special-sanction'; // Class for rows with special sanction
                  }
                  return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                } }
                components={{
                  Footer: CustomFooter,
                }} /> */}
            <Box sx={{ width: '95%', margin: 'auto', mt: 2, p: 2 }}>
              {/* Top Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button onClick={() => setPage(false)} variant="contained">FILTERS</Button>
                <Button
                  onClick={()=>{
                    setPrint(true);
                  }}
                  // onClick={async () => {
                  //   const sheet = data ?
                  //     data.map((iro: any) => [
                  //       iro.IROno,
                  //       moment(iro.IRODate).format('DD/MM/YYYY'),
                  //       iro.divisionData?.details?.name,
                  //       iro.purposeSubdivision?.name,
                  //       iro.particularsData.mainCategory,
                  //       iro.particularsData.requestAmount,
                  //       iro.particularsData.sanctionedAmount,
                  //       iro.sanctionedBank,
                  //       iro.particularsData.sanctionedAsPer,
                  //       iro.releaseAmount?.releaseAmount,
                  //       iro.releaseAmount?.transferredDate?.format('DD/MM/YYYY'),
                  //       IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
                  //     ]) :
                  //     [];

                  //   const headers = [
                  //     'IRO No',
                  //     'Date',
                  //     'Status',
                  //     'Division',
                  //     'Sub Division',
                  //     'Main Category',
                  //     'Sub Category',
                  //     'Requested Amt',
                  //     'Sanctioned Amt',
                  //     'Sanctioned Bank',
                  //     'Beneficiary Name',
                  //     // 'Sanctioned As per',
                  //     // 'Released Amt',
                  //     // 'Released Date',
                  //   ];

                  //   // eslint-disable-next-line new-cap
                  //   const doc = new jsPDF({
                  //     orientation: 'landscape', // Use landscape for better table fitting
                  //     unit: 'mm',
                  //     format: 'a4',
                  //   });

                  //   doc.setFontSize(14);
                  //   doc.text('Custom IRO Report', 14, 10);

                  //   (doc as any).autoTable({
                  //     head: [selectedData],
                  //     body: sheet,
                  //     startY: 20,
                  //     theme: 'grid',
                  //     headStyles: { fontSize: 9, halign: 'center', fillColor: [22, 160, 133], cellPadding: 2, rotation: 45 },
                  //     pageBreak: 'auto',

                  //     styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
                  //     columnStyles: {
                  //       0: { cellWidth: 'auto' },
                  //       1: { cellWidth: 20 }, // Adjust width manually for some columns
                  //       2: { cellWidth: 20 },
                  //       3: { cellWidth: 25 },
                  //       4: { cellWidth: 25 },
                  //       // Set other columns to auto-fit
                  //     },
                  //     margin: { top: 20, left: 5, right: 5 },
                  //   });


                  //   doc.save('Custom_IRO_Report.pdf');
                  // }
                  // }
                  startIcon={<DownloadIcon />}
                  color="primary"
                  sx={{ float: 'right', mr: 0, mt: 0 }}
                  variant="contained"
                >
  Export PDF
                </Button>
                <Button
                  onClick={async () => {
                    const sheet = data ?
                      data.map((iro: any, index) => {
                        const row = [
                          index +1,
                          selectedData.includes('FR No') && iro.FRno,
                          selectedData.includes('Date') && iro.FRdate,
                          selectedData.includes('Division') && iro.divisionData?.details?.name,
                          selectedData.includes('Narration') && iro.particularsData?.narration,
                          selectedData.includes('Sanction Amount') && formatAmount(iro.particularsData?.sanctionedAmount),
                          selectedData.includes('Sanction as per') && iro.particularsData?.sanctionedAsPer,
                          selectedData.includes('IRO No') && iro.IROdata?.IROno,
                          selectedData.includes('Status') && IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
                          selectedData.includes('Sub-Division') && iro.subDivData?.name,
                          selectedData.includes('Main Category') && iro.particularsData?.mainCategory,
                          selectedData.includes('Sub Category 1') && iro.particularsData?.subCategory1,
                          selectedData.includes('Sub Category 2') && iro.particularsData?.subCategory2,
                          selectedData.includes('Sub Category 3') && iro.particularsData?.subCategory3,
                          selectedData.includes('For the month') && iro.particularsData?.month,
                          selectedData.includes('Requested Amount') && iro.particularsData?.requestedAmount,
                          selectedData.includes('Sanctioned Bank') && iro.sanctionedBank,
                          selectedData.includes('Beneficiary Name') && iro.sanctionedBank?.split('-').slice(1).join('-').trim(),
                          selectedData.includes('Mode of Payment') && iro.releaseAmountData?.modeOfPayment,
                          selectedData.includes('Amount Release Date') && moment(iro.releaseAmountData?.transferredDate).format('DD/MM/YYYY'),
                          selectedData.includes('IroClosedOn') && moment(iro?.iroClosedOn).format('DD/MM/YYYY'),
                          selectedData.includes('Source Of Account') && iro?.sourceOfAccount,
                          selectedData.includes('ReleaseAmount') && iro.releaseAmountData?.releaseAmount,
                          selectedData.includes('Last Updated') && moment(iro.updatedAt).format('DD/MM/YYYY'),
                        ].filter((value) => value !== false); // Remove only `false`, keep others

                        return row;
                      }) :
                      [];

                    const worksheet = XLSX.utils.json_to_sheet(sheet);
                    const workbook = XLSX.utils.book_new();

                    // Add column headers dynamically based on `selectedData`
                    XLSX.utils.sheet_add_aoa(worksheet, [selectedData], { origin: 'A1' });

                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                    XLSX.writeFile(workbook, 'Custom_IRO_Report.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadIcon />}
                  color="primary"
                  // sx={{ float: 'right', mr: 2, mt: 2 }}
                  variant="contained"
                >
  Export Excel
                </Button>
                {/* <Button variant="contained" startIcon={<Print />}>
          PRINT
                </Button> */}
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: 'blue' }}>
          SELECT DATA
                </Button>
              </Box>

              {/* Search Field */}
              {/* <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 2 }}
                  /> */}

              {/* Table */}
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 400, overflow: 'auto' }} // Set height and enable scrolling
              >
                <Table stickyHeader> {/* Ensure header stays visible */}
                  <TableHead sx={{ height: 10, backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Sl No</TableCell>
                      {selectedData.includes('FR No') && <TableCell sx={{ fontWeight: 'bold' }}>FR No</TableCell>}
                      {selectedData.includes('IRO No') && <TableCell sx={{ fontWeight: 'bold' }}>IRO No</TableCell>}
                      {selectedData.includes('Date') && <TableCell sx={{ fontWeight: 'bold' }}>FR Date</TableCell>}
                      {selectedData.includes('Status') && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>}
                      {/* {selectedData.includes('IRO Status') && <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>} */}
                      {selectedData.includes('Division') && <TableCell sx={{ fontWeight: 'bold' }}>Division Name</TableCell>}
                      {selectedData.includes('Sub-Division') &&<TableCell sx={{ fontWeight: 'bold', width: '150px' }}>Sub Division Name</TableCell>}
                      {selectedData.includes('Main Category') && <TableCell sx={{ fontWeight: 'bold' }}>Main Category</TableCell>}
                      {selectedData.includes('Sub Category 1') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 1</TableCell>}
                      {selectedData.includes('Sub Category 2') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 2</TableCell>}
                      {selectedData.includes('Sub Category 3') && <TableCell sx={{ fontWeight: 'bold' }}>Sub Category 3</TableCell>}
                      {selectedData.includes('Requested Amount') && <TableCell sx={{ fontWeight: 'bold' }}>Requested Amount</TableCell>}
                      {selectedData.includes('Sanction Amount') && <TableCell sx={{ fontWeight: 'bold' }}>Sanction Amount</TableCell>}
                      {selectedData.includes('Sanctioned Bank') && <TableCell sx={{ fontWeight: 'bold' }}>Sanctioned Bank</TableCell>}
                      {selectedData.includes('Beneficiary Name') && <TableCell sx={{ fontWeight: 'bold' }}>Beneficiary Name</TableCell>}
                      {selectedData.includes('For the month') && <TableCell sx={{ fontWeight: 'bold', width: '150px' }}>For the month</TableCell>}
                      {selectedData.includes('Mode of Payment') && <TableCell sx={{ fontWeight: 'bold' }}>Mode of Payment</TableCell>}
                      {selectedData.includes('Amount Release Date') && <TableCell sx={{ fontWeight: 'bold' }}>Amount Release Date</TableCell>}
                      {selectedData.includes('Sanction as per') && <TableCell sx={{ fontWeight: 'bold' }}>Sanction as per</TableCell>}
                      {selectedData.includes('Narration') && <TableCell sx={{ fontWeight: 'bold' }}>Narration</TableCell>}
                      {/* {selectedData.includes('UnitPrice') && <TableCell sx={{ fontWeight: 'bold' }}>UnitPrice</TableCell>} */}
                      {/* {selectedData.includes('Beneficiary Name') && <TableCell sx={{ fontWeight: 'bold' }}>Beneficiary Name</TableCell>} */}
                      {selectedData.includes('IroClosedOn') && <TableCell sx={{ fontWeight: 'bold' }}>Iro Closed On</TableCell>}
                      {/* {selectedData.includes('ApprovedBy') && <TableCell sx={{ fontWeight: 'bold' }}>Approved By</TableCell>} */}
                      {selectedData.includes('Source Of Account') && <TableCell sx={{ fontWeight: 'bold' }}>Source Of Account</TableCell>}
                      {selectedData.includes('Last Updated') &&<TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row: any, index) => (
                      <TableRow
                        key={row.id}
                        onClick={() => setSelectedRow(row.id)}
                        sx={{
                          'backgroundColor': selectedRow === row.id ? '#d7cdf7' : 'inherit',
                          'cursor': 'pointer',
                          '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                      >
                        <TableCell>{index +1}</TableCell>
                        {selectedData.includes('FR No') && <TableCell>{row.FRno}</TableCell>}
                        {selectedData.includes('IRO No') && <TableCell>{row.IROdata?.IROno}</TableCell>}
                        {selectedData.includes('Date') && <TableCell>{moment(row.FRdate).format('DD/MM/YYYY')}</TableCell>}
                        {selectedData.includes('Status') && <TableCell>{IROLifeCycleStates.getStatusNameByCodeTransaction(row.status).replaceAll('_', ' ')}</TableCell>}
                        {selectedData.includes('Division') && <TableCell>{row.divisionData?.details?.name}</TableCell>}
                        {selectedData.includes('Sub-Division') && <TableCell>{row.subDivData?.name}</TableCell>}
                        {selectedData.includes('Main Category') && <TableCell>{row.particularsData?.mainCategory}</TableCell>}
                        {selectedData.includes('Sub Category 1') && <TableCell>{row.particularsData?.subCategory1}</TableCell>}
                        {selectedData.includes('Sub Category 2') && <TableCell>{row.particularsData?.subCategory2}</TableCell>}
                        {selectedData.includes('Sub Category 3') && <TableCell>{row.particularsData?.subCategory3}</TableCell>}
                        {selectedData.includes('Requested Amount') && <TableCell>{formatAmount(row.particularsData?.requestedAmount)}</TableCell>}
                        {selectedData.includes('Sanction Amount') && <TableCell>{ formatAmount(row.particularsData?.sanctionedAmount)}</TableCell>}
                        {selectedData.includes('Sanctioned Bank') && <TableCell>{row.sanctionedBank}</TableCell>}
                        {selectedData.includes('Beneficiary Name') && <TableCell>{row.sanctionedBank?.split('-').slice(1).join('-').trim()}</TableCell>}
                        {selectedData.includes('For the month') && <TableCell>{row.particularsData?.month}</TableCell>}
                        {selectedData.includes('Mode of Payment') && <TableCell>{row.releaseAmountData?.modeOfPayment}</TableCell>}
                        {selectedData.includes('Amount Release Date') && <TableCell>{moment(row.releaseAmountData?.transferredDate).format('DD/MM/YYYY')}</TableCell>}
                        {selectedData.includes('Sanction as per') && <TableCell>{row.particularsData?.sanctionedAsPer}</TableCell>}
                        {selectedData.includes('Narration') && <TableCell>{row.particularsData?.narration}</TableCell>}
                        {selectedData.includes('IroClosedOn') && <TableCell>{moment(row.iroClosedOn).format('DD/MM/YYYY')}</TableCell>}
                        {selectedData.includes('Source Of Account') && <TableCell>{row.sourceOfAccount}</TableCell>}
                        {selectedData.includes('Last Updated') && <TableCell>{moment(row.updatedAt).format('DD/MM/YYYY')}</TableCell>}
                        {/* <TableCell>{row.approvedBy  }</TableCell> */}

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Bottom Export Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  background: '#f0f0f0',
                  fontWeight: 'bold',
                  borderTop: '1px solid black',
                }}
              >
                <span>Total:</span>

                <span>
                  {`Requested amt : ₹${formatAmount(totalRequested.toFixed(2))}`}
                  <br />
                  {/* {requestedWords} */}
                </span>

                <span>
                  {`Sanctioned amt : ₹${formatAmount(totalSanctioned.toFixed(2))}`}
                  <br />
                  {/* {sanctionedWords} */}
                </span>
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveAlt />}
                  sx={{ backgroundColor: 'blue' }}
                >
          EXPORT
                </Button>
              </Box> */}
            </Box>


          </Grid>
        </Card>
        <Dialog open={openRemarks} fullWidth maxWidth="md">
          <DialogTitle>Remarks</DialogTitle>
          <DialogContent>
            {remarks.length > 0 ? remarks.map((remark) => (
              <MessageItem key={remark._id} sender={remark.createdBy?.basicDetails?.firstName + ' ' + remark.createdBy?.basicDetails?.lastName}
                time={remark.updatedAt} body={remark.remark} isSent={true} />
            )) : 'No Data Found '}
          </DialogContent>
          <DialogActions>
            <TextField
              id="remarkTextfield"
              placeholder="Remarks"
              multiline
              value={remark?.remark}
              onChange={(e) => setRemark((remark) => ({
                ...remark,
                IRO: selectedIROId ?? '',
                remark: e.target.value,
              }))}
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
                      } }
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth />
            <Button
              variant="contained"
              onClick={() => {
                toggleOpenRemarks(false);
                setSelectedIROId(null);
              } }
            >
              close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPrintIro} onClose={() => setOpenPrintIro(false)} maxWidth="xs" fullWidth>
          <DialogTitle> Print IRO Receipt </DialogTitle>
          <DialogContent>
            <Container>  Download the IRO for {iroData?.IROno} &nbsp;
              {iroData?.closedIroPdf && <a href="#" onClick={async () => {
                const file = (await FileUploaderServices.getFile(iroData?.closedIroPdf ?? '')).data;
                if (file.downloadURL) {
                  const link = document.createElement('a');
                  link.href = file.downloadURL;
                  link.download = file.filename; // You can specify a custom file name here
                  link.click();
                }
              } }>{`${iroData?.IROno}_Receipt.pdf`}</a>}</Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenPrintIro(false);
              } }
              variant="text"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAttachReceipt} onClose={() => setOpenAttachReceipt(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Are you sure</DialogTitle>
          <DialogContent>
            <Container>
              Do you want to attach receipt for {iroData?.IROno}?
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
              )}{' '}
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIroData(null);
                setOpenAttachReceipt(false);
              } }
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
                        {loading || printIroLoading ? 'Loading...' : 'Yes, Attach'}
                      </Button>
                    )}
                  </BlobProvider>

                </>
              )}
            </>
          </DialogActions>
        </Dialog>
        <Dialog open={openAttachReceipt1} onClose={() => setOpenAttachReceipt1(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Are you sure</DialogTitle>
          <DialogContent>
            <Container>
              Do you want to attach receipt for {iroData?.IROno}?
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
              )}{' '}
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIroData(null);
                setOpenAttachReceipt1(false);
              } }
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
                        prev={true}
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
                        {loading || printIroLoading ? 'Loading...' : 'Yes, Attach'}
                      </Button>
                    )}
                  </BlobProvider>
                </>
              )}
            </>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>Select Data to Show:</DialogTitle>
          <DialogContent>
            <Autocomplete
              multiple
              options={['All', ...originalOrder]} // Ensuring correct order
              value={selectedData}
              onChange={(event, newValue) => {
                if (newValue.includes('All')) {
                  // Select all options except "All" itself
                  setSelectedData(originalOrder);
                } else {
                  // Maintain original order while filtering selected values
                  const sortedSelection = originalOrder.filter((item) => newValue.includes(item));
                  setSelectedData(sortedSelection);
                }
              }}
              renderInput={(params) => <TextField {...params} placeholder="Search..." />}
            />
            <Box mt={2}>
              <strong>Selected Data</strong>
              <Button onClick={() => setSelectedData([])} sx={{ float: 'right' }}>
      Clear All
              </Button>
              <Box mt={1} sx={{ border: '1px solid gray', padding: 1 }}>
                {selectedData.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={() =>
                      setSelectedData((prev) => prev.filter((i) => i !== item))
                    }
                    sx={{ margin: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
      Continue →
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
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
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
          getFiles={attachments} />
        <ReleaseAmount action={'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
        <Dialog open={print} onClose={() => setPrint(false)} maxWidth="xs" fullWidth>
          <DialogTitle> Print Fr</DialogTitle>
          <DialogContent>
            <Container>
  Downloading Custom report fr
              <br />

              {selectedData.length === 7 ? (
                <BlobProvider
                  document={
                    <PDFTemplateCustomFR
                      rowData={data as any}
                      headers={selectedData}
                    />
                  }
                >
                  {({ loading, url }) =>
                    loading ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="CustomReport.pdf"
                        style={{ color: 'blue' }}
                      >
            CustomReport.pdf
                      </a>
                    )
                  }
                </BlobProvider>
              ) : (
                <BlobProvider
                  document={
                    <PDFTemplateCustomFRAll
                      rowData={data as any}
                      headers={selectedData}
                    />
                  }
                >
                  {({ loading, url }) =>
                    loading ? (
                      <span style={{ color: 'blue' }}>....</span>
                    ) : (
                      <a
                        href={url ?? ''}
                        download="CustomReport.pdf"
                        style={{ color: 'blue' }}
                      >
            CustomReport.pdf
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
                setPrint(false);
              }}
              variant="text"
            >
                  Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </CommonPageLayout> }

    </>
  );
};

export default CustomReportFRFilterPage;

