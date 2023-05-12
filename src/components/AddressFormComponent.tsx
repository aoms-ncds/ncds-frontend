import { Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const AddressFormComponent = (props: FormComponentProps<Address>) => {
  return (
    <>
      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">{props.title}</Divider>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Building Name/No."
          value={props.value.buildingName}
          onChange={(e) =>
            props.onChange({ ...props.value, buildingName: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Street"
          variant="outlined"
          value={props.value.streetAddress}
          onChange={(e) =>
            props.onChange({ ...props.value, streetAddress: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="City"
          variant="outlined"
          value={props.value.city}
          onChange={(e) =>
            props.onChange({ ...props.value, city: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="State"
          variant="outlined"
          value={props.value.state}
          onChange={(e) =>
            props.onChange({ ...props.value, state: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Country"
          value={props.value.country}
          onChange={(e) =>
            props.onChange({ ...props.value, country: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          variant="outlined"
          label="Pin Code"
          value={props.value.pincode}
          onChange={(e) =>
            props.onChange({ ...props.value, pincode: e.target.value })
          }
          fullWidth
          // multiline
        />
      </Grid>
    </>
  );
};

export default AddressFormComponent;
