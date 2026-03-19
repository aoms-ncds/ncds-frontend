import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import LanguagesServices from '../Settings/extras/LanguagesService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import { ILanguage, CreatableLanguage } from './extras/LanguageTypes';

const Languages = () => {
  const [languages, setLanguages] = useState<ILanguage[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<ILanguage | null>(null);
  const [newLanguage, setNewLanguage] = useState<CreatableLanguage>({
    name: '' });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);

  const removeLanguage = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Language',
      variant: 'info',
    });
    LanguagesServices.delete(id)
      .then((res) => {
        if (languages) {
          const newLanguage = languages.filter((languages) => {
            return languages._id !== id;
          });
          setLanguages(newLanguage);
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
  const columns: GridColDef<ILanguage>[] = [
    {
      field: 'Languages',
      renderHeader: () => (<b>Languages</b>),
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
              setNewLanguage(params.row);
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
    LanguagesServices.getAll({ status: CommonLifeCycleStates.ACTIVE })
      .then((res) => {
        setLanguages(res.data);
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
    <CommonPageLayout title="Languages">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this language?</Container>
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
              LanguagesServices.create(newLanguage).then((res) => {
                setLanguages((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewLanguage({
                  name: '',
                });
              });
            } else {
              LanguagesServices.edit(newLanguage).then((res) => {
                setLanguages((langs) => (langs === null ? null : langs?.map((lang) => (lang._id === newLanguage._id ? res.data : lang))));

                setNewLanguage({
                  name: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Language</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="language"
              label="Enter Language to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage((lang) => ({ ...lang, name: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewLanguage({
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
          rows={languages ?? []} columns={columns} getRowId={(row) => row._id} loading={languages === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default Languages;
