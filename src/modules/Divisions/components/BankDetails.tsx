import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { FormComponentProps } from '../../../extras/CommonTypes';
import { BankDetails } from '../extras/DivisionsTypes';

const BankDetailsForm = (props: FormComponentProps<BankDetails, {title?:string}>) => {
  const [newBankDetails, setNewBankDetails] = useState<BankDetails>(props.value?? {
    bankName: '',
    branchName: '',
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
          value={newBankDetails.bankName }
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
      <Grid item xs={12} md={6} lg={4}>

        <TextField
          label="Branch Name"
          value={newBankDetails.branchName }
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
      <Grid item xs={12} md={6} lg={4}>

        <TextField
          label="Account Number"
          value={newBankDetails.accountNumber }
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
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="IFSC Code"
          value={newBankDetails.IFSCCode }
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
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Beneficiary"
          value={newBankDetails.beneficiary }
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


    </>
  );
};

export default BankDetailsForm;
