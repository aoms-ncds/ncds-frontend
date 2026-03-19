/* eslint-disable max-len */
import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Box, Container, Tooltip, FormControl, FormControlLabel, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Checkbox, InputLabel, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Preview as PreviewIcon, Download as DownloadIcon } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { enqueueSnackbar } from 'notistack';
import MessageItem from '../../components/MessageItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FileUploader from '../../components/FileUploader/FileUploader';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import * as XLSX from 'xlsx';
import { MB } from '../../extras/CommonConfig';
import ESignatureService from '../Settings/extras/ESignatureService';
import moment from 'moment';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import IROTemplate from './components/IROTemplate';
import FRServices from '../FR/extras/FRServices';
import InfoIcon from '@mui/icons-material/Info';
import ReleaseAmount from './components/ReleaseAmountDialog';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import { hasPermissions } from '../User/components/PermissionChecks';
import formatAmount from '../Common/formatcode';

const RevertedIRO = () => {
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
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [iroData, setIroData] = useState<IROrder | null>(null);
  const [FrData, setFrData] = useState<FR | null>(null);
  const [printIroLoading, setPrintIroLoading] = useState(false);
  const [mngrName, setMngrName] = useState('');
  const [openPrintIro, setOpenPrintIro] = useState(false);
  const [openAttachReceipt, setOpenAttachReceipt] = useState(false);
  const [openRelease, setOpenRelease] = useState(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [statusFilter, setStatusFilter] = useState([IROLifeCycleStates.REVERTED_TO_DIVISION]); // default WFA: Waiting for access or Reverted
  const [exstatusFilter, setExStatusFilter] = useState<any>([]); // default WFA: Waiting for access or Reverted
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| null>('All'); // default WFA: Waiting for access or Reverted

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
      IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter })
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
  const filteredRows = (IROrder ?? []).filter((row) => {
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
              // to: `/iro/${props.row._id}`,
              onClick: () => {
                window.open(`/iro/${props.row._id}`, '_blank');
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
                window.open( `/fr/${(props.row as any).FR._id}/view`, '_blank');
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
                  FRServices.getById((props.row as any).FR?._id).then((res) => {
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
            {
              id: 'log',
              text: 'IRO Log',
              icon: PreviewIcon,
              onClick: () => {
                setSelectedIROId(props.row._id);
                setOpenLog(true);
              },
            },
          ]}
        />
      ),
    },
    {
      field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 130, align: 'center',
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
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'divisionName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
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
      valueGetter: (params) => params.row.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? 'N/A',
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
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
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0).toFixed(2);
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
      field: 'reasonForRejectIRO',
      //   headerClassName: 'super-app-theme--cell',
      headerName: 'Beneficiary Name',
      width: 200,
      renderHeader: () => <b>Reason For Reject</b>,
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
          {props.row.reasonForRejectIRO?? 'N/A'}
        </p>
      ),
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'updatedAt',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Last Updated</b>),
      width: 150,
      renderCell: (props) => (
        <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
      ),
    },
  ];
  useEffect(() => {
    IROServices.getAllOptimized({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter })
      .then((res) => {
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [dateRange, statusFilter, exstatusFilter]);
  useEffect(() => {
    IROServices.getAllOptimizedSuportEx({ Exstatus: exstatusFilter, dateRange: dateRange, status: statusFilter, support: statusFilter1 })
      .then((res) => {
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [dateRange, statusFilter, statusFilter1]);
  return (
    <CommonPageLayout status='REVERTED IRO' title="Reverted IRO" momentFilter={

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
      <Card sx={{ maxWidth: '78vw', height: '120vh', alignItems: 'center' }} >
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

          <Grid item xs={3}>
            <Button
              onClick={async () => {
                const sheet =
                  IROrder ?
                    IROrder.map((iro: IROrder) => ([
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
                    ])) :
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
                XLSX.writeFile(workbook, 'Closed_IRO_Report.xlsx', { compression: true });
              }}
              startIcon={<DownloadIcon />}
              color="primary" sx={{ float: 'right', mr: 2, mt: 2 }}
              variant="contained"
            >
              Export
            </Button>
          </Grid>
          <>
            {/* ===== STATUS FILTER ===== */}
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
                    setStatusFilter([IROLifeCycleStates.REVERTED_TO_DIVISION]);
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

            {/* ===== CATEGORY FILTER ===== */}
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
          </>
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

              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '75vh', width: '100%' }}
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
          // sx={{ ml: 'auto' }}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPrintIro} onClose={() => setOpenPrintIro(false)} maxWidth="xs" fullWidth>
        <DialogTitle> Print IRO Receipt </DialogTitle>
        <DialogContent>
          <Container>  Download the IRO for {iroData?.IROno} &nbsp;
            {iroData?.closedIroPdf&&<a href="#" onClick={async () => {
              const file = (await FileUploaderServices.getFile(iroData?.closedIroPdf ?? '')).data;
              if (file.downloadURL) {
                const link = document.createElement('a');
                link.href = file.downloadURL;
                link.download = file.filename; // You can specify a custom file name here
                link.click();
              }
            }}>{`${iroData?.IROno}_Receipt.pdf`}</a>}</Container>
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
      <Dialog open={ openAttachReceipt } onClose={() => setOpenAttachReceipt(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure</DialogTitle>
        <DialogContent>
          <Container>
  Do you want to attach receipt for {iroData?.IROno}?
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
              setIroData(null);
              setOpenAttachReceipt(false);
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
                      {loading || printIroLoading ? 'Loading...' : 'Yes, Attach'}
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

      />
      <ReleaseAmount action={'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={ releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />
      {selectedIROId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={selectedIROId}/>}

    </CommonPageLayout>
  );
};

export default RevertedIRO;
