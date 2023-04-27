import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

const OfficialDetails = ({
  withCardContainer = {
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
    spouseOfAnotherStaff: '',

  },
}: {
  withCardContainer?: OfficialDetails;
}) => {
  const [newWorkerOfficialDetails, setWorkerOfficialDetails] = useState<OfficialDetails>({
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
    spouseOfAnotherStaff: '',

  });
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label=" Worker Code"
              value={withCardContainer?.workerCode}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.missionaryOrNonMissionary}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.firstName}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.secondName}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
                  secondName: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date Of Birth"
                // value={IROrelease?.transferredDate}
                // onChange={(e) =>
                // // eslint-disable-next-line @typescript-eslint/naming-convention
                //   setIROrelease((IROrelease: any) => ({
                //     ...IROrelease,
                //     transferredDate: e.target.value,
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
              value={withCardContainer?.gender}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.age}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              // defaultValue="single"
              value={withCardContainer?.maritalStatus}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.highestQualification}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.motherToungue}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.communicationLanguage}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.languagesKnown}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.emailId}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.mobileNumber}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.alternativeMobileNumber}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.PANnumber}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.licenseNumber}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddress}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddressCity}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddressDistrict}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddressState}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddressCountry}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.permanentAddressPincode}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddress}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddressCity}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddressDistrict}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddressState}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddressCountry}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.currentAddressPincode}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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
              value={withCardContainer?.spouseOfAnotherStaff}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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

export default OfficialDetails;
