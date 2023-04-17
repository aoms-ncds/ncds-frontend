import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Link,

} from '@mui/icons-material';
import { Button, Card, Grid } from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid } from '@mui/x-data-grid';
const ManageFrPage = () => {
  const [Frrequests, setFrrequests] = useState<Frrequest[]>();
  useEffect(() => {
    FRServices.getRequests()
   .then((res) => {
     console.log(res);
     setFrrequests(res.data);
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
          id="FR action"
          primaryText="Actions"
          key={'FR action'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              to: '/view' + props.row._id,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'Frno', headerName: 'FR No', width: 70 },
    { field: 'Frdate', headerName: 'FR Date', width: 130 },
    { field: 'Division_name', headerName: 'Division Name', width: 150 },
    { field: 'Subdivision_name', headerName: 'Sub Division Name', width: 170 },
    { field: 'Main_category', headerName: 'Main Category', width: 150 },
    { field: 'Request_amount', headerName: 'Requested Amount', width: 130 },
    { field: 'Lastupdate_date', headerName: 'Last Updated', width: 130 },
    { field: 'Status', headerName: 'Status', width: 130 },
  ];
  return (
    <CommonPageLayout title='Manage FR'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        // onClick={() => {
        // }}
      >
          Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={Frrequests??[]} columns={columns} getRowId={(row) => row._id}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ManageFrPage;
