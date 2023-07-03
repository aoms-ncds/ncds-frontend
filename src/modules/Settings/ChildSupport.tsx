import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// import ChaildSupportService from '../Settings/extras/LanguagesService';
import ChaildSupportService from './extras/ChaildSupportService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';

const ChaildSupport = () => {
  const [Designation, setDesignation] = useState<IDesignation[] | null>(null);
  const [newDesignation, setNewDesignation] = useState<MyCreatableDesignation>({
    name: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const removeDesignation = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Designation',
      variant: 'info',
    });
    ChaildSupportService.delete(id)
      .then((res) => {
        console.log('process delete', res);
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

  const columns: GridColDef<IDesignation>[] = [
    {
      field: 'SI',
      headerName: 'SI',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      // valueGetter: (params) => params.row.name,
    },
    {
      field: 'Designation',
      headerName: 'Designation',
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
            onClick={() => {
              setDialogAction('edit');
              console.log(dialogAction);
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
              removeDesignation(params.row._id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    ChaildSupportService.getAll({ status: CommonLifeCycleStates.ACTIVE })
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
      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              ChaildSupportService.create(newDesignation).then((res) => {
                setDesignation((desig) => (desig === null ? [res.data] : [...desig, res.data]));
              });
            } else {
              ChaildSupportService.edit(newDesignation).then((res) => {
                setDesignation((desig) => (desig === null ? null : desig?.map((des) => (des._id === newDesignation._id ? res.data : des))));
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
            <Button type="submit" variant="contained" sx={{ right: 20, marginBottom: 2 }} color="success">
              {dialogAction}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Card style={{ height: '80vh', width: '100%' }}>
        <DataGrid rows={Designation ?? []} columns={columns} getRowId={(row) => row._id} loading={Designation === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default ChaildSupport;
