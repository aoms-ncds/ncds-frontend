import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ChildSupportService from '../Settings/extras/ChildSupportService';
import StaffServices from './extras/StaffServices';
interface IPmaDedution{
    option?: string;
    amount?: number;
    deductions?:[{
        deductionAmount?: number;
        monthFrom?:number;
        monthTo?:number;
      }];
}
const PnaDeductionPage = () => {
  const [childSupport, setChildSupport] = useState<IPmaDedution | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [childSupportToDelete, setChildSupportToDelete] = useState<ILanguage | null>(null);
  const [newChildSupport, setNewChildSupport] = useState<IPmaDedution>({
    option: '',
    amount: 0,
    deductions: [{
      deductionAmount: 0,
      monthFrom: 0,
      monthTo: 0,
    }],
  });
  const [initialAmount, setInitialAmount] = useState(8000);
  const [rows, setRows] = useState([
    { id: 1, deducted: 2500, startTonnage: 19, endTonnage: 24 },
    { id: 2, deducted: 1667, startTonnage: 25, endTonnage: 30 },
    { id: 3, deducted: 834, startTonnage: 3, endTonnage: 36 },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, deducted: '', startTonnage: '', endTonnage: '' }]);
  };

  const handleChange = (id: number, field: string, value: string) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const removeChildSupport = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing ChildSupport',
      variant: 'info',
    });
    ChildSupportService.delete(id)
      .then((res) => {
        if (childSupport) {
          const newChildSupport = childSupport?.filter((childSupport: { _id: string }) => {
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
      headerName: 'Option',
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.option,
    },
    {
      field: 'Amount',
      headerName: 'Initial Amount',
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
              setEdit(true);

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
    StaffServices.getPMADeduction()
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
    <CommonPageLayout title="Pma Deduction">


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
      <Dialog open={edit !== false} onClose={()=>setEdit(false)} fullWidth maxWidth="md">
        <DialogTitle>{childSupport?.option}</DialogTitle>
        <DialogContent>
          <TextField
            label="Initial Amount"
            fullWidth
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            margin="dense"
          />
          {/* {newChildSupport?.deductions?.map((row) => ( */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <TextField
              label="Deducted Amount"
              type="number"
              value={newChildSupport.deductions?.[0]?.deductionAmount || ''}
              onChange={(e) => {
                setNewChildSupport((prev: any) => ({
                  ...prev,
                  deductions: prev.deductions ?
                    [{ ...prev.deductions[0], deductionAmount: Number(e.target.value) }] :
                    [{ deductionAmount: Number(e.target.value) }],
                }));
              }}
            />

            <TextField
              label="Start Tonnage"
              type="number"
              value={newChildSupport.deductions?.[0]?.deductionAmount}
              onChange={(e) => {
                setNewChildSupport((prev: any) => ({
                  ...prev,
                  deductions: prev.deductions ?
                    [{ ...prev.deductions[0], deductionAmount: Number(e.target.value) }] :
                    [{ deductionAmount: Number(e.target.value) }],
                }));
              }} />
            <TextField
              label="End Tonnage"
              type="number"
              value={newChildSupport.deductions?.[0]?.deductionAmount}
              onChange={(e) => {
                setNewChildSupport((prev: any) => ({
                  ...prev,
                  deductions: prev.deductions ?
                    [{ ...prev.deductions[0], deductionAmount: Number(e.target.value) }] :
                    [{ deductionAmount: Number(e.target.value) }],
                }));
              }} />
          </div>
          {/* ))} */}
          <IconButton onClick={handleAddRow} color="primary">
            <AddIcon /> Add
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setEdit(false)}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color="primary">
          Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              StaffServices.createPMADeduction(newChildSupport).then((res) => {
                setChildSupport((prevChildSupport) => (prevChildSupport === null ? [res.data] : [...prevChildSupport, res.data]));
                setNewChildSupport({
                  option: '',
                  amount: 0,
                });
              });
            } else {
              ChildSupportService.edit(newChildSupport).then((res) => {
                setChildSupport((childSupport) => (childSupport === null ? null : childSupport?.map((childsprt: { _id: any }) => (childsprt._id === newChildSupport._id ? res.data : childsprt))));
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
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Options</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="pmaOption"
              label="option"
              type="text"
              fullWidth
              variant="outlined"
              value={newChildSupport.option}
              onChange={(e) => setNewChildSupport((prev: any) => ({ ...prev, option: e.target.value }))}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="pmaAmount"
              label="Enter Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={newChildSupport.amount}
              onChange={(e) => setNewChildSupport((prev: any) => ({ ...prev, amount: Number(e.target.value) }))}
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
                  option: '',
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

export default PnaDeductionPage;
