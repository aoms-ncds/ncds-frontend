import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
const BankDetailsFormComponent = (props: FormComponentProps<BankDetails, { title: string }>) => {
  const [newBankDetails, setNewBankDetails] = useState<BankDetails>(
    props.value ?? {
      bankName: '',
      branchName: '',
      accountNumber: '',
      IFSCCode: '',
      beneficiary: '',
    },
  );

  return (
    <form>
      <>
        <Typography variant="h4" component="h4">
          {props.options?.title ?? 'Bank Details'}
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Bank Name"
              value={newBankDetails.bankName}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    bankName: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })
              }
              variant="outlined"
              fullWidth
              disabled={props.action == 'view'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Branch Name"
              value={newBankDetails.branchName}
              onChange={(e) =>
                setNewBankDetails((newBankDetails) => {
                  const newBank = {
                    ...newBankDetails,
                    branchName: e.target.value,
                  };
                  props.onChange(newBank); // Call the onChange prop with the updated division details
                  return newBank;
                })
              }
              variant="outlined"
              fullWidth
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
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
              disabled={props.action == 'view'}
            />
          </Grid>
          <Grid item xs={12}>
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
              disabled={props.action == 'view'}
            />
          </Grid>
          <Grid item xs={12}>
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
              disabled={props.action == 'view'}
            />
          </Grid>
        </Grid>
      </>
    </form>
  );
};

export default BankDetailsFormComponent;
