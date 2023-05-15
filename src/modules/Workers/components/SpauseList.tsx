import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Button, Card, Grid, Typography } from '@mui/material';
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
const SpauseListPage = () => {
  const [spauseList, setSpauseList] = useState<Spause[]>();
  useEffect(() => {
    // loader.onLoad();
    WorkerServices.getSpause()
     .then((res) => {
       console.log(res);
       setSpauseList(res.data);
     })
    .catch((res) => {
      // loader.afterLoad();
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
          id='child action'
          primaryText='Actions'
          key={'child action'}
          items={[
            {
              id: 'View',
              text: 'View',
              component: Link,
              to: '/workers/editspause/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/workers/editspause/' + props.row._id,
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
    { field: 'secondName', headerName: 'Second Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 130 },
    { field: 'dob', headerName: 'Date of Birth', width: 130 },
    { field: 'age', headerName: 'Age', renderCell: (props: any) => (
      <p> {props.row.dob?.fromNow()}</p>
    ), width: 130 },
    { field: 'qualification', headerName: 'Qualification', width: 130 },
    { field: 'spauseOf', headerName: 'Spouse Of', renderCell: (props: any) => (
      <p> {props.row.spauseOf?.firstName}</p>
    ), width: 130 },


  ];
  return (
    <div>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/workers/addspause"
      >Add Spause</Button><br /><br />

      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={spauseList ?? []} columns={columns} getRowId={(row) => row._id} loading={spauseList === null} />
        </Card>

      </Grid></div>
  );
};

export default SpauseListPage;
