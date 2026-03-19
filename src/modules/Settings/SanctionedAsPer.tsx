import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import SanctionedAsPerService from './extras/SanctionedAsPerService';

const SanctionedAsPer = () => {
  const [asPer, setAsPer] = useState<ISanctionedAsPer[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<ISanctionedAsPer | null>(null);
  const [newAsPer, setNewAsPer] = useState<CreatableSanctionedAsPer>({
    asPer: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  console.log(newAsPer, 'newAsPer');

  const removeReason = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing reason',
      variant: 'info',
    });
    SanctionedAsPerService.delete(id)
      .then((res) => {
        if (asPer) {
          const newReason = asPer.filter((asPer) => {
            return asPer._id !== id;
          });
          setAsPer(newReason);
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
  const columns: GridColDef<ISanctionedAsPer>[] = [
    {
      field: 'SanctionedAsPer',
      renderHeader: () => (<b>Sanctioned As Per</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.asPer,
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
              setNewAsPer(params.row);
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
    SanctionedAsPerService.getAll()
      .then((res) => {
        setAsPer(res.data);
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
    <CommonPageLayout title="Sanctioned As Per">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this sacntioned as per?</Container>
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
              removeReason(languageToDelete._id);
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
              SanctionedAsPerService.create(newAsPer).then((res) => {
                setAsPer((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewAsPer({
                  asPer: '',
                });
              });
            } else {
              SanctionedAsPerService.edit(newAsPer).then((res) => {
                setAsPer((langs) => (langs === null ? null : langs?.map((lang) => (lang._id === newAsPer._id ? res.data : lang))));

                setNewAsPer({
                  asPer: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Sanctioned as per</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Sanctioned as per"
              label="Enter sanctioned as per to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newAsPer.asPer}
              onChange={(e) => setNewAsPer((lang) => ({ ...lang, asPer: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewAsPer({
                  asPer: '',
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
          // style={{ height: '80vh', width: '100%' }}
          rows={asPer ?? []} columns={columns} getRowId={(row) => row._id} loading={asPer === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default SanctionedAsPer;
