import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import StaffServices from '../../../HR/extras/StaffServices';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { IPmaDedution } from '../../../HR/PnaDeductionPage';

const NewUserSupportStructureForm = (
  props: FormComponentProps<
    SupportStructure,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  const [designations, setDesignations] = useState<IPmaDedution[]| null>(null);

  useEffect(() => {
    StaffServices.getPMADeduction()
        .then((res) => setDesignations(res.data))
        .catch((error) => {
          enqueueSnackbar({ variant: 'error', message: error.message });
        });
  }, []);
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Basic"
          type="number"
          value={props.value?.basic === 0 ? '' : props.value?.basic}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }

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
        <TextField
          label="HRA"
          type="number"
          value={props.value?.HRA === 0 ? '' : props.value?.HRA}
          onChange={(e) => {
            props.onChange({
              ...props.value,
              HRA: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }}
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
        <TextField
          label="Spouse Allowance"
          type="number"
          value={props.value?.spouseAllowance === 0 ? '' : props.value?.spouseAllowance}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              spouseAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),

            });
          } }
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
        <TextField
          label="Positional Allowance"
          type="number"
          value={props.value?.positionalAllowance === 0 ? '' : props.value?.positionalAllowance}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              positionalAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),

            });
          }}
          variant={props.options?.textField.variant}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Special Allowance"
          type="number"
          value={props.value?.specialAllowance === 0 ? '' : props.value?.specialAllowance}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              specialAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }}
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
        <TextField
          label="Miscellaneous Deduction"
          type="number"
          value={props.value?.impactDeduction === 0 ? '' : props.value?.impactDeduction}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              impactDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }}
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
        <TextField
          label="Tel Allowance"
          type="number"
          value={props.value?.telAllowance === 0 ? '' : props.value?.telAllowance}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              telAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }}
          variant={props.options?.textField.variant}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="PNRM Allowance"
          type="number"
          value={props.value?.PIONMissionaryFund === 0 ? '' : props.value?.PIONMissionaryFund}
          onChange={(e) =>{
            props.onChange({
              ...props.value,
              PIONMissionaryFund: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            });
          }}
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
        <TextField
          label="WS Deduction"
          type="number"
          value={props.value?.MUTDeduction === 0 ? '' : props.value?.MUTDeduction}
          onChange={(e) =>{
            // const prev=props.value.MUTDeduction;
            props.onChange({
              ...props.value,
              MUTDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              // prevMUTDeduction: prev,
              // MUTDeductionLastUpdatedAt: moment(),
            });
          }}
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
        <Autocomplete
          options={designations ?? []}
          value={props.value?.pmaDeduction??null}
          onChange={(e, newValue) => props.onChange({ ...props.value, pmaDeduction: newValue ?? null })}
          getOptionLabel={(option) => `${option.amount}`}
          renderInput={(params:any) => (
            <TextField
              {...params}
              label="PMA Allowance"
              disabled={designations === null}
              // helperText={designationsFetchError || (designations === null && 'Loading...')}
              variant={props.options?.textField.variant}
              fullWidth
              // required
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Total Amount"
          value={
            (props.value?.basic ?? 0) +
            (props.value?.HRA ?? 0) +
            (props.value?.spouseAllowance ?? 0) +
            (props.value?.positionalAllowance ?? 0) +
            (props.value?.specialAllowance ?? 0) +
            (props.value?.PIONMissionaryFund ?? 0) +
            (props.value?.telAllowance ?? 0)
          }
          variant={props.options?.textField.variant}
          fullWidth
          disabled

        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Total Deduction"
          value={(props.value?.impactDeduction ?? 0) + (props.value?.MUTDeduction ?? 0)}
          variant={props.options?.textField.variant}
          fullWidth
          disabled
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Net Amount"
          value={
            (props.value?.basic ?? 0) +
            (props.value?.HRA ?? 0) +
            (props.value?.spouseAllowance ?? 0) +
            (props.value?.positionalAllowance ?? 0) +
            (props.value?.specialAllowance ?? 0) +
            (props.value?.PIONMissionaryFund ?? 0) +
            (props.value?.telAllowance ?? 0) -
            ((props.value?.impactDeduction ?? 0) + (props.value?.MUTDeduction ?? 0))
          }
          variant={props.options?.textField.variant}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} >
        <FormControlLabel
          label="Support Enabled"
          control={
            <Checkbox
              checked={props.value?.supportEnabled}
              onChange={(e) =>
                props.onChange({
                  ...props.value,
                  supportEnabled: e.target.checked,
                })
              }
            />
          }
        />
      </Grid>
      {!props.value?.supportEnabled&&<>

        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Reason"
            value={ props.value?.reason }
            onChange={(e) =>
              props.onChange({
                ...props.value,
                reason: e.target.value,
              })
            }
            variant={props.options?.textField.variant}
            fullWidth
            disabled={props.value?.supportEnabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="Disabled From"
            value={props.value?.disabledFrom}
            onChange={(newDate) =>
              props.onChange({
                ...props.value,
                disabledFrom: newDate,
              })
            }
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                variant: props.options?.textField?.variant,
                fullWidth: true,
              },
            }}
            disabled={props.value?.supportEnabled}

          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DatePicker
            label="Disabled To"
            value={props.value?.disabledTo}
            onChange={(newDate) =>
              props.onChange({
                ...props.value,
                disabledTo: newDate,
              })
            }
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                variant: props.options?.textField?.variant,
                fullWidth: true,
              },
            }}
            disabled={props.value?.supportEnabled}

          />
        </Grid>
      </>}
    </>
  );
};

export default NewUserSupportStructureForm;
