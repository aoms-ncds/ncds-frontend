import { DialogContent, Container, Grid, TextField, DialogActions, Button, Card } from '@mui/material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import ApplicationServices from './extras/ApplicationServices';
import moment from 'moment';

const AddNewApplication = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [Request, setRequest] = useState<Application>({
    applicationCode: '',
    _id: '',
    name: '',
    reason: '',
    status: '',
    attachment: [],
    createdAt: moment(),
    updatedAt: moment(),
    applicantName: '',
    appliedFor: '',
    approvedDate: moment(),
    requestedAmount: 0,
    sanctionedAmount: 0,

  });

  // const snackbarId = enqueueSnackbar({
  //   message: action === 'add' ? 'Creating Request' : 'Updating Request',
  //   variant: 'info',
  // });


  // const  setRequest((prevRequest) => ({
  //     ...prevRequest,
  //     reason: event.target.value,
  //   })); = (event: { target: { value: any } }) => {
  //   setRequest((prevRequest) => ({
  //     ...prevRequest,
  //     reason: event.target.value,
  //   }));
  // };

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   console.log(name, reason);
  // };
  // const columns = [
  //   { field: 'name', headerName: 'Name', flex: 1 },
  //   { field: 'reason', headerName: 'Reason', flex: 1 },
  //   { field: 'status', headerName: 'Status', flex: 1 },
  // ];
  const createApplication = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Application' : 'Updating Application',
      variant: 'info',
    });
    ApplicationServices.create(Request)
      .then((res) => {
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
            <form onSubmit={createApplication}>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField label="Name" value={Request.name}
                    onChange={(e)=>setRequest((prevRequest) => ({
                      ...prevRequest,
                      name: e.target.value,
                    }))}
                    fullWidth required />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Applied For" value={Request.name}
                    onChange={(e)=>setRequest((prevRequest) => ({
                      ...prevRequest,
                      name: e.target.value,
                    }))}
                    fullWidth required />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Applicant Name" value={Request.name}
                    onChange={(e)=>setRequest((prevRequest) => ({
                      ...prevRequest,
                      name: e.target.value,
                    }))}
                    fullWidth required />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Requested Amount" value={Request.name}
                    onChange={(e)=>setRequest((prevRequest) => ({
                      ...prevRequest,
                      name: e.target.value,
                    }))}
                    fullWidth required />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Remark"
                    value={Request.reason}
                    onChange={(e)=> setRequest((prevRequest) => ({
                      ...prevRequest,
                      reason: e.target.value,
                    }))}
                    fullWidth
                    required
                    multiline
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="outlined" type="submit" >
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
