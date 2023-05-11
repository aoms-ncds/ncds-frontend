import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, Link, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HRServices from './extras/HRServices';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import DepartmentsDropdown from './components/DepartmentsDropdown';
import DesignationsDropdown from './components/DesignationsDropdown';
import { useLoader } from '../../hooks/Loader';

const HRManagePage = () => {
  const loader = useLoader();

  const [departments, setDepartment] = useState<Department[] | undefined>();
  const [designations, setPosition] = useState<Designation[] | undefined>();
  const [staffs, setStaffs] = useState<Staff[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showStaffFormDialog, setShowStaffFormDialog] = useState(false);
  const [staffFormState, setStaffFormState] = useState<CreatableStaff>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    formattedId: '',
    age: 0,
    gender: 'Female',
  });

  const resetStaff = () => {
    setStaffFormState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      formattedId: '',
      age: 25,
      gender: 'Female',
    });
  };
  const handleClose = () => {
    setShowStaffFormDialog(false);
    resetStaff();
  };

  useEffect(() => {
    loader.onLoad();
    Promise.all([
      HRServices.getDepartment(),
      HRServices.getDesignations(),
      HRServices.getStaffs(),
    ])
      .then(([departmentRes, positionRes, staffsRes]) => {
        setDepartment(departmentRes.data);
        setPosition(positionRes.data);
        console.log(staffsRes);
        setStaffs(staffsRes.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loader.afterLoad();
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
                setShowStaffFormDialog(true);
                setAction('edit');
                setStaffFormState(() => ({
                  _id: props.row._id,
                  firstName: props.row.firstName,
                  lastName: props.row.lastName,
                  dob: props.row.dob,
                  doj: props.row.doj,
                  age: props.row.age,
                  gender: props.row.gender,
                  department: props.row.department,
                  designation: props.row.designation,
                  email: props.row.email,
                  phone: props.row.phone,
                  spouse: props.row.spouse,
                  formattedId: props.row.idFormat,
                }));
              },
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                const snackbarId = enqueueSnackbar({
                  message: 'Removing staff',
                  variant: 'info',
                });
                HRServices.markAsRemove(props.row._id)
                  .then((res) => {
                    if (staffs) {
                      const newDepartment = staffs.filter((staffs) => {
                        return staffs._id !== props.row._id;
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
    { field: 'spouse', headerName: 'Spouse of another employee', width: 130 },
    { field: 'idFormat', headerName: 'ID Format', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          setShowStaffFormDialog(true);
          setAction('add');
        }}
      >
          Add new
      </Button>
      <br/><br/>
      <Dialog
        open={showStaffFormDialog}
        onClose={handleClose}
        PaperProps={{ style: { width: '500px' } }}
      >
        <DialogTitle>
          {action === 'add' ? 'Add Staff' : `Edit Satff: ${staffFormState.firstName+' '+staffFormState.lastName} `}
        </DialogTitle>
        <form
          onSubmit={() => {
            const snackbarId = enqueueSnackbar({
              message: action === 'add' ? 'Creating Staff' : 'Updating Staff',
              variant: 'info',
            });
            HRServices.createStaff(staffFormState, action)
            .then((res) => {
              console.log(res);
              handleClose();
              closeSnackbar(snackbarId);
              enqueueSnackbar({
                message: res.message,
                variant: 'success',
              });
              resetStaff();
            })
            .catch((err) => {
              console.log(err);
              closeSnackbar(snackbarId);
              enqueueSnackbar({
                message: err.message,
                variant: 'error',
              });
            });
          }}>
          <DialogContent>
            <br />
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    label="Name"
                    value={staffFormState.firstName+' '+staffFormState.lastName}
                    onChange={(e) => {
                      setStaffFormState((newStaff) => ({
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
                    value={staffFormState.email}
                    onChange={(e) => {
                      setStaffFormState((newStaff) => ({
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
                    departments={departments}
                    onSelect={(department) => {
                      setStaffFormState((newStaff) => ({ ...newStaff, department }));
                    }}
                    selectedDepartment={staffFormState.department ?? null}
                  />
                </Grid>
                <Grid item md={12}>
                  <DesignationsDropdown
                    designations={designations}
                    onSelect={(designation) => {
                      setStaffFormState((newStaff) => ({ ...newStaff, designation }));
                    }}
                    selectedDesignation={staffFormState.department ?? null}
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              {action === 'add' ? 'Add' : 'Edit'}
            </Button>
          </DialogActions>
        </form>
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
