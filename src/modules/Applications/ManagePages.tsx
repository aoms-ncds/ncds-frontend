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
import Applications from '.';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';

const ApplicationManagePages = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setaction] = useState<'add' | 'edit'>('add');
  const [editRequest, seteditRequest] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Request, setRequest] = useState<Application>({
    _id: '',
    name: '',
    reason: '',
    status: '',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   setRequest(() => ({
  //     _id: '',
  //     name: '',
  //     reason: '',
  //     status: '',
  //   }));
  // };
  const create = () => {
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Request' : 'Updating Request',
      variant: 'info',
    });
    ApplicationServices.create(Request)
      .then((res) => {
        console.log(res);
        handleClose();
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
        setRequest(() => ({
          _id: '',
          name: '',
          reason: '',
          status: '',
        }));
      })
      .catch((err) => {
        console.log(err);
        // if (err.error === "Duplicate entry") {
        //   setGroupExists(true);
        //   setActiveStep(0);
        // }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

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
    { field: '_id', headerName: 'SI NO', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];


  return (
    <CommonPageLayout title='Manage Staff' loadCount={loadCount}>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          handleClickOpen();
          setaction('add');
        }}
      >
          Add new
      </Button>
      <br/><br/>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '500px',
          },
        }}
      >
        <DialogTitle>
          {action === 'add' ? 'Add Request' : `Edit Request: ${editRequest} `}
        </DialogTitle>
        <DialogContent>
          <Container>
            <Grid container spacing={2}>
              <Grid item md={12}>
                {' '}
                <TextField
                  label="name"
                  value={Request.name}
                  onChange={(e) => {
                    setRequest(() => ({
                      ...Request,
                      name: e.target.value,
                    }));
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item md={12}>
                {' '}
                <TextField
                  label="Reason"
                  value={Request.name}
                  onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    setRequest(() => ({
                      ...Request,
                      name: e.target.value,
                    }));
                  }}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>


          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={create}>
            {action === 'add' ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={applications??[]} columns={columns} getRowId={(row) => row._id} loading={applications === null}/>
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};


export default ApplicationManagePages;
