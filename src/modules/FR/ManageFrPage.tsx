import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon,
  Add as AddIcon, Send as SendIcon, Close as CloseIcon, Download as DownloadIcon, Print as PrintIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
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
import FRReceiptTemplate from './components/FRReceiptTemplate';

const ManageFrPage = () => {
  const [FRRequests, setFRRequests] = useState<FR[] | null>(null);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [sendNotification, toggleSendNotification] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string|null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('y'),
    endDate: moment().endOf('y'),
    rangeType: 'years',
  });
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        // console.log(res, 'rr');
        setFRRequests(res.data.filter((fr)=>fr.FRdate.isSameOrAfter(dateRange.startDate)&&fr.FRdate.isSameOrBefore(dateRange.endDate)));
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        setFRRequests(res.data?.map((fr, index) => ({ ...fr, serialNumber: index + 1 })).filter((fr)=>fr.FRdate.isSameOrAfter(dateRange.startDate)&&fr.FRdate.isSameOrBefore(dateRange.endDate)));
      })
      .catch((res) => {
        console.log(res);
      });
  }, [dateRange]);
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

      // <GridLinkAction
      //   key={1}
      //   label="View And Manage"
      //   icon={<PreviewIcon />}
      //   showInMenu
      //   to={`/fr/${props.row._id}/view`}/>,
      // hasPermissions(['WRITE_FR']) &&
      // <GridLinkAction
      //   key={2}
      //   label="Edit"
      //   icon={<EditIcon />}
      //   showInMenu
      //   to={ `/fr/${props.row._id}/edit`}
      // />,
      // <GridLinkAction
      //   key={3}
      //   label="Send Back to Division"
      //   icon={<PreviewIcon />}
      //   showInMenu
      //   onClick={() => {
      //     enqueueSnackbar({
      //       message: 'Sent back to division',
      //       variant: 'success',
      //     });
      //   } } />,
      // <GridLinkAction
      //   key={4}
      //   label="Remarks"
      //   icon={<EditIcon />}
      //   showInMenu
      //   onClick={() => {
      //     toggleOpenRemarks(true);
      //     setSelectedFR(props.row._id);
      //     FRServices.getAllRemarksById(props.row._id)
      //         .then((res) => setRemarks(res.data ?? []))
      //         .catch((error) => {
      //           enqueueSnackbar({
      //             variant: 'error',
      //             message: error.message,
      //           });
      //         });
      //   } } />,
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
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            ...(hasPermissions(['WRITE_FR'])&& props.row.status==FRLifeCycleStates.FR_SEND_BACK ? [
              {
                id: 'edit',
                text: 'Edit',
                component: Link,
                to: `/fr/${props.row._id}/edit`,
                icon: EditIcon,
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
                  .then((res) => setRemarks(res.data??[]))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              icon: EditNoteIcon,
            },

            {
              id: 'print',
              text: 'Print FR',
              // component: PDFDownloadLink,
              document: <FRReceiptTemplate rowData={props.row as FR}/>,
              fileName: 'FRReceipt.pdf',
              icon: PrintIcon,
            },
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedFR(props.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
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
      renderHeader: () => (<b>FR No</b>),
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'FRdate',
      renderHeader: () => (<b>FR Date</b>),
      renderCell: (props) => (<p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
      ), width: 80, align: 'center', headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>
      ),
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'mainCategory',
      renderHeader: () => (<b>Main Category</b>),
      width: 240,
      align: 'center',
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
      field: 'requestedAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 150,
      align: 'center', headerAlign: 'center',
      valueGetter(params) {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return particularAmount;
      },
    },

    {
      field: 'updatedAt',
      renderHeader: () => (<b>Last Updated</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sanctionedAsPer',
      renderHeader: () => (<b>Special Sanction</b>),
      renderCell: (props) => (
        <p style={{
          maxWidth: 200,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          justifyContent: 'center',
          textAlign: 'center',
        }}> {props.row.sanctionedAsPer}</p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      width: 205,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 250,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
        </p>
      ),
      // valueGetter: (params) => {
      //   return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
      // },
    },

  ];

  return (
    <CommonPageLayout title="Manage FR"
      momentFilter={{
        dateRange: dateRange,
        onChange: (newDateRange) => {
          setDateRange(newDateRange);
          setFRRequests((fr)=>
            fr?fr.filter((fr)=>fr.FRdate.isSameOrAfter(newDateRange.startDate)&&fr.FRdate.isSameOrBefore(newDateRange.endDate)):[],
          );
        },
        rangeTypes: [
          'weeks',
          'months',
          'quarter_years',
          'years',
          'customRange',
          'customDay',
        ],
        initialRange: 'years',
      }}>

      <PermissionChecks
        permissions={['READ_FR']}
        granted={(
          <>
            <Grid item xs={12} lg={6}>

              <Grid item xs={12} md={12}>
                <Card >
                  <Grid container spacing={2} >

                    <Grid item xs={12} sx={{ px: 2 }}>
                      <br />
                      <PermissionChecks
                        permissions={['MANAGE_FR']}
                        granted={(
                          <Button
                            onClick={async () => {
                              const sheet =
                    FRRequests ?
                      FRRequests.map((fr:FR) => ([
                        fr.FRno,
                        fr.FRdate.format('DD/MM/YYYY'),
                        fr.division?.details.name,
                        fr.purposeSubdivision?.name,
                        fr.mainCategory,
                        fr.particulars?.reduce(
                          (total, particular) => total + Number(particular.requestedAmount),
                          0,
                        ),
                        fr.sanctionedAmount,
                        fr.sanctionedBank,
                        fr.sanctionedAsPer,
                        IROLifeCycleStates.getStatusNameByCodeTransaction(fr.status).replaceAll('_', ' '),
                      ])) :
                      [];
                              const headers=[
                                'FR No',
                                'Date',
                                'Division',
                                'Sub Division',
                                'Main Category',
                                'Requested Amt',
                                'Sanctioned Amt',
                                'Sanctioned Bank',
                                'Sanctioned As per',
                                'Status',
                              ];
                              const worksheet = XLSX.utils.json_to_sheet(sheet);
                              const workbook = XLSX.utils.book_new();
                              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                              XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                              XLSX.writeFile(workbook, 'FRReport.xlsx', { compression: true });
                            }}
                            startIcon={<DownloadIcon />}
                            color="primary" sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                            variant="contained"
                          >
                              Export
                          </Button>)}/>

                      <PermissionChecks
                        permissions={['WRITE_FR']}
                        granted={(
                          <>

                            <Button
                              variant="contained"
                              sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                              startIcon={<AddIcon />}
                              component={Link}
                              to="/fr/apply"
                            // onClick={() => {
                            // }}
                            >
                     Add new
                            </Button>
                          </>
                        )}
                      />
                      <br />
                      <br />


                    </Grid>
                  </Grid>
                  <DataGrid rows={FRRequests ?? []} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null} style={{ height: '70vh', width: '100%' }} />
                </Card>
              </Grid>
              <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }}>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>


                  <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }} >

                    <Grid item>
                      <Typography variant='h6' fontWeight={700} sx={{ textAlign: 'center' }} >Send Notifications</Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color='success'
                        sx={{ width: 260 }}

                        onClick={
                          ()=> {
                            FRServices.sendNotifications('president', selectedFR??'')
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((res) => {
                              console.log(res);
                            });
                          }
                        }
                        endIcon={<SendIcon/>}
                      > Send to President</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color='info'
                        sx={{ width: 260 }}

                        onClick={
                          ()=> {
                            FRServices.sendNotifications('accounts', selectedFR??'')
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((res) => {
                            console.log(res);
                          });
                          }
                        }
                        endIcon={<SendIcon/>}
                      >  Send to accounts</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color='inherit'
                        sx={{ width: 260 }}
                        onClick={
                          ()=> {
                            FRServices.sendNotifications('division_head', selectedFR??'')
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((res) => {
                            console.log(res);
                          });
                          }
                        }
                        endIcon={<SendIcon/>}
                      >  Send to division head</Button>
                      <br/><br/>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          toggleSendNotification(false);
                          setSelectedFR(null);
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon/>}
                      >
                      close
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
                  )):'No Data Found '}
                </DialogContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (remark.remark) {
                      FRServices.addRemarks(remark)
        .then((res) => {
          const x = [...remarks, res.data];
          console.log('🚀 ~ file: ManageFrPage.tsx:201 ~ .then ~ x:', x);

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
                          FR: selectedFR??'',
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
            close
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Grid>
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


    </CommonPageLayout>
  );
};

export default ManageFrPage;
