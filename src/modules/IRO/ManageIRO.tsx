/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Alert, Typography, Divider, Box, Container, Tooltip, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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
} from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import { PDFDownloadLink } from '@react-pdf/renderer';
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

const ManageIRO = (props: { action: 'manage' | 'release' }) => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [statusFilter, setStatusFilter] = useState([IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE]); // default WFA: Waiting for access or Reverted

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
  const [notFound, setNotFound] = useState(false);
  const user = useAuth();
  const [searchText, setSearchText] = useState('');
  const [mngrName, setMngrName] = useState('');
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
  console.log(props.action, 'selectedIROId');

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
      if (userPermissions?.FCRA_ACCOUNTS_ACCESS) {
        IROServices.getAll({ dateRange: dateRange, status: statusFilter ?? '', sourceOfAccount: 'FCRA' })
          .then((res) => {
            // console.log(res.data, 'KKK');
            setNotFound(true);
            setIROrder(() => [...res.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (userPermissions?.LOCAL_ACCOUNT_ACCESS) {
        IROServices.getAll({ dateRange: dateRange, status: statusFilter, sourceOfAccount: 'Local' })
          .then((res) => {
            // console.log(res?.data, 'KKK');;
            setNotFound(true);

            setIROrder(() => [...res.data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // if (userPermissions?.OTHER_ACCOUNTS_ACCESS) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank' })
      //     .then((res) => {
      //       console.log(res.data, 'UIOP');
      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_1) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 1' })
      //     .then((res) => {
      //       console.log(res.data, 'UIOP');

      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_2) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 2' })
      //     .then((res) => {
      //       console.log(res.data, 'UIOP');

      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_3) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 3' })
      //     .then((res) => {
      //       console.log(res.data, 'UIOP');

      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      // if (userPermissions?.OTHER_ACCOUNTS_ACCESS_4) {
      //   IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE, sanctionedBank: 'Other Bank 4' })
      //     .then((res) => {
      //       console.log(res.data, 'UIOP');

      //       setIROrder(() => [...res.data]);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      if (userPermissions?.LOCAL_ACCOUNT_ACCESS && userPermissions?.FCRA_ACCOUNTS_ACCESS) {
        IROServices.getAll({ dateRange: dateRange, status: statusFilter }).then((res) => {
          setIROrder(res.data);
          setNotFound(true);
          // console.log(res.data, 'datgajdfj');
        });
      }
    } else {
      IROServices.getAll({ dateRange: dateRange, status: statusFilter }).then((res) => {
        setNotFound(true);
        setIROrder(res.data.filter((iro) => iro.IRODate.isSameOrAfter(dateRange.startDate) && iro.IRODate.isSameOrBefore(dateRange.endDate)));
      });
    }
  }, [openRelease, attachment, addSignature, dateRange, iroData, statusFilter]);
  // console.log(mngrName, 'mngrName');


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
      headerClassName: 'super-app-theme--cell',
      headerName: '',
      renderHeader: () => <b>Action</b>,
      width: 80,
      align: 'center',
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
              text: 'View Details ',
              // component: Link,
              // to: `/iro/${params.row._id}`,
              icon: PreviewIcon,
              onClick: () => {
                window.open( `/iro/${params.row._id}`, '_blank');
              },
            },
            {
              id: 'View',
              text: 'View Fr ',
              icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                window.open( `/fr/${(params.row as any).FR}/view`, '_blank');
              },

            },
            ...(props.action != 'manage' && (hasPermissions(['ACCOUNTS_MNGR_ACCESS']) || hasPermissions(['FCRA_ACCOUNTS_ACCESS']) || hasPermissions(['LOCAL_ACCOUNT_ACCESS']) ||hasPermissions(['ADMIN_ACCESS'])) ?
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
            ...(hasPermissions(['ADMIN_ACCESS']) && props.action =='manage' ?
              [
                {
                  id: 'edit',
                  text: 'Edit for admin',
                  component: Link,
                  // to: `/iro/${params.row._id}/edit`,
                  onClick: () => {
                    window.open(`/iro/${params.row._id}/edit`, '_blank');
                  },
                  icon: EditIcon,
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
                    FRServices.getById(params.row.FR?? '').then((res) => {
                      console.log(res.data, 'daa');
                      setFR(res.data);
                    });
                    setSelectedIROId(params.row._id);
                    setDeleteModel(true);
                    setIRO(params.row);
                    // deleteIRO(params.row._id);
                  },
                },
              ] :
              []),

            ...(params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE || (IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR && props.action == 'release') ?
              [
                {
                  id: 'Release',
                  text: 'Release Amount',
                  component: Link,
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([params.row])],
                  icon: CurrencyRupeeIcon,
                },
                // {
                //   id: 'Close IRO',
                //   text: 'Close IRO',
                //   icon: PreviewIcon,
                //   onClick: () => {
                //     setIroData(params.row);
                //     if (params?.row.FR) {
                //       FRServices.getById(params.row.FR).then((res) => {
                //         setFrData(res.data);
                //         console.log(res.data, 'fr');
                //       });
                //     }
                //     setPrintIroLoading(true);
                //     setTimeout(() => {
                //       setPrintIroLoading(false);
                //     }, 2000);
                //     // IROServices.close(params.row._id)
                //     //     .then((res) => {
                //     //       // if (IROrder) {
                //     //       // eslint-disable-next-line @typescript-eslint/naming-convention
                //     //       const filterIRO = IROrder?.filter((iro) => {
                //     //         return iro._id !== params.row._id;
                //     //       });
                //     //       setIROrder(filterIRO);
                //     //       // }

                //     //       enqueueSnackbar({
                //     //         message: res.message,
                //     //         variant: 'success',
                //     //       });
                //     //     })

                //     //     .catch((err) => {
                //     //       enqueueSnackbar({
                //     //         message: err.message,
                //     //         variant: 'error',
                //     //       });
                //     //     });
                //   },
                // },
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

            },
            ...(params.row.closedIroPdf ?
              [
                {
                  id: 'print',
                  text: 'Print IRO',
                  icon: PrintIcon,
                  onClick: () => {
                    setSelectedIRO(params.row);
                    setOpenPrintIro(true);
                  },
                },
              ] :
              []),
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedIROId(params.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
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
            ...(hasPermissions(['WRITE_IRO']) && params.row.status == IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Attachments',
                  text: 'Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setAttachment(true);
                    setFileUploaderAction('add');
                    setSelectedIRO(params.row);
                    if (params.row.workerSupport) {
                      setPdfProps({
                        purpose: params.row.purpose ?? 'Division',
                        divisionId: params.row.division?._id ?? null,
                        workerId:
                          params.row.purpose == 'Coordinator' && params.row.purposeCoordinator ?
                            params.row.purposeCoordinator?._id :
                            params.row.purpose == 'Worker' && params.row.purposeWorker?._id ?
                              params.row.purposeWorker?._id :
                              null,
                        subDivisionId: params.row.purposeSubdivision?._id ?? null,
                        designationParticularID: params.row.designationParticular ?? null,
                        IRONo: params.row.IROno,
                        month: params.row.particulars[0].month,
                        date: moment(params.row.releaseAmount?.transferredDate).format('DD/MM/YYYY'),
                      });
                      setSupportAttachment(true);
                    }
                  },
                },
              ] :
              [
                {
                  id: 'Attachments',
                  text: 'Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setViewFileUploader(true);
                    setSelectedIRO(params.row);
                  },
                },
              ]),
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
    {
      field: 'IROno',
      headerClassName: 'super-app-theme--cell',
      headerName: 'IRO No',
      width: 100,
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'IRODate',
      headerClassName: 'super-app-theme--cell',
      headerName: 'IRO Date',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Status</b>,
      width: 250,
      align: 'center',
      headerAlign: 'center',
      cellClassName: (params) => {
        const statusName = params.formattedValue;
        if (params.value == null) {
          return '';
        }
        switch (statusName) {
        case 'WAITING FOR APPROVAL':
          return clsx('yellow-light');
        case 'WAITING FOR ACCOUNTS MNGR':
          return clsx('yellow-dark');
        case 'IRO APPROVED':
          return clsx('orange-light');
        case 'WAITING FOR RELEASE AMOUNT':
          return clsx('orange-dark');
        case 'AMOUNT RELEASED':
          return clsx('green-light');
        case 'RECONCILIATION DONE':
          return clsx('green-medium');
        case 'IRO CLOSED':
          return clsx('green-dark');
        case 'IRO DISAPPROVED':
          return clsx('red-light');
        case 'IRO IN PROCESS':
          return clsx('dark-orange');
        default:
          // console.log('No class applied');
          return '';
        }
      },

      valueGetter: (params) => {
        let statusName = IROLifeCycleStates.getStatusNameByCodeTransaction(params.value);
        // Check if the status name needs to be changed
        console.log(statusName, 'sjhivi');
        switch (statusName) {
        case 'SEND_BACK':
          statusName = 'REVERTED';
          break;
        case 'FR_APPROVED':
          statusName = 'FR VERIFIED'; // Change to whatever new name you want
          break;
        case 'FR_REJECTED':
          statusName = 'IRO DISAPPROVED'; // Change to whatever new name you want
          break;
        case 'WAITING_FOR_OFFICE_MNGR':
          statusName = 'WAITING FOR APPROVAL'; // Change to whatever new name you want
          break;
        case 'WAITING_FOR_ACCOUNTS_STATE':
          statusName = 'IRO APPROVED'; // Change to whatever new name you want
          break;
        case 'IRO_IN_PROCESS':
          statusName = 'IRO IN PROCESS'; // Change to whatever new name you want
          break;
          // case 'WAITING_FOR_ACCOUNTS_MNGR':
          //   statusName = 'WAITING FOR ACCOUNTS MNGR';
          //   if (props.action === 'release') {
          //     statusName = 'WAITTING FOR RELEASE AMOUNT'; // Change to whatever new name you want
          //   }
          break;
          // Add more cases for other status names you want to change
        default:
          statusName = statusName.replaceAll('_', ' ');
          break;
        }
        return statusName;
      },
    },
    {
      field: 'divisionName',
      renderHeader: () => <b>Division Name</b>,
      headerClassName: 'super-app-theme--cell',
      valueGetter: (params) => params.row.division?.details.name,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Division Name</b>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,
      width: 160,
      align: 'center',
      headerAlign: 'center',
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
      field: 'requestAmount',
      headerClassName: 'super-app-theme--cell',
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
    //   field: 'updatedAt',
    //   headerName: 'Last Updated',
    //   headerClassName: 'super-app-theme--cell',
    //   width: 130,
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      headerClassName: 'super-app-theme--cell',
      width: 200,
      valueGetter: (params) => params.row.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? 'N/A',
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,

      align: 'center',
      headerAlign: 'center',
    },
    // { field: 'sanction', headerName: 'Special Sanction', width: 150, renderHeader: () => <b>Special Sanction</b>, align: 'center', headerAlign: 'center' },
    // {
    //   field: 'sanctionedAmount',
    //   headerClassName: 'super-app-theme--cell',
    //   headerName: 'Sanctioned Amount',
    //   width: 150,
    //   renderHeader: () => <b>Sanctioned Amount</b>,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'sanctionedAmount',
      headerClassName: 'super-app-theme--cell',
      headerName: 'Sanctioned Amount',
      width: 180,
      renderHeader: () => <b>Sanctioned Amount</b>,
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount;
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0);
        }
        return 0; // or return a suitable default value
      }, align: 'center',
      headerAlign: 'center',
    },

    // {
    //   field: 'sanctionedAsPer',
    //   headerClassName: 'super-app-theme--cell',
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
      field: 'sanctionedBank',
      headerClassName: 'super-app-theme--cell',
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
      headerClassName: 'super-app-theme--cell',
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

    {
      field: 'reasonForRejectIRO',
      headerClassName: 'super-app-theme--cell',
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
          {props.row.reasonForRejectIRO}
        </p>
      ),
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      headerClassName: 'super-app-theme--cell',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
  ];
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (IROrder ?? []).filter((row) => {
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
  // console.log(filteredRows, 'filteredRows');

  return (
    <CommonPageLayout
      title={props.action == 'manage' ? 'Manage IRO' : 'Release Amount'}
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
            <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }}>
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
                  />{props.action =='manage' && (

                    <Grid item sx={{ alignContent: 'start', display: 'flex', justifyContent: 'space-between' }} >
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="Filter"
                          value={statusFilter.includes(IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE)?'WFA':'ALL'}
                          onChange={(e) =>setStatusFilter(e.target.value==='WFA'?[IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE]:[])}
                          name="Filter"
                          row
                        >
                          <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
                          <FormControlLabel value="WFA" control={<Radio />} label="IRO APPROVED" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  )}
                  {hasPermissions(['MANAGE_IRO']) && props.action == 'release' ? (
                    <Button
                      variant="contained"
                      sx={{ float: 'right', mt: 2, mr: 2 }}
                      startIcon={<AttachMoneyIcon />}
                      disabled={releaseAmountIROs.length == 0}
                      onClick={() => {
                        if (releaseAmountIROs.every((iro) => iro.sanctionedBank == releaseAmountIROs[0].sanctionedBank)) {
                          setOpenRelease(true);
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
                      }} >
                      <DataGrid
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
                          setNewTest(releaseAmountIROs);
                        }}
                        getRowClassName={(params) => {
                          if (params.row.specialsanction == 'Yes') {
                            return 'special-sanction'; // Class for rows with special sanction
                          }
                          return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Default classes
                        }} style={{ height: '65vh', width: '100%' }}
                      // rowSelectionModel={selectedIROrelease}
                      //
                      />
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
                            setNotFound(true);
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
                // sx={{ ml: 'auto' }}
                >
                  Close
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
            <Dialog open={Boolean(openReleaseConform)} onClose={() => setOpenReleaseConform(false)}>
              <DialogTitle>Reminder</DialogTitle>
              <DialogContent>
                <Typography sx={{ color: 'red' }}>
         This {IROrder?.[0]?.IROno} is part of a bulk release, the following IROs will also be released along with it:<li></li></Typography>
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
                // types: [],
                maxItemSize: 6 * MB,
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
            {selectedIRO.signatureSheet ? <a href="#" onClick={async () => {
              const file = (await FileUploaderServices.getFile(selectedIRO?.signatureSheet ?? '')).data;
              if (file.downloadURL) {
                const link = document.createElement('a');
                link.href = file.downloadURL;
                link.download = 'WorkersSignatureSheet.pdf'; // You can specify a custom file name here
                link.click();
              }
            }}>WorkersSignatureSheet.pdf</a> : (pdfProps &&
              <>
                <PDFDownloadLink
                  document={<IROReconciliationPdf
                    data={pdfProps}
                  />}
                  fileName="WorkersSignatureSheet.pdf"
                  style={{ color: 'blue' }}
                >
                  {({ loading }) => loading ? '....' : 'WorkersSignatureSheet.pdf'}
                </PDFDownloadLink><br />
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
            {selectedIRO.closedIroPdf && <a href="#" onClick={async () => {
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
      <Dialog open={Boolean(iroData)} onClose={() => setIroData(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Container>
            {`Are you sure you want to close this IRO No ${iroData?.IROno} from ${iroData?.division?.details.name} related to FR No ${FrData?.FRno?? ''} ?`}
            <br />
            {iroData && mngrName && selectedSignature && FrData && (

              <PDFDownloadLink
                document={<IROTemplate rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident} />}
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
            }}
            variant="text"
          >
            Cancel
          </Button>
          <>
            {iroData && mngrName && selectedSignature && FrData && (

              <>
                <PDFDownloadLink document={<IROTemplate
                  rowData={iroData} mngrName={mngrName} officeMngrSign={selectedSignature} fr={FrData as FR} president={signaturePresident} />}
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
                    </Button>}
                </PDFDownloadLink>

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
        // isStopped={.state.isStopped}
        // isPaused={.state.isPaused}
        />}
    </CommonPageLayout>
  );
};

export default ManageIRO;
