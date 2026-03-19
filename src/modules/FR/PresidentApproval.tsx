/* eslint-disable max-len */
import { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Send as SendIcon, Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../../components/MessageItem';
import { enqueueSnackbar } from 'notistack';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import * as XLSX from 'xlsx';
import moment from 'moment';
import TransactionLogDialog from './components/TransactionLogDialog';

const PresidentApproval = () => {
  const [FRRequests, setFRRequests] = useState<FR[] | null>(null);
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| null>('All'); // default WFA: Waiting for access or Reverted

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [sendNotification, toggleSendNotification] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [frId, setFRId] = useState('');
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const filteredRows = (FRRequests ?? []).filter((row) => {
    if ((row.FRno && row.FRno?.toLowerCase().includes(searchText?.toLowerCase())) ||
    (row.FRdate && row.FRdate.format('DD/MM/YYYY').toLowerCase().includes(searchText?.toLowerCase()))||
    // (row.particulars[0]?.subCategory1 && row.particulars[0]?.subCategory1.toLowerCase().includes(searchText.toLowerCase())) ||
    //   (row.particulars[0]?.subCategory2 && row.particulars[0]?.subCategory2.toLowerCase().includes(searchText.toLowerCase())) ||
    //   (row.particulars[0]?.subCategory3 && row.particulars[0]?.subCategory3.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.division?.details.name && row.division?.details.name.toLowerCase().includes(searchText.toLowerCase()))
    ) {
      return true;
    }
    return Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase()));
  });
  if (searchText && filteredRows.length ===0) {
    enqueueSnackbar({
      message: ` ${searchText} not found`,
      variant: 'warning',
    });
  }

  useEffect(() => {
    FRServices.getAllOptimized({ dateRange: dateRange, status: [FRLifeCycleStates.WAITING_FOR_PRESIDENT]})
      .then((res) => {
        setFRRequests(res.data?.map((fr, index) => ({ ...fr, serialNumber: index + 1 })));
      })
      .catch((res) => {
        console.log(res);
      });
  }, [dateRange]);
  useEffect(() => {
    FRServices.getAllOptimizedExSupprt({ dateRange: dateRange, status: [FRLifeCycleStates.WAITING_FOR_PRESIDENT], support: statusFilter1 })
      .then((res) => {
        setFRRequests(res.data?.map((fr, index) => ({ ...fr, serialNumber: index + 1 })));
      })
      .catch((res) => {
        console.log(res);
      });
  }, [statusFilter1]);
  const columns: GridColDef<FR>[] = [
    {
      field: '_manage',
      headerName: '',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      // getActions: (props: GridRowParams) => (
      //       [

      //         <GridLinkAction
      //           key={1}
      //           label="View And Manage"
      //           icon={<PreviewIcon />}
      //           showInMenu
      //           to={`/fr/${props.row._id}/view`}/>,
      //         hasPermissions(['WRITE_FR']) &&
      //         <GridLinkAction
      //           key={2}
      //           label="Edit"
      //           icon={<EditIcon />}
      //           showInMenu
      //           to={ `/fr/${props.row._id}/edit`}
      //         />,
      //         <GridLinkAction
      //           key={3}
      //           label="Send Back to Division"
      //           icon={<PreviewIcon />}
      //           showInMenu
      //           onClick={() => {
      //             enqueueSnackbar({
      //               message: 'Sent back to division',
      //               variant: 'success',
      //             });
      //           } } />,
      //         <GridLinkAction
      //           key={4}
      //           label="Remarks"
      //           icon={<EditIcon />}
      //           showInMenu
      //           onClick={() => {
      //             toggleOpenRemarks(true);
      //             setSelectedFR(props.row._id);
      //             FRServices.getAllRemarksById(props.row._id)
      //                 .then((res) => setRemarks(res.data ?? []))
      //                 .catch((error) => {
      //                   enqueueSnackbar({
      //                     variant: 'error',
      //                     message: error.message,
      //                   });
      //                 });
      //           } } />,
      //         <GridLinkAction
      //           key={5}
      //           label="Print FR"
      //           icon={<PrintIcon />}
      //           component={ PDFDownloadLink,}
      //           document={ <FRReceiptTemplate rowData={props.row}/>},
      //           showInMenu />,
      //         false,
      //       ].filter((action) => action !== false) as JSX.Element[]
      // ),
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="FR action"
          primaryText="Actions"
          key={'FR action'}

          items={[

            {
              id: 'View',
              text: 'View And Manage',
              // component: Link,
              // to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
              onClick: () => {
                window.open( `/fr/${props.row._id}/view`, '_blank');
              },
            },
            ...(hasPermissions(['WRITE_FR']) && props.row.status == FRLifeCycleStates.FR_SEND_BACK ? [
              {
                id: 'edit',
                text: 'Edit',
                // component: Link,
                // to: `/fr/${props.row._id}/edit`,
                icon: EditIcon,
                onClick: () => {
                  window.open(`/fr/${props.row._id}/edit`, '_blank');
                },
              },
            ] : []),
            // {
            //   id: 'sendBackDivision1',
            //   text: 'Send Back to Division',
            //   onClick: () => {
            //     enqueueSnackbar({
            //       message: 'Sent back to division',
            //       variant: 'success',
            //     });
            //   },
            //   icon: PreviewIcon,
            // },
            {
              id: 'remarks',
              text: 'Remarks',
              component: Link,
              // to: '/fr/view_FR/' + props.row._id,
              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedFR(props.row._id);
                FRServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              icon: EditNoteIcon,
            },

            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   document: <FRReceiptTemplate rowData={props.row} />,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedFR(props.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
            },
            {
              id: 'log',
              text: 'FR Log',
              icon: PreviewIcon,
              onClick: () => {
                setFRId(props.row._id);
                setOpenLog(true);
              },
            },

          ]}
        />
      ),
    },

    // {
    //   field: 'serialNumber',
    //   renderHeader: () => (<b>SL No</b>),
    //   width: 100,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'FRno',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => (<b>FR No</b>),
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'FRdate',
    //   renderHeader: () => (<b>FR Date</b>),
    //   renderCell: (props) => (<p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    //   ), width: 80, align: 'center', headerAlign: 'center',
    // },
    {
      field: 'FRdate',
      headerClassName: 'super-app-theme--cell',
      headerName: 'FRdate',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'divisionName',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => (<b>Division Name</b>),
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'subDivisionName',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
    //   width: 160,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
    {
      field: 'sub_division',
      width: 130,
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,
    },
    {
      field: 'mainCategory',
      renderHeader: () => (<b>Main Category</b>),
      width: 240,
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {props.row.mainCategory}
        </p>
      ),
    },
    {
      field: 'subCategory',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Category</b>,
      width: 240,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        const subCategory3 = params.row.particulars[0]?.subCategory3;
        const subCategory2 = params.row.particulars[0]?.subCategory2;
        const subCategory1 = params.row.particulars[0]?.subCategory1;
        if (subCategory3 && subCategory3 !== 'Select' && subCategory3 !== '') {
          return subCategory3;
        } else if (subCategory2 && subCategory2 !== 'Select' && subCategory2 !== '') {
          return subCategory2;
        } else {
          return subCategory1;
        }
      },
      renderCell: (params) => {
        return (
          <p
            style={{
              maxWidth: 240,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {params.value}
          </p>
        );
      },
    },
    {
      field: 'requestedAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 150,
      headerClassName: 'super-app-theme--cell',
      align: 'center', headerAlign: 'center',
      valueGetter(params) {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return particularAmount.toFixed(2);
      },
    },

    // {
    //   field: 'updatedAt',
    //   renderHeader: () => (<b>Last Updated</b>),
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   width: 130,
    //   align: 'center',
    //   headerClassName: 'super-app-theme--cell',
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'sanctionedAsPer',
    //   renderHeader: () => (<b>Special Sanction</b>),
    //   renderCell: (props) => (
    //     <p style={{
    //       maxWidth: 200,
    //       whiteSpace: 'normal',
    //       wordBreak: 'break-word',
    //       justifyContent: 'center',
    //       textAlign: 'center',
    //     }}> {props.row.sanctionedAsPer?.toString()}</p>
    //   ),
    //   width: 200,
    //   align: 'center',
    //   headerClassName: 'super-app-theme--cell',
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'status',
    //   renderHeader: () => (<b>Status</b>),
    //   width: 250,
    //   align: 'center',
    //   headerClassName: 'super-app-theme--cell',
    //   headerAlign: 'center',
    //   // renderCell: (props) => (
    //   //   <p
    //   //     style={{
    //   //       maxWidth: 250,
    //   //       whiteSpace: 'normal',
    //   //       wordBreak: 'break-word',
    //   //     }}
    //   //   >
    //   //     {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
    //   //   </p>
    //   // ),
    //   valueGetter: (params) => {
    //     return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
    //   },
    // },
    // {
    //   field: 'updatedAt',
    //   renderHeader: () => (<b>Last Updated</b>),
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   width: 130,
    //   align: 'center',
    //   headerClassName: 'super-app-theme--cell',
    //   headerAlign: 'center',
    // },

  ];

  return (
    <CommonPageLayout title="President Verify" momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setFRRequests((fr) => (fr ? fr.filter((fr) => fr.FRdate.isSameOrAfter(newDateRange.startDate) && fr.FRdate.isSameOrBefore(newDateRange.endDate)) : []));
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>
      <PermissionChecks
        permissions={['READ_FR']}
        granted={(
          <>
            <Card sx={{ Width: '100%', height: '85vh', alignItems: 'center' }}>
              <Grid container padding={2} p={2}>
                <Grid item xs={6} p={1}>
                  {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    placeholder='Enter FRno or FRDate or Division or SubCategory'
                    onChange={handleSearchChange}
                    fullWidth
                    // style={{ width: '80%' }}
                  />
                  {/* </div> */}
                </Grid>
                <Grid item xs={6} p={1} display="flex" justifyContent="flex-end" alignItems="center">
                  {/* <Card elevation={2}>
                    <CardContent> */}
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{
                      flexWrap: { xs: 'wrap', md: 'nowrap' },
                    }}
                  >
                    {/* STATUS */}
                    <Grid item xs={12} md={12}>
                      <ToggleButtonGroup
                        fullWidth
                        exclusive
                        size="small"
                        value={statusFilter1}
                        onChange={(_, val) => val && setStatusFilter1(val)}
                      >
                        {/* <ToggleButton value="Resubmitted">Re-Submitted</ToggleButton> */}
                        <ToggleButton value="Support">Support</ToggleButton>
                        <ToggleButton value="Expanse">Expense</ToggleButton>
                        <ToggleButton value="All">Both</ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>

                    {/* CATEGORY */}
                  </Grid>
                  {/* </CardContent> */}
                  {/* </Card> */}
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box sx={{
                    'height': 400,
                    'width': '100%',
                    '& .super-app-theme--cell': {
                      backgroundColor: '#f1f5fa',
                      color: 'black',
                      fontWeight: '600',
                    },
                    '& .super-app.negative': {
                      backgroundColor: 'rgba(157, 255, 118, 0.49)',
                      color: '#1a3e72',
                      fontWeight: '600',
                    },
                    '& .super-app.positive': {
                      backgroundColor: '#d47483',
                      color: '#1a3e72',
                      fontWeight: '600',
                    },
                    '& .even': {
                      backgroundColor: '#DEDAFF', // Change to red for even rows
                    },
                    '& .odd': {
                      backgroundColor: '#fff', // Change to blue for odd rows
                    },
                  }}
                  >

                    <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null} style={{ height: '70vh', width: '100%' }} getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    } />
                  </Box>
                </Grid>
              </Grid>
            </Card>

            <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }}>
              <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }} >
                  <Grid item>
                    <Typography variant='h6' fontWeight={700} sx={{ textAlign: 'center' }} >Send Notifications</Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color='success'
                      sx={{ width: 260 }}
                      onClick={
                        () => {
                          FRServices.sendNotifications('president', selectedFR ?? '')
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                        }
                      }
                      endIcon={<SendIcon />}
                    > Send to President</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color='info'
                      sx={{ width: 260 }}
                      onClick={
                        () => {
                          FRServices.sendNotifications('accounts', selectedFR ?? '')
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                        }
                      }
                      endIcon={<SendIcon />}
                    >  Send to accounts</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color='inherit'
                      sx={{ width: 260 }}
                      onClick={
                        () => {
                          FRServices.sendNotifications('division_head', selectedFR ?? '')
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((res) => {
                                console.log(res);
                              });
                        }
                      }
                      endIcon={<SendIcon />}
                    >  Send to division head</Button>
                    <br /><br />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        toggleSendNotification(false);
                        setSelectedFR(null);
                      }}
                      sx={{ marginBottom: 3, width: 260 }}
                      endIcon={<CloseIcon />}
                    >
                        Close
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12}>
                        <Button variant="contained" color='inherit'> Send to division head</Button>

                      </Grid> */}

                </Grid>
              </DialogContent>

            </Dialog>
            <Dialog open={openRemarks} fullWidth maxWidth="md">
              <DialogTitle>Remarks</DialogTitle>
              <DialogContent>
                {remarks.length > 0 ? remarks.map((remark) => (
                  // eslint-disable-next-line max-len
                  <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
                )) : 'No Data Found '}
              </DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (remark.remark) {
                    FRServices.addRemarks(remark)
                        .then((res) => {
                          const x = [...remarks, res.data];
                          console.log('🚀 ~ file: PresidentApproval.tsx:201 ~ .then ~ x:', x);

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
                        });
                  }
                }}
              >
                <DialogActions>
                  <TextField
                    id="remarkTextfield"
                    placeholder="Remarks"
                    multiline
                    value={remark?.remark}
                    onChange={(e) =>
                      setRemark((remark) => ({
                        ...remark,
                        FR: selectedFR ?? '',
                        remark: e.target.value,
                      }))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton type='submit'
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
                    onClick={() => {
                      toggleOpenRemarks(false);
                      setSelectedFR(null);
                    }}
                    // sx={{ ml: 'auto' }}
                  >
                      Close
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        )}
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity='error'>
              Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />

      {frId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={frId}/>}

    </CommonPageLayout>
  );
};

export default PresidentApproval;
