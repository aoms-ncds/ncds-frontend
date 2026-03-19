import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import DesignationServices from '../../../HR/extras/DesignationServices';
import DepartmentService from '../../../Settings/extras/DepartmentService';

const NewSupportDetailsForm = (
  props: FormComponentProps<
    SupportDetails,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
      kind: UserKind;
    }
  >,
) => {
  const [designations, setDesignations] = useState<IDesignation[] | null>(null);
  const [designationsFetchError, setDesignationsFetchError] = useState<string | false>(false);

  const [department, setDepartment] = useState<Department[] | null>(null);
  const [departmentFetchError, setDepartmentFetchError] = useState<string | false>(false);


  useEffect(() => {
    DesignationServices.getAll()
      .then((res) => setDesignations(res.data))
      .catch((error) => {
        setDesignationsFetchError(error.message);
        enqueueSnackbar({ variant: 'error', message: error.message });
      });
  }, []);

  useEffect(() => {
    DepartmentService.getAll()
      .then((res) => setDepartment(res.data))
      .catch((error) => {
        setDepartmentFetchError(error.message);
        enqueueSnackbar({ variant: 'error', message: error.message });
      });
  }, []);

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={designations ?? []}
          value={props.value?.designation}
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
          label="Other Designation"
          value={props.value?.otherDesignation}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              otherDesignation: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={department ?? []}
          value={props.value?.department}
          onChange={(e, newValue) => props.onChange({ ...props.value, department: newValue ?? undefined })}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Department"
              disabled={department === null}
              helperText={departmentFetchError || (department === null && 'Loading...')}
              variant={props.options?.textField.variant}
              fullWidth
              required={props.options?.kind == 'staff'}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Total Number of Years In Ministry"
          type="number"
          value={props.value?.totalNoOfYearsInMinistry}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              totalNoOfYearsInMinistry: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
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
        <FormControl>
          <FormLabel id="TypeOfFamily">Type of Family:</FormLabel>
          <RadioGroup
            aria-labelledby="TypeOfFamily"
            // defaultValue="missionar
            value={props.value?.typeOfFamily ?? null}
            onChange={(e) => props.onChange({ ...props.value, typeOfFamily: e.target.value as TypeOfFamily | undefined })}
            name="TypeOfFamily"
            row
          >
            <FormControlLabel value={'Single'} control={<Radio />} label="Single" />
            <FormControlLabel value={'Family'} control={<Radio />} label="Family" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="withChurch">Type of Church:</FormLabel>
          <RadioGroup
            aria-labelledby="withChurch"
            // defaultValue="missionar
            value={props.value?.withChurch ? 'with church' : 'without church'}
            onChange={(e) => props.onChange({ ...props.value, withChurch: e.target.value === 'with church' ? true : false })}
            name="withChurch"
            row
          >
            <FormControlLabel value={'with church'} control={<Radio />} label="With Church" />
            <FormControlLabel value={'without church'} control={<Radio />} label="Without Church" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {props.options?.kind === 'worker' && <FormControlLabel
          label="Self Support"
          control={
            <Checkbox
              checked={props?.value?.selfSupport}
              onChange={(e: { target: { checked: any } }) =>
                props.onChange({
                  ...props.value,
                  selfSupport: e.target.checked,
                })
              }
            />
          }
        />}
      </Grid>
      {(props?.value?.selfSupport) && (
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Percentage of Self Support"
            value={props.value?.percentageofSelfSupport}
            onChange={(e: any) =>
              props.onChange({
                ...props.value,
                percentageofSelfSupport: e.target.value,
              })
            }
            variant={props.options?.textField.variant}
            fullWidth
          />
        </Grid>
      )}
    </>
  );
};

export default NewSupportDetailsForm;
