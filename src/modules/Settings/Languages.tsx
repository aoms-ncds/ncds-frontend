import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import LanguagesServices from '../Settings/extras/LanguagesService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';


const Languages = () => {
  const [languages, setLanguages] = useState<ILanguage[]|null>(null);
  const [newLanguage, setNewLanguage] = useState<CreatableLanguage>({
    name: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add'|'edit'|false>(false);

  const removeLanguage = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Language',
      variant: 'info',
    });
    LanguagesServices.delete(id)
      .then((res) => {
        console.log('process delete', res);
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


  const columns: GridColDef<ILanguage>[] = [
    {
      field: 'SI',
      headerName: 'SI',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.rowNode.rowIndex + 1,
    },
    {
      field: 'Languages',
      headerName: 'Languages',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.name,
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
            onClick={()=>{
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
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              removeLanguage(params.row._id);
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


  const handleClose = () => {
    setDialogAction(false);
  };

  return (

    <CommonPageLayout title='Languages'>
      <Button variant="contained" sx={{ float: 'right', marginBottom: 3 }} startIcon={<AddIcon />} onClick={() => {
        setDialogAction('add');
      }}>
        Add new
      </Button>
      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (dialogAction === 'add') {
            LanguagesServices.create(newLanguage)
            .then((res) => {
              setLanguages((langs) => langs === null ? [res.data] : [...langs, res.data]);
            });
          } else {
            LanguagesServices.edit(newLanguage)
            .then((res) => {
              setLanguages((langs) => langs === null ? null: langs?.map((lang) => lang._id === newLanguage._id ? res.data : lang));
            });
          }
          handleClose();
        }}>
          <DialogTitle>{dialogAction === 'add'? 'Add':'Edit'} Language</DialogTitle>
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
