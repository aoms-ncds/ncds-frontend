import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ChildSupportService from './extras/ChildSupportService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';

const ChildSupport = () => {
  const [childSupport, setChildSupport] = useState<IChildSupport[] | null>(null);
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
        console.log('process delete', res);
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

  const columns: GridColDef<IChildSupport>[] = [
    {
      field: 'SI',
      headerName: 'SI',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.tabIndex) + 1,
      // valueGetter: (params) => params.row.name,
    },
    {
      field: 'ChildSupport',
      headerName: 'ChildSupport',
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
              console.log(dialogAction);
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
              removeChildSupport(params.row._id);
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
        console.log(res, 'res');
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
    <CommonPageLayout title="ChildSupport">
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
              ChildSupportService.create(newChildSupport).then((res) => {
                setChildSupport((prevChildSupport) =>
                  prevChildSupport === null ? [res.data] : [...prevChildSupport, res.data],
                );
              });
            } else {
              ChildSupportService.edit(newChildSupport).then((res) => {
                setChildSupport((prevChildSupport) =>
                  prevChildSupport === null ? [res.data] : [...prevChildSupport, res.data],
                );
              });
            }

            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} ChildSupport</DialogTitle>
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
        <DataGrid rows={childSupport ?? []} columns={columns} getRowId={(row) => row._id} loading={childSupport === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default ChildSupport;
