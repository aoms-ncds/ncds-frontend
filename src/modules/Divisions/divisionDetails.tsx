import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Button, CardContent, Container, Step, StepLabel, Stepper } from '@mui/material';
import DivisionProfilePage from './DivisionProfile';
import SubDivisionsPage from './SubDivisions';
import BankDetailsPage from './BankDetails';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';

const DivisionDetailsPage = () => {
  const { divisionIDs, editID } = useParams();
  const [activeStep, setactiveStep] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const onLoad = () => setLoadCount((count) => count+1);
  const afterLoad = () => setLoadCount((count) => count-1);
  const [action, setAction] = useState<'add' | 'edit' |'view'>('add');
  const AddDivision = (event: React.FormEvent<HTMLFormElement>) => {
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
  const EditDivision = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DivisionsServices.editDivision()
      .then((res) => {
        enqueueSnackbar({
          message: 'Updated Division',
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
      setAction('view');
      onLoad();
      DivisionsServices.getDivisionbyId(divisionIDs)
      .then((res) => {
        afterLoad();
        // setLoadCount((count) => count-1);
        setDivisionDetails(res.data);
      })
      .catch((err) => {
        afterLoad();
        console.log({ err });
      });
    }
    if (editID) {
      setAction('edit');
      onLoad();
      DivisionsServices.getDivisionbyId(editID)
      .then((res) => {
        afterLoad();

        setDivisionDetails(res.data);
      })
      .catch((err) => {
        afterLoad();
        console.log({ err });
      });
    }
  }, []);
  return (
    <CommonPageLayout title={action === 'add' ? 'Add Division' : (action === 'edit' ? 'Edit Division' : 'Division Details')} loadCount={loadCount}>
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


            </Stepper><br />
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
            )}<br />
            {activeStep == 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setactiveStep(2);
                }}
              ><SubDivisionsPage withCardContainer={divisionDetails?.subDivisionDetails} />
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
                onSubmit={action === 'add' ? AddDivision : EditDivision}
              ><BankDetailsPage withCardContainer={divisionDetails?.bankDetails}/>
                {action !== 'view' && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ float: 'right', padding: '16px 64px' }}
                  >
Submit
                  </Button>
                )}<Button
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
