import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Button, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment, { Moment } from 'moment';
import { enqueueSnackbar } from 'notistack';
import { childSupport } from './extras/WorkersConfig';
import { useParams } from 'react-router-dom';
interface ChildFormPagerops{
    action: 'add'|'edit'|'view';
  }

const AddNewChildPage = (props: ChildFormPagerops) => {
  const { childId } = useParams();
  const [workers, setWorkers] = useState<BasicDetails[]>();
  const [newChild, setNewChild] = useState<CreatableChild>({
    type: '',
    firstName: '',
    secondName: '',
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
    if (childId) {
      WorkerServices.getChildById(childId).then((res) => {
        setNewChild(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
  },


  []);
  const handleDateChange = (date: Moment | null) => {
    // console.log(date);
    if (date) {
      const formattedDate = date.format('MM/DD/YYYY');

      const age = moment(formattedDate, 'MM/DD/YYYY').month(0).from(moment().month(0));

      setNewChild((newchild) => ({
        ...newchild,
        dob: date as Moment,
        age: age,
      }));
    }
  };
  const AddChild = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.addChild(props.action)
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
  const UpdateChild = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    WorkerServices.editChild(props.action)
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
    <CommonPageLayout title={props.action === 'add' ? 'Add Child' : 'Edit Child'} >
      <form onSubmit={props.action === 'add' ? AddChild : UpdateChild}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label=" First Name"
                value={newChild?.firstName}
                onChange={(e) =>
                  setNewChild((newchild) => ({
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
                value={newChild?.secondName}
                onChange={(e) =>
                  setNewChild((newchild) => ({
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Of Birth"
                  value={newChild?.dob}
                  onChange={handleDateChange}

                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="Age"
                value={newChild?.age}
                // onChange={(e) =>
                //   setNewChild((newchild) => ({
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
              <FormLabel id="demo-radio-buttons-group-label">Studying</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // /defaultValue='false'
                value={Boolean(newChild?.studying)}
                onChange={(e) =>
                  setNewChild((newchild) => ({
                    ...newchild,
                    studying: Boolean(e.target.value),
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
                label=" Class Of Study"
                value={newChild?.classOfStudy}
                onChange={(e) =>
                  setNewChild((newchild) => ({
                    ...newchild,
                    classOfStudy: e.target.value,
                  }))
                }
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
                value={Boolean(newChild?.studying)}
                onChange={(e) =>
                  setNewChild((newchild) => ({
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
                value={newChild?.occupation}
                onChange={(e) =>
                  setNewChild((newchild) => ({
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
                value={newChild?.qualification}
                onChange={(e) =>
                  setNewChild((newchild) => ({
                    ...newchild,
                    qualification: e.target.value,
                  }))
                }
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Autocomplete
              value={newChild?.childSupport}
              options={childSupport?? []}
              getOptionLabel={(childSupport) => childSupport}
              //   onChange={(_e, childSupport) => {
              //     if (workers ) {
              //       setNewChild((newchild) => ({
              //         ...newChild,
              //         childSupport: childSupport,
              //       }));
              //     }
              //   }}
              renderInput={(params) => <TextField {...params} label="Child Support" required />}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Autocomplete
              value={newChild?.childOf}
              options={workers ?? []}
              getOptionLabel={(worker) => worker.firstName}
              onChange={(_e, workers) => {
                if (workers ) {
                  setNewChild((newchild) => ({
                    ...newchild,
                    childOf: workers,
                  }));
                }
              }}
              renderInput={(params) => <TextField {...params} label="Child Of" required />}
              fullWidth
            />

          </Grid>
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
      </form>
    </CommonPageLayout>
  );
};

export default AddNewChildPage;
