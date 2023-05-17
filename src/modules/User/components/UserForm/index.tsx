import { Container, Stepper, Step, StepLabel, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import UserBasicDetailsForm from './UserBasicDetailsForm';

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
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                setActiveStep((step) => step+1);
              }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      label=" Worker Code"
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
                <Button
                  type='submit'
                  variant="contained"
                  sx={{ float: 'right', padding: '16px 64px', mb: 2, mt: 2 }}
                >
              Next
                </Button>
              </form>
            </CardContent>
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default UserForm;
