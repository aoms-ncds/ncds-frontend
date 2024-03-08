import { Grid, TextField } from '@mui/material';
import moment from 'moment';

const NewUserSupportStructureForm = (
  props: FormComponentProps<
    SupportStructure,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Basic"
          type="number"
          value={props.value?.basic === 0 ? '' : props.value?.basic}
          onChange={(e) =>{
            const prev=props.value.basic;
            props.onChange({
              ...props.value,
              basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevBasic: prev,
              basicLastUpdatedAt: moment(),
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
            const prev=props.value.HRA;
            props.onChange({
              ...props.value,
              HRA: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevHRA: prev,
              HRALastUpdatedAt: moment(),
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
            const prev=props.value.spouseAllowance;
            props.onChange({
              ...props.value,
              spouseAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevSpouseAllowance: prev,
              spouseAllowanceLastUpdatedAt: moment(),
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
            const prev=props.value.basic;
            props.onChange({
              ...props.value,
              basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevBasic: prev,
              basicLastUpdatedAt: moment(),
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
            const prev=props.value.basic;
            props.onChange({
              ...props.value,
              basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevBasic: prev,
              basicLastUpdatedAt: moment(),
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
            const prev=props.value.impactDeduction;
            props.onChange({
              ...props.value,
              impactDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevImpactDeduction: prev,
              impactDeductionLastUpdatedAt: moment(),
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
            const prev=props.value.telAllowance;
            props.onChange({
              ...props.value,
              telAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevTelAllowance: prev,
              telAllowanceLastUpdatedAt: moment(),
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
            const prev=props.value.PIONMissionaryFund;
            props.onChange({
              ...props.value,
              PIONMissionaryFund: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevPIONMissionaryFund: prev,
              PIONMissionaryFundLastUpdatedAt: moment(),
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
            const prev=props.value.MUTDeduction;
            props.onChange({
              ...props.value,
              MUTDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
              prevMUTDeduction: prev,
              MUTDeductionLastUpdatedAt: moment(),
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
    </>
  );
};

export default NewUserSupportStructureForm;
