import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Designation from './Designation';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DesignationService from './extras/DesignationService';
import DepartmentService from './extras/DepartmentService';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import AppliedForService from './extras/AppliedForService';

const AppliedFor = () => {
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const [department, setDepartment] = useState<Department[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<CreatableDepartment>({
    name: '',
    status: 0,
  });

  const removeDepartment = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing appliedFor',
      variant: 'info',
    });
    AppliedForService.delete(id)
      .then((res) => {
        if (department) {
          const newDepartment = department.filter((dept) => {
            return dept._id !== id;
          });
          setDepartment(newDepartment);
        }
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

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setDepartmentToDelete(null);
  };

  const handleClose = () => {
    setDialogAction(false);
  };

  useEffect(() => {
    AppliedForService.getAll()
      .then((res) => {
        setDepartment(res.data);
        handleClose();
        enqueueSnackbar({
          variant: 'success',
          message: res.message,
        });
      })
      .catch((res) => {
        console.log(res);
        handleClose();
        enqueueSnackbar({
          variant: 'error',
          message: res.message,
        });
      });
  }, []);

  const columns: GridColDef<Department>[] = [
    {
      field: 'name',
      headerName: 'Name',
      align: 'left',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setDialogAction('edit');

              setNewDepartment(params.row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setConfirmDelete(true);
              setDepartmentToDelete(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <CommonPageLayout title="Applied For">
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ px: 2 }}>
              <br />
              <Button
                variant="contained"
                sx={{ float: 'right', marginBottom: 3 }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setDialogAction('add');
                }}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
          <DataGrid
            sx={{ height: '80vh', width: '100%' }}
            rows={department ?? []} // Use the 'department' state here
            columns={columns}
            getRowId={(row) => row._id}
            loading={department === null}
          />
        </Card>
      </CommonPageLayout>

      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              AppliedForService.create(newDepartment).then((res) => {
                setDepartment((dep) => (dep === null ? [res.data] : [...dep, res.data]));
                setNewDepartment({
                  name: '',
                  status: 0,
                });
              });
            } else {
              AppliedForService.edit(newDepartment).then((res) => {
                setDepartment((dep) => (dep === null ? null : dep?.map((des) => (des._id === newDepartment._id ? res.data : des))));
                setNewDepartment({
                  name: '',
                  status: 0,
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Applied For</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="appliedFor"
              label="Enter Applied For to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment((newDepartment) => ({ ...newDepartment, name: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewDepartment({
                  name: '',
                  status: 0,
                });
              }}
              variant="contained"
              sx={{ right: 20, marginBottom: 2 }}
              color="error"
            >
              Close
            </Button>
            <Button type="submit" variant="contained" sx={{ right: 20, marginBottom: 2 }} color="success">
              {dialogAction}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Applied For?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDelete(false);
              setDepartmentToDelete(null);
            }}
            variant="text"
          >
            No, Cancel
          </Button>
          <Button
            onClick={() => {
              if (departmentToDelete) {
                removeDepartment(departmentToDelete._id);
              }
              setConfirmDelete(false);
              setDepartmentToDelete(null);
            }}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppliedFor;
