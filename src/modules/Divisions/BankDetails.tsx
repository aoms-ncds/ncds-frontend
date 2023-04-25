import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const BankDetailsPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <form>
      <Grid container spacing={12}>

        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4" >Add FCRA  Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Bank Name"
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
                  label=" Branch Name"
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
                  label="Account Number"
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
                  label="IFSC Code"
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
                  label="Beneficiary"
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
          <Typography variant="h4" component="h4">Add Local Bank Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Bank Name"
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
                  label=" Branch Name"
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
                  label="Account Number"
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
                  label="IFSC Code"
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
                  label="Beneficiary"
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

export default BankDetailsPage;
