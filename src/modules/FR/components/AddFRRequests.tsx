import { Container, CardContent,
  Grid, FormControl, InputLabel,
  Select, MenuItem, TextField,
  Typography, Button, Dialog, Autocomplete,
  Box, DialogActions, DialogContent,
  DialogContentText, DialogTitle } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import FRParticularList from './FRParticularList';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FRServices from '../extras/FRServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
const AddFRRequests = () => {
  const [open, setOpen] = React.useState(false);
  const [requisition, setRequisition] = useState<Requisition[]>();
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition>({
    _id: '',
    RequisitionName: undefined,

  });
  const [coordinator, setCoordinator] = useState<Coordinator[]>();
  const [workers, setWorkers] = useState<IETWorker[]>();
  const [selectedWorker, setselectedWorker] = useState<IETWorker>({
    _id: '',
    workerName: '',
    workerCode: '',
  });
  const [divisions, setDivisions] = useState<IETDivisions[]>();
  const [subDivisions, setSubDivisions] = useState<Subdivisions[]>();
  const [mainCategorys, setMainCategorys] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory>({
    name: '',
    subcategory2: [],
  });
  const [subCategory2, setsubCategory2] = useState<SubCategory2[]>();
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<SubCategory2>({
    name: '',
    subcategory3: [],
  });
  const [subCategory3, setsubCategory3] = useState<SubCategory3[]>();
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3>({
    name: '',
    subcategory4: [],
  });
  const [subCategory4, setsubCategory4] = useState<SubCategory4[]>();
  const [selectedSubCategory4, setSelectedSubCategory4] = useState<SubCategory4>({
    name: '',
    narration: '',
  });
  const [monthName, setMonthName] = useState<Month[]>();
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [particulars, setParticulars] = useState<Particulars>({
    _id: '',
    FRmainCategory: '',
    FRsubCategory1: '',
    FRsubCategory2: '',
    FRsubCategory3: '',
    FRquantity: '',
    FRmonth: '',
    FRrequestedAmount: '',
    FRnarration: '',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    FRServices.getRequisition()
   .then((res) => {
     console.log(res);
     setRequisition(res.data);
   })
  .catch((res) => {
    console.log(res);
  });
    FRServices.getCoordiantor()
    .then((res) => {
      setCoordinator(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    FRServices.getWorker()
    .then((res) => {
      setWorkers(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    FRServices.getDivisions()
    .then((res) => {
      setDivisions(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    FRServices.getSubDivisions()
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
    FRServices.getMonth()
    .then((res) => {
      setMonthName(res.data);
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
    FRServices.addParticulars(particulars, action)
      .then((res) => {
        console.log(res);
        handleClose();
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setParticulars(() => ({
          _id: '',
          FRmainCategory: '',
          FRsubCategory1: '',
          FRsubCategory2: '',
          FRsubCategory3: '',
          FRquantity: '',
          FRmonth: '',
          FRrequestedAmount: '',
          FRnarration: '',

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
  return (
    <div>
      <Container>
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker label="Date" />

                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Autocomplete
                  id='requisition'
                  // value={(requisition) => requisition.RequisitionName}
                  options={requisition ?? []}
                  getOptionLabel={(requisition) => requisition.RequisitionName ?? ''}
                  renderOption={(props, requisition, { selected }) => (
                    <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {requisition.RequisitionName}
                    </Box>
                  )}
                  onChange={(e, selectedRequisition) => {
                    if (selectedRequisition) {
                      setSelectedRequisition(() => ({
                        ...selectedRequisition,
                      // RequisitionName: selectedRequisition?.RequisitionName,
                      }));
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Requisition for" required />}
                  fullWidth
                />
              </Grid>
              {selectedRequisition?.RequisitionName === 'Worker' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Autocomplete
                        id='worker'
                        // value={(requisition) => requisition.RequisitionName}
                        options={workers ?? []}
                        getOptionLabel={(worker) => worker.workerName ?? ''}
                        renderOption={(props, worker, { selected }) => (
                          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {worker.workerName}
                          </Box>
                        )}
                        onChange={(e, selectedWorker) => {
                          if (selectedWorker) {
                            setselectedWorker(() => ({
                              ...selectedWorker,
                              // RequisitionName: selectedRequisition?.RequisitionName,
                            }));
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Choose Worker" required />}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <TextField
                        label="Worker Code"
                        value={selectedWorker.workerCode}
                        // onChange={(e) =>
                        //   setGroup((group) => ({
                        //     ...group,
                        //     description: e.target.value,
                        //   }))
                        // }
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                </>
              ): null}
              {selectedRequisition?.RequisitionName === 'Subdivision' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Autocomplete
                        id='subdivision'
                        // value={(requisition) => requisition.RequisitionName}
                        options={subDivisions ?? []}
                        getOptionLabel={(subDivision) => subDivision.subDivisionName ?? ''}
                        renderOption={(props, subDivision, { selected }) => (
                          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {subDivision.subDivisionName}
                          </Box>
                        )}
                        // onChange={(e, selectedWorker) => {
                        //   if (selectedWorker) {
                        //     setselectedWorker(() => ({
                        //       ...selectedWorker,
                        //       // RequisitionName: selectedRequisition?.RequisitionName,
                        //     }));
                        //   }
                        // }}
                        renderInput={(params) => <TextField {...params} label="Choose Sub Division" required />}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                </>
              ): null}
              {selectedRequisition?.RequisitionName === 'Division' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Autocomplete
                        id='division'
                        // value={(requisition) => requisition.RequisitionName}
                        options={divisions ?? []}
                        getOptionLabel={(division) => division.divisionName ?? ''}
                        renderOption={(props, division, { selected }) => (
                          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {division.divisionName}
                          </Box>
                        )}
                        // onChange={(e, selectedWorker) => {
                        //   if (selectedWorker) {
                        //     setselectedWorker(() => ({
                        //       ...selectedWorker,
                        //       // RequisitionName: selectedRequisition?.RequisitionName,
                        //     }));
                        //   }
                        // }}
                        renderInput={(params) => <TextField {...params} label="Choose Sub Division" required />}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                </>
              ): null}
              {selectedRequisition?.RequisitionName === 'Coordinator' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Autocomplete
                        id='coordinator'
                        // value={(requisition) => requisition.RequisitionName}
                        options={coordinator ?? []}
                        getOptionLabel={(coordinator) => coordinator.coordinatorName ?? ''}
                        renderOption={(props, coordinator, { selected }) => (
                          <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {coordinator.coordinatorName}
                          </Box>
                        )}
                        // onChange={(e, selectedRequisition) => {
                        //   if (selectedRequisition) {
                        //     setSelectedRequisition(() => ({
                        //       ...selectedRequisition,
                        //       // RequisitionName: selectedRequisition?.RequisitionName,
                        //     }));
                        //   }
                        // }}
                        renderInput={(params) => <TextField {...params} label="Choose Coordinator" required />}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>

                </>
              ): null}
              {selectedRequisition?.RequisitionName === 'Others' ? (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <FormControl variant="outlined" fullWidth>
                      <TextField
                        label="Others"
                        // value={group.description}
                        // onChange={(e) =>
                        //   setGroup((group) => ({
                        //     ...group,
                        //     description: e.target.value,
                        //   }))
                        // }
                        fullWidth
                      />
                    </FormControl>
                  </Grid>

                </>
              ): null}


              <Grid item xs={12} md={12} lg={12}>
                <Typography>Particulars</Typography> <br />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <Autocomplete
                    id='maincategory'
                    // value={(requisition) => requisition.RequisitionName}
                    options={mainCategorys ?? []}
                    getOptionLabel={(mainCategory) => mainCategory.name ?? ''}
                    renderOption={(props, mainCategory, { selected }) => (
                      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {mainCategory.name}
                      </Box>
                    )}
                    onChange={(e, selectedMainCategory) => {
                      if (selectedMainCategory) {
                        setSelectedMainCategory(() => ({
                          ...selectedMainCategory,
                          //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                        }));

                        console.log(selectedMainCategory.subcategory2);
                        setsubCategory2(selectedMainCategory.subcategory2);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose Main Category" required />}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
          Add Purticulars
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FRParticularList />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Requested Amount"
                    value={particulars?.FRrequestedAmount}
                    // onChange={(e) =>
                    //   // eslint-disable-next-line @typescript-eslint/naming-convention

                    // }
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Sanctioned Amount"
                    type={'number'}
                    // value={group.description}
                    // onChange={(e) =>
                    //   setGroup((group) => ({
                    //     ...group,
                    //     description: e.target.value,
                    //   }))
                    // }
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>

                  <InputLabel id="demo-simple-select-standard-label">Sanctioned Bank</InputLabel>
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
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>

                  <InputLabel id="demo-simple-select-standard-label">Sanctioned As Per</InputLabel>
                  <Autocomplete
                    id='Sanctioned As Per'
                    value={subCategory2?.find((subcategory2) => subcategory2.name === particulars?.FRsubCategory1) ?? null}
                    options={subCategory2?? []}
                    getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                    renderOption={(props, subcategory2, { selected }) => (
                      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {subcategory2.name}
                      </Box>
                    )}
                    // onChange={(e, selectedSubCategory2) => {
                    //   if (selectedSubCategory2) {
                    //     setSelectedSubCategory2(() => ({
                    //       ...selectedSubCategory2,
                    //       //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                    //     }));
                    //     setParticulars((particulars) => ({
                    //       ...particulars,
                    //       FRsubCategory1: selectedSubCategory2.name,
                    //     }));

                    //     // console.log(selectedMainCategory.subcategory2);
                    //     setsubCategory3(selectedSubCategory2.subcategory3);
                    //   }
                    // }}
                    renderInput={(params) => <TextField {...params} label="Sanctioned As Per" required />}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Button
                  variant="contained"
                  style={{ textAlign: 'right' }}
                  type='submit'
                >
  Submit
                </Button>
              </Grid>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '1000px',
                  },
                }}
              >
                <DialogTitle>Add Particular</DialogTitle>
                <DialogContent>
                  <DialogContentText>Subcategory1</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <Autocomplete
                            id='subcategory1'
                            value={subCategory2?.find((subcategory2) => subcategory2.name === particulars?.FRsubCategory1) ?? null}
                            options={subCategory2?? []}
                            getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                            renderOption={(props, subcategory2, { selected }) => (
                              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {subcategory2.name}
                              </Box>
                            )}
                            onChange={(e, selectedSubCategory2) => {
                              if (selectedSubCategory2) {
                                setSelectedSubCategory2(() => ({
                                  ...selectedSubCategory2,
                                  //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                                }));
                                setParticulars((particulars) => ({
                                  ...particulars,
                                  FRsubCategory1: selectedSubCategory2.name,
                                }));

                                // console.log(selectedMainCategory.subcategory2);
                                setsubCategory3(selectedSubCategory2.subcategory3);
                              }
                            }}
                            renderInput={(params) => <TextField {...params} label="Sub Category1" required />}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Subcategory2</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <Autocomplete
                            id='subcategory2'
                            value={subCategory3?.find((subcategory3) => subcategory3.name === particulars?.FRsubCategory2) ?? null}
                            options={subCategory3?? []}
                            getOptionLabel={(subcategory3) => subcategory3.name ?? ''}
                            renderOption={(props, subcategory3, { selected }) => (
                              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {subcategory3.name}
                              </Box>
                            )}
                            onChange={(e, selectedSubCategory3) => {
                              if (selectedSubCategory3) {
                                setSelectedSubCategory3(() => ({
                                  ...selectedSubCategory3,
                                  //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                                }));
                                setsubCategory4(selectedSubCategory3.subcategory4);
                                setParticulars((particulars) => ({
                                  ...particulars,
                                  FRsubCategory2: selectedSubCategory3.name,
                                }));
                              }
                            }}
                            renderInput={(params) => <TextField {...params} label="Sub Category2" required />}
                            fullWidth
                          />

                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Subcategory3</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <Autocomplete
                            id='subcategory4'
                            value={subCategory4?.find((subcategory4) => subcategory4.name === particulars?.FRsubCategory3) ?? null}
                            options={subCategory4?? []}
                            getOptionLabel={(subCategory4) => subCategory4.name ?? ''}
                            renderOption={(props, subcategory4, { selected }) => (
                              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {subcategory4.name}
                              </Box>
                            )}
                            onChange={(e, selectedSubCategory4) => {
                              if (selectedSubCategory4) {
                                setSelectedSubCategory4(() => ({
                                  ...selectedSubCategory4,
                                  //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                                }));
                                setParticulars((particulars) => ({
                                  ...particulars,
                                  FRsubCategory3: selectedSubCategory4.name,
                                }));

                                // console.log(selectedMainCategory.subcategory2);
                              }
                            }}
                            renderInput={(params) => <TextField {...params} label="Sub Category2" required />}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Quantity</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <TextField
                            label="Quantity"
                            type={'number'}
                            value={particulars?.FRquantity}
                            onChange={(e) =>
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                              setParticulars((particulars) => ({
                                ...particulars,
                                FRquantity: e.target.value,
                              }))
                            }
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Month</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <Autocomplete
                            id='month'
                            // value={(requisition) => requisition.RequisitionName}
                            options={monthName?? []}
                            getOptionLabel={(month) => month.monthName ?? ''}
                            renderOption={(props, month, { selected }) => (
                              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {month.monthName}
                              </Box>
                            )}
                            // onChange={(e, selectedSubCategory4) => {
                            //   if (selectedSubCategory4) {
                            //     setSelectedSubCategory4(() => ({
                            //       ...selectedSubCategory4,
                            //       //       //       // RequisitionName: selectedRequisition?.RequisitionName,
                            //     }));

                            //     // console.log(selectedMainCategory.subcategory2);
                            //   }
                            // }}
                            renderInput={(params) => <TextField {...params} label="Month" required />}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Requested Amount</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <TextField
                            label="Requisted Amount"
                            type={'number'}
                            value={particulars?.FRrequestedAmount}
                            onChange={(e) =>
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                              setParticulars((particulars) => ({
                                ...particulars,
                                FRrequestedAmount: e.target.value,
                              }))
                            }
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container><br /><br />
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder=""
                            style={{ width: 500 }}
                            value={selectedSubCategory4.narration}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" onClick={addParticulars}>
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
