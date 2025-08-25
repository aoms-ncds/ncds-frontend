import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import PaymentMethodService from './extras/PaymentMethodService';
import { IPaymentMethod, CreatablePaymentMethod } from './extras/LanguageTypes';

const PaymentMethod = () => {
  const [payment, setPayment] = useState<IPaymentMethod[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<IPaymentMethod | null>(null);
  const [newPayment, newNewPayment] = useState<CreatablePaymentMethod>({
    paymentMethod: '',
  });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);

  const removeLanguage = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Payment',
      variant: 'info',
    });
    PaymentMethodService.delete(id)
            .then((res) => {
              if (payment) {
                const newPayment = payment.filter((payment) => {
                  return payment._id !== id;
                });
                setPayment(newPayment);
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
  const columns: GridColDef<IPaymentMethod>[] = [
    {
      field: 'paymentMethod',
      renderHeader: () => (<b>Payment</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.paymentMethod,
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
              newNewPayment(params.row);
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
    PaymentMethodService.getAll()
            .then((res) => {
              setPayment(res.data);
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
    <CommonPageLayout title="Add Payment  Method">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Payment?</Container>
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
              PaymentMethodService.create(newPayment).then((res) => {
                setPayment((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                newNewPayment({
                    paymentMethod: '',
                });
              });
            } else {
              PaymentMethodService.edit(newPayment).then((res) => {
                setPayment((payment) => (payment === null ? null : payment?.map((payment) => (payment._id === newPayment._id ? res.data : payment))));

                newNewPayment({
                    paymentMethod: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Payment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Payment"
              label="Enter Payment to be Added"
              type="text"
              fullWidth
              variant="outlined"
              value={newPayment.paymentMethod}
              onChange={(e) => newNewPayment((payment) => ({ ...payment, paymentMethod: e.target.value }))}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                newNewPayment({
                    paymentMethod: '',
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
          rows={payment ?? []} columns={columns} getRowId={(row) => row._id} loading={payment === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default PaymentMethod;
