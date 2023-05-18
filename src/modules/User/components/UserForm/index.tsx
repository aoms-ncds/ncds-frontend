import { Container, Stepper, Step, StepLabel, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import UserBasicDetailsForm from './UserBasicDetailsForm';
import NewAddressForm from './NewAddressForm';
import NewOfficialDetailsForm from './NewOfficialDetailsForm';

const UserForm = (props: FormComponentProps<CreatableNewUser, {
  textField: {variant: 'filled' | 'outlined' | 'standard'};
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
                        label="Worker Code"
                        value={props.value.workerCode}
                        variant={props.options?.textField.variant}
                        InputProps={{
                          readOnly: true,
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
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default UserForm;
