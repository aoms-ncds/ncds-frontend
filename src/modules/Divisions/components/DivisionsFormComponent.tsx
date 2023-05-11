/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, FormControl, Grid, TextField, Typography } from '@mui/material';
import moment from 'moment';
import HRServices from '../../HR/extras/HRServices';
import { StaffDropdown } from '../../HR/components/StaffDropdown';

const DivisionsFormComponent = ({
  division = {
    divisionName: 'Division 1',
    _id: '1',
    divisionId: '233',
    contactNumber: '89000333',
    email: 'division@gmail.com',
    address: {
      buildingName: '',
      streetAddress: '',
      city: '',
      district: '',
      state: '',
      country: '',
      pincode: '',
    },
    noofWorkers: 5,
    noOfSubdivisions: 5,
    noOfChurches: 5,
    coordinator: {
      _id: '1',
      firstName: 'athira',
      lastName: 'athira',
      dob: moment('12-11-2000'),
      doj: moment('12-11-2000'),
      designation: {
        _id: '1',
        name: 'TL',
        createdAt: moment(),
        updatedAt: moment(),
      },
      department: {
        _id: '1',
        name: 'IT',
        createdAt: moment(),
        updatedAt: moment(),
      },
      age: 25,
      gender: 'Female',
      phone: '123476798',
      email: 'test@gmail.com',
      formattedId: 'test',
      createdAt: moment(),
      updatedAt: moment(),
    },
    seniorLeader: {
      _id: '1',
      firstName: 'athira',
      lastName: 'athira',
      dob: moment('12-11-2000'),
      doj: moment('12-11-2000'),
      designation: {
        _id: '1',
        name: 'TL',
        createdAt: moment(),
        updatedAt: moment(),
      },
      department: {
        _id: '1',
        name: 'IT',
        createdAt: moment(),
        updatedAt: moment(),
      },
      age: 25,
      gender: 'Female',
      phone: '123476798',
      email: 'test@gmail.com',
      formattedId: 'test',
      createdAt: moment(),
      updatedAt: moment(),
    },
    juniorLeader: {
      _id: '1',
      firstName: 'athira',
      lastName: 'athira',
      dob: moment('12-11-2000'),
      doj: moment('12-11-2000'),
      designation: {
        _id: '1',
        name: 'TL',
        createdAt: moment(),
        updatedAt: moment(),
      },
      department: {
        _id: '1',
        name: 'IT',
        createdAt: moment(),
        updatedAt: moment(),
      },
      age: 25,
      gender: 'Female',
      phone: '123476798',
      email: 'test@gmail.com',
      formattedId: 'test',
      createdAt: moment(),
      updatedAt: moment(),
    },
  },
}: {
  division?: IETDivisions;
}) => {
  const [newDivision, setNewDivision] = useState<IETDivisions>(
    division || {
      divisionName: '',
      _id: '',
      divisionId: '',
      contactNumber: '',
      email: '',
      address: {
        buildingName: '',
        streetAddress: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
      },
      noofWorkers: 0,
      noOfSubdivisions: 0,
      noOfChurches: 0,

      coordinator: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(),
        doj: moment(),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      },
      seniorLeader: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(),
        doj: moment(),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      },
      juniorLeader: {
        _id: '',
        firstName: '',
        lastName: '',
        dob: moment(),
        doj: moment(),
        designation: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        department: {
          _id: '',
          name: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
        age: 0,
        gender: 'Female',
        phone: '',
        email: '',
        formattedId: '',
        createdAt: moment(),
        updatedAt: moment(),
      }
      ,
    },
  );
  const [staffs, setStaffs] = useState<Staff[]>();


  useEffect(() => {
    HRServices.getStaffs()
    .then((res) => {
      // console.log(res);
      setStaffs(res.data);
    });
  }, []);

  return (

    <form>

      <Grid container spacing={12}>

        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4" >Division Details</Typography>
          <br/>

          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Name"
                  value={newDivision.divisionName || division?.divisionName}
                  onChange={(e) =>
                    setNewDivision((newIETDivisions) => ({
                      ...newIETDivisions,
                      divisionName: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Id"
                  value={newDivision.divisionId || division?.divisionId}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      divisionId: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={newDivision.contactNumber || division?.contactNumber}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      contactNumber: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  value={newDivision.email || division?.email}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      email: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Address"
                  value={newDivision.address || division?.address}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      address: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Workers"
                  value={newDivision.noofWorkers || division?.noofWorkers}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      noofWorkers: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Sub Divisions"
                  type='number'
                  value={newDivision.noOfSubdivisions || division?.noOfSubdivisions}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      NoOfSubdivisions: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Churches"
                  value={newDivision.noOfChurches || division?.noOfChurches}
                  onChange={(e) =>
                    setNewDivision((newDivision) => ({
                      ...newDivision,
                      noOfChurches: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>


          </Grid>

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4">Leaders Details</Typography>
          <br/>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <StaffDropdown
                  value={newDivision.coordinator}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewDivision((newDivision) => ({
                        ...newDivision,
                        coordinator: newValue,
                      }));
                    }
                  }}
                  label={' Co-ordinator Name'} />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={newDivision.coordinator?.phone || division?.coordinator?.phone}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  value={newDivision.coordinator?.email || division?.coordinator?.email}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <StaffDropdown
                  value={newDivision.seniorLeader}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewDivision((newDivision) => ({
                        ...newDivision,
                        seniorLeader: newValue,
                      }));
                    }
                  }} label={'Senior Leader Name'} />


              </FormControl>
            </Grid>
            {/*
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={newDivision.seniorLeader?newDivision.seniorLeader.phone:'' || division?.seniorLeader?division.seniorLeader.phone:''}

                  disabled fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={newDivision.seniorLeader?.email || division?.seniorLeader?.email}
                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <StaffDropdown
                  value={ newDivision.juniorLeader}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setNewDivision((newDivision) => ({
                        ...newDivision,
                        juniorLeader: newValue,
                      }));
                    }
                  }} label={'Junior Leader Name'} />
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={newDivision.juniorLeader?.phone || division?.juniorLeader?.phone}

                  disabled fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={newDivision.juniorLeader?.email || division?.juniorLeader?.email}

                  disabled
                  fullWidth
                />
              </FormControl>
            </Grid> */}


          </Grid>

        </Grid>

      </Grid>

    </form>

  );
};

export default DivisionsFormComponent;
