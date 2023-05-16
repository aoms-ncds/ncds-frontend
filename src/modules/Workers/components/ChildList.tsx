import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Avatar, Button, Card, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import DropdownButton from '../../../components/DropDownButton';
import { useLoader } from '../../../hooks/Loader';
import WorkerServices from '../extras/WorkersServices';
import { DataGrid } from '@mui/x-data-grid';
const ChildListPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const loader = useLoader();
  const [childList, setChildList] = useState<Child[]>();
  useEffect(() => {
    loader.onLoad();
    WorkerServices.getChild()
     .then((res) => {
       loader.afterLoad();
       console.log(res);
       setChildList(res.data);
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
              to: '/workers/childedit/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/workers/childedit/' + props.row._id,
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
    { field: 'secondName', headerName: 'Last Name:', width: 130 },
    { field: 'dob', headerName: 'DOB', width: 170 },
    { field: 'age', headerName: 'Age', renderCell: (props: any) => (
      <p> {props.row.dob?.fromNow()}</p>
    ), width: 130 },
    { field: 'childSupport', headerName: 'Child Support', width: 130 },
    { field: 'childOf', headerName: 'Child Of', renderCell: (props: any) => (
      <p> {props.row.childOf?.firstName}</p>
    ), width: 130 },


  ];
  return (
    <div>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/workers/addchild"
      >Add Child</Button><br /><br />

      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={childList ?? []} columns={columns} getRowId={(row) => row._id} loading={childList === null} />
        </Card>

      </Grid></div>
  );
};

export default ChildListPage;
