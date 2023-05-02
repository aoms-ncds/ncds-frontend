import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete, Box } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import WorkerServices from './extras/WorkersServices';
const SupportDetails = ({
  withCardContainer = {
    _id: '',
    currentDesignation: {
      _id: '',
      name: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
    totalNoYearsInMinistry: 0,
    typeOfFamily: 'singleMissionary',
    typeofChurch: 'withChurch',
    selfSupport: 'yes',

  },
}: {
  withCardContainer?: SupportDetails;
}) => {
  const [designations, setDesignations] = useState<Designation[] | undefined>();
  const [newWorkerSupportDetails, setWorkerSupportDetails] = useState<SupportDetails>({
    _id: '',
    currentDesignation: {
      _id: 'sdjkfsdj',
      name: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
    totalNoYearsInMinistry: 0,
    typeOfFamily: 'singleMissionary',
    typeofChurch: 'withChurch',
    selfSupport: 'yes',

  });
  useEffect(() => {
    WorkerServices.getDesignations()
    .then((res) => {
      setDesignations(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>

          <FormControl variant="outlined" fullWidth>
            <Autocomplete
              id="Current Designation"
              // sx={{ width: 300 }}
              value={withCardContainer?.currentDesignation}
              options={designations ?? []}
              // multiple
              // filterOptions={members}
              fullWidth
              getOptionLabel={(designation) => designation.name}
              // value={value}
              // getOptionLabel={function (user: User) {
              //   return user.firstName + user.lastName;
              // }}
              onChange={(e, newValue) => {
                if (newValue) {
                  setWorkerSupportDetails((newWorkerSupportDetails) => ({
                    ...newWorkerSupportDetails,
                    currentDesignation: newValue,
                  }));
                }
              }}
              renderOption={(props, designation, { selected }) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {designation.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Current Designation"
                  required
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Total No. Years in Ministry"
              value={withCardContainer?.totalNoYearsInMinistry}
              // onChange={(e) =>
              //   // eslint-disable-next-line @typescript-eslint/naming-convention
              //   setWorkerSupportDetails((newWorkerSupportDetails) => ({
              //     ...newWorkerSupportDetails,
              //     totalNoYearsInMinistry: e.target.value,
              //   }))
              // }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Type Of Family</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="singleMissionary"
              value={withCardContainer?.typeOfFamily}
              onChange={(e) =>
                setWorkerSupportDetails((newWorkerSupportDetails) => ({
                  ...newWorkerSupportDetails,
                  typeOfFamily: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="singleMissionary" control={<Radio />} label="Single Missionary" />
              <FormControlLabel value="familyMissionary" control={<Radio />} label="Family Missionary" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Type Of Church</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="withChurch"
              value={withCardContainer?.typeofChurch}
              onChange={(e) =>
                setWorkerSupportDetails((newWorkerSupportDetails) => ({
                  ...newWorkerSupportDetails,
                  typeofChurch: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="withChurch" control={<Radio />} label="With Church" />
              <FormControlLabel value="withoutChurch" control={<Radio />} label="Without Church" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Self-Support</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="yes"
              value={withCardContainer?.selfSupport}
              onChange={(e) =>
                setWorkerSupportDetails((newWorkerSupportDetails) => ({
                  ...newWorkerSupportDetails,
                  selfSupport: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default SupportDetails;
