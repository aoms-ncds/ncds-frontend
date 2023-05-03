import { DialogContent, Container, Typography, Grid, TextField, DialogActions, Button, Card } from '@mui/material';
import { create } from '@mui/material/styles/createTransitions';
import { DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import ApplicationServices from './extras/ApplicationServices';

const AddNewApplication = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [action, setaction] = useState<'add' | 'edit'>('add');
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [Request, setRequest] = useState<Application>({
    _id: '',
    name: '',
    reason: '',
    status: '',
  });
  const snackbarId = enqueueSnackbar({
    message: action === 'add' ? 'Creating Request' : 'Updating Request',
    variant: 'info',
  });

  const handleNameChange = (e: any) => {
    setRequest(e.target.value);
  };

  const handleReasonChange = (e: any) => {
    setRequest(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(name, reason);
  };
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];
  const createApplication = () => {
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Application' : 'Updating Application',
      variant: 'info',
    });
    ApplicationServices.createApplication(Request)
      .then((res) => {
        console.log(res);
        // handleClose();
        // closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        // if (err.error === "Duplicate entry") {
        //   setGroupExists(true);
        //   setActiveStep(0);
        // }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  return (
    <CommonPageLayout title="New Application">
      <Card style={{ width: '100%' }}>
        <DialogContent>
          <Container>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField label="Name" value={Request.name} onChange={handleNameChange} fullWidth required />
                </Grid>
                <Grid item md={6}>
                  <TextField id="outlined-textarea" label="Reason" value={Request.reason} onChange={handleReasonChange} fullWidth required multiline/>
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="outlined" type="submit" onClick={createApplication}>
                  {action === 'add' ? 'Add' : 'Edit'}
                </Button>
              </DialogActions>
            </form>
          </Container>
        </DialogContent>
      </Card>
    </CommonPageLayout>
  );
};

export default AddNewApplication;


