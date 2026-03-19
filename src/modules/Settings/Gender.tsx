import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import GenderService from './extras/GenderService';
import { IGender, CreatableGender } from './extras/LanguageTypes';

const Gender = () => {
  const [gender, setGender] = useState<IGender[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<IGender | null>(null);
  const [newGender, setnewGender] = useState<CreatableGender>({
    gender: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);

  const removeLanguage = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Gender',
      variant: 'info',
    });
    GenderService.delete(id)
            .then((res) => {
              if (gender) {
                const newGender = gender.filter((gender) => {
                  return gender._id !== id;
                });
                setGender(newGender);
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
  const columns: GridColDef<IGender>[] = [
    {
      field: 'gender',
      renderHeader: () => (<b>gender</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.gender,
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
              setnewGender(params.row);
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
    GenderService.getAll()
            .then((res) => {
              setGender(res.data);
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
    <CommonPageLayout title="Gender">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Gender?</Container>
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
              GenderService.create(newGender).then((res) => {
                setGender((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setnewGender({
                  gender: '',
                });
              });
            } else {
              GenderService.edit(newGender).then((res) => {
                setGender((langs) => (langs === null ? null : langs?.map((lang) => (lang._id === newGender._id ? res.data : lang))));

                setnewGender({
                  gender: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Gender</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Gender"
              label="Enter Gender to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newGender.gender}
              onChange={(e) => setnewGender((lang) => ({ ...lang, gender: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setnewGender({
                  gender: '',
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
          rows={gender ?? []} columns={columns} getRowId={(row) => row._id} loading={gender === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default Gender;
