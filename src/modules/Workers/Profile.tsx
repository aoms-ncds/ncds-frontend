import { Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from './extras/WorkersServices';
const Profile = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<BasicDetails|null>(null);
  const { workersId } = useParams();
  console.log(workersId);
  useEffect(() => {
    if (workersId) {
      setLoadCount((count) => count+1);
      WorkerServices.getWorkerById(workersId).then((res) => {
        setLoadCount((count) => count-1);
        setWorkerRequests(res.data);
      }).catch((res) => {
        setLoadCount((count) => count-1);
        console.log(res);
      });
    }
  }, []);
  return (
    <CommonPageLayout loadCount={loadCount} title='Worker Profile'>
      <Container>
        <Grid container>
          <Grid container md={7}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                Personal Details
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>First Name:</b>&nbsp;
                {!WorkerRequests?.firstName ? 'No data' : WorkerRequests.firstName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Last Name:</b>&nbsp;
                {!WorkerRequests?.secondName ? 'No data' : WorkerRequests.secondName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <>
                  <b>DOB:</b>&nbsp;
                  {!WorkerRequests?.dob ? 'No data' : WorkerRequests.dob.format('DD/MM/YYYY')}
                </>
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Maternal Status:</b>&nbsp;
                {!WorkerRequests?.maritalStatus ? 'No data' : WorkerRequests.maritalStatus}
              </Typography>
            </Grid>
            {WorkerRequests?.gender && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Gender:</b>&nbsp;
                  {!WorkerRequests.gender ? 'No data' : WorkerRequests.gender}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.emailId && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Email Id:</b>&nbsp;
                  {!WorkerRequests.emailId ? 'No data' : WorkerRequests.emailId}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.mobileNumber && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Phone Num:</b>&nbsp;
                  {!WorkerRequests.mobileNumber ? 'No data' : WorkerRequests.mobileNumber}
                </Typography>
              </Grid>
            )}
            <br />
            <br />
            {WorkerRequests?.currentAddress && (
              <Grid container xs={6}>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                      <b>Current Address</b>
                    </Typography>
                  </Divider>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.currentAddress ? 'No data' : WorkerRequests.permanentAddress},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.currentAddressCity ? 'No data' : WorkerRequests.currentAddressCity},
                    {!WorkerRequests.currentAddressState ? 'No data' : WorkerRequests.currentAddressState},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.currentAddressCountry ? 'No data' : WorkerRequests.currentAddressCountry},
                    {!WorkerRequests.currentAddressPincode ? 'No data' : WorkerRequests.currentAddressPincode}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {WorkerRequests?.permanentAddress && (
              <Grid container xs={6}>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Typography variant="body1" sx={{ textDecoration: 'none' }}>
                      <b>Permanent Address</b>
                    </Typography>
                  </Divider>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.permanentAddress ? 'No data' : WorkerRequests.permanentAddress},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.permanentAddressCity ? 'No data' : WorkerRequests.permanentAddressCity},
                    {!WorkerRequests.permanentAddressDistrict ? 'No data' : WorkerRequests.permanentAddressDistrict},
                    {!WorkerRequests.permanentAddressState ? 'No data' : WorkerRequests.permanentAddressState},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.permanentAddressCountry ? 'No data' : WorkerRequests.permanentAddressCountry},
                    {!WorkerRequests.permanentAddressPincode ? 'No data' : WorkerRequests.permanentAddressPincode},
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </CommonPageLayout>
  );
};

export default Profile;
