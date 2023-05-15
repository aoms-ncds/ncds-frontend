import {
  Grid,
  FormControl,
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Checkbox,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import WorkerServices from './extras/WorkersServices';
import { LanguagesList } from '../../extras/CommonConfig';
import AddressFormComponent from '../../components/AddressFormComponent';
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
    aadhaar: {
      aadhaarFile: {
        _id: '',
        fileId: '',
        file_url: '',
      },
      aadhaarNo: '467389',
    },

    voterId: {
      voterIdFile: {
        _id: '',
        fileId: '',
        file_url: '',
      },
      voterIdNo: '467389',
    },
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

  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getBasicDetailsById(workersId)
        .then((res) => {
          setWorkerBasicDetails(res.data);
        })
        .catch((res) => {
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
            <FormLabel id="demo-radio-buttons-group-label">
              Field Missionary/ Non-Missionary
            </FormLabel>
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
              <FormControlLabel
                value="missionary"
                control={<Radio />}
                label="Missionary"
              />
              <FormControlLabel
                value="nonMissionary"
                control={<Radio />}
                label="Non-Missionary"
              />
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
              <DatePicker
                label="Date Of Birth"
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
                  gender:
                    e.target.value == 'F' ?
                      'Female' :
                      e.target.value == 'M' ?
                        'Male' :
                        'Other',
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="O" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Age"
              type="number"
              value={newWorkerBasicDetails?.age}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  age:
                    Number(e.target.value) < 0 && Number(e.target.value) > 120 ?
                      0 :
                      Number(e.target.value),
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Marital Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="single"
              value={newWorkerBasicDetails?.maritalStatus}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  maritalStatus:
                    e.target.value == 'M' ? 'Married' : 'Unmarried',
                }))
              }
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="U"
                control={<Radio />}
                label="Unmarried"
              />
              <FormControlLabel value="M" control={<Radio />} label="Married" />
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
                <TextField {...params} label="Languages Known" />
              )}
            />

          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Email-ID"
              value={newWorkerBasicDetails?.email}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  email: e.target.value,
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
              value={newWorkerBasicDetails?.phone}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  phone: e.target.value,
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
              value={newWorkerBasicDetails?.PANNo}
              onChange={(e) =>
                setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  ...newWorkerBasicDetails,
                  PANNo: e.target.value,
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
        <Grid item xs={6}></Grid>

        <AddressFormComponent
          value={newWorkerBasicDetails.currentAddress}
          onChange={(newState: Address) => {
            setWorkerBasicDetails((newWorkerBasicDetails) => ({
              ...newWorkerBasicDetails,
              currentAddress: newState,
            }));
            isSameAddress ?
              setWorkerBasicDetails((newWorkerBasicDetails) => ({
                ...newWorkerBasicDetails,
                permanentAddress: newState,
              })) :
              '';
          }}
          action={'add'}
          options={{
            title: 'Current Address',
          }}
        />
        {/* <Grid item xs={12}>
          <FormControlLabel
            sx={{
              marginTop: 5,
              float: "right",
              justifyContent: "flex-end",
              marginBottom: 0,
            }}
            control={
              <Checkbox
                onChange={(e) => {
                  setIsSameAddress(e.target.checked);
                  if (e.target.checked) {
                    setWorkerBasicDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      permanentAddress: newWorkerBasicDetails.currentAddress,
                    }));
                  }
                }}
              />
            }
            label="Same as Current Address"
          />
        </Grid> */}

        <AddressFormComponent
          value={newWorkerBasicDetails.permanentAddress}
          onChange={(newState: Address) => {
            setWorkerBasicDetails((newWorkerBasicDetails) => ({
              ...newWorkerBasicDetails,
              permanentAddress: newState,
            }));
          }}
          action={'add'}
          options={{
            title: 'Permanent Address',
            sameAsAddress: {
              address: newWorkerBasicDetails.currentAddress,
              addressTitle: 'Current Address',
              isSame: (isSameAddress) => {
                setIsSameAddress(isSameAddress);
              },
            },
          }}
        />
      </Grid>
    </form>
  );
};

export default BasicDetails;
