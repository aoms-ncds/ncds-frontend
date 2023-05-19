/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import moment from 'moment';
import StaffDropdown from '../../HR/components/StaffDropdown';
import AddressForm from '../../../components/AddressForm';
const DivisionsFormComponent = (props: FormComponentProps<IETDivisions, {title:string}>) => {
  const [divisionDetails, setNewDivision] = useState<IETDivisions>(
    props.value ??{
      divisionName: '',
      divisionId: '',
      contactNumber: '',
      email: '',
      address: {
        buildingName: '',
        street: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
      },
    },
  );


  // useEffect(() => {
  //   HRServices.getStaffs()
  //   .then((res) => {
  //     // console.log(res);
  //     setStaffs(res.data);
  //   });
  // }, []);

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
            value={ props.value.divisionName }
            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  divisionName: e.target.value,
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })

            }
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Division Id"
            value={props.value.divisionId}

            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  divisionId: e.target.value,
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })
            }
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Contact Number"
            value={props.value.contactNumber}

            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  contactNumber: e.target.value,
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })
            }
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Email ID"
            value={props.value.email}
            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  email: e.target.value,
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })

            }
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
            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  noofWorkers: Number(e.target.value),
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })
            }
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
            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  noOfSubdivisions: Number(e.target.value),
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })
            }
            fullWidth InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Churches"
            value={ props.value.noOfChurches}
            onChange={(e) =>
              setNewDivision((divisionDetails) => {
                const newDivision = {
                  ...divisionDetails,
                  noOfChurches: Number(e.target.value),
                };
                props.onChange(newDivision); // Call the onChange prop with the updated division details
                return newDivision;
              })
            }
            fullWidth InputLabelProps={{ shrink: true }}
          />
        </FormControl>


      </Grid>
      <AddressForm value={props.value.address}
        onChange={(newState: Address) => setNewDivision((divisionDetails) => ({
          ...divisionDetails,
          address: newState,
        }))
        } action={'add'} />


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
                setNewDivision((divisionDetails) => {
                  const newDivision = {
                    ...divisionDetails,
                    coordinator: newValue,
                  };
                  props.onChange(newDivision); // Call the onChange prop with the updated division details
                  return newDivision;
                });
              }
            }}
            label={' Co-ordinator Name'} />
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={divisionDetails.coordinator?.phone || division?.coordinator?.phone}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  value={divisionDetails.coordinator?.email || division?.coordinator?.email}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.seniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                setNewDivision((divisionDetails) => {
                  const newDivision = {
                    ...divisionDetails,
                    seniorLeader: newValue,
                  };
                  props.onChange(newDivision); // Call the onChange prop with the updated division details
                  return newDivision;
                });
              }
            }} label={'Senior Leader Name'} />


        </FormControl>
      </Grid>
      {/*
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={divisionDetails.seniorLeader?divisionDetails.seniorLeader.phone:'' || division?.seniorLeader?division.seniorLeader.phone:''}

                  disabled fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={divisionDetails.seniorLeader?.email || division?.seniorLeader?.email}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={ props.value.juniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                setNewDivision((divisionDetails) => {
                  const newDivision = {
                    ...divisionDetails,
                    juniorLeader: newValue,
                  };
                  props.onChange(newDivision); // Call the onChange prop with the updated division details
                  return newDivision;
                });
              }
            }} label={'Junior Leader Name'} />
        </FormControl>
      </Grid>

      {/* <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={divisionDetails.juniorLeader?.phone || division?.juniorLeader?.phone}

                  disabled fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={divisionDetails.juniorLeader?.email || division?.juniorLeader?.email}

                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}
    </>


  );
};

export default DivisionsFormComponent;
