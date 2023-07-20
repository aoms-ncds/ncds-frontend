import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardContent, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import SubDivisionsPage from './SubDivisions';
import BankDetailsForm from './components/BankDetails';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import DivisionsFormComponent from './components/DivisionsFormComponent';
interface DivisionFormPageProps {
  action: 'add' | 'edit' | 'view';
}
const DivisionDetailsPage = (props:DivisionFormPageProps) => {
  const { divisionIDs, editID } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [action, setAction] = useState<'add' | 'edit' | 'view'>('add');
  const navigate = useNavigate();


  const addDivision = () => {
    // e.preventDefault();
    // event.preventDefault();
    if (props.action=='add') {
      DivisionsServices.create(divisionDetails)
      .then((res) => {
        console.log(res, 'res');
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
    }
  };
  console.log('Dd');
  const editDivision = () => {
    // event.preventDefault();
    if (editID && props.action=='edit') {
      DivisionsServices.editDivision(editID, divisionDetails)
        .then((res) => {
          console.log(res);
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
    }
  };
  const [divisionDetails, setDivisionDetails] = useState<Division>({

    _id: '',
    details: {
      name: '',
      divisionId: '',
      contactNumber: '',
      email: '',
      // attachment: [],
      address: {
        buildingName: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
      },
      coordinator: {},
      seniorLeader: {},
      juniorLeader: {},
    },
    subDivisions: [
      {
        _id: '',
        name: '',
      },
    ],
    FCRABankDetails: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    localBankDetails: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    otherBankDetails: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    createdAt: moment(),
    updatedAt: moment(),
  });
  console.log(divisionDetails, 'divisionDetails');
  useEffect(() => {
    console.log(props.action);
    // console.log( { editID } );

    if (divisionIDs) {
      setAction('view');
      DivisionsServices.getDivisionById(divisionIDs)
        .then((res) => {
          console.log('the value are', res);
          setDivisionDetails(res.data);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
    if (editID) {
      setAction('edit');
      DivisionsServices.getDivisionById(editID)
        .then((res) => {
          console.log('the value are', res);
          setDivisionDetails(res.data);
          console.log(divisionDetails);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, []);
  return (
    <CommonPageLayout title={action === 'add' ? 'Add Division' : action === 'edit' ? 'Edit Division' : 'Division Details'}>
      {/* <Box sx={{ width: '100%' }}> */}
      <Container maxWidth="md">
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
        </Stepper>
        <br />
      </Container>
      <Card style={{ width: '100%' }}>
        <CardContent>
          {activeStep == 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveStep(1);
              }}
            >
              <Grid container spacing={2}>
                <DivisionsFormComponent
                  value={divisionDetails.details}
                  onChange={(newDivision: DivisionDetails) => {
                    setDivisionDetails((divisionDetails) => ({ ...divisionDetails, details: newDivision }));
                  }}
                  action={props.action}
                  options={{ title: 'Division Details' }}
                />

                <br />
                <br />
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ float: 'right', padding: '16px 64px' }}>
                    Next
                  </Button>{' '}
                  <br />
                </Grid>
              </Grid>
            </form>
          )}
          {activeStep == 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveStep(2);
              }}
            >
              <Grid container spacing={2}>
                <SubDivisionsPage
                  withCardContainer={divisionDetails?.subDivisions}
                  onChange={(newSubDivisions: SubDivision[]) => {
                    setDivisionDetails((divisionDetails) => ({
                      ...divisionDetails,
                      subDivisions: newSubDivisions,
                    }));
                  }}
                  action={props.action}
                />

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ float: 'right', padding: '16px 64px' }}>
                    Next
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveStep(0);
                    }}
                    variant="outlined"
                    sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                  >
                    {' '}
                    Go back
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          {activeStep == 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                action === 'add' ? addDivision(): editDivision();
                navigate('/divisions/');
              }}
            >
              <Grid container spacing={2}>
                <BankDetailsForm
                  value={divisionDetails?.FCRABankDetails}
                  onChange={(newbankDetails) => {
                    setDivisionDetails((divisionDetails) => ({ ...divisionDetails, FCRABankDetails: newbankDetails as BankDetails }));
                  }}
                  action={props.action}
                  options={{ title: 'FCRA Bank Details' }}
                />
                <BankDetailsForm
                  value={divisionDetails?.localBankDetails}
                  onChange={(newbankDetails) => {
                    setDivisionDetails((divisionDetails) => ({ ...divisionDetails, localBankDetails: newbankDetails as BankDetails }));
                  }}
                  action={props.action}
                  options={{ title: 'Local Bank Details' }}
                />
                <BankDetailsForm
                  value={divisionDetails?.otherBankDetails}
                  onChange={(newbankDetails) => {
                    setDivisionDetails((divisionDetails) => ({ ...divisionDetails, otherBankDetails: newbankDetails as BankDetails }));
                  }}
                  action={props.action}
                  options={{ title: 'Other Bank Details' }}
                />
                <Grid item xs={12}>
                  {action !== 'view' && (
                    <Button type="submit" variant="contained" sx={{ float: 'right', padding: '16px 64px' }}>
                      Submit
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveStep(1);
                    }}
                    variant="outlined"
                    sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                  >
                    {' '}
                    Go back
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </CardContent>
      </Card>
      {/* </Box> */}
    </CommonPageLayout>
  );
};

export default DivisionDetailsPage;
