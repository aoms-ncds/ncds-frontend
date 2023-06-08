import { DialogContent, Container, Grid, TextField, DialogActions, Button, Card } from '@mui/material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import ApplicationServices from './extras/ApplicationServices';
import moment from 'moment';

const AddNewApplication = () => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('qq');
  const [action, setaction] = useState<'add' | 'edit'>('add');
  const [Request, setRequest] = useState<Application>({
    _id: '',
    name: '',
    reason: '',
    status: '',
    createdAt: moment(),
    updatedAt: moment(),
  });

  const snackbarId = enqueueSnackbar({
    message: action === 'add' ? 'Creating Request' : 'Updating Request',
    variant: 'info',
  });

  const handleNameChange = (event:any) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      name: event.target.value,
    }));
  };

  const handleReasonChange = (event:any) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      reason: event.target.value,
    }));
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
    ApplicationServices.create(Request)
      .then((res:any) => {
        console.log(res, 'resssssssssssss');
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
                  <TextField id="outlined-textarea" label="Reason" value={Request.reason} onChange={handleReasonChange} fullWidth required multiline />
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
