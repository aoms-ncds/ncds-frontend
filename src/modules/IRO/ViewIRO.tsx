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
  Alert,
  Card,
  DialogContent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useState, useEffect } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import { purposes } from '../FR/extras/FRConfig';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import IROServices from './extras/IROServices';
import PermissionChecks from '../User/components/PermissionChecks';
import { useNavigate, useParams } from 'react-router-dom';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import MessageItem from '../../components/MessageItem';
import SanctionedAsPerService from '../Settings/extras/SanctionedAsPerService';


const ViewIRO = () => {
  const navigate = useNavigate();
  const { iroID } = useParams();
  const [IRO, setIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: '',
    status: FRLifeCycleStates.FR_APPROVED,
    kind: 'IRO',
    sanctionedAmount: 0,
    sanctionedAsPer: '',
    sanctionedBank: '',
    mainCategory: '',
    particulars: [],
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
    releaseAmount: {
      _id: '',
      transferredBank: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
      },
      attachment: [],
      division: '',
    },
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
      },
      subDivisions: [
        {
          _id: '',
          name: '',
        },
      ],
      FCRABankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      localBankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      otherBankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      createdAt: moment(),
      updatedAt: moment(),
    },
    billAttachment: [],
    createdAt: moment(),
    updatedAt: moment(),
    signature: {},
    specialsanction: '',
  });


  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);

  const totalRequestedAmount = IRO?.particulars && IRO?.particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const IROstatus = IROLifeCycleStates.getStatusNameByCodeTransaction(Number(IRO?.status));
  const [sanctionedAsPer, setSanctionedAsPer] = useState<ISanctionedAsPer[]>([]);
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
  };
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   // Prevent changing the value when the up or down arrow key is pressed
  //   if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   }
  // };
  useEffect( ()=>{
    const ddata= SanctionedAsPerService.getAll().then((res)=>{
      console.log(ddata, 'fdfd');

      setSanctionedAsPer(res.data);
    });
  }, []);
  useEffect(() => {
    if (!iroID) {
      throw new Error('IRO ID Missing in URL');
    }
    IROServices.getById(iroID).then((res) => setIRO(res.data)); // TODO: Implement REST API Call
  }, [iroID]);
  return (
    <CommonPageLayout title="View And Manage IRO">
      <PermissionChecks
        permissions={['READ_IRO']}
        granted={
          <>
            <Card style={{ width: '100%' }}>
              <Container>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // if (props.onSubmit) {
                      //   props.onSubmit(IRO); // Invoke props.onSubmit with the value as the argument
                      // }
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <DatePicker label="Date" value={IRO?.IRODate} format="DD/MM/YYYY" slotProps={{ textField: { fullWidth: true } }} disabled />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          value={IRO?.purpose}
                          options={purposes ?? []}
                          getOptionLabel={(requisition) => requisition ?? ''}
                          onChange={
                            () => { }
                            // if (selectedPurpose) {
                            //  setIRO({
                            //     ...IRO,
                            //     purpose: selectedPurpose as FRPurpose,
                            //   });
                            // }
                          }
                          renderInput={(params) => <TextField {...params} label="Requisition For" />}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      {IRO?.purpose === 'Worker' ? (
                        <>
                          <Grid item xs={12} md={6}>
                            <Autocomplete
                              value={IRO?.purposeWorker}
                              options={[]}
                              getOptionLabel={(worker) => `${worker.basicDetails.firstName} ${worker.basicDetails.lastName}`}
                              onChange={() => { }}
                              //   if (selectedWorker) {
                              //    setIRO({
                              //       ...IRO,
                              //       purposeWorker: selectedWorker,
                              //     });
                              //   }
                              // }}
                              renderInput={(params) => <TextField {...params} label="Choose Worker" />}
                              fullWidth
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Worker Code"
                              value={IRO.purposeWorker?.kind === 'staff' ? (IRO.purposeWorker as Staff | undefined)?.staffCode : (IRO.purposeWorker as unknown as IWorker)?.workerCode}

                              fullWidth
                              disabled
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </>
                      ) : null}
                      {IRO?.purpose === 'Subdivision' ? (
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            options={[]}
                            value={IRO?.purposeSubdivision}
                            getOptionLabel={(subDiv) => subDiv.name}
                            onChange={() => { }}
                            renderInput={(params) => <TextField {...params} label="Subdivision" />}
                            disabled
                          />
                        </Grid>
                      ) : null}
                      {IRO?.purpose === 'Division' ? (
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            value={IRO?.division}
                            options={[]}
                            getOptionLabel={(division) => division.details.name}
                            onChange={() => { }}
                            renderInput={(params) => <TextField {...params} label="Choose Division" />}
                            fullWidth
                            disabled
                          />
                        </Grid>
                      ) : null}
                      {IRO?.purpose === 'Coordinator' ? (
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            value={IRO?.purposeCoordinator}
                            options={[]}
                            getOptionLabel={(coordinator) => coordinator.basicDetails.firstName + ' ' + coordinator.basicDetails.lastName}
                            renderInput={(params) => <TextField {...params} label="Choose Coordinator" />}
                            fullWidth
                            disabled
                          />
                        </Grid>
                      ) : null}
                      {IRO?.purpose === 'Others' ? (
                        <Grid item xs={12} md={6}>
                          <TextField label="Others" value={IRO?.purposeOthers} variant="outlined" fullWidth disabled />
                        </Grid>
                      ) : null}

                      <Grid item xs={12}>
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">S.No</TableCell>
                                <TableCell align="center">Main Category</TableCell>
                                <TableCell align="center">Particulars</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">For the Month of</TableCell>
                                <TableCell align="center">Requested Amount</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {IRO?.particulars &&
                                IRO?.particulars.map((item, index) => (
                                  <TableRow key={item._id} >
                                    <TableCell component="th" sx={{ display: 'flex' }}>
                                      <IconButton
                                        onClick={() => {
                                          setViewFileUploader(true);
                                          setAttachments(item.attachment);
                                        }}
                                      >
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
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField label="Requested Amount" InputLabelProps={{ shrink: true }} value={totalRequestedAmount} fullWidth disabled />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Sanctioned Amount"
                          type={'number'}
                          value={IRO?.sanctionedAmount}
                          onChange={(e) => {
                            if (IRO) {
                              // eslint-disable-next-line @typescript-eslint/naming-convention
                              setIRO((IRO) => ({
                                ...IRO,
                                sanctionedAmount: Number(e.target.value),
                              }));
                            }
                          }}
                          variant="outlined"
                          fullWidth
                          disabled
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ onWheel: handleWheel }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                          <Select
                            labelId="sanctioned_bank"
                            label="Sanctioned Bank"
                            value={IRO?.sanctionedBank ?? null}
                            disabled

                            onChange={(e) =>
                              setIRO({
                                ...IRO,
                                sanctionedBank: e.target.value,
                              })
                            }
                          >
                            <MenuItem value={'FCRA'}>FCRA</MenuItem>
                            <MenuItem value={'Local Bank'}>Local Bank</MenuItem>
                            <MenuItem value={'Personal Bank'}>Personal Bank</MenuItem>
                            <MenuItem value={'Personal Bank1'}>Personal Bank1</MenuItem>
                            <MenuItem value={'Personal Bank2'}>Personal Bank2</MenuItem>
                            <MenuItem value={'Personal Bank3'}>Personal Bank3</MenuItem>
                            <MenuItem value={'Personal Bank4'}>Personal Bank4</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          value={IRO?.sanctionedAsPer?? []}
                          options={sanctionedAsPer ?? []}
                          getOptionLabel={(options) => options.asPer ?? ''}
                          onChange={(_e, selectedSanction) => {
                            if (selectedSanction) {
                              setIRO({
                                ...IRO,
                                sanctionedAsPer: selectedSanction as ISanctionedAsPer,
                              });
                            }
                          }}

                          renderInput={(params) => <TextField {...params} label="Sanctioned As Per" disabled />}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* {props.action === 'edit' && ( */}
                        {IRO?.status >= IROLifeCycleStates.AMOUNT_RELEASED && IRO?.status == IROLifeCycleStates.IRO_CLOSED && (

                          <Button
                            variant="contained"
                            color="warning"
                            style={{ textAlign: 'left', textDecoration: 'none' }}
                          // onClick={() => {
                          //   toggleOpenRemarks(true);
                          // }}
                          >
                            <PDFDownloadLink document={<IROReceiptTemplate rowData={IRO} />} fileName="IROReceipt.pdf" style={{ color: 'White', textDecoration: 'none' }}>
                              Print IRO
                            </PDFDownloadLink>
                          </Button>
                        )}
                        &nbsp;
                        <div style={{ float: 'right' }}>
                          <Button
                            variant="contained"
                            color="info"
                            onClick={() => {
                              toggleOpenRemarks(true);
                              IROServices.getAllRemarksById(IRO._id ?? '')
                                .then((res) => setRemarks(res.data ?? []))
                                .catch((error) => {
                                  enqueueSnackbar({
                                    variant: 'error',
                                    message: error.message,
                                  });
                                });
                            }}
                          >
                            Remarks
                          </Button>
                          &nbsp;
                          {/* { IRO.status < IROLifeCycleStates.ACCOUNTS_MNGR_APPROVED ?(
                            <>
                              &nbsp;
                              <PermissionChecks
                                permissions={['WRITE_IRO']}
                                granted={
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => {
                                      const rejectionSnack = enqueueSnackbar({ message: 'Sending Back IRO', variant: 'info' });
                                      IROServices.sendBack(iroID as string )
                                      .then((res)=>{
                                        console.log(res);
                                      });
                                      // if (props.onSubmit) {
                                      //   const updatedValue = { ...IRO, status: IROLifeCycleStates.IRO_SEND_BACK }; // Create a new object with updated status
                                      //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                      // }
                                      setTimeout(() => {
                                        closeSnackbar(rejectionSnack);
                                        const rejectedSnack = enqueueSnackbar({ message: 'sendBack!', variant: 'success' });
                                        setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                      }, 500);
                                    }}
                                  >
                                    Send Back
                                  </Button>
                                }
                              />
                              &nbsp;
                            </>
                          ) : null} */}

                          {IROstatus == 'WAITING_FOR_OFFICE_MNGR' ? (
                            <>
                              {/* Only display buttons if props.action is 'view' */}
                              &nbsp;
                              <PermissionChecks
                                permissions={['OFFICE_MNGR_ACCESS']}
                                granted={
                                  <>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
                                        IROServices.reject(iroID as string)
                                          .then((res) => {

                                          });

                                        // if (props.onSubmit) {
                                        //   const updatedValue = { ...IRO, status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR }; // Create a new object with updated status
                                        //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                        // }
                                        setTimeout(() => {
                                          closeSnackbar(rejectionSnack);
                                          const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                                          setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                        }, 500);
                                      }}
                                    >
                                      Revert
                                    </Button>
                                    &nbsp;
                                    <Button
                                      variant="contained"
                                      color="success"
                                      onClick={() => {
                                        const approvalSnack = enqueueSnackbar({ message: 'Approving IRO', variant: 'info' });
                                        IROServices.officeManagerApprove(iroID as string)
                                          .then((res) => {
                                            navigate('/iro');
                                            // window.location.reload();
                                          });
                                        // if (props.onSubmit) {
                                        //   const updatedValue = { ...IRO, status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR }; // Create a new object with updated status
                                        //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                        // }
                                        setTimeout(() => {
                                          closeSnackbar(approvalSnack);
                                          const approvedSnack = enqueueSnackbar({ message: 'Verified!', variant: 'success' });
                                          setTimeout(() => closeSnackbar(approvedSnack), 500);
                                        }, 500);
                                      }}
                                    >
                                      Verify
                                    </Button>
                                  </>
                                }
                              />
                              &nbsp;
                            </>
                          ) : null}
                          {IROstatus == 'WAITING_FOR_ACCOUNTS_MNGR' ? (
                            <>
                              {/* Only display buttons if props.action is 'view' */}
                              &nbsp;
                              <PermissionChecks
                                permissions={['ACCOUNTS_MNGR_ACCESS']}
                                granted={
                                  <>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
                                        IROServices.reject(iroID as string)
                                          .then((res) => {

                                          });

                                        // if (props.onSubmit) {
                                        //   const updatedValue = { ...IRO, status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR }; // Create a new object with updated status
                                        //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                        // }
                                        setTimeout(() => {
                                          closeSnackbar(rejectionSnack);
                                          const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                                          setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                        }, 500);
                                      }}
                                    >
                                      Revert
                                    </Button>
                                    &nbsp;
                                    <Button
                                      variant="contained"
                                      color="success"
                                      type='submit'
                                      onClick={() => {
                                        const approvalSnack = enqueueSnackbar({ message: 'Approving IRO', variant: 'info' });
                                        IROServices.accountManagerApprove(iroID as string)
                                          .then((res) => {
                                            navigate('/iro');
                                          });

                                        // if (props.onSubmit) {
                                        //   // const updatedValue = { ...IRO, status: IROLifeCycleStates.SUBMITTED_TO_ACCOUNTS_STATE }; // Create a new object with updated status
                                        //   // props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                        // }
                                        setTimeout(() => {
                                          closeSnackbar(approvalSnack);
                                          const approvedSnack = enqueueSnackbar({ message: 'Verified!', variant: 'success' });
                                          setTimeout(() => closeSnackbar(approvedSnack), 500);
                                        }, 500);
                                      }}
                                    >
                                      Verify
                                    </Button>
                                  </>
                                }
                              />
                              &nbsp;
                            </>
                          ) : null}
                          {/* {IROstatus === 'WAITING_FOR_OFFICE_MNGR' || IROstatus === 'WAITING_FOR_ACCOUNTS_MNGR' ? (
                            <PermissionChecks
                              permissions={['WRITE_IRO']}
                              granted={
                                <Button
                                  variant="contained"
                                  color="info"
                                  onClick={() => {
                                    const processingSnack = enqueueSnackbar({ message: 'Submitting IRO To Accounts', variant: 'info' });
                                    IROServices.submit(iroID as string )
                                .then((res)=>{
                                  console.log(res);
                                });
                                    // if (props.onSubmit) {
                                    //   const updatedValue = { ...IRO, status: 1 };
                                    //   props.onSubmit(updatedValue);
                                    // }

                                    setTimeout(() => {
                                      closeSnackbar(processingSnack);
                                      const processedSnack = enqueueSnackbar({ message: 'Submitted IRO To Accounts!', variant: 'success' });
                                      setTimeout(() => closeSnackbar(processedSnack), 500);
                                    }, 500);
                                  }}
                                >
                                  Submit
                                </Button>
                              }
                            />
                          ) : null} */}
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Container>
            </Card>
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
              IROServices.addRemarks(remark)
                .then((res) => {
                  setRemarks((remarks) => [...remarks, res.data]);
                  setRemark((remark) => ({
                    ...remark,
                    remark: '',
                  }));
                  toggleOpenRemarks(false);
                  enqueueSnackbar(res.message, { variant: 'success' });
                })
                .catch((error: { message: string }) => {
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
                  IRO: IRO?._id ?? '',
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
            <br />
            <Button variant="contained" onClick={() => toggleOpenRemarks(false)} sx={{ ml: 'auto' }}>
              close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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
    </CommonPageLayout>
  );
};

export default ViewIRO;
