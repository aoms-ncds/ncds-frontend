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
  withCardContainer: BankDetails;
}
const DivisionDetailsPage = (props: DivisionFormPageProps, withCardContainer = []) => {
  const { divisionIDs, editID } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [action, setAction] = useState<'add' | 'edit' | 'view'>('add');
  const [otherBankDetailsCount, setOtherBankDetailsCount] = useState(1);
  const navigate = useNavigate();



  const addDivision = () => {
    // e.preventDefault();
    // event.preventDefault();
    if (props.action == 'add') {
      DivisionsServices.create(divisionDetails)
        .then((_res) => {
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

  const editDivision = () => {
    // event.preventDefault();
    if (editID && props.action == 'edit') {
      DivisionsServices.editDivision(editID, divisionDetails)
        .then((_res) => {
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
    }
    ,
    otherBankDetails1: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    otherBankDetails2: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    otherBankDetails3: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    otherBankDetails4: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    createdAt: moment(),
    updatedAt: moment(),
  });

  useEffect(() => {
    if (divisionIDs) {
      setAction('view');
      DivisionsServices.getDivisionById(divisionIDs)
        .then((res) => {
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
          setDivisionDetails(res.data);
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
                      details: {
                        ...divisionDetails.details,
                        noOfSubdivisions: newSubDivisions.length,
                      },
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
                action === 'add' ? addDivision() : editDivision();
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
                  options={{ title: 'FCRA Bank Detailsss' }}
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
                {/* {newBanks.map((item, index) => (
                  <BankDetailsForm
                    key={index} 
                    value={`${divisionDetails?.otherBankDetails}${index+1}`}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, otherBankDetails1: newbankDetails as  BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: `Other Bank Details${index + 1}` }}
                  />
                 ))}  */}
                {Array.from({ length: otherBankDetailsCount }).map((_, index) => (
                  <BankDetailsForm
                    key={index}
                    value={divisionDetails[`otherBankDetails${index + 1}`] as any}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, [`otherBankDetails${index + 1}`]: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: `Other Bank Details ${index + 1}` }}
                  />
                ))}
                <Grid item xs={12}>

                  <Button variant='contained' onClick={() => setOtherBankDetailsCount((count) => count + 1)}>Add More Banks</Button>
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
