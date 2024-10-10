import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography, Divider, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import PermissionChecks from '../User/components/PermissionChecks';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import CloseIcon from '@mui/icons-material/Close';

const ApplicationApprovalPage = () => {
  const { applicationID } = useParams();
  const navigate = useNavigate();
  const [reasonForDeactivation, setReasonForDeactivation] = useState<IReason | null | string>();
  const [reasonDialog, setReasonDialog] = useState(false);
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
            <Grid>
              <Grid container>
                <Grid item>

                  <Typography variant="h5" component="h2" align='left'>
                    {applications?.name}
                  </Typography>
                </Grid>
                <Grid item sx={{ ml: 'auto' }}>
                  <div style={{ display: 'flex' }}>

                    <Typography variant="body2" sx={{ ml: 'auto' }} >
                      {applications?.createdBy?.basicDetails?.firstName +' '+ applications?.createdBy?.basicDetails?.lastName}
                    </Typography>
                  </div>
                  {/* <br/> */}


                  <div style={{ display: 'flex' }}>
                    <Typography variant='caption' sx={{ ml: 'auto' }}>
                      { moment(applications?.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </Typography>
                  </div>
                </Grid>


              </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Typography variant="body1" component="h2" align='left'>

              {applications?.reason}
            </Typography>
            <br/>
            {applications?.reasonForDeactivation && (

              <Typography variant="body1" component="h2" align='left'>

                <span style={{ fontWeight: 'bold' }}>Reason for rejection:  </span> {applications?.reasonForDeactivation}
              </Typography>
            )}

            <br/>
            <Typography variant="h5" component="h2" align='left'>
                 &nbsp;
              <Button component="span" variant="outlined" onClick={()=>setOpen(true)}>

                  View File
              </Button>
            </Typography>

          </CardContent>
          {Number(applications?.status) !== CommonLifeCycleStates.APPROVED && (

            <CardActions>
              <PermissionChecks
                permissions={['MANAGE_APPLICATION'] || ['PRESIDENT_ACCESS']}
                granted={(
                  <>

                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 'auto' }}
                      onClick={() => {
                        setReasonDialog(true);
                      }}
                    >
            Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
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
                  </>
                )}
              />

            </CardActions>
          )}
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
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Reason
            <Button
              variant="contained"
              onClick={() => {
                setReasonDialog(false);
              }}
              sx={{
                'position': 'absolute',
                'top': 8,
                'right': 8,
                'minWidth': 'auto',
                'padding': '0.1rem',
                'backgroundColor': 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            value={reasonForDeactivation}
            onChange={(e) => setReasonForDeactivation(e.target.value)}
            label="Reason for rejection"
            required
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button> */}

          <Button
            variant="contained"
            onClick={() => {
              const snackbarId = enqueueSnackbar({
                message: 'Rejecting...',
                variant: 'info',
              });

              ApplicationServices.reject(applicationID as string, reasonForDeactivation as string)
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

              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
      Submit
          </Button>
        </DialogActions>
      </Dialog>

    </CommonPageLayout>
  );
};

export default ApplicationApprovalPage;
