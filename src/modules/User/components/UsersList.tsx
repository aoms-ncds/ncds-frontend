import React from 'react';
import DropdownButton from '../../../components/DropDownButton';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import WorkerServices from '../../Workers/extras/WorkersServices';
import { Avatar, Card, Grid } from '@mui/material';
import StaffServices from '../../HR/extras/StaffServices';

const UsersList = <StaffOrWorker extends User >(props:FormComponentProps<StaffOrWorker[], {kind: UserKind}>) => {
  const StaffOrWorkerServices = props.options?.kind === 'staff' ? StaffServices : WorkerServices;

  const execDelete = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: `Removing ${props.options?.kind}`,
      variant: 'info',
    });

    StaffOrWorkerServices.delete(id)
      .then((res) => {
        if (props.value) {
          props.onChange(props.value.filter((user) => user._id !== id));
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({ message: res.message, variant: 'success' });
      })
      .catch((err) => {
        closeSnackbar(snackbarId);
        enqueueSnackbar({ message: err.message, variant: 'error' });
      });
  };

  const columns: GridColDef<StaffOrWorker>[] = [
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
      renderCell: (renderCellParams) => (
        <DropdownButton
          useIconButton={true}
          id='user action'
          primaryText='Actions'
          key={'User action'}
          items={[
            {
              id: 'View',
              text: 'View',
              component: Link,
              to: `/${props.options?.kind}s/profile/${renderCellParams.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: `/${props.options?.kind}s/edit/${renderCellParams.row._id}`,
              icon: EditIcon,
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                execDelete(renderCellParams.row._id);
              },
            },
          ]}
        />
      ),
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    { field: `${props.options?.kind}Code`, headerName: `${props.options?.kind} Code`, width: 170 },
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
            loading={props.value.length===0}
          />
        </Card>
      </Grid>
    </>
  );
};

export default UsersList;
