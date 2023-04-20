import { Card, Container, CardContent, Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddNewWorker = () => {
  return (
    <CommonPageLayout title='Add New Worker Page'>
      <Card style={{ width: '100%' }}>
      </Card>
      <Container>
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    label=" Worker Code"
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
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Field Missionary/ Non-Missionary</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="missionary"
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
                    defaultValue="female"
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
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Marital Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="single"
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
                  <TextField
                    label="Mother Tongue"
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
                  <TextField
                    label="Communication Language"
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
                  <TextField
                    label="Languages Known"
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
                  <TextField
                    label="Email-ID"
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
                  <TextField
                    label="Mobile No"
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
                  <TextField
                    label="Alternative Mobile No."
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
                  <TextField
                    label="PAN Number"
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
                  <TextField
                    label="Permanent Address"
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
                  <TextField
                    label="City"
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
                  <TextField
                    label="District"
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
                  <TextField
                    label="State"
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
                  <TextField
                    label="Country"
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
                  <TextField
                    label="Pincode"
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
                  <TextField
                    label="Current Address"
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
                  <TextField
                    label="City"
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
                  <TextField
                    label="District"
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
                  <TextField
                    label="State"
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
                  <TextField
                    label="Country"
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
                  <TextField
                    label="Pincode"
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
                  <TextField
                    label="Spouse of another staff"
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
            </Grid>
          </form>
        </CardContent>
      </Container>
    </CommonPageLayout>
  );
};

export default AddNewWorker;
