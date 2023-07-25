import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography, Divider, Box } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import PermissionChecks from '../User/components/PermissionChecks';

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
            <Box sx={{ justifyContent: 'center' }}>

              <Typography variant="h5" component="h2" align='left'>

                Requested By: {applications?.createdBy?.basicDetails?.firstName +' '+ applications?.createdBy?.basicDetails?.lastName}
              </Typography>
              <Divider/>
              <br/>

              <Typography variant="h5" component="h2" align='left'>

                Name: {applications?.name}
              </Typography>
              <br/>

              <Typography variant="h5" component="h2" align='left'>

                Reason: {applications?.reason}
              </Typography>
              <br/>
              <Typography variant="h5" component="h2" align='left'>
                 &nbsp;
                <Button component="span" variant="outlined" onClick={()=>setOpen(true)}>

                  View File
                </Button>
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'left' }}>
            <PermissionChecks
              permissions={['MANAGE_APPLICATION'] || ['PRESIDENT_ACCESS']}
              granted={(
                <>
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
                </>
              )}
            />
            <Typography variant='body1' ml='auto'>
              { moment(applications?.createdAt).format('DD/MM/YYYY hh:mm A')}
            </Typography>
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
