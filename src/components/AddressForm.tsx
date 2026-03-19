import { Divider, Grid, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';

const AddressForm = (
  props: FormComponentProps<
    Address,
    {
      title?: string;
      sameAsAddress?: {
        address: Address;
        addressTitle: string;
        isSame: (isSame: boolean) => void;
      };
    }
  >,
) => {
  const [isChecked, setisChecked] = useState<boolean>(false);
  return (
    <>
      <Grid item xs={props.options?.sameAsAddress?.address ? 6 : 12}>
        <br />
        <Divider textAlign="left">{props.options?.title ?? 'Address'}</Divider>
      </Grid>

      {props.options?.sameAsAddress?.address && (
        <Grid item xs={6}>
          <br />
          <Divider textAlign="right">
            {props.options?.sameAsAddress?.address && (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      props.options?.sameAsAddress?.isSame(e.target.checked);
                      setisChecked(e.target.checked);
                      if (e.target.checked) {
                        props.onChange(props.options?.sameAsAddress?.address ?? props.value);
                      }
                    }}
                    disabled={props.action=='view'}
                  />
                }
                label={`Same as ${props.options?.sameAsAddress?.addressTitle}`}
              />
            )}
          </Divider>
        </Grid>
      )}

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Building Name/No."
          value={props.value.buildingName}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  buildingName: e.target.value,
                } :
                {
                  ...props.value,
                  buildingName: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Street"
          variant="outlined"
          value={props.value.street}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  street: e.target.value,
                } :
                {
                  ...props.value,
                  street: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="City"
          variant="outlined"
          value={props.value.city}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  city: e.target.value,
                } :
                {
                  ...props.value,
                  city: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="State"
          variant="outlined"
          value={props.value.state}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  state: e.target.value,
                } :
                {
                  ...props.value,
                  state: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Country"
          value={props.value.country}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  country: e.target.value,
                } :
                {
                  ...props.value,
                  country: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Pin Code"
          value={props.value.pincode}
          onChange={(e) =>
            props.onChange(
              isChecked ?
                {
                  ...props.options?.sameAsAddress?.address,
                  pincode: e.target.value,
                } :
                {
                  ...props.value,
                  pincode: e.target.value,
                },
            )
          }
          fullWidth
          disabled={props.action=='view'}
          // multiline
        />
      </Grid>
    </>
  );
};

export default AddressForm;
