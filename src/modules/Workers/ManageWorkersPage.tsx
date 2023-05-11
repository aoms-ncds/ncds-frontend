import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Avatar, Button, Card, Grid } from '@mui/material';
import WorkerServices from './extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useLoader } from '../../hooks/Loader';
const ManageWorkerPage = () => {
  const loader = useLoader();
  const [WorkerRequests, setWorkerRequests] = useState<IETWorker[]|null>(null);

  useEffect(() => {
    loader.onLoad();
    WorkerServices.getAll()
   .then((res) => {
     loader.afterLoad();
     console.log(res);
     setWorkerRequests(res.data);
   })
  .catch((res) => {
    loader.afterLoad();
    console.log(res);
  });
  }, []);
  const removeWorker = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Removing Worker',
      variant: 'info',
    });
    WorkerServices.markAsRemove(id)
      .then((res) => {
        console.log('Response', res);
        if (WorkerRequests) {
          const newWorkerRequests = WorkerRequests.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkerRequests(newWorkerRequests);
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const columns = [
    {
      field: 'image',
      headerName: '',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (<Avatar />),
    },
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
              text: 'View',
              component: Link,
              to: '/workers/profile/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/workers/edit/' + props.row._id,
              icon: EditIcon,
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                removeWorker(props.row._id);
              },
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
    { field: 'email', headerName: 'Email Id', width: 130 },
    { field: 'phone', headerName: 'Mobile Number', width: 130 },
    { field: 'alternativeMobileNumber', headerName: 'Alernative Mobile Number', width: 130 },
    { field: 'PANNo', headerName: 'PAN Number', width: 130 },
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
    { field: 'spouse', headerName: 'Spouse Of Another Staff', width: 130 },

  ];
  return (
    <CommonPageLayout title='Manage Workers'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/workers/add"
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
