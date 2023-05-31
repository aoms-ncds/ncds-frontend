import { Autocomplete, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import DesignationServices from '../../../HR/extras/DesignationServices';

const NewSupportDetailsForm = (
  props: FormComponentProps<
    SupportDetails,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >
) => {
  const [designations, setDesignations] = useState<Designation[] | null>(null);
  const [designationsFetchError, setDesignationsFetchError] = useState<string | false>(false);

  useEffect(() => {
    DesignationServices.getAll()
      .then((res) => setDesignations(res.data))
      .catch((error) => {
        setDesignationsFetchError(error.message);
        enqueueSnackbar({ variant: 'error', message: error.message });
      });
  }, []);

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={designations ?? []}
          value={props.value.designation}
          onChange={(e, newValue) => props.onChange({ ...props.value, designation: newValue ?? undefined })}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Designation"
              disabled={designations === null}
              helperText={designationsFetchError || (designations === null && 'Loading...')}
              variant={props.options?.textField.variant}
              fullWidth
              required
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Total Number of years in Ministry"
          type="number"
          value={props.value.totalNoOfYearsInMinistry}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              totalNoOfYearsInMinistry: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="Field">Field</FormLabel>
          <RadioGroup
            aria-labelledby="Field"
            // defaultValue="missionar
            value={props.value.withChurch ? 'with church' : 'without church'}
            onChange={(e) => props.onChange({ ...props.value, withChurch: e.target.value === 'with church' ? true : false })}
            name="Field"
            row
          >
            <FormControlLabel value={'with church'} control={<Radio />} label="With Church" />
            <FormControlLabel value={'without church'} control={<Radio />} label="Without Church" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};

export default NewSupportDetailsForm;
