import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const BankDetailsFormComponent = (props: FormComponentProps<BankDetails, {title:string}>) => {
  const [newBankDetails, setNewBankDetails] = useState<BankDetails>(
    props.value ?? {
      bankname: '',
      branchname: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
  );

  return (
    <form>
      <>
        <Typography variant='h4' component="h4">
          {props.options?.title??'Bank Details'}
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label='Bank Name'
              value={newBankDetails.bankname}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    bankname: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="Branch Name"
              value={newBankDetails.branchname}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    branchname: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })

              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="Account Number"
              value={newBankDetails.accountNumber}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    accountNumber: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })

              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="IFSC Code"
              value={newBankDetails.IFSCCode}
              onChange={(e) =>

                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    IFSCCode: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="Beneficiary"
              value={newBankDetails.beneficiary}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    beneficiary: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </>
    </form>
  );
};

export default BankDetailsFormComponent;
