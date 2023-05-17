import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

const UserBasicDetailsForm = (
  props: FormComponentProps<CreatableNewUserBasicDetails, {
    textField: {variant: 'filled' | 'outlined' | 'standard'};
}>)=> {
  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel id="Field">Field</FormLabel>
          <RadioGroup
            aria-labelledby="Field"
            // defaultValue="missionar
            value={props.value.field}
            onChange={(e) =>props.onChange({ ...props.value, field: e.target.value as WorkerField|undefined })}
            name="Field"
            row
          >
            <FormControlLabel value="missionary" control={<Radio />} label="Missionary" />
            <FormControlLabel value="non-missionary" control={<Radio />} label="Non-Missionary" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          value={props.value.firstName}
          onChange={(e) => props.onChange({ ...props.value, firstName: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          value={props.value.lastName}
          onChange={(e) => props.onChange({ ...props.value, lastName: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePicker
          label="Date Of Birth"
          value={props.value.dateOfBirth}
          onChange={(newDate) => props.onChange({
            ...props.value,
            dateOfBirth: newDate ?? undefined,
          })}
          format='DD/MM/YYYY'
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              fullWidth: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label="Age"
            value={props.value.dateOfBirth?.fromNow(true)}
            InputProps={{
              readOnly: true,
            }}
            variant={props.options?.textField.variant}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} >
        <FormControl>
          <FormLabel id="Gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="Gender"
            value={props.value.gender}
            onChange={(e) =>props.onChange({
              ...props.value,
              gender: e.target.value as Gender|undefined,
            })}
            name="Gender"
            row
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} >
        <FormControl>
          <FormLabel id="martialStatus">Martial Status</FormLabel>
          <RadioGroup
            aria-labelledby="martialStatus"
            value={props.value.martialStatus}
            onChange={(e) =>props.onChange({
              ...props.value,
              martialStatus: e.target.value as MaritalStatus|undefined,
            })}
            name="martialStatus"
            row
          >
            <FormControlLabel value="Married" control={<Radio />} label="Married" />
            <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Highest Qualification"
          value={props.value.highestQualification}
          onChange={(e) => props.onChange({ ...props.value, highestQualification: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default UserBasicDetailsForm;
