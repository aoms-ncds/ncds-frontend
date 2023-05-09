import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import { useLoader } from '../../hooks/Loader';
import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../../components/MessageItem';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';

const ManageFrPage = () => {
  const loader = useLoader();
  const [FRRequests, setFRRequests] = useState<Frrequest[]|null>(null);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
  });

  useEffect(() => {
    loader.onLoad();
    FRServices.getAll()
   .then((res) => {
     loader.afterLoad();
     console.log(res);
     setFRRequests(res.data);
   })
  .catch((res) => {
    loader.afterLoad();
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
          id='FR action'
          primaryText='Actions'
          key={'FR action'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            {
              id: 'sendbackDivision',
              text: 'Send Back to Division',
              component: Link,
              to: '/sendbackDivision' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'remarks',
              text: 'Remarks',
              component: Link,
              // to: '/fr/view_FR/' + props.row._id,
              onClick: () => {
                toggleOpenRemarks(true);
                FRServices.getAllRemarksById(props.row._id)
                .then((res) => setRemarks(res.data))
                .catch((error) => {
                  enqueueSnackbar({
                    variant: 'error',
                    message: error.message,
                  });
                });
              },
              icon: EditIcon,
            },
            {
              id: 'print',
              text: 'Print FR',
              component: Link,
              to: '/view' + props.row._id,
              icon: PrintIcon,
            },
            {
              id: 'notification',
              text: 'Send notification',
              component: Link,
              to: '/view' + props.row._id,
              icon: MessageIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: `/edit/${props.row._id}/edit`,
              icon: EditIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: '/fr/view_FR/' + props.row._id,
              icon: PreviewIcon,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'FRno', headerName: 'FR No', width: 70 },
    { field: 'FRdate', headerName: 'FR Date', width: 130 },
    { field: 'divisionName', headerName: 'Division Name', width: 150 },
    { field: 'subdivisionName', headerName: 'Sub Division Name', width: 170 },
    { field: 'mainCategory', headerName: 'Main Category', width: 150 },
    { field: 'requestAmount', headerName: 'Requested Amount', width: 130 },
    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130 },
    { field: 'sanction', headerName: 'Special Sanction', width: 130 },
  ];


  return (
    <CommonPageLayout title='Manage FR'>
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/fr/apply"
        // onClick={() => {
        // }}
      >
          Add new
      </Button>
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={FRRequests??[]} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null}/>
        </Card>
      </Grid>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>
           Remarks
        </DialogTitle>
        <DialogContent>
          {remarks.map((remark) => (<MessageItem key={remark._id} sender={remark.createdBy.firstName + ' ' + remark.createdBy.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />))}

        </DialogContent>
        <DialogActions>

          <TextField
            id="remarkTextfield"
            placeholder="Remarks"
            multiline
            value={remark?.remark}
            onChange={(e) => setRemark((remark) => ({
              ...remark,
              remark: e.target.value,
            }))}
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <IconButton onClick={() => {
                  remark.remark?
                    FRServices.addRemarks(remark)
                    .then((res) => {
                      setRemarks((remarks) => [...remarks, res.data]);
                      setRemark((remark) => ({
                        ...remark,
                        remark: '',
                      }));
                    })
                .catch((error) => {
                  enqueueSnackbar({
                    variant: 'error',
                    message: error.message,
                  });
                }):'';
                }}><SendIcon /></IconButton>
              </InputAdornment>,
            }}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => toggleOpenRemarks(false)}
            // sx={{ ml: 'auto' }}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ManageFrPage;
