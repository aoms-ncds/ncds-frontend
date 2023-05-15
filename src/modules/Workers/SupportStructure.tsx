import { Grid, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkerServices from "./extras/WorkersServices";

const SupportStructure = () => {
  const { workersId } = useParams();
  const [newWorkerSupportStructure, setNewWorkerSupportStructure] =
    useState<SupportStructure>({
      basicAllowance: 0,
      hraAllowance: 1,
      spouseAllowance: 0,
      positionalAllowance: 0,
      specialAllowance: 0,
      impactDeduction: 0,
      telAllowance: 0,
      pionMissionaryFund: 0,
      MUTDeduction: 0,
    });
  useEffect(() => {
    console.log(workersId);
    if (workersId) {
      WorkerServices.getSupportStructureById(workersId)
        .then((res) => {
          setNewWorkerSupportStructure(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, []);
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="BASIC"
            value={Number(newWorkerSupportStructure?.basicAllowance)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                basicAllowance: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="HRA"
            value={Number(newWorkerSupportStructure?.hraAllowance)}
            // onChange={(e) =>
            //   // eslint-disable-next-line @typescript-eslint/naming-convention
            //   setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
            //     ...newWorkerSupportStructure,
            //     hraAllowance: Number(e.target.value),
            //   }))
            // }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="SPOUSE ALLOWANCE"
            value={Number(newWorkerSupportStructure?.spouseAllowance)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                spouseAllowance: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="POSITIONAL ALLOWANCE"
            value={Number(newWorkerSupportStructure?.positionalAllowance)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                positionalAllowance: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="SPECIAL ALLOWANCE"
            value={Number(newWorkerSupportStructure?.specialAllowance)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                specialAllowance: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="IMPACT DEDUCTION"
            value={Number(newWorkerSupportStructure?.impactDeduction)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                impactDeduction: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="TEL ALLOWANCE"
            value={Number(newWorkerSupportStructure?.telAllowance)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                telAllowance: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="PION Missionary Fund"
            value={Number(newWorkerSupportStructure?.pionMissionaryFund)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                pionMissionaryFund: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            type="number"
            label="MUT Deduction(Medical Insurance)"
            value={Number(newWorkerSupportStructure?.MUTDeduction)}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/naming-convention
              setNewWorkerSupportStructure((newWorkerSupportStructure) => ({
                ...newWorkerSupportStructure,
                MUTDeduction: Number(e.target.value),
              }))
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default SupportStructure;
