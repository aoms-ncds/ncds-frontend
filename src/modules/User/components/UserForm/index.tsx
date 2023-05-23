import { Container, Stepper, Step, StepLabel, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import UserBasicDetailsForm from './UserBasicDetailsForm';
import NewOfficialDetailsForm from './NewOfficialDetailsForm';
import NewSupportDetailsForm from './NewSupportDetailsForm';
import NewUserSupportStructureForm from './NewUserSupportStructureForm';
import SpouseForm from '../../../Workers/components/SpouseForm';
import { FormComponentProps } from '../../../../extras/CommonTypes';
import { CreatableStaff } from '../../../HR/extras/StaffTypes';
import { CreatableIWorker } from '../../../Workers/extras/WorkersTypes';
import { UserKind } from '../../extras/UserTypes';

const UserForm = <UserType extends CreatableStaff|CreatableIWorker >(props: FormComponentProps<UserType, {
  textField: {variant: 'filled' | 'outlined' | 'standard'};
  kind: UserKind;
}>) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <Container maxWidth="md">
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
          { props.options?.kind === 'worker' && (
            <Step>
              <StepLabel>Spouse details</StepLabel>
            </Step>
          )}
        </Stepper>
      </Container>
      <Container>
        <br />
        <Card>
          <Container>
            {activeStep === 0 && (
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep((step) => step+1);
                }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        label={props.options?.kind=='worker'?'Worker Code':'Staff Code'}
                        value={props.options?.kind=='worker' ? (props.value as CreatableIWorker).workerCode : (props.value as CreatableStaff).staffCode}
                        variant={props.options?.textField.variant}
                        InputProps={{
                          readOnly: true,
                          disabled: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <UserBasicDetailsForm
                      action={props.action}
                      value={props.value.basicDetails}
                      onChange={
                        (newUserBasicDetails) => props.onChange({
                          ...props.value,
                          basicDetails: newUserBasicDetails,
                        })
                      }
                      options={props.options}
                    />
                  </Grid>

                  <div style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}>
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ padding: '16px 64px' }}
                    > Next </Button>
                  </div>
                </form>
              </CardContent>
            )}
            {activeStep === 1 && (
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep((step) => step+1);
                }}>
                  <Grid container spacing={3}>
                    <NewOfficialDetailsForm
                      action={props.action}
                      value={props.value.officialDetails}
                      onChange={(newOfficialDetails) => props.onChange({
                        ...props.value,
                        officialDetails: newOfficialDetails,
                      })}
                      options={props.options}
                    />
                  </Grid>

                  <div style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}>
                    <Button
                      onClick={() => setActiveStep((step) => step-1)}
                      variant="outlined"
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Go back </Button>
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ padding: '16px 64px' }}
                    > Next </Button>
                  </div>
                </form>
              </CardContent>
            )}
            {activeStep === 2 && (
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep((step) => step+1);
                }}>
                  <Grid container spacing={3}>
                    <NewSupportDetailsForm
                      action={props.action}
                      value={props.value.supportDetails}
                      onChange={(newSupportDetails) => props.onChange({
                        ...props.value,
                        supportDetails: newSupportDetails,
                      })}
                      options={props.options}
                    />
                  </Grid>

                  <div style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}>
                    <Button
                      onClick={() => setActiveStep((step) => step-1)}
                      variant="outlined"
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Go back </Button>
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ padding: '16px 64px' }}
                    > Next </Button>
                  </div>
                </form>
              </CardContent>
            )}
            {activeStep === 3 && (
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (props.options?.kind === 'worker') {
                    setActiveStep((currentStep) => currentStep+1);
                  } else {
                    props.onSubmit && props.onSubmit(props.value);
                  }
                }}>
                  <Grid container spacing={3}>
                    <NewUserSupportStructureForm
                      action={props.action}
                      value={props.value.supportStructure}
                      onChange={(newSupportStructure) => props.onChange({
                        ...props.value,
                        supportStructure: newSupportStructure,
                      })}
                      options={props.options}
                    />
                  </Grid>

                  <div style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}>
                    <Button
                      onClick={() => setActiveStep(0)}
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Review from first step </Button>
                    <Button
                      onClick={() => setActiveStep((step) => step-1)}
                      variant="outlined"
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Go back </Button>
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ padding: '16px 64px' }}
                    > {props.options?.kind === 'staff' ? 'Submit':'Next'} </Button>
                  </div>
                </form>
              </CardContent>
            )}
            {(activeStep === 4 && props.options?.kind === 'worker') &&(
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  props.onSubmit && props.onSubmit(props.value);
                }}>
                  <Grid container spacing={3}>
                    <SpouseForm
                      action={props.action}
                      value={(props.value as CreatableIWorker).spouse}
                      onChange={(spouse) => props.onChange({ ...props.value, spouse })}
                      options={props.options}
                    />
                  </Grid>

                  <div style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}>
                    <Button
                      onClick={() => setActiveStep(0)}
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Review from first step </Button>
                    <Button
                      onClick={() => setActiveStep((step) => step-1)}
                      variant="outlined"
                      sx={{ padding: '16px 64px', mr: 1 }}
                    > Go back </Button>
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ padding: '16px 64px' }}
                    > Submit </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default UserForm;
