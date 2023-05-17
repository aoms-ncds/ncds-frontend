import {
  Grid,
  FormControl,
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import WorkerServices from './extras/WorkersServices';

const OfficialDetails = () => {
  const { workersId } = useParams();
  // const [newWorkerBasicDetails, setWorkerBasicDetails] = useState<BasicDetails>();
  const [newWorkerOfficialDetails, setWorkerOfficialDetails] =
    useState<IETWorker>({
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
      languagesKnown: '',
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
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getOfficialDetailsById(workersId)
        .then((res) => {
          setWorkerOfficialDetails(res.data);
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
          <TextField
            label=" Worker Code"
            value={newWorkerOfficialDetails?.workerCode}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                workerCode: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            Field Missionary/ Non-Missionary
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="missionary"
            value={newWorkerOfficialDetails?.missionaryOrNonMissionary}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="First Name"
            value={newWorkerOfficialDetails?.firstName}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                firstName: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Last Name"
            value={newWorkerOfficialDetails?.lastName}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                lastName: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Of Birth"
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="female"
            value={newWorkerOfficialDetails?.gender}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Age"
            type="number"
            value={newWorkerOfficialDetails?.age}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                age:
                  Number(e.target.value) < 0 && Number(e.target.value) > 120 ?
                    0 :
                    Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="single"
            value={newWorkerOfficialDetails?.maritalStatus}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                maritalStatus: e.target.value == 'M' ? 'Married' : 'Unmarried',
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
            value={newWorkerOfficialDetails?.highestQualification}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                highestQualification: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Mother Tongue"
            value={newWorkerOfficialDetails?.motherToungue}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                motherToungue: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Communication Language"
            value={newWorkerOfficialDetails?.communicationLanguage}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                communicationLanguage: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Languages Known"
            value={newWorkerOfficialDetails?.languagesKnown}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                languagesKnown: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Email-ID"
            value={newWorkerOfficialDetails?.email}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                email: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Mobile No"
            value={newWorkerOfficialDetails?.phone}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                phone: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Alternative Mobile No."
            value={newWorkerOfficialDetails?.alternativeMobileNumber}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                alternativeMobileNumber: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="PAN Number"
            value={newWorkerOfficialDetails?.PANNo}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                PANNo: e.target.value,
              }))
            }
            variant="outlined"
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
            value={newWorkerOfficialDetails?.licenseNumber}
            onChange={(e) =>
              setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                ...newWorkerOfficialDetails,
                licenseNumber: e.target.value,
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="Permanent Address"
              value={newWorkerOfficialDetails?.permanentAddress}
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
              value={newWorkerOfficialDetails?.permanentAddressCity}
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
              value={newWorkerOfficialDetails?.permanentAddressDistrict}
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
              value={newWorkerOfficialDetails?.permanentAddressState}
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
              value={newWorkerOfficialDetails?.permanentAddressCountry}
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
              value={newWorkerOfficialDetails?.permanentAddressPincode}
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
              value={newWorkerOfficialDetails?.currentAddress}
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
              value={newWorkerOfficialDetails?.currentAddressCity}
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
              value={newWorkerOfficialDetails?.currentAddressDistrict}
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
              value={newWorkerOfficialDetails?.currentAddressState}
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
              value={newWorkerOfficialDetails?.currentAddressCountry}
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
              value={newWorkerOfficialDetails?.currentAddressPincode}
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
              value={newWorkerOfficialDetails?.spouse}
              onChange={(e) =>
                setWorkerOfficialDetails((newWorkerOfficialDetails) => ({
                  ...newWorkerOfficialDetails,
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

export default OfficialDetails;
