import React, { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, Divider, FormControlLabel, FormLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import CommonLifeCycleStates from '../../../../extras/CommonLifeCycleStates';
import LanguagesService from '../../../Settings/extras/LanguagesService';
import { ILanguage } from '../../../Settings/extras/LanguageTypes';


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
          type="number"
          value={props.value.phone}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              phone: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
          inputProps={{
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Birth"
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
        <DatePicker
          label="Profile Added On"
          value={moment(props.value.ProfileAddedOn)}
          format="DD/MM/YYYY"
          onChange={(date: Moment | null) => {
            if (date) {
              props.onChange({ ...props.value, ProfileAddedOn: date });
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
        <TextField
          label="Age"
          value={(props.value.dateOfBirth?.fromNow() || '').replace(' ago', '')}
          variant={props.options?.textField.variant}
          InputLabelProps={{
            shrink: Boolean(props.value.dateOfBirth?.fromNow()),
          }}
          fullWidth disabled />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        {/* <FormControlLabel
          label="Working"
          control={
            <Checkbox
              value={props.value.working}
              onChange={(e) =>
                props .onChange({
                  ...props.value,
                  working: e.target.checked,
                })
              }
            />
          }
        /> */}
        <FormLabel sx={{ marginRight: '1rem' }}>Working</FormLabel>
        <Checkbox
          checked={props.value.working}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              working: e.target.checked,
            })
          }
          color="primary"
        />

        <FormLabel sx={{ float: 'right', pt: 1 }}>Widow Care</FormLabel>
        <Checkbox
          checked={props.value.widowCare}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              widowCare: e.target.checked,
            })
          }
          sx={{ float: 'right' }}
          color="primary"
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


      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label=" Aadhar No"
          type="number"
          value={props.value.aadharNo}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              aadharNo: Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
          inputProps={{
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Welfare Scheme Details</Divider>
      </Grid>


      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="ID No"
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
          label="Date Of Joining"
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
    </>
  );
};

export default SpouseForm;
