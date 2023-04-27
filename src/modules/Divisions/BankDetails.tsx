import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
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
  const [loadCount, setLoadCount] = useState(0);
  const [newDivisionBankDetails, setNewDivisionBankDetails] = useState<BankDetails>({
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
                  value={withCardContainer?.FCRABankname}
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
                  value={withCardContainer?.FCRABranchname}
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
                  value={withCardContainer?.FCRAAccountNumber}
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
                  value={withCardContainer?.FCRAIFSCCode}
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
                  value={withCardContainer?.FCRABeneficiary}
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
                  value={withCardContainer?.localBankname}
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
                  value={withCardContainer?.localBranchname}
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
                  value={withCardContainer?.localAccountNumber}
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
                  value={withCardContainer?.localIFSCCode}
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
                  value={withCardContainer?.localBeneficiary}
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
