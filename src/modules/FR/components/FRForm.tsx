import {
  Container,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  Dialog,
  Autocomplete,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  TableContainer,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import HRServices from '../../HR/extras/HRServices';
import WorkerServices from '../../Workers/extras/WorkersServices';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import { Moment } from 'moment';
import { monthNames } from '../extras/FRConfig';

const AddFRRequests = (props: FormComponentProps<CreatableFR>) => {
  const [showAddParticulardialog, setShowAddParticulardialog] = useState(false);
  const [purposes, setPurposes] = useState<FRPurpose[]>();
  const [coordinators, setCoordinators] = useState<Staff[]>();
  const [workers, setWorkers] = useState<IETWorker[]>();
  const [divisions, setDivisions] = useState<IETDivisions[]>();
  const [subDivisions, setSubDivisions] = useState<Subdivisions[]>();
  const [mainCategorys, setMainCategorys] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>();
  const [selectedSubCategory1, setSelectedSubCategory1] =
    useState<SubCategory1>();
  const [selectedSubCategory2, setselectedSubCategory2] =
    useState<SubCategory2>();
  const [selectedSubCategory3, setSelectedSubCategory3] =
    useState<SubCategory3>();
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [Particulars, setParticulars] = useState<Particulars[]>();
  const [particularDetails, setParticularDetails] = useState<Particulars>({
    _id: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    quantity: '',
    month: '',
    requestedAmount: 0,
    narration: '',
  });
  const [staff, setStaff] = useState<Staff[]>();

  const handleClose = () => {
    setShowAddParticulardialog(false);
  };
  useEffect(() => {
    FRServices.getPurposes()
      .then((res) => {
        console.log(res);
        setPurposes(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    HRServices.getStaffs()
      .then((res) => {
        setCoordinators(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    WorkerServices.getAll()
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    DivisionsServices.getDivisions()
      .then((res) => {
        console.log(res.data);
        setDivisions(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    DivisionsServices.getSubDivisions()
      .then((res) => {
        setSubDivisions(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    FRServices.getMainCategory()
      .then((res) => {
        setMainCategorys(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    HRServices.getStaffs()
      .then((res) => {
        // console.log(res);
        setStaff(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    FRServices.getParticulars()
      .then((res) => {
        console.log(res);
        setParticulars(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const addParticulars = () => {
    console.log('here');
    const snackbarId = enqueueSnackbar({
      message: 'Adding Particulars',
      variant: 'info',
    });

    FRServices.addParticulars(particularDetails, action)
      .then((res) => {
        console.log(res);
        handleClose();
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setParticularDetails(() => ({
          _id: '',
          mainCategory: '',
          subCategory1: '',
          subCategory2: '',
          subCategory3: '',
          quantity: '',
          month: '',
          requestedAmount: 0,
          narration: '',
        }));
      })
      .catch((err) => {
        console.log(err);
        // if (err.error === "Duplicate entry") {
        //   setGroupExists(true);
        //   setActiveStep(0);
        // }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const totalRequestedAmount =
    Particulars &&
    Particulars.reduce((total, item) => total + item.requestedAmount, 0);
  return (
    <div>
      <Container>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit ? props.onSubmit(props.value) : '';
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date"
                  value={props.value.date}
                  onChange={(date) => {
                    if (props.action !== 'view') {
                      props.onChange({
                        ...props.value,
                        date: date as Moment,
                      });
                    }
                  }}
                  readOnly={props.action === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Autocomplete
                  value={props.value.purpose}
                  options={purposes ?? []}
                  getOptionLabel={(requisition) => requisition ?? ''}
                  onChange={(_e, selectedPurpose) => {
                    if (selectedPurpose && props.action !== 'view') {
                      props.onChange({
                        ...props.value,
                        purpose: selectedPurpose,
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Requisition for" required />
                  )}
                  fullWidth
                />
              </Grid>
              {props.value.purpose === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <Autocomplete
                      value={props.value.purposeWorker}
                      options={workers ?? []}
                      getOptionLabel={(worker) => worker.firstName}
                      onChange={(_e, selectedWorker) => {
                        if (selectedWorker && props.action !== 'view') {
                          props.onChange({
                            ...props.value,
                            purposeWorker: selectedWorker,
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Choose Worker" required />
                      )}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      label="Worker Code"
                      value={props.value.purposeWorker?.workerCode}
                      fullWidth
                      disabled
                    />
                  </Grid>
                </>
              ) : null}
              {props.value.purpose === 'Subdivision' ? (
                <Grid item xs={12} md={6} lg={6}>
                  <Autocomplete
                    value={props.value.purposeSubdivision}
                    options={subDivisions ?? []}
                    getOptionLabel={(subDivision) =>
                      subDivision.subDivisionName
                    }
                    onChange={(e, selectedSubdivision) => {
                      if (selectedSubdivision && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          purposeSubdivision: selectedSubdivision,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose Sub Division"
                        required
                      />
                    )}
                    fullWidth
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Division' ? (
                <Grid item xs={12} md={6} lg={6}>
                  <Autocomplete
                    value={props.value.purposeDivision}
                    options={divisions ?? []}
                    getOptionLabel={(division) => division.divisionName}
                    onChange={(e, selectedDivision) => {
                      if (selectedDivision && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          purposeDivision: selectedDivision,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Choose Division" required />
                    )}
                    fullWidth
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Coordinator' ? (
                <Grid item xs={12} md={6} lg={6}>
                  <Autocomplete
                    value={props.value.purposeCoordinator}
                    options={coordinators ?? []}
                    getOptionLabel={(coordinator) =>
                      coordinator.firstName + ' ' + coordinator.lastName
                    }
                    onChange={(e, selectedCoordinator) => {
                      if (selectedCoordinator && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          purposeCoordinator: selectedCoordinator,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose Coordinator"
                        required
                      />
                    )}
                    fullWidth
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Others' ? (
                <Grid item xs={12} md={6} lg={6}>
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
              <Grid item xs={12} md={12} lg={12}>
                <Typography>Particulars</Typography> <br />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Autocomplete
                  value={selectedMainCategory}
                  options={mainCategorys ?? []}
                  getOptionLabel={(mainCategory) => mainCategory.name}
                  onChange={(e, selectedMainCategory) => {
                    if (selectedMainCategory) {
                      setParticularDetails((particularDetails) => ({
                        ...particularDetails,
                        mainCategory: selectedMainCategory.name,
                      }));
                      setSelectedMainCategory(selectedMainCategory);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Main Category"
                      required
                    />
                  )}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Button
                  variant="contained"
                  onClick={() => setShowAddParticulardialog(true)}
                >
                  Add Purticulars
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">SI NO</TableCell>
                        <TableCell align="center">Particulars</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Month</TableCell>
                        <TableCell align="center">Required Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Particulars &&
                        Particulars.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell component="th">
                              <DeleteIcon />
                            </TableCell>
                            <TableCell align="center">{item._id}</TableCell>
                            <TableCell align="center">
                              {item.narration}
                            </TableCell>
                            <TableCell align="center">
                              {item.quantity}
                            </TableCell>
                            <TableCell align="center">{item.month}</TableCell>
                            <TableCell align="center">
                              {item.requestedAmount}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  label="Requested Amount"
                  InputLabelProps={{ shrink: true }}
                  value={totalRequestedAmount}
                  // onChange={(e) =>
                  //   // eslint-disable-next-line @typescript-eslint/naming-convention

                  // }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
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
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <InputLabel id="demo-simple-select-standard-label">
                  Sanctioned Bank
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label=" Group type"
                  required
                >
                  <MenuItem value={'FCRA'}>FCRA</MenuItem>
                  <MenuItem value={'Normal Bank'}>Normal Bank</MenuItem>

                  {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                </Select>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel id="demo-simple-select-standard-label">
                  Sanctioned As Per
                </InputLabel>
                <Autocomplete
                  id="Sanctioned As Per"
                  options={staff ?? []}
                  getOptionLabel={(staff) =>
                    staff.firstName + ' ' + staff.lastName ?? ''
                  }
                  renderOption={(props, staff, { selected }) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {staff.firstName + ' ' + staff.lastName}
                    </Box>
                  )}
                  // onChange={(e, selectedSubCategory2) => {
                  //   if (selectedSubCategory2) {
                  //     setSelectedSubCategory2(() => ({
                  //       ...selectedSubCategory2,
                  //       //       //       // name: selectedRequisition?.name,
                  //     }));
                  //     setParticulars((particulars) => ({
                  //       ...particulars,
                  //       FRsubCategory1: selectedSubCategory2.name,
                  //     }));

                  //     // console.log(selectedMainCategory.subcategory2);
                  //     setsubCategory3(selectedSubCategory2.subcategory3);
                  //   }
                  // }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sanctioned As Per"
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  )}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Button
                  variant="contained"
                  style={{ textAlign: 'right' }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>

              <Dialog
                open={showAddParticulardialog}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '1000px',
                  },
                }}
              >
                <DialogTitle>Add Particular</DialogTitle>
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
                              setParticularDetails((particularDetails) => ({
                                ...particularDetails,
                                subCategory1: selectedSubCategory1.name,
                              }));
                              setSelectedSubCategory1(selectedSubCategory1);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Sub Category 1"
                              required
                            />
                          )}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Autocomplete
                          value={selectedSubCategory2}
                          options={selectedSubCategory1?.subcategory2 ?? []}
                          getOptionLabel={(subcategory2) =>
                            subcategory2.name ?? ''
                          }
                          onChange={(_e, selectedSubCategory2) => {
                            if (selectedSubCategory2) {
                              setParticularDetails((particularDetails) => ({
                                ...particularDetails,
                                subCategory1: selectedSubCategory2.name,
                              }));
                              setselectedSubCategory2(selectedSubCategory2);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Sub Category 2"
                              required
                            />
                          )}
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
                              setParticularDetails((particularDetails) => ({
                                ...particularDetails,
                                subCategory1: selectedSubCategory3.name,
                                narration: selectedSubCategory3.narration,
                              }));
                              setSelectedSubCategory3(selectedSubCategory3);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Sub Category 3"
                              required
                            />
                          )}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={particularDetails?.quantity}
                          onChange={(e) =>
                            setParticularDetails((particularDetails) => ({
                              ...particularDetails,
                              quantity: e.target.value,
                            }))
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Autocomplete
                          value={particularDetails.month}
                          options={monthNames ?? []}
                          getOptionLabel={(monthName) => monthName}
                          onChange={(e, selectedMonth) => {
                            if (selectedMonth) {
                              setParticularDetails((particularDetails) => ({
                                ...particularDetails,
                                month: selectedMonth,
                              }));
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Month" required />
                          )}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          label="Requested Amount"
                          type="number"
                          value={particularDetails?.requestedAmount}
                          onChange={(e) =>
                            setParticularDetails((particularDetails) => ({
                              ...particularDetails,
                              requestedAmount: Number(e.target.value),
                            }))
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          label="Narration"
                          value={particularDetails.narration}
                          multiline
                          maxRows={4}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Container>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={addParticulars}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <br />
            </Grid>
          </form>
        </CardContent>
      </Container>
    </div>
  );
};

export default AddFRRequests;
