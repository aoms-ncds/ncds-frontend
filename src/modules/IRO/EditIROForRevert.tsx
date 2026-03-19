/* eslint-disable max-len */
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AttachFile as AttachmentIcon, Send as SendIcon, Edit as EditIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import { monthNames, purposes } from '../FR/extras/FRConfig';
import FRLifeCycleStates from '../FR/extras/FRLifeCycleStates';
import FRServices from '../FR/extras/FRServices';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import moment from 'moment';
import IROServices from './extras/IROServices';
import { PDFDownloadLink } from '@react-pdf/renderer';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import MessageItem from '../../components/MessageItem';
import SanctionedAsPerService from '../Settings/extras/SanctionedAsPerService';
import AddIcon from '@mui/icons-material/Add';
import WorkersServices from '../Workers/extras/WorkersServices';
import { useAuth } from '../../hooks/Authentication';
import DivisionsServices from '../Divisions/extras/DivisionsServices';

const EditIROForRevert = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  console.log(user, 'user');

  // const [purposes, setPurposes] = useState<FRPurpose[]>();
  // const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [particulars, setParticulars] = useState<Particular[]>([]);
  const { iroID } = useParams();
  const [isCoordinator, setisCoordinator] = useState<any>(false);

  const [IRO, setIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: 'Division',
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
  });
  const [showAddParticularDialog, setShowAddParticularDialog] = useState(false);
  const [newParticular, setNewParticular] = useState<Particular>({
    _id: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    month: '',
    narration: '',
    attachment: [],
    sanctionedAsPer: '',
  });
  interface AsPer{
    asPer:[];
  }
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<SubCategory1 | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<SubCategory2 | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  const [sanctionedAsPer, setSanctionedAsPer] = useState<AsPer[]>([]);
  let asPer : any = [];
  const [workers, setWorkers] = useState<IWorker[] | Staff[]>();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>();

  useEffect(() => {
    if (IRO.purpose === 'Worker') {
      WorkersServices.getWorkersByDivision()
        .then((res) => {
          setWorkers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (IRO.purpose === 'Subdivision') {
      WorkersServices.getSubDivisionsByDivisionId()
        .then((res) => {
          setSubDivisions(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [IRO.purpose]);
  useEffect(() => {
    const ddata = SanctionedAsPerService.getAll().then((res) => {
      asPer = res.data.map((e:AsPer)=>e.asPer ); setSanctionedAsPer(asPer);

      // setSanctionedAsPer(res.data);
    });

    DivisionsServices.isCoordinator()
    .then((res) => {
      setisCoordinator(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);
  const [open, setOpen] = useState(false);
  console.log(newParticular, 'dq');
  // console.log(props, 'wdqw');

  let total = 0;
  IRO?.particulars?.forEach((particular) => {
    if (particular?.sanctionedAmount) {
      total += particular?.sanctionedAmount;
    }
  });
  console.log(total, 'total');
  const handleClickOpen = (particular: Particular) => {
    setOpen(true);
    // setSelectedParticularIndex(index);
    setNewParticular(particular);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editParticular = (particular: Particular) => {
    // setParticularDialog('edit');
    setShowAddParticularDialog(true);
    setNewParticular(particular);
  };

  const [showFileUploader, setShowFileUploader] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [mainCategories, setMainCategories] = useState<MainCategory[]>();

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
  console.log(IRO.purposeWorker, 'ziro');

  useEffect(() => {
    const selectedMainCategoryObj = mainCategories?.find((category) => category.name === IRO.mainCategory);
    setSelectedMainCategory(selectedMainCategoryObj);

    FRServices.getMainCategory()
      .then((res) => {
        setMainCategories(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    if (IRO.particulars) {
      setParticulars(IRO.particulars);
    }
  }, [IRO.particulars]);
  useEffect(() => {
    setSelectedMainCategory(() => mainCategories?.find((item) => item.name == newParticular.mainCategory));
  }, [newParticular]);
  useEffect(() => {
    setSelectedSubCategory1(() => selectedMainCategory?.subcategory1.find((item) => item.name == newParticular.subCategory1) ?? null);
  }, [selectedMainCategory]);
  useEffect(() => {
    setSelectedSubCategory2(() => selectedSubCategory1?.subcategory2.find((item) => item.name == newParticular.subCategory2) ?? null);
  }, [selectedSubCategory1]);
  useEffect(() => {
    setSelectedSubCategory3(() => selectedSubCategory2?.subcategory3.find((item) => item.name == newParticular.subCategory3) ?? null);
  }, [selectedSubCategory2]);

  useEffect(() => {
    if (!iroID) {
      throw new Error('IRO ID Missing in URL');
    }
    IROServices.getById(iroID).then((res) =>{
      console.log(res.data, 'frdata');
      setIRO(res.data);
    } ); // TODO: Implement REST API Call
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
                  IROServices.updateIRO(iroID ?? '', IRO, true)
                    .then((res) => {
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
                  <Grid item xs={12} md={6}>
                    <DatePicker label="Date" value={IRO?.IRODate} format="DD/MM/YYYY" slotProps={{ textField: { fullWidth: true } }} disabled={IROLifeCycleStates.REOPENED ==IRO.status || isCoordinator} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={IRO?.purpose}
                      options={purposes ?? []}
                      getOptionLabel={(requisition) => requisition ?? ''}
                      // onChange={
                      //   () => { }
                      //   // if (selectedPurpose) {
                      //   //  setIRO({
                      //   //     ...IRO,
                      //   //     purpose: selectedPurpose as FRPurpose,
                      //   //   });
                      //   // }
                      // }
                      onChange={(_e, selectedPurpose) => {
                        if (selectedPurpose) {
                          setIRO({
                            ...IRO,
                            purpose: selectedPurpose as FRPurpose,
                          });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Requisition For" />}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  {IRO?.purpose === 'Worker' ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                          <Autocomplete<IWorker | Staff>
                            value={IRO.purposeWorker ?? null}
                            options={(workers ?? [])}
                            getOptionLabel={(workers) => `${workers?.basicDetails.firstName?? ''} ${workers?.basicDetails?.middleName ?? ''} ${workers.basicDetails.lastName?? ''}`}
                            onChange={(_e, selectedWorker) => {
                              if (selectedWorker) {
                                setIRO({
                                  ...IRO,
                                  purposeWorker: selectedWorker,
                                });
                              }
                            }}
                            renderInput={(params) => <TextField {...params} label="Choose Worker" required />}
                            fullWidth
                          />
                        </Grid>
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
                        options={subDivisions ?? []}
                        value={IRO.purposeSubdivision ? IRO.purposeSubdivision : undefined}
                        getOptionLabel={(subDiv) => subDiv.name}
                        onChange={(event, newVal) =>
                          setIRO({ ...IRO, purposeSubdivision: newVal ?? undefined })
                        }
                        disabled={IROLifeCycleStates.REOPENED ==IRO.status}
                        renderInput={(params) => <TextField {...params} label="Subdivision" />}
                      />
                    </Grid><Grid item xs={12} md={6}>
                      <TextField
                        label="Division"
                        value={IRO.division?.details?.name}
                        fullWidth
                        disabled={IROLifeCycleStates.REOPENED ==IRO.status}
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
                        disabled={IROLifeCycleStates.REOPENED !==IRO.status}/>
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
                        disabled={IROLifeCycleStates.REOPENED !==IRO.status}
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
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {IRO?.particulars &&
                            IRO?.particulars?.map((item, index) => (
                              <TableRow key={item._id} >
                                <TableCell component="th" sx={{ display: 'flex' }}>
                                  {IROLifeCycleStates.REVERTED_TO_DIVISION == IRO.status || IROLifeCycleStates.REOPENED == IRO.status? (
                                  // Content to render if the user has access
                                    <IconButton>
                                      <EditIcon onClick={() => editParticular(item)} />
                                    </IconButton>
                                  ): []}
                                  {/* <IconButton>
                                    <AddIcon onClick={() => handleClickOpen(item)} />
                                  </IconButton> */}
                                  <IconButton
                                    onClick={() => {
                                      setShowFileUploader(true);
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
                                <TableCell align="center">{item.requestedAmount?.toFixed(2)}</TableCell>
                                <TableCell align="center">{item.sanctionedAmount}</TableCell>
                                <TableCell align="center">{item.sanctionedAsPer}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Requested Amount" InputLabelProps={{ shrink: true }} value={totalRequestedAmount.toFixed(2)} fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label="Sanctioned Amount"
                      type={'number'}
                      value={IRO?.sanctionedAmount?.toFixed(2) ?? total.toFixed(2)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                      autoComplete='off'
                      onChange={(e) => {
                        if (totalRequestedAmount) {
                          setIRO({
                            ...IRO,
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
                      //   max: totalRequestedAmount, min: 0, onWheel: handleWheel,
                      // }}
                      inputProps={{
                        max: totalRequestedAmount,
                        min: 0,
                        step: 0.01, // Allows up to two decimal places
                        onWheel: handleWheel,
                      }}
                      disabled
                    // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                    />
                    {/* </Tooltip> */}
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
                        {/* <MenuItem value={'FCRA'}>FCRA</MenuItem>
                        <MenuItem value={'Local Bank'}>Local Bank</MenuItem>
                        <MenuItem value={'Other Bank'}>Other Bank</MenuItem>
                        <MenuItem value={'Other Bank 1'}>Other Bank1</MenuItem>
                        <MenuItem value={'Other Bank 2'}>Other Bank2</MenuItem>
                        <MenuItem value={'Other Bank 3'}>Other Bank3</MenuItem>
                        <MenuItem value={'Other Bank 4'}>Other Bank4</MenuItem> */}
                        {/* {IRO?.division?.DivisionBankFCRA?.bankName || IRO?.division?.FCRABankDetails?.bankName ? <MenuItem value={IRO?.division?.FCRABankDetails?.bankName ? 'FCRA' : 'Division Bank FCRA'}>Division Bank FCRA - {IRO?.division?.DivisionBankFCRA?.beneficiary || IRO?.division?.FCRABankDetails?.beneficiary}</MenuItem> : '' }
                        {IRO?.division?.DivisionBankLocal?.bankName || IRO?.division?.localBankDetails?.bankName ? <MenuItem value={IRO?.division?.localBankDetails?.bankName? 'Local Bank' :'Division Bank Local'}>Division Bank Local - {IRO?.division?.DivisionBankLocal?.beneficiary || IRO?.division?.localBankDetails?.beneficiary}</MenuItem> :'' }
                        {IRO?.division?.BeneficiaryBank1?.bankName ||IRO?.division?.otherBankDetails?.bankName? <MenuItem value={'Beneficiary Bank 1'}>Beneficiary Bank 1 - {IRO?.division?.BeneficiaryBank1?.beneficiary || IRO?.division?.otherBankDetails?.beneficiary}</MenuItem> :'' }
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
                  {/* <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={IRO?.sanctionedAsPer as ISanctionedAsPer}
                      options={sanctionedAsPer ?? []}
                      getOptionLabel={(option) => option.asPer ?? ''}
                      onChange={(_e, selectedSanction) => {
                        if (selectedSanction) {
                          setIRO({
                            ...IRO,
                            sanctionedAsPer: selectedSanction as ISanctionedAsPer,
                          });
                        }
                      }}
                      disabled={!hasPermissions(['ADMIN_ACCESS'])}
                      renderInput={(params) => <TextField {...params} label="Sanctioned As Per" />}
                      fullWidth
                    />
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      {/* <InputLabel shrink={true} id="sourceOfAccount">Source Of Account</InputLabel> */}
                      <InputLabel id="sourceOfAccount" shrink={true}>Source Of Account</InputLabel>
                      <Select
                        labelId="sourceOfAccount"
                        label="sourceOfAccount"
                        disabled
                        value={IRO?.sourceOfAccount ?? null}
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
                      <Button
                        variant="contained"
                        color="info"
                        type="submit"
                        // disabled={particulars.length==0}
                      >
                        Submit
                      </Button>


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
          {remarks.length > 0 ? remarks?.map((remark) => (
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
        action="view"
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
        getFiles={attachments}
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
            attachment: particularDetails.attachment?.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
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
        action="add"
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
            attachment: particularDetails.attachment?.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
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

      <Dialog
        open={showAddParticularDialog}
        onClose={() => setShowAddParticularDialog(false)}
        PaperProps={{
          style: {
            width: '1000px',
          },
        }}
      >
        <DialogTitle>Edit Particular</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAddParticularDialog(false);
            setIRO({
              ...IRO,
              particulars: IRO.particulars?.map((part) => (part._id === newParticular._id ? (newParticular as Particular) : part)),
            });
            // addParticulars();
          }}
        >
          <DialogContent>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    value={selectedMainCategory ?? null}
                    options={mainCategories ?? []}
                    getOptionLabel={(mainCategory) => mainCategory.name}
                    onChange={(e, selectedMainCategory) => {
                      if (selectedMainCategory) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          mainCategory: selectedMainCategory.name,
                        }));
                        setSelectedMainCategory(selectedMainCategory);
                      }
                    }}
                    disabled
                    renderInput={(params) => <TextField {...params} label="Choose Main Category" />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={selectedSubCategory1}
                    options={selectedMainCategory?.subcategory1 ?? []}
                    getOptionLabel={(subcategory2) => subcategory2.name}
                    onChange={(_e, selectedSubCategory1) => {
                      if (selectedSubCategory1) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          subCategory1: selectedSubCategory1.name,
                        }));
                        setSelectedSubCategory1(selectedSubCategory1);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 1" required />}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={selectedSubCategory2}
                    options={selectedSubCategory1?.subcategory2 ?? []}
                    getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                    onChange={(_e, selectedSubCategory2) => {
                      if (selectedSubCategory2) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          subCategory2: selectedSubCategory2.name,
                        }));
                        setSelectedSubCategory2(selectedSubCategory2);
                        const subcat2 =selectedSubCategory2?.subcategory3.map((e)=>e.name);

                        if (subcat2?.includes('Select')) {
                          console.log('Select');
                          if (selectedSubCategory2) {
                            setNewParticular((particularDetails) => ({
                              ...particularDetails,
                              narration: selectedSubCategory2?.subcategory3[0].narration,
                            }));
                            setSelectedSubCategory3(selectedSubCategory3);
                          }
                        }
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
                    disabled

                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={selectedSubCategory3}
                    options={selectedSubCategory2?.subcategory3 ?? []}
                    getOptionLabel={(subCategory3) => subCategory3.name}
                    onChange={(e, selectedSubCategory3) => {
                      if (selectedSubCategory3) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          subCategory3: selectedSubCategory3.name,
                          narration: selectedSubCategory3.narration,
                        }));
                        setSelectedSubCategory3(selectedSubCategory3);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 3" />}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={newParticular?.quantity == 0 ? '' : newParticular?.quantity}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        quantity: Number(e.target.value),
                      }))
                    }
                    disabled
                    inputProps={{
                      onWheel: handleWheel,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Requested Amount"
                    type="number"
                    value={newParticular?.unitPrice}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        unitPrice: Number(e.target.value),
                        requestedAmount: Number(e.target.value),
                      }))
                    }
                    disabled
                    required
                    fullWidth
                    inputProps={{
                      onWheel: handleWheel,
                    }}
                  />
                </Grid>
                {hasPermissions(['ADMIN_ACCESS']) && (
                  <Grid item md={12}>
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
                  </Grid>)}
                <Grid item md={12}>
                  <TextField
                    label="Total Amount"
                    type="number"
                    value={newParticular?.requestedAmount?.toFixed(2)}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        requestedAmount: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    required
                    disabled
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      onWheel: handleWheel,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    value={newParticular.month}
                    options={monthNames ?? []}
                    getOptionLabel={(monthName) => monthName}
                    disabled
                    onChange={(e, selectedMonth) => {
                      if (selectedMonth) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          month: selectedMonth,
                        }));
                      }
                    }}
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
                    disabled
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
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
            setIRO({
              ...IRO,
              particulars: IRO.particulars?.map((part) => (part._id === newParticular._id ? (newParticular as Particular) : part)),
            });
            // addParticulars();
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
                  value={newParticular.sanctionedAmount ?? total}
                  // required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={
                  //   IRO?.status === IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT ||
                  //   IRO?.status !== IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR}
                  disabled={!hasPermissions(['ADMIN_ACCESS']) &&!hasPermissions(['OFFICE_MNGR_ACCESS']) }

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
                  // inputProps={{
                  //   max: totalRequestedAmount, min: 0,
                  //   onWheel: handleWheel,
                  // }}
                  // inputProps={{
                  //   max: totalRequestedAmount,
                  //   min: 0,
                  //   step: 0.01, // Allows up to two decimal places
                  //   onWheel: handleWheel,
                  // }}
                // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                />
                {/* </Tooltip> */}
              </Grid>
              <br />
              <Autocomplete
                value={newParticular.sanctionedAsPer as unknown as AsPer}
                options={sanctionedAsPer ?? []}
                getOptionLabel={(option:any) => option ?? ''}
                onChange={(_e, selectedSanction) => {
                  if (selectedSanction) {
                    setNewParticular((asper: any) => ({
                      ...asper,
                      sanctionedAsPer: selectedSanction,
                    }));
                  }
                }}
                //  disabled={!hasPermissions(['ADMIN_ACCESS'])}
                renderInput={(params) => <TextField {...params} label="Sanctioned As Per" />}
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
    </>
  );
};

export default EditIROForRevert;
