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
  // Checkbox,
  // FormControlLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { SetStateAction, useEffect, useState } from 'react';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import moment from 'moment';
import FileUploader from '../../../components/FileUploader/FileUploader';
import SendIcon from '@mui/icons-material/Send';
import { MB } from '../../../extras/CommonConfig';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FRReceiptTemplate from './FRReceiptTemplate';
import { monthNames, purposes } from '../extras/FRConfig';
import { AttachFile as AttachmentIcon, Edit as EditIcon } from '@mui/icons-material';
import MessageItem from '../../../components/MessageItem';
import { useNavigate } from 'react-router-dom';
import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';
import SanctionedAsPerService from '../../Settings/extras/SanctionedAsPerService';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import ESignatureService from '../../Settings/extras/ESignatureService';


const ViewFRRequests = (props: FormComponentProps<CreatableFR, { FRLoaded: boolean }>) => {
  const navigate = useNavigate();
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonForSentBack, setReasonForSentBack] = useState<string | null>('');
  const [sanctionedAsPers, setSanctionedAsPers] = useState<ISanctionedAsPer[]>([]);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  // const [isFocused, setFocused] = useState(false);
  const totalRequestedAmount = props.value.particulars && props.value.particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const FRstatus = IROLifeCycleStates.getStatusNameByCodeTransaction(Number(props.value.status));
  const [showAddParticularDialog, setShowAddParticularDialog] = useState(false);

  const [newParticular, setNewParticular] = useState<CreatableParticular>({
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    month: '',
    narration: '',
    attachment: [],
    sanctionedAsPer: '',
  });
  const [selectedParticularIndex, setSelectedParticularIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (particular: Particular, index: number) => {
    setOpen(true);
    setSelectedParticularIndex(index);
    setNewParticular(particular);
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
        console.log({ res});
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
  };
  useEffect(() => {
    const ddata = SanctionedAsPerService.getAll().then((res) => {
      setSanctionedAsPers(res.data);
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
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/fr/manage');
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
            }}
          >

            <Grid container spacing={3}>
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
                />
              </Grid>
              {props.value.purpose === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={props.value.purposeWorker}
                      options={[]}
                      getOptionLabel={(worker) => `${worker.basicDetails.firstName} ${worker.basicDetails.lastName}`}
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
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Worker Code"
                      value={props.value.purposeWorker?.kind === 'staff' ? (props.value.purposeWorker as Staff | undefined)?.staffCode : (props.value.purposeWorker as unknown as IWorker)?.workerCode}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>


                </>
              ) : null}
              {props.value.purpose === 'Subdivision' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={[]}
                    value={props.value.purposeSubdivision}
                    getOptionLabel={(subDiv) => subDiv.name}
                    onChange={(event, newVal) => props.onChange({ ...props.value, purposeSubdivision: newVal ?? undefined })}
                    renderInput={(params) => <TextField {...params} label="Subdivision" />}
                    disabled
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Division' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={props.value.division}
                    options={[]}
                    getOptionLabel={(division) => division.details.name}
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
                  />
                </Grid>
              ) : null}


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
                        <TableCell align="center"> Sanction As per</TableCell>
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
                              <IconButton onClick={() => {
                                setViewFileUploader(true);
                                setAttachments(item.attachment);
                              }}>
                                <AttachmentIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center"> {`${item.mainCategory == 'Select' ? '' : item.mainCategory} 
                            > ${item.subCategory1 == 'Select' ? '' : item.subCategory1} > 
                            ${item.subCategory2 == 'Select' ? '' : item.subCategory2} > ${item.subCategory3 == 'Select' ? '' : item.subCategory3}`}</TableCell>
                            <TableCell align="center">{item.narration}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.month}</TableCell>
                            <TableCell align="center">{item.requestedAmount}</TableCell>
                            <TableCell align="center">{item.sanctionedAsPer}</TableCell>
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
                  value={totalRequestedAmount}
                  // onChange={(e) =>
                  //   // eslint-disable-next-line @typescript-eslint/naming-convention

                  // }
                  fullWidth
                  disabled
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
                      value={props.value.sanctionedAmount}
                      required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                      autoComplete='off'
                      disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
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
                      inputProps={{
                        max: totalRequestedAmount, min: 0,
                        onWheel: handleWheel,
                      }}
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
                        onChange={(e) =>
                          props.onChange({
                            ...props.value,
                            sanctionedBank: e.target.value,
                          })
                        }

                      >
                        <MenuItem value={'Division Bank FCRA'}>Division Bank FCRA</MenuItem>
                        <MenuItem value={'Division Bank Local'}>Division Bank Local</MenuItem>
                        <MenuItem value={'Beneficiary Bank'}>Beneficiary Bank</MenuItem>
                        <MenuItem value={'Beneficiary Bank 1'}>Beneficiary Bank1</MenuItem>
                        <MenuItem value={'Beneficiary Bank 2'}>Beneficiary Bank2</MenuItem>
                        <MenuItem value={'Beneficiary Bank 3'}>Beneficiary Bank3</MenuItem>
                        <MenuItem value={'Beneficiary Bank 4'}>Beneficiary Bank4</MenuItem>
                        <MenuItem value={'Beneficiary Bank 5'}>Beneficiary Bank5</MenuItem>
                        <MenuItem value={'Beneficiary Bank 6'}>Beneficiary Bank6</MenuItem>
                        <MenuItem value={'Beneficiary Bank 7'}>Beneficiary Bank7</MenuItem>
                        <MenuItem value={'Beneficiary Bank 8'}>Beneficiary Bank8</MenuItem>
                        <MenuItem value={'Beneficiary Bank 9'}>Beneficiary Bank9</MenuItem>

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
                        value={props.value.sourceOfAccount || ''}
                        disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                        onChange={(e) =>
                          props.onChange({
                            ...props.value,
                            sourceOfAccount: e.target.value,
                          })
                        }

                      >
                        <MenuItem value={'FRCA'}>FCRA</MenuItem>
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
                {props.options?.FRLoaded && <Button
                  variant="contained"
                  color="warning"
                  style={{
                    textAlign: 'left', textDecoration: 'none',
                  }}
                // onClick={() => {
                //   toggleOpenRemarks(true);
                // }}
                >
                  <PDFDownloadLink
                    document={<FRReceiptTemplate president={selectedSignaturePresident} rowData={props.value as FR} />}
                    fileName="FRReceipt.pdf"
                    style={{ color: 'White', textDecoration: 'none' }}
                  >
                    Print FR
                  </PDFDownloadLink>
                </Button>}

                {/* )} */}
                &nbsp;
                <div style={{ float: 'right' }}>
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
                  {props.action === 'view' && FRstatus != 'FR_APPROVED' ? (
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
                                  const rejectionSnack = enqueueSnackbar({ message: 'Rejecting FR', variant: 'info' });
                                  if (props.onSubmit) {
                                    const updatedValue = { ...props.value, status: FRLifeCycleStates.REJECTED }; // Create a new object with updated status
                                    props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                  }
                                  setTimeout(() => {
                                    closeSnackbar(rejectionSnack);
                                    const rejectedSnack = enqueueSnackbar({ message: 'Disapproved!', variant: 'success' });
                                    setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                  }, 500);
                                  navigate('/fr/manage');
                                }}
                              >
                                Disapprove
                              </Button>
                              &nbsp;<Button
                                variant="contained"
                                color="success"
                                type='submit'
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
                              const rejectionSnack = enqueueSnackbar({ message: 'Rejecting FR', variant: 'info' });
                              if (props.onSubmit) {
                                const updatedValue = { ...props.value, status: FRLifeCycleStates.REJECTED }; // Create a new object with updated status
                                props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                              }
                              setTimeout(() => {
                                closeSnackbar(rejectionSnack);
                                const rejectedSnack = enqueueSnackbar({ message: 'Disapproved!', variant: 'success' });
                                setTimeout(() => closeSnackbar(rejectedSnack), 500);
                              }, 500);
                              navigate('/fr/Approve');
                            }}
                          >
                            Disapprove
                          </Button>
                          &nbsp;<Button
                            variant="contained"
                            color="success"
                            onClick={() => {
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
                            }}
                          >
                            verify
                          </Button></>
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
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={newParticular?.quantity == 0 ? '' : newParticular?.quantity}
                    disabled
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
                    value={newParticular?.unitPrice}
                    disabled
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
                    value={newParticular?.requestedAmount}
                    fullWidth
                    required
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.month}
                    options={monthNames ?? []}
                    getOptionLabel={(monthName) => monthName}
                    disabled
                    renderInput={(params) => <TextField {...params} label="For the Month" required />}
                    fullWidth
                  />
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
            Add Sanction as per
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} md={6} width={'20rem'} padding={1}>
              <Autocomplete<ISanctionedAsPer>
                value={newParticular?.sanctionedAsPer as unknown as ISanctionedAsPer}
                options={sanctionedAsPers ?? []}
                getOptionLabel={(option) => option.asPer ?? ''}
                // getOptionLabel={(requisition) => requisition}
                disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                onChange={(_e, selectedSanction) => {
                  if (selectedSanction && props.action === 'view') {
                    // setNewParticular({
                    //   ...props.value,
                    //   sanctionedAsPer: selectedSanction as ISanctionedAsPer,
                    // });
                    setNewParticular((asper: any) => ({
                      ...asper,
                      sanctionedAsPer: selectedSanction?.asPer,
                    }));
                  }
                }}
                renderInput={(params) => <TextField {...params}
                label="Sanctioned As Per" 
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

    </div>
  );
};

export default ViewFRRequests;
