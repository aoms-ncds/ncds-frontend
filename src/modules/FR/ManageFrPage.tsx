import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Add as AddIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../../components/MessageItem';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';

const ManageFrPage = () => {
  const [FRRequests, setFRRequests] = useState<Frrequest[] | null>(null);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
  });
  const [particulars, setParticulars] = useState<Particular[]>([]);

  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        console.log(res);
        setFRRequests(res.data);
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
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            {
              id: 'sendbackDivision',
              text: 'Send Back to Division',
              onClick: () => {
                enqueueSnackbar({
                  message: 'Sent back to divison',
                  variant: 'success',
                });
              },
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
              to: `/fr/${props.row._id}/edit`,
              icon: EditIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: '_id', headerName: 'FR No', width: 70 },
    { field: 'FRdate', headerName: 'FR Date', renderCell: (props: any) => (
      <p> {props.row.date}</p>
    ), width: 130 },
    { field: 'divisionName', headerName: 'Division Name', renderCell: (props: any) => (
      <p> {props.row.purposeDivision?.details.name}</p>
    ), width: 130 },
    { field: 'subDivisionName', headerName: 'Sub Division Name', renderCell: (props: any) => (
      <p> {props.row.purposeSubdivision?.name}</p>
    ), width: 130 },
    { field: 'mainCategory', headerName: 'Main Category', renderCell: (props: any) => (
      <p> {props.row.mainCategory}</p>
    ), width: 130 },
    {
      field: 'requestedAmount',
      headerName: 'Requested Amount',
      width: 130,
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as Frrequest;
        const particularAmount = frRequest.Particulars.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },

    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130 },
    { field: 'sanctionedAsPer', headerName: 'Special Sanction', renderCell: (props: any) => (
      <p> {props.row.sanctionedAsPer}</p>
    ), width: 130 },
  ];

  return (
    <CommonPageLayout title="Manage FR">
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
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={FRRequests ?? []} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null} />
        </Card>
      </Grid>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.map((remark) => (
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
          ))}
        </DialogContent>
        <DialogActions>
          <TextField
            id="remarkTextfield"
            placeholder="Remarks"
            multiline
            value={remark?.remark}
            onChange={(e) =>
              setRemark((remark) => ({
                ...remark,
                remark: e.target.value,
              }))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      remark.remark ?
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
                            }) :
                        '';
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
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
