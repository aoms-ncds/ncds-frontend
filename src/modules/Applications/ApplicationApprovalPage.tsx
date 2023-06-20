import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';

const ApplicationApprovalPage = () => {
  const { applicationID } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application >();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!applicationID) {
      navigate('/applications');
      return;
    }

    ApplicationServices.getById(applicationID as string)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, []);

  return (
    <CommonPageLayout title="Application Manages">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item md={12}>
                <Typography variant="h5" component="h2" align='center'>
                  {' '}
                Requested By: {applications?.createdBy?.basicDetails?.firstName +' '+ applications?.createdBy?.basicDetails?.lastName}{' '}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h5" component="h2" align='center'>
                  {' '}
                Name: {applications?.name}{' '}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h5" component="h2" align='center'>
                  {' '}
                Reason: {applications?.reason}{' '}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h5" component="h2" align='center'>
                 &nbsp;{' '}
                  <Button component="span" variant="outlined" onClick={()=>setOpen(true)}>
                    {' '}
                  View File
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
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
        </Card></Container>
      <FileUploader
        title="Attachments"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={open}
        action='view'
        onClose={() => setOpen(false)}
        // getFiles={TestServices.getBills}
        getFiles={applications?.attachment??[]}
      />
    </CommonPageLayout>
  );
};

export default ApplicationApprovalPage;
