import {
  Container,
  CardContent,
  Grid,
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
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogContent,
} from '@mui/material';
import { AttachFile as AttachmentIcon, Send as SendIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import { purposes, sanctionedAsPers } from '../FR/extras/FRConfig';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import FRServices from '../FR/extras/FRServices';
import PermissionChecks from '../User/components/PermissionChecks';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { PDFDownloadLink } from '@react-pdf/renderer';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import MessageItem from '../../components/MessageItem';

const EditIRO = () => {
  const navigate = useNavigate();

  // const [purposes, setPurposes] = useState<FRPurpose[]>();
  // const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [particulars, setParticulars] = useState<Particular[]>([]);
  const [newParticular, setNewParticular] = useState<CreatableParticular>({
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    month: '',
    narration: '',
    attachment: [],
  });
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
        selfSupport: true,
        status: null,
        noOfChurches: 0,
      },
      supportDetails: {
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
  });

  const [showFileUploader, setShowFileUploader] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [submit, setSubmit] = useState(0);


  useEffect(() => {
    console.log({ submit });
  }, [submit]);


  useEffect(() => {
    FRServices.getMainCategory()
            .then(() => {
              // setMainCategories(res.data);
            })
            .catch((res) => {
              console.log(res);
            });

    if (IRO.particulars) {
      setParticulars(IRO.particulars);
    }
  }, [IRO.particulars]);


  useEffect(() => {
    if (!iroID) {
      throw new Error('IRO ID Missing in URL');
    }
    IROServices.getById(iroID).then((res) => setIRO(res.data)); // TODO: Implement REST API Call
  }, [iroID]);

  const totalRequestedAmount = particulars && particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  return (
    <>
      <CommonPageLayout title="Edit IRO">
        <Card style={{ width: '100%' }}>

          <Container>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // const SubmitStatus = null;
                  // if (submit == 1) {
                  //   const SubmitStatus = FRLifeCycleStates.WAITING_FOR_ACCOUNTS;
                  // } else if (submit == 2) {
                  //   const SubmitStatus = FRLifeCycleStates.WAITING_FOR_PRESIDENT;
                  // }
                  IROServices.updateIRO(iroID??'', IRO)
                  .then((res)=> {
                    enqueueSnackbar({
                      message: res.message,
                      variant: 'success',
                    });
                    navigate(`/iro/${iroID}`);
                  });
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
                            <TableCell align="center">SI NO</TableCell>
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

                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                      <Select
                        labelId="sanctioned_bank"
                        label="Sanctioned Bank"
                        value={IRO?.sanctionedBank ?? null}


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

                        {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={IRO?.sanctionedAsPer}
                      options={sanctionedAsPers ?? []}
                      getOptionLabel={(requisition) => requisition ?? ''}
                      onChange={(_e, selectedSanction) => {
                        if (selectedSanction) {
                          setIRO({
                            ...IRO,
                            sanctionedAsPer: selectedSanction as SanctionedAsPer,
                          });
                        }
                      }}

                      renderInput={(params) => <TextField {...params} label="Sanctioned As Per" />}
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
                      <PermissionChecks
                        permissions={['WRITE_FR']}
                        granted={
                          <Button
                            variant="contained"
                            color="info"
                            type="submit"
                            onClick={() => setSubmit(1)}
                            // disabled={particulars.length==0}
                          >
                        Submit{' '}
                          </Button>
                        }/>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>

          </Container>   </Card></CommonPageLayout>

      <br />
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
        action="add"
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
        getFiles={newParticular.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'FR/Particulars', file.name).then((res) => {
            // console.log(res.data._id);

            setNewParticular(() => ({
              ...newParticular,
              attachment: [...newParticular.attachment, res.data],
            }));
            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
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
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'FR', file.name).then((res) => {
            setNewParticular((particularDetails) => ({
              ...particularDetails,
              attachment: [...particularDetails.attachment, res.data],
            }));
            return res;
          });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      /></>


  );
};

export default EditIRO;
