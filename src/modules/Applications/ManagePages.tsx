import { Link } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
  Add as AddIcon,

} from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';

const ApplicationManagePages = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setaction] = useState<'add' | 'edit'>('add');
  const [open, setOpen] = React.useState(false);
  const [Request, setRequest] = useState<Application>({
    _id: '',
    name: '',
    reason: '',
    status: '',
  });

  useEffect(() => {
    setLoadCount((count) => count + 1);
    ApplicationServices.getAll()
      .then((res) =>{
        setLoadCount((count) => count - 1);
        console.log(res);
        setApplications(res.data);
      })
      .catch((res: any) => {
        setLoadCount((count) => count - 1);
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
    <CommonPageLayout title='Manage Staff' loadCount={loadCount}>
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
