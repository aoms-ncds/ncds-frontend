import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DivisionsServices from '../../../Divisions/extras/DivisionsServices';
import { enqueueSnackbar } from 'notistack';
import moment, { Moment } from 'moment';

const defaultDivisionDetails:Division = {
  details: {
    name: '',
    divisionId: '',
    contactNumber: '',
    email: '',
    address: { },
  },
  subDivisions: [],
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
};

const NewOfficialDetailsForm = (
  props: FormComponentProps<
    CreatableOfficialDetails,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [isDivisionChanged, setIsDivisionChanged] = useState<boolean>(false);
  const [newDiv, setnewDiv] = useState<Division|null>(null);
  const [subDivisions, setSubDivisions] = useState<SubDivision[] | null>(null);
  const [openDivConfirm, toggleopenDivConfirm] = useState<boolean>(false);

  useEffect(() => {
    DivisionsServices.getSubDivisionsByDivisionId(newDiv?._id as string)
    .then((res) => setSubDivisions(res.data))
    .catch((error) =>
      enqueueSnackbar({
        variant: 'error',
        message: error.message,
      }),
    );
    // console.log(props.value.divisionHistory);
  }, [newDiv]);

  useEffect(() => {
    // if (props.action!='add') {
    //   setcurrentDivision(props.value.divisionHistory[props.value.divisionHistory.length-1].division);
    // }
    DivisionsServices.getDivisions()
      .then((res) => setDivisions(res.data))
      .catch((error) =>
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        }),
      );
    if (props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?._id) {
      DivisionsServices.getSubDivisionsByDivisionId(props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?._id as string)
      .then((res) => setSubDivisions(res.data))
      .catch((error) =>
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        }),
      );
    }
  }, []);
  return (
    <>
      {console.log({ abc: props.value.dateOfJoining })}
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date Of Joining"
          value={props.value.dateOfJoining}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              dateOfJoining: newDate ?? undefined,
            });
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
            },
          }}
          autoFocus
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="No Of Years With The Organization"
          value={props.value.status=='Left' && props.value.dateOfLeaving? props.value.dateOfLeaving?.from(props.value.dateOfJoining, true):( props.value.dateOfJoining?.fromNow(true))}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {/* {console.log(props.value.divisionHistory)}
      {console.log(props.value.divisionHistory[0].division?.details.name)} */}
      {/* {props.value.divisionHistory.length>0? props.value.divisionHistory[props.value.divisionHistory.length-1].subDivision:null} */}
      {/* {props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?.details.name} */}
      {/* {props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?.details.name} */}
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={divisions ?? []}
          value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division: null}
          // value={props.value.divisionHistory[props.value.divisionHistory.length-1]?.division??null}
          getOptionLabel={(div) => div.details.name}
          onChange={(event, newVal) => {
            if (props.action==='edit') {
              if (newVal?._id!=props.value.divisionHistory[props.value.divisionHistory.length-1].division?._id) {
                toggleopenDivConfirm(true);
              }
            } else if (props.action==='add') {
              props.onChange({ ...props.value, divisionHistory: [
                {
                  division: newVal,
                  subDivision: undefined,
                  dateOfDivisionJoining: null,
                  dateOfDivisionLeaving: null,
                }]});
            }
            setnewDiv(newVal);
            // newVal?._id!==currentDiv._id? (
            //   props.onChange({ ...props.value, divisionHistory: [
            //     ...props.value.divisionHistory, {
            //       division: newVal ?? undefined,
            //       subDivision: undefined,
            //       dateOfDivisionJoining: null,
            //       dateOfDivisionLeaving: null,
            //     }]})
            // ) :
            //   props.onChange({ ...props.value, divisionHistory: [
            //     ...props.value.divisionHistory.slice(0, -1), {
            //       division: newVal ?? undefined,
            //       subDivision: undefined,
            //       dateOfDivisionJoining: null,
            //       dateOfDivisionLeaving: null,
            //     }]});
            if (!newVal) {
              setSubDivisions([]);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Division" helperText={!divisions ? 'Loading divisions...' : 'Select a Division'} variant={props.options?.textField.variant} required />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={subDivisions ?? []}
          value={(props.value.divisionHistory.length>0)?props.value.divisionHistory[props.value.divisionHistory.length-1].subDivision:null}
          getOptionLabel={(subDiv) => subDiv.name}
          onChange={(event, newVal) =>
            props.onChange({
              ...props.value,
              divisionHistory: [
                ...props.value.divisionHistory.slice(0, -1),
                {
                  ...props.value.divisionHistory[props.value.divisionHistory.length - 1],
                  subDivision: newVal ?? undefined,

                },
              ],
            })
          }
          renderInput={(params) => <TextField
            {...params}
            label="Sub Division"
            helperText={!divisions ? 'Loading sub divisions...' : 'Select a sub division'}
            variant={props.options?.textField.variant}
            required
          />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date Of Joining Current Division"
          value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory.length-1]?.dateOfDivisionJoining: null}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              divisionHistory: [
                ...props.value.divisionHistory.slice(0, -1),
                {
                  ...props.value.divisionHistory[props.value.divisionHistory.length - 1],
                  dateOfDivisionJoining: newDate ?? undefined,
                },
              ],
            });
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
              required: isDivisionChanged,
            },
          }}
          // autoFocus
          // required={isDivisionChanged}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Leaving Previous Division"
          value={(props.value.divisionHistory.length>1)?props.value.divisionHistory[props.value.divisionHistory.length-2].dateOfDivisionLeaving:null}
          disabled={(props.value.divisionHistory.length==1)}
          onChange={(newDate) => {
            if (props.value.divisionHistory.length>1) {
              props.onChange({
                ...props.value,
                divisionHistory: props.value.divisionHistory.map((division, index) =>
                  index === props.value.divisionHistory.length - 2 ?
                    {
                      ...division,
                      dateOfDivisionLeaving: newDate ?? undefined,
                    } :
                    division,
                ),
              });
            }
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
              required: isDivisionChanged,

            },
          }}
          // autoFocus
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<OfficialDetailsStatus>
          options={['Ministering', 'Left', 'Education Leave', 'Sabbatical Leave']}
          value={props.value.status}
          onChange={(e, selectedStatus) =>
            props.onChange({
              ...props.value,
              status: selectedStatus ?? undefined,
            })
          }
          renderInput={(params) => <TextField {...params} label="Status" required variant={props.options?.textField.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Left Organization On"
          value={props.value.status!='Left'?null:props.value.dateOfLeaving}
          disabled={props.value.status!='Left'}
          onChange={(newDate) =>
            props.onChange({
              ...props.value,
              dateOfLeaving: newDate ?? undefined,
            })
          }
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              fullWidth: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<DeactivationReason>
          options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
          disabled={ props.value.status!='Left'}
          value={props.value.reasonForDeactivation}
          onChange={(e, selectedReason) => props.onChange({ ...props.value, reasonForDeactivation: selectedReason ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Reason for Deactivation" variant={props.options?.textField.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Remarks"
          value={props.value.remarks}
          onChange={(e) => props.onChange({ ...props.value, remarks: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ multiline: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Churches Planted"
          type={'number'}
          value={props.value.noOfChurches}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              noOfChurches: Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControlLabel
          label="Self Support"
          control={
            <Checkbox
              onChange={(e) =>
                props.onChange({
                  ...props.value,
                  selfSupport: e.target.checked,
                })
              }
            />
          }
        />
      </Grid>
      <Dialog open={ openDivConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>
            Do you want to Update the Division?
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
            toggleopenDivConfirm(false);
          }}>No, Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // if (!isDivisionChanged) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory, {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              // }
              if (!isDivisionChanged) {
                if (props.value.divisionHistory[props.value.divisionHistory.length-1].division?._id!==newDiv?._id ) {
                  props.onChange({ ...props.value, divisionHistory: [
                    ...props.value.divisionHistory, {
                      division: newDiv,
                      subDivision: null,
                      dateOfDivisionJoining: null,
                      dateOfDivisionLeaving: null,
                    }]});
                  setIsDivisionChanged(true);
                }
              } else {
                if (props.value.divisionHistory[props.value.divisionHistory.length-2].division?._id===newDiv?._id ) {
                  props.onChange({ ...props.value, divisionHistory: [
                    ...props.value.divisionHistory.slice(0, -1)]});
                  setIsDivisionChanged(false);
                } else {
                  props.onChange({ ...props.value, divisionHistory: [
                    ...props.value.divisionHistory.slice(0, -1), {
                      division: newDiv,
                      subDivision: null,
                      dateOfDivisionJoining: null,
                      dateOfDivisionLeaving: null,
                    }]});
                  setIsDivisionChanged(true);
                }
              }
              // if (props.value.divisionHistory[props.value.divisionHistory.length-2].division?._id===newDiv?._id ) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory.slice(0, -1)]});
              //   setIsDivisionChanged(false);
              // } else if (props.value.divisionHistory[props.value.divisionHistory.length-1].division?._id!==newDiv?._id && !isDivisionChanged) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory, {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              //   setIsDivisionChanged(true);
              // } else {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory.slice(0, -1), {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              //   setIsDivisionChanged(true);
              // }
              toggleopenDivConfirm(false);
            }}
          >
            Yes, Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewOfficialDetailsForm;
