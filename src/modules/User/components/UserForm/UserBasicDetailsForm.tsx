import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { languages } from '../../../../extras/CommonConfig';
import NewAddressForm from './NewAddressForm';

const UserBasicDetailsForm = (
  props: FormComponentProps<CreatableNewUserBasicDetails, {
    textField: {variant: 'filled' | 'outlined' | 'standard'};
}>)=> {
  const [duplicateCurrentAddress, setDuplicateCurrentAddress] = useState(false);
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
          InputProps={{ required: true, autoFocus: true }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          value={props.value.lastName}
          onChange={(e) => props.onChange({ ...props.value, lastName: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ required: true }}
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
      </Grid>

      <Grid item xs={12} md={6} >
        <FormControl required>
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

      <Grid item xs={12} md={6} >
        <Autocomplete
          id="mlanguges"
          options={languages}
          getOptionLabel={(option) => option}
          value={props.value.motherTounge}
          onChange={(e, newvalue) => props.onChange({ ...props.value, motherTounge: newvalue??undefined })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Mother Tongue"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} >
        <Autocomplete
          id="Clanguges"
          options={languages}
          getOptionLabel={(option) => option}
          value={props.value.communicationLanguage}
          onChange={(e, newvalue) => props.onChange({ ...props.value, communicationLanguage: newvalue??undefined })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Communication Language"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} >
        <Autocomplete
          multiple
          id="knownLanguages"
          options={languages}
          getOptionLabel={(option) => option}
          value={props.value.knownLanguages}
          onChange={(e, newvalue) => props.onChange({ ...props.value, knownLanguages: newvalue??undefined })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Known Languages"
              variant={props.options?.textField.variant}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          type="email"
          value={props.value.email}
          onChange={(e) => props.onChange({ ...props.value, email: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ required: true }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Phone"
          type="tel"
          value={props.value.phone}
          onChange={(e) => props.onChange({ ...props.value, phone: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="alternativePhone"
          type="tel"
          value={props.value.alternativePhone}
          onChange={(e) => props.onChange({ ...props.value, alternativePhone: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="PAN"
          value={props.value.PANNo}
          onChange={(e) => props.onChange({ ...props.value, PANNo: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Aadhaar no"
          value={props.value.aadhaar?.aadhaarNo}
          onChange={(e) => props.onChange({
            ...props.value,
            aadhaar: {
              ...props.value.aadhaar,
              aadhaarNo: e.target.value,
            },
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} >
        <TextField
          label="Aadhaar File"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              props.onChange({
                ...props.value,
                aadhaar: {
                  aadhaarNo: props.value.aadhaar?.aadhaarNo??'',
                  aadhaarFile: { file },
                },
              });
            }
          }}
          variant={props.options?.textField.variant}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Voter ID"
          value={props.value.voterId?.voterIdNo}
          onChange={(e) => props.onChange({
            ...props.value,
            voterId: {
              ...props.value.voterId,
              voterIdNo: e.target.value,
            },
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} >
        <TextField
          label="Voter ID File"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              props.onChange({
                ...props.value,
                voterId: {
                  voterIdNo: props.value.voterId?.voterIdNo??'',
                  voterIdFile: { file },
                },
              });
            }
          }}
          variant={props.options?.textField.variant}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <NewAddressForm
        action='add'
        value={props.value.currentAddress}
        onChange={(newAddress) => {
          // Implement
          if (!duplicateCurrentAddress) {
            props.onChange({
              ...props.value,
              currentAddress: newAddress,
            });
          } else {
            props.onChange({
              ...props.value,
              currentAddress: newAddress,
              permanentAddress: newAddress,
            });
          }
        }}
        options={{
          textField: {
            variant: props.options?.textField.variant ?? 'outlined',
          },
          title: 'Current address',
        }}
      />
      <NewAddressForm
        action='add'
        value={props.value.permanentAddress}
        onChange={(newAddress) => {
          // Implement
          props.onChange({
            ...props.value,
            permanentAddress: newAddress,
          });
        }}
        options={{
          textField: {
            variant: props.options?.textField.variant ?? 'outlined',
          },
          title: 'Permanent address',
          copyAddressCheckBox: {
            label: 'Same as current address',
            onChange: (value) => setDuplicateCurrentAddress(value),
          },
        }}
      />
    </>
  );
};

export default UserBasicDetailsForm;
