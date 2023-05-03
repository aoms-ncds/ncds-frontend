import React, { useEffect, useState } from 'react';
import { Box, Button, CardContent, Container, Step, StepLabel, Stepper } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from './extras/WorkersServices';
import BasicDetails from './BasicDetails';
import OfficialDetails from './OfficialDetails';
import SupportDetails from './SupportDetails';
import SupportStructure from './SupportStructure';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useLoader } from '../../hooks/Loader';


const AddNewWorker = () => {
  const loader = useLoader();
  const { workersId } = useParams();
  console.log(workersId);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [activeStep, setActiveStep] = React.useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<WorkersDetails|null>(null);
  useEffect(() => {
    if (workersId) {
      setAction('edit');
      loader.onLoad();
      WorkerServices.getWorkerById(workersId).then((res) => {
        loader.afterLoad();
        setWorkerRequests(res.data);
        console.log(WorkerRequests);
      }).catch((res) => {
        loader.afterLoad();
        console.log(res);
      });
    }
  }, []);
  const AddWorker = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.addWorker(action)
      .then((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  return (
    <CommonPageLayout title={action === 'add' ? 'Add Worker' : 'Edit Worker'}>
      <Container>
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Basic Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Official Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Support Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Support Structure</StepLabel>
              </Step>
            </Stepper>

            <br />
            {activeStep == 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(1);
                }}
              ><BasicDetails />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                      Next
                </Button>

              </form>
            )}
            {activeStep == 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(2);
                }}
              ><OfficialDetails />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                      Next
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setActiveStep(0);
                  } }
                  variant="outlined"
                  sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                >    Go back
                </Button>
              </form>
            )}
            {activeStep == 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(3);
                }}
              ><SupportDetails />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                      Next
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setActiveStep(1);
                  } }
                  variant="outlined"
                  sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                >    Go back
                </Button>

              </form>
            )}
            {activeStep == 3 && (
              <form
                onSubmit={AddWorker}
              ><SupportStructure /><Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                  {action === 'add' ? 'Submit' : 'Update'}
                </Button><Button
                  type="button"
                  onClick={() => {
                    setActiveStep(2);
                  } }
                  variant="outlined"
                  sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                >    Go back
                </Button> </form>

            )}
          </Box>
        </CardContent>
      </Container>
    </CommonPageLayout>
  );
};

export default AddNewWorker;
