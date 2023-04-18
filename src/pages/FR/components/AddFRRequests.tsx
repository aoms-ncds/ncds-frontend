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
const AddFRRequests = () => {
  const [open, setOpen] = React.useState(false);
  const [Requisition, setRequisition] = useState<Requisition[]>();
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
  }, []);
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
                  id='position'
                  // value={newStaff?.designation}
                  options={Requisition ?? []}
                  getOptionLabel={(requisition) => requisition.RequisitionName}
                  renderOption={(props, pos, { selected }) => (
                    <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {pos.RequisitionName}
                    </Box>
                  )}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewStaff((newStaff) => ({
                        ...newStaff,
                        designation: newValue,
                      }));
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Requisition for" required />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Choose Worker</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label=" Group type"
                    required
                  >
                    <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                    <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                    <MenuItem value={'Missionary'}>Missionary</MenuItem>
                    {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label="Worker Code"
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

              <Grid item xs={12} md={12} lg={12}>
                <Typography>Particulars</Typography> <br />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>

                  <InputLabel id="demo-simple-select-standard-label">Main Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label=" Group type"
                    required
                  >
                    <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                    <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                    <MenuItem value={'Missionary'}>Missionary</MenuItem>
                    {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                  </Select>
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
                    <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                    <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                    <MenuItem value={'Missionary'}>Missionary</MenuItem>
                    {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>

                  <InputLabel id="demo-simple-select-standard-label">Sanctioned As Per</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label=" Group type"
                    required
                  >
                    <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                    <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                    <MenuItem value={'Missionary'}>Missionary</MenuItem>
                    {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                  </Select>
                </FormControl>
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
                          <InputLabel id="demo-simple-select-standard-label">Subcategory 1</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label=" Group type"
                            required
                          >
                            <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                            <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                            <MenuItem value={'Missionary'}>Missionary</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
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
                          <InputLabel id="demo-simple-select-standard-label">Subcategory 2</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label=" Group type"
                            required
                          >
                            <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                            <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                            <MenuItem value={'Missionary'}>Missionary</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
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
                          <InputLabel id="demo-simple-select-standard-label">Subcategory 3</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label=" Group type"
                            required
                          >
                            <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                            <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                            <MenuItem value={'Missionary'}>Missionary</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
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
                    </Grid>
                  </Container>
                  <br />
                  <DialogContentText>Month</DialogContentText>
                  <Container>
                    <Grid container spacing={12}>
                      <Grid item md={12}>
                        {' '}
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="demo-simple-select-standard-label">Month</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label=" Group type"
                            required
                          >
                            <MenuItem value={'Spiritual Org'}>Spiritual Org</MenuItem>
                            <MenuItem value={'Prayer Group'}>Prayer Group</MenuItem>
                            <MenuItem value={'Missionary'}>Missionary</MenuItem>
                            {/* <MenuItem value={"Widowed"}>Widowed</MenuItem> */}
                          </Select>
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
                            style={{ width: 200 }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                  <br />

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">
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
