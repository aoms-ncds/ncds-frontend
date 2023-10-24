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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import moment from 'moment';
import FileUploader from '../../../components/FileUploader/FileUploader';
import SendIcon from '@mui/icons-material/Send';
import { MB } from '../../../extras/CommonConfig';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FRReceiptTemplate from './FRReceiptTemplate';
import { purposes, sanctionedAsPers } from '../extras/FRConfig';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import MessageItem from '../../../components/MessageItem';
import { useNavigate } from 'react-router-dom';
import IROLifeCycleStates from '../../IRO/extras/IROLifeCycleStates';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';

const ViewFRRequests = (props: FormComponentProps<CreatableFR>) => {
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState<IWorker[]>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [divisions, setDivisions] = useState<Division[]>();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>();
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [open, setOpen] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const totalRequestedAmount = props.value.particulars && props.value.particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const FRstatus = IROLifeCycleStates.getStatusNameByCodeTransaction(Number(props.value.status));
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
                    const approvedSnack = enqueueSnackbar({ message: 'Approved!', variant: 'success' });
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
                      options={workers ?? []}
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
                    options={subDivisions ?? []}
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
                    options={divisions ?? []}
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
                    options={coordinators ?? []}
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
                        <TableCell align="center">SI NO</TableCell>
                        <TableCell align="center">Main Category</TableCell>
                        <TableCell align="center">Particulars</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">For the Month of</TableCell>
                        <TableCell align="center">Requested Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.value.particulars &&
                        props.value.particulars.map((item, index) => (
                          <TableRow key={item._id} >
                            <TableCell component="th" sx={{ display: 'flex' }}>
                              <IconButton onClick={() => {
                                setViewFileUploader(true);
                                setAttachments(item.attachment);
                              }}>
                                <AttachmentIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{item.mainCategory}</TableCell>
                            <TableCell align="center">{item.narration}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.month}</TableCell>
                            <TableCell align="center">{item.requestedAmount}</TableCell>
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
                      disabled={!hasPermissions(['MANAGE_FR'])}
                      onChange={(e) => {
                        if (totalRequestedAmount) {
                          props.onChange({
                            ...props.value,
                            sanctionedAmount: Number(e.target.value),
                          });
                        }
                      }
                      }
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ max: totalRequestedAmount, min: 0 }}
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
                        disabled={!hasPermissions(['MANAGE_FR'])}

                        onChange={(e) =>
                          props.onChange({
                            ...props.value,
                            sanctionedBank: e.target.value,
                          })
                        }

                      >
                        <MenuItem value={'FCRA'}>FCRA</MenuItem>
                        <MenuItem value={'Local Bank'}>Local Bank</MenuItem>
                        <MenuItem value={'Personal Bank'}>Personal Bank</MenuItem>

                        {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={props.value.sanctionedAsPer ?? null}
                      options={sanctionedAsPers ?? []}
                      getOptionLabel={(requisition) => requisition}
                      disabled={!hasPermissions(['MANAGE_FR'])}

                      onChange={(_e, selectedSanction) => {
                        if (selectedSanction && props.action === 'view') {
                          props.onChange({
                            ...props.value,
                            sanctionedAsPer: selectedSanction as SanctionedAsPer,
                          });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Sanctioned As Per" required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS} />}
                      fullWidth

                    />
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12}>
                {/* {props.action === 'edit' && ( */}
                <Button
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
                    document={<FRReceiptTemplate rowData={props.value as FR} />}
                    fileName="FRReceipt.pdf"
                    style={{ color: 'White', textDecoration: 'none' }}
                  >
                    Print FR
                  </PDFDownloadLink>
                </Button>

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
                              const rejectionSnack = enqueueSnackbar({ message: 'Sending Back FR', variant: 'info' });
                              if (props.onSubmit) {
                                const updatedValue = { ...props.value, status: FRLifeCycleStates.FR_SEND_BACK }; // Create a new object with updated status
                                props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                              }
                              setTimeout(() => {
                                closeSnackbar(rejectionSnack);
                                const rejectedSnack = enqueueSnackbar({ message: 'sendBack!', variant: 'success' });
                                setTimeout(() => closeSnackbar(rejectedSnack), 500);
                              }, 500);
                              navigate('/fr/manage');
                            }}
                          >
                            Send Back
                          </Button>
                        )}
                      />

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
                                    const rejectedSnack = enqueueSnackbar({ message: 'Rejected!', variant: 'success' });
                                    setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                  }, 500);
                                  navigate('/fr/manage');
                                }}
                              >
                                Reject
                              </Button>
                              &nbsp;<Button
                                variant="contained"
                                color="success"
                                type='submit'
                              >
                                Approve
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
                                const rejectedSnack = enqueueSnackbar({ message: 'Rejected!', variant: 'success' });
                                setTimeout(() => closeSnackbar(rejectedSnack), 500);
                              }, 500);
                              navigate('/fr/approve');
                            }}
                          >
                            Reject
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
                              navigate('/fr/approve');
                            }}
                          >
                            Approve
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
    </div>
  );
};

export default ViewFRRequests;
