import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Add as AddIcon,

} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
const ManageWorkerPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [WorkerRequests, setWorkerRequests] = useState<BasicDetails[]|null>(null);

  useEffect(() => {
    setLoadCount((count) => count+1);
    WorkerServices.getAll()
   .then((res) => {
     setLoadCount((count) => count-1);
     console.log(res);
     setWorkerRequests(res.data);
   })
  .catch((res) => {
    setLoadCount((count) => count-1);
    console.log(res);
  });
  }, []);
  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id='Worker action'
          primaryText='Actions'
          key={'Worker action'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              to: '/Worker/view_Worker/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/edit/:WorkerID' + props.row._id,
              icon: EditIcon,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 70 },
    { field: 'secondName', headerName: 'Second Name', width: 130 },
    { field: 'missionaryOrNonMissionary', headerName: 'Missionary', width: 150 },
    { field: 'dob', headerName: 'DOB', width: 170 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'age', headerName: 'Age', width: 130 },
    { field: 'maritalStatus', headerName: 'Marital Status', width: 130 },
    { field: 'highestQualification', headerName: 'Highest Qualification', width: 130 },
    { field: 'motherToungue', headerName: 'Mother Toungue', width: 130 },
    { field: 'communicationLanguage', headerName: 'Communication Language', width: 130 },
    { field: 'languagesKnown', headerName: 'Languages Known', width: 130 },
    { field: 'emailId', headerName: 'Email Id', width: 130 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 130 },
    { field: 'alternativeMobileNumber', headerName: 'Alernative Mobile Number', width: 130 },
    { field: 'PANnumber', headerName: 'PAN Number', width: 130 },
    { field: 'aadhaarNumber', headerName: 'Aadhaar Number', width: 130 },
    { field: 'voterId', headerName: 'Voter Id', width: 130 },
    { field: 'licenseNumber', headerName: 'License Number', width: 130 },
    { field: 'permanentAddress', headerName: 'Permanent Address', width: 130 },
    { field: 'permanentAddressCity', headerName: 'City', width: 130 },
    { field: 'permanentAddressDistrict', headerName: 'District', width: 130 },
    { field: 'permanentAddressState', headerName: 'State', width: 130 },
    { field: 'permanentAddressCountry', headerName: 'Country', width: 130 },
    { field: 'permanentAddressPincode', headerName: 'Pin Code', width: 130 },
    { field: 'currentAddress', headerName: 'Current Address', width: 130 },
    { field: 'currentAddressCity', headerName: 'City', width: 130 },
    { field: 'currentAddressDistrict', headerName: 'District', width: 130 },
    { field: 'currentAddressState', headerName: 'State', width: 130 },
    { field: 'currentAddressCountry', headerName: 'Country', width: 130 },
    { field: 'currentAddressPincode', headerName: 'Pin Code', width: 130 },
    { field: 'spouseOfAnotherStaff', headerName: 'Spouse Of Another Staff', width: 130 },

  ];
  return (
    <CommonPageLayout title='Manage Workers' loadCount={loadCount}>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/workers/add_new_worker"
        // onClick={() => {
        // }}
      >
          Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={WorkerRequests??[]} columns={columns} getRowId={(row) => row._id} loading={WorkerRequests === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ManageWorkerPage;
