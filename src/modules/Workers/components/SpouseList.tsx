import React, { useEffect, useState } from 'react';
import { Button, Card, Grid } from '@mui/material';
import DropdownButton from '../../../components/DropDownButton';
import WorkerServices from '../extras/WorkersServices';
import { Link } from 'react-router-dom';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
const SpouseListPage = () => {
  const [spouseList, setSpouseList] = useState<Spouse[]>();
  useEffect(() => {
    WorkerServices.getSpouse()
     .then((res) => {
       console.log(res);
       setSpouseList(res.data);
     })
    .catch((res) => {
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
          id='Spouse action'
          primaryText='Actions'
          key={'Spouse action'}
          items={[
            {
              id: 'View',
              text: 'View',
              component: Link,
              to: '/workers/editspouse/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/workers/editspouse/' + props.row._id,
              icon: EditIcon,
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                // removeWorker(props.row._id);
              },
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 70 },
    { field: 'lastName', headerName: 'Last Name:', width: 130 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 130 },
    { field: 'dob', headerName: 'Date of Birth', width: 130 },
    { field: 'age', headerName: 'Age', renderCell: (props: any) => (
      <p> {props.row.dob?.fromNow()}</p>
    ), width: 130 },
    { field: 'qualification', headerName: 'Qualification', width: 130 },
    { field: 'spouseOf', headerName: 'Spouse Of', renderCell: (props: any) => (
      <p> {props.row.spouseOf?.firstName}</p>
    ), width: 130 },


  ];
  return (
    <div>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/workers/addspouse"
      >Add Spouse</Button><br /><br />

      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={spouseList ?? []} columns={columns} getRowId={(row) => row._id} loading={spouseList === null} />
        </Card>

      </Grid></div>
  );
};

export default SpouseListPage;
