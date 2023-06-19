import {
  Container,
  CardContent,
  Grid,
  InputLabel,
  Select,
  MenuItem,
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
  FormControl,
} from '@mui/material';
import { Delete as DeleteIcon, FileCopy as FileIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import DivisionsServices from '../../Divisions/extras/DivisionsServices';
import moment, { Moment } from 'moment';
import { monthNames } from '../extras/FRConfig';
import FileUploader from '../../../components/FileUploader';
import TestServices from '../../Tests/extras/TestServices';
import SendIcon from '@mui/icons-material/Send';
import StaffServices from '../../HR/extras/StaffServices';
import WorkersServices from '../../Workers/extras/WorkersServices';

const AddFRRequests = (props: FormComponentProps<CreatableFR>) => {
  const [showAddParticulardialog, setShowAddParticulardialog] = useState(false);
  const [purposes, setPurposes] = useState<FRPurpose[]>();
  const [sanctionedAsPer, setSanctionedAsPer] = useState<SanctionedAsPer[]>();
  const [coordinators, setCoordinators] = useState<Staff[]>();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [worker, setWorker] = useState<IWorker>({
    _id: '',
    workerCode: '',
    basicDetails: {
      firstName: '',
      lastName: '',
      dateOfBirth: moment('2022-12-31T18:30:00.000Z'),
      gender: 'Male',
      field: 'Missionary',
      martialStatus: 'Married',
      highestQualification: 'Ph.D.',
      // motherTongue: 'English',
      // communicationLanguage: 'English',
      // knownLanguages: ['English', 'Malayalam - മലയാളം'],
      email: 'abcd@gmail.com',
      phone: '1234567890',
      alternativePhone: '9876543210',
      PANNo: 'ABCD1234',
      licenseNumber: 'L12345678',
      permanentAddress: {
        buildingName: 'Puliyulla parambath',
        street: '123 Main Street',
        city: 'Example City',
        state: 'Example State',
        country: 'India',
        pincode: '12345',
      },
      currentOfficialAddress: {
        buildingName: 'Puliyulla parambath',
        street: '456 Elm Street',
        city: 'Current City',
        state: 'Current State',
        country: 'India',
        pincode: '54321',
      },
      residingAddress: {
        buildingName: 'Puliyulla parambath',
        street: '456 Elm Street',
        city: 'Current City',
        state: 'Current State',
        country: 'India',
        pincode: '54321',
      },
    },
    officialDetails: {
      dateOfJoining: moment('2022-12-31T18:30:00.000Z'),
      remarks: 'Lorem ipsum dolor sit amet.',
      selfSupport: true,
      status: 'Ministering',
      divisionHistory: [],
      noOfChurches: 5,
    },
    supportDetails: {
      totalNoOfYearsInMinistry: 10,
      withChurch: true,
    },
    supportStructure: {
      basic: 5000,
      HRA: 2000,
      spouseAllowance: 1000,
      positionalAllowance: 500,
      specialAllowance: 800,
      impactDeduction: 200,
      telAllowance: 400,
      PIONMissionaryFund: 300,
      MUTDeduction: 100,
    },
    children: [],
    createdAt: moment('2023-05-19T05:06:09.292Z'),
    updatedAt: moment('2023-05-19T05:06:09.292Z'),
  });
  const [divisions, setDivisions] = useState<Division[]>();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>();
  const [mainCategorys, setMainCategorys] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<SubCategory1>();
  const [selectedSubCategory2, setselectedSubCategory2] = useState<SubCategory2>();
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [Particulars, setParticulars] = useState<Particular[]>([]);
  const [newParticular, setNewParticular] = useState<CreatableParticular>({
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    quantity: '',
    month: '',
    requestedAmount: '',
    narration: '',
  });
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [staff, setStaff] = useState<Staff[]>();
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
  });

  const handleClose = () => {
    setShowAddParticulardialog(false);
  };
  useEffect(() => {
    const selectedMainCategoryObj = mainCategorys?.find((category) => category.name === props.value.mainCategory);
    setSelectedMainCategory(selectedMainCategoryObj);
    FRServices.getPurposes()
      .then((res) => {
        console.log(res);
        setPurposes(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    FRServices.getSanctionedAsPer()
      .then((res) => {
        console.log(res);
        setSanctionedAsPer(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    StaffServices.getAll()
      .then((res) => {
        setCoordinators(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    WorkersServices.getAll()
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
    StaffServices.getAll()
      .then((res) => {
        // console.log(res);
        setStaff(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    if (props.value.Particulars) {
      setParticulars(props.value.Particulars);
      console.log(Particulars);
    }
    // FRServices.getParticulars()
    //   .then((res) => {
    //     console.log(res);
    //     setParticulars(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  }, [props.value.Particulars]);
  const addParticulars = () => {
    const snackbarId = enqueueSnackbar({
      message: 'Adding Particulars',
      variant: 'info',
    });

    FRServices.addParticulars(newParticular)
      .then((res) => {
        console.log(res.data);
        setParticulars((prevParticulars) => [...prevParticulars, res.data]);
        handleClose();
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setNewParticular(() => ({
          _id: '',
          mainCategory: '',
          subCategory1: '',
          subCategory2: '',
          subCategory3: '',
          quantity: '',
          month: '',
          requestedAmount: '',
          narration: '',
        }));
        props.onChange({
          ...props.value,
          Particulars: [...(props.value.Particulars || []), res.data],
        });
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
  const deleteParticular = (particularid: string) => {
    // Perform delete logic
    const updatedParticulars = Particulars.filter((item) => item._id !== particularid);
    setParticulars(updatedParticulars);
    FRServices.deleteParticulars(particularid)
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
    // Implement your delete logic here, such as making an API request
  };
  const totalRequestedAmount = Particulars && Particulars.reduce((total, item) => total + Number(item.requestedAmount), 0);
  return (
    <div>
      <Container>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (props.onSubmit) {
                props.onSubmit(props.value); // Invoke props.onSubmit with the value as the argument
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
                  renderInput={(params) => <TextField {...params} label="Requisition For" required />}
                  fullWidth
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
                      renderInput={(params) => <TextField {...params} label="Choose Worker" required />}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Worker Code" value={props.value.purposeWorker?.workerCode} fullWidth disabled />
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
                    renderInput={(params) => <TextField {...params} label="Subdivision" required />}
                  />
                </Grid>
              ) : null}
              {props.value.purpose === 'Division' ? (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={props.value.purposeDivision}
                    options={divisions ?? []}
                    getOptionLabel={(division) => division.details.name}
                    onChange={(e, selectedDivision) => {
                      if (selectedDivision && props.action !== 'view') {
                        props.onChange({
                          ...props.value,
                          purposeDivision: selectedDivision,
                        });
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Division" required />}
                    fullWidth
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
                    renderInput={(params) => <TextField {...params} label="Choose Coordinator" required />}
                    fullWidth
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
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Typography>Particulars</Typography> <br />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={selectedMainCategory}
                  options={mainCategorys ?? []}
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
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Choose Main Category" required />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Button variant="contained" onClick={() => setShowAddParticulardialog(true)}>
                  Add Particulars
                </Button>
              </Grid>
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
                      {Particulars &&
                        Particulars.map((item, index) => (
                          <TableRow key={item._id}>
                            <TableCell component="th">
                              <IconButton>
                                <DeleteIcon onClick={() => deleteParticular(item._id || '')} />
                              </IconButton>
                              <IconButton onClick={() => setShowFileUploader(true)}>
                                <FileIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">{index+1}</TableCell>
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
                />
              </Grid>

              <Grid item xs={12} md={6}>
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

                    {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={props.value.sanctionedAsPer || ''}
                  options={sanctionedAsPer ?? []}
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
              </Grid>
              <Grid item xs={12}>
                {/* {props.action === 'edit' && ( */}
                <Button
                  variant="contained"
                  color="warning"
                  style={{ textAlign: 'left' }}
                  // onClick={() => {
                  //   toggleOpenRemarks(true);
                  // }}
                >
                  Print FR
                </Button>
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
                  {props.action === 'view' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
                      &nbsp;
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          const approvalSnack = enqueueSnackbar({ message: 'Approving FR', variant: 'info' });
                          if (props.onSubmit) {
                            const updatedValue = { ...props.value, status: 'approve' }; // Create a new object with updated status
                            props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                          }
                          setTimeout(() => {
                            closeSnackbar(approvalSnack);
                            const approvedSnack = enqueueSnackbar({ message: 'Approved!', variant: 'success' });
                            setTimeout(() => closeSnackbar(approvedSnack), 500);
                          }, 500);
                        }}
                      >
                        Approve
                      </Button>
                      &nbsp;
                    </>
                  ) : null}
                  {props.action === 'view' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
                      &nbsp;
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          const rejectionSnack = enqueueSnackbar({ message: 'Rejecting FR', variant: 'info' });
                          if (props.onSubmit) {
                            const updatedValue = { ...props.value, status: 'reject' }; // Create a new object with updated status
                            props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                          }
                          setTimeout(() => {
                            closeSnackbar(rejectionSnack);
                            const rejectedSnack = enqueueSnackbar({ message: 'Rejected!', variant: 'success' });
                            setTimeout(() => closeSnackbar(rejectedSnack), 500);
                          }, 500);
                        }}
                      >
                        Reject
                      </Button>
                      &nbsp;
                    </>
                  ) : null}
                  {props.action === 'view' ? (
                    <>
                      {/* Only display buttons if props.action is 'view' */}
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          const processingSnack = enqueueSnackbar({ message: 'Submitting FR to president', variant: 'info' });
                          if (props.onSubmit) {
                            const updatedValue = { ...props.value, status: 'sendToPresident' }; // Create a new object with updated status
                            props.onSubmit(updatedValue); // Invoke props.onSubmit with the updated value as the argument
                          }

                          setTimeout(() => {
                            closeSnackbar(processingSnack);
                            const processedSnack = enqueueSnackbar({ message: 'Submitted FR to president!', variant: 'success' });
                            setTimeout(() => closeSnackbar(processedSnack), 500);
                          }, 500);
                        }}
                      >
                        Submit to President
                      </Button>
                    </>
                  ) : null}
                  &nbsp;
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      if (props.onSubmit) {
                        props.onSubmit(props.value); // Invoke props.onSubmit with the value as the argument
                      }
                    }}
                  >
                    Submit{' '}
                  </Button>
                </div>
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
                              setselectedSubCategory2(selectedSubCategory2);
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
                          value={newParticular?.quantity}
                          onChange={(e) =>
                            setNewParticular((particularDetails) => ({
                              ...particularDetails,
                              quantity: e.target.value,
                            }))
                          }
                          fullWidth
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
                          label="Requested Amount"
                          type="number"
                          value={newParticular?.requestedAmount}
                          onChange={(e) =>
                            setNewParticular((particularDetails) => ({
                              ...particularDetails,
                              requestedAmount: e.target.value,
                            }))
                          }
                          fullWidth
                          required
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
                        <Button variant="contained" onClick={() => setShowFileUploader(true)}>
                          Attachments
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" onClick={addParticulars}>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <br />
              <Dialog open={openRemarks} fullWidth maxWidth="md">
                <DialogTitle>Remarks</DialogTitle>
                <DialogActions>
                  <TextField
                    id="remarkTextfield"
                    placeholder="Remarks"
                    multiline
                    value={remark?.remark}
                    onChange={(e) =>
                      setRemark((remark) => ({
                        ...remark,
                        remark: e.target.value,
                      }))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              remark.remark ?
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
                                    }) :
                                '';
                            }}
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
              </Dialog>
            </Grid>
          </form>
        </CardContent>
      </Container>
      <FileUploader
        title="Upload bills"
        types={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'video/quicktime', 'image/png']}
        // limits={{
        //   types: [],
        //   maxItemSize: "2M",
        //   maxItemCount: 3,
        //   maxTotalSize: "200M"
        // }}
        accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        getFiles={TestServices.getBills}
        uploadFile={TestServices.uploadFile}
        renameFile={TestServices.renameFile}
        deleteFile={(fileID: string) => {
          return TestServices.deleteFile(fileID);
        }}
      />
    </div>
  );
};

export default AddFRRequests;
