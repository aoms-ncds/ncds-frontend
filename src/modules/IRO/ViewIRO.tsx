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
  Alert,
  Card,
  DialogContent,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { AttachFile as AttachmentIcon, History as HistoryIcon } from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { useState, useEffect, Key, ReactChild, ReactFragment, ReactPortal, SetStateAction } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import { purposes } from '../FR/extras/FRConfig';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import IROServices from './extras/IROServices';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import { useNavigate, useParams } from 'react-router-dom';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import MessageItem from '../../components/MessageItem';
import SanctionedAsPerService from '../Settings/extras/SanctionedAsPerService';
import { useAuth } from '../../hooks/Authentication';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import TransactionLogDialog from '../FR/components/TransactionLogDialog';
import CloseIcon from '@mui/icons-material/Close';
import ReleaseAmount from './components/ReleaseAmountDialog';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SanctionLetter from '../FR/components/authLatter';
import FRServices from '../FR/extras/FRServices';
import formatAmount from '../Common/formatcode';


const ViewIRO = (props: any) => {
  const navigate = useNavigate();
  const { iroID } = useParams();
  const [showFileUploaderCustom, setShowFileUploaderCustom] = useState(false);
  const [showPresidentIROName, setPresidentIROName] = useState(false);
  const [eSignPresidentIRO, setePresidentIRO] = useState(false);

  const [Data, setData] = useState<any>();
  const [showFileUploaderCustomOfficeMngr, setShowFileUploaderCustomOfficeMngr] = useState(false);
  const [addSignaturePr, toggleAddSignaturePr] = useState(false);
  const [data2, setData2] = useState<FR | null>(null);
  const [openPrintFr, setOpenPrintFr] = useState(false);

  const [IRO, setIRO] = useState<any>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: 'Division',
    // purposeWorker: {},
    status: FRLifeCycleStates.FR_APPROVED,
    kind: 'IRO',
    sanctionedAmount: 0,
    sanctionedAsPer: '',
    sanctionedBank: '',
    sourceOfAccount: '',
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
    releaseAmount: '',
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
    billAttachment: [],
    createdAt: moment(),
    updatedAt: moment(),
    signature: {},
    specialsanction: '',
    beneficiaryName: '',
  });

  const user = useAuth();
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [reasonForRevertToDivision, setReasonForRevertToDivision] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [viewFileUploaderAppl, setViewFileUploaderAppl] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [attachmentsAppl, setAttachmentsAppl] = useState<FileObject[]>([]);
  const [divisions, setDivisions] = useState<Division | null>(null);
  const [rejectDialog, setrejectDialog] = useState(false);
  const [reverDialog, setRevertDialog] = useState(false);
  const [reasonForReject, setReasonForReject] = useState<string | null>('');
  const [reasonForRevertToDiv, setReasonForRevertToDiv] = useState<string | null>('');
  const [reasonForRevert, setReasonForRevert] = useState<string | null>('');
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [newTest, setNewTest] = useState<IROrder[]>([]);
  const userPermissions = (user.user as User)?.permissions;


  let total = 0;
  IRO?.particulars?.forEach((particular: { sanctionedAmount: number }) => {
    if (particular?.sanctionedAmount) {
      total += Number(particular?.sanctionedAmount);
    }
  });
  const [openRelease, setOpenRelease] = useState(false);

  console.log(IRO, 'ORRO');
  const totalRequestedAmount = IRO?.particulars && IRO?.particulars.reduce((total: number, item: { requestedAmount: any}) => total + Number(item.requestedAmount), 0);
  const IROstatus = IROLifeCycleStates.getStatusNameByCodeTransaction(Number(IRO?.status));
  const [sanctionedAsPer, setSanctionedAsPer] = useState<ISanctionedAsPer[]>([]);
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
  };
  const [openLog, setOpenLog] = useState(false);
  console.log(props, 'IROstatus');

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   // Prevent changing the value when the up or down arrow key is pressed
  //   if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   }
  // };

  useEffect(() => {
    const ddata = SanctionedAsPerService.getAll().then((res) => {
      setSanctionedAsPer(res.data);
    });
    const divisionId = user?.user && user.user.division ? user.user.division : null;
    console.log(divisionId, 'divisionId');

    if (divisionId) {
      DivisionsServices.getDivisionById(divisionId?.toString()).then((res) => {
        setDivisions(res.data);
      });
    }
  }, []);
  useEffect(() => {
    if (!iroID) {
      throw new Error('IRO ID Missing in URL');
    }
    if (props.action ==='custom') {
      console.log('custom');
      IROServices.getByIdCustom(iroID).then((res) =>{
        setIRO(res.data);
        setData(res.data);
      }); // TODO: Implement REST API Call
    } else {
      IROServices.getById(iroID).then((res) =>{
        setIRO(res.data);
      }); // TODO: Implement REST API Call
    }
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
                        <TextField
                          label="IRO No"
                          value={IRO.IROno}
                          fullWidth
                          disabled
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      {props.action === 'custom' &&(

                        <Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            label={'FR No'}
                            value={IRO?.FRNumber}
                            autoComplete="off"
                            // onChange={(e) =>
                            //   props.onChange({
                            //     ...props.value,
                            //     FRNumber: e.target.value,
                            //   })
                            // }
                            variant="outlined"
                            fullWidth
                            disabled
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                              max: totalRequestedAmount,
                              min: 0,
                              step: 0.01, // Allows up to two decimal places
                            }}
                          // InputProps={{
                          //   startAdornment: <InputAdornment position="start">{ 'FRno'}</InputAdornment>,
                          // }}
                          />
                          {/* </Tooltip> */}
                        </Grid>
                      )}
                      {props.action =='custom' &&(

                        <Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            label={'Coordinator Name'}
                            value={IRO?.coordinatorName}
                            autoComplete="off"
                            // onChange={(e) =>
                            //   props.onChange({
                            //     ...props.value,
                            //     coordinatorName: e.target.value,
                            //   })
                            // }
                            variant="outlined"
                            fullWidth
                            disabled
                            InputLabelProps={{ shrink: true }}
                          />
                          {/* </Tooltip> */}
                        </Grid>
                      )}
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
                              getOptionLabel={(worker) => `${worker?.basicDetails.firstName} ${worker?.basicDetails?.lastName}`}
                              onChange={(selectedWorker) => {
                                // if (selectedWorker) {
                                //   setIRO({
                                //     ...IRO,
                                //     purposeWorker: selectedWorker,
                                //   });
                                // }
                              }}
                              //  }}
                              renderInput={(params) => <TextField {...params} label="Choose Worker" />}
                              fullWidth
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Raised By (Only Applicable For Delhi Staff)"
                              value={IRO.raisedBy}
                              // onChange={(e) =>
                              //   props.onChange({
                              //     ...props.value,
                              //     raisedBy: e.target.value,
                              //   })
                              // }
                              variant="outlined"
                              fullWidth
                              InputLabelProps={{ shrink: true }}

                              disabled
                              // sx={{
                              //   '& .MuiInputBase-input.Mui-disabled': {
                              //     WebkitTextFillColor: '#000', // text color
                              //     color: '#000',
                              //     opacity: 1,
                              //   },
                              //   '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                              //     borderColor: '#c4c4c4', // normal border color
                              //   },
                              //   '& .MuiInputLabel-root.Mui-disabled': {
                              //     color: 'rgba(0,0,0,0.6)',
                              //   },
                              // }}
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
                        <><Grid item xs={12} md={6}>
                          <Autocomplete
                            options={[]}
                            value={IRO?.purposeSubdivision}
                            getOptionLabel={(subDiv) => subDiv.name}
                            onChange={() => { } }
                            renderInput={(params) => <TextField {...params} label="Subdivision" />}
                            disabled />
                        </Grid><Grid item xs={12} md={6}>
                          <TextField
                            label="Division"
                            value={IRO.division?.details.name}
                            fullWidth
                            disabled
                            InputLabelProps={{
                              shrink: true,
                            }} />
                        </Grid></>
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
                                <TableCell align="center">Sanctioned Amount</TableCell>
                                <TableCell align="center">Sanctioned as per</TableCell>
                                <TableCell align="center">Application Reference No</TableCell>
                                {IRO.particulars?.some((e:any) => e.presidentSanctionAmt) && (
                                  <TableCell align="center">Pres Approved Amt</TableCell>
                                )}

                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {IRO?.particulars &&
                                IRO?.particulars.map((item: { _id: Key | null | undefined; attachment: SetStateAction<FileObject[]>; applicationAttachment: SetStateAction<FileObject[]>; applicationReferenceNo:any; mainCategory: string; subCategory1: string; subCategory2: string; subCategory3: string; narration: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; quantity: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; month: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; requestedAmount: number; sanctionedAmount: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; sanctionedAsPer: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }, index: number) => (
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
                                      {item.applicationAttachment &&(

                                        <IconButton
                                          onClick={() => {
                                            setViewFileUploaderAppl(true);
                                            setAttachmentsAppl(item.applicationAttachment);
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
                                    <TableCell align="center">{formatAmount((item as any).sanctionedAmount?.toFixed(2))}</TableCell>
                                    <TableCell align="center">{item.sanctionedAsPer}</TableCell>
                                    <TableCell align="center">{item.applicationReferenceNo}</TableCell>
                                    {(item as any).presidentSanctionAmt && <TableCell align="center">{(item as any).presidentSanctionAmt}</TableCell> }

                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      {props.action == 'custom' ?(
                        <Grid item xs={12} md={12}>
                          <span style={{ fontWeight: 600, fontSize: 20 }}> Sanctioned Details</span>
                        </Grid>
                      ):[]}
                      <Grid item xs={12} md={6}>
                        <TextField label="Requested Amount" InputLabelProps={{ shrink: true }} value={formatAmount(totalRequestedAmount.toFixed(2))} fullWidth disabled />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Sanctioned Amount"
                          type={'number'}
                          value={ IRO.sanctionedAmount ?? total.toFixed(2)}
                          onChange={(e) => {
                            if (IRO) {
                              // eslint-disable-next-line @typescript-eslint/naming-convention
                              setIRO((IRO: any) => ({
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
                            <MenuItem value={IRO?.sanctionedBank}>{IRO?.sanctionedBank}</MenuItem>
                            {IRO?.division?.DivisionBankFCRA?.bankName !='' || IRO?.division?.FCRABankDetails?.bankName!='' ? (
                              <MenuItem value={`FCRA-${IRO?.division?.DivisionBankFCRA?.beneficiary || IRO?.division?.FCRABankDetails?.beneficiary}`}>
    Division Bank FCRA - {IRO?.division?.DivisionBankFCRA?.beneficiary || IRO?.division?.FCRABankDetails?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.DivisionBankLocal?.bankName || IRO?.division?.localBankDetails?.bankName ? (
                              <MenuItem value={`Local Bank-${IRO?.division?.DivisionBankLocal?.beneficiary || IRO?.division?.localBankDetails?.beneficiary}`}>
    Division Bank Local - {IRO?.division?.DivisionBankLocal?.beneficiary || IRO?.division?.localBankDetails?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank1?.bankName || IRO?.division?.otherBankDetails?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 1-${IRO?.division?.BeneficiaryBank1?.beneficiary || IRO?.division?.otherBankDetails?.beneficiary}`}>
    Beneficiary Bank 1 - {IRO?.division?.BeneficiaryBank1?.beneficiary || IRO?.division?.otherBankDetails?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank2?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 2-${IRO?.division?.BeneficiaryBank2?.beneficiary}`}>
    Beneficiary Bank 2 - {IRO?.division?.BeneficiaryBank2?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank3?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 3-${IRO?.division?.BeneficiaryBank3?.beneficiary}`}>
    Beneficiary Bank 3 - {IRO?.division?.BeneficiaryBank3?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank4?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 4-${IRO?.division?.BeneficiaryBank4?.beneficiary}`}>
    Beneficiary Bank 4 - {IRO?.division?.BeneficiaryBank4?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank5?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 5-${IRO?.division?.BeneficiaryBank5?.beneficiary}`}>
    Beneficiary Bank 5 - {IRO?.division?.BeneficiaryBank5?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank6?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 6-${IRO?.division?.BeneficiaryBank6?.beneficiary}`}>
    Beneficiary Bank 6 - {IRO?.division?.BeneficiaryBank6?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank7?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 7-${IRO?.division?.BeneficiaryBank7?.beneficiary}`}>
    Beneficiary Bank 7 - {IRO?.division?.BeneficiaryBank7?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank8?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 8-${IRO?.division?.BeneficiaryBank8?.beneficiary}`}>
    Beneficiary Bank 8 - {IRO?.division?.BeneficiaryBank8?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank9?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 9-${IRO?.division?.BeneficiaryBank9?.beneficiary}`}>
    Beneficiary Bank 9 - {IRO?.division?.BeneficiaryBank9?.beneficiary}
                              </MenuItem>
                            ) : ''}

                            {IRO?.division?.BeneficiaryBank10?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 10-${IRO?.division?.BeneficiaryBank10?.beneficiary}`}>
    Beneficiary Bank 10 - {IRO?.division?.BeneficiaryBank10?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank10?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 11-${IRO?.division?.BeneficiaryBank11?.beneficiary}`}>
    Beneficiary Bank 11 - {IRO?.division?.BeneficiaryBank11?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank12?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 12-${IRO?.division?.BeneficiaryBank12?.beneficiary}`}>
    Beneficiary Bank 12 - {IRO?.division?.BeneficiaryBank12?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank13?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 13-${IRO?.division?.BeneficiaryBank13?.beneficiary}`}>
    Beneficiary Bank 13 - {IRO?.division?.BeneficiaryBank13?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank14?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 14-${IRO?.division?.BeneficiaryBank14?.beneficiary}`}>
    Beneficiary Bank 14 - {IRO?.division?.BeneficiaryBank14?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank15?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 15-${IRO?.division?.BeneficiaryBank15?.beneficiary}`}>
    Beneficiary Bank 15 - {IRO?.division?.BeneficiaryBank15?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank16?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 16-${IRO?.division?.BeneficiaryBank16?.beneficiary}`}>
    Beneficiary Bank 16 - {IRO?.division?.BeneficiaryBank16?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank17?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 17-${IRO?.division?.BeneficiaryBank17?.beneficiary}`}>
    Beneficiary Bank 17 - {IRO?.division?.BeneficiaryBank17?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank18?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 18-${IRO?.division?.BeneficiaryBank18?.beneficiary}`}>
    Beneficiary Bank 18- {IRO?.division?.BeneficiaryBank18?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank19?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 19-${IRO?.division?.BeneficiaryBank19?.beneficiary}`}>
    Beneficiary Bank 19 - {IRO?.division?.BeneficiaryBank19?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {IRO?.division?.BeneficiaryBank20?.bankName ? (
                              <MenuItem value={`Beneficiary Bank 20-${IRO?.division?.BeneficiaryBank20?.beneficiary}`}>
    Beneficiary Bank 20 - {IRO.division?.BeneficiaryBank20?.beneficiary}
                              </MenuItem>
                            ) : ''}
                            {/* {IRO?.division?.DivisionBankFCRA?.bankName || IRO?.division?.FCRABankDetails?.bankName ? <MenuItem value={IRO?.division?.FCRABankDetails?.bankName ? 'FCRA' : 'Division Bank FCRA'}>Division Bank FCRA - {IRO?.division?.DivisionBankFCRA?.beneficiary || IRO?.division?.FCRABankDetails?.beneficiary}</MenuItem> : '' }
                            {IRO?.division?.DivisionBankLocal?.bankName || IRO?.division?.localBankDetails?.bankName ? <MenuItem value={IRO?.division.localBankDetails?.bankName? 'Local Bank' :'Division Bank Local'}>Division Bank Local - {IRO?.division?.DivisionBankLocal?.beneficiary || IRO?.division?.localBankDetails?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank1?.bankName || IRO?.division?.otherBankDetails?.bankName? <MenuItem value={'Beneficiary Bank 1'}>Beneficiary Bank 1 - {IRO?.division?.BeneficiaryBank1?.beneficiary || IRO?.division?.otherBankDetails?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank2?.bankName? <MenuItem value={'Beneficiary Bank 2'}>Beneficiary Bank 2 - {IRO?.division?.BeneficiaryBank2?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank3?.bankName? <MenuItem value={'Beneficiary Bank 3'}>Beneficiary Bank 3 - {IRO?.division?.BeneficiaryBank3?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank4?.bankName? <MenuItem value={'Beneficiary Bank 4'}>Beneficiary Bank 4 - {IRO?.division?.BeneficiaryBank4?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank5?.bankName? <MenuItem value={'Beneficiary Bank 5'}>Beneficiary Bank 5 - {IRO?.division?.BeneficiaryBank5?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank6?.bankName? <MenuItem value={'Beneficiary Bank 6'}>Beneficiary Bank 6 - {IRO?.division?.BeneficiaryBank6?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank7?.bankName? <MenuItem value={'Beneficiary Bank 7'}>Beneficiary Bank 7 - {IRO?.division?.BeneficiaryBank7?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank8?.bankName? <MenuItem value={'Beneficiary Bank 8'}>Beneficiary Bank 8 - {IRO?.division?.BeneficiaryBank8?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank9?.bankName? <MenuItem value={'Beneficiary Bank 9'}>Beneficiary Bank 9 - {IRO?.division?.BeneficiaryBank9?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank10?.bankName? <MenuItem value={'Beneficiary Bank 10'}>Beneficiary Bank 10 - {IRO?.division?.BeneficiaryBank10?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank11?.bankName? <MenuItem value={'Beneficiary Bank 11'}>Beneficiary Bank 11 - {IRO?.division?.BeneficiaryBank11?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank12?.bankName? <MenuItem value={'Beneficiary Bank 12'}>Beneficiary Bank 12 - {IRO?.division?.BeneficiaryBank12?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank13?.bankName? <MenuItem value={'Beneficiary Bank 13'}>Beneficiary Bank 13 - {IRO?.division?.BeneficiaryBank13?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank14?.bankName? <MenuItem value={'Beneficiary Bank 14'}>Beneficiary Bank 14 - {IRO?.division?.BeneficiaryBank14?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank15?.bankName? <MenuItem value={'Beneficiary Bank 15'}>Beneficiary Bank 15 - {IRO?.division?.BeneficiaryBank15?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank16?.bankName? <MenuItem value={'Beneficiary Bank 16'}>Beneficiary Bank 16 - {IRO?.division?.BeneficiaryBank16?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank17?.bankName? <MenuItem value={'Beneficiary Bank 17'}>Beneficiary Bank 17 - {IRO?.division?.BeneficiaryBank17?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank18?.bankName? <MenuItem value={'Beneficiary Bank 18'}>Beneficiary Bank 18 - {IRO?.division?.BeneficiaryBank18?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank19?.bankName? <MenuItem value={'Beneficiary Bank 19'}>Beneficiary Bank 19 - {IRO?.division?.BeneficiaryBank19?.beneficiary}</MenuItem> :'' }
                            {IRO?.division?.BeneficiaryBank20?.bankName? <MenuItem value={'Beneficiary Bank 20'}>Beneficiary Bank 20 - {IRO?.division?.BeneficiaryBank20?.beneficiary}</MenuItem> :'' } */}

                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                      {props.action == 'custom' ?(

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            disabled
                            label="Beneficiary Name"
                            value={IRO?.beneficiaryName || ''}
                            onChange={(e) =>
                              setIRO({
                                ...IRO,
                                beneficiaryName: e.target.value,
                              })
                            }
                          >

                            {/* Add MenuItem options here */}
                          </TextField>
                        </Grid>
                      ):[]}

                      {props.action == 'custom' ?(

                        <><Grid item xs={12} md={12}>
                          <span style={{ fontWeight: 600, fontSize: 20 }}> Bank Details</span>
                        </Grid><Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            label="Bank name"
                            value={(IRO?.bankName)}
                            autoComplete='off'
                            onChange={(e) => props.onChange({
                              ...props.value,
                              bankName: String(e.target.value),
                            })}

                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            disabled
                            inputProps={{
                              max: totalRequestedAmount,
                              min: 0,
                              step: 0.01,
                            }} />

                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            label="Branch name"
                            value={(IRO?.branchName)}
                            autoComplete='off'
                            onChange={(e) => props.onChange({
                              ...props.value,
                              branchName: String(e.target.value),
                            })}
                            disabled
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}

                            inputProps={{
                              max: totalRequestedAmount,
                              min: 0,
                              step: 0.01,
                            }} />
                          {/* </Tooltip> */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            label="IFSC Code"
                            value={(IRO?.ifscCode)}
                            autoComplete='off'
                            onChange={(e) => props.onChange({
                              ...props.value,
                              ifscCode: String(e.target.value),
                            })}
                            disabled
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}

                            inputProps={{
                              max: totalRequestedAmount,
                              min: 0,
                              step: 0.01,
                            }} />
                          {/* </Tooltip> */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                          <TextField
                            disabled
                            label="Account number"
                            value={(IRO?.accNumber)}
                            autoComplete='off'
                            onChange={(e) => props.onChange({
                              ...props.value,
                              accNumber: String(e.target.value),
                            })}

                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}

                            inputProps={{
                              max: totalRequestedAmount,
                              min: 0,
                              step: 0.01,
                            }} />
                          {/* </Tooltip> */}
                        </Grid>

                        </>
                      ):[]}
                      {props.action == 'custom' ?(

                        <Grid item xs={12} md={12}>
                          <span style={{ fontWeight: 600, fontSize: 20 }}> Amount Transfer Details
                          </span>
                        </Grid>
                      ):[]}
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="sourceOfAccount">Source Of Account</InputLabel>
                          <Select
                            labelId="sourceOfAccount"
                            label="sourceOfAccount"
                            value={IRO?.sourceOfAccount ?? null}
                            disabled

                            onChange={(e) =>
                              setIRO({
                                ...IRO,
                                sourceOfAccount: e.target.value ?? '',
                              })
                            }
                          >
                            <MenuItem value={'FCRA'}>FCRA</MenuItem>
                            <MenuItem value={'Local'}>Local</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                      &nbsp;
                       &nbsp;
                      &nbsp;
                       &nbsp;
                      {IRO?.reasonForRevertToDivision && (
                        <> <br /><span style={{ fontWeight: 'bold', color: 'red' }}> Reason For Revert To Division: </span><span style={{ color: 'red' }}>{IRO?.reasonForRevertToDivision ?? 'N/A'}</span></>

                      )}
                      {props.action === 'custom' ?(
                        <><Grid item xs={12} md={6}>
                          <TextField
                            label="Amount Transferred"
                            type="number"
                            disabled
                            value={IRO?.transferredAmount}
                            onChange={(e) =>
                              props.onChange({
                                ...props.value,
                                transferredAmount: String(e.target.value),
                              })
                            }
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // inputProps={{
                            //   max: (props.value as any)?.releaseAmount?.releaseAmount ?? 0, min: 0, step: 0.01,
                            //   onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                            //     event.preventDefault();
                            //     event.currentTarget.blur();
                            //   },
                            // }}
                            variant="outlined"

                            required />
                        </Grid><Grid item xs={12} md={4}>
                          <DatePicker
                            label="Amount Transferred Date"
                            value={Data?.transferredDate}
                            format="DD/MM/YYYY"
                            sx={{ width: '100%' }}
                            slotProps={{
                              textField: {
                                required: true,
                              },
                            }}
                            disabled
                            onChange={(newValue) =>
                              props.onChange({
                                ...props?.value,
                                transferredDate: newValue, // Use the newValue provided by DatePicker
                              })
                            }
                          />

                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <TextField
                            label="Payment Method"
                            value={Data?.modeOfPayment}
                            variant="outlined"
                            fullWidth
                            disabled
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <TextField
                            label="Transaction No:"
                            value={Data?.transactionNumber}
                            onChange={(e) =>
                              props.onChange({
                                ...props.value,
                                transactionNumber: String(e.target.value),
                              })
                            }
                            disabled
                            variant="outlined"
                            fullWidth
                            // required
                            InputLabelProps={{
                              shrink: !!Data?.transactionNumber, // Explicitly control shrinking
                            }}

                          />

                        </Grid>
                        {props.action == 'custom' &&(
                          <>

                            <Grid item xs={12}>
                              <span style={{ fontWeight: 600, fontSize: 20 }}>
                  Adjustment Details
                              </span>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <TextField
                                label="Adjusted IRO"
                                type="tel"
                                value={IRO?.adjustedIro}
                                onChange={(e) =>
                                  props.onChange(() => ({
                                    ...props?.value,
                                    adjustedIro: e.target?.value,
                                  }))
                                }
                                disabled
                                InputLabelProps={{
                                  shrink: Boolean(IRO?.adjustedIro),
                                }}
                                fullWidth
                                inputProps={{
                                  onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                                    event.preventDefault();
                                    event.currentTarget.blur();
                                  },
                                }}
                                variant="outlined"
                                // disabled={props.action !== 'add'}

                                // required
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <TextField
                                label="Adjusted Amount"
                                type="number"
                                value={IRO?.adjustedAmount }
                                onChange={(e) =>
                                // Number(e.target.value) <= (releaseAmount.adjustedAmount ?? 0) &&
                                  props.onChange(() => ({
                                    ...props?.value,
                                    adjustedAmount: Number(e.target?.value),
                                  }))
                                }
                                disabled
                                fullWidth
                                InputLabelProps={{
                                  shrink: Boolean(IRO?.adjustedAmount),
                                }}
                                variant="outlined"
                                // disabled={props.action !== 'add'}

                                // required
                              />
                            </Grid>
                            <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="closingBalance"
                                    checked={!!IRO?.closingBalance}
                                    onChange={(e) =>
                                      props.onChange(() => ({
                                        ...props?.value,
                                        closingBalance: e.target.checked,
                                      }))
                                    }
                                    disabled
                                    color="primary"
                                  />
                                }
                                label="Closing Balance"
                              />
                            </Grid>
                            {IRO?.closingBalance &&(

                              <Grid item xs={12} md={3}>
                                <TextField
                                  label="Closing Balance Remark"
                                  type="tel"
                                  value={IRO?.closingBalanceRemark }
                                  onChange={(e) =>
                                    props.onChange(() => ({
                                      ...props?.value,
                                      closingBalanceRemark: e.target.value,
                                    }))
                                  }
                                  disabled
                                  fullWidth
                                  variant="outlined"
                                  // disabled={props.action !== 'add'}

                                  // required
                                />
                              </Grid>
                            )}
                          </>
                        )}

                        {props.action == 'custom' ?(

                          <Grid item xs={12} md={12}>
                            <span style={{ fontWeight: 600, fontSize: 20 }}> Signature and Manager details
                            </span>
                          </Grid>
                        ):[]}
                        <Grid item xs={12} md={6} lg={4}>
                          <TextField
                            label="Office Manager Name"
                            value={Data?.officeManagerName}
                            onChange={(e) =>
                              props.onChange({
                                ...props.value,
                                officeManagerName: String(e.target.value),
                              })
                            }
                            disabled
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                              shrink: !!Data?.officeManagerName, // Explicitly control shrinking
                            }}
                            // required

                          />

                        </Grid>
                        {props.action == 'custom' &&(

                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Prepared By"
                              value={IRO.preparedBy}
                              onChange={(e) =>
                                setIRO({
                                  ...IRO,
                                  preparedBy: String(e.target.value),
                                })
                              }
                              disabled
                              variant="outlined"
                              fullWidth
                              InputLabelProps={{
                                shrink: true, // Explicitly control shrinking
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} md={4} lg={4}>
                          <Button variant="contained" onClick={() => setShowFileUploaderCustomOfficeMngr(true)} startIcon={<AttachmentIcon />}>
                                  Office manager Sign
                          </Button>
                        </Grid>
                        {props.action === 'custom'&&IRO?.specialSanction as any &&(
                          <Grid item xs={12} md={2} lg={4}>
                            <Button variant="contained" onClick={() => toggleAddSignaturePr(true)} startIcon={<AttachmentIcon />}>
                                              President details
                            </Button>
                          </Grid>
                        )}
                        <Grid item xs={12} md={6} lg={2}>

                        </Grid>
                        {props.action =='customIRO' || props.action == 'custom'&&(
                          <>
                            <Grid item xs={12} md={4}>
                              <Button variant="contained" onClick={() => setShowFileUploaderCustom(true)} startIcon={<AttachmentIcon />}>
                                  Attachments
                              </Button>
                              <FormControlLabel
                                label="President sanction"
                                checked={IRO?.specialSanction as any || false} // Ensure it's always a boolean
                                // onChange={(e:any) =>
                                //   props.onChange({
                                //     ...props.value,
                                //     specialSanction: e.target.checked, // Directly assign boolean value
                                //   })
                                // }
                                sx={{ pl: 2 }}
                                control={<Checkbox />}
                              />

                            </Grid><br /><Grid>

                            </Grid></>
                        )}
                        </>
                      ):''}
                      {/* <Grid item xs={12} md={6}>
                        <Autocomplete
                          value={IRO?.sanctionedAsPer as ISanctionedAsPer}
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
                      </Grid> */}
                      <Grid item xs={12}>
                        {IRO.specialsanction =='Yes'&&(

                          <Button variant="contained" color="primary"
                            onClick={() => {
                              FRServices.getAllOptimizedById(IRO?.FR).then((res)=>{
                                console.log(res.data, 'daa98');
                                setData2(res.data);
                              });
                              setOpenPrintFr(true);
                              setTimeout(() => {
                                setOpenPrintFr(false);
                              }, 2000);
                            }}>
                            Auth letter print
                          </Button>
                        )}
                        {IRO.reasonForRevertIRO && <><span style={{ fontWeight: 'bold', color: 'red' }}> Revert reason: </span><span style={{ color: 'red' }}>{IRO.reasonForRevertIRO ?? 'N/A'}</span></> }
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
                        {IRO.reasonForRejectIRO &&
                        <><span style={{ fontWeight: 'bold', color: 'red' }}> Rejection reason: </span><span style={{ color: 'red' }}>{IRO.reasonForRejectIRO ?? 'N/A'}</span></>
                        }

                        &nbsp;
                        <div style={{ float: 'right' }}>
                          <Button variant="outlined" color="primary" startIcon={<HistoryIcon/>}
                            onClick={async ()=>setOpenLog(true)}>
                            Log
                          </Button>
                           &nbsp;
                          {(IRO.status === IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE || IRO.status === IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT) &&
  (hasPermissions(['FCRA_ACCOUNTS_ACCESS']) || hasPermissions(['LOCAL_ACCOUNT_ACCESS']) || hasPermissions(['ADMIN_ACCESS'])) && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={async () => {
                                setOpenRelease(true);
                                setReleaseAmountIROs([IRO]);
                              }}
                            >
      Release amount
                            </Button>
                          )
                          }

                           &nbsp;
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
                            <>Indian Evangelical Team
                            View And Manage IRO
                            Last Login: 11:05 AM 03/02/2025

                            Joyal Mock Mathew
                            IT Division

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

                          {IROstatus == 'WAITING_FOR_OFFICE_MNGR'|| IROstatus == 'IRO_IN_PROCESS' ? (
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
                                        setrejectDialog(true);
                                        // const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
                                        // IROServices.reject(iroID as string)
                                        //   .then((res) => {

                                        //   });

                                        // // if (props.onSubmit) {
                                        // //   const updatedValue = { ...IRO, status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR }; // Create a new object with updated status
                                        // //   props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                                        // // }
                                        // setTimeout(() => {
                                        //   closeSnackbar(rejectionSnack);
                                        //   const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                                        //   setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                        // }, 500);
                                      }}
                                    >
                                      Disapprove
                                    </Button>
                                    &nbsp;
                                    <Button
                                      variant="contained"
                                      color="success"
                                      onClick={() => {
                                        const approvalSnack = enqueueSnackbar({ message: 'Approving IRO', variant: 'info' });
                                        IROServices.officeManagerApprove(iroID as string)
                                          .then((res) => {
                                            navigate('/IRO/office_approve');
                                            window.location.reload();
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
                                      Approve
                                    </Button>
                                  </>
                                }
                              />
                              &nbsp;
                            </>
                          ) : null}
                          {IROstatus == 'WAITING_FOR_ACCOUNTS_STATE' ? (
                            <>
                              &nbsp;
                              {userPermissions?.FCRA_ACCOUNTS_ACCESS ?(

                                <PermissionChecks
                                  permissions={['FCRA_ACCOUNTS_ACCESS']}
                                  granted={
                                    <>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                          setRevertDialog(true);
                                          // const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
                                          // IROServices.revert(iroID as string, '')
                                          //   .then((res) => {
                                          //     if (res.data) {
                                          //       navigate('/iro');
                                          //     }
                                          //   });
                                          // setTimeout(() => {
                                          //   closeSnackbar(rejectionSnack);
                                          //   const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                                          //   setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                          // }, 500);
                                        }}
                                      >
                                        Edit Request
                                      </Button>
                                      &nbsp;
                                      {/* <Button
                                        variant="contained"
                                        color="success"
                                        type='submit'
                                        onClick={() => {
                                          const approvalSnack = enqueueSnackbar({ message: 'Approving IRO', variant: 'info' });
                                          IROServices.accountManagerApprove(iroID as string)
                                            .then((res) => {
                                              console.log('new heh');
                                              if (res.data) {
                                                navigate('/iro');
                                              }
                                            });

                                          setTimeout(() => {
                                            closeSnackbar(approvalSnack);
                                            const approvedSnack = enqueueSnackbar({ message: 'Verified!', variant: 'success' });
                                            setTimeout(() => closeSnackbar(approvedSnack), 500);
                                          }, 500);
                                        }}
                                      >
                                        Verify
                                      </Button> */}
                                    </>
                                  }
                                />
                              ):(
                                <PermissionChecks
                                  permissions={['LOCAL_ACCOUNT_ACCESS']}
                                  granted={
                                    <>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                          setRevertDialog(true);
                                        }}
                                      >
                                        Edit Request
                                      </Button>
                                      &nbsp;
                                    </>
                                  }
                                />
                              )}
                              &nbsp;
                            </>
                          ) : null}
                          {IROstatus == 'WAITTING_FOR_RELEASE_AMOUNT' ? (
                            <>
                              &nbsp;

                              <PermissionChecks
                                permissions={['ACCOUNTS_MNGR_ACCESS']}
                                granted={
                                  <>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        setRevertDialog(true);
                                        // const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
                                        // IROServices.revert(iroID as string, '')
                                        //   .then((res) => {
                                        //     if (res.data) {
                                        //       navigate('/iro');
                                        //     }
                                        //   });

                                        // setTimeout(() => {
                                        //   closeSnackbar(rejectionSnack);
                                        //   const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                                        //   setTimeout(() => closeSnackbar(rejectedSnack), 500);
                                        // }, 500);
                                      }}
                                    >
                                      Edit Request
                                    </Button>
                                    &nbsp;
                                    {/* <Button
                                      variant="contained"
                                      color="success"
                                      type='submit'
                                      onClick={() => {
                                        const approvalSnack = enqueueSnackbar({ message: 'Approving IRO', variant: 'info' });
                                        IROServices.accountManagerApprove(iroID as string)
                                          .then((res) => {
                                            console.log('new heh');
                                            if (res.data) {
                                              navigate('/iro');
                                            }
                                          });

                                        setTimeout(() => {
                                          closeSnackbar(approvalSnack);
                                          const approvedSnack = enqueueSnackbar({ message: 'Verified!', variant: 'success' });
                                          setTimeout(() => closeSnackbar(approvedSnack), 500);
                                        }, 500);
                                      }}
                                    >
                                      Verify
                                    </Button> */}
                                  </>
                                }
                              />
                              &nbsp;
                            </>
                          ) : null}

                          {IROstatus == 'WAITING_FOR_OFFICE_MNGR' || IROstatus == 'WAITING_FOR_ACCOUNTS_STATE'|| IROstatus == 'WAITTING_FOR_RELEASE_AMOUNT'?(
                            <>
                              &nbsp;
                              <PermissionChecks
                                permissions={['MANAGE_IRO']}
                                granted={
                                  <>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        setReasonForRevertToDivision(true);
                                      }}
                                    >
                                      Revert to division
                                    </Button>
                                    &nbsp;
                                  </>
                                }
                              />
                              &nbsp;
                            </>

                          ):''}

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
            <ReleaseAmount action={IRO.status ==IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE? 'add': 'manage'} onClose={() => setOpenRelease(false)} open={openRelease} data={releaseAmountIROs?.length === 0 ? newTest : releaseAmountIROs} />

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
      <Dialog open={addSignaturePr} sx={{ width: 400, margin: '0 auto' }} >
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
                  setPresidentIROName(true);
                }}
              >
                {' '}
                    President Name
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 260 }}
                onClick={() => {
                  setePresidentIRO(true);
                }}
              >
                {' '}
                President Sign
              </Button>
            </Grid>


            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  toggleAddSignaturePr(false);
                }}
                sx={{ marginBottom: 3, width: 260 }}
                // endIcon={<CloseIcon />}
              >
                        Close
              </Button>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showPresidentIROName}
        onClose={() => setPresidentIROName(false)}
      >
        <DialogTitle>President Name</DialogTitle>
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
            value={IRO?.president as unknown as any}
            onChange={(e) =>
              props.onChange({
                ...props.value,
                president: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setPresidentIROName(false)}>Cancel</Button>
          <Button onClick={()=>setPresidentIROName(false)}>Add</Button>
        </DialogActions>
      </Dialog>
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
      <Dialog open={Boolean(data2)} onClose={() => setData(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Fr</DialogTitle>
        <DialogContent>
          <Container>
     Download the FR Auth Letter for {data2?.FRno}
            <br />

            {data2 && (
              <BlobProvider document={<SanctionLetter data={data2 as any} />}>
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
              setData2(null);
            }}
            variant="text"
          >
                        Cancel
          </Button>
        </DialogActions>
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
        // deleteFile={(fileId: string) => {
        //   // setNewParticular((particularDetails) => ({
        //   //   ...particularDetails,
        //   //   attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
        //   // }));
        //   return FileUploaderServices.deleteFile(fileId);
        // }}
        getFiles={attachments}
      />
      <FileUploader
        title="Appl. Attachments"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={viewFileUploaderAppl}
        action="view"
        onClose={() => setViewFileUploaderAppl(false)}
        // getFiles={TestServices.getBills}
        // deleteFile={(fileId: string) => {
        //   // setNewParticular((particularDetails) => ({
        //   //   ...particularDetails,
        //   //   attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
        //   // }));
        //   return FileUploaderServices.deleteFile(fileId);
        // }}
        getFiles={attachmentsAppl}
      />
      {iroID&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={iroID}/>}
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
            onChange={(e)=>setReasonForReject(e.target?.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setrejectDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>

          <Button
            variant="contained"
            disabled={reasonForReject==''}
            onClick={() => {
              const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
              IROServices.reject(iroID as string, reasonForReject as string)
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
              false;
              setrejectDialog(false);
              navigate('/IRO/office_approve');
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
                            submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reasonForRevertToDivision} fullWidth maxWidth="md">
        <DialogTitle> Reason for revert to division</DialogTitle>
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
            placeholder="Reason for revert"
            multiline
            value={reasonForRevertToDiv}
            onChange={(e)=>setReasonForRevertToDiv(e.target?.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setReasonForRevertToDivision(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>

          <Button
            variant="contained"
            disabled={reasonForRevertToDiv==''}
            onClick={() => {
              const rejectionSnack = enqueueSnackbar({ message: 'Reverted to Division ', variant: 'success' });
              IROServices.revertToDivision(iroID as string, reasonForRevertToDiv as string)
                                        .then((res) => {
                                          if (IROstatus == 'WAITING_FOR_ACCOUNTS_STATE') {
                                            navigate('/iro/release_amount');
                                          } else if (IROstatus == 'WAITTING_FOR_RELEASE_AMOUNT') {
                                            navigate('/iro/release_amount_fm_request');
                                          } else if (IROstatus == 'WAITING_FOR_OFFICE_MNGR') {
                                            navigate('/iro/office_approve');
                                          }
                                        });
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
                            submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reverDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason for edit request
            <Button
              variant="contained"
              onClick={() => {
                setRevertDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>
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
            id="revertForReject"
            placeholder="Reason for edit request"
            multiline
            value={reasonForRevert}
            onChange={(e)=>setReasonForRevert(e.target?.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setRevertDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            disabled={reasonForRevert==''}
            onClick={() => {
              const rejectionSnack = enqueueSnackbar({ message: 'Rejecting IRO', variant: 'info' });
              IROServices.revert(iroID as string, reasonForRevert as string)
                                          .then((res) => {

                                          });

              setTimeout(() => {
                closeSnackbar(rejectionSnack);
                const rejectedSnack = enqueueSnackbar({ message: 'Reverted!', variant: 'success' });
                setTimeout(() => closeSnackbar(rejectedSnack), 500);
              }, 500);
              false;
              setrejectDialog(false);
              if (IROstatus == 'WAITING_FOR_ACCOUNTS_STATE') {
                navigate('/iro/release_amount');
              } else if (IROstatus == 'WAITTING_FOR_RELEASE_AMOUNT') {
                navigate('/iro/release_amount_fm_request');
              }
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
                            submit
          </Button>
        </DialogActions>
      </Dialog>
      <FileUploader
        title="Attachments"
        action="add"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        // accept={['video/*']}
        open={eSignPresidentIRO}
        onClose={() => setePresidentIRO(false)}
        // getFiles={TestServices.getBills}
        getFiles={IRO?.presidentSign}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
            // console.log(res.data._id);

            props.onChange({
              ...props.value,
              presidentSign: [...(props.value.presidentSign || []), res.data],
            });
            return res;
          });
        }}
        // renameFile={(fileId: string, newName: string) => {
        //   setNewParticular((particularDetails) => ({
        //     ...particularDetails,
        //     attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
        //   }));
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            attachment: props.value.attachment.filter((file: any) => file._id !== fileId),
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Attachments"
        action="view"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderCustom}
        onClose={() => setShowFileUploaderCustom(false)}
        // getFiles={TestServices.getBills}
        getFiles={Data?.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'FR/Particulars', file.name).then((res) => {
            // console.log(res.data._id);

            props.onChange({
              ...props.value,
              attachment: [...(props.value.attachment || []), res.data],
            });
            return res;
          });
        }}
        // renameFile={(fileId: string, newName: string) => {
        //   setNewParticular((particularDetails) => ({
        //     ...particularDetails,
        //     attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
        //   }));
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            attachment: props.value.attachment.filter((file: { _id: string }) => file._id !== fileId),
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Attachments"
        action="view"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderCustomOfficeMngr}
        onClose={() => setShowFileUploaderCustomOfficeMngr(false)}
        // getFiles={TestServices.getBills}
        getFiles={[Data?.officeManagerSign]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'FR/Particulars', file.name).then((res) => {
            // console.log(res.data._id);

            props.onChange({
              ...props.value,
              officeManagerSign: [...(props.value?.officeManagerSign || []), res.data],
            });
            return res;
          });
        }}
        // renameFile={(fileId: string, newName: string) => {
        //   setNewParticular((particularDetails) => ({
        //     ...particularDetails,
        //     attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
        //   }));
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            attachment: props.value.attachment.filter((file: { _id: string }) => file._id !== fileId),
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </CommonPageLayout>
  );
};

export default ViewIRO;
