import React, { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import CommonLifeCycleStates from '../../../../extras/CommonLifeCycleStates';
import LanguagesService from '../../../Settings/extras/LanguagesService';

const SpouseForm = (
  props: FormComponentProps<
    CreatableSpouse,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  useEffect(() => {
    LanguagesService.getAll({ status: CommonLifeCycleStates.ACTIVE })
  .then((res) =>
    setLanguages(res.data));
  }, []);
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="First Name"
          value={props.value.firstName}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              firstName: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Last Name"
          value={props.value.lastName}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              lastName: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Email"
          type="email"
          value={props.value.email}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              email: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Phone Number"
          type="tel"
          value={props.value.phone}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              phone: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date Of Birth"
          value={props.value.dateOfBirth}
          format="DD/MM/YYYY"
          onChange={(date: Moment | null) => {
            if (date) {
              props.onChange({ ...props.value, dateOfBirth: date });
            }
          }}
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              fullWidth: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField label="Age" value={props.value.dateOfBirth?.fromNow()} variant={props.options?.textField.variant} fullWidth disabled />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControlLabel
          label="Working"
          control={
            <Checkbox
              value={props.value.working}
              onChange={(e) =>
                props.onChange({
                  ...props.value,
                  working: e.target.checked,
                })
              }
            />
          }
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Occupation"
          value={props.value.occupation}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              occupation: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Qualification"
          value={props.value.qualification}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              qualification: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          multiple
          id="knownLanguages"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.knownLanguages}
          onChange={(e, newvalue) => props.onChange({ ...props.value, knownLanguages: newvalue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Known Languages" variant={props.options?.textField.variant} />}
        />
      </Grid>
    </>
  );
};

export default SpouseForm;
