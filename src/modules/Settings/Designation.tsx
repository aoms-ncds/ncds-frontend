import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DesignationService from './extras/DesignationService';

const Designation = () => {
  const [Designation, setDesignation] = useState<IDesignation[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [designationToDelete, setDesignationToDelete] = useState<IDesignation | null>(null);
  const [newDesignation, setNewDesignation] = useState<CreatableDesignation>({
    name: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);

  const removeDesignation = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Designation',
      variant: 'info',
    });

    DesignationService.delete(id)
      .then((res) => {
        if (Designation) {
          const newDesignation = Designation.filter((designation) => {
            return designation._id !== id;
          });
          setDesignation(newDesignation);
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
    setDesignationToDelete(null);
  };

  const columns: GridColDef<IDesignation>[] = [
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

              setNewDesignation(params.row);
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
              setDesignationToDelete(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    DesignationService.getAll()
      .then((res) => {
        setDesignation(res.data);
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

  const handleClose = () => {
    setDialogAction(false);
  };

  return (
    <CommonPageLayout title="Designation">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Designation?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDelete(false);
              setDesignationToDelete(null);
            }}
            variant="text"
          >
            No, Cancel
          </Button>
          <Button
            onClick={() => {
              if (designationToDelete) {
                removeDesignation(designationToDelete._id);
              }
              setConfirmDelete(false);
              setDesignationToDelete(null);
            }}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              DesignationService.create(newDesignation).then((res) => {
                setDesignation((desig) => (desig === null ? [res.data] : [...desig, res.data]));
                setNewDesignation({
                  name: '',
                });
              });
            } else {
              DesignationService.edit(newDesignation).then((res) => {
                setDesignation((desig) => (desig === null ? null : desig?.map((des) => (des._id === newDesignation._id ? res.data : des))));
                setNewDesignation({
                  name: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Designation</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Designation"
              label="Enter Designation to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newDesignation.name}
              onChange={(e) => setNewDesignation((desi) => ({ ...desi, name: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewDesignation({
                  name: '',
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

      <Card >
        <Grid container spacing={2} >
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

          rows={Designation ?? []} columns={columns} getRowId={(row) => row._id} loading={Designation === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default Designation;
