import React from 'react';
import DropdownButton from '../../../components/DropDownButton';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, NoAccounts as NoAccountsIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Avatar, Card, Grid } from '@mui/material';
import StaffServices from '../../HR/extras/StaffServices';
import UserLifeCycleStates from '../extras/UserLifeCycleStates';
import WorkersServices from '../../Workers/extras/WorkersServices';

const UsersList = <StaffOrWorker extends User>(props: FormComponentProps<StaffOrWorker[], { kind: UserKind }>) => {
  const StaffOrWorkerServices = props.options?.kind === 'staff' ? StaffServices : WorkersServices;

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

  const deactivateWorker = (id: string) => {
    console.log('hey', id);
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Worker',
      variant: 'info',
    });
    StaffOrWorkerServices.deactivate(id)
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
    StaffOrWorkerServices.activate(id)
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
  const columns: GridColDef<StaffOrWorker>[] = [
    {
      field: 'image',
      headerName: '',
      width: 25,
      type: 'string',
      renderCell: () => <Avatar />,
    },
    {
      field: '_manage',
      headerName: 'Action',
      width: 65,
      type: 'string',
      renderCell: (renderCellParams) => (
        <DropdownButton
          useIconButton={true}
          id="user action"
          primaryText="Actions"
          key={'User action'}
          items={[
            {
              id: 'View',
              text: 'View',
              component: Link,
              to: `/users/${props.options?.kind}/${renderCellParams.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: `/${props.options?.kind == 'worker' ? 'workers' : 'hr'}/edit/${renderCellParams.row._id}`,
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
            renderCellParams.row.status == UserLifeCycleStates.ACTIVE ?
              {
                id: 'deactivate',
                text: 'Deactivate',
                component: Link,
                icon: NoAccountsIcon,
                onClick: () => {
                  deactivateWorker(renderCellParams.row._id);
                },
              } :
              {
                id: 'activate',
                text: 'Activate',
                component: Link,
                icon: PersonIcon,
                onClick: () => {
                  activateWorker(renderCellParams.row._id);
                },
              },
          ]}
        />
      ),
    },
    // { field: '_id', headerName: 'SI No', width: 70 },
    { field: `${props.options?.kind}Code`, headerName: 'Worker Code', width: 120 },
    {
      field: 'firstName',
      headerName: 'First Name',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    {
      field: 'martialStatus',
      headerName: 'Martial Status',
      align: 'center',
      // width: 130,
      valueGetter: (params) => params.row.basicDetails.martialStatus,
    },
    {
      field: 'dob',
      headerName: 'DOB',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.dateOfBirth?.format('DD/MM/YYYY'),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 70,
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.gender,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.dateOfBirth?.fromNow(true),
    },
    {
      field: 'missionaryOrNonMissionary',
      headerName: 'Field',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.field,
    },

    // {
    //   field: 'highestQualification',
    //   headerName: 'Highest Qualification',
    //   width: 160,
    //   valueGetter: (params) => params.row.basicDetails.highestQualification,
    // },
    // {
    //   field: 'motherTongue',
    //   headerName: 'Mother Tongue',
    //   width: 130,
    //   valueGetter: (params) => params.row.basicDetails.motherTongue,
    // },
    // {
    //   field: 'communicationLanguage',
    //   headerName: 'Communication Language',
    //   width: 185,
    //   valueGetter: (params) => params.row.basicDetails.communicationLanguage,
    // },
    // {
    //   field: 'languagesKnown',
    //   headerName: 'Languages Known',
    //   width: 140,
    //   valueGetter: (params) => params.row.basicDetails.knownLanguages?.join(', '),
    // },
    {
      field: 'phone',
      headerName: 'Mobile Number',
      width: 130,
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.phone,
    },
    {
      field: 'alternativeMobileNumber',
      headerName: 'Alernative Mobile Number',
      width: 180,
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.alternativePhone,
    },
    {
      field: 'email',
      headerName: 'Email Id',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.basicDetails.email,
    },
    // {
    //   field: 'PANnumber',
    //   headerName: 'PAN Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.PANNo,
    // },
    // {
    //   field: 'aadhaarNumber',
    //   headerName: 'Aadhaar Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.aadhaar?.aadhaarNo,
    // },
    // {
    //   field: 'voterId',
    //   headerName: 'Voter Id',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.voterId?.voterIdNo,
    // },
    // {
    //   field: 'licenseNumber',
    //   headerName: 'License Number',
    //   // width: 130,
    //   valueGetter: (params) => params.row.basicDetails.licenseNumber,
    // },
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
            loading={props.value === null}
          />
        </Card>
      </Grid>
    </>
  );
};

export default UsersList;
