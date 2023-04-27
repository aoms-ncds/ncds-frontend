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


const AddNewWorker = () => {
  const { workersId } = useParams();
  console.log(workersId);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [activeStep, setActiveStep] = React.useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<WorkersDetails|null>(null);
  useEffect(() => {
    if (workersId) {
      setAction('edit');
      setLoadCount((count) => count+1);
      WorkerServices.getWorkerById(workersId).then((res) => {
        setLoadCount((count) => count-1);
        setWorkerRequests(res.data);
      }).catch((res) => {
        setLoadCount((count) => count-1);
        console.log(res);
      });
    }
  }, []);
  const AddWorker = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.addWorker()
      .then((res) => {
        enqueueSnackbar({
          message: 'Added new Worker',
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
    <CommonPageLayout loadCount={loadCount} title={action === 'add' ? 'Add Worker' : 'Edit Worker'}>
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
              ><BasicDetails withCardContainer={WorkerRequests?.basicDetails}/>
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
              ><OfficialDetails withCardContainer={WorkerRequests?.officialDetails}/>
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
              ><SupportDetails withCardContainer={WorkerRequests?.supportDetails}/>
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
              ><SupportStructure withCardContainer={WorkerRequests?.supportStructure}/><Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                Submit
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
