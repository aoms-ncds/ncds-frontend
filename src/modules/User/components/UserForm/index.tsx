import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Autocomplete,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import UserBasicDetailsForm from './UserBasicDetailsForm';
import NewOfficialDetailsForm from './NewOfficialDetailsForm';
import NewSupportDetailsForm from './NewSupportDetailsForm';
import NewUserSupportStructureForm from './NewUserSupportStructureForm';
import SpouseForm from './SpouseForm';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Image as ImageIcon } from '@mui/icons-material';
import ChildrenServices from '../../../Workers/extras/ChildrenServices';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../../extras/UserLifeCycleStates';
import CommonLifeCycleStates from '../../../../extras/CommonLifeCycleStates';
import UserServices from '../../extras/UserServices';

const UserForm = <UserType extends CreatableStaff | CreatableIWorker>(
  props: FormComponentProps<
    UserType,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
      kind: UserKind;
      profilePic: {
        userPhoto?: File;
        setUserPhoto?: (newUserPhoto: File) => void;
      };
    }
  >,
) => {
  const [activeStep, setActiveStep] = useState(0);
  const spouse: CreatableSpouse = { firstName: '', lastName: '' };

  const navigate = useNavigate();

  const [newChild, setNewChild] = useState<CreatableChild>({
    // type: '',
    firstName: '',
    lastName: '',
    gender: undefined,
  });
  const [index, setIndex] = useState<number>(0);
  const [childAction, setChildAction] = useState<'add' | 'edit'>('add');

  // const [userPhoto, setUserPhoto] = useState<File>();
  // const [userPhotoBlobURL, setUserPhotoBlobURL] = useState<string | null>(null);

  const [open, toggleOpen] = useState(false);
  const handleAddChild = () => {
    toggleOpen(true);
    setChildAction('add');
    setNewChild({
      // type: '',
      firstName: '',
      lastName: '',
      gender: undefined,
    });
  };
  const deleteChild = (_index: number) => {
    props.onChange({
      ...props.value,
      children: (props.value as CreatableIWorker).children.filter((_, i) => i !== _index),
    });
  };
  const [childSupport, setChildSupport] = useState<IChildSupport[]>([]);

  const submitForm = (data: UserType) => {
    if (props.action == 'add' && props.value.basicDetails.email==null) {
      UserServices.checkDuplicationOfMail(props.value.basicDetails.email)
        .then((res) => {
          props.onSubmit && props.onSubmit(props.value);
          navigate(props.options?.kind == 'worker' ? '/workers/' : '/hr/manage');
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      props.onSubmit && props.onSubmit(props.value);
      navigate(props.options?.kind == 'worker' ? '/workers/' : '/hr/manage');
    }
  };

  useEffect(() => {
    const checkprops = props.action;

    // if (props.value.imageURL)setUserPhotoBlobURL(props.value.imageURL);
    ChildrenServices.getAllChildSupport()
      .then((res) => setChildSupport(res.data))
      .catch((error) =>
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        }),
      );
  }, []);
  console.log(props.value, 'props.value.officialDetails');

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

          {/* <Step>
            <StepLabel>Support Structure</StepLabel>
          </Step> */}
          {props.options?.kind === 'worker' && props.value.basicDetails.martialStatus === 'Married' && (
            <Step>
              <StepLabel>Spouse details</StepLabel>
            </Step>
          )}
          {props.options?.kind === 'worker' && props.value.basicDetails.martialStatus == 'Married' && (
            <Step>
              <StepLabel>Offsprings details</StepLabel>
            </Step>
          )}
          {((props.options?.kind === 'worker' && props.value.status && (props.value.status == UserLifeCycleStates.CREATED || props.value.status == UserLifeCycleStates.ACTIVE)) ||
            props.options?.kind === 'staff') && (
            <Step>
              <StepLabel>Support Details</StepLabel>
            </Step>
          )}
        </Stepper>
      </Container>
      <br />
      {/* <Container> */}
      <Card>
        <CardContent>
          {activeStep === 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveStep((step) => step + 1);
              }}
            >
              <Grid container spacing={3}>
                {props.options?.profilePic.setUserPhoto && (
                  <Grid item xs={12}>
                    <label htmlFor="imagePicker">
                      <Avatar
                        sx={{
                          height: 150,
                          width: 150,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                        variant="rounded"
                        src={props.value.imageURL?.replace('uc', 'thumbnail')?? ''}
                      >
                        {!props.value.imageURL && <ImageIcon sx={{ fontSize: 100 }} />}
                      </Avatar>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="imagePicker"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        e.preventDefault(); // Prevent the default behavior of the file input

                        if (e.target.files) {
                          console.log('size is', e.target.files[0].size / 1024);
                          if (e.target.files[0].size > 1e6) {
                            enqueueSnackbar({
                              message: 'File size cannot be greater than 1 MB',
                              variant: 'error',
                            });
                          } else {
                            props.options?.profilePic?.setUserPhoto?.(e.target.files[0]);
                            // setUserPhotoBlobURL(URL.createObjectURL(e.target.files[0]));
                            props.onChange({
                              ...props.value,
                              imageURL: URL.createObjectURL(e.target.files[0]),
                            });
                          }
                        }
                      }}
                    />
                  </Grid>
                )}

                <Grid item xs={12} md={6} lg={8}>
                  <TextField
                    label={props.options?.kind == 'worker' ? 'Worker Code' : 'Staff Code'}
                    value={props.options?.kind == 'worker' ? (props.value as CreatableIWorker).workerCode : (props.value as CreatableStaff).staffCode}
                    variant={props.options?.textField.variant}
                    InputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>

                <UserBasicDetailsForm
                  action={props.action}
                  value={props.value.basicDetails}
                  onChange={(newUserBasicDetails) =>
                    props.onChange({
                      ...props.value,
                      basicDetails: newUserBasicDetails,
                    })
                  }
                  options={{
                    ...props.options,
                    spouse: {
                      spouseOfAnother: (props.value as CreatableStaff).spouseOfAnother,
                      onChange: (newSpouse: User) =>
                        props.onChange({
                          ...props.value,
                          spouseOfAnother: newSpouse,
                        }),
                    },
                  }}
                />
              </Grid>

              <div
                style={{
                  float: 'right',
                  marginBottom: 2,
                  marginTop: 2,
                  padding: 20,
                }}
              >
                {/* <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }} disabled={!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(props.value.basicDetails.email)}>
                  Next
                </Button> */}
                <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                  Next
                </Button>
              </div>
            </form>
          )}
          {activeStep === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (props.options?.kind == 'worker') {
                  if (props.value.basicDetails.martialStatus == 'Married') {
                    setActiveStep((currentStep) => currentStep + 1);
                  } else {
                    if (props.value.status && (props.value.status == UserLifeCycleStates.CREATED || props.value.status == UserLifeCycleStates.ACTIVE)) {
                      setActiveStep((currentStep) => currentStep + 3);
                    } else {
                      submitForm(props.value);
                    }
                  }
                } else {
                  setActiveStep((currentStep) => currentStep + 3);
                }
              }}
            >
              <Grid container spacing={3}>
                <NewOfficialDetailsForm
                  action={props.action}
                  value={props.value.officialDetails}
                  onChange={(newOfficialDetails) =>
                    props.onChange({
                      ...props.value,
                      officialDetails: newOfficialDetails,
                    })
                  }
                  options={props.options}
                />
              </Grid>

              <div
                style={{
                  float: 'right',
                  marginBottom: 2,
                  marginTop: 2,
                  padding: 20,
                }}
              >
                <Button onClick={() => setActiveStep((step) => step - 1)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                  Go back{' '}
                </Button>
                <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                  {props.options?.kind === 'worker' && !props.value.status && props.value.basicDetails.martialStatus !== 'Married' ? 'Submit' : 'Next'}
                </Button>
              </div>
            </form>
          )}

          {activeStep === 2 && props.options?.kind === 'worker' && props.value.basicDetails.martialStatus == 'Married' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveStep((currentStep) => currentStep + 1);
                // props.onSubmit && props.onSubmit(props.value);
              }}
            >
              <Grid container spacing={3}>
                <SpouseForm
                  action={props.action}
                  value={(props.value as CreatableIWorker).spouse ?? spouse}
                  onChange={(spouse) => props.onChange({ ...props.value, spouse })}
                  options={props.options}
                />
              </Grid>

              <div
                style={{
                  float: 'right',
                  marginBottom: 2,
                  marginTop: 2,
                  padding: 20,
                }}
              >
                <Button onClick={() => setActiveStep((step) => step - 1)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                  {' '}
                  Go back{' '}
                </Button>
                <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                  {' '}
                  Next{' '}
                </Button>
              </div>
            </form>
          )}
          {activeStep === 3 && props.options?.kind === 'worker' && props.value.basicDetails.martialStatus == 'Married' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (props.value.status === UserLifeCycleStates.CREATED || props.value.status === UserLifeCycleStates.ACTIVE) {
                  setActiveStep((currentStep) => currentStep + 1);
                } else {
                  submitForm(props.value);
                }
              }}
            >
              <Grid container spacing={3}>
                {(props.value as CreatableIWorker).children.map((child, i) => (
                  <Grid key={i} item xs={12} md={6} lg={4}>
                    <Stack direction="row" spacing={0}>
                      <TextField
                        label={`Child ${i + 1}`}
                        value={`${child.firstName} ${child.lastName}`}
                        onClick={() => {
                          toggleOpen(true);
                          setNewChild(child);
                          setIndex(i);
                          setChildAction('edit');
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
                  <Button variant="outlined" onClick={handleAddChild}>
                    Add New Child
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid sx={{ my: 2 }}>
                <Button onClick={() => setActiveStep((step) => step - 1)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                  {' '}
                  Go back{' '}
                </Button>
                <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                  {' '}
                  Next{' '}
                </Button>
              </Grid> */}

              {props.value.status === UserLifeCycleStates.CREATED || props.value.status === UserLifeCycleStates.ACTIVE ? (
                <div
                  style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}
                >
                  <Button onClick={() => setActiveStep((step) => step - 1)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                    {' '}
                    Go back{' '}
                  </Button>
                  <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                    {' '}
                    Next{' '}
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    float: 'right',
                    marginBottom: 2,
                    marginTop: 2,
                    padding: 20,
                  }}
                >
                  <Button onClick={() => setActiveStep(0)} sx={{ padding: '16px 64px', mr: 1 }}>
                    {' '}
                    Review from first step{' '}
                  </Button>
                  <Button onClick={() => setActiveStep((step) => step - 1)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                    {' '}
                    Go back{' '}
                  </Button>
                  <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                    {' '}
                    {/* {(props.options?.kind === 'staff'||(props.options?.kind === 'worker' && props.value.basicDetails.martialStatus != 'Married') )? 'Submit' : 'Next'}{' '} */} Submit{' '}
                  </Button>
                </div>
              )}
              {/* <Grid item xs={12} sx={{ justifyContent: 'flex-end' }}> */}

              {/* </Grid> */}
              {/* </Grid> */}
            </form>
          )}
          {activeStep === 4 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm(props.value);
              }}
            >
              <Grid container spacing={3}>
                <NewSupportDetailsForm
                  action={props.action}
                  value={props.value.supportDetails}
                  onChange={(newSupportDetails) =>
                    props.onChange({
                      ...props.value,
                      supportDetails: newSupportDetails,
                    })
                  }
                  options={props.options}
                />

                <Grid item xs={12}>
                  <br />
                  <Divider textAlign="left">Support Structure</Divider>
                </Grid>

                <NewUserSupportStructureForm
                  action={props.action}
                  value={props.value.supportStructure}
                  onChange={(newSupportStructure) =>
                    props.onChange({
                      ...props.value,
                      supportStructure: newSupportStructure,
                    })
                  }
                  options={props.options}
                />

                <Grid item xs={12}>
                  <br />
                  <Divider textAlign="left">Insurance Details</Divider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Impact No"
                    value={props.value.insurance?.impactNo}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        insurance: {
                          ...props.value.insurance,
                          impactNo: e.target.value,
                        },
                      })
                    }
                    variant={props.options?.textField?.variant}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <DatePicker
                    label="Date Of Joining Insurance"
                    value={props.value.insurance?.dojInsurance}
                    onChange={(newDate) =>
                      props.onChange({
                        ...props.value,
                        insurance: {
                          ...props.value.insurance,
                          dojInsurance: newDate ?? undefined,
                        },
                      })
                    }
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        variant: props.options?.textField?.variant,
                        fullWidth: true,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Nominee"
                    value={props.value.insurance?.nominee}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        insurance: {
                          ...props.value.insurance,
                          nominee: e.target.value,
                        },
                      })
                    }
                    variant={props.options?.textField?.variant}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Relation "
                    value={props.value.insurance?.relation}
                    onChange={(e) =>
                      props.onChange({
                        ...props.value,
                        insurance: {
                          ...props.value.insurance,
                          relation: e.target.value,
                        },
                      })
                    }
                    variant={props.options?.textField?.variant}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <div
                style={{
                  float: 'right',
                  marginBottom: 2,
                  marginTop: 2,
                  padding: 20,
                }}
              >
                <Button onClick={() => setActiveStep(0)} variant="outlined" sx={{ padding: '16px 64px', mr: 1 }}>
                  {' '}
                  Review from first step{' '}
                </Button>
                <Button
                  onClick={() => setActiveStep(props.value.basicDetails.martialStatus !== 'Married' ? (step) => step - 3 : (step) => step - 1)}
                  variant="outlined"
                  sx={{ padding: '16px 64px', mr: 1 }}
                >
                  {' '}
                  Go back{' '}
                </Button>
                <Button type="submit" variant="contained" sx={{ padding: '16px 64px' }}>
                  {' '}
                  {/* {(props.options?.kind === 'staff'||(props.options?.kind === 'worker' && props.value.basicDetails.martialStatus != 'Married') )? 'Submit' : 'Next'}{' '} */} Submit{' '}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => toggleOpen(false)}
        PaperProps={{
          style: {
            width: '1000px',
          },
        }}
      >
        {/* <form onSubmit={props.action === 'add' ? AddChild : UpdateChild}> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toggleOpen(false);
            childAction == 'add' ?
              props.onChange({
                ...props.value,
                children: [...(props.value as CreatableIWorker).children, newChild],
              }) :
              props.onChange({
                ...props.value,
                children: (props.value as CreatableIWorker).children.map((child, childIndex) => (childIndex == index ? newChild : child)),
              });
          }}
        >
          <DialogTitle>Add Child</DialogTitle>
          <DialogContent>
            <br />
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
                  <FormControl variant={props.options?.textField.variant} fullWidth>
                    <DatePicker
                      label="Date Of Birth"
                      value={newChild?.dateOfBirth}
                      format="DD/MM/YYYY"
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

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Age"
                    value={moment().diff(newChild?.dateOfBirth, 'years')}
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

                <Grid item xs={12} md={12} lg={12}>
                  <FormControl>
                    <FormLabel id="Gender">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="Gender"
                      value={newChild.gender ?? null}

                      onChange={(e) =>
                        setNewChild((newchild) => ({
                          ...newchild,
                          gender: ( e.target.value as Gender | undefined),
                        }))
                      }
                      name="Gender"
                      row
                    >
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
                  <TextField
                    label=" Class Of Study"
                    value={newChild?.classOfStudy}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        classOfStudy: e.target.value,
                      }))
                    }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Occupation"
                    value={newChild?.occupation}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        occupation: e.target.value,
                      }))
                    }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Qualification"
                    value={newChild?.qualification}
                    onChange={(e) =>
                      setNewChild((newchild) => ({
                        ...newchild,
                        qualification: e.target.value,
                      }))
                    }
                    fullWidth
                    variant={props.options?.textField.variant}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={newChild?.childSupport}
                    options={childSupport}
                    getOptionLabel={(childSupport) => childSupport.name}
                    onChange={(_e, childSupport) => {
                      setNewChild((newChild) => ({
                        ...newChild,
                        childSupport: childSupport ?? undefined,
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} label="Child Support" variant={props.options?.textField.variant} required />}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Child Support Amount" value={newChild?.childSupport?.amount} fullWidth variant={props.options?.textField.variant} InputLabelProps={{ shrink: true }} disabled />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
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
