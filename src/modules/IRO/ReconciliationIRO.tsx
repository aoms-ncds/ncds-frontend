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
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Grid, Box, Container, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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
import { PDFDownloadLink } from '@react-pdf/renderer';
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

const ReconciliationIRO = () => {
  const [reconciliationIRO, setReconcilationIRO] = useState<IROrder[]>();
  const user = useAuth();
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [openRelease, setOpenRelease] = useState(false);
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
    if ((row.IROno && row.IROno.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.IRODate && row.IRODate.format('DD/MM/YYYY').toLowerCase().includes(searchText.toLowerCase())) ||
      // (row.particulars[0]?.subCategory1 && row.particulars[0]?.subCategory1.toLowerCase().includes(searchText.toLowerCase())) ||
      // (row.particulars[0]?.subCategory2 && row.particulars[0]?.subCategory2.toLowerCase().includes(searchText.toLowerCase())) ||
      // (row.particulars[0]?.subCategory3 && row.particulars[0]?.subCategory3.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchText.toLowerCase()))
    ) {
      return true;
    }
    return Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase()));
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
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange, sourceOfAccount: 'FCRA' })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (permissions?.LOCAL_ACCOUNT_ACCESS && !permissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange, sourceOfAccount: 'Local' })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_1) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 1' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_2) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 2' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_3) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 3' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_4) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 4' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    if (permissions?.LOCAL_ACCOUNT_ACCESS && permissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getReconciliationOptimized({ ExStatus: exstatusFilter, status: statusFilter, dateRange: dateRange })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        });
    }
    // IROServices.getReconciliation()
    //   .then((res) => {
    //     setReconcilationIRO(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  }, [attachment, dateRange, selectedIRO, statusFilter, exstatusFilter]);

  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      minWidth: 20,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="Reconciliation action"
          primaryText="Actions"
          key={'Reconciliation action'}
          items={[
            // {
            //   id: 'View',
            //   text: 'Release Amount',
            //   component: Link,
            //   to: '/iro/release_amount/' + props.row._id,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'remarks',
            //   text: 'Remarks',
            //   icon: EditIcon,
            // },
            ...(props.row.status == IROLifeCycleStates.AMOUNT_RELEASED ? [
              {
                id: 'Reconciliation',
                text: 'Reconciliation',
                icon: EditIcon,
                onClick: () => {
                  setAttachment(true);
                  setSelectedIRO(props.row);
                },
              }] : []),
            {
              id: 'View',
              text: 'View Details ',
              // component: Link,
              // to: `/iro/${params.row._id}`,
              icon: PreviewIcon,
              onClick: () => {
                window.open( `/iro/${props.row._id}`, '_blank');
              },
            },
            {
              id: 'print',
              text: 'Print IRO',
              icon: PrintIcon,
              onClick: () => {
                IROServices.getByIdOptimized(props.row._id).then((res)=>{
                  setData(res.data[0]);
                });
                // setData(props.row);
                setOpenPrintFr(true);
                setTimeout(() => {
                  setOpenPrintFr(false);
                }, 2000);
              },
            },
            {
              id: 'print',
              text: 'Print FR',
              icon: PrintIcon,
              onClick: () => {
                if (!props.row.FR) {
                  enqueueSnackbar({
                    message: 'FR not found',
                    variant: 'warning',
                  });
                } else {
                  IROServices.getByIdOptimized(props.row._id).then((res)=>{
                    console.log(res.data, 'res98');
                    setData2(res.data[0]);
                    // console.log(props.row.fr, 'res98');
                  });
                  setOpenPrintFr(true);
                  setTimeout(() => {
                    setOpenPrintFr(false);
                  }, 2000);
                }
              },
            },
            ...(hasPermissions(['DELHI_DIVISION_ACCESS']) ?
              [
                {
                  id: 'print',
                  text: 'Print FR HQ DELHI',
                  icon: PrintIcon,
                  onClick: async () => {
                    const delhiHQ=(await DivisionsServices.getDivisionById('658270549efadc163550a28c')).data;
                    const dataDiv= await (await IROServices.getByIdOptimized(props.row._id)).data;
                    // console.log(dataDiv.division?.details, 'res98');
                    props.row.division?.details&& setData5({ ...props.row,
                      division: {
                        ...props.row.division,
                        details: {
                          ...dataDiv[0].division?.details,
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
              id: 'View',
              text: 'View Fr ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(props.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(props.row as any).FR}/view`, '_blank');
              },

            },
            ...(props.row.status >= IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Release',
                  text: 'View Release Amount',
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([props.row])],
                  icon: PreviewIcon,
                },
              ] :
              []),

            // ...(props.row.status == IROLifeCycleStates.AMOUNT_RELEASED ? [
            //   {
            //     id: 'Reconciliation',
            //     text: 'Reconciliation',
            //     icon: EditIcon,
            //     onClick: () => {
            //       setAttachment(true);
            //       setSelectedIRO(props.row);
            //     },
            //   }] : []),

            {
              id: 'remarks',
              text: 'Remark',
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
            // {
            //   id: 'View',
            //   text: 'View Details ',
            //   component: Link,
            //   to: `/fr/${props.row._id}/view`,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'Reconciliation',
            //   text: 'Reconciliation',
            //   icon: EditIcon,
            // },
            // {
            //   id: 'Close IRO',
            //   text: 'Close IRO',
            //   icon: PreviewIcon,
            // },
            {
              id: 'Attachments',
              text: 'Attachments',
              icon: PrintIcon,
              onClick: () => {
                // console.log(props.row.particulars );
                // props.row.particulars.map((item)=>{
                setAttachments(props.row.billAttachment);
                // });
                console.log(attachments, 'setAttachments(item.attachment);');

                setViewFileUploader(true);
              },
            },
            {
              id: 'Close IRO',
              text: 'Close IRO',
              icon: PreviewIcon,
              onClick: () => {
                setIroData(props.row);
                setConform1(true);
                if (props?.row.FR) {
                  FRServices.getById((props.row as any).FR).then((res) => {
                    setFrData(res.data);
                    console.log(res.data, 'fr');
                  });
                }
                setPrintIroLoading(true);
                setTimeout(() => {
                  setPrintIroLoading(false);
                }, 2000);
                //   IROServices.close(props.row._id)
                //     .then((res) => {
                //       if (reconciliationIRO) {
                //         // eslint-disable-next-line @typescript-eslint/naming-convention
                //         const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
                //           return reconciliationIROs._id !== props.row._id;
                //         });
                //         setReconcilationIRO(filterIRO);
                //       }

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
              },
            },
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedIROId(props.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
            },
          ]}
        />
      ),
    },
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
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      valueGetter(params) {
        const IRORequest = params.row as IROrder;
        const particularAmount = IRORequest.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0);
        return particularAmount;
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
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,

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
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,

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
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0);
        }
        return 0; // or return a suitable default value
      }, renderHeader: () => (<b>Sanctioned Amount</b>), align: 'center', headerAlign: 'center' },
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
    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 150, renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center', headerAlign: 'center' },
    {
      field: 'released amount ', headerName: 'Amount Transferred ', width: 150, renderHeader: () => <b>Amount Transferred</b>, align: 'center', headerAlign: 'center',
      valueGetter: (params) => params.row.releaseAmount?.transferredAmount,
    },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      // renderCell: (props) => (
      //   <p
      //     style={{
      //       maxWidth: 205,
      //       whiteSpace: 'normal',
      //       wordBreak: 'break-word',
      //     }}
      //   >
      //     {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
      //   </p>
      // ),
      align: 'center',
      width: 250,
      headerAlign: 'center',
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
      },
    },
    {
      field: 'updatedAt', headerName: 'Last Updated', width: 130, renderHeader: () => (<b>Last Updated</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    },
  ];
  return (
    <CommonPageLayout title="For Reconciliation" momentFilter={

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
      <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }}>
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
                  sx={{ width: '40%' }}
                />
                {/* Count Box with Reset Button */}
                <Grid container justifyContent="flex-end">
                  <Grid
                    item
                    sx={{ alignContent: 'start', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="Filter"
                        value={
                          exstatusFilter.includes(69) ? 'NonBankTransfers' :'All'

                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === 'NonBankTransfers') {
                            setExStatusFilter([69]);
                          } else {
                            setExStatusFilter([]);
                            setStatusFilter([IROLifeCycleStates.AMOUNT_RELEASED]);
                          // setStatusFilter([]);
                          }
                        }}
                        name="Filter"
                        row
                      >
                        <FormControlLabel value="All" control={<Radio />} label="ALL" />
                        <FormControlLabel value="NonBankTransfers" control={<Radio />} label="NON BANK TRANSFERS" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        backgroundColor: '#f5f5f5',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
        New Bills Attached:
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                        sx={{ background: '#fff', px: 2, py: 1, borderRadius: '4px', boxShadow: 1 }}
                      >
                        {count}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={async () => await NotificationService.markAllAsReadForBill().then((res) => setCount(0))}
                      >
        Reset
                      </Button>
                    </Box>
                  </Grid>
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
              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '75vh', width: '100%' }} getRowClassName={(params) => {
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
              <PDFDownloadLink document={<FRReceiptTemplate rowData={data2 as FR} president={signaturePresident} />} fileName="FRReceipt.pdf" style={{ color: 'blue' }}>
                {({ loading }) => (loading || openPrintFr ? '....' : 'FRReceipt.pdf')}
              </PDFDownloadLink>
            )}{' '}
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
            {iroData && mngrName&&selectedSignature&&FrData&& (
              <PDFDownloadLink
                document={<IROTemplate prev={true} rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
                fileName={`${iroData?.IROno}_Receipt.pdf`} style={{ color: 'blue' }}>
                {({ loading }) => (loading || printIroLoading ? '....' : `${iroData?.IROno}_Receipt.pdf`)}
              </PDFDownloadLink>
            )}{' '}
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
                  Download the FR Receipt, Delhi for {data5?.FRno} <br />
            {data5 && (
              <PDFDownloadLink
                document={<FRReceiptTempForDelhiDivision label={Label} president={signaturePresident} rowData={data5 as unknown as FR} />}
                fileName="FRReceiptDelhi.pdf"
                style={{ color: 'blue' }}
              >
                {({ loading }) => (loading || openPrintFr ? '....' : 'FRReceiptDelhi.pdf')}
              </PDFDownloadLink>
            )}{' '}
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
              <PDFDownloadLink document={<IROTemplate rowData={data as FR} fr={data.FR} president={signaturePresident} officeMngrSign={selectedSignature} />} fileName="IROReceipt.pdf" style={{ color: 'blue' }}>
                {({ loading }) => (loading || openPrintFr ? '....' : 'IROReceipt.pdf')}
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
            {`Are you sure you want to close this IRO No ${iroData?.IROno} from ${iroData?.division?.details.name} related to FR No ${FrData?.FRno?? ''} ?`}
            <br />
            {iroData && mngrName&&selectedSignature&&FrData&& (
              <PDFDownloadLink
                document={<IROTemplate rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
                fileName={`${iroData?.IROno}_Receipt.pdf`} style={{ color: 'blue' }}>
                {({ loading }) => (loading || printIroLoading ? '....' : `${iroData?.IROno}_Receipt.pdf`)}
              </PDFDownloadLink>
            )}{' '}
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
                <PDFDownloadLink document={<IROTemplate
                  rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident}/>}
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
                      {loading || printIroLoading ? 'Loading...' : 'Yes, Close'}
                    </Button> }
                </PDFDownloadLink>

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

    </CommonPageLayout>
  );
};

export default ReconciliationIRO;
