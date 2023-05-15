import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import WorkerServices from './extras/WorkersServices';
import { LanguagesList } from '../../extras/CommonConfig';
const BasicDetails = () => {
  const { workersId } = useParams();

  // const [newWorkerBasicDetails, setWorkerBasicDetails] = useState<BasicDetails>();
  const [newWorkerBasicDetails, setWorkerBasicDetails] = useState<IETWorker>({
    _id: '',
    workerCode: '',
    firstName: '',
    lastName: '',
    missionaryOrNonMissionary: 'missionary',
    dob: moment(),
    gender: 'Female',
    age: 0,
    maritalStatus: 'Unmarried',
    highestQualification: '',
    motherToungue: '',
    communicationLanguage: '',
    languagesKnown: [],
    email: '',
    phone: '',
    alternativeMobileNumber: '',
    PANNo: 'string',
    aadhaar: { aadhaarFile: {
      _id: '',
      fileId: '',
      file_url: '',
    }, aadhaarNo: '467389' },

    voterId: { voterIdFile: {
      _id: '',
      fileId: '',
      file_url: '',
    }, voterIdNo: '467389' },
    licenseNumber: '',
    permanentAddress: {
      buildingName: '',
      streetAddress: '',
      city: '',
      district: '',
      state: '',
      country: '',
      pincode: '',
    },
    currentAddress: {
      buildingName: '',
      streetAddress: '',
      city: '',
      district: '',
      state: '',
      country: '',
      pincode: '',
    },
    createdAt: moment(),
    updatedAt: moment(),
  });
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
            <TextField
              label=" Worker Code"
              value={newWorkerBasicDetails?.workerCode}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  workerCode: e.target.value,
                }))
              } variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="First Name"
              value={newWorkerBasicDetails?.firstName}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  firstName: e.target.value,
                }))
              } variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              value={newWorkerBasicDetails?.gender}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  gender: e.target.value=='F'?'Female':e.target.value=='M'?'Male':'Other',
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="O" control={<Radio />} label="Other" />
            </RadioGroup>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Age"
              type="number"
              value={newWorkerBasicDetails?.age}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  age: Number(e.target.value) < 0 && Number(e.target.value)>120 ? 0 : Number(e.target.value),
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <FormLabel id="demo-radio-buttons-group-label">Marital Status</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="single"
              value={newWorkerBasicDetails?.maritalStatus}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  maritalStatus: e.target.value=='M'?'Married' : 'Unmarried',
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="U" control={<Radio />} label="Unmarried" />
              <FormControlLabel value="M" control={<Radio />} label="Married" />
            </RadioGroup>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Highest Qualification"
              value={newWorkerBasicDetails?.highestQualification}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  highestQualification: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Mother Tongue"
              value={newWorkerBasicDetails?.motherToungue}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  motherToungue: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Communication Language"
              value={newWorkerBasicDetails?.communicationLanguage}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  communicationLanguage: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <Autocomplete
              multiple
              id="languges"
              options={LanguagesList}
              getOptionLabel={(option) => option}
              onChange={(e, newvalue) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  languagesKnown: newvalue,
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Languages Known"
                />
              )}
            />

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Email-ID"
              value={newWorkerBasicDetails?.email}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  email: e.target.value,
                }))
              } variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Mobile No"
              value={newWorkerBasicDetails?.phone}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  phone: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Alternative Mobile No."
              value={newWorkerBasicDetails?.alternativeMobileNumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  alternativeMobileNumber: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="PAN Number"
              value={newWorkerBasicDetails?.PANNo}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  PANNo: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Aadhaar"
              type="file"
            // onChange={(e) => handleFileUpload(e.target.files)}
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Voter ID"
              type="file"
            // onChange={(e) => handleFileUpload(e.target.files)}
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="License Number"
              value={newWorkerBasicDetails?.licenseNumber}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  licenseNumber: e.target.value,
                }))
              }variant="outlined"
              fullWidth
            />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={6}>
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
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Spouse of another staff"
              value={newWorkerBasicDetails?.spouse}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  spouse: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid> */}
      </Grid>
    </form>
  );
};

export default BasicDetails;
