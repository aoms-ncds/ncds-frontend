import { Grid, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkerServices from './extras/WorkersServices';

const SupportStructure = () => {
  const { workersId } = useParams();
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
    MUTDeduction: '' });
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getSupportStructureById(workersId).then((res) => {
        setWorkerSupportStructur(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
  }, []);
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              label="BASIC"
              value={newWorkerSupportStructur?.basicAllowance}
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
              value={newWorkerSupportStructur?.hraAllowance}
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
              value={newWorkerSupportStructur?.spouseAllowance}
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
              value={newWorkerSupportStructur?.positionalAllowance}
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
              value={newWorkerSupportStructur?.specialAllowance}
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
              value={newWorkerSupportStructur?.impactDeduction}
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
              value={newWorkerSupportStructur?.telAllowance}
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
              value={newWorkerSupportStructur?.pionMissionaryFund}
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
              value={newWorkerSupportStructur?.MUTDeduction}
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
