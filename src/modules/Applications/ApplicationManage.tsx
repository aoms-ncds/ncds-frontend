import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';

const ApplicationManage = () => {
  const [applications, setApplications] = useState<Application | null>(null);
  useEffect(() => {
    ApplicationServices.getApplicationById()
    .then((res) => {
      setApplications(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);
  const handleApproveClick = () => {
    const snackbarId = enqueueSnackbar({
      message: 'Approving ',
      variant: 'info',
    });
    ApplicationServices.approve()
      .then((res) => {
        console.log(res);
        closeSnackbar(snackbarId);
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
  const handleRejectClick = () => {
    const snackbarId = enqueueSnackbar({
      message: 'Rejecting ',
      variant: 'info',
    });
    ApplicationServices.reject()
      .then((res) => {
        console.log(res);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'warning',
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
    <CommonPageLayout title='Application Manages' >
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h5" component="h2">
          Requested By: {applications?.name}
              </Typography>
              <Typography variant="h5" component="h2">
          Reason: {applications?.reason}
              </Typography>

              {File && (
                <Typography variant="h5" component="h2">
            File: <Button component="span" variant="outlined">
          View File
                  </Button>
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      <Button variant="contained"
        color='success'
        onClick={handleApproveClick}
      >
        Approve
      </Button>
      <Button variant="contained"
        color='error'
        onClick={handleRejectClick}
      >
        Reject
      </Button>


    </CommonPageLayout>
  );
};

export default ApplicationManage;

