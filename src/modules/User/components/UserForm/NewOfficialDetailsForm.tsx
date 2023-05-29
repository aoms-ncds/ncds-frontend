import React, { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DivisionsServices from '../../../Divisions/extras/DivisionsServices';
import { enqueueSnackbar } from 'notistack';

const NewOfficialDetailsForm = (
  props: FormComponentProps<
    CreatableOfficialDetails,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  const [divisions, setDivisions] = useState<Division[]|null>(null);
  const [subDivisions, setSubDivisions] = useState<SubDivision[] | null>(null);

  useEffect(() => {
    DivisionsServices.getDivisions()
      .then((res) => setDivisions(res.data))
      .catch((error) =>
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        }),
      );
  }, []);
  return (
    <>
      {console.log({ abc: props.value.dateOfJoining })}
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of joining"
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
          label="No of years with the organization"
          value={props.value.dateOfJoining?.fromNow(true)}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Left organization on"
          value={props.value.dateOfLeaving}
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
          value={props.value.reasonForDeactivation}
          onChange={(e, selectedReason) => props.onChange({ ...props.value, reasonForDeactivation: selectedReason ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Reason for deactivation" variant={props.options?.textField.variant} />}
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
        <Autocomplete
          options={divisions ?? []}
          value={props.value.division}
          getOptionLabel={(div) => div.details.name}
          onChange={(event, newVal) => {
            props.onChange({ ...props.value, division: newVal ?? undefined });
            if (!newVal) {
              setSubDivisions([]);
            }
            DivisionsServices.getSubDivisionsByDivisionId(newVal?._id as string)
            .then((res) => setSubDivisions(res.data))
            .catch((error) =>
              enqueueSnackbar({
                variant: 'error',
                message: error.message,
              }),
            );
          }}
          renderInput={(params) => <TextField
            {...params}
            label="Division"
            helperText={!divisions ? 'Loading divisions...' : 'Select a division'}
            variant={props.options?.textField.variant}
            required
          />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={subDivisions ?? []}
          value={props.value.subdivision}
          getOptionLabel={(subDiv) => subDiv.name}
          onChange={(event, newVal) => props.onChange({ ...props.value, subdivision: newVal ?? undefined })}
          renderInput={(params) => <TextField
            {...params}
            label="Sub division"
            helperText={!divisions ? 'Loading sub divisions...' : 'Select a sub division'}
            variant={props.options?.textField.variant}
            required
          />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<OfficialDetailsStatus>
          options={['Ministering', 'Left', 'Education Leave', 'Sabbatical Leave']}
          value={props.value.offiStatus}
          onChange={(e, selectedStatus) =>
            props.onChange({
              ...props.value,
              offiStatus: selectedStatus ?? undefined,
            })
          }
          renderInput={(params) => <TextField {...params} label="Status" required variant={props.options?.textField.variant} />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Joined current division on"
          value={props.value.dateOfDivisionJoining}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              dateOfDivisionJoining: newDate ?? undefined,
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
        <DatePicker
          label="Left previous division on"
          value={props.value.dateOfPreviousDivisionLeaving}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              dateOfPreviousDivisionLeaving: newDate ?? undefined,
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
          label="No. of Churches"
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
          label="Self support"
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
    </>
  );
};

export default NewOfficialDetailsForm;
