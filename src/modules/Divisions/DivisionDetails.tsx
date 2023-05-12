import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Button, CardContent, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import SubDivisionsPage from './SubDivisions';
import BankDetailsFormComponent from './BankDetails';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';
import { useLoader } from '../../hooks/Loader';
import moment from 'moment';
import DivisionsFormComponent from './components/DivisionsFormComponent';

const DivisionDetailsPage = () => {
  const loader = useLoader();
  const { divisionIDs, editID } = useParams();

  const [activeStep, setactiveStep] = useState(0);
  const [action, setAction] = useState<'add' | 'edit' |'view'>('add');

  const AddDivision = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DivisionsServices.addDivision()
      .then((res) => {
        console.log(res);
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
  };
  const [divisionDetails, setDivisionDetails] = useState<DivisionDetails>(
    {
      division: {
        divisionName: '',
        _id: '',
        divisionId: '',
        contactNumber: '',
        email: '',
        address: {
          buildingName: '',
          streetAddress: '',
          city: '',
          district: '',
          state: '',
          country: '',
          pincode: '',
        },
        noofWorkers: 0,
        noOfSubdivisions: 0,
        noOfChurches: 0,
        coordinator: {
          _id: '',
          firstName: '',
          lastName: '',
          dob: moment(''),
          doj: moment(''),
          designation: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          age: 0,
          gender: 'Female',
          phone: '',
          email: '',
          formattedId: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        seniorLeader: {
          _id: '',
          firstName: '',
          lastName: '',
          dob: moment(),
          doj: moment(),
          designation: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          age: 0,
          gender: 'Female',
          phone: '',
          email: '',
          formattedId: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        juniorLeader: {
          _id: '',
          firstName: '',
          lastName: '',
          dob: moment(),
          doj: moment(),
          designation: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '',
            name: '',
            createdAt: moment(),
            updatedAt: moment(),
          },
          age: 0,
          gender: 'Female',
          phone: '',
          email: '',
          formattedId: '',
          createdAt: moment(),
          updatedAt: moment(),
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
    },
  );
  useEffect(() => {
    if (divisionIDs) {
      setAction('view');
      loader.onLoad();
      DivisionsServices.getDivisionbyId(divisionIDs)
      .then((res) => {
        loader.afterLoad();
        setDivisionDetails(res.data);
      })
      .catch((err) => {
        loader.afterLoad();
        console.log({ err });
      });
    }
    if (editID) {
      setAction('edit');
      loader.onLoad();
      DivisionsServices.getDivisionbyId(editID)
      .then((res) => {
        loader.afterLoad();

        setDivisionDetails(res.data);
      })
      .catch((err) => {
        loader.afterLoad();
        console.log({ err });
      });
    }
  }, []);
  return (
    <CommonPageLayout title={action === 'add' ? 'Add Division' : (action === 'edit' ? 'Edit Division' : 'Division Details')}>
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
              ><DivisionsFormComponent division={divisionDetails?.division}/>
                <br/> <Button
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
              ><SubDivisionsPage withCardContainer={divisionDetails?.subDivisions} />
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
              <>
                <form onSubmit={action === 'add' ? AddDivision : EditDivision} >
                  <Grid container spacing={12}>
                    <Grid item xs={12} md={6} lg={6}>

                      <BankDetailsFormComponent
                        value={divisionDetails?.FCRABankDetails}
                        onChange={(newbankDetails: BankDetails) => {
                          setDivisionDetails((divisionDetails) => ({ ...divisionDetails, FCRABankDetails: newbankDetails }));
                        }}
                        action={'add'}
                        title='FDRA Bank Details'
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>

                      <BankDetailsFormComponent
                        value={divisionDetails?.localBankDetails}
                        onChange={(newbankDetails: BankDetails) => {
                          setDivisionDetails((divisionDetails) => ({ ...divisionDetails, localBankDetails: newbankDetails }));
                        }}
                        action={'add'}
                        title='Local Bank Details'
                      />
                    </Grid>
                  </Grid>
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
                </form>
              </>

            )}
          </Box>
        </CardContent>
      </Container>

    </CommonPageLayout>
  );
};

export default DivisionDetailsPage;
