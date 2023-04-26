import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Button, CardContent, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import DivisionProfilePage from './DivisionProfile';
import SubDivisionsPage from './SubDivisions';
import BankDetailsPage from './BankDetails';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';

const DivisionDetailsPage = () => {
  const { divisionIDs } = useParams();
  const [activeStep, setactiveStep] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const AddWorker = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DivisionsServices.addDivision()
      .then((res) => {
        enqueueSnackbar({
          message: 'Added new Division',
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
  const [divisionDetails, setDivisionDetails] = useState<DivisionDetails>();
  useEffect(() => {
    if (divisionIDs) {
      DivisionsServices.getDivisionbyId(divisionIDs)
      .then((res) => {
        // props.afterLoad();
        setDivisionDetails(res.data);
      })
      .catch((err) => {
        // / props.afterLoad();
        console.log({ err });
      });
    }
    // RESTClient.Users.getUsers().then(users => {
    //     setLoading(false);
    // })
  }, []);
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

            </Stepper>
            {activeStep == 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setactiveStep(1);
                }}
              ><DivisionProfilePage withCardContainer={divisionDetails?.divisionProfile}/>
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
                  setactiveStep(2);
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
                    setactiveStep(0);
                  } }
                  variant="outlined"
                  sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                >    Go back
                </Button>
              </form>
            )}
            {activeStep == 2 && (
              <form
                onSubmit={AddWorker}
              ><BankDetailsPage withCardContainer={divisionDetails?.bankDetails}/><Button
                  type="submit"
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px' }}
                >
                Submit
                </Button><Button
                  type="button"
                  onClick={() => {
                    setactiveStep(1);
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

export default DivisionDetailsPage;
