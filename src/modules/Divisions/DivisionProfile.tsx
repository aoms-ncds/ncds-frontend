/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';

const DivisionProfilePage = () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <form>
      <Grid container spacing={12}>

        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4" >Division Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Name"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Id"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Address"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Workers"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Sub Divisions"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Churches"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>


          </Grid>

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4">Leaders Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Co-ordinator Name"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Senior Leader Name"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Junior Leader Name"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  //   value={newWorkerBasicDetails?.workerCode}
                  //   onChange={(e) =>
                  //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
                  //       ...newWorkerBasicDetails,
                  //       workerCode: e.target.value,
                  //     }))
                  //   }
                  fullWidth
                />
              </FormControl>
            </Grid>


          </Grid>

        </Grid>

      </Grid>
    </form>

  );
};

export default DivisionProfilePage;
