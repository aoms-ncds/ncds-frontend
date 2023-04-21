import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete } from '@mui/material';
import React from 'react';

const SupportStructure = () => {
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="BASIC"
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
              label="HRA"
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
              label="SPOUSE ALLOWANCE"
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
              label="POSITIONAL ALLOWANCE"
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
              label="SPECIAL ALLOWANCE"
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
              label="IMPACT DEDUCTION"
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
              label="TEL ALLOWANCE"
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
              label="PION Missionary Fund"
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
              label="MUT Deduction(Medical Insurance)"
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
  );
};

export default SupportStructure;
