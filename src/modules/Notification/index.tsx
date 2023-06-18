import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Checkbox, FormControlLabel, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const MyMessagePage = () => {
  const [messages, setMessages] = useState<Message[]>();
  const [showReadMessages, setShowReadMessages] = useState(false);
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 180,
      type: 'string',
    //   renderCell: (props: GridRenderCellParams<string>) => {
    //     return (
    //       <Link
    //         to={`/messaging/${props.row._id}`}
    //         style={{ textDecoration: 'none'}}
    //       >
    //         {props.value}
    //       </Link>
    //     );
    //   },
    },

    {
      field: 'body',
      headerName: 'Body',
      minWidth: 180,
      type: 'string',
    //   renderCell: (props: GridRenderCellParams<string>) => {
    //     return (
    //       <Link
    //         to={`/messaging/${props.row._id}`}
    //         style={{ textDecoration: 'none', color: isDark ? '#fff' : '#000' }}
    //       >
    //         {props.value}
    //       </Link>
    //     );
    //   },
    },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 180,
      type: 'string',
    //   renderCell: (props: GridRenderCellParams<string>) => {
    //     return (
    //       <Link
    //         to={`/messaging/${props.row._id}`}
    //         style={{ textDecoration: 'none', color: isDark ? '#fff' : '#000' }}
    //       >
    //         {props.value}
    //       </Link>
    //     );
    //   },
    },
    {
      field: 'ref_url',
      headerName: 'Reference URL',
      minWidth: 180,
      type: 'string',
    //   renderCell: (props: GridRenderCellParams<string>) => {
    //     return (
    //       <Link
    //         to={`/messaging/${props.row._id}`}
    //         style={{ textDecoration: 'none', color: isDark ? '#fff' : '#000' }}
    //       >
    //         {props.value}
    //       </Link>
    //     );
    //   },
    },

    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 180,
      type: 'date',
    //   valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    //   renderCell: (props: GridRenderCellParams<string>) => {
    //     return (
    //       <Link
    //         to={`/messaging/${props.row._id}`}
    //         style={{ textDecoration: 'none', color: isDark ? '#fff' : '#000' }}
    //       >
    //         {props.value}
    //       </Link>
    //     );
    //   },
    },
    // ...(showReadMessages ? [] : [{
    //   field: 'button',
    //   headerName: 'Mark as Read',
    //   minWidth: 180,
    //   //   renderCell: (props: GridRenderCellParams<string, any, string>) => {
    //   //     return <Button
    //   //       variant='contained'
    //   //       onClick={() => {
    //   //         RESTClient.Messaging.markAsRead(props.row._id)
    //   //                         .then((res) => {
    //   //                           enqueueSnackbar({
    //   //                             message: 'Done',
    //   //                             variant: 'success',
    //   //                           });
    //   //                           const newMessages = messages?.filter((msg) => {
    //   //                             return msg._id !== props.row._id;
    //   //                           });
    //   //                           setMessages(newMessages);
    //   //                         })
    //   //                         .catch((err) => {
    //   //                           enqueueSnackbar({
    //   //                             message: err.message,
    //   //                             variant: 'error',
    //   //                           });
    //   //                         });
    //   //       }}

    //   //     >Mark as Read</Button>;
    //   //   },

    // }]),
  ];
  return (
    <CommonPageLayout title='Notifications' >
      <Grid item xs={12} md={12}>
        <Card style={{ height: '69vh', width: '100%' }}>
          <br />
          <Button sx={{ float: 'right' }} variant="outlined"
            //  onClick={() => {
            //                             RESTClient.Messaging.markAllAsRead()
            //                                 .then((res) => {
            //                                     setMessages([])

            //                                 })
            //                                 .catch((res) => {
            //                                     enqueueSnackbar({
            //                                         message: res.message,
            //                                         variant: "error"
            //                                     });
            //                                 })
            //                         }}
          >
                                Mark All as Read
          </Button>
          <br /><br />
          <FormControlLabel
            control={
              <Checkbox
                checked={showReadMessages}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setShowReadMessages(event.target.checked);
                }}
              />
            }
            label={showReadMessages ? 'Read Messages' : 'Unread Messages'}
            sx={{ float: 'right' }}
          />
          <br />
          <br /><br />
          <DataGrid style={{ height: '68vh', width: '100%' }}
            // components={{}}
            rows={messages ?? []}
            loading={!messages}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default MyMessagePage;
