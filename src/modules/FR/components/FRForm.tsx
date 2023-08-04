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
import PermissionChecks from '../../User/components/PermissionChecks';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/Authentication';

const FRForm = (props: FormComponentProps<CreatableFR>) => {
  const navigate = useNavigate();

  const [showAddParticularDialog, setShowAddParticularDialog] = useState(false);
  // const [purposes, setPurposes] = useState<FRPurpose[]>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [selectedParticularIndex, setSelectedParticularIndex] = useState<number|null>(null);
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>();
  const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<SubCategory1 | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<SubCategory2 | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { user } = useAuth();
  const [action, setAction] = useState<'add' | 'edit'>('add');
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
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [submit, setSubmit]= useState(0);
  const [particularDialog, setParticularDialog] = useState<'add'|'edit'>('add');

  const handleClose = () => {
    setShowAddParticularDialog(false);
    setAction('add');
  };

  useEffect(() => {
    console.log({ submit });
  }, [submit]);

  useEffect(() => {
    if ( props.value.purpose === 'Worker') {
      WorkersServices.getWorkersByDivision()
      .then((res) => {
        console.log(res.data, 'WORKER');
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
    // FRServices.getPurposes()
    //   .then((res) => {
    //     console.log(res);
    //     setPurposes(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });

    FRServices.getMainCategory()
      .then((res) => {
        console.log(res, 'getMainCategory');
        setMainCategories(res.data);
      })
      .catch((res) => {
        console.log(res);
      });

    if (props.value.particulars) {
      setParticulars(props.value.particulars);
      console.log(particulars);
    }
    // FRServices.getParticulars()
    //   .then((res) => {
    //     console.log(res);
    //     setParticulars(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  }, [props.value.particulars]);

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
      // console.log(particulars, '+++');
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
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  useEffect(() => {
    setSelectedMainCategory(() => mainCategories?.find((item) => item.name == newParticular.mainCategory));
    console.log(newParticular.mainCategory, 'newParticular.mainCategory');
  }, [newParticular]);
  useEffect(() => {
    setSelectedSubCategory1(() => selectedMainCategory?.subcategory1.find((item) => item.name == newParticular.subCategory1) ?? null);
    console.log(newParticular.subCategory1, 'newParticular.subcategory1');
  }, [selectedMainCategory]);
  useEffect(() => {
    setSelectedSubCategory2(() => selectedSubCategory1?.subcategory2.find((item) => item.name == newParticular.subCategory2) ?? null);
    console.log(newParticular.subCategory2, 'newParticular.subcategory2');
  }, [selectedSubCategory1]);
  useEffect(() => {
    setSelectedSubCategory3(() => selectedSubCategory2?.subcategory3.find((item) => item.name == newParticular.subCategory3) ?? null);
    console.log(newParticular.subCategory3, 'newParticular.subcategory3');
    // setShowAddParticularDialog(true);
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
                const updatedValue = { ...props.value, status: submit == 1 ? FRLifeCycleStates.WAITING_FOR_ACCOUNTS : submit == 2 ?
                  FRLifeCycleStates.WAITING_FOR_PRESIDENT : undefined }; // Create a new object with updated status
                props.onSubmit(updatedValue); // Invoke props.onSubmit with the value as the argument
              }
              navigate('/fr/');
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
                />
              </Grid>
              {props.value.purpose === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      value={props.value.purposeWorker ?? null}
                      options={workers ?? []}
                      getOptionLabel={(workers) => `${workers?.basicDetails.firstName} ${workers.basicDetails.lastName}`}
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
                      value={props.value.purposeWorker?.workerCode}
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
                  <Autocomplete
                    value={props.value.purposeCoordinator??null}
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
              {props.action=== 'add' &&(
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
                      renderInput={(params) => <TextField {...params} label="Choose Main Category" required />}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              {props.action === 'add' && (
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
                      setAction('add');
                    }}
                    disabled={!selectedMainCategory}
                  >
      Add particulars
                  </Button>
                </Grid>
              )}
              {particulars.length > 0 && (
                <Grid item xs={12}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">SI NO</TableCell>
                          <TableCell align="center">Particulars</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">For the Month of</TableCell>
                          <TableCell align="center">Requested Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {particulars.map((item, index) => (
                          <TableRow key={item._id}>
                            <TableCell component="th" sx={{ display: 'flex' }}>
                              <PermissionChecks
                                permissions={['WRITE_FR']}
                                granted={
                                  <IconButton>
                                    <DeleteIcon onClick={() => deleteParticular(item._id, index)} />
                                  </IconButton>
                                }
                              />
                              <IconButton>
                                <EditIcon onClick={() => editParticular(item, index)} />
                              </IconButton>
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
              )}
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
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      toggleOpenRemarks(true);
                    }}
                  >
                    Remark
                  </Button>
                  &nbsp;
                  {props.action === 'add' || props.action === 'edit' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
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
                    </>
                  ) : null}
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
                    }
                  />
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
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                    fullWidth
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
                    renderInput={(params) => <TextField {...params} label="Sub Category 3" required />}
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
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Requested Amount"
                    type="number"
                    value={newParticular?.requestedAmount}
                    onChange={(e) =>
                      setNewParticular((particularDetails) => ({
                        ...particularDetails,
                        unitPrice: Number(e.target.value),
                        requestedAmount: Number(e.target.value),
                      }))
                    }
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    label="Multiply By Quantity"
                    control={
                      <Checkbox
                        onChange={(e) =>
                          setNewParticular((particularDetails) => ({
                            ...particularDetails,
                            requestedAmount: e.target.checked ? (particularDetails?.quantity ?? 0) * (newParticular?.requestedAmount?? 0) : particularDetails?.unitPrice ?? 0,
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
                    value={newParticular?.requestedAmount}
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
                  />
                </Grid>
                <Grid item md={12}>
                  <Autocomplete
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
            console.log(res.data._id);
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

export default FRForm;
