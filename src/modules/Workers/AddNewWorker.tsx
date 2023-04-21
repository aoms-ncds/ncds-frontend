import React from 'react';
import { Box, Button, CardContent, Container, Step, StepLabel, Stepper } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from './extras/WorkersServices';
import BasicDetails from './BasicDetails';
import OfficialDetails from './OfficialDetails';
import SupportDetails from './SupportDetails';
import SupportStructure from './SupportStructure';
import { enqueueSnackbar } from 'notistack';


const AddNewWorker = () => {
  const [activeStep, setActiveStep] = React.useState(0);
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
    <CommonPageLayout title='Add New Worker'>
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
              ><BasicDetails/>
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
              ><OfficialDetails/>
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
              ><SupportDetails/>
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
              ><SupportStructure/><Button
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
