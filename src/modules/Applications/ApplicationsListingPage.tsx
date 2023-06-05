import React, { useEffect, useState } from 'react';
import { Edit as EditIcon, Preview as PreviewIcon, Add as AddIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon } from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';
import { useParams } from 'react-router-dom';

const ApplicationsListingPage = () => {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showApplicationFormDialog, setShowApplicationFormDialog] = useState<boolean>(false);
  const [status, settStatus] = useState('Not Aprove');
  const [editid, setEditId] = useState<any>();
  const [applicationFormState, setApplicationFormState] = useState<CreatableApplication>({
    name: '',
    reason: '',
    status: '',
  });

  useEffect(() => {
    ApplicationServices.getAll()
      .then((res) => {
        setApplications(res.data);
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error.message,
          variant: 'error',
        });
      });
  }, [applicationFormState]);


  const EditApplication = (e: any) => {
    e.preventDefault();
    if (editid) {
      ApplicationServices.editApplication(editid, applicationFormState)
        .then((res) => {
          console.log(res);
          setShowApplicationFormDialog(false);
          enqueueSnackbar({
            message: res.message,
            variant: 'success',
          });
          return ApplicationServices.getAll();
        })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.message,
            variant: 'error',
          });
        });
    }
  };
  
  useEffect(() => {
    ApplicationServices.getAll()
      .then((res) => {
        setApplications(res.data);
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error.message,
          variant: 'error',
        });
      });
  }, []);
  

  const AddApplication = (event: any) => {
    event.preventDefault();
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Request' : 'Updating Request',
      variant: 'info',
    });
   
    ApplicationServices.create(applicationFormState)
      .then((res) => {
        console.log(res, 'another Ressssssssss');
        setShowApplicationFormDialog(false);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setApplicationFormState(() => ({
          name: '',
          reason: '',
          status: '',
        }));
      })
      .catch((err) => {
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/application/${params.id}/approval`} />,
        <GridLinkAction
          key={3}
          label="Edit"
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setEditId(params.id);
            setAction('edit');
            setApplicationFormState(params.row);
            setShowApplicationFormDialog(true);

            console.log(editid, 'hhhhhhhhhhhhh');
          }}
        />,

        <GridLinkAction
          key={2}
          label="Approve"
          icon={<ThumbUpIcon />}
          showInMenu
          onClick={() => {
            settStatus('Aprove');
          }}
        />,
        <GridLinkAction
          key={3}
          label="Reject"
          icon={<ThumbDownIcon />}
          showInMenu
          onClick={() => {
            settStatus('Note Aprove');
          }}
        />,
      ],
    },
    { field: '_id', headerName: 'SI NO', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <CommonPageLayout title="Application ">
      {status}
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          setShowApplicationFormDialog(true);
          setAction('add');
        }}
      >
        Add new
      </Button>
      <br />
      <br />
      <Dialog open={showApplicationFormDialog} onClose={() => setShowApplicationFormDialog(false)} PaperProps={{ style: { width: '500px' } }}>
        <form onSubmit={action === 'add' ? AddApplication : EditApplication}>
          <DialogTitle>{action === 'add' ? 'Add Request' : `Edit Request:`}</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    label="name"
                    value={applicationFormState.name}
                    onChange={(e) => {
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        name: e.target.value,
                      }));
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Reason"
                    value={applicationFormState.reason}
                    onChange={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        reason: e.target.value,
                      }));
                    }}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button>
            <Button type="submit">{action === 'add' ? 'Add' : 'Edit'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={applications ?? []} columns={columns} getRowId={(row) => row._id} loading={applications === null} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApplicationsListingPage;
