import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Box, Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Grid, Link, TextField, useMediaQuery } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';

const HRManagePage = () => {
  const [Department, setDepartment] = useState<Department[] | undefined>();
  const [Position, setPosition] = useState<Position[] | undefined>();
  const [staffs, setStaffs] = useState<Staff[]>();
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [open, setOpen] = React.useState(false);
  const [editStaff, seteditStaff] = useState<string>('');
  const [newStaff, setNewStaff] = useState<Staff>({
    _id: '',
    name: '',
    dob: '',
    doj: '',
    designation: {
      _id: '',
      name: '',
    },
    department: {
      _id: '',
      name: '',
    },
    phone: '',
    email: '',
    spouseOfAnotherEmployee: '',
    idFormat: '',

  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const createStaff = () => {
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Staff' : 'Updating Staff',
      variant: 'info',
    });
    HRServices.createStaff(newStaff, action)
      .then((res) => {
        console.log(res);
        handleClose();
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setNewStaff(() => ({
          _id: '',
          name: '',
          dob: '',
          doj: '',
          designation: {
            _id: '',
            name: '',
          },
          department: {
            _id: '',
            name: '',
          },
          phone: '',
          email: '',
          spouseOfAnotherEmployee: '',
          idFormat: '',
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
  useEffect(() => {
    HRServices.getDepartment()
    .then((res) => {
      setDepartment(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    HRServices.getPosition()
    .then((res) => {
      setPosition(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    HRServices.getStaffs()
      .then((res) => {
        console.log(res);
        setStaffs(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="attendance action"
          primaryText="Actions"
          key={'attendance action'}
          items={[
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              icon: EditIcon,
              onClick: () => {
                setOpen(true);
                setAction('edit');
                seteditStaff(props.row.name);
                setNewStaff(() => ({
                  _id: props.row._id,
                  name: props.row.name,
                  dob: props.row.dob,
                  doj: props.row.doj,
                  department: props.row.department,
                  designation: props.row.designation,
                  email: props.row.email,
                  phone: props.row.phone,
                  spouseOfAnotherEmployee: props.row.spouseOfAnotherEmployee,
                  idFormat: props.row.idFormat,
                }));
              },
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              // onClick: () => {
              //   removeStaff(props.row._id);
              // },
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'dob', headerName: 'DOB', width: 130 },
    { field: 'doj', headerName: 'DOJ', width: 130 },
    { field: 'designation', headerName: 'Designation', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'spouseOfAnotherEmployee', headerName: 'Spouse of another employee', width: 130 },
    { field: 'idFormat', headerName: 'ID Format', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          handleClickOpen();
          setAction('add');
        }}
      >
          Add new
      </Button>
      <br/><br/>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '500px',
          },
        }}
      >
        <DialogTitle>
          {action === 'add' ? 'Add Staff' : `Edit Satff: ${editStaff} `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Name</DialogContentText>
          <Container>
            <Grid container spacing={2}>
              <Grid item md={12}>
                {' '}
                <TextField
                  label="Name"
                  value={newStaff.name}
                  onChange={(e) => {
                    setNewStaff((newStaff) => ({
                      ...newStaff,
                      name: e.target.value,
                    }));
                  }}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Container>
          <br />
          <DialogContentText>Official Email id</DialogContentText>
          <Container>
            <Grid container spacing={2}>
              <Grid item md={12}>
                {' '}
                <TextField
                  label="Email Id"
                  value={newStaff.email}
                  onChange={(e) => {
                    setNewStaff((newStaff) => ({
                      ...newStaff,
                      email: e.target.value,
                    }));
                  }}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Container>
          <br />
          <DialogContentText>Department</DialogContentText>
          <Container>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id='department'
                value={newStaff?.department}
                options={Department ?? []}
                getOptionLabel={(dept) => dept.name}
                renderOption={(props, dept, { selected }) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {dept.name}
                  </Box>
                )}
                onChange={(e, newValue) => {
                  if (newValue) {
                    setNewStaff((newStaff) => ({
                      ...newStaff,
                      department: newValue,
                    }));
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Select Depaetment" required />}
                fullWidth
              />
            </Grid>
          </Container>
          <br />
          <DialogContentText>Position</DialogContentText>
          <Container>
            <Grid item md={12}>
              <Autocomplete
                id='position'
                value={newStaff?.designation}
                options={Position ?? []}
                getOptionLabel={(pos) => pos.name}
                renderOption={(props, pos, { selected }) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {pos.name}
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
                renderInput={(params) => <TextField {...params} label="Select Position" required />}
                fullWidth
              />
            </Grid>

          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={createStaff}>
            {action === 'add' ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={staffs??[]} columns={columns} getRowId={(row) => row._id}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
