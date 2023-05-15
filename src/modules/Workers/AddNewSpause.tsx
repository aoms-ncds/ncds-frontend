import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Button, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment, { Moment } from 'moment';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
interface SpauseFormPagerops{
    action: 'add'|'edit'|'view';
  }

const AddNewSpausePage = (props: SpauseFormPagerops) => {
  const { spauseId } = useParams();
  const [workers, setWorkers] = useState<BasicDetails[]>();
  const [newSpause, setNewSpause] = useState<CreatableSpause>({
    firstName: '',
    secondName: '',
    email: '',
    mobileNo: '',
  });

  useEffect(() => {
    WorkerServices.getAll()
     .then((res) => {
       // loader.afterLoad();
       console.log(res);
       setWorkers(res.data);
     })
    .catch((res) => {
      // loader.afterLoad();
      console.log(res);
    });
    if (spauseId) {
      WorkerServices.getSpauseById(spauseId).then((res) => {
        setNewSpause(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
  },


  []);
  // const handleDateChange =
  const addSpause = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.addSpause(props.action)
      .then((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const editSpause = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.editSpause(props.action)
      .then((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  return (
    <CommonPageLayout title={props.action === 'add' ? 'Add Spause' : 'Edit Spause'} >
      <form onSubmit={props.action === 'add' ? addSpause : editSpause}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>

            <TextField
              label=" First Name"
              value={newSpause?.firstName}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  firstName: e.target.value,
                }))
              }
              variant="outlined" fullWidth
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>

            <TextField
              label=" Second Name"
              value={newSpause?.secondName}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  secondName: e.target.value,
                }))
              }
              fullWidth
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>

            <TextField
              label="Email"
              value={newSpause?.email}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  email: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>

            <TextField
              label="Email"
              value={newSpause?.email}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  email: e.target.value,
                }))
              }
              fullWidth
              // eslint-disable-next-line react/jsx-no-duplicate-props
              variant="outlined"
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Mobile Number"
              value={newSpause?.mobileNo}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  email: e.target.value,
                }))
              }
              variant="outlined" fullWidth
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>

              <DatePicker
                label="Date Of Birth"
                value={newSpause?.dob}
                onChange={(date: Moment | null) => {
                  if (date) {
                    setNewSpause((newSpause) => ({
                      ...newSpause,
                      dob: date,
                      // age: age,
                    }));
                  }
                }}

              />

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>


            <TextField
              label="Age"
              value={newSpause?.dob?.fromNow()}
              // onChange={(e) =>
              //   setNewSpause((newchild) => ({
              //     ...newchild,
              //     age: Number(e.target.value),
              //   }))
              // }
              fullWidth
              variant="outlined" InputLabelProps={{ shrink: true }}
            />

          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="Yes"
              name="radio-buttons-group"
              row
              value={newSpause.working ? 'Yes' : 'No'}
              onChange={(e) =>
                setNewSpause((prev) => ({
                  ...prev,
                  Working: e.target.value === 'Yes',
                }))
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>

            <TextField
              label="Occupation"
              value={newSpause?.occupation}
              onChange={(e) =>
                setNewSpause((newchild) => ({
                  ...newchild,
                  occupation: e.target.value,
                }))
              }
              fullWidth InputLabelProps={{ shrink: true }}
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Qualification"
                value={newSpause?.qualification}
                onChange={(e) =>
                  setNewSpause((newchild) => ({
                    ...newchild,
                    qualification: e.target.value,
                  }))
                }
                fullWidth InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              label="Language Known"
              value={newSpause?.languagesKnown}
              multiline
              maxRows={4}
              fullWidth
            />

          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Autocomplete
              value={newSpause?.spauseOf || null}
              options={workers ?? []}
              getOptionLabel={(worker) => worker.firstName}
              onChange={(_e, worker) => {
                if (worker) {
                  setNewSpause((newspause) => ({
                    ...newspause,
                    spauseOf: worker,
                  }));
                }
              }}
              renderInput={(params) => <TextField {...params} label="Spause Of" required />}
              fullWidth
            />
            <br />
            <Grid item lg={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ float: 'right', padding: '16px 64px' }}
              >
                {props.action === 'add' ? 'Submit' : 'Update'}
              </Button>

            </Grid>
          </Grid>
        </Grid>
      </form>
    </CommonPageLayout>
  );
};

export default AddNewSpausePage;
