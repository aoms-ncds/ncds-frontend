import {
  Container,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  Autocomplete,
  DialogActions,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  TableContainer,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { AttachFile as AttachmentIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import FRServices from '../extras/FRServices';
import { enqueueSnackbar } from 'notistack';
import { monthNames, purposes } from '../extras/FRConfig';
import FileUploader from '../../../components/FileUploader/FileUploader';
import SendIcon from '@mui/icons-material/Send';
import WorkersServices from '../../Workers/extras/WorkersServices';
import { MB } from '../../../extras/CommonConfig';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';
import { useAuth } from '../../../hooks/Authentication';
import MessageItem from '../../../components/MessageItem';
import IRO from '../../IRO';
import PaymentMethodService from '../../Settings/extras/PaymentMethodService';
import { IPaymentMethod } from '../../Settings/extras/LanguageTypes';

const FRFormEdit = (props: FormComponentProps<any>) => {
  const [showAddParticularDialog, setShowAddParticularDialog] = useState(false);
  // const [purposes, setPurposes] = useState<FRPurpose[]>();
  const [workers, setWorkers] = useState<IWorker[] | Staff[]>();
  const [selectedParticularIndex, setSelectedParticularIndex] = useState<number | null>(null);
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>();
  const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<SubCategory1 | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<SubCategory2 | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { user } = useAuth();
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
  const [paymnetMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);

  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showFileUploaderCustom, setShowFileUploaderCustom] = useState(false);
  const [showFileUploaderCustomOfficeMngr, setShowFileUploaderCustomOfficeMngr] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [submit, setSubmit] = useState(0);
  const [particularDialog, setParticularDialog] = useState<'add' | 'edit'|'custom'|'customIRO'>('add');

  const handleClose = () => {
    setShowAddParticularDialog(false);
    ('add');
  };
  useEffect(() => {
    PaymentMethodService.getAll().then((res) => {
      setPaymentMethod(res.data);
    });
  }, []);
  useEffect(() => {
    console.log({ submit });
  }, [submit]);
  console.log(newParticular, 'newParticular');

  useEffect(() => {
    if (props.value.purpose === 'Worker') {
      WorkersServices.getWorkersByDivision()
        .then((res) => {
          setWorkers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else if (props.value.purpose === 'Subdivision') {
      WorkersServices.getSubDivisionsByDivisionId()
        .then((res) => {
          setSubDivisions(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [props.value.purpose]);
  useEffect(() => {
    const selectedMainCategoryObj = mainCategories?.find((category) => category.name === props.value.mainCategory);
    setSelectedMainCategory(selectedMainCategoryObj);

    FRServices.getMainCategory()
      .then((res) => {
        setMainCategories(res.data);
      })
      .catch((res) => {
        console.log(res);
      });

    if (props.value.particulars) {
      setParticulars(props.value.particulars);
    }
  }, [props.value.particulars]);
  console.log(props.action, 'propd');

  const addParticulars = () => {
    handleClose();
    let newParticulars: Particular[];
    if (particularDialog === 'edit') {
      setParticulars((particulars) => particulars.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)));
      props.onChange({
        ...props.value,
        particulars: particulars.map((part, _ind) => (_ind === selectedParticularIndex ? (newParticular as Particular) : part)),
      });
    } else {
      newParticulars = [...particulars, newParticular as Particular];
      setParticulars(newParticulars);

      props.onChange({
        ...props.value,
        particulars: newParticulars,
      });
    }
    // Reset the form fields
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

    // Other logic for API calls, snackbar, etc.
  };
  const editParticular = (particular: Particular, index: number) => {
    setParticularDialog('edit');
    // setParticulars((particulars)=>
    //   (
    //     particulars.map((part, _ind)=>_ind===index?particular:part)
    //   ));
    setSelectedParticularIndex(index);
    setShowAddParticularDialog(true);
    setNewParticular(particular);
    // Perform delete logic
    // const updatedParticulars = particulars.filter((item) => item._id !== particularId);
    // setParticulars(updatedParticulars);
    // FRServices.editParticulars(particularId)
    //   .then((res) => {
    //     enqueueSnackbar({
    //       message: res.message,
    //       variant: 'success',
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     enqueueSnackbar({
    //       message: err.message,
    //       variant: 'error',
    //     });
    //   });
  };
  const deleteParticular = (particularId: string | undefined, index: number) => {
    if (!particularId) {
      // Delete by index if the particularId is not available
      const updatedParticulars = particulars.filter((_item, i) => i !== index);
      setParticulars(updatedParticulars);
      return;
    }

    // Perform delete logic
    const updatedParticulars = particulars.filter((item) => item._id !== particularId);
    setParticulars(updatedParticulars);
    FRServices.deleteParticulars(particularId)
      .then((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  let total = 0;
  props.value?.particulars?.forEach((particular:any) => {
    if (particular?.sanctionedAmount) {
      total += particular?.sanctionedAmount;
    }
  });
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

  const totalRequestedAmount = particulars && particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  return (
    <div>
      <Container>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (particulars.length == 0) {
                enqueueSnackbar({
                  message: 'Please add particulars',
                  variant: 'warning',
                });
                return;
              }
              // const SubmitStatus = null;
              // if (submit == 1) {
              //   const SubmitStatus = FRLifeCycleStates.WAITING_FOR_ACCOUNTS;
              // } else if (submit == 2) {
              //   const SubmitStatus = FRLifeCycleStates.WAITING_FOR_PRESIDENT;
              // }
              if (props.onSubmit) {
                if (totalRequestedAmount>0) {
                  const updatedValue = {
                    ...props.value, status: submit == 1 ? FRLifeCycleStates.WAITING_FOR_ACCOUNTS : submit == 2 ?
                      FRLifeCycleStates.WAITING_FOR_PRESIDENT : submit == 3 ?FRLifeCycleStates.REOPENED: undefined,
                  };
                  // Create a new object with updated status
                  console.log(updatedValue, 'updatedValue');

                  props.onSubmit(updatedValue); // Invoke props.onSubmit with the value as the argument
                } else {
                  enqueueSnackbar({
                    message: 'Total requested Amount can\'t be 0',
                    variant: 'warning',
                  });
                }
              }
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date"
                  value={props.value.FRdate}
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
                  value={props.value.purpose ?? null}
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
                  renderInput={(params) => <TextField {...params} label="Requisition For" required />}
                  fullWidth
                  disabled

                />
              </Grid>
              {props.value.purpose === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete<IWorker | Staff>
                      value={props.value.purposeWorker ?? null}
                      options={(workers ?? [])}
                      getOptionLabel={(workers) => `${workers?.basicDetails.firstName} ${workers?.basicDetails.middleName ?? ''} ${workers.basicDetails.lastName}`}
                      onChange={(_e, selectedWorker) => {
                        if (selectedWorker && props.action !== 'view') {
                          props.onChange({
                            ...props.value,
                            purposeWorker: selectedWorker,
                          });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Choose Worker" required />}
                      fullWidth
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
              {props.action=== 'custom'|| props.action=== 'customIRO' ? (
                <Grid item xs={12} md={6}>
                  {/* <Tooltip open={isFocused?true:false}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                  <TextField
                    label={props.action === 'custom' ? 'FR No' : 'IRO No'}
                    value={props?.value.FRno}
                    autoComplete='off'
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        FRno: (e.target.value),
                      })
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
                    // onWheel: handleWheel,
                    }}
                  // disabled
                  // helperText={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                  />
                  {/* </Tooltip> */}
                </Grid>

              ):''}
              {props.value.purpose === 'Subdivision' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={subDivisions ?? []}
                    value={props.value.purposeSubdivision ?? null}
                    getOptionLabel={(subDiv) => subDiv.name}
                    onChange={(event, newVal) =>
                      props.onChange({ ...props.value, purposeSubdivision: newVal ?? undefined, division: newVal?.division, purposeCoordinator: newVal?.division?.details?.coordinator?.name })
                    }
                    renderInput={(params) => <TextField {...params} label="Subdivision" />}
                  />
                </Grid>
              ) : null}

              {/* {props.value.purpose === 'Coordinator' ? (
                <Grid item xs={12} md={6}>
                  <Autocompleteview') {
                        props.onChange({
                          ...props.value,
                          purposeCoordinator: selectedCoordinator,
                        });
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Coordinator" required />}
                    fullWidth
                  />
                </Grid>
              ) : null} */}
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
                  />
                </Grid>
              ) : null}
              {props.action === 'add'||props.action === 'custom' ||props.action === 'customIRO' ? (
                <>
                  <Grid item xs={12}>
                    <Typography>Particulars</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                          props.onChange({
                            ...props.value,
                            mainCategory: selectedMainCategory.name,
                          });
                          setSelectedMainCategory(selectedMainCategory);
                          setSelectedSubCategory1(null);
                          setSelectedSubCategory1(null);
                          setSelectedSubCategory1(null);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Choose Main Category" required={props.value.particulars?.length==0} />}
                      fullWidth
                    />
                  </Grid>
                </>
              ):''}
              {props.action === 'add'|| props.action === 'custom' ||props.action === 'customIRO'? (
                <Grid item xs={12} md={4} lg={4}>
                  <Button
                    variant="contained"
                    onClick={() => {
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
                    disabled={!selectedMainCategory}
                  >
                    Add particulars
                  </Button>
                </Grid>
              ):''}
              {particulars.length > 0 && (
                <Grid item xs={12}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">S.No</TableCell>
                          <TableCell align="center">Particulars</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">For the Month of</TableCell>
                          <TableCell align="center">Requested Amount</TableCell>
                          <TableCell align="center">Application Reference No</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {particulars.map((item, index) => (
                          <TableRow key={item._id}>
                            <TableCell component="th" sx={{ display: 'flex' }}>
                              {props.action !== 'view' && (
                                <>
                                  <IconButton>
                                    <EditIcon onClick={() => editParticular(item, index)} />
                                  </IconButton>
                                </>
                              )}
                              <IconButton
                                // sx={{ px: 10 }}
                                onClick={() => {
                                  setViewFileUploader(true);
                                  setAttachments(item.attachment);
                                }}
                              >
                                <AttachmentIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center"> {`${item.mainCategory == 'Select'? '' : item.mainCategory } 
                            > ${item.subCategory1=='Select' ? '' : item.subCategory1} > 
                            ${item.subCategory2=='Select' ? '' : item.subCategory2} > ${item.subCategory3=='Select' ? '' : item.subCategory3}`}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.month}</TableCell>
                            <TableCell align="center">{item.requestedAmount?.toFixed(2)}</TableCell>
                            <TableCell align="center">{item.applicationReferenceNo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Requested Amount"
                  InputLabelProps={{ shrink: true }}
                  value={totalRequestedAmount}
                  fullWidth
                  disabled
                />
              </Grid>


              {props.action === 'reopen' ? (
                <><Grid item xs={12} md={6}>
                  {/* <Tooltip open={isFocused?true:false}
onClose={() => setOpen(false)}
onOpen={() => setOpen(true)}
title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`} followCursor arrow > */}
                  <TextField
                    label="Sanctioned Amount"
                    type={'number'}
                    value={props?.value.sanctionedAmount ?? total}
                    title={`Sanctioned amount should not be greater than ${totalRequestedAmount}`}
                    autoComplete='off'
                    onChange={(e) => props.onChange({
                      ...props.value,
                      sanctionedAmount: Number(e.target.value),
                    })}
                    disabled
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
                      // onWheel: handleWheel,
                    }} />
                  {/* </Tooltip> */}
                </Grid><Grid item xs={12} md={6}>
                  <FormControl fullWidth required={props.value.status == FRLifeCycleStates.WAITING_FOR_ACCOUNTS}>
                    <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                    <Select
                      labelId="sanctioned_bank"
                      label="Sanctioned Bank"
                      value={props.value.sanctionedBank || ''}
                      // disabled={!hasPermissions(['MANAGE_FR']) || props.value.status != FRLifeCycleStates.WAITING_FOR_ACCOUNTS}
                      disabled

                      required
                      onChange={(e) =>
                        props.onChange({
                          ...props.value,
                          sanctionedBank: e.target.value,
                        })
                      }

                    >
                      <MenuItem value={props.value.sanctionedBank}>{props.value.sanctionedBank}</MenuItem>
                      {props.value.division?.DivisionBankFCRA?.bankName !='' || props.value.division?.FCRABankDetails?.bankName!='' ? (
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


                      {/* <MenuItem value={'Beneficiary Bank 2'}>Beneficiary Bank 2 - {IRO.division?.BeneficiaryBank2?.beneficiary}</MenuItem>
                                         <MenuItem value={'Beneficiary Bank 3'}>Beneficiary Bank 3 - {divisions?.BeneficiaryBank3?.beneficiary}</MenuItem>
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
                </Grid><Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    {/* <InputLabel shrink={true} id="sourceOfAccount">Source Of Account</InputLabel> */}
                    <InputLabel id="sourceOfAccount" shrink={true}>Source Of Account</InputLabel>
                    <Select
                      labelId="sourceOfAccount"
                      label="sourceOfAccount"
                      disabled
                      // disabled={!hasPermissions(['ADMIN_ACCESS']) && !hasPermissions(['OFFICE_MNGR_ACCESS'])}
                      value={props.value?.sourceOfAccount ?? null}
                      onChange={(e) => props.onChange({
                        ...props.value,
                        sourceOfAccount: String(e.target.value),
                      })}
                    >
                      <MenuItem value={'FCRA'}>FCRA</MenuItem>
                      <MenuItem value={'Local'}>Local</MenuItem>
                      {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid></>
              ):''}


              {props.action === 'customIRO' ?(
                <><Grid item xs={12} md={6}>
                  <TextField
                    label="Amount Transferred"
                    type="number"
                    value={(props.value as any)?.releaseAmount ?? ''}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        releaseAmount: String(e.target.value),
                      })
                    }
                    fullWidth
                    disabled

                    // inputProps={{
                    //   max: (props.value as any)?.releaseAmount?.releaseAmount ?? 0, min: 0, step: 0.01,
                    //   onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                    //     event.preventDefault();
                    //     event.currentTarget.blur();
                    //   },
                    // }}
                    variant="outlined"

                    required />
                </Grid><Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date"
                    value={(props.value as any)?.transferredDate}
                    format="DD/MM/YYYY"
                    sx={{ width: '100%' }}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                    onChange={(newValue) =>
                      props.onChange({
                        ...props?.value,
                        transferredDate: newValue, // Use the newValue provided by DatePicker
                      })
                    }
                    disabled
                  />

                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="Payment_method"
                    getOptionLabel={(method) => method.paymentMethod ?? ''}
                    value={props?.value?.modeOfPayment?? ''}
                    options={paymnetMethod ?? []} // Ensure this is defined and populated
                    onChange={(event, newValue) =>
                      props.onChange({
                        ...props.value,
                        modeOfPayment: newValue, // Use newValue provided by Autocomplete
                      })
                    }
                    renderInput={(params) => <TextField {...params} label="Mode of payment" required />}
                  />

                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Transaction No:"
                    value={props.value.releaseAmount?.transactionNumber}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        transactionNumber: String(e.target.value),
                      })
                    }
                    variant="outlined"
                    fullWidth
                    // required

                  />

                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Office Manager Name"
                    value={props.value.officeManagerName}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        officeManagerName: String(e.target.value),
                      })
                    }
                    variant="outlined"
                    fullWidth
                    // required

                  />

                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" onClick={() => setShowFileUploaderCustom(true)} startIcon={<AttachmentIcon />}>
                                  Attachments
                  </Button>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Button variant="contained" onClick={() => setShowFileUploaderCustomOfficeMngr(true)} startIcon={<AttachmentIcon />}>
                                  Office manager Sign
                  </Button>
                </Grid>

                </>
              ):''}
              {/* <Grid item xs={12} md={6}>
                <TextField
                  label="Sanctioned Amount"
                  type={'number'}
                  value={props.value.sanctionedAmount}
                  onChange={(e) =>
                    props.onChange({
                      ...props.value,
                      sanctionedAmount: Number(e.target.value),
                    })
                  }
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
                    value={props.value.sanctionedBank || ''}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        sanctionedBank: e.target.value,
                      })
                    }
                    required
                  >
                    <MenuItem value={'FCRA'}>FCRA</MenuItem>
                    <MenuItem value={'Normal Bank'}>Normal Bank</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={props.value.sanctionedAsPer??null}
                  options={sanctionedAsPers ?? []}
                  getOptionLabel={(requisition) => requisition ?? ''}
                  onChange={(_e, selectedSanction) => {
                    if (selectedSanction && props.action !== 'view') {
                      props.onChange({
                        ...props.value,
                        sanctionedAsPer: selectedSanction as SanctionedAsPer,
                      });
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Sanctioned As Per" required />}
                  fullWidth
                />
              </Grid> */}
              <Grid item xs={12}>
                {/* {props.action === 'edit' && ( */}
                {/* <Button
                  variant="contained"
                  color="warning"
                  style={{ textAlign: 'left' }}
                  // onClick={() => {
                  //   toggleOpenRemarks(true);
                  // }}
                >
                  <PDFDownloadLink
                    document={<FRReceiptTemplate rowData={props.value} />}
                    fileName="FRReceipt.pdf"
                    style={{ color: 'White', textDecoration: 'none' }}
                  >
                   Print FR
                  </PDFDownloadLink>


                </Button> */}
                {/* )} */}
                &nbsp;
                <div style={{ float: 'right' }}>
                  {props.action === 'edit' ?
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
                    </Button> : null}
                  &nbsp;
                  {props.action === 'add' || props.action === 'reopen' || props.action === 'custom'||props.action === 'customIRO' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
                      <PermissionChecks
                        permissions={['WRITE_FR']}
                        granted={
                          <Button
                            variant="contained"
                            color="info"
                            type="submit"
                            onClick={() => {
                              if (props.value.status ==FRLifeCycleStates.REOPENED) {
                                setSubmit(3);
                              } else {
                                setSubmit(1);
                              }
                            }}
                            // disabled={particulars.length==0}
                          >
                        Submit{' '}
                          </Button>
                        }

                      />
                       &nbsp;
                       &nbsp;
                      {FRLifeCycleStates.REOPENED !== props.value.status &&(

                        <PermissionChecks
                          permissions={['WRITE_FR']}
                          granted={
                            <Button
                              variant="contained"
                              color="warning"
                              type="submit"
                              // disabled={particulars.length==0}
                              onClick={() => {
                                setSubmit(2);
                              }}
                            >
                            Submit to President
                            </Button>
                          }
                        />
                      )}
                    </>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Container>
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
                    disabled
                    value={selectedMainCategory ?? null}
                    options={mainCategories ?? []}
                    getOptionLabel={(mainCategory) => mainCategory.name}
                    onChange={(e, selectedMainCategory) => {
                      if (selectedMainCategory) {
                        setNewParticular((particularDetails) => ({
                          ...particularDetails,
                          mainCategory: selectedMainCategory.name,
                        }));
                        props.onChange({
                          ...props.value,
                          mainCategory: selectedMainCategory.name,
                        });
                        setSelectedMainCategory(selectedMainCategory);
                        setSelectedSubCategory1(null);
                        setSelectedSubCategory1(null);
                        setSelectedSubCategory1(null);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Main Category" required={props.value.particulars?.length==0} />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    disabled
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
                    disabled
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
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
                    disabled
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
                    disabled
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
                    inputProps={{
                      onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        event.currentTarget.blur();
                      },
                    }}
                    required
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    label="Multiply By Quantity"
                    control={
                      <Checkbox
                        disabled
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
                    disabled
                    value={newParticular.month}
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
                        disabled
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
                    maxRows={4}
                    disabled
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
                  <TextField
                    label="Narration"
                    value={newParticular.narration}
                    multiline
                    maxRows={4}
                    disabled
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
                  <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                    Attachments
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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
                    <IconButton type="submit" >
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
          maxItemSize: 6 * MB,
          maxItemCount: 10,
          maxTotalSize: 30 * MB,
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
        getFiles={props.value.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
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
            attachment: props.value.attachment.filter((file:any) => file._id !== fileId),
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
        open={showFileUploaderCustomOfficeMngr}
        onClose={() => setShowFileUploaderCustomOfficeMngr(false)}
        // getFiles={TestServices.getBills}
        getFiles={props.value.officeManagerSign}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
            // console.log(res.data._id);

            props.onChange({
              ...props.value,
              officeManagerSign: [...(props.value.officeManagerSign || []), res.data],
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
            attachment: props.value.attachment.filter((file:any) => file._id !== fileId),
          });
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
      />
    </div>
  );
};

export default FRFormEdit;
