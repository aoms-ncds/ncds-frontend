import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ChildSupportService from '../Settings/extras/ChildSupportService';
import StaffServices from './extras/StaffServices';
import InfoIcon from '@mui/icons-material/Info';
import { ILanguage } from '../Settings/extras/LanguageTypes';
export interface IPmaDedution{
    option?: string;
    amount?: number;
    deductions?:[{
        deductionAmount?: number;
        monthFrom?:number;
        monthTo?:number;
      }];
}
const PnaDeductionPage = () => {
  const [childSupport, setChildSupport] = useState<IPmaDedution[] | null>(null);
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

  // const handleAddRow = () => {
  //   setRows([...rows, { id: rows.length + 1, deducted: '', startTonnage: '', endTonnage: '' }]);
  // };
  console.log(newChildSupport, 'newChildSupport');
  const handleAddRow = () => {
    setNewChildSupport((prev:any) => ({
      ...prev,
      deductions: [
        ...prev.deductions,
        {
          deductionAmount: 0,
          monthFrom: 0,
          monthTo: 0,
        },
      ],
    }));
  };

  // Function to handle changes in the deduction array
  const handleDeductionChange = (index: number, field: any, value: number) => {
    setNewChildSupport((prev:any) => ({
      ...prev,
      deductions: prev.deductions?.map((deduction: any, i: number) =>
        i === index ? { ...deduction, [field]: value } : deduction,
      ),
    }));
  };
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [rowId, setRowID] = React.useState<any>('');
  const removeChildSupport = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing ChildSupport',
      variant: 'info',
    });
    StaffServices.deletePma(rowId)
      .then((res) => {
        if (childSupport) {
          const newChildSupport = childSupport?.filter((childSupport: any) => {
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

  const columns: GridColDef<IPmaDedution>[] = [
    {
      field: 'ChildSupport',
      headerName: 'Initial Tenure',
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
      renderCell: (params:any) => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setEdit(true);
              setRowID(params.row._id);
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
      renderCell: (params:any) => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setRowID(params.row._id);

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
          <Container>Do you want to delete this ?</Container>
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
      <Dialog open={edit !== false} onClose={() => setEdit(false)} fullWidth maxWidth="md">
        <DialogTitle>{newChildSupport.option}</DialogTitle>
        <DialogContent>
          <TextField
            label="Initial Amount"
            fullWidth
            type="number"
            value={newChildSupport.amount}
            onChange={(e) => setNewChildSupport((prev: any) => ({ ...prev, amount: Number(e.target.value) }))}
            margin="dense"
          />
          <TextField
            autoFocus
            margin="dense"
            id="pmaOption"
            label="Initial Tenure"
            type="text"
            fullWidth
            variant="outlined"
            value={newChildSupport.option}
            onChange={(e) => setNewChildSupport((prev: any) => ({ ...prev, option: e.target.value }))}
            required
          />

          {/* Render multiple deduction rows */}
          {newChildSupport.deductions?.map((row, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <TextField
                label="Deducted Amount"
                type="number"
                value={row.deductionAmount !=0 ? row.deductionAmount: null}
                onChange={(e) => handleDeductionChange(index, 'deductionAmount', Number(e.target.value))}
              />

              <TextField
                label="Start Tenure"
                type="number"
                value={row.monthFrom != 0 ? row.monthFrom: null}
                onChange={(e) => handleDeductionChange(index, 'monthFrom', Number(e.target.value))}
              />

              <TextField
                label="End Tenure"
                type="number"
                value={row.monthTo != 0 ? row.monthTo: null}
                onChange={(e) => handleDeductionChange(index, 'monthTo', Number(e.target.value))}
              />
              <Tooltip title="Warning: Do not enter a tenure that is less than or equal to the tenure entered in the previous options. End Tenure should always be higher than Start Tenure">
                <IconButton>
                  <InfoIcon sx={{ color: 'orange' }}/>
                </IconButton>
              </Tooltip>
            </div>
          ))}

          {/* Add new deduction row */}
          <IconButton onClick={handleAddRow} color="primary">
            <Button variant='contained' type='button'> <AddIcon /> Add</Button>
          </IconButton>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
          <Button onClick={()=>{
            StaffServices.editPmaDeduction(newChildSupport, rowId).then((res) => {
              console.log(res);
              res.data && setEdit(false);
              window.location.reload();
            });
          }} variant="contained" color="primary">
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
                setChildSupport((prevChildSupport:any) => (prevChildSupport === null ? [res.data] : [...prevChildSupport, res.data]));
                setNewChildSupport({
                  option: '',
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
              label="Initial Tenure"
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
              value={newChildSupport.amount != 0 ? newChildSupport.amount : null}
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
                setNewChildSupport({
                  option: '',
                  amount: 0,
                });
                setDialogAction('add');
              }}
            >
              Add new
            </Button>
          </Grid>
        </Grid>
        <DataGrid
          sx={{ height: '80vh', width: '100%' }}

          rows={childSupport ?? []} columns={columns} getRowId={(row:any) => row._id} loading={childSupport === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default PnaDeductionPage;
