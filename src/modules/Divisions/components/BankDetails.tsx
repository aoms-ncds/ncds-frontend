import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const BankDetailsForm = (props: FormComponentProps<BankDetails, {title?:string}>) => {
  const [newBankDetails, setNewBankDetails] = useState<BankDetails>(props.value?? {
    bankname: '',
    branchname: '',
    accountNumber: '',
    IFSCCode: '',
    beneficiary: '',
  });

  return (
    <>
      <Grid item xs={12} >
        <Typography variant="h4" component="h4" >{props.options?.title ?? 'Bank Details'}</Typography>
      </Grid>
      <br/>
      {/* <Grid container spacing={3}> */}
      <Grid item xs={12} md={6} lg={4} >
        <TextField
          label="Bank Name"
          value={newBankDetails.bankname }
          onChange={(e) =>
            setNewBankDetails((newBankDetails) => ({
              ...newBankDetails,
              bankname: e.target.value,
            }))
          }
          variant="outlined"
          fullWidth
        />

      </Grid>
      <Grid item xs={12} md={6} lg={4}>

        <TextField
          label="Branch Name"
          value={newBankDetails.branchname }
          onChange={(e) =>
            setNewBankDetails((newWorkerBasicDetails) => ({
              ...newWorkerBasicDetails,
              branchname: e.target.value,
            }))
          }
          variant="outlined"
          fullWidth
        />

      </Grid>
      <Grid item xs={12} md={6} lg={4}>

        <TextField
          label="Account Number"
          value={newBankDetails.accountNumber }
          onChange={(e) =>
            setNewBankDetails((newBankDetails) => ({
              ...newBankDetails,
              accountNumber: e.target.value,
            }))
          }
          variant="outlined"
          fullWidth
        />

      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="IFSC Code"
          value={newBankDetails.IFSCCode }
          onChange={(e) =>
            setNewBankDetails((newBankDetails) => ({
              ...newBankDetails,
              IFSCCode: e.target.value,
            }))
          }
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Beneficiary"
          value={newBankDetails.beneficiary }
          onChange={(e) =>
            setNewBankDetails((newWorkerBasicDetails) => ({
              ...newWorkerBasicDetails,
              beneficiary: e.target.value,
            }))
          }
          variant="outlined"
          fullWidth
        />
      </Grid>
      {/* </Grid> */}
    </>
  );
};

export default BankDetailsForm;
