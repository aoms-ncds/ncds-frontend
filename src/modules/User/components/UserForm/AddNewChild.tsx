import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import ChildrenServices from '../../../Workers/extras/ChildrenServices';
import { childSupport } from '../../../Workers/extras/WorkersConfig';
import WorkersServices from '../../../Workers/extras/WorkersServices';
import CommonPageLayout from '../../../../components/CommonPageLayout';

interface ChildFormPagerops{
    action: 'add'|'edit'|'view';
  }

const AddNewChildPage = (props: ChildFormPagerops) => {
  const { childId } = useParams();
  const [workers, setWorkers] = useState<IWorker[]>();
  const [newChild, setNewChild] = useState<CreatableChild>({
    // type: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    WorkersServices.getAll()
     .then((res) => {
       console.log(res);
       setWorkers(res.data);
     })
    .catch((res) => {
      console.log(res);
    });

    if (childId) {
      ChildrenServices.getById(childId).then((res) => {
        setNewChild(res.data);
      }).catch((res) => {
        console.log(res);
      });
    }
  },


  []);

  const AddChild = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ChildrenServices.create(newChild)
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
    ChildrenServices.edit(newChild)
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

          <Grid item xs={12} md={6} >
            <TextField
              label=" First Name"
              value={newChild?.firstName}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  firstName: e.target.value,
                }))
              }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />

          </Grid>
          <Grid item xs={12} md={6} >
            <TextField
              label=" Last Name:"
              value={newChild?.lastName}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  lastName: e.target.value,
                }))
              }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <FormControl variant="outlined" fullWidth>
              <DatePicker
                label="Date Of Birth"
                value={newChild?.dateOfBirth}
                onChange={(date: Moment | null) => {
                  if (date) {
                    setNewChild((newChild) => ({
                      ...newChild,
                      dateOfBirth: date,
                    }));
                  }
                }}

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} >
            <TextField
              label="Age"
              value={newChild?.dateOfBirth?.fromNow()}
              // onChange={(e) =>
              //   setNewChild((newchild) => ({
              //     ...newchild,
              //     age: Number(e.target.value),
              //   }))
              // }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <FormLabel id="demo-radio-buttons-group-label">Studying</FormLabel>
            <Checkbox
              checked={newChild.studying}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  studying: e.target.checked,
                }))
              }
              color="primary"
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <TextField
              label=" Class Of Study"
              value={newChild?.classOfStudy}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  classOfStudy: e.target.value,
                }))
              }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <FormLabel id="demo-radio-buttons-group-label">Working</FormLabel>
            <Checkbox
              checked={newChild.working}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  working: e.target.checked,
                }))
              }
              color="primary"
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <TextField
              label="Occupation"
              value={newChild?.occupation}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  occupation: e.target.value,
                }))
              }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <TextField
              label="Qualification"
              value={newChild?.qualification}
              onChange={(e) =>
                setNewChild((newchild) => ({
                  ...newchild,
                  qualification: e.target.value,
                }))
              }
              fullWidth variant="outlined" InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <Autocomplete
              value={newChild?.childSupport}
              options={childSupport ?? []}
              getOptionLabel={(childSupport) => childSupport}
              onChange={(_e, childSupport) => {
                if (workers) {
                  setNewChild((newChild) => ({
                    ...newChild,
                    childSupport: childSupport ?? '',
                  }));
                }
              }}
              renderInput={(params) => <TextField {...params} label="Child Support" required />}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <Autocomplete
              value={newChild?.childOf || null}
              options={workers ?? []}
              getOptionLabel={(worker) => worker.basicDetails.firstName}
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
          </Grid><br />

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
      </form>
    </CommonPageLayout>
  );
};

export default AddNewChildPage;
