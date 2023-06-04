import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import LanguagesServices from '../Settings/extras/LanguagesService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import { Form, Link } from 'react-router-dom';
import ApplicationServices from '../Applications/extras/ApplicationServices';


const Languages = () => {
  const execDelete = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Language',
      variant: 'info',
    });
  };

  const columns: GridColDef<ILanguage>[] = [
    {
      field: 'Languages',
      headerName: 'Languages',
      align: 'left',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      headerAlign: 'center',
      renderCell: () => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
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
      renderCell: () => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const [languages, setLanguages] = useState<ILanguage[]|null>(null);
  const [newLanguage, setNewLanguage] = useState<CreatableLanguage>({
    name: '',
  });

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


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <CommonPageLayout title='Languages'>
      <Button variant="contained" sx={{ float: 'right', marginBottom: 3 }} startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add new
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          LanguagesServices.create(newLanguage)
          .then((res) => {
            setLanguages((langs) => langs === null ? [res.data] : [...langs, res.data]);
          });
          handleClose();
        }}>
          <DialogTitle>Add Language</DialogTitle>
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
              onChange={(e) => setNewLanguage((lang) => ({ ...lang, name: e.target.value })) }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' variant='contained' sx={{ right: 20, marginBottom: 2 }}
              color="success" >Add</Button>
          </DialogActions>
        </form>
      </Dialog>


      <Card style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={languages??[]}
          columns={columns}
          getRowId={(row) => row._id}
          loading={languages === null}
        />
      </Card>
    </CommonPageLayout>

  );
};

export default
Languages;
