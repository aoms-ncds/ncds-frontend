import {
  Container, Stepper, Step, StepLabel, Card, CardContent, Button, Grid, TextField, Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Stack,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import UserBasicDetailsForm from './UserBasicDetailsForm';
import NewOfficialDetailsForm from './NewOfficialDetailsForm';
import NewSupportDetailsForm from './NewSupportDetailsForm';
import NewUserSupportStructureForm from './NewUserSupportStructureForm';
import SpouseForm from './SpouseForm';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { useParams } from 'react-router-dom';
import { childSupport } from '../../../Workers/extras/WorkersConfig';
import DeleteIcon from '@mui/icons-material/Delete';


const UserForm = <UserType extends CreatableStaff|CreatableIWorker >(props: FormComponentProps<UserType, {
  textField: {variant: 'filled' | 'outlined' | 'standard'};
  kind: UserKind;
}>) => {
  const [activeStep, setActiveStep] = useState(0);
  const spouse:CreatableSpouse=({ firstName: '',
    lastName: '',
  });

  const { editID } = useParams();
  // const [children, setChildren] = useState<CreatableChild[]>((props.value as CreatableIWorker).children.length > 0 ? (props.value as CreatableIWorker).children : [{
  //   // type: '',
  //   firstName: '',
  //   lastName: '',
  // }]);
  const [newChild, setNewChild] = useState<CreatableChild>({
    // type: '',
    firstName: '',
    lastName: '',
  });
  const [index, setIndex] = useState<number>(0);
  const [childAction, setchildAction] = useState<'add'|'edit'>('add');

  const [open, toggleOpen] = useState(false);
  const handleAddChild = () => {
    toggleOpen(true);
    setchildAction('add');
    setNewChild({
      // type: '',
      firstName: '',
      lastName: '',
    });
  };
  const deleteChild = (_index: number) => {
    props.onChange({
      ...props.value,
      children: (props.value as CreatableIWorker).children.filter((_, i) => i !== _index),

    });
    // const newChildren = (props.value as CreatableIWorker).children.filter((_, i) => i !== _index);
    // const deletedChild=children.filter((_, i) => i == index);
  //   const deletedSubdivisionIds = deletedSubdivision.map((sub) => sub._id);
  //   if (deletedSubdivisionIds.length > 0) {
  //     console.log('testing neww', deletedSubdivisionIds[0]);
  //     if (editID) {
  //       const subdivisionId = deletedSubdivisionIds[0];
  //       if (subdivisionId) {
  //         DivisionsServices.deleteChild(subdivisionId)
  //         .then((res) => {
  //           enqueueSnackbar({
  //             message: res.message,
  //             variant: 'success',
  //           });
  //         })
  //           .catch((err) => {
  //             console.log(err);
  //             enqueueSnackbar({
  //               message: err.message,
  //               variant: 'error',
  //             });
  //           });
  //       }
  //     }
  //   }
  //   enqueueSnackbar({
  //     message: 'Deleted Sub Division',
  //     variant: 'success',
  //   });
  //   console.log(newChildren);
  //   setChildren(newChildren);
  //   onChange(newChildren); // Call the onChange prop with the updated division details
  //   return newChildren;
  // };
  };
  // const lastProgramNameField = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   lastProgramNameField.current?.focus();
  //   // for (let i = 0; i < 50; i++) { // Used for automatically adding 50 sheets (for testing purposes)
  //   //   RESTClient.Scheduling.createProgramSheet({
  //   //     name: "Test sheet " + i,
  //   //     cols: [1, 2, 3, 4, 5].map(item => ({ name: "Program " + item }))
  //   //   })
  //   // }
  // }, [children]);
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
          { props.options?.kind === 'worker'&& props.value.basicDetails.martialStatus=='Married' && (
            <Step>
              <StepLabel>Spouse details</StepLabel>
            </Step>
          )}
          { props.options?.kind === 'worker'&& props.value.basicDetails.martialStatus=='Married' && (
            <Step>
              <StepLabel>Offsprings details</StepLabel>
            </Step>
          )}

        </Stepper>
      </Container>
      <br />
      {/* <Container> */}
      <Card>
        <CardContent>
          {activeStep === 0 && (
            <form onSubmit={(e) => {
              e.preventDefault();
              setActiveStep((step) => step+1);
            }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
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
                  options={
                    { ...props.options,
                      spouse: {
                        spouseOfAnother: (props.value as CreatableStaff).spouseOfAnother,
                        onChange:
                              (newSpouse:User) => props.onChange({
                                ...props.value,
                                spouseOfAnother: newSpouse,
                              }),
                      } } }
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
          )}
          {activeStep === 1 && (
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
          )}
          {activeStep === 2 && (
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
          )}
          {activeStep === 3 && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (props.options?.kind === 'worker'&& props.value.basicDetails.martialStatus=='Married') {
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
          )}
          {(activeStep === 4 && props.options?.kind === 'worker'&& props.value.basicDetails.martialStatus=='Married') &&(
            <form onSubmit={(e) => {
              e.preventDefault();
              setActiveStep((currentStep) => currentStep+1);
              // props.onSubmit && props.onSubmit(props.value);
            }}>
              <Grid container spacing={3}>
                <SpouseForm
                  action={props.action}
                  value={(props.value as CreatableIWorker).spouse??spouse}
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
          )}
          {(activeStep === 5 && props.options?.kind === 'worker'&& props.value.basicDetails.martialStatus=='Married') &&(
            <form onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit && props.onSubmit(props.value);
            }}>
              <Grid container spacing={3}>
                {(props.value as CreatableIWorker).children.map((child, i) => (

                  <Grid key={i} item xs={12} md={6} lg={4} >
                    <Stack direction="row" spacing={0}>


                      <TextField
                        label={`Child ${i + 1}`}
                        value={`${child.firstName} ${child.lastName}`}
                        onClick={(e) => {
                          toggleOpen(true);
                          setNewChild(child);
                          setIndex(i);
                          setchildAction('edit');
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        variant={props.options?.textField.variant}
                      />


                      <IconButton
                        onClick={() => {
                          deleteChild(i);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant='outlined'
                    onClick={handleAddChild}
                  >
                  Add New Child
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sx={{ justifyContent: 'flex-end' }}> */}
              <div style={{ float: 'right',
                marginBottom: 2,
                marginTop: 2,
                padding: 20 }}>
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

              {/* </Grid> */}
              {/* </Grid> */}
            </form>


          )}

        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={()=>toggleOpen(false)}
        PaperProps={{
          style: {
            width: '1000px',
          },
        }}
      >
        {/* <form onSubmit={props.action === 'add' ? AddChild : UpdateChild}> */}
        <form onSubmit={(e)=>{
          e.preventDefault();
          toggleOpen(false);
          childAction=='add'?
            props.onChange({
              ...props.value,
              children: [...(props.value as CreatableIWorker).children, newChild],
            }):
            props.onChange({
              ...props.value,
              children: (props.value as CreatableIWorker).children.map((child, childIndex)=>
                childIndex==index?newChild:child),
            });
        }}>
          <DialogTitle>Add Child</DialogTitle>
          <DialogContent>
            <br/>
            <Container>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                  <TextField
                    label=" First Name"
                    value={newChild?.firstName}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        firstName: e.target.value,
                      }))
                    }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                    required
                  />

                </Grid>
                <Grid item xs={12} md={6} >
                  <TextField
                    label=" Last Name:"
                    value={newChild?.lastName}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        lastName: e.target.value,
                      }))
                    }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <FormControl variant={props.options?.textField.variant} fullWidth>
                    <DatePicker
                      label="Date Of Birth"
                      value={newChild?.dateOfBirth}
                      onChange={(date: Moment | null) => {
                        if (date) {
                          setNewChild((newChild) => ({
                            ...newChild,
                            dateOfBirth: date,
                          }));
                        }
                      }}
                      slotProps={{
                        textField: {
                          variant: props.options?.textField.variant,
                          fullWidth: true,
                        },
                      }}

                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} >
                  <TextField
                    label="Age"
                    value={newChild?.dateOfBirth?.fromNow()}
                    // onChange={(e) =>
                    //   setNewChild((newchild) => ({
                    //     ...newchild,
                    //     age: Number(e.target.value),
                    //   }))
                    // }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                    disabled

                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <FormLabel id="demo-radio-buttons-group-label">Studying</FormLabel>
                  <Checkbox
                    checked={newChild.studying}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        studying: e.target.checked,
                      }))
                    }
                    color="primary"
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <TextField
                    label=" Class Of Study"
                    value={newChild?.classOfStudy}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        classOfStudy: e.target.value,
                      }))
                    }
                    fullWidth variant={props.options?.textField.variant} InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <FormLabel id="demo-radio-buttons-group-label">Working</FormLabel>
                  <Checkbox
                    checked={newChild.working}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        working: e.target.checked,
                      }))
                    }
                    color="primary"
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <TextField
                    label="Occupation"
                    value={newChild?.occupation}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        occupation: e.target.value,
                      }))
                    }
                    fullWidth variant={props.options?.textField.variant} InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <TextField
                    label="Qualification"
                    value={newChild?.qualification}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        qualification: e.target.value,
                      }))
                    }
                    fullWidth variant={props.options?.textField.variant} InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6} >
                  <Autocomplete
                    value={newChild?.childSupport}
                    options={childSupport ?? []}
                    getOptionLabel={(childSupport) => childSupport}
                    onChange={(_e, childSupport) => {
                      setNewChild((newChild) => ({
                        ...newChild,
                        childSupport: childSupport ?? '',
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} label="Child Support" variant={ props.options?.textField.variant}
                      required />}
                    fullWidth
                  />
                </Grid>
              </Grid>

            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>toggleOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
            >
                          Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* </Container> */}

    </>
  );
};

export default UserForm;
