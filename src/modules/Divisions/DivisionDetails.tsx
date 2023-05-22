import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, CardContent, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import SubDivisionsPage from './SubDivisions';
import BankDetailsForm from './components/BankDetails';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DivisionsFormComponent from './components/DivisionsFormComponent';

const DivisionDetailsPage = () => {
  const { divisionIDs, editID } = useParams();

  const [activeStep, setactiveStep] = useState(0);
  const [action, setAction] = useState<'add' | 'edit' |'view'>('add');

  const AddDivision = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DivisionsServices.addDivision(action, divisionDetails)
      .then((res) => {
        console.log(res);
        console.log(action);
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
    if (editID) {
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
  const [divisionDetails, setDivisionDetails] = useState<DivisionDetails>(
    {
      division: {
        divisionName: '',
        divisionId: '',
        contactNumber: '',
        email: '',
        address: {
          buildingName: '',
          street: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
        },
        noofWorkers: 0,
        noOfSubdivisions: 0,
        noOfChurches: 0,
        coordinator: {
          '_id': '646703c19e433f67d27019b2',
          'workerCode': '22',
          'basicDetails': {
            'aadhaar': {
              'aadhaarNo': '123456789012',
            },
            'voterId': {
              'voterIdNo': 'V12345678',
            },
            'firstName': 'John',
            'lastName': 'Doe',
            'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
            'gender': 'Male',
            'field': 'Missionary',
            'martialStatus': 'Married',
            'highestQualification': 'Ph.D.',
            'motherTounge': 'English',
            'communicationLanguage': 'English',
            'knownLanguages': [
              'English',
              'Malayalam - മലയാളം',
            ],
            'email': 'abcd@gmail.com',
            'phone': '1234567890',
            'alternativePhone': '9876543210',
            'PANNo': 'ABCD1234',
            'licenseNumber': 'L12345678',
            'permanentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '123 Main Street',
              'city': 'Example City',
              'state': 'Example State',
              'country': 'India',
              'pincode': '12345',
            },
            'currentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '456 Elm Street',
              'city': 'Current City',
              'state': 'Current State',
              'country': 'India',
              'pincode': '54321',
            },
          },
          'officialDetails': {
            'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
            'remarks': 'Lorem ipsum dolor sit amet.',
            'selfSupport': true,
            'status': 'ministering',
            'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
            'noOfChurches': 5,
            'subdivision': {
              _id: 'skjdfj',
              subDivisionName: 'ksdfj',
            },
          },
          'supportDetails': {
            'totalNoOfYearsInMinistry': 10,
            'withChurch': true,
          },
          'supportStructure': {
            'basic': 5000,
            'HRA': 2000,
            'spouseAllowance': 1000,
            'positionalAllowance': 500,
            'specialAllowance': 800,
            'impactDeduction': 200,
            'telAllowance': 400,
            'PIONMissionaryFund': 300,
            'MUTDeduction': 100,
          },
          'createdAt': moment('2023-05-19T05:06:09.292Z'),
          'updatedAt': moment('2023-05-19T05:06:09.292Z'),
        },
        seniorLeader: {
          '_id': '646703c19e433f67d27019b2',
          'workerCode': '22',
          'basicDetails': {
            'aadhaar': {
              'aadhaarNo': '123456789012',
            },
            'voterId': {
              'voterIdNo': 'V12345678',
            },
            'firstName': 'John',
            'lastName': 'Doe',
            'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
            'gender': 'Male',
            'field': 'Missionary',
            'martialStatus': 'Married',
            'highestQualification': 'Ph.D.',
            'motherTounge': 'English',
            'communicationLanguage': 'English',
            'knownLanguages': [
              'English',
              'Malayalam - മലയാളം',
            ],
            'email': 'abcd@gmail.com',
            'phone': '1234567890',
            'alternativePhone': '9876543210',
            'PANNo': 'ABCD1234',
            'licenseNumber': 'L12345678',
            'permanentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '123 Main Street',
              'city': 'Example City',
              'state': 'Example State',
              'country': 'India',
              'pincode': '12345',
            },
            'currentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '456 Elm Street',
              'city': 'Current City',
              'state': 'Current State',
              'country': 'India',
              'pincode': '54321',
            },
          },
          'officialDetails': {
            'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
            'remarks': 'Lorem ipsum dolor sit amet.',
            'selfSupport': true,
            'status': 'ministering',
            'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
            'noOfChurches': 5,
            'subdivision': {
              _id: 'skjdfj',
              subDivisionName: 'ksdfj',
            },
          },
          'supportDetails': {
            'totalNoOfYearsInMinistry': 10,
            'withChurch': true,
          },
          'supportStructure': {
            'basic': 5000,
            'HRA': 2000,
            'spouseAllowance': 1000,
            'positionalAllowance': 500,
            'specialAllowance': 800,
            'impactDeduction': 200,
            'telAllowance': 400,
            'PIONMissionaryFund': 300,
            'MUTDeduction': 100,
          },
          'createdAt': moment('2023-05-19T05:06:09.292Z'),
          'updatedAt': moment('2023-05-19T05:06:09.292Z'),
        },
        juniorLeader: {
          '_id': '646703c19e433f67d27019b2',
          'workerCode': '22',
          'basicDetails': {
            'aadhaar': {
              'aadhaarNo': '123456789012',
            },
            'voterId': {
              'voterIdNo': 'V12345678',
            },
            'firstName': 'John',
            'lastName': 'Doe',
            'dateOfBirth': moment('2022-12-31T18:30:00.000Z'),
            'gender': 'Male',
            'field': 'Missionary',
            'martialStatus': 'Married',
            'highestQualification': 'Ph.D.',
            'motherTounge': 'English',
            'communicationLanguage': 'English',
            'knownLanguages': [
              'English',
              'Malayalam - മലയാളം',
            ],
            'email': 'abcd@gmail.com',
            'phone': '1234567890',
            'alternativePhone': '9876543210',
            'PANNo': 'ABCD1234',
            'licenseNumber': 'L12345678',
            'permanentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '123 Main Street',
              'city': 'Example City',
              'state': 'Example State',
              'country': 'India',
              'pincode': '12345',
            },
            'currentAddress': {
              'buildingName': 'Puliyulla parambath',
              'street': '456 Elm Street',
              'city': 'Current City',
              'state': 'Current State',
              'country': 'India',
              'pincode': '54321',
            },
          },
          'officialDetails': {
            'dateOfJoining': moment('2022-12-31T18:30:00.000Z'),
            'remarks': 'Lorem ipsum dolor sit amet.',
            'selfSupport': true,
            'status': 'ministering',
            'dateOfDivisionJoining': moment('2023-05-19T04:32:00.077Z'),
            'noOfChurches': 5,
            'subdivision': {
              _id: 'skjdfj',
              subDivisionName: 'ksdfj',
            },
          },
          'supportDetails': {
            'totalNoOfYearsInMinistry': 10,
            'withChurch': true,
          },
          'supportStructure': {
            'basic': 5000,
            'HRA': 2000,
            'spouseAllowance': 1000,
            'positionalAllowance': 500,
            'specialAllowance': 800,
            'impactDeduction': 200,
            'telAllowance': 400,
            'PIONMissionaryFund': 300,
            'MUTDeduction': 100,
          },
          'createdAt': moment('2023-05-19T05:06:09.292Z'),
          'updatedAt': moment('2023-05-19T05:06:09.292Z'),
        },
      },
      subDivisions: [{
        _id: '',
        subDivisionName: '',
      }],
      FCRABankDetails: {
        bankname: '',
        branchname: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',

      },
      localBankDetails:
  {
    bankname: '',
    branchname: '',
    accountNumber: '',
    IFSCCode: '',
    beneficiary: '',

  },

      createdAt: moment(),
      updatedAt: moment(),

    },
  );
  useEffect(() => {
    if (divisionIDs) {
      setAction('view');
      DivisionsServices.getDivisionbyId(divisionIDs)
      .then((res) => {
        setDivisionDetails(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
    }
    if (editID) {
      setAction('edit');
      DivisionsServices.getDivisionbyId(editID)
      .then((res) => {
        setDivisionDetails(res.data);
        console.log(divisionDetails);
      })
      .catch((err) => {
        console.log({ err });
      });
    }
  }, []);
  return (
    <CommonPageLayout title={action === 'add' ? 'Add Division' : (action === 'edit' ? 'Edit Division' : 'Division Details')}>
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
        </Stepper><br />
      </Container>
      <Card style={{ width: '100%' }}>
        <CardContent>
          <form onSubmit={action === 'add' ? AddDivision : EditDivision} >
            {activeStep == 0 && (


              <>
                <Grid container spacing={2}>
                  <DivisionsFormComponent

                    onChange={(newDivision: IETDivisions) => {
                      console.log('New division:');
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, division: newDivision }));
                    }}
                    action={'add'}
                    options={{ title: 'Division Details' }}
                    value={divisionDetails.division}
                  />

                  <br />
                  <Grid item xs={12} >

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ float: 'right', padding: '16px 64px' }}
                      onClick={()=> setactiveStep(1)}
                    >
                      Next
                    </Button>    <br />
                  </Grid>
                </Grid>
              </>

            )}
            {activeStep == 1 && (
              // <form
              //   onSubmit={(e) => {
              //     e.preventDefault();
              //     setactiveStep(2);
              //   }}
              //   >
              <>
                <Grid container spacing={2}>
                  <SubDivisionsPage withCardContainer={divisionDetails?.subDivisions} />
                  <Grid item xs={12} >

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ float: 'right', padding: '16px 64px' }}
                      onClick={()=> setactiveStep(2)}
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

                  </Grid>
                </Grid>
              </>
            )}
            {activeStep == 2 && (
              <>
                <Grid container spacing={2}>

                  <BankDetailsForm
                    value={divisionDetails?.FCRABankDetails}
                    onChange={(newbankDetails: BankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, FCRABankDetails: newbankDetails }));
                    }}
                    action={'add'}
                    options={{ title: 'FCRA Bank Details' }}
                  />


                  <BankDetailsForm
                    value={divisionDetails?.localBankDetails}
                    onChange={(newbankDetails: BankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, localBankDetails: newbankDetails }));
                    }}
                    action={'add'}
                    options={{ title: 'Local Bank Details' }}
                  />
                  <Grid item xs={12} >

                    {action !== 'view' && (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ float: 'right', padding: '16px 64px' }}
                      >
                    Submit
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => {
                        setactiveStep(1);
                      } }
                      variant="outlined"
                      sx={{ p: '16px 64px', mr: 2, float: 'right' }}
                    >    Go back
                    </Button>
                  </Grid>
                </Grid>
              </>

            )}
          </form>
        </CardContent></Card>
      {/* </Box> */}

    </CommonPageLayout>
  );
};

export default DivisionDetailsPage;
