/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';

const DivisionProfilePage = ({
  withCardContainer = {
    divisionName: '',
    _id: '',
    divisionId: '',
    contactNumber: '',
    emailId: '',
    address: '',
    noofWorkers: 0,
    NoOfSubdivisions: 0,
    NoOfChurches: 0,
    coordinatorName: '',
    coordinatorContactno: '',
    coordinatorEmail: '',
    seniorLeaderName: '',
    seiorLeaderContactno: '',
    seiorLeaderEmail: '',
    juniorLeaderName: '',
    juniorLeaderContactno: '',
    juniorLeaderEmail: '',
  },
}: {
  withCardContainer?: DivisionProfile;
}) => {
  const [loadCount, setLoadCount] = useState(0);
  const [newDivisionProfile, setNewDivisionProfile] = useState<DivisionProfile>({
    divisionName: '',
    _id: '',
    divisionId: '',
    contactNumber: '',
    emailId: '',
    address: '',
    noofWorkers: 0,
    NoOfSubdivisions: 0,
    NoOfChurches: 0,
    coordinatorName: '',
    coordinatorContactno: '',
    coordinatorEmail: '',
    seniorLeaderName: '',
    seiorLeaderContactno: '',
    seiorLeaderEmail: '',
    juniorLeaderName: '',
    juniorLeaderContactno: '',
    juniorLeaderEmail: '',
  });
  return (
    <form>
      <Grid container spacing={12}>

        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4" >Division Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Name"
                  value={withCardContainer?.divisionName}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      divisionName: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Id"
                  value={withCardContainer?.divisionId}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      divisionId: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={withCardContainer?.contactNumber}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      contactNumber: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  value={withCardContainer?.emailId}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      emailId: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Address"
                  value={withCardContainer?.address}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      address: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Workers"
                  value={withCardContainer?.noofWorkers}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      noofWorkers: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Sub Divisions"
                  value={withCardContainer?.NoOfSubdivisions}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      NoOfSubdivisions: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" No. of Churches"
                  value={withCardContainer?.NoOfChurches}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      NoOfChurches: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>


          </Grid>

        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" component="h4">Leaders Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Co-ordinator Name"
                  value={withCardContainer?.coordinatorName}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      coordinatorName: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={withCardContainer?.coordinatorContactno}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      coordinatorContactno: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email ID"
                  value={withCardContainer?.coordinatorEmail}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      coordinatorEmail: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Senior Leader Name"
                  value={withCardContainer?.seniorLeaderName}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      seniorLeaderName: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={withCardContainer?.seiorLeaderContactno}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      seiorLeaderContactno: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={withCardContainer?.seiorLeaderEmail}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      seiorLeaderEmail: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Division Junior Leader Name"
                  value={withCardContainer?.juniorLeaderName}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      juniorLeaderName: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Contact Number"
                  value={withCardContainer?.juniorLeaderContactno}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      juniorLeaderContactno: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  label=" Email-ID"
                  value={withCardContainer?.juniorLeaderEmail}
                  onChange={(e) =>
                    setNewDivisionProfile((newDivisionProfile) => ({
                      ...newDivisionProfile,
                      juniorLeaderEmail: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>


          </Grid>

        </Grid>

      </Grid>
    </form>

  );
};

export default DivisionProfilePage;
