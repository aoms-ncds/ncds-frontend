import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Button, CardContent, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import DivisionProfilePage from './DivisionProfile';
import SubDivisionsPage from './SubDivisions';
import BankDetailsPage from './BankDetails';

const DivisionDetailsPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <CommonPageLayout title='Division Details' loadCount={loadCount}>
      <Container>
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Division Profile</StepLabel>
              </Step>
              <Step>
                <StepLabel>Sub Divisions</StepLabel>
              </Step>
              <Step>
                <StepLabel>Bank Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Password</StepLabel>
              </Step>

            </Stepper><br /><br />
            {activeStep == 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(1);
                }}
              ><DivisionProfilePage/>
                <br />
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
              ><SubDivisionsPage/>
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
              ><BankDetailsPage/><br/>
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

          </Box>
        </CardContent>
      </Container>
      <br />
    </CommonPageLayout>
  );
};

export default DivisionDetailsPage;
