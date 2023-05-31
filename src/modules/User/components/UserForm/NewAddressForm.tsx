import { Checkbox, Divider, FormControlLabel, Grid, TextField } from '@mui/material';
import React from 'react';

const NewAddressForm = (
  props: FormComponentProps<
    Address,
    {
      title: string;
      textField: { variant: 'filled' | 'outlined' | 'standard' };
      copyAddressCheckBox?: {
        label: string;
        onChange: (checked: boolean) => void;
      };
    }
  >
) => {
  return (
    <>
      <Grid item xs={props.options?.copyAddressCheckBox !== undefined ? 6 : 12}>
        <Divider sx={{ mt: '10px' }} textAlign="left">
          {props.options?.title ?? 'Address'}
        </Divider>
      </Grid>
      {props.options?.copyAddressCheckBox !== undefined && (
        <Grid item xs={6}>
          <Divider textAlign="left">
            {props.options?.copyAddressCheckBox !== undefined && (
              <FormControlLabel control={<Checkbox onChange={(e) => props.options?.copyAddressCheckBox?.onChange(e.target.checked)} />} label={props.options.copyAddressCheckBox.label} />
            )}
          </Divider>
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Building Name"
          value={props.value.buildingName}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              buildingName: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Street"
          value={props.value.street}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              street: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="City"
          value={props.value.city}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              city: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="State"
          value={props.value.state}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              state: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Country"
          value={props.value.country}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              country: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Pin Code"
          value={props.value.pincode}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              pincode: e.target.value,
            })
          }
          variant={props.options?.textField.variant}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default NewAddressForm;
