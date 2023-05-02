import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import DepartmentsDropdown from './components/DepartmentsDropdown';
import DesignationsDropdown from './components/DesignationsDropdown';

const HRManagePage = () => {
  const [departments, setDepartments] = useState<Department[] | undefined>();
  const [designations, setDesignations] = useState<Designation[] | undefined>();
  const [staffs, setStaffs] = useState<Staff[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [open, setOpen] = React.useState(false);
  const [editStaff, seteditStaff] = useState<string>('');

  const [loadCount, setLoadCount] = useState(0);
  const onLoad = () => setLoadCount((count) => count+1);
  const afterLoad = () => setLoadCount((count) => count-1);

  const [newStaff, setNewStaff] = useState<CreateStaffRequest>({
    name: '',
    dob: undefined,
    doj: undefined,
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
    setNewStaff({
      name: '',
      dob: undefined,
      doj: undefined,
      phone: '',
      email: '',
      spouseOfAnotherEmployee: '',
      idFormat: '',
    });
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
        setNewStaff({
          name: '',
          dob: undefined,
          doj: undefined,
          phone: '',
          email: '',
          spouseOfAnotherEmployee: '',
          idFormat: '',
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

  useEffect(() => {
    HRServices.getDepartment()
    .then((res) => {
      setDepartments(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
    HRServices.getDesignations()
    .then((res) => {
      setDesignations(res.data);
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
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={1}
          label='Edit'
          icon={<EditIcon />}
          onClick={() => {
            setOpen(true);
            setAction('edit');
            seteditStaff(params.row.name);
            setNewStaff(() => ({
              _id: params.row._id,
              name: params.row.name,
              dob: params.row.dob,
              doj: params.row.doj,
              department: params.row.department,
              designation: params.row.designation,
              email: params.row.email,
              phone: params.row.phone,
              spouseOfAnotherEmployee: params.row.spouseOfAnotherEmployee,
              idFormat: params.row.idFormat,
            }));
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key={1}
          label='Delete'
          icon={<DeleteIcon />}
          onClick={() => {
            removeStaff(params.row._id);
          }}
          showInMenu
        />,
      ],
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
                <DepartmentsDropdown
                  loadCount={loadCount}
                  onLoad={onLoad}
                  afterLoad={afterLoad}
                  departments={departments}
                  onSelect={(department) => {
                    setNewStaff((newStaff) => ({ ...newStaff, department }));
                  }}
                  selectedDepartment={newStaff.department ?? null}
                />
              </Grid>
              <Grid item md={12}>
                <DesignationsDropdown
                  loadCount={loadCount}
                  onLoad={onLoad}
                  afterLoad={afterLoad}
                  designations={designations}
                  onSelect={(designation) => {
                    setNewStaff((newStaff) => ({ ...newStaff, designation }));
                  }}
                  selectedDesignation={newStaff.department ?? null}
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
