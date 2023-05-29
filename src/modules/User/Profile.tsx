import { Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from '../Workers/extras/WorkersServices';

const Profile = () => {
  const [worker, setWorker] = useState<IWorker | null>(null);
  const { workersId } = useParams();

  useEffect(() => {
    if (workersId) {
      WorkerServices.getById(workersId)
        .then((res) => {
          console.log(res.data);
          setWorker(res.data);
        })
        .catch((res) => {});
    }
  }, []);
  return (
    <CommonPageLayout title="Worker Profile">
      <Container>
        <Grid container>
          <Grid container md={6}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                  Basic Details
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>First Name:</b>&nbsp;
                {!worker?.basicDetails?.firstName ? 'No data' : worker?.basicDetails.firstName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Last Name:</b>&nbsp;
                {!worker?.basicDetails?.lastName ? 'No data' : worker.basicDetails.lastName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <>
                  <b>DOB:</b>&nbsp;
                  {!worker?.basicDetails?.dateOfBirth ? 'No data' : worker.basicDetails.dateOfBirth.format('DD/MM/YYYY')}
                </>
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Work Code:</b>&nbsp;
                {!worker?.workerCode ? 'No data' : worker.workerCode}
              </Typography>
            </Grid>

            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Maternal Status:</b>&nbsp;
                {!worker?.basicDetails?.martialStatus ? 'No data' : worker.basicDetails.martialStatus}
              </Typography>
            </Grid>
            {worker?.basicDetails?.gender && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Gender:</b>&nbsp;
                  {!worker.basicDetails.gender ? 'No data' : worker.basicDetails.gender}
                </Typography>
              </Grid>
            )}
            {worker?.basicDetails?.email && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Email Id:</b>&nbsp;
                  {!worker.basicDetails.email ? 'No data' : worker.basicDetails.email}
                </Typography>
              </Grid>
            )}
            {worker?.basicDetails?.phone && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Phone Num:</b>&nbsp;
                  {!worker.basicDetails.phone ? 'No data' : worker.basicDetails.phone}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid container md={6}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Divider textAlign="left">
                  <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                    Support Details
                  </Typography>
                </Divider>
              </Grid>
              <br />
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: '' }}>
                  <b>Current Designation:</b>&nbsp;
                  {!worker?.supportDetails?.designation?.name ? 'No data' : worker.supportDetails.designation.name}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Total No Years In Ministry:</b>&nbsp;
                  {!worker?.supportDetails?.totalNoOfYearsInMinistry ? 'No data' : worker.supportDetails.totalNoOfYearsInMinistry}
                </Typography>
              </Grid>
              {/* <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Type Of Family:</b>&nbsp;
                  {!worker?.supportDetails? ?
                    'No data' :
                    worker.supportDetails}
                </Typography>
              </Grid> */}
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Type of Church:</b>&nbsp;
                  {!worker?.supportDetails?.withChurch ? 'No data' : worker.supportDetails.withChurch ? 'With church' : 'Without church'}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Self Support:</b>&nbsp;
                  {!worker?.officialDetails.selfSupport ? 'No data' : worker.officialDetails.selfSupport ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <br />
              <br />
              <Grid item xs={12}>
                <Divider textAlign="left">
                  <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                    Support Structure
                  </Typography>
                </Divider>
              </Grid>
              <br />
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: '' }}>
                  <b>Basic Allowance:</b>&nbsp;
                  {!worker?.supportStructure?.basic ? 'No data' : worker.supportStructure.basic}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>HRA Allowance:</b>&nbsp;
                  {!worker?.supportStructure?.HRA ? 'No data' : worker.supportStructure.HRA}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Spouse Allowance:</b>&nbsp;
                  {!worker?.supportStructure?.spouseAllowance ? 'No data' : worker.supportStructure.spouseAllowance}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Positional Allowance:</b>&nbsp;
                  {!worker?.supportStructure?.positionalAllowance ? 'No data' : worker.supportStructure.positionalAllowance}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Special Allowance:</b>&nbsp;
                  {!worker?.supportStructure?.specialAllowance ? 'No data' : worker.supportStructure.specialAllowance}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </CommonPageLayout>
  );
};

export default Profile;
