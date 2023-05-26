/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import moment from 'moment';
import StaffDropdown from '../../HR/components/StaffDropdown';
import AddressForm from '../../../components/AddressForm';


const DivisionsFormComponent = (props: FormComponentProps<DivisionDetails, {title:string}>) => {
  return (
    <>


      <Grid item xs={12} >
        <Typography variant="h4" component="h4" >Division Details</Typography>
        <br/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label="Division Name"
            value={ props.value.name }
            onChange={(e) =>props.onChange({ ...props.value, name: e.target.value })}
            fullWidth
            required
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Division Id"
            value={props.value.divisionId}
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Contact Number"
            value={props.value.contactNumber}

            onChange={(e) =>props.onChange({ ...props.value, contactNumber: e.target.value })}
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Email ID"
            value={props.value.email}
            onChange={(e) =>props.onChange({ ...props.value, email: e.target.value })}
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Workers"
            type='number'
            value={props.value.noofWorkers}
            onChange={(e) =>props.onChange({ ...props.value, noofWorkers: Number(e.target.value) })}
            fullWidth InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Sub Divisions"
            type='number'
            value={props.value.noOfSubdivisions}
            onChange={(e) =>props.onChange({ ...props.value, noOfSubdivisions: Number(e.target.value) })}
            fullWidth InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Churches"
            value={ props.value.noOfChurches}
            onChange={(e) => props.onChange({ ...props.value, noOfChurches: Number(e.target.value) })
            }
            fullWidth InputLabelProps={{ shrink: true }}
          />
        </FormControl>


      </Grid>
      <AddressForm
        value={props.value.address}
        onChange={(newState: Address) => props.onChange({ ...props.value, address: newState })}
        action={'add'} />


      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Leaders Details
        </Divider>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.coordinator}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, coordinator: newValue });
              }
            }}
            label={' Co-ordinator Name'}
            required={false}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.seniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, seniorLeader: newValue });
              }
            }} label={'Senior Leader Name'}
            required={false}
          />


        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={ props.value.juniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, juniorLeader: newValue });
              }
            }} label={'Junior Leader Name'}
            required={false}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default DivisionsFormComponent;
