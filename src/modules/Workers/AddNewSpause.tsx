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
  const handleDateChange = (date: Moment | null) => {
    //   // console.log(date);
    //   if (date) {
    //     const age = moment(date).month(0).from(moment().month(0));

    //     setNewSpause((newSpause) => ({
    //       ...newSpause,
    //       dob: date,
    //       age: age,
    //     }));
    //   }
  };
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
            <FormControl variant="outlined" fullWidth>
              <TextField
                label=" First Name"
                value={newSpause?.firstName}
                onChange={(e) =>
                  setNewSpause((newchild) => ({
                    ...newchild,
                    firstName: e.target.value,
                  }))
                }
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Mobile Number"
                value={newSpause?.mobileNo}
                onChange={(e) =>
                  setNewSpause((newchild) => ({
                    ...newchild,
                    email: e.target.value,
                  }))
                }
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Birth"
                  // value={newSpause?.dob}
                  onChange={handleDateChange}

                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Age"
                value={newSpause?.age}
                // onChange={(e) =>
                //   setNewSpause((newchild) => ({
                //     ...newchild,
                //     age: Number(e.target.value),
                //   }))
                // }
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Working</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue='0'
                value={Boolean(newSpause?.working)}
                onChange={(e) =>
                  setNewSpause((newchild) => ({
                    ...newchild,
                    Working: Boolean(e.target.value),
                  }))
                }
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value='0' control={<Radio />} label="Yes" />
                <FormControlLabel value='1' control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Occupation"
                value={newSpause?.occupation}
                onChange={(e) =>
                  setNewSpause((newchild) => ({
                    ...newchild,
                    occupation: e.target.value,
                  }))
                }
                fullWidth
              />
            </FormControl>
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
                fullWidth
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
              value={newSpause?.spauseOf}
              options={workers ?? []}
              getOptionLabel={(worker) => worker.firstName}
              onChange={(_e, workers) => {
                if (workers ) {
                  setNewSpause((newspause) => ({
                    ...newspause,
                    spauseOf: workers,
                  }));
                }
              }}
              renderInput={(params) => <TextField {...params} label="Spause Of" required />}
              fullWidth
            />

            <Grid item xs={12} md={12} lg={12}>
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
