import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete } from '@mui/material';
import React, { useState } from 'react';

const SupportStructure = ({
  withCardContainer = {
    _id: '',
    basicAllowance: '',
    hraAllowance: 1,
    spouseAllowance: '',
    positionalAllowance: '',
    specialAllowance: '',
    impactDeduction: '',
    telAllowance: '',
    pionMissionaryFund: '',
    MUTDeduction: '',
  },
}: {
  withCardContainer?: SupportStructure;
}) => {
  const [newWorkerSupportStructur, setWorkerSupportStructur] = useState<SupportStructure>({
    _id: '',
    basicAllowance: '',
    hraAllowance: 1,
    spouseAllowance: '',
    positionalAllowance: '',
    specialAllowance: 'yes',
    impactDeduction: '',
    telAllowance: '',
    pionMissionaryFund: '',
    MUTDeduction: '',

  });
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="BASIC"
              value={withCardContainer?.basicAllowance}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  basicAllowance: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="HRA"
              value={withCardContainer?.hraAllowance}
              // onChange={(e) =>
              //   // eslint-disable-next-line @typescript-eslint/naming-convention
              //   setWorkerSupportStructur((newWorkerSupportStructur) => ({
              //     ...newWorkerSupportStructur,
              //     hraAllowance: e.target.value,
              //   }))
              // }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="SPOUSE ALLOWANCE"
              value={withCardContainer?.spouseAllowance}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  spouseAllowance: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="POSITIONAL ALLOWANCE"
              value={withCardContainer?.positionalAllowance}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  positionalAllowance: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="SPECIAL ALLOWANCE"
              value={withCardContainer?.specialAllowance}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  specialAllowance: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="IMPACT DEDUCTION"
              value={withCardContainer?.impactDeduction}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  impactDeduction: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="TEL ALLOWANCE"
              value={withCardContainer?.telAllowance}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  telAllowance: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="PION Missionary Fund"
              value={withCardContainer?.pionMissionaryFund}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  pionMissionaryFund: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="MUT Deduction(Medical Insurance)"
              value={withCardContainer?.MUTDeduction}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setWorkerSupportStructur((newWorkerSupportStructur) => ({
                  ...newWorkerSupportStructur,
                  MUTDeduction: e.target.value,
                }))
              }
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default SupportStructure;
