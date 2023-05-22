import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HRServices from '../../../HR/extras/HRServices';
import { enqueueSnackbar } from 'notistack';
import UserServices from '../../extras/UserServices';

const NewSupportDetailsForm = (props: FormComponentProps<NewUserSupportDetails, {
  textField: {variant: 'filled' | 'outlined' | 'standard'};
}>) => {
  const [designations, setDesignations] = useState<Designation[]|null>(null);
  const [designationsFetchError, setDesignationsFetchError] = useState<string|false>(false);
  useEffect(() => {
    UserServices.getDesignations()
    .then((res) => {
      setDesignations(res.data);
    })
    .catch((error) => {
      setDesignationsFetchError(error.message);
      enqueueSnackbar({
        variant: 'error',
        message: error.message,
      });
    });
  }, []);

  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <Autocomplete
          options={designations??[]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) =><TextField
            {...params}
            label='Designation'
            disabled={designations === null}
            helperText={designationsFetchError||(designations === null && 'Loading...')}
            variant={props.options?.textField.variant}
            fullWidth
            required
          />}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Total number of years in ministry"
          type="number"
          value={props.value.totalNoOfYearsInMinistry}
          onChange={(e) => props.onChange({
            ...props.value,
            totalNoOfYearsInMinistry: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel id="Field">Field</FormLabel>
          <RadioGroup
            aria-labelledby="Field"
            // defaultValue="missionar
            value={props.value.withChurch ? 'with church' : 'without church'}
            onChange={(e) =>props.onChange({ ...props.value, withChurch: e.target.value === 'with church' ? true : false })}
            name="Field"
            row
          >
            <FormControlLabel value={'with church'} control={<Radio />} label="With Church" />
            <FormControlLabel value={'without church'} control={<Radio />} label="Without church" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};

export default NewSupportDetailsForm;
