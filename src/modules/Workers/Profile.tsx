import { Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonPageLayout from '../../components/CommonPageLayout';
import WorkerServices from './extras/WorkersServices';
import { useLoader } from '../../hooks/Loader';
const Profile = () => {
  const loader = useLoader();
  const [WorkerRequests, setWorkerRequests] = useState<WorkersDetails|null>(null);
  const { workersId } = useParams();

  useEffect(() => {
    if (workersId) {
      loader.onLoad();
      WorkerServices.getWorkerById(workersId).then((res) => {
        loader.afterLoad();
        setWorkerRequests(res.data);
      }).catch((res) => {
        loader.afterLoad();
      });
    }
  }, []);
  return (
    <CommonPageLayout title='Worker Profile'>
      <Container>
        <Grid container>
          <Grid container md={6}>
            <Grid item xs={12}>
              <Divider textAlign="center">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                Basic Details
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>First Name:</b>&nbsp;
                {!WorkerRequests?.basicDetails?.firstName ? 'No data' : WorkerRequests.basicDetails.firstName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Last Name:</b>&nbsp;
                {!WorkerRequests?.basicDetails?.lastName ? 'No data' : WorkerRequests.basicDetails.lastName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Work Code:</b>&nbsp;
                {!WorkerRequests?.basicDetails?.workerCode ? 'No data' : WorkerRequests.basicDetails.workerCode}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <>
                  <b>DOB:</b>&nbsp;
                  {!WorkerRequests?.basicDetails?.dob ? 'No data' : WorkerRequests.basicDetails.dob.format('DD/MM/YYYY')}
                </>
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Maternal Status:</b>&nbsp;
                {!WorkerRequests?.basicDetails?.maritalStatus ? 'No data' : WorkerRequests.basicDetails.maritalStatus}
              </Typography>
            </Grid>
            {WorkerRequests?.basicDetails?.gender && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Gender:</b>&nbsp;
                  {!WorkerRequests.basicDetails.gender ? 'No data' : WorkerRequests.basicDetails.gender}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.basicDetails?.email && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Email Id:</b>&nbsp;
                  {!WorkerRequests.basicDetails.email ? 'No data' : WorkerRequests.basicDetails.email}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.basicDetails?.phone && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Phone Num:</b>&nbsp;
                  {!WorkerRequests.basicDetails.phone ? 'No data' : WorkerRequests.basicDetails.phone}
                </Typography>
              </Grid>
            )}
            <br />
            <br />
            {/* {WorkerRequests?.basicDetails?.currentAddress && (
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
                    {!WorkerRequests.basicDetails.currentAddress ? 'No data' : WorkerRequests.basicDetails.permanentAddress},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.basicDetails.currentAddressCity ? 'No data' : WorkerRequests.basicDetails.currentAddressCity},
                    {!WorkerRequests.basicDetails.currentAddressState ? 'No data' : WorkerRequests.basicDetails.currentAddressState},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.basicDetails.currentAddressCountry ? 'No data' : WorkerRequests.basicDetails.currentAddressCountry},
                    {!WorkerRequests.basicDetails.currentAddressPincode ? 'No data' : WorkerRequests.basicDetails.currentAddressPincode}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {WorkerRequests?.basicDetails?.permanentAddress && (
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
                    {!WorkerRequests.basicDetails.permanentAddress ? 'No data' : WorkerRequests.basicDetails.permanentAddress},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.basicDetails.permanentAddressCity ? 'No data' : WorkerRequests.basicDetails.permanentAddressCity},
                    {!WorkerRequests.basicDetails.permanentAddressDistrict ? 'No data' : WorkerRequests.basicDetails.permanentAddressDistrict},
                    {!WorkerRequests.basicDetails.permanentAddressState ? 'No data' : WorkerRequests.basicDetails.permanentAddressState},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.basicDetails.permanentAddressCountry ? 'No data' : WorkerRequests.basicDetails.permanentAddressCountry},
                    {!WorkerRequests.basicDetails.permanentAddressPincode ? 'No data' : WorkerRequests.basicDetails.permanentAddressPincode},
                  </Typography>
                </Grid>
              </Grid>
            )} */}
          </Grid>
          <Grid container md={6}>
            {/* <Grid item xs={12}>
              <Divider textAlign="center">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                Official Details
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>First Name:</b>&nbsp;
                {!WorkerRequests?.officialDetails?.firstName ? 'No data' : WorkerRequests.officialDetails.firstName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Last Name:</b>&nbsp;
                {!WorkerRequests?.officialDetails?.secondName ? 'No data' : WorkerRequests.officialDetails.secondName}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Work Code:</b>&nbsp;
                {!WorkerRequests?.officialDetails?.workerCode ? 'No data' : WorkerRequests.officialDetails.workerCode}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <>
                  <b>DOB:</b>&nbsp;
                  {!WorkerRequests?.officialDetails?.dob ? 'No data' : WorkerRequests.officialDetails.dob.format('DD/MM/YYYY')}
                </>
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Maternal Status:</b>&nbsp;
                {!WorkerRequests?.officialDetails?.maritalStatus ? 'No data' : WorkerRequests.officialDetails.maritalStatus}
              </Typography>
            </Grid>
            {WorkerRequests?.officialDetails?.gender && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Gender:</b>&nbsp;
                  {!WorkerRequests.officialDetails.gender ? 'No data' : WorkerRequests.officialDetails.gender}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.officialDetails?.email && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Email Id:</b>&nbsp;
                  {!WorkerRequests.officialDetails.email ? 'No data' : WorkerRequests.officialDetails.email}
                </Typography>
              </Grid>
            )}
            {WorkerRequests?.officialDetails?.phone && (
              <Grid item md={6} xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                  <b>Phone Num:</b>&nbsp;
                  {!WorkerRequests.officialDetails.phone ? 'No data' : WorkerRequests.officialDetails.phone}
                </Typography>
              </Grid>
            )}
            <br />
            <br />
            {WorkerRequests?.officialDetails?.currentAddress && (
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
                    {!WorkerRequests.officialDetails.currentAddress ? 'No data' : WorkerRequests.officialDetails.permanentAddress},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.officialDetails.currentAddressCity ? 'No data' : WorkerRequests.officialDetails.currentAddressCity},
                    {!WorkerRequests.officialDetails.currentAddressState ? 'No data' : WorkerRequests.officialDetails.currentAddressState},
                  </Typography>

                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.officialDetails.currentAddressCountry ? 'No data' : WorkerRequests.officialDetails.currentAddressCountry},
                    {!WorkerRequests.officialDetails.currentAddressPincode ? 'No data' : WorkerRequests.officialDetails.currentAddressPincode}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {WorkerRequests?.officialDetails?.permanentAddress && (
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
                    {!WorkerRequests.officialDetails.permanentAddress ? 'No data' : WorkerRequests.officialDetails.permanentAddress},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.officialDetails.permanentAddressCity ? 'No data' : WorkerRequests.officialDetails.permanentAddressCity},
                    {!WorkerRequests.officialDetails.permanentAddressDistrict ? 'No data' : WorkerRequests.officialDetails.permanentAddressDistrict},
                    {!WorkerRequests.officialDetails.permanentAddressState ? 'No data' : WorkerRequests.officialDetails.permanentAddressState},
                  </Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                    {!WorkerRequests.officialDetails.permanentAddressCountry ? 'No data' : WorkerRequests.officialDetails.permanentAddressCountry},
                    {!WorkerRequests.officialDetails.permanentAddressPincode ? 'No data' : WorkerRequests.officialDetails.permanentAddressPincode},
                  </Typography>
                </Grid>
              </Grid>
            )} */}
          </Grid>
          <br />
          <br />
          <Grid container md={6}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                Support Details
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>Current Designation:</b>&nbsp;
                {!WorkerRequests?.supportDetails?.currentDesignation?.name ? 'No data' : WorkerRequests.supportDetails.currentDesignation.name}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Total No Years In Ministry:</b>&nbsp;
                {!WorkerRequests?.supportDetails?.totalNoYearsInMinistry ? 'No data' : WorkerRequests.supportDetails.totalNoYearsInMinistry}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Type Of Family:</b>&nbsp;
                {!WorkerRequests?.supportDetails?.typeOfFamily ? 'No data' : WorkerRequests.supportDetails.typeOfFamily}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Type of Church:</b>&nbsp;
                {!WorkerRequests?.supportDetails?.typeofChurch ? 'No data' : WorkerRequests.supportDetails.typeofChurch}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Self Support:</b>&nbsp;
                {!WorkerRequests?.supportDetails?.selfSupport ? 'No data' : WorkerRequests.supportDetails.selfSupport}
              </Typography>
            </Grid>
          </Grid>
          <Grid container md={6}>
            <Grid item xs={12}>
              <Divider textAlign="left">
                <Typography variant="h6" sx={{ textDecoration: 'none' }}>
                Support Structer
                </Typography>
              </Divider>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: '' }}>
                <b>Basic Allowance:</b>&nbsp;
                {!WorkerRequests?.supportStructure?.basicAllowance ? 'No data' : WorkerRequests.supportStructure.basicAllowance}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>HRA Allowance:</b>&nbsp;
                {!WorkerRequests?.supportStructure?.hraAllowance ? 'No data' : WorkerRequests.supportStructure.hraAllowance}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Spouse Allowance:</b>&nbsp;
                {!WorkerRequests?.supportStructure?.spouseAllowance ? 'No data' : WorkerRequests.supportStructure.spouseAllowance}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Positional Allowance:</b>&nbsp;
                {!WorkerRequests?.supportStructure?.positionalAllowance ? 'No data' : WorkerRequests.supportStructure.positionalAllowance}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2" sx={{ textDecoration: 'none' }}>
                <b>Special Allowance:</b>&nbsp;
                {!WorkerRequests?.supportStructure?.specialAllowance ? 'No data' : WorkerRequests.supportStructure.specialAllowance}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </CommonPageLayout>
  );
};

export default Profile;
