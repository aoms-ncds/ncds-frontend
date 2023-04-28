import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import WorkerServices from './extras/WorkersServices';
const BasicDetails = () => {
  const { workersId } = useParams();

  // const [newWorkerBasicDetails, setWorkerBasicDetails] = useState<BasicDetails>();
  const [newWorkerBasicDetails, setWorkerBasicDetails] = useState<BasicDetails>({
    _id: '',
    workerCode: '',
    firstName: '',
    secondName: '',
    missionaryOrNonMissionary: 'missionary',
    dob: moment(),
    gender: 'female',
    age: '',
    maritalStatus: 'single',
    highestQualification: '',
    motherToungue: '',
    communicationLanguage: '',
    languagesKnown: '',
    emailId: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
    PANnumber: '',
    aadhaarNumber: '',
    voterId: '',
    licenseNumber: '',
    permanentAddress: '',
    permanentAddressCity: '',
    permanentAddressDistrict: '',
    permanentAddressState: '',
    permanentAddressCountry: '',
    permanentAddressPincode: '',
    currentAddress: '',
    currentAddressCity: '',
    currentAddressDistrict: '',
    currentAddressState: '',
    currentAddressCountry: '',
    currentAddressPincode: '',
    spouseOfAnotherStaff: '' });
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getBasicDetailsById(workersId).then((res) => {
        setWorkerBasicDetails(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
  }, []);
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label=" Worker Code"
              value={newWorkerBasicDetails?.workerCode}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  workerCode: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Field Missionary/ Non-Missionary</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="missionary"
              value={newWorkerBasicDetails?.missionaryOrNonMissionary}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  missionaryOrNonMissionary: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="missionary" control={<Radio />} label="Missionary" />
              <FormControlLabel value="nonMissionary" control={<Radio />} label="Non-Missionary" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="First Name"
              value={newWorkerBasicDetails?.firstName}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  firstName: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Last Name"
              // value={IROrelease?.releaseAmount}
              // onChange={(e) =>
              //   // eslint-disable-next-line @typescript-eslint/naming-convention
              //   setIROrelease((IROrelease) => ({
              //     ...IROrelease,
              //     releaseAmount: e.target.value,
              //   }))
              // }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date Of Birth"
                // value={newWorkerBasicDetails?.workerCode}
                // onChange={(e) =>
                //   setWorkerBasicDetails((newWorkerBasicDetails) => ({
                //     ...newWorkerBasicDetails,
                //     workerCode: e.target.value,
                //   }))
                // }
              />

            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              value={newWorkerBasicDetails?.gender}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  gender: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Age"
              value={newWorkerBasicDetails?.age}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  age: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Marital Status</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="single"
              value={newWorkerBasicDetails?.maritalStatus}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  maritalStatus: e.target.value,
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Highest Qualification"
              value={newWorkerBasicDetails?.highestQualification}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  highestQualification: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Mother Tongue"
              value={newWorkerBasicDetails?.motherToungue}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  motherToungue: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Communication Language"
              value={newWorkerBasicDetails?.communicationLanguage}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  communicationLanguage: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Languages Known"
              value={newWorkerBasicDetails?.languagesKnown}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  languagesKnown: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Email-ID"
              value={newWorkerBasicDetails?.emailId}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  emailId: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Mobile No"
              value={newWorkerBasicDetails?.mobileNumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  mobileNumber: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Alternative Mobile No."
              value={newWorkerBasicDetails?.alternativeMobileNumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  alternativeMobileNumber: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="PAN Number"
              value={newWorkerBasicDetails?.PANnumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  PANnumber: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="standard" fullWidth>
            <TextField
              label="Aadhaar"
              type="file"
            // onChange={(e) => handleFileUpload(e.target.files)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="standard" fullWidth>
            <TextField
              label="Voter ID"
              type="file"
            // onChange={(e) => handleFileUpload(e.target.files)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="License Number"
              value={newWorkerBasicDetails?.licenseNumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  licenseNumber: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Permanent Address"
              value={newWorkerBasicDetails?.permanentAddress}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddress: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="City"
              value={newWorkerBasicDetails?.permanentAddressCity}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddressCity: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="District"
              value={newWorkerBasicDetails?.permanentAddressDistrict}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddressDistrict: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="State"
              value={newWorkerBasicDetails?.permanentAddressState}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddressState: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Country"
              value={newWorkerBasicDetails?.permanentAddressCountry}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddressCountry: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Pincode"
              value={newWorkerBasicDetails?.permanentAddressPincode}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  permanentAddressPincode: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Current Address"
              value={newWorkerBasicDetails?.currentAddress}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddress: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="City"
              value={newWorkerBasicDetails?.currentAddressCity}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddressCity: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="District"
              value={newWorkerBasicDetails?.currentAddressDistrict}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddressDistrict: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="State"
              value={newWorkerBasicDetails?.currentAddressState}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddressState: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Country"
              value={newWorkerBasicDetails?.currentAddressCountry}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddressCountry: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Pincode"
              value={newWorkerBasicDetails?.currentAddressPincode}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  currentAddressPincode: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Spouse of another staff"
              value={newWorkerBasicDetails?.spouseOfAnotherStaff}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  spouseOfAnotherStaff: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default BasicDetails;
