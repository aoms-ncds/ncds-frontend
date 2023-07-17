import { Grid, TextField } from '@mui/material';

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
          onChange={(e) =>
            props.onChange({
              ...props.value,
              basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="HRA"
          type="number"
          value={props.value?.HRA === 0 ? '' : props.value?.HRA}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              HRA: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Spouse Allowance"
          type="number"
          value={props.value?.spouseAllowance === 0 ? '' : props.value?.spouseAllowance}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              spouseAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Positional Allowance"
          type="number"
          value={props.value?.positionalAllowance === 0 ? '' : props.value?.positionalAllowance}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              positionalAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Special Allowance"
          type="number"
          value={props.value?.specialAllowance === 0 ? '' : props.value?.specialAllowance}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              specialAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Miscellaneous Deduction"
          type="number"
          value={props.value?.impactDeduction === 0 ? '' : props.value?.impactDeduction}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              impactDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Tel Allowance"
          type="number"
          value={props.value?.telAllowance === 0 ? '' : props.value?.telAllowance}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              telAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="PION Missionary Fund"
          type="number"
          value={props.value?.PIONMissionaryFund === 0 ? '' : props.value?.PIONMissionaryFund}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              PIONMissionaryFund: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="MUT Deduction (Medical Insurance)"
          type="number"
          value={props.value?.MUTDeduction === 0 ? '' : props.value?.MUTDeduction}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              MUTDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
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
          value={(props.value?.impactDeduction ?? 0) + (props.value?.PIONMissionaryFund ?? 0) + (props.value?.MUTDeduction ?? 0)}
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
            (props.value?.telAllowance ?? 0) -
            ((props.value?.impactDeduction ?? 0) + (props.value?.PIONMissionaryFund ?? 0) + (props.value?.MUTDeduction ?? 0))
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
