import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import NotificationService from './extras/NotificationService';

const NotificationPage = () => {
  const [messages, setMessages] = useState<Message[]|null>(null);
  const [showReadMessages, setShowReadMessages] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(0);
  const columns: GridColDef<Message>[] = [
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 200,
      type: 'string',
      renderCell: (props) => {
        return (
          <Link to={`/notification/${props.row._id}`} style={{ textDecoration: 'none' }}>
            {props.value}
          </Link>
        );
      },
    },

    {
      field: 'body',
      headerName: 'Body',
      minWidth: 500,
      type: 'string',
      renderCell: (props) => {
        return (
          <Link to={`/notification/${props.row._id}`} style={{ textDecoration: 'none' }}>
            {props.value}
          </Link>
        );
      },
    },
    {
      field: 'type',
      headerName: 'Type',
      minWidth: 180,
      type: 'string',
      renderCell: (props) => {
        return (
          <Link to={`/notification/${props.row._id}`} style={{ textDecoration: 'none' }}>
            {props.value}
          </Link>
        );
      },
    },
    // {
    //   field: 'ref_url',
    //   headerName: 'Reference URL',
    //   minWidth: 180,
    //   type: 'string',
    //   renderCell: (props) => {
    //     return (
    //       <Link to={`/notification/${props.row._id}`} style={{ textDecoration: 'none' }}>
    //         {props.value}
    //       </Link>
    //     );
    //   },
    // },

    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 180,
      type: 'date',
      valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY'),
      renderCell: (props) => {
        return (
          <Link to={`/notification/${props.row._id}`} style={{ textDecoration: 'none' }}>
            {props.value}
          </Link>
        );
      },
    },
    // ...(showReadMessages ?
    //   [] :
    //   [
    //     {
    //       field: 'button',
    //       headerName: 'Mark as Read',
    //       minWidth: 180,
    //       renderCell: (props:<string, any, string>) => {
    //         return (
    //           <Button
    //             variant="contained"
    //             onClick={() => {
    //               RESTClient.Messaging.markAsRead(props.row._id)
    //                   .then((res) => {
    //                     enqueueSnackbar({
    //                       message: 'Done',
    //                       variant: 'success',
    //                     });
    //                     const newMessages = messages?.filter((msg) => {
    //                       return msg._id !== props.row._id;
    //                     });
    //                     setMessages(newMessages);
    //                   })
    //                   .catch((err) => {
    //                     enqueueSnackbar({
    //                       message: err.message,
    //                       variant: 'error',
    //                     });
    //                   });
    //             }}
    //           >
    //               Mark as Read
    //           </Button>
    //         );
    //       },
    //     },
    //   ]),
  ];

  useEffect(() => {
    setLoading((loading) => loading + 1);
    NotificationService.getMyMessages(showReadMessages)
        .then((res) => {
          console.log(res);
          setMessages(res.data);
        })
        .catch((res) => {
          console.log(res);
          enqueueSnackbar({
            message: res.message,
            variant: 'error',
          });
        });
  }, [showReadMessages]);
  return (
    <CommonPageLayout title="Notifications">
      <Grid item xs={12} md={12}>
        <Card style={{ height: '69vh', width: '100%' }}>
          <br />
          <Button
            sx={{ float: 'right' }}
            variant="outlined"
            onClick={() => {
              NotificationService.markAllAsRead()
                .then(() => {
                  setMessages([]);
                })
                .catch((res) => {
                  enqueueSnackbar({
                    message: res.message,
                    variant: 'error',
                  });
                });
            }}
          >
            Mark All as Read
          </Button>
          <br />
          <br />
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
          <br />
          <br />
          <DataGrid
            style={{ height: '68vh', width: '100%' }}
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

export default NotificationPage;
