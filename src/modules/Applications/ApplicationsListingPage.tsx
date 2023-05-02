import React, { useEffect, useState } from 'react';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,

} from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';

const ApplicationsListingPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showApplicationFormDialog, setShowApplicationFormDialog] = useState<boolean>(false);
  const [applicationFormState, setApplicationFormState] = useState<CreatableApplication>({
    name: '',
    reason: '',
    status: '',
  });


  useEffect(() => {
    setLoadCount((count) => count + 1);
    ApplicationServices.getAll()
      .then((res) =>{
        setLoadCount((count) => count - 1);
        setApplications(res.data);
      })
      .catch((error) => {
        setLoadCount((count) => count - 1);
        enqueueSnackbar({
          message: error.message,
          variant: 'error',
        });
      });
  }, []);

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridLinkAction
          key={1}
          label='View'
          icon={<PreviewIcon />}
          showInMenu
          to={`/application/${params.id}/approval`}
        />,
        <GridLinkAction
          key={3}
          label='Edit'
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setApplicationFormState(params.row);
            setShowApplicationFormDialog(true);
          }}
        />,
        <GridLinkAction
          key={2}
          label='Approve'
          icon={<ThumbUpIcon />}
          showInMenu
          onClick={() => {
            throw new Error('Approve operation not implemented');
          }}
        />,
        <GridLinkAction
          key={3}
          label='Reject'
          icon={<ThumbDownIcon />}
          showInMenu
          onClick={() => {
            throw new Error('Reject operation not implemented');
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
    <CommonPageLayout title='Manage Staff' loadCount={loadCount}>
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
      <br/><br/>
      <Dialog
        open={showApplicationFormDialog}
        onClose={() => setShowApplicationFormDialog(false)}
        PaperProps={{ style: { width: '500px' } }}
      >
        <form
          onSubmit={() => {
            const snackbarId = enqueueSnackbar({
              message: action === 'add' ? 'Creating Request' : 'Updating Request',
              variant: 'info',
            });
            ApplicationServices.create(applicationFormState)
            .then((res) => {
              console.log(res);
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
          }}>
          <DialogTitle>
            {action === 'add' ? 'Add Request' : `Edit Request: ${applicationFormState} `}
          </DialogTitle>
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
                    value={applicationFormState.name}
                    onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        name: e.target.value,
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
            <Button type="submit">
              {action === 'add' ? 'Add' : 'Edit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={applications??[]} columns={columns} getRowId={(row) => row._id} loading={applications === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};


export default ApplicationsListingPage;
