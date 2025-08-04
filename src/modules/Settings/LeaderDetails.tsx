import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import LeaderDetailsService from './extras/LeaderDetailsService';

const LeaderDetails = () => {
  const [Label, setLeaderHeading] = useState<ILeaderDetails[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<ILeaderDetails | null>(null);
  const [newHeading, setNewLeader] = useState<CreatableLeaderDetails>({
    name: '',
    order: 0,
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);

  const removeLanguage = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Label',
      variant: 'info',
    });
    LeaderDetailsService.delete(id)
            .then((res) => {
              if (Label) {
                const newHeading = Label.filter((Label) => {
                  return Label._id !== id;
                });
                setLeaderHeading(newHeading);
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
  const handleClose = () => {
    setDialogAction(false);
  };
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setLanguageToDelete(null);
  };
  const columns: GridColDef<ILeaderDetails>[] = [
    {
      field: 'name',
      renderHeader: () => (<b>Name</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      renderHeader: () => (<b>Edit</b>),
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
              setNewLeader(params.row);
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
      renderHeader: () => (<b>Delete</b>),
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
              setLanguageToDelete(params.row);
            }}
          >
                        Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    LeaderDetailsService.getAll()
            .then((res) => {
              setLeaderHeading(res.data);
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


  return (
    <CommonPageLayout title="Add Label">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Label?</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="text">
                        No, Cancel
          </Button>
          <Button onClick={() => {
            if (languageToDelete) {
              removeLanguage(languageToDelete._id);
            }
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="contained" color="error">
                        Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              LeaderDetailsService.create(newHeading).then((res) => {
                setLeaderHeading((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewLeader({
                  name: '',
                });
                window.location.reload();
              });
            } else {
              LeaderDetailsService.edit(newHeading).then((res) => {
                setLeaderHeading((Label) => (Label === null ? null : Label?.map((Label) => (Label._id === newHeading._id ? res.data : Label))));

                setNewLeader({
                  name: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Label</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="leaders"
              label="Enter Name to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newHeading.name}
              onChange={(e) => setNewLeader((leaders) => ({ ...leaders, name: e.target.value }))}
              required
            />
            {dialogAction !=='edit'&&(

              <TextField
                autoFocus
                margin="dense"
                id="order"
                label="Enter Order number"
                type="number"
                fullWidth
                variant="outlined"
                value={newHeading.order}
                onChange={(e) => setNewLeader((leaders:any) => ({ ...leaders, order: e.target.value }))}
                required
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewLeader({
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

      <Card>
        {Label?.length !=5 && (
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
        )}

        <DataGrid
          sx={{ height: '80vh', width: '100%' }}
          // style={{ height: '80vh', width: '100%' }}
          rows={Label ?? []} columns={columns} getRowId={(row) => row._id} loading={Label === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default LeaderDetails;
