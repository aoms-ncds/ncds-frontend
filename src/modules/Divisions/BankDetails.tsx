import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const BankDetailsPage = ({
  withCardContainer = {
    FCRABankname: '',
    FCRABranchname: '',
    FCRAAccountNumber: '',
    FCRAIFSCCode: '',
    FCRABeneficiary: '',
    localBankname: '',
    localBranchname: '',
    localAccountNumber: '',
    localIFSCCode: '',
    localBeneficiary: '',
  },
}: {
  withCardContainer?: BankDetails;
}) => {
  const [newDivisionBankDetails, setNewDivisionBankDetails] = useState<BankDetails>(withCardContainer ||{
    FCRABankname: '',
    FCRABranchname: '',
    FCRAAccountNumber: '',
    FCRAIFSCCode: '',
    FCRABeneficiary: '',
    localBankname: '',
    localBranchname: '',
    localAccountNumber: '',
    localIFSCCode: '',
    localBeneficiary: '',
  });
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
                  value={newDivisionBankDetails.FCRABankname || withCardContainer?.FCRABankname}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      FCRABankname: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Branch Name"
                  value={newDivisionBankDetails.FCRABranchname || withCardContainer?.FCRABranchname}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      FCRABranchname: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Account Number"
                  value={newDivisionBankDetails.FCRAAccountNumber || withCardContainer?.FCRAAccountNumber}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      FCRAAccountNumber: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="IFSC Code"
                  value={newDivisionBankDetails.FCRAIFSCCode || withCardContainer?.FCRAIFSCCode}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      FCRAIFSCCode: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Beneficiary"
                  value={newDivisionBankDetails.FCRABeneficiary || withCardContainer?.FCRABeneficiary}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      FCRABeneficiary: e.target.value,
                    }))
                  }
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
                  value={newDivisionBankDetails.localBankname || withCardContainer?.localBankname}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      localBankname: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Branch Name"
                  value={newDivisionBankDetails.localBranchname || withCardContainer?.localBranchname}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      localBranchname: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Account Number"
                  value={newDivisionBankDetails.localAccountNumber || withCardContainer?.localAccountNumber}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      localAccountNumber: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="IFSC Code"
                  value={newDivisionBankDetails.localIFSCCode || withCardContainer?.localIFSCCode}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      localIFSCCode: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label="Beneficiary"
                  value={newDivisionBankDetails.localBeneficiary || withCardContainer?.localBeneficiary}
                  onChange={(e) =>
                    setNewDivisionBankDetails((newWorkerBasicDetails) => ({
                      ...newWorkerBasicDetails,
                      localBeneficiary: e.target.value,
                    }))
                  }
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
