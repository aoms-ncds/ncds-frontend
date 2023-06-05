import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationApprovalPage = () => {
  const { applicationID } = useParams();
  const navigate = useNavigate();
  console.log(applicationID, 'ID');


  const [applications, setApplications] = useState<Application | null>(null);

  useEffect(() => {
    if (!applicationID) {
      navigate('/applications');
      return;
    }

    ApplicationServices.getById(applicationID as string)
      .then((res) => {
        console.log(res, 'resresresIDID');

        setApplications(res.data);
      })
      .catch((res) => {
        console.log(res);
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, []);

  return (
    <CommonPageLayout title="Application Manages">
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h5" component="h2">
                {' '}
                Requested By: {applications?.name}{' '}
              </Typography>
              <Typography variant="h5" component="h2">
                {' '}
                Reason: {applications?.reason}{' '}
              </Typography>
              <Typography variant="h5" component="h2">
                : &nbsp;{' '}
                <Button component="span" variant="outlined">
                  {' '}
                  View File
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            // sx={{ ml: 'auto' }}
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Approving...',
                variant: 'info',
              });
              ApplicationServices.approve(applicationID as string)
                .then((res) => {
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: res.message,
                    variant: 'success',
                  });
                })
                .catch((err) => {
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: err.message,
                    variant: 'error',
                  });
                });
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });
              ApplicationServices.reject(applicationID as string)
                .then((res) => {
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: res.message,
                    variant: 'success',
                  });
                })
                .catch((err) => {
                  closeSnackbar(snackbarId);
                  enqueueSnackbar({
                    message: err.message,
                    variant: 'error',
                  });
                });
            }}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </CommonPageLayout>
  );
};

export default ApplicationApprovalPage;
