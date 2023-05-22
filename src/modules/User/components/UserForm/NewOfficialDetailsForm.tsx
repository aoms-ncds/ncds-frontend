import React, { useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const NewOfficialDetailsForm = (props: FormComponentProps<CreatableNewOfficialDetails, {
    textField: { variant: 'filled' | 'outlined' | 'standard' };
}>) => {
  const [dateError, setDateError] = useState(false);
  return (
    <>
      {console.log({ 'abc': props.value.dateOfJoining })}
      <Grid item xs={12} md={6}>
        <DatePicker
          label="Date of joining"
          value={props.value.dateOfJoining}
          onChange={(newDate) =>{
            props.onChange({
              ...props.value,
              dateOfJoining: newDate ?? undefined,
            });
          }}
          format='DD/MM/YYYY'
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
      <Grid item xs={12} md={6}>
        <TextField
          label="No of years with the organization"
          value={props.value.dateOfJoining?.fromNow(true)}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label="Left organization on"
          value={props.value.dateOfLeaving}
          onChange={(newDate) => props.onChange({
            ...props.value,
            dateOfLeaving: newDate ?? undefined,
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
        <Autocomplete<UserDeactivationReason>
          options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
          value={props.value.reasonForDeactivation}
          onChange={(e, selectedReason) => props.onChange({ ...props.value, reasonForDeactivation: selectedReason??undefined })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Reason for deactivation"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Remarks"
          value={props.value.remarks}
          onChange={(e) => props.onChange({ ...props.value, remarks: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ multiline: true }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Autocomplete
          options={['Dummy subdivision']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subdivision"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControlLabel
          label="Self support"
          control={
            <Checkbox
              onChange={(e) => props.onChange({
                ...props.value,
                selfSupport: e.target.checked,
              })}
            />
          }
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Autocomplete<NewOfficialDetailsStatus>
          options={['ministering', 'left', 'education leave', 'sabbatical leave']}
          value={props.value.status}
          onChange={(e, selectedStatus) => props.onChange({
            ...props.value,
            status: selectedStatus??undefined,
          })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default NewOfficialDetailsForm;
