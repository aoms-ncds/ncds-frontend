/* eslint-disable prefer-const */
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
  Divider,
  Typography,
} from '@mui/material';
import { AttachFile as AttachmentIcon, Send as SendIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { SetStateAction, useEffect, useState } from 'react';
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
import PaymentMethodService from '../Settings/extras/PaymentMethodService';
import { log } from 'console';
import { IPaymentMethod } from '../Settings/extras/LanguageTypes';

const EditIROCustom = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  console.log(user, 'user');
  const [paymnetMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [particularDialog, setParticularDialog] = useState<'add' | 'edit' | 'custom' | 'customIRO'>('add');

  // const [purposes, setPurposes] = useState<FRPurpose[]>();
  // const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [particulars, setParticulars] = useState<Particular[]>([]);
  const [addNewParticulars, setAddNewParticulers] = useState<Particular[]>([]);
  const { iroID } = useParams();
  const [divisions, setDivisions] = useState<any | null>(null);
  const [allSubDivisions, setAllSubDivisions] = useState<any | null>(null);
  const [allCoortinators, setAllCoortinators] = useState<any | null>(null);
  const [isCoordinator, setisCoordinator] = useState<any>(false);
  const [showFileUploaderCustom, setShowFileUploaderCustom] = useState(false);
  const [showFileUploaderCustomOfficeMngr, setShowFileUploaderCustomOfficeMngr] = useState(false);
  const [addSignaturePr, toggleAddSignaturePr] = useState(false);
  const [showPresidentIROName, setPresidentIROName] = useState(false);
  const [eSignPresidentIRO, setePresidentIRO] = useState(false);
  const [selectedParticularIndex, setSelectedParticularIndex] = useState<number | null>(null);

  const [IRO, setIRO] = useState<any>({
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
    releaseAmount: '',
    // attachment?: [],

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
  const [Allworkers, setAllWorkers] = useState<IWorker[] | Staff[]>();
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
      WorkersServices.getAll()
        .then((res) => {
          setAllWorkers(res.data);
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
    DivisionsServices.getDivisions().then((res) => {
      //   setDivision(res.data ?? null);
      setDivisions(res.data);
    });
    DivisionsServices.getSubDivisions().then((res) => {
      //   setDivision(res.data ?? null);
      setAllSubDivisions(res.data);
    });
    DivisionsServices.getcoordinators().then((res) => {
      //   setDivision(res.data ?? null);
      setAllCoortinators(res.data);
    });
    DivisionsServices.isCoordinator()
    .then((res) => {
      setisCoordinator(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    PaymentMethodService.getAll().then((res) => {
      setPaymentMethod(res.data);
    });
  }, []);

  console.log(IRO, 'selectedParticularIndex');
  const addParticulars = () => {
    // handleClose();
    let newParticulars: Particular[];
    newParticulars = [newParticular as Particular];
    if (particularDialog === 'edit') {
      setParticulars((particulars) => particulars.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)));
      setIRO({
        ...IRO,
        particulars: particulars.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
      });
    } else {
      console.log(newParticulars, 'newParticulars');

      setAddNewParticulers((prev:any) => [
        ...prev,
        ...newParticulars.map((particular) => ({
          ...particular,
          sanctionedAmount: null,
          sanctionedAsPer: null,
        })),
      ]);

      console.log(addNewParticulars, 'addNewParticulars');
      // setIRO({
      //   ...props.value,
      //   particulars: newParticulars,
      // });
    }
    setNewParticular((particularDetails) => ({
      ...particularDetails,
      subCategory1: '',
      subCategory2: '',
      subCategory3: '',
      month: '',
      narration: '',
      quantity: undefined,
      unitPrice: undefined,
      requestedAmount: undefined,
      attachment: [],
    }));
    // Reset the form fields
    setShowAddParticularDialog(false);
    // Other logic for API calls, snackbar, etc.
  };
  useEffect(() => {
    DivisionsServices.getSubDivisionsByDivisionId(IRO.division?._id ?? '')
        .then((res2) => setAllSubDivisions(res2.data))
        // .then((res) => console.log(res.data, 'sec'))
        .catch((error) =>
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          }),
        );
  }, [IRO.division]);
  const [open, setOpen] = useState(false);
  console.log(IRO, 'dq');
  // console.log(props, 'wdqw');
  const deleteParticular = (particularId: string | undefined, index: number) => {
    // if (!particularId) {
    // Delete by index if the particularId is not available
    const updatedParticulars = IRO.particulars.filter((_item: any, i: number) => i !== index);
    IRO.particulars = updatedParticulars;
    setNewParticular(updatedParticulars[0]);
    return;
    // }
  };
  console.log(addNewParticulars, 'updatedParticulars');
  let total = 0;
  IRO?.particulars?.forEach((particular: { sanctionedAmount: number }) => {
    if (particular?.sanctionedAmount) {
      total += Number(particular?.sanctionedAmount);
    }
  });
  let total2 = 0;
  addNewParticulars.forEach((particular: Particular) => {
    if (particular.sanctionedAmount !== null && particular.sanctionedAmount !== undefined) {
      total2 += Number(particular.sanctionedAmount);
    }
  });
  const grandTotal = total + total2;
  console.log(total, 'grandTotal');
  console.log(total2, 'grandTotal1');
  console.log(grandTotal, 'grandTotal2');
  const handleClickOpen = (particular: Particular, index: SetStateAction<number | null>) => {
    setOpen(true);
    setSelectedParticularIndex(index);
    setNewParticular(particular);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editParticular = (particular: Particular, index: number) => {
    setParticularDialog('edit');
    setSelectedParticularIndex(index);
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
    setSelectedMainCategory(() => mainCategories?.find((item) => item.name == newParticular?.mainCategory));
  }, [newParticular]);
  useEffect(() => {
    setSelectedSubCategory1(() => selectedMainCategory?.subcategory1.find((item) => item.name == newParticular?.subCategory1) ?? null);
  }, [selectedMainCategory]);
  useEffect(() => {
    setSelectedSubCategory2(() => selectedSubCategory1?.subcategory2.find((item) => item.name == newParticular?.subCategory2) ?? null);
  }, [selectedSubCategory1]);
  useEffect(() => {
    setSelectedSubCategory3(() => selectedSubCategory2?.subcategory3.find((item) => item.name == newParticular?.subCategory3) ?? null);
  }, [selectedSubCategory2]);

  useEffect(() => {
    if (!iroID) {
      throw new Error('IRO ID Missing in URL');
    }
    IROServices.getByIdCustom(iroID).then((res) =>{
      console.log(res.data, 'frdata');
      setIRO(res.data);
      // setAddNewParticulers(res.data.particulars);
    } ); // TODO: Implement REST API Call
  }, [iroID]);

  const totalRequestedAmount = particulars && particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const totalRequestedAmtotal= addNewParticulars && addNewParticulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  const grandTotalReust= totalRequestedAmount+totalRequestedAmtotal;
  console.log(grandTotalReust, 'grandTotalReust');

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
                  // setIRO({
                  //   ...IRO,
                  //   particulars: [],
                  // });

                  IROServices.updateIROCustom(iroID ?? '', IRO, newParticular, true)
                    .then((res) => {
                      if (res.data) {
                        FRServices.addParticularscustomIRO(addNewParticulars, iroID).then((res)=>{
                          console.log(res.data);
                        });
                      }
                      enqueueSnackbar({
                        message: res.message,
                        variant: 'success',
                      });
                      navigate('/iro/custom');
                    });
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="IRO No"
                      value={IRO.IROno}
                      fullWidth
                      // disabled
                      onChange={(_e) => {
                        if (_e) {
                          setIRO({
                            ...IRO,
                            IROno: _e.target.value as any,
                          });
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label={'FR No'}
                      value={IRO.FRNumber}
                      autoComplete="off"
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          FRNumber: e.target.value,
                        })
                      }
                      variant="outlined"
                      fullWidth
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
                  {/* {props.action =='customIRO' &&( */}

                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label={'Coordinator Name'}
                      value={IRO?.coordinatorName}
                      autoComplete="off"
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          coordinatorName: e.target.value,
                        })
                      }
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    {/* </Tooltip> */}
                  </Grid>
                  {/* // )} */}
                  <Grid item xs={12} md={6}>
                    <DatePicker label="Date" value={IRO?.IRODate}
                      format="DD/MM/YYYY"
                      onChange={(_e) => {
                        if (_e) {
                          setIRO({
                            ...IRO,
                            IRODate: _e as any,
                          });
                        }
                      }}
                      slotProps={{ textField: { fullWidth: true } }} />
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
                      disabled={IROLifeCycleStates.REVERTED_TO_DIVISION === IRO.status || IROLifeCycleStates.REOPENED !== IRO.status &&!hasPermissions(['OFFICE_MNGR_ACCESS'])&& hasPermissions(['ACCOUNTS_MNGR_ACCESS']) && !hasPermissions(['ADMIN_ACCESS'] )}
                      renderInput={(params) => <TextField {...params} label="Requisition For" />}
                      fullWidth

                    />
                  </Grid>
                  {IRO?.purpose === 'Worker' ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <Grid item xs={12}>
                          <Autocomplete<IWorker | Staff>
                            value={IRO.purposeWorker ?? null}
                            options={(Allworkers ?? [])}
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
                  {IRO?.purpose === 'Division' || IRO?.purpose === 'Subdivision' ? (
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        value={IRO?.division}
                        options={divisions?? []}
                        getOptionLabel={(division) => division.details.name}
                        onChange={(event, newVal) =>
                          setIRO({ ...IRO, division: newVal ?? undefined })
                        } renderInput={(params) => <TextField {...params} label="Choose Division" />}
                        fullWidth
                        disabled={IROLifeCycleStates.REOPENED !==IRO.status&&!hasPermissions(['OFFICE_MNGR_ACCESS'])&& hasPermissions(['ACCOUNTS_MNGR_ACCESS']) && !hasPermissions(['ADMIN_ACCESS'])}/>
                    </Grid>
                  ) : null}
                  {IRO?.purpose === 'Subdivision' ? (
                    <><Grid item xs={12} md={6}>
                      <Autocomplete
                        options={ allSubDivisions ?? []}
                        value={IRO.purposeSubdivision ? IRO.purposeSubdivision : undefined}
                        getOptionLabel={(subDiv) => subDiv.name}
                        onChange={(event, newVal) =>
                          setIRO({ ...IRO, purposeSubdivision: newVal ?? undefined })
                        }
                        renderInput={(params) => <TextField {...params} label="Subdivision" />}
                      />
                    </Grid>
                    </>
                  ) : null}

                  {IRO?.purpose === 'Coordinator' ? (
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        value={IRO?.purposeCoordinator}
                        options={allCoortinators ??[]}
                        onChange={(event, newVal) =>
                          setIRO({ ...IRO, purposeCoordinator: newVal ?? undefined })
                        }
                        getOptionLabel={(coordinator) => coordinator.basicDetails.firstName + ' ' + coordinator.basicDetails.lastName}
                        renderInput={(params) => <TextField {...params} label="Choose Coordinator" />}
                        fullWidth
                        disabled={IROLifeCycleStates.REOPENED !==IRO.status&&!hasPermissions(['OFFICE_MNGR_ACCESS']) &&hasPermissions(['ACCOUNTS_MNGR_ACCESS']) && !hasPermissions(['ADMIN_ACCESS'])}
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
                            IRO?.particulars?.map((item:any, index:any) => (
                              <TableRow key={item._id} >
                                <TableCell component="th" sx={{ display: 'flex' }}>
                                  <PermissionChecks
                                    permissions={['WRITE_IRO']}
                                    granted={
                                      <IconButton>
                                        <DeleteIcon onClick={() => deleteParticular(item._id, index)} />
                                      </IconButton>
                                    }
                                  />
                                  {(hasPermissions(['FCRA_ACCOUNTS_ACCESS']) || hasPermissions(['LOCAL_ACCOUNT_ACCESS'])) || hasPermissions(['ADMIN_ACCESS']) || hasPermissions(['ACCOUNTS_MNGR_ACCESS'])? (
                                  // Content to render if the user has access
                                    <IconButton>
                                      <EditIcon onClick={() => editParticular(item, index)} />
                                    </IconButton>
                                  ): []}
                                  <IconButton>
                                    <AddIcon onClick={() => handleClickOpen(item, index)} />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      setShowFileUploader(true);
                                      setAttachments(newParticular.attachment);
                                      setNewParticular(item);
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
                          {addNewParticulars &&
                            addNewParticulars?.map((item:any, index:any) => (
                              <TableRow key={item._id} >
                                <TableCell component="th" sx={{ display: 'flex' }}>
                                  <PermissionChecks
                                    permissions={['WRITE_IRO']}
                                    granted={
                                      <IconButton>
                                        <DeleteIcon onClick={() => deleteParticular(item._id, index)} />
                                      </IconButton>
                                    }
                                  />
                                  {(hasPermissions(['FCRA_ACCOUNTS_ACCESS']) || hasPermissions(['LOCAL_ACCOUNT_ACCESS'])) || hasPermissions(['ADMIN_ACCESS']) || hasPermissions(['ACCOUNTS_MNGR_ACCESS'])? (
                                  // Content to render if the user has access
                                    <IconButton>
                                      <EditIcon onClick={() => editParticular(item, index)} />
                                    </IconButton>
                                  ): []}
                                  <IconButton>
                                    <AddIcon onClick={() => handleClickOpen(item, index)} />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      setShowFileUploader(true);
                                      setAttachments(newParticular.attachment);
                                      setNewParticular(item);
                                    }}
                                  >
                                    <AttachmentIcon />
                                  </IconButton>
                                </TableCell>

                                <TableCell align="center">{IRO?.particulars.length + 1}</TableCell>
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
                          <Grid item xs={12} md={4} lg={4}>
                          </Grid>
                          <Button
                            sx={{ height: '45px' }}
                            variant="contained"
                            onClick={() => {
                              setParticularDialog('add');
                              setNewParticular((particularDetails) => ({
                                ...particularDetails,
                                subCategory1: '',
                                subCategory2: '',
                                subCategory3: '',
                                month: '',
                                narration: '',
                                quantity: undefined,
                                unitPrice: undefined,
                                requestedAmount: undefined,
                                attachment: [],
                              }));
                              setShowAddParticularDialog(true);
                              setSelectedSubCategory1(null);
                              setSelectedSubCategory2(null);
                              setSelectedSubCategory3(null);
                            }}
                            // disabled={!selectedMainCategory}
                          >
                                                    Add particulars
                          </Button>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}> Sanctioned Details</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Requested Amount"
                      InputLabelProps={{ shrink: true }}
                      value={grandTotalReust.toFixed(2)}
                      fullWidth disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      disabled
                      label="Sanctioned Amount"
                      type={'number'}
                      value={grandTotal.toFixed(2)}
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
                      // disabled={IROLifeCycleStates.REOPENED !== IRO.status}
                    // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                    />
                    {/* </Tooltip> */}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {/* <Grid item xs={12} md={6}> */}
                    <TextField
                      fullWidth
                      label="Sanctioned Bank"
                      value={IRO.sanctionedBank || ''}
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          sanctionedBank: e.target.value,
                        })
                      }
                    >
                      {/* Add MenuItem options here */}
                    </TextField>
                    {/* </Grid> */}

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Beneficiary Name"
                      value={IRO.beneficiaryName || ''}
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

                  <><Grid item xs={12} md={12}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}> Bank Details</span>
                  </Grid><Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label="Bank name"
                      value={(IRO.bankName)}
                      autoComplete='off'
                      onChange={(e) => setIRO({
                        ...IRO,
                        bankName: String(e.target.value),
                      })}

                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}

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
                      value={(IRO.branchName)}
                      autoComplete='off'
                      onChange={(e) => setIRO({
                        ...IRO,
                        branchName: String(e.target.value),
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
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label="IFSC Code"
                      value={(IRO.ifscCode)}
                      autoComplete='off'
                      onChange={(e) => setIRO({
                        ...IRO,
                        ifscCode: String(e.target.value),
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
                  <Grid item xs={12} md={6}>
                    {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                    <TextField
                      label="Account number"
                      value={(IRO.accNumber)}
                      autoComplete='off'
                      onChange={(e) => setIRO({
                        ...IRO,
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
                  <Grid item xs={12} md={12}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}> Amount Transfer Details
                    </span>
                  </Grid>
                  </>

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
                        disabled={!hasPermissions(['ADMIN_ACCESS']) && !hasPermissions(['OFFICE_MNGR_ACCESS']) &&IROLifeCycleStates.REOPENED !== IRO.status}
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
                  <><Grid item xs={12} md={6}>
                    <TextField
                      label="Amount Transferred"
                      type="number"
                      value={IRO?.transferredAmount}
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          transferredAmount: String(e.target.value),
                        })
                      }
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // inputProps={F{
                      //   max: (IRO as any)?.releaseAmount?.releaseAmount ?? 0, min: 0, step: 0.01,
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
                      value={IRO?.transferredDate}
                      format="DD/MM/YYYY"
                      sx={{ width: '100%' }}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      onChange={(newValue) =>
                        setIRO({
                          ...IRO,
                          transferredDate: newValue, // Use the newValue provided by DatePicker
                        })
                      }
                    />

                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Autocomplete
                      disablePortal
                      id="Payment_method"
                      getOptionLabel={(method) => method?.paymentMethod || ''} // Ensure it returns a string
                      options={paymnetMethod ?? []} // Ensure options are populated
                      value={paymnetMethod?.find((option) => option.paymentMethod === IRO?.modeOfPayment) || null} // Find the matching object
                      isOptionEqualToValue={(option, value) => option.paymentMethod === value?.paymentMethod} // Ensure correct comparison
                      onChange={(event, newValue) =>
                        setIRO({
                          ...IRO,
                          modeOfPayment: newValue?.paymentMethod || '', // Store string in state
                        })
                      }
                      renderInput={(params) => <TextField {...params} label="Mode of payment" required />}
                    />


                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      label="Transaction No:"
                      value={IRO?.transactionNumber}
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          transactionNumber: String(e.target.value),
                        })
                      }
                      variant="outlined"
                      fullWidth
                      // required
                      InputLabelProps={{
                        shrink: !!IRO?.transactionNumber, // Explicitly control shrinking
                      }}

                    />

                  </Grid>


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
                        setIRO(() => ({
                          ...IRO,
                          adjustedIro: e.target?.value,
                        }))
                      }
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
                        setIRO(() => ({
                          ...IRO,
                          adjustedAmount: Number(e.target?.value),
                        }))
                      }
                       InputLabelProps={{
                        shrink: Boolean(IRO?.adjustedAmount),
                      }}
                      fullWidth
                      // inputProps={{
                      //   max: releaseAmount.releaseAmount ?? 0, min: 0, step: 0.01,
                      //   onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                      //     event.preventDefault();
                      //     event.currentTarget.blur();
                      //   },
                      // }}
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
                          // Use double negation (!!) to ensure it's a boolean value
                          checked={!!IRO?.closingBalance}
                          onChange={(e) =>
                            setIRO(() => ({
                              ...IRO,
                              closingBalance: e.target?.checked,
                            }))
                          }
                          // disabled={props.action !== 'add'}
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
                          setIRO(() => ({
                            ...IRO,
                            closingBalanceRemark: e.target.value,
                          }))
                        }
                        fullWidth
                        variant="outlined"
                        // disabled={props.action !== 'add'}

                        // required
                      />
                    </Grid>
                  )}


                  <Grid item xs={12} md={12}>
                    <span style={{ fontWeight: 600, fontSize: 20 }}> Signature and Manager details
                    </span>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      label="Office Manager Name"
                      value={IRO?.officeManagerName}
                      onChange={(e) =>
                        setIRO({
                          ...IRO,
                          officeManagerName: String(e.target.value),
                        })
                      }
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: !!IRO?.officeManagerName, // Explicitly control shrinking
                      }}
                      // required

                    />

                  </Grid>
                  {/* {props.action == 'custom' &&( */}

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
                      InputLabelProps={{
                        shrink: !!IRO?.officeManagerName, // Explicitly control shrinking
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  {/* )} */}
                  <Grid item xs={12} md={6} lg={2}>

                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <Button variant="contained" onClick={() => setShowFileUploaderCustomOfficeMngr(true)} startIcon={<AttachmentIcon />}>
                                  Office manager Sign
                    </Button>
                  </Grid>
                  {IRO?.specialSanction as any &&(
                    <Grid item xs={12} md={2} lg={4}>
                      <Button variant="contained" onClick={() => toggleAddSignaturePr(true)} startIcon={<AttachmentIcon />}>
                                              President details
                      </Button>
                    </Grid>
                  )}

                  {/* {props.action =='customIRO' || props.action == 'custom'&&( */}
                  <><Grid item md={12}>
                    <Button variant="contained" onClick={() => setShowFileUploaderCustom(true)} startIcon={<AttachmentIcon />}>
                                  Attachments
                    </Button>
                    <FormControlLabel
                      label="President sanction"
                      checked={IRO?.specialSanction as any || false} // Ensure it's always a boolean
                      onChange={(e:any) =>
                        setIRO({
                          ...IRO,
                          specialSanction: e.target.checked, // Directly assign boolean value
                        })
                      }
                      sx={{ pl: 2 }}
                      control={<Checkbox />}
                    />
                  </Grid><br /><Grid>

                  </Grid></>
                  {/* )} */}
                  </>

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
        getFiles={newParticular?.attachment}
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
        // renameFile={(fileId: string, newName: string) => {
        //   setNewParticular((particularDetails) => ({
        //     ...particularDetails,
        //     attachment: particularDetails.attachment?.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
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
        getFiles={newParticular?.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'FR', file.name).then((res) => {
            setNewParticular((particularDetails) => ({
              ...particularDetails,
              attachment: [...particularDetails.attachment, res.data],
            }));
            // setIRO((prevDetails: any) => ({
            //   ...prevDetails, // Preserve the outer state structure
            //   particulars: {
            //     ...prevDetails.particulars, // Preserve existing properties inside `particulars`
            //     attachment: res.data, // Update only the `attachment` field within `particulars`
            //   },
            // }));
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
        onClose={handleClose}
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
            addParticulars();
          }}
        >
          <DialogContent>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} >
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
                        setIRO({
                          ...IRO,
                          mainCategory: selectedMainCategory.name,
                        });
                        setSelectedMainCategory(selectedMainCategory);
                        setSelectedSubCategory1(null);
                        setSelectedSubCategory1(null);
                        setSelectedSubCategory1(null);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Main Category" />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    // disabled={props.disable == true}
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
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    // disabled={props.disable == true}
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
                      }
                      const subcat2 = selectedSubCategory2?.subcategory3.map((e) => e.name);

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
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    // disabled={props.disable == true}
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
                    inputProps={{
                      onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        event.currentTarget.blur();
                      },
                    }}
                    // disabled={props.disable == true}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Requested Amount"
                    type="number"
                    value={newParticular?.unitPrice !==0? newParticular?.unitPrice: null}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        unitPrice: Number(e.target.value),
                        requestedAmount: Number(e.target.value),
                      }))
                    }
                    inputProps={{
                      onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        event.currentTarget.blur();
                      },
                    }}
                    required
                    // disabled={props.disable == true}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    label="Multiply By Quantity"
                    control={
                      <Checkbox
                        // disabled={props.disable == true}
                        onChange={(e) =>
                          setNewParticular((particularDetails) => ({
                            ...particularDetails,
                            requestedAmount: e.target.checked ? (particularDetails?.quantity ?? 0) * (newParticular?.unitPrice ?? 0) : particularDetails?.unitPrice ?? 0,
                          }))
                        }
                      />
                    }
                  />
                </Grid>
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
                    inputProps={{
                      onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        event.currentTarget.blur();
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    // disabled={props.disable==true}
                    value={newParticular?.month}
                    options={monthNames ?? []}
                    getOptionLabel={(monthName) => monthName}
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
                  <FormControlLabel
                    label="Upcoming Year"
                    control={
                      <Checkbox
                        // disabled={props.disable==true}
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
                    label="Narration"
                    value={newParticular?.narration}
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
                  <Button variant="contained" onClick={() => setViewFileUploader(true)} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setShowAddParticularDialog(false)}>Cancel</Button>
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
            if (particularDialog === 'edit'|| addNewParticulars.length ==0) {
              setIRO({
                ...IRO,
                particulars: particulars.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
              });
            }
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
                  value={newParticular?.sanctionedAmount !==0 ?newParticular?.sanctionedAmount: null}
                  // required={IRO.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                  title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  autoComplete='off'
                  // disabled={
                  //   IRO?.status === IROLifeCycleStates.WAITTING_FOR_RELEASE_AMOUNT ||
                  //   IRO?.status !== IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR}
                  // disabled={!hasPermissions(['ADMIN_ACCESS']) &&!hasPermissions(['OFFICE_MNGR_ACCESS']) && IROLifeCycleStates.REOPENED !== IRO.status}

                  onChange={(e) => {
                    // if (totalRequestedAmount) {
                    setNewParticular((amount: any) => ({
                      ...amount,
                      sanctionedAmount: Number(e.target.value),
                    }));

                    setAddNewParticulers((prev: any) =>
                      prev.map((particular: any, index: number) =>
                        index === selectedParticularIndex ? { ...particular, sanctionedAmount: e.target.value } : particular,
                      ),
                    );


                    // }
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
                value={newParticular?.sanctionedAsPer as unknown as AsPer}
                options={sanctionedAsPer ?? []}
                getOptionLabel={(option:any) => option ?? ''}
                onChange={(_e, selectedSanction) => {
                  // if (selectedSanction) {
                  setNewParticular((asper: any) => ({
                    ...asper,
                    sanctionedAsPer: selectedSanction,
                  }));
                  // }
                  setAddNewParticulers((prev: any) =>
                    prev.map((particular: any, index: number) =>
                      index === selectedParticularIndex ? { ...particular, sanctionedAsPer: selectedSanction } : particular,
                    ),
                  );
                }}
                disabled={IROLifeCycleStates.REVERTED_TO_DIVISION === IRO?.status}
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
            value={IRO?.president}
            onChange={(e) =>
              setIRO({
                ...IRO,
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

            setIRO({
              ...IRO,
              presidentSign: [...(IRO.presidentSign || []), res.data],
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
        // deleteFile={(fileId: string) => {
        //  setIRO({
        //     ...props.value,
        //     attachment: props.value.attachment.filter((file: any) => file._id !== fileId),
        //   });
        //   return FileUploaderServices.deleteFile(fileId);
        // }}
        deleteFile={(fileId: string) => {
          setIRO({
            ...IRO,
            attachment: IRO.presidentSign.filter((file: any) => file._id !== fileId),
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
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
        open={showFileUploaderCustom}
        onClose={() => setShowFileUploaderCustom(false)}
        // getFiles={TestServices.getBills}
        getFiles={IRO.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
            // console.log(res.data._id);

            setIRO({
              ...IRO,
              attachment: [...(IRO.attachment || []), res.data],
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
        // deleteFile={(fileId: string) => {
        //   props.onChange({
        //     ...props.value,
        //     attachment: props.value.attachment.filter((file: any) => file._id !== fileId),
        //   });
        //   return FileUploaderServices.deleteFile(fileId);
        // }}
      />
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
        open={showFileUploaderCustomOfficeMngr}
        onClose={() => setShowFileUploaderCustomOfficeMngr(false)}
        // getFiles={TestServices.getBills}
        getFiles={IRO.officeManagerSign}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
            // console.log(res.data._id);

            setIRO({
              ...IRO,
              officeManagerSign: [...(IRO.officeManagerSign || []), res.data],
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
          setIRO({
            ...IRO,
            attachment: IRO.officeManagerSign.filter((file: any) => file._id !== fileId),
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </>
  );
};

export default EditIROCustom;
