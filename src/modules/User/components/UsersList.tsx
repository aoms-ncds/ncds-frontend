import React, { useEffect, useState } from 'react';
import DropdownButton from '../../../components/DropDownButton';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
  NoAccounts as NoAccountsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import WorkerServices from '../../Workers/extras/WorkersServices';
import { Avatar, Button, Card, Grid } from '@mui/material';
import UserServices from '../extras/UserServices';
import UserLifeCycleStates from '../extras/UserLifeCycleStates';

const UsersList = <T extends User, >(props:FormComponentProps<T[]>) => {
  // useEffect(() => {
  //   if (!users) {
  //     UserServices.getAll()
  //     .then((res) => {
  //       console.log(res);
  //       setUsers(res.data);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  //   }
  // }, []);

  const removeWorker = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Removing Worker',
      variant: 'info',
    });
    UserServices.delete(id)
      .then((res) => {
        console.log('Response', res);
        if (props.value) {
          const newWorkerRequests = props.value.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          props.onChange(newWorkerRequests);
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

  const deactivateWorker = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Worker',
      variant: 'info',
    });
    UserServices.deactivate(id)
      .then((res) => {
        console.log('Response', res);
        if (props.value) {
          const newWorkerRequests = props.value.filter((workerRequests) => workerRequests._id !== id);
          props.onChange(newWorkerRequests);
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
  const activateWorker = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Activating Worker',
      variant: 'info',
    });
    UserServices.activate(id)
      .then((res) => {
        console.log('Response', res);
        if (props.value) {
          const newWorkerRequests = props.value.filter((workerRequests) => workerRequests._id !== id);
          props.onChange(newWorkerRequests);
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
  const columns: GridColDef<User>[] = [
    {
      field: 'image',
      headerName: '',
      minWidth: 50,
      type: 'string',
      renderCell: ( ) => <Avatar />,
    },
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
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
            (props.row.status==UserLifeCycleStates.ACTIVE?(
              {
                id: 'deactivate',
                text: 'Deactivate',
                component: Link,
                icon: NoAccountsIcon,
                onClick: () => {
                  deactivateWorker(props.row._id);
                },
              }):({
              id: 'activate',
              text: 'Activate',
              component: Link,
              icon: PersonIcon,
              onClick: () => {
                activateWorker(props.row._id);
              },
            })),

          ]}
        />
      ),
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'workerCode', headerName: 'Worker Code', width: 170 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 70,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      field: 'lastName',
      headerName: 'Last Name:',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'missionaryOrNonMissionary',
      headerName: 'Field',
      width: 150,
      valueGetter: (params) =>params.row.basicDetails.field,
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 170,
      valueGetter: (params) => params.row.basicDetails.dateOfBirth?.format('dddd DD/MM/YYYY'),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      valueGetter: (params) => params.row.basicDetails.gender,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.dateOfBirth?.fromNow(true),
    },
    {
      field: 'martialStatus',
      headerName: 'Martial Status',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.martialStatus,
    },
    {

      field: 'highestQualification',
      headerName: 'Highest Qualification',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.highestQualification,
    },
    {
      field: 'motherToungue',
      headerName: 'Mother Toungue',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.motherTounge,
    },
    {

      field: 'communicationLanguage',
      headerName: 'Communication Language',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.communicationLanguage,
    },
    {
      field: 'languagesKnown',
      headerName: 'Languages Known',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.knownLanguages?.join(', '),
    },
    {
      field: 'email',
      headerName: 'Email Id',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.email,
    },
    {
      field: 'phone',
      headerName: 'Mobile Number',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.phone,
    },
    {
      field: 'alternativeMobileNumber',
      headerName: 'Alernative Mobile Number',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.alternativePhone,
    },
    {
      field: 'PANnumber',
      headerName: 'PAN Number',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.PANNo,
    },
    {
      field: 'aadhaarNumber',
      headerName: 'Aadhaar Number',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.aadhaar?.aadhaarNo,
    },
    {
      field: 'voterId',
      headerName: 'Voter Id',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.voterId?.voterIdNo,
    },
    {
      field: 'licenseNumber',
      headerName: 'License Number',
      width: 130,
      valueGetter: (params) => params.row.basicDetails.licenseNumber,
    },
  ];
  return (
    <>
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid
            rows={props.value ?? []}
            columns={columns}
            getRowId={(row) => row._id}
            loading={props.value===null}
          />
        </Card>
      </Grid>
    </>
  );
};

export default UsersList;
