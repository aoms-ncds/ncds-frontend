import { Grid, TextField } from '@mui/material';
import React from 'react';

const NewUserSupportStructureForm = (props: FormComponentProps<CreatableNewUserSupportStructure, {
    textField: {variant: 'filled' | 'outlined' | 'standard'};
  }>) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          label="Basic"
          type="number"
          value={props.value.basic}
          onChange={(e) => props.onChange({
            ...props.value,
            basic: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="HRA"
          type="number"
          value={props.value.HRA}
          onChange={(e) => props.onChange({
            ...props.value,
            HRA: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Spouse allowance"
          type="number"
          value={props.value.specialAllowance}
          onChange={(e) => props.onChange({
            ...props.value,
            specialAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Positional allowance"
          type="number"
          value={props.value.positionalAllowance}
          onChange={(e) => props.onChange({
            ...props.value,
            positionalAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Special allowance"
          type="number"
          value={props.value.specialAllowance}
          onChange={(e) => props.onChange({
            ...props.value,
            specialAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Impact deduction"
          type="number"
          value={props.value.impactDeduction}
          onChange={(e) => props.onChange({
            ...props.value,
            impactDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Tel allowance"
          type="number"
          value={props.value.telAllowance}
          onChange={(e) => props.onChange({
            ...props.value,
            telAllowance: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="PISON Missionary fund"
          type="number"
          value={props.value.PIONMissionaryFund}
          onChange={(e) => props.onChange({
            ...props.value,
            PIONMissionaryFund: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="MUT Deduction (Medical Insurance)"
          type="number"
          value={props.value.MUTDeduction}
          onChange={(e) => props.onChange({
            ...props.value,
            MUTDeduction: Number.isNaN(e.target.value) ? 0 : Number(e.target.value),
          })}
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default NewUserSupportStructureForm;
