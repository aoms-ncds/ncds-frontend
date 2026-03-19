import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ChildSupportService from './extras/ChildSupportService';
import { IChildSupport, ILanguage, MyCreatableChildSupport } from './extras/LanguageTypes';

const ChildSupport = () => {
  const [childSupport, setChildSupport] = useState<IChildSupport[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [childSupportToDelete, setChildSupportToDelete] = useState<ILanguage | null>(null);
  const [newChildSupport, setNewChildSupport] = useState<MyCreatableChildSupport>({
    name: '',
    status: 0,
    amount: 0,
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const removeChildSupport = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing ChildSupport',
      variant: 'info',
    });
    ChildSupportService.delete(id)
      .then((res) => {
        if (childSupport) {
          const newChildSupport = childSupport?.filter((childSupport) => {
            return childSupport._id !== id;
          });
          setChildSupport(newChildSupport);
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
    setChildSupportToDelete(null);
  };

  const columns: GridColDef<IChildSupport>[] = [
    {
      field: 'ChildSupport',
      headerName: 'Child Support',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'Amount',
      headerName: 'Amount',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.amount,
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

              setNewChildSupport(params.row);
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
              setChildSupportToDelete(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    ChildSupportService.getAll()
      .then((res) => {
        setChildSupport(res.data);
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
    <CommonPageLayout title="Child Support">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Child Support?</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false);
            setChildSupportToDelete(null);
          }} variant="text">
            No, Cancel
          </Button>
          <Button onClick={() => {
            if (childSupportToDelete) {
              removeChildSupport(childSupportToDelete._id);
            }
            setConfirmDelete(false);
            setChildSupportToDelete(null);
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
              ChildSupportService.create(newChildSupport).then((res) => {
                setChildSupport((prevChildSupport) => (prevChildSupport === null ? [res.data] : [...prevChildSupport, res.data]));
                setNewChildSupport({
                  name: '',
                  status: 0,
                  amount: 0,
                });
              });
            } else {
              ChildSupportService.edit(newChildSupport).then((res) => {
                setChildSupport((childSupport) => (childSupport === null ? null : childSupport?.map((childsprt) => (childsprt._id === newChildSupport._id ? res.data : childsprt))));
                setNewChildSupport({
                  name: '',
                  status: 0,
                  amount: 0,
                });
              });
            }

            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Child Support</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="ChildSupport"
              label="Enter ChildSupport to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newChildSupport.name}
              onChange={(e) => setNewChildSupport((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="ChildSupport"
              label="Enter Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={newChildSupport.amount}
              onChange={(e) => setNewChildSupport((prev) => ({ ...prev, amount: Number(e.target.value) }))}
              required
              inputProps={{
                onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  event.currentTarget.blur();
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewChildSupport({
                  name: '',
                  status: 0,
                  amount: 0,
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

          rows={childSupport ?? []} columns={columns} getRowId={(row) => row._id} loading={childSupport === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default ChildSupport;
