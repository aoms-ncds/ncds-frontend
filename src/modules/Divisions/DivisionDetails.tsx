/* eslint-disable max-len */
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
import DivisionsList from './components/DivisionsList';
interface DivisionFormPageProps {
  action: 'add' | 'edit' | 'view';
  coordinator?: boolean;
}
const DivisionDetailsPage = (props: DivisionFormPageProps) => {
  const { divisionIDs, editID } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [action, setAction] = useState<'add' | 'edit' | 'view'>('add');
  const [otherBankDetailsCount, setOtherBankDetailsCount] = useState(0);
  // const [count, setCount] = useState([]);
  const navigate = useNavigate();
  let count : number[] =[];
  let BenFicount : number[] =[];
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
    if (editID && props.action === 'edit') {
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
      president: {},
      officeManager: {},
    },
    subDivisions: [
      {
        _id: '',
        name: '',
      },
    ],
    DivisionBankFCRA: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    DivisionBankLocal: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank1: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank2: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank3: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank4: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank5: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank6: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank7: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank8: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank9: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank10: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank11: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank12: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank13: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank14: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank15: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank16: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank17: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank18: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank19: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    BeneficiaryBank20: {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
    createdAt: moment(),
    updatedAt: moment(),
  });
  // eslint-disable-next-line new-cap
  DivisionsList(divisionDetails);


  useEffect(() => {
    if (divisionIDs) {
      count=[];
      BenFicount =[];
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

   useEffect(() => {
    if (action === 'edit' && divisionDetails) {
      let total = 0;
      for (let i = 2; i <= 20; i++) {
        const key = `BeneficiaryBank${i}` as keyof Division;
        const value = divisionDetails[key];
        if (value && typeof value === 'object' && 'bankName' in value && value.bankName) total++;
      }
      setOtherBankDetailsCount(total);
    }
  }, [divisionDetails, action]);

  if (divisionDetails?.FCRABankDetails?.bankName != null || divisionDetails?.DivisionBankFCRA?.bankName !=null) {
    // setOtherBankDetailsCount(1);
    count.push(1);
  }
  if (divisionDetails?.localBankDetails?.bankName != null || divisionDetails?.DivisionBankLocal?.bankName != null) {
    count.push(2);
  }
  if (divisionDetails?.otherBankDetails?.bankName != null || divisionDetails?.BeneficiaryBank1?.bankName != null) {
    count.push(3);
  }
  if (divisionDetails?.otherBankDetails1?.bankName != null || divisionDetails?.BeneficiaryBank2?.bankName != null) {
    BenFicount.push(1);
  }
  if (divisionDetails?.otherBankDetails2?.bankName != null || divisionDetails?.BeneficiaryBank3?.bankName != null) {
    BenFicount.push(2);
  }
  if (divisionDetails?.otherBankDetails2?.bankName != null || divisionDetails?.BeneficiaryBank4?.bankName != null) {
    BenFicount.push(3);
  }
  if (divisionDetails?.otherBankDetails3?.bankName != null || divisionDetails?.BeneficiaryBank5?.bankName != null) {
    BenFicount.push(4);
  }
  if (divisionDetails?.otherBankDetails4?.bankName != null || divisionDetails?.BeneficiaryBank6?.bankName != null) {
    BenFicount.push(6);
  }
  if (divisionDetails?.BeneficiaryBank7?.bankName != null) {
    BenFicount.push(7);
  }
  if (divisionDetails?.BeneficiaryBank8?.bankName != null) {
    BenFicount.push(8);
  }
  if (divisionDetails?.BeneficiaryBank9?.bankName != null) {
    BenFicount.push(9);
  }
  if (divisionDetails?.BeneficiaryBank10?.bankName != null) {
    BenFicount.push(10);
  }
  if (divisionDetails?.BeneficiaryBank11?.bankName != null) {
    BenFicount.push(11);
  }
  if (divisionDetails?.BeneficiaryBank12?.bankName != null) {
    BenFicount.push(12);
  }
  if (divisionDetails?.BeneficiaryBank13?.bankName != null) {
    BenFicount.push(13);
  }
  if (divisionDetails?.BeneficiaryBank14?.bankName != null) {
    BenFicount.push(14);
  }
  if (divisionDetails?.BeneficiaryBank15?.bankName != null) {
    BenFicount.push(15);
  }
  if (divisionDetails?.BeneficiaryBank16?.bankName != null) {
    BenFicount.push(16);
  }
  if (divisionDetails?.BeneficiaryBank17?.bankName != null) {
    BenFicount.push(10);
  }
  if (divisionDetails?.BeneficiaryBank18?.bankName != null) {
    BenFicount.push(17);
  }
  if (divisionDetails?.BeneficiaryBank19?.bankName != null) {
    BenFicount.push(18);
  }
  if (divisionDetails?.BeneficiaryBank20?.bankName != null) {
    BenFicount.push(20);
  }

  // }, []);
  // console.log(divisionDetails, 'shivi');
  // console.log(count.includes(1), '  setCount(1)');
  console.log(BenFicount, '  setCount(1)');
  // console.log(divisionDetails, 'divisionDetails');
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
                props.coordinator ? navigate('/divisions/view') : navigate('/divisions')
                ;
              }}
            >

              <Grid container spacing={2}>
                {count.includes(1) && action =='view' ?(
                  <BankDetailsForm
                    value={divisionDetails?.FCRABankDetails ?? divisionDetails.DivisionBankFCRA}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, DivisionBankFCRA: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Division Bank FCRA' }}
                  />
                ):(
                  <BankDetailsForm
                    value={divisionDetails?.FCRABankDetails ?? divisionDetails.DivisionBankFCRA}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, DivisionBankFCRA: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Division Bank FCRA' }}
                  />
                )}

                {count.includes(2) && action =='view' ?(

                  <BankDetailsForm
                    value={divisionDetails?.localBankDetails ?? divisionDetails.DivisionBankLocal}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, DivisionBankLocal: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Division Bank Local' }}
                  />
                ):(
                  <BankDetailsForm
                    value={divisionDetails?.localBankDetails ?? divisionDetails.DivisionBankLocal}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, DivisionBankLocal: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Division Bank Local' }}
                  />
                )}

                {count.includes(3) && action =='view' ?(

                  <BankDetailsForm
                    value={divisionDetails?.otherBankDetails ?? divisionDetails.BeneficiaryBank1}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, BeneficiaryBank1: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Beneficiary Bank 1' }}
                  />
                ):(

                  <BankDetailsForm
                    value={divisionDetails?.otherBankDetails ?? divisionDetails.BeneficiaryBank1}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, BeneficiaryBank1: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: 'Beneficiary Bank 1' }}
                  />
                )}

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

                {/* {Array.from({ length: otherBankDetailsCount }).map((_, index: number) => (
                  <BankDetailsForm
                    key={index}
                    value={divisionDetails[`BeneficiaryBank${index + 2}` as keyof Division] as BankDetails | undefined}
                    onChange={(newbankDetails) => {
                      setDivisionDetails((divisionDetails) => ({ ...divisionDetails, [`BeneficiaryBank${index + 2}`]: newbankDetails as BankDetails }));
                    }}
                    action={props.action}
                    options={{ title: `Beneficiary Bank ${index + 2}` }}
                  />
                ))} */}
                {
                  action =='view' ?
                    Array.from(BenFicount).map((_, index: number) => (
                      <BankDetailsForm
                        key={index}
                        value={divisionDetails[`BeneficiaryBank${index + 2}` as keyof Division] as BankDetails | undefined}
                        onChange={(newBankDetails) => {
                          setDivisionDetails((divisionDetails) => ({
                            ...divisionDetails,
                            [`BeneficiaryBank${index + 2}`]: newBankDetails as BankDetails,
                          }));
                        }}
                        action={props.action}
                        options={{ title: `Beneficiary Bank ${index + 2}` }}
                      />
                    )) :
                    Array.from({ length: otherBankDetailsCount }).map((_, index: number) => (
                      <BankDetailsForm
                        key={index}
                        value={divisionDetails[`BeneficiaryBank${index + 2}` as keyof Division] as BankDetails | undefined}
                        onChange={(newBankDetails) => {
                          setDivisionDetails((divisionDetails) => ({
                            ...divisionDetails,
                            [`BeneficiaryBank${index + 2}`]: newBankDetails as BankDetails,
                          }));
                        }}
                        action={props.action}
                        options={{ title: `Beneficiary Bank ${index + 2}` }}
                      />
                    ))
                }

                <Grid item xs={12}>
                  {action !== 'view' && otherBankDetailsCount !=19 && (
                    <Button variant="contained" onClick={() => setOtherBankDetailsCount((count) => count + 1)}>
                      Add More Banks
                    </Button>
                  )}

                  {action !== 'view' && otherBankDetailsCount !=9 && (
                    <Button style={{ marginLeft: '2px' }} variant="contained" onClick={() => setOtherBankDetailsCount((count) => count - 1)}>
                      Remove
                    </Button>
                  )}
                  {/* {action === 'view' && otherBankDetailsCount !=9 && (
                    <Button variant="contained" onClick={() => setOtherBankDetailsCount((count) => count + 1)}>
                      View More Banks
                    </Button>
                  )} */}
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
