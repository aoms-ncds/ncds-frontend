import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Preview as PreviewIcon,
  Add as AddIcon,

} from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import GridLinkAction from '../../components/GridLinkAction';
import { Application } from './extras/ApplicationTypes';
import moment from 'moment';

const ApplicationManagePages = () => {
  const [applications, setApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    ApplicationServices.getAll()
      .then((res) =>{
        setApplications(res.data);
      })
      .catch((res: any) => {
        console.log(res);
      });
  }, []);
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridLinkAction key={1} to={`/application/manage/${params.id}`} label='View' icon={<PreviewIcon />} showInMenu />,

      ],
    },
    //   {
    //     field: '_manage',
    //     headerName: 'Action',
    //     minWidth: 50,
    //     type: 'string',
    //     renderCell: (props: any) => (
    //       <DropdownButton
    //         useIconButton={true}
    //         id="Application action"
    //         primaryText="Actions"
    //         key={'Application action'}
    //         items={[
    //           {
    //             id: 'view',
    //             text: 'View ',
    //             component: Link,
    //             to: '/application/manage/' + props.row._id,
    //             icon: PreviewIcon,
    //           },
    //           {
    //             id: 'Approve',
    //             text: 'Approve',
    //             component: Link,
    //             to: '/application/view_applicaton/' + props.row_id,
    //             icon: PreviewIcon,
    //           },
    //           {
    //             id: 'Reject',
    //             text: 'Reject',
    //             component: Link,
    //             to: '/application/view_applicaton/' + props.row_id,
    //             icon: PreviewIcon,
    //           },

    //         ]}
    //       />

    //     ),
    // },
    { field: '_id', headerName: 'SI NO', width: 250 },
    { field: 'name', headerName: 'name', width: 250 },
    { field: 'reason', headerName: 'Reason', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
  ];


  return (
    <CommonPageLayout title='Manage Staff'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/application/add"
      >
          Add new
      </Button>
      <br/><br/>

      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={applications??[]} columns={columns} getRowId={(row) => row._id} loading={applications === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};


export default ApplicationManagePages;
