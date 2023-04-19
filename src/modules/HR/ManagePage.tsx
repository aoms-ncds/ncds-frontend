import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, Link, TextField, createFilterOptions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
const filter = createFilterOptions<Department>();
const HRManagePage = () => {
  const [Department, setDepartment] = useState<Department[] | undefined>();
  const [Position, setPosition] = useState<Position[] | undefined>();
  const [staffs, setStaffs] = useState<Staff[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [open, setOpen] = React.useState(false);
  const [editStaff, seteditStaff] = useState<string>('');
  const [value, setValue] = useState<Department | null>(null);
  const [loadCount, setLoadCount] = useState(0);
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
    setLoadCount((count) => count+1);
    HRServices.getStaffs()
      .then((res) => {
        setLoadCount((count) => count-1);
        console.log(res);
        setStaffs(res.data);
      })
      .catch((res) => {
        setLoadCount((count) => count-1);
        console.log(res);
      });
  }, []);
  const removeStaff = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Removing staff',
      variant: 'info',
    });
    HRServices.markAsRemove(id)
      .then((res) => {
        console.log('Response', res);
        if (staffs) {
          const newDepartment = staffs.filter((staffs) => {
            return staffs._id !== id;
          });
          setStaffs(newDepartment);
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
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
              onClick: () => {
                removeStaff(props.row._id);
              },
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'dob', headerName: 'DOB', width: 130 },
    { field: 'doj', headerName: 'DOJ', width: 130 },
    { field: 'designation', headerName: 'Designation', renderCell: (props: any) => (
      <p> {props.row.designation?.name}</p>
    ), width: 130 },
    { field: 'department', headerName: 'Department', renderCell: (props: any) => (
      <p> {props.row.department?.name}</p>
    ), width: 130 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'spouseOfAnotherEmployee', headerName: 'Spouse of another employee', width: 130 },
    { field: 'idFormat', headerName: 'ID Format', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage Staff' loadCount={loadCount}>
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
              <Grid item md={12}>
                <Autocomplete
                  value={newStaff?.department}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValue({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValue({
                        name: newValue.inputValue,
                      });
                    } else {
                      if (newValue) {
                        setNewStaff((newStaff) => ({
                          ...newStaff,
                          department: newValue,
                        }));
                      }
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="department"
                  options={Department ?? []}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.name}</li>}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="department" />
                  )}
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  value={newStaff?.designation}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValue({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValue({
                        name: newValue.inputValue,
                      });
                    } else {
                      if (newValue) {
                        setNewStaff((newStaff) => ({
                          ...newStaff,
                          designation: newValue,
                        }));
                      }
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="designation"
                  options={Position ?? []}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.name}</li>}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="designation" />
                  )}
                />
              </Grid>
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
          <DataGrid rows={staffs??[]} columns={columns} getRowId={(row) => row._id} loading={staffs === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
