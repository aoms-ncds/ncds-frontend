import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WorkerServices from './extras/WorkersServices';
import { useParams } from 'react-router-dom';
const SupportDetails = () => {
  const { workersId } = useParams();
  const [Designation, setDesignation] = useState<Designation[] | undefined>();
  const [newWorkerSupportDetails, setWorkerSupportDetails] = useState<SupportDetails>({
    _id: '',
    currentDesignation: { name: '' },
    totalNoYearsInMinistry: 0,
    typeOfFamily: 'singleMissionary',
    typeofChurch: 'withChurch',
    selfSupport: 'yes' });
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getSupportDetailsById(workersId).then((res) => {
        setWorkerSupportDetails(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
    WorkerServices.getDesignation()
    .then((res) => {
      setDesignation(res.data);
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
              value={newWorkerSupportDetails?.currentDesignation}
              options={Designation ?? []}
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
              value={newWorkerSupportDetails?.totalNoYearsInMinistry}
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
              value={newWorkerSupportDetails?.typeOfFamily}
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
              value={newWorkerSupportDetails?.typeofChurch}
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
              value={newWorkerSupportDetails?.selfSupport}
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
