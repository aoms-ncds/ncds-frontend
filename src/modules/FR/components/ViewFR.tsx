/* eslint-disable max-len */
import {
  Container,
  CardContent,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  Autocomplete,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  TableContainer,
  IconButton,
  InputAdornment,
  FormControl,
  DialogContent,
  Divider,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  // Checkbox,
  // FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { MouseEvent, SetStateAction, useEffect, useState } from 'react';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import moment from 'moment';
import FileUploader from '../../../components/FileUploader/FileUploader';
import SendIcon from '@mui/icons-material/Send';
import { MB } from '../../../extras/CommonConfig';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import FRReceiptTemplate from './FRReceiptTemplate';
import { monthNames, purposes } from '../extras/FRConfig';
import { AttachFile as AttachmentIcon, Edit as EditIcon, History as HistoryIcon } from '@mui/icons-material';
import MessageItem from '../../../components/MessageItem';
import { useNavigate } from 'react-router-dom';
import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';
import SanctionedAsPerService from '../../Settings/extras/SanctionedAsPerService';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import ESignatureService from '../../Settings/extras/ESignatureService';
import { useAuth } from '../../../hooks/Authentication';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import TransactionLogDialog from './TransactionLogDialog';
import PaymentMethodService from '../../Settings/extras/PaymentMethodService';
import SanctionLetter from './authLatter';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { IPaymentMethod } from '../../Settings/extras/LanguageTypes';
import formatAmount from '../../Common/formatcode';


const ViewFRRequests = (props: FormComponentProps<CreatableFR, { FRLoaded: boolean }>) => {
  const navigate = useNavigate();
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [paymnetMethods, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [data2, setData2] = useState<FR | null>(null);

  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showName, setShowName] = useState(false);
  const [Err, setErr] = useState(false);
  const [data, setData] = useState<FR | null>(null);
  const [loading, setLoading] = useState(false);
  const [openThePrintFr, setOpenThePrintFr] = useState(false);

  const [addSignature, toggleAddSignature] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [viewFileUploaderAppl, setViewFileUploaderAppl] = useState(false);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [rejectDialog, setrejectDialog] = useState(false);
  const [reasonForSentBack, setReasonForSentBack] = useState<string | null>('');
  const [reasonForReject, setReasonForReject] = useState<string | null>('');
  const [sanctionedAsPers, setSanctionedAsPers] = useState<AsPer[]>([]);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [attachmentsAppl, setAttachmentsAppl] = useState<FileObject[]>([]);
  // const [isFocused, setFocused] = useState(false);
  const totalRequestedAmount = props.value.particulars && props.value.particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const FRstatus = IROLifeCycleStates.getStatusNameByCodeTransaction(Number(props.value.status));
  const [showAddParticularDialog, setShowAddParticularDialog] = useState(false);
  console.log(totalRequestedAmount, 'totalRequestedAmount');

  const [newParticular, setNewParticular] = useState<CreatableParticular>({
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    month: '',
    narration: '',
    attachment: [],
    sanctionedAsPer: '',
    sanctionedAmount: null,

  });
  const [letterinput, setLetterinput] = useState<any>({
    presidentRemarks: '',
    Validity: '',
    presidentSanctionedAmount: '',

  });
  let newAmount;
  console.log(newAmount, 'newAmount');

  const [selectedParticularIndex, setSelectedParticularIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openPresident, setOpenPresident] = useState(false);
  const [authLetterinput, setAuthLetterinput] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [divisions, setDivisions] = useState<Division | null>(null);
  // console.log(props, 'newParticular');
  useEffect(() => {
    PaymentMethodService.getAll().then((res) => {
      setPaymentMethod(res.data);
    });
  }, []);
  const [openLog, setOpenLog] = useState(false);
  interface AsPer {
    asPer: [];

  }
  let total = 0;
  props.value?.particulars?.forEach((particular) => {
    if (particular?.sanctionedAmount) {
      total += Number(particular.sanctionedAmount);
    }
  });

  let total2: any = 0;
  props.value?.particulars?.forEach((particular) => {
    if (particular?.presidentSanctionAmt) {
      total2 += Number(particular?.presidentSanctionAmt);
    }
  });
  console.log(total2, 'total2');
  console.log(props.options?.FRLoaded, 'frload');

  const user = useAuth();
  const handleClickOpen = (particular: Particular, index: number) => {
    setNewParticular((prev: any) => ({
      ...prev,
      ...particular,
      sanctionedAmount: particular.sanctionedAmount ?? null,
      sanctionedAsPer: particular.sanctionedAsPer ?? null,
    }));
    setSelectedParticularIndex(index);
    setOpen(true);
    // setNewParticular(particular);
  };
  const handleClickOpenForPresident = (particular: Particular, index: number) => {
    setNewParticular((prev: any) => ({
      ...prev,
      ...particular,
      presidentSanctionAmt: null,
    }));
    setOpenPresident(true);
    setSelectedParticularIndex(index);
    // setNewParticular(particular);c
  };
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
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });


    const divisionId = user?.user && user.user.division ? user.user.division : null;
    console.log(props, 'divisionId');

    if (divisionId) {
      DivisionsServices.getDivisionById(divisionId?.toString()).then((res) => {
        setDivisions(res.data);
      });
    }
  }, []);
  const openDilog = () => {
    // e.preventDefault();
    setOpen2(true);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (props.value?.particulars?.every((item) => item.sanctionedAsPer != null) && props.value?.particulars?.every((item) => item.sanctionedAmount != null) && props.value.sanctionedBank != null && props.value.sourceOfAccount != null) {
      if (props.onSubmit) {
        {
          const approvalSnack = enqueueSnackbar({ message: 'Approving FR', variant: 'info' });
          if (props.onSubmit) {
            const updatedValue = { ...props.value, status: FRLifeCycleStates.FR_APPROVED }; // Create a new object with updated status
            props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
          }
          setTimeout(() => {
            closeSnackbar(approvalSnack);
            const approvedSnack = enqueueSnackbar({ message: 'Verified!', variant: 'success' });
            setTimeout(() => closeSnackbar(approvedSnack), 500);
          }, 500);
        }
      } // Invoke props.onSubmit with the value as the argument
      navigate('/fr/manage');
    } else {
      setTimeout(() => {
        setErr(false);
      }, 5000);
      setErr(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
  };
  let asPer: any = [];
  useEffect(() => {
    const ddata = SanctionedAsPerService.getAll().then((res) => {
      asPer = res.data.map((e: AsPer) => e.asPer); setSanctionedAsPers(asPer);
      console.log(asPer);
    });
  }, []);

  const sentBack = (() => {
    setReasonDialog(true);
    console.log('fdfd');
    const rejectionSnack = enqueueSnackbar({ message: 'Sending Back FR', variant: 'info' });
    if (props.onSubmit) {
      const updatedValue = { ...props.value, status: FRLifeCycleStates.FR_SEND_BACK, reasonForSentBack: reasonForSentBack ?? '' };
      // Create a new object with updated status
      props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
    }
    console.log(props, 'PPPOP');

    setTimeout(() => {
      closeSnackbar(rejectionSnack);
      const rejectedSnack = enqueueSnackbar({ message: 'sendBack!', variant: 'success' });
      setTimeout(() => closeSnackbar(rejectedSnack), 500);
    }, 500);
    navigate('/fr/manage');
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReasonForSentBack(e.target.value);
  };
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   // Prevent changing the value when the up or down arrow key is pressed
  //   if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   }
  // };

  const editParticular = (particular: Particular, index: number) => {
    // setParticularDialog('edit');
    setSelectedParticularIndex(index);
    setShowAddParticularDialog(true);
    setNewParticular(particular);
  };
  return (
    <div>
      <Container>
        <CardContent>
          <form
            onSubmit={handleClick}
          >

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="FR No"
                  value={props.value?.FRno}
                  fullWidth

                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date"
                  value={props.value.FRdate || moment()}
                  onChange={(newDate) =>
                    props.onChange({
                      ...props.value,
                      FRdate: newDate ?? undefined,
                    })
                  }
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { fullWidth: true } }}
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={props.value.purpose || ''}
                  options={purposes ?? []}
                  getOptionLabel={(requisition) => requisition ?? ''}
                  onChange={(_e, selectedPurpose) => {
                    if (selectedPurpose && props.action !== 'view') {
                      props.onChange({
                        ...props.value,
                        purpose: selectedPurpose as FRPurpose,
                      });
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Requisition For" />}
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
                />
              </Grid>
              {props.value.purpose === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={props.value.purposeWorker}
                      options={[]}
                      getOptionLabel={(worker) => `${worker.basicDetails.firstName} ${worker.basicDetails.middleName ?? ''} ${worker.basicDetails.lastName}`}
                      onChange={(_e, selectedWorker) => {
                        if (selectedWorker && props.action !== 'view') {
                          props.onChange({
                            ...props.value,
                            purposeWorker: selectedWorker,
                          });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Choose Worker" />}
                      fullWidth
                    // disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Worker Code"
                      value={props.value.purposeWorker?.kind === 'staff' ? (props.value.purposeWorker as Staff | undefined)?.staffCode : (props.value.purposeWorker as unknown as IWorker)?.workerCode}
                      fullWidth
                      disabled
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#000', // text color
                          color: '#000',
                          opacity: 1,
                        },
                        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#c4c4c4', // normal border color
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: 'rgba(0,0,0,0.6)',
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>


                </>
              ) : null}
              {props.value.purpose === 'Subdivision' ? (
                <><Grid item xs={12} md={6}>
                  <Autocomplete
                    options={[]}
                    value={props.value.purposeSubdivision}
                    getOptionLabel={(subDiv) => subDiv?.name}
                    onChange={(event, newVal) => props.onChange({ ...props.value, purposeSubdivision: newVal ?? undefined })}
                    renderInput={(params) => <TextField {...params} label="Subdivision" />}
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}

                  />
                </Grid><Grid item xs={12} md={6}>
                  <TextField
                    label="Division"
                    value={props.value?.division?.details?.name}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }} />
                </Grid></>
              ) : null}
              {props.value.purpose === 'Division' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={props.value.division}
                    options={[]}
                    getOptionLabel={(division) => division.details?.name}
                    onChange={(e, selectedDivision) => {
                      if (selectedDivision && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          division: selectedDivision,
                        });
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Division" />}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Coordinator' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={props.value.purposeCoordinator}
                    options={[]}
                    getOptionLabel={(coordinator) => coordinator.basicDetails.firstName + ' ' + coordinator.basicDetails.lastName}
                    onChange={(e, selectedCoordinator) => {
                      if (selectedCoordinator && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          purposeCoordinator: selectedCoordinator,
                        });
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Coordinator" />}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Others' ? (
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Others"
                    value={props.value.purposeOthers}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        purposeOthers: e.target.value,
                      })
                    }
                    variant="outlined"
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Raised By (Only Applicable For Delhi Staff)"
                  value={props.value.raisedBy}
                  onChange={(e) =>
                    props.onChange({
                      ...props.value,
                      raisedBy: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}

                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
                />
              </Grid>


              <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>

                        <TableCell ></TableCell>
                        <TableCell align="center">S.No</TableCell>
                        <TableCell align="center"> Category</TableCell>
                        <TableCell align="center">Narration</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">For the Month of</TableCell>
                        <TableCell align="center">Requested Amount</TableCell>
                        <TableCell align="center">Sanctioned Amount</TableCell>
                        <TableCell align="center"> Sanction As per</TableCell>
                        <TableCell align="center"> Application Reference No</TableCell>
                        {props.value.particulars?.some((e) => e.presidentSanctionAmt) && (
                          <TableCell align="center">Pres Approved Amt</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.value.particulars &&
                        props.value.particulars.map((item, index) => (
                          <TableRow key={item._id} >
                            <TableCell component="th" sx={{ display: 'flex' }}>
                              {props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS && (<PermissionChecks
                                permissions={['MANAGE_FR']}
                                granted={
                                  <><IconButton>
                                    <EditIcon onClick={() => editParticular(item, index)} />
                                  </IconButton>
                                  <Tooltip title="Add Sanction as per">
                                    <IconButton>
                                      <AddIcon onClick={() => handleClickOpen(item, index)} />
                                    </IconButton>
                                  </Tooltip>
                                  </>}
                              />
                              )}
                              {props.value.status == FRLifeCycleStates.WAITING_FOR_PRESIDENT && hasPermissions(['PRESIDENT_ACCESS']) && (

                                <Tooltip title="Add President sanction amount">
                                  <IconButton>
                                    <AddIcon onClick={() => handleClickOpenForPresident(item, index)} />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <IconButton onClick={() => {
                                setViewFileUploader(true);
                                setAttachments(item.attachment);
                              }}>
                                <AttachmentIcon />
                              </IconButton>
                              {item.applicationAttachment && (

                                <IconButton
                                  onClick={() => {
                                    setViewFileUploaderAppl(true);
                                    setAttachmentsAppl(item.applicationAttachment?? []);
                                  }}
                                >
                                  <ReceiptIcon />
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center"> {`${item.mainCategory == 'Select' ? '' : item.mainCategory} 
                            > ${item.subCategory1 == 'Select' ? '' : item.subCategory1} > 
                            ${item.subCategory2 == 'Select' ? '' : item.subCategory2} > ${item.subCategory3 == 'Select' ? '' : item.subCategory3}`}</TableCell>
                            <TableCell align="center">{item.narration}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.month}</TableCell>
                            <TableCell align="center">{ formatAmount(item.requestedAmount?.toFixed(2))}</TableCell>
                            <TableCell align="center">
                              {item.sanctionedAmount !== undefined && item.sanctionedAmount !== null ?
                                Number(item.sanctionedAmount).toFixed(2) :
                                ''}
                            </TableCell>                            <TableCell align="center">{item.sanctionedAsPer}</TableCell>
                            <TableCell align="center">{item.applicationReferenceNo}</TableCell>
                            {item.presidentSanctionAmt && <TableCell align="center">{item.presidentSanctionAmt}</TableCell>}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>


              <Grid item xs={12} md={6}>
                <TextField
                  label="Requested Amount"
                  InputLabelProps={{ shrink: true }}
                  value={ formatAmount(totalRequestedAmount?.toFixed(2))}
                  // onChange={(e) =>
                  //   // eslint-disable-next-line @typescript-eslint/naming-convention

                  // }
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
                />
              </Grid>
              {props.action === 'view' && props.value.status && (props.value.status >= FRLifeCycleStates.WAITING_FOR_ACCOUNTS || props.value.status == FRLifeCycleStates.FR_CLOSED) ? (
                <>
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label="Sanctioned Amount"
                      type={'number'}
                      value={
                        props.value?.sanctionedAmount ??
                        (total && !isNaN(Number(total)) ? Number(total).toFixed(2) : '')
                      }
                      required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                      autoComplete='off'
                      disabled
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#000', // text color
                          color: '#000',
                          opacity: 1,
                        },
                        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#c4c4c4', // normal border color
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: 'rgba(0,0,0,0.6)',
                        },
                      }}
                      onChange={(e) => {
                        if (totalRequestedAmount) {
                          props.onChange({
                            ...props.value,
                            sanctionedAmount: Number(e.target.value),
                          });
                        }
                      }
                      }
                      // onFocus={() => setFocused(true)}
                      // onBlur={() => setFocused(false)}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    // inputProps={{
                    //   max: totalRequestedAmount, min: 0,
                    //   onWheel: handleWheel,
                    // }}
                    // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                    />
                    {/* </Tooltip> */}
                  </Grid>


                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}>
                      <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                      <Select
                        labelId="sanctioned_bank"
                        label="Sanctioned Bank"
                        value={props.value.sanctionedBank || ''}
                        disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}

                        required
                        onChange={(e) =>
                          props.onChange({
                            ...props.value,
                            sanctionedBank: e.target.value,
                          })
                        }

                      >
                        <MenuItem value={props.value.sanctionedBank}>{props.value.sanctionedBank}</MenuItem>
                        {props.value.division?.DivisionBankFCRA?.bankName != '' || props.value.division?.FCRABankDetails?.bankName != '' ? (
                          <MenuItem value={`FCRA-${props.value.division?.DivisionBankFCRA?.beneficiary || props.value.division?.FCRABankDetails?.beneficiary}`}>
                            Division Bank FCRA - {props.value.division?.DivisionBankFCRA?.beneficiary || props.value.division?.FCRABankDetails?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.DivisionBankLocal?.bankName || props.value.division?.localBankDetails?.bankName ? (
                          <MenuItem value={`Local Bank-${props.value.division?.DivisionBankLocal?.beneficiary || props.value.division?.localBankDetails?.beneficiary}`}>
                            Division Bank Local - {props.value.division?.DivisionBankLocal?.beneficiary || props.value.division?.localBankDetails?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank1?.bankName || props.value.division?.otherBankDetails?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 1-${props.value.division?.BeneficiaryBank1?.beneficiary || props.value.division?.otherBankDetails?.beneficiary}`}>
                            Beneficiary Bank 1 - {props.value.division?.BeneficiaryBank1?.beneficiary || props.value.division?.otherBankDetails?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank2?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 2-${props.value.division?.BeneficiaryBank2?.beneficiary}`}>
                            Beneficiary Bank 2 - {props.value.division?.BeneficiaryBank2?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank3?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 3-${props.value.division?.BeneficiaryBank3?.beneficiary}`}>
                            Beneficiary Bank 3 - {props.value.division?.BeneficiaryBank3?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank4?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 4-${props.value.division?.BeneficiaryBank4?.beneficiary}`}>
                            Beneficiary Bank 4 - {props.value.division?.BeneficiaryBank4?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank5?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 5-${props.value.division?.BeneficiaryBank5?.beneficiary}`}>
                            Beneficiary Bank 5 - {props.value.division?.BeneficiaryBank5?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank6?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 6-${props.value.division?.BeneficiaryBank6?.beneficiary}`}>
                            Beneficiary Bank 6 - {props.value.division?.BeneficiaryBank6?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank7?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 7-${props.value.division?.BeneficiaryBank7?.beneficiary}`}>
                            Beneficiary Bank 7 - {props.value.division?.BeneficiaryBank7?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank8?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 8-${props.value.division?.BeneficiaryBank8?.beneficiary}`}>
                            Beneficiary Bank 8 - {props.value.division?.BeneficiaryBank8?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank9?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 9-${props.value.division?.BeneficiaryBank9?.beneficiary}`}>
                            Beneficiary Bank 9 - {props.value.division?.BeneficiaryBank9?.beneficiary}
                          </MenuItem>
                        ) : ''}

                        {props.value.division?.BeneficiaryBank10?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 10-${props.value.division?.BeneficiaryBank10?.beneficiary}`}>
                            Beneficiary Bank 10 - {props.value.division?.BeneficiaryBank10?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank10?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 11-${props.value.division?.BeneficiaryBank11?.beneficiary}`}>
                            Beneficiary Bank 11 - {props.value.division?.BeneficiaryBank11?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank12?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 12-${props.value.division?.BeneficiaryBank12?.beneficiary}`}>
                            Beneficiary Bank 12 - {props.value.division?.BeneficiaryBank12?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank13?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 13-${props.value.division?.BeneficiaryBank13?.beneficiary}`}>
                            Beneficiary Bank 13 - {props.value.division?.BeneficiaryBank13?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank14?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 14-${props.value.division?.BeneficiaryBank14?.beneficiary}`}>
                            Beneficiary Bank 14 - {props.value.division?.BeneficiaryBank14?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank15?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 15-${props.value.division?.BeneficiaryBank15?.beneficiary}`}>
                            Beneficiary Bank 15 - {props.value.division?.BeneficiaryBank15?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank16?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 16-${props.value.division?.BeneficiaryBank16?.beneficiary}`}>
                            Beneficiary Bank 16 - {props.value.division?.BeneficiaryBank16?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank17?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 17-${props.value.division?.BeneficiaryBank17?.beneficiary}`}>
                            Beneficiary Bank 17 - {props.value.division?.BeneficiaryBank17?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank18?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 18-${props.value.division?.BeneficiaryBank18?.beneficiary}`}>
                            Beneficiary Bank 18- {props.value.division?.BeneficiaryBank18?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank19?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 19-${props.value.division?.BeneficiaryBank19?.beneficiary}`}>
                            Beneficiary Bank 19 - {props.value.division?.BeneficiaryBank19?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {props.value.division?.BeneficiaryBank20?.bankName ? (
                          <MenuItem value={`Beneficiary Bank 20-${props.value.division?.BeneficiaryBank20?.beneficiary}`}>
                            Beneficiary Bank 20 - {props.value.division?.BeneficiaryBank20?.beneficiary}
                          </MenuItem>
                        ) : ''}
                        {paymnetMethods.map((e) => (
                          <MenuItem key={e._id} value={e.paymentMethod}>{e.paymentMethod}</MenuItem>
                        ))}


                        {/* <MenuItem value={'Beneficiary Bank 3'}>Beneficiary Bank 3 - {divisions?.BeneficiaryBank3?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 4'}>Beneficiary Bank 4 - {divisions?.BeneficiaryBank4?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 5'}>Beneficiary Bank 5 - {divisions?.BeneficiaryBank5?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 6'}>Beneficiary Bank 6 - {divisions?.BeneficiaryBank6?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 7'}>Beneficiary Bank 7 - {divisions?.BeneficiaryBank7?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 8'}>Beneficiary Bank 8 - {divisions?.BeneficiaryBank8?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 9'}>Beneficiary Bank 9 - {divisions?.BeneficiaryBank9?.beneficiary}</MenuItem>
                        <MenuItem value={'Beneficiary Bank 10'}>Beneficiary Bank 10 - {divisions?.BeneficiaryBank10?.beneficiary}</MenuItem> */}

                        {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}>
                      <InputLabel id="sourceOfAccount">Source Of Account</InputLabel>
                      <Select
                        labelId="sourceOfAccount"
                        label="Source Of Account"
                        required
                        value={props.value.sourceOfAccount || ''}
                        disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                        onChange={(e) =>
                          props.onChange({
                            ...props.value,
                            sourceOfAccount: e.target.value,
                          })
                        }

                      >
                        <MenuItem value={'FCRA'}>FCRA</MenuItem>
                        <MenuItem value={'Local'}>Local</MenuItem>


                        {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <Autocomplete<ISanctionedAsPer>
                      value={props.value.sanctionedAsPer as ISanctionedAsPer ?? undefined}
                      options={sanctionedAsPer ?? []}
                      getOptionLabel={(option) => option.asPer ?? ''}
                      // getOptionLabel={(requisition) => requisition}
                      disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                      onChange={(_e, selectedSanction) => {
                        if (selectedSanction && props.action === 'view') {
                          props.onChange({
                            ...props.value,
                            sanctionedAsPer: selectedSanction as ISanctionedAsPer,
                          });
                        }
                      }}
                      renderInput={(params) => <TextField {...params}
                        label="Sanctioned As Per" required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS} />}
                      fullWidth

                    />
                  </Grid> */}
                </>
              ) : null}
              <Grid item xs={12}>
                {/* {props.action === 'edit' && ( */}
                {props.options?.FRLoaded &&
              <Button
                variant="contained"
                color="warning"
                style={{
                  textAlign: 'left', textDecoration: 'none',
                }}
                onClick={() => {
                  setLoading(true);
                  FRServices.getAllOptimizedById(props.value?._id).then((res) => {
                    console.log(res.data, 'daa989');
                    setData2(res.data);
                    setOpenThePrintFr(true);
                    setLoading(false);
                  });
                }}

              >

                {loading ? 'Loading...' : 'Print FR'}
              </Button>
                }
                &nbsp;
                {props.value.status === FRLifeCycleStates.WAITING_FOR_PRESIDENT && (
                  (hasPermissions(['PRESIDENT_ACCESS']) && props.value.status === FRLifeCycleStates.WAITING_FOR_PRESIDENT) ||
  props.value.specialsanction === 'Yes' ? (
                      <Button
                        variant="contained"
                        color="info"
                        style={{
                          textAlign: 'left',
                          textDecoration: 'none',
                        }}
                        onClick={() => {
                          setAuthLetterinput(true);
                          // FRServices.getAllOptimizedById(props.value?._id).then((res)=>{
                          //   console.log(res.data, 'daa98');
                          //   setData2(res.data);
                          // });
                        }}
                      >

                          Auth Letter input

                      </Button>
                    ) : null
                )}

                &nbsp;

                {props.value.specialsanction == 'Yes' && <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    textAlign: 'left', textDecoration: 'none',
                  }}
                  onClick={() => {
                    FRServices.getAllOptimizedById(props.value?._id).then((res) => {
                      console.log(res.data, 'daa98');
                      setData(res.data);
                    });
                    // setOpenPrintFr(true);
                    // setTimeout(() => {
                    //   setOpenPrintFr(false);
                    // }, 2000);
                  }}

                >
                  Auth Letter print
                </Button>}
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                {props.value.reasonForReject && (
                  <><span style={{ fontWeight: 'bold', color: 'red' }}> Rejection reason: </span><span style={{ color: 'red' }}>{props.value.reasonForReject ?? 'N/A'}</span></>

                )}

                {/* )} */}
                &nbsp;
                <div style={{ float: 'right' }}>
                  <Button variant="outlined" color="primary" startIcon={<HistoryIcon />}
                    onClick={async () => setOpenLog(true)}>
                    Log
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      toggleOpenRemarks(true);
                      FRServices.getAllRemarksById(props.value._id ?? '')
                        .then((res) => setRemarks(res.data ?? []))
                        .catch((error) => {
                          enqueueSnackbar({
                            variant: 'error',
                            message: error.message,
                          });
                        });
                    }}
                  >
                    Remark
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      openDilog();
                    }}
                  >
                    Add Extra sign
                  </Button>
                  &nbsp;
                  {props.action === 'view' && (FRstatus != 'FR_APPROVED' && FRstatus != 'FR_REJECTED' && FRstatus != 'REOPENED' && props.value.status !== FRLifeCycleStates.FR_SEND_BACK) ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
                      &nbsp;
                      <PermissionChecks
                        permissions={['MANAGE_FR']}
                        granted={(
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              setReasonDialog(true);
                            }}

                          >
                            Revert
                          </Button>
                        )}
                      />
                      <Dialog open={reasonDialog} fullWidth maxWidth="md">
                        <DialogTitle>Reason</DialogTitle>
                        <DialogContent>
                          <br />
                          {/* <Autocomplete<string>
                            options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
                            value={reasonForSentBack}
                            onChange={(e, selectedReason) => {
                              setReasonForSentBack(selectedReason);
                            }}
                            renderInput={(params) => <TextField {...params} label="Reason for Deactivation" required />}
                            fullWidth
                          /> */}
                          <TextField
                            id="reasonForSentBack"
                            placeholder="Reason"
                            multiline
                            value={reasonForSentBack}
                            onChange={handleChange}
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setReasonDialog(false);
                              false;
                            }}
                            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
                          >
                            <CloseIcon sx={{ color: 'white' }} />
                          </Button>

                          <Button
                            variant="contained"
                            onClick={() => {
                              if (reasonForSentBack) {
                                // deactivateSpouse(iroID, reasonForDeactivation);
                                sentBack();
                              }
                              setReasonDialog(false);
                            }}
                            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
                          >
                            submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={rejectDialog} fullWidth maxWidth="md">
                        <DialogTitle>Reject Reason</DialogTitle>
                        <DialogContent>
                          <br />
                          {/* <Autocomplete<string>
                            options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
                            value={reasonForSentBack}
                            onChange={(e, selectedReason) => {
                              setReasonForSentBack(selectedReason);
                            }}
                            renderInput={(params) => <TextField {...params} label="Reason for Deactivation" required />}
                            fullWidth
                          /> */}
                          <TextField
                            id="reasonForReject"
                            placeholder="Reason for rejection"
                            multiline
                            value={reasonForReject}
                            onChange={(e) => setReasonForReject(e.target?.value)}
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setrejectDialog(false);
                              false;
                            }}
                            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
                          >
                            <CloseIcon sx={{ color: 'white' }} />
                          </Button>

                          <Button
                            variant="contained"
                            disabled={reasonForReject == ''}

                            onClick={() => {
                              const rejectionSnack = enqueueSnackbar({ message: 'Rejecting FR', variant: 'info' });
                              if (props.onSubmit) {
                                const updatedValue = { ...props.value, status: FRLifeCycleStates.REJECTED, reasonForReject: reasonForReject }; // Create a new object with updated status
                                props.onSubmit(updatedValue as CreatableFR); // Invoke props.onSubmit with the updated value as the argument
                              }
                              setTimeout(() => {
                                closeSnackbar(rejectionSnack);
                                const rejectedSnack = enqueueSnackbar({ message: 'Disapproved!', variant: 'success' });
                                setTimeout(() => closeSnackbar(rejectedSnack), 500);
                              }, 500);
                              navigate('/fr/manage');
                              setrejectDialog(false);
                            }}
                            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
                          >
                            submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      &nbsp;
                    </>
                  ) : null}
                  {
                    props.action === 'view' && FRstatus == 'WAITING_FOR_ACCOUNTS' ? (
                      <>
                        {/* Only display buttons if props.action is 'view' */}
                        &nbsp;
                        <PermissionChecks
                          permissions={['MANAGE_FR']}
                          granted={(
                            <>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  setrejectDialog(true);
                                }}
                              >
                                Disapprove
                              </Button>
                              &nbsp;<Button
                                variant="contained"
                                color="success"
                                // type='submit'
                                onClick={(e) => {
                                  // openDilog();
                                  handleClick(e);
                                }}
                              >

                                Verify
                              </Button>
                            </>
                          )}
                        />


                        &nbsp;
                      </>
                    ) : null}

                  {/* {props.action === 'view' && FRstatus!='WAITING_FOR_PRESIDENT' &&FRstatus!='WAITING_FOR_ACCOUNTS' && FRstatus!='FR_APPROVED' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' *
                      <PermissionChecks
                        permissions={['WRITE_FR']}
                        granted={
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              const processingSnack = enqueueSnackbar({ message: 'Submitting FR to president', variant: 'info' });
                              if (props.onSubmit) {
                                const updatedValue = { ...props.value, status: FRLifeCycleStates.WAITING_FOR_PRESIDENT }; // Create a new object with updated status
                                props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                              }

                              setTimeout(() => {
                                closeSnackbar(processingSnack);
                                const processedSnack = enqueueSnackbar({ message: 'Submitted FR to president!', variant: 'success' });
                                setTimeout(() => closeSnackbar(processedSnack), 500);
                              }, 500);
                              navigate('/fr/manage');
                            }}
                          >
                        Submit to President
                          </Button>
                        }
                      />

                    </>
                  ) : null} */}
                  &nbsp;
                  {props.action === 'view' && FRstatus === 'WAITING_FOR_PRESIDENT' ? (
                    <PermissionChecks
                      permissions={['PRESIDENT_ACCESS']}
                      granted={
                        <>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setrejectDialog(true);
                              // const rejectionSnack = enqueueSnackbar({ message: 'Rejecting FR', variant: 'info' });
                              // if (props.onSubmit) {
                              //   const updatedValue = { ...props.value, status: FRLifeCycleStates.REJECTED }; // Create a new object with updated status
                              //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                              // }
                              // setTimeout(() => {
                              //   closeSnackbar(rejectionSnack);
                              //   const rejectedSnack = enqueueSnackbar({ message: 'Disapproved!', variant: 'success' });
                              //   setTimeout(() => closeSnackbar(rejectedSnack), 500);
                              // }, 500);
                              // navigate('/fr/Approve');
                            }}
                          >
                            Disapprove
                          </Button>
                          &nbsp;<Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              if (props.value.sanctionedAsPer == null) {
                                setErr(true);
                              } else {
                                const processingSnack = enqueueSnackbar({ message: 'Submitting FR To Accounts', variant: 'info' });
                                if (props.onSubmit) {
                                  const updatedValue = { ...props.value, status: FRLifeCycleStates.WAITING_FOR_ACCOUNTS };
                                  props.onSubmit(updatedValue);
                                }

                                setTimeout(() => {
                                  closeSnackbar(processingSnack);
                                  const processedSnack = enqueueSnackbar({ message: 'Submitted FR To Accounts!', variant: 'success' });
                                  setTimeout(() => closeSnackbar(processedSnack), 500);
                                }, 500);
                                navigate('/fr/Approve');
                              }
                            }
                            }
                          >
                            verify
                          </Button>

                        </>
                      }
                    />
                    //           ) : props.action === 'view' && FRstatus != 'WAITING_FOR_ACCOUNTS' && FRstatus!='FR_APPROVED' ? (
                    //             <PermissionChecks
                    //               permissions={['WRITE_FR']}
                    //               granted={
                    //                 <Button
                    //                   variant="contained"
                    //                   color="info"
                    //                   onClick={() => {
                    //                     const processingSnack = enqueueSnackbar({ message: 'Submitting FR To Accounts', variant: 'info' });
                    //                     if (props.onSubmit) {
                    //                       const updatedValue = { ...props.value, status: FRLifeCycleStates.WAITING_FOR_ACCOUNTS };
                    //                       props.onSubmit(updatedValue);
                    //                     }

                  //                     setTimeout(() => {
                  //                       closeSnackbar(processingSnack);
                  //                       const processedSnack = enqueueSnackbar({ message: 'Submitted FR To Accounts!', variant: 'success' });
                  //                       setTimeout(() => closeSnackbar(processedSnack), 500);
                  //                     }, 500);
                  //                     navigate('/fr/manage');
                  //                   }}
                  //                 >
                  // Submit
                  //                 </Button>
                  //               }
                  //             />
                  ) : null}


                </div>
              </Grid>

            </Grid>

          </form>
          <br />
          {Err && <Alert sx={{ width: '30vw' }} variant="filled" severity="error">
            Required fields must be fill   !
          </Alert>}

        </CardContent>
      </Container>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            // eslint-disable-next-line max-len
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
          )) : 'No Data Found '}
        </DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (remark.remark) {
              FRServices.addRemarks(remark)
                .then((res) => {
                  setRemarks((remarks) => [...remarks, res.data]);
                  setRemark((remark) => ({
                    ...remark,
                    remark: '',
                  }));
                  toggleOpenRemarks(false);
                  enqueueSnackbar(res.message, { variant: 'success' });
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
                  FR: props.value._id ?? '',
                  remark: e.target.value,
                }))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <br />
            <Button variant="contained" onClick={() => toggleOpenRemarks(false)} sx={{ ml: 'auto' }}>
              close
            </Button>
          </DialogActions>
        </form>
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
      <FileUploader
        title="Appl. Attachments"
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
        open={viewFileUploaderAppl}
        action='view'
        onClose={() => setViewFileUploaderAppl(false)}
        // getFiles={TestServices.getBills}
        getFiles={attachmentsAppl}
      // deleteFile={(fileId: string) => {
      //   setNewParticular((particularDetails) => ({
      //     ...particularDetails,
      //     attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
      //   }));
      //   return FileUploaderServices.deleteFile(fileId);
      // }}
      />
      <Dialog
        open={showAddParticularDialog}
        onClose={() => setShowAddParticularDialog(false)}
        PaperProps={{
          style: {
            width: '1000px',
          },
        }}
      >
        <DialogTitle>Add Particular</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAddParticularDialog(false);
            props.onChange({
              ...props.value,
              particulars: props.value.particulars?.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
            });
            // addParticulars();
          }}
        >

          <DialogContent>
            <Container>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.subCategory1}
                    options={[]}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 1" required />}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.subCategory2}
                    options={[]}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.subCategory3}
                    options={[]}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={newParticular?.quantity == 0 ? '' : newParticular?.quantity}
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    fullWidth
                    inputProps={{
                      onWheel: handleWheel,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Requested Amount"
                    type="number"
                    value={newParticular?.unitPrice?.toFixed(2)}
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    required
                    fullWidth
                    inputProps={{
                      onWheel: handleWheel,
                    }}
                  />
                </Grid>
                {/* <Grid item md={12}>
                  <FormControlLabel
                    label="Multiply By Quantity"
                    control={
                      <Checkbox
                        onChange={(e) =>
                          setNewParticular((particularDetails) => ({
                            ...particularDetails,
                            requestedAmount: e.target.checked ? (particularDetails?.quantity ?? 0) * (newParticular?.unitPrice ?? 0) : particularDetails?.unitPrice ?? 0,
                          }))
                        }
                      />
                    }
                  />
                </Grid> */}
                <Grid item md={12}>
                  <TextField
                    label="Total Amount"
                    type="number"
                    value={newParticular?.requestedAmount?.toFixed(2)}
                    fullWidth
                    required
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.month}
                    options={monthNames ?? []}
                    getOptionLabel={(monthName) => monthName}
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    renderInput={(params) => <TextField {...params} label="For the Month" required />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    label="Upcoming Year"
                    control={
                      <Checkbox
                        disabled
                        sx={{
                          '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#000', // text color
                            color: '#000',
                            opacity: 1,
                          },
                          '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#c4c4c4', // normal border color
                          },
                          '& .MuiInputLabel-root.Mui-disabled': {
                            color: 'rgba(0,0,0,0.6)',
                          },
                        }}
                        checked={newParticular.isUpcomingYear}
                        onChange={(e) =>
                          setNewParticular((particularDetails) => ({
                            ...particularDetails,
                            isUpcomingYear: e.target.checked,
                          }))
                        }
                      />
                    }
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Application Reference No"
                    value={newParticular.applicationReferenceNo}
                    multiline
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    maxRows={4}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        applicationReferenceNo: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Button variant="contained" onClick={() => {
                    setViewFileUploaderAppl(true); setAttachmentsAppl(newParticular.applicationAttachment ?? []);
                  }} startIcon={<AttachmentIcon />}>
                    Appl. Attachment
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Narration"
                    value={newParticular.narration}
                    multiline
                    maxRows={4}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        narration: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Button variant="contained" onClick={() => {
                    setViewFileUploader(true); setAttachments(newParticular.attachment);
                  }} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddParticularDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      // sx={{ width: '30%', textAlign: 'center' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
            props.onChange({
              ...props.value,
              particulars: props.value.particulars?.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
            });
          }}

        >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Sanctioned Amount
          </DialogTitle>
          <DialogContent>


            <Grid item xs={12} md={6} width={'20rem'} padding={1}>
              <Grid item xs={12} md={6}>
                {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                <TextField
                  label="Sanctioned Amount"
                  type={'number'}
                  // value={newParticular.sanctionedAmount ?? total==0 ? '':total}
                  value={
                    newParticular.sanctionedAmount !== undefined ?
                      newParticular.sanctionedAmount :
                      total === 0 ?
                        '' :
                        total
                  }
                  required
                  title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  onChange={(e) => {
                    if (totalRequestedAmount) {
                      setNewParticular((amount: any) => ({
                        ...amount,
                        sanctionedAmount: Number(e.target.value),
                      }));
                    }
                  }
                  }
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: totalRequestedAmount,
                    min: 0,
                    step: 0.01, // Allows up to two decimal places
                    onWheel: handleWheel,
                  }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />

                {/* </Tooltip> */}
              </Grid>
              <br />
              <Autocomplete
                value={newParticular?.sanctionedAsPer as unknown as AsPer}
                options={sanctionedAsPers ?? []}
                getOptionLabel={(option: any) => option ?? ''}
                // getOptionLabel={(requisition) => requisition}
                disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                onChange={(_e, selectedSanction) => {
                  // const { _id, createdAt, updatedAt, __v, asPer } = selectedSanction;
                  if (selectedSanction && props.action === 'view') {
                    // setNewParticular({
                    //   ...props.value,
                    //   sanctionedAsPer: selectedSanction as ISanctionedAsPer,
                    // });
                    setNewParticular((asper: any) => ({
                      ...asper,
                      sanctionedAsPer: selectedSanction,
                    }));
                  }
                }}

                renderInput={(params) => <TextField {...params}
                  label="Sanctioned As Per*"
                // required
                // required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                />}

                fullWidth
              />
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openPresident}
        onClose={() => setOpenPresident(false)}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      // sx={{ width: '30%', textAlign: 'center' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onChange({
              ...props.value,
              particulars: props.value.particulars?.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
            });
            setOpenPresident(false);
          }}

        >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            President Sanctioned Amount
          </DialogTitle>
          <DialogContent>


            <Grid item xs={12} md={6} width={'20rem'} padding={1}>
              <Grid item xs={12} md={6}>
                {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                <TextField
                  label="President Sanctioned Amount"
                  type={'number'}
                  // value={newParticular.sanctionedAmount ?? total==0 ? '':total}
                  value={
                    newParticular.presidentSanctionAmt}
                  // required
                  // title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  onChange={(e) => {
                    // if (totalRequestedAmount) {
                    setNewParticular((amount: any) => ({
                      ...amount,
                      presidentSanctionAmt: Number(e.target.value),
                    }));
                    // }
                  }
                  }
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: 0,
                    step: 0.01, // Allows up to two decimal places
                    onWheel: handleWheel,
                  }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />
                {/* </Tooltip> */}
              </Grid>
              <br />
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenPresident(false)}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={authLetterinput}
        onClose={() => setAuthLetterinput(false)}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      // sx={{ width: '30%', textAlign: 'center' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // props.onChange({
            //   ...props.value,
            //   particulars: props.value.particulars?.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
            // });
            setAuthLetterinput(false);
          }}

        >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Auth Letter input
          </DialogTitle>
          <DialogContent>


            <Grid item xs={12} md={6} width={'20rem'} padding={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="President Sanctioned Amount"
                  // type={'number'}
                  // value={newParticular.sanctionedAmount ?? total==0 ? '':total}
                  value={props.value.presidentSanctionedAmount ?? total2}
                  // required
                  // title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  onChange={(e) => {
                    props.onChange({
                      ...props.value,
                      presidentSanctionedAmount: e.target.value,
                    });
                    // }
                  }
                  }
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: 0,
                    step: 0.01, // Allows up to two decimal places
                    onWheel: handleWheel,
                  }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />
                {/* </Tooltip> */}
              </Grid>
              <br />
              <Grid item xs={12} md={6}>
                {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                <TextField
                  label="Validity"
                  type={'text'}
                  // value={newParticular.sanctionedAmount ?? total==0 ? '':total}
                  value={props.value.Validity}
                  // required
                  // title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  onChange={(e) => {
                    props.onChange({
                      ...props.value,
                      Validity: e.target.value,
                    });
                    // }
                    // }
                  }
                  }
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: 0,
                    step: 0.01, // Allows up to two decimal places
                    onWheel: handleWheel,
                  }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />
                {/* </Tooltip> */}
              </Grid>
              <br />
              <Grid item xs={12} md={6}>
                {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                <TextField
                  label="President Remark"
                  // type={'number'}
                  // value={newParticular.sanctionedAmount ?? total==0 ? '':total}
                  value={props.value.presidentRemarks}
                  // required
                  // title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  onChange={(e) => {
                    // if (totalRequestedAmount) {
                    props.onChange({
                      ...props.value,
                      presidentRemarks: e.target.value,
                    });
                    // }
                  }
                  }
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: 0,
                    step: 0.01, // Allows up to two decimal places
                    onWheel: handleWheel,
                  }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />
                {/* </Tooltip> */}
              </Grid>
              <br />
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setAuthLetterinput(false)}>
              Cancel
            </Button>
            {props.value.status !== FRLifeCycleStates.FR_APPROVED && (

              <Button type="submit">Add</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={Boolean(data)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Fr</DialogTitle>
        <DialogContent>
          <Container>
  Download the FR Auth Letter for {data?.FRno}
            <br />

            {data && (
              <BlobProvider document={<SanctionLetter data={data as any} />}>
                {({ loading, url }) =>
                  loading ? (
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
              setData(null);
            }}
            variant="text"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addSignature} sx={{ width: 400, margin: '0 auto' }} >
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
                  setShowFileUploader(true);
                }}
              >
                {' '}
                Signature
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="info"
                sx={{ width: 260 }}
                onClick={() => {
                  setShowName(true);
                }}
              >
                {' '}
                Name and Designation
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={(e) => {
                  // handleClick(e)
                  toggleAddSignature(false);
                }}
                sx={{ marginBottom: 3, width: 260 }}
                endIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={(e) => {
                  handleClick(e);
                }}
                sx={{ marginBottom: 3, width: 260 }}
              >
                Verify
              </Button>

            </Grid>


          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        keepMounted
        onClose={() => setOpen2(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> {'Are you sure you want to Add Extra signature?'}</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen2(false)}>Close</Button>
          {/* <Button onClick={(e) => handleClick(e)}>Verify</Button> */}
          <Button onClick={() => {
            toggleAddSignature(true), setOpen2(false);
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <FileUploader
        title="Signature"
        action={'add'}
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={props.value.additionalSignature ? [props.value.additionalSignature] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'Settings/eSignature', file?.name).then((res) => {
            console.log(res.data, 'poo');
            // props.onChange(() => ({
            //   ...props.value, // Include existing properties
            //   additionalSignature: [...(props.value.additionalSignature || []), res.data], // Update additionalSignature
            // }));

            props.onChange({
              ...props.value,
              additionalSignature: res.data,
            });

            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          // setReleaseAmount(() => ({
          //   ...releaseAmount,
          //   attachment: releaseAmount.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
          // }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
      // getFiles={[]}        //  action={'view'} getFiles={[]}        // deleteFile={props.action == 'add' ?
      //   (fileId: string) => {
      //     props.onChange(() => ({
      //       ...props.value,
      //       attachment: releaseAmount.attachment.filter((file) => file._id !== fileId),
      //     }));
      //     return FileUploaderServices.deleteFile(fileId);
      //   } :
      //   undefined} action={'add'}
      />

      <Dialog
        open={showName}
        onClose={() => setShowName(false)}
      >
        <DialogTitle> Name</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={props.value.additionalName}
            onChange={(e: any) => {
              props.onChange({
                ...props.value,
                additionalName: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
            value={props.value.additionalDesignation}
            onChange={(e: any) => {
              props.onChange({
                ...props.value,
                additionalDesignation: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowName(false)}>Cancel</Button>
          <Button onClick={() => setShowName(false)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openThePrintFr &&Boolean(data2)} onClose={() => setData2(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Print FR</DialogTitle>
        <DialogContent>
          <Container>
      Downloading the FRReceipt for {data2?.FRno}
            <br />
            {data2 && (
              <BlobProvider
                document={
                  <FRReceiptTemplate
                    rowData={data2}
                    president={selectedSignaturePresident}
                  />
                }
              >
                {({ loading, url }) =>
                  loading ? (
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
      </Dialog>

      {props.value._id && <TransactionLogDialog open={openLog} onClose={() => setOpenLog(false)} TRId={props.value._id} />}
    </div>
  );
};

export default ViewFRRequests;

