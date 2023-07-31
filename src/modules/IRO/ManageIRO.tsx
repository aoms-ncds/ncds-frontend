import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Alert, Typography, Divider, Avatar } from '@mui/material';
// eslint-disable-next-line max-len
import {
  Print as PrintIcon,
  AttachFile as AttachmentIcon,
  Edit as EditIcon,
  Preview as PreviewIcon,
  AttachMoney as AttachMoneyIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Close as CloseIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { enqueueSnackbar } from 'notistack';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import IROServices from './extras/IROServices';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import moment from 'moment';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import ReleaseAmount from './ReleaseAmount';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ManageIRO = (props: { action: 'manage' | 'release' }) => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [showHRFileUploader, setShowHRFileUploader] = useState(false);
  const [showAccountFileUploader, setShowAccountFileUploader] = useState(false);
  const [showAccountManagerFileUploader, setShowAccountManagerFileUploader] = useState(false);
  const [attachment, setAttachment] = useState<boolean>(false);
  const [sendNotification, toggleSendNotification] = useState<boolean>(false);
  const [releaseAmountIROs, setReleaseAmountIROs] = useState<IROrder[]>([]);
  const [addSignature, toggleAddSignature] = useState(false);

  const [selectedIRO, setSelectedIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: '',
    status: CommonLifeCycleStates.ACTIVE,
    kind: 'IRO',
    sanctionedAmount: 0,
    sanctionedAsPer: '',
    sanctionedBank: '',
    mainCategory: '',
    particulars: [],
    releaseAmount: {
      _id: '',
      modeOfPayment: '',
      releaseAmount: 0,
      transactionNumber: '',
      transferredAmount: 0,
      transferredDate: null,
      transferredBank: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
      },
      attachment: [],
      division: '',
    },
    division: {
      _id: '',
      details: {
        name: '',
        divisionId: '',
        contactNumber: '',
        email: '',
        address: {
          buildingName: '',
          street: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
        },
        coordinator: {},
        seniorLeader: {},
        juniorLeader: {},
      },
      subDivisions: [
        {
          _id: '',
          name: '',
        },
      ],
      FCRABankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      localBankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      otherBankDetails: {
        bankName: '',
        branchName: '',
        accountNumber: '',
        IFSCCode: '',
        beneficiary: '',
      },
      createdAt: moment(),
      updatedAt: moment(),
    },
    createdBy: {
      workerCode: '',
      kind: 'worker',
      tokens: [],
      basicDetails: {
        firstName: '',
        lastName: '',
        email: '',
        permanentAddress: {},
        currentOfficialAddress: {},
        residingAddress: {},
        dateOfBirth: moment(),
      },
      officialDetails: {
        divisionHistory: [],
        remarks: '',
        selfSupport: true,
        status: null,
        noOfChurches: 0,
      },
      supportDetails: {
        // totalNoOfYearsInMinistry: 10,
        withChurch: true,
      },
      supportStructure: {
        basic: 0,
        HRA: 0,
        spouseAllowance: 0,
        positionalAllowance: 0,
        specialAllowance: 0,
        impactDeduction: 0,
        telAllowance: 0,
        PIONMissionaryFund: 0,
        MUTDeduction: 0,
      },
      children: [],
      _id: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
    createdAt: moment(),
    updatedAt: moment(),
    billAttachment: [],
    signature: {},
  });
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [openRelease, setOpenRelease] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>([]);
  const [fileUploaderAction, setFileUploaderAction] = useState<'add' | 'manage'>('add');

  useEffect(() => {
    props.action == 'release' ?
      IROServices.getAll({ status: IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE })
          .then((res) => {
            console.log(res);
            setIROrder(res.data);
          })
          .catch((res) => {
            console.log(res);
          }) :
      IROServices.getAll()
          .then((res) => {
            console.log(res, 'res');
            setIROrder(res.data);
          })
          .catch((res) => {
            console.log(res);
          });
  }, [openRelease]);

  useEffect(() => {
    if (selectedIRO._id != '') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [selectedIRO.billAttachment]);

  useEffect(() => {
    if (selectedIRO._id != '') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
    console.log(selectedIRO, 'AA');
  }, [selectedIRO.signature]);


  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      renderCell: (params) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/iro/${params.row._id}`,
              icon: PreviewIcon,
            },
            ...(params.row.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE && props.action == 'release' ?
              [
                {
                  id: 'Release',
                  text: 'Release Amount',
                  component: Link,
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([params.row])],
                  icon: CurrencyRupeeIcon,
                },
                {
                  id: 'Close IRO',
                  text: 'Close IRO',
                  icon: PreviewIcon,
                  onClick: () => {
                    IROServices.close(params.row._id)
                        .then((res) => {
                          // if (IROrder) {
                          // eslint-disable-next-line @typescript-eslint/naming-convention
                          const filterIRO = IROrder?.filter((iro) => {
                            return iro._id !== params.row._id;
                          });
                          setIROrder(filterIRO);
                          // }
                          console.log(res, 'close');
                          enqueueSnackbar({
                            message: res.message,
                            variant: 'success',
                          });
                        })

                        .catch((err) => {
                          enqueueSnackbar({
                            message: err.message,
                            variant: 'error',
                          });
                        });
                  },
                },
              ] :
              []),
            ...(params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Release',
                  text: 'View Release Amount',
                  onClick: () => [setOpenRelease(true), setReleaseAmountIROs([params.row])],
                  icon: PreviewIcon,
                },
              ] :
              []),

            {
              id: 'remarks',
              text: 'Remarks',
              icon: EditNoteIcon,

              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedIROId(params.row._id);
                IROServices.getAllRemarksById(params.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              // onClick: () => {
              //   toggleOpenRemarks(true);
              //   IROServices.getAllRemarksById(params.row._id)
              //     .then((res: any) => {
              //       if (Array.isArray(res.data)) {
              //         setRemarks(res.data);
              //       } else {
              //         console.error('Invalid remarks data:', res.data);
              //       }
              //     })
              //     .catch((error: { message: any }) => {
              //       enqueueSnackbar({
              //         variant: 'error',
              //         message: error.message,
              //       });
              //     });
              // },
            },
            ...(params.row.status == IROLifeCycleStates.IRO_CLOSED?[
              {
                id: 'print',
                text: 'Print IRO',
                icon: PrintIcon,
                component: PDFDownloadLink,
                document: <IROReceiptTemplate rowData={params.row} />,
                fileName: 'IROReceipt.pdf',
              }]:[]),
            {
              id: 'notification',
              text: 'Send notification',
              onClick: () => {
                setSelectedIROId(params.row._id);
                toggleSendNotification(true);
              },
              icon: MessageIcon,
            },
            {
              id: 'signature',
              text: 'Add signature',
              onClick: () => {
                setSelectedIROId(params.row._id);
                setSelectedIRO(params.row);
                toggleAddSignature(true);
              },
              icon: FingerprintIcon,
            },
            ...(hasPermissions(['WRITE_IRO']) && params.row.status >= IROLifeCycleStates.AMOUNT_RELEASED ?
              [
                {
                  id: 'Attachments',
                  text: 'Attachments',
                  icon: AttachmentIcon,
                  onClick: () => {
                    setAttachment(true);
                    setFileUploaderAction('add');
                    setSelectedIRO(params.row);
                  },
                },
              ] :
              []),
            // {
            //   id: 'Send Back',
            //   text: 'Send Back',
            //   icon: ReplyIcon,
            //   onClick: ()=>{
            //     IROServices.
            //     sendBack(params.row._id)
            //     .then((res)=>{
            //       if (IROrder) {
            //         // eslint-disable-next-line @typescript-eslint/naming-convention
            //         const filterIRO = IROrder?.filter((IROrders) => {
            //           return IROrders._id !== params.row._id;
            //         });
            //         setIROrder(filterIRO);
            //       }
            //       console.log(res, 'close');
            //       enqueueSnackbar({
            //         message: res.message,
            //         variant: 'success',
            //       });
            //     })

            //     .catch((err) => {
            //       enqueueSnackbar({
            //         message: err.message,
            //         variant: 'error',
            //       });
            //     });
            //   },
            // },
          ]}
        />
      ),
    },
    { field: 'IROno', headerName: 'IRO No', width: 100, renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>, align: 'center', headerAlign: 'center' },
    {
      field: 'IRODate',
      headerName: 'IRO Date',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => <b>Division Name</b>,
      renderCell: (props) => <p> {props.row.division?.details.name}</p>,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      renderHeader: () => <b>Sub Division Name</b>,
      renderCell: (props) => <p> {props.row.purposeSubdivision?.name}</p>,
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'mainCategory',
      headerName: 'Main Category',
      width: 150,
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'requestAmount',
      headerName: 'Requested Amount',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as IROrder;
        const particularAmount = frRequest.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0);
        return <p>{particularAmount}</p>;
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'sanction', headerName: 'Special Sanction', width: 130, renderHeader: () => <b>Special Sanction</b>, align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 130, renderHeader: () => <b>Sanctioned Amount</b>, align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAsPer', headerName: 'Sanctioned As Per', width: 130, renderHeader: () => <b>Sanctioned As Per</b>, align: 'center', headerAlign: 'center' },
    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 130, renderHeader: () => <b>Sanctioned Bank</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      renderHeader: () => <b>Status</b>,
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
      },
    },
  ];

  return (
    <CommonPageLayout title={props.action == 'manage'?'Manage IRO':'Release Amount'}>
      <PermissionChecks
        permissions={['READ_IRO']}
        granted={
          <>
            <Card>
              <Grid container spacing={2}>
                {hasPermissions(['MANAGE_IRO']) && props.action == 'release' ? (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={{ float: 'right', mt: 2, mr: 2 }}
                      startIcon={<AttachMoneyIcon />}
                      disabled={releaseAmountIROs.length == 0}
                      onClick={() => {
                        if (releaseAmountIROs.every((iro) => iro.division?._id == releaseAmountIROs[0].division?._id)) {
                          setOpenRelease(true);
                        } else {
                          enqueueSnackbar({ message: 'IRO of Different divisions selected', variant: 'error' });
                        }
                      }}
                    >
                      Bulk Release
                    </Button>
                  </Grid>
                ) : null}

                <br />
                <br />
                <Grid item xs={12}>
                  <DataGrid
                    rows={IROrder ?? []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    checkboxSelection={props.action == 'release'}
                    disableRowSelectionOnClick={props.action == 'release'}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                      // setSelectedIROrelease(newRowSelectionModel);
                      console.log(newRowSelectionModel);
                      setReleaseAmountIROs(() => {
                        const selectedIROs = IROrder ? IROrder.filter((iro) => newRowSelectionModel.includes(iro._id)) : [];

                        return selectedIROs;
                      });
                    }}
                    style={{ height: '80vh', width: '100%' }}
                    // rowSelectionModel={selectedIROrelease}
                    //
                  />
                </Grid>
              </Grid>
            </Card>
            <Grid>
              <Dialog open={sendNotification} sx={{ width: 400, margin: '0 auto' }} >
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                    <Grid item>
                      <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Send Notifications
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 260 }}

                        onClick={
                          ()=> {
                            IROServices.sendNotifications('president', selectedIROId??'')
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
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: 260 }}

                        onClick={
                          ()=> {
                            IROServices.sendNotifications('accounts', selectedIROId??'')
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
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: 260 }}

                        onClick={
                          ()=> {
                            IROServices.sendNotifications('office_manager', selectedIROId??'')
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((res) => {
                              console.log(res);
                            });
                          }
                        }
                        endIcon={<SendIcon/>}
                      >  Send to office manager</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{ width: 260 }}
                        onClick={
                          ()=> {
                            IROServices.sendNotifications('account_manager', selectedIROId??'')
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((res) => {
                              console.log(res);
                            });
                          }
                        }
                        endIcon={<SendIcon/>}
                      >  Send to account manager</Button>
                      <br/><br/>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color='inherit'
                        sx={{ width: 260 }}
                        onClick={
                          ()=> {
                            IROServices.sendNotifications('division_head', selectedIROId??'')
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
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          toggleSendNotification(false);
                          setSelectedIROId('');
                        }}
                        sx={{ marginBottom: 3, width: 260 }}
                        endIcon={<CloseIcon />}
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
              <Dialog open={addSignature} sx={{ width: 400, margin: '0 auto' }} >
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                    <Grid item>
                      <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Add Signatures
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: 260 }}
                        onClick={() => {
                          // setShowAccountManagerFileUploader(false);
                          // setShowAccountFileUploader(false);
                          setShowHRFileUploader(true);
                          // toggleAddSignature(false);
                        }}
                      >
                        {' '}
                        HR signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: 260 }}
                        onClick={() => {
                          // setShowAccountFileUploader(false);
                          // setShowHRFileUploader(false);
                          // toggleAddSignature(false);
                          setShowAccountManagerFileUploader(true);
                        }}
                      >
                        {' '}
                        Account Manager Signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ width: 260 }}
                        onClick={() => {
                          setShowAccountFileUploader(true);
                          // setShowAccountManagerFileUploader(false);
                          // setShowHRFileUploader(false);
                          // toggleAddSignature(false);
                        }}
                      >
                        {' '}
                        Accountant Signature
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedIROId('');
                          toggleAddSignature(false);
                          IROServices.getAll()
                          .then((res)=>{
                            setIROrder(res.data);
                          });
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
            </Grid>
            <Dialog open={openRemarks} fullWidth maxWidth="md">
              <DialogTitle>Remarks</DialogTitle>
              <DialogContent>
                {remarks.length > 0 ?
                  remarks.map((remark) => (
                    <MessageItem
                      key={remark._id}
                      sender={remark.createdBy?.basicDetails?.firstName + ' ' + remark.createdBy?.basicDetails?.lastName}
                      time={remark.updatedAt}
                      body={remark.remark}
                      isSent={true}
                    />
                  )) :
                  'No Data Found '}
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
                      IRO: selectedIROId ?? '',
                      remark: e.target.value,
                    }))
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            remark.remark ?
                              IROServices.addRemarks(remark)
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
                  onClick={() => {
                    toggleOpenRemarks(false);
                    setSelectedIROId(null);
                  }}
                  // sx={{ ml: 'auto' }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <FileUploader
              title="HR Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showHRFileUploader}
              onClose={() => setShowHRFileUploader(false)}
              // getFiles={selectedIRO?.signature?.hrSignature}
              getFiles={selectedIRO?.signature?.hrSignature ? [selectedIRO.signature.hrSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name)
                .then((res) => {
                  console.log(res.data, 'FFF');
                  setSelectedIRO(() => ({
                    ...selectedIRO,
                    signature: {
                      ...selectedIRO.signature,
                      hrSignature: res.data,
                    },
                  }));

                  return res;
                });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    hrSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
            <FileUploader
              title="Account manager Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showAccountManagerFileUploader}
              onClose={() => setShowAccountManagerFileUploader(false)}
              getFiles={selectedIRO?.signature?.accountManagerSignature ? [selectedIRO.signature.accountManagerSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
                  console.log(res.data, 'FFF');
                  setSelectedIRO(() => ({
                    ...selectedIRO,
                    signature: {
                      ...selectedIRO?.signature,
                      accountManagerSignature: res.data,
                    },
                  }));

                  return res;
                });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    accountManagerSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}

            />
            <FileUploader
              title="Accountant Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 3,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={showAccountFileUploader}
              onClose={() => setShowAccountFileUploader(false)}
              getFiles={selectedIRO?.signature?.accountantSignature ? [selectedIRO.signature.accountantSignature] : []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/eSignature', file.name).then((res) => {
                  console.log(res.data, 'FFF');
                  setSelectedIRO((prevSelectedIRO) => ({
                    ...prevSelectedIRO,
                    signature: {
                      ...prevSelectedIRO.signature,
                      accountantSignature: res.data,
                    },
                  }));


                  return res;
                });
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({
                  ...selectedIRO,
                  signature: {
                    ...selectedIRO.signature,
                    accountantSignature: undefined,
                  },
                }));
                return FileUploaderServices.deleteFile(fileId);
              }}


            />

            <FileUploader
              title=" Bill Upload"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 1,
                maxTotalSize: 3 * MB,
              }}
              // accept={['video/*']}
              open={attachment}
              action={fileUploaderAction}
              postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
              onClose={() => setAttachment(false)}
              // getFiles={TestServices.getBills}
              getFiles={selectedIRO?.billAttachment ?? []}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name).then((res) => {
                  console.log(res.data._id);
                  setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.length > 0 ? [...selectedIRO.billAttachment, res.data] : [res.data]}));

                  return res;
                });
              }}
              renameFile={(fileId: string, newName: string) => {
                setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)) }));
                return FileUploaderServices.renameFile(fileId, newName);
              }}
              deleteFile={(fileId: string) => {
                setSelectedIRO(() => ({ ...selectedIRO, billAttachment: selectedIRO?.billAttachment.filter((file) => file._id !== fileId) }));
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
            <ReleaseAmount action={props.action == 'release' ? 'add' : 'view'} onClose={() => setOpenRelease(false)} open={openRelease} data={releaseAmountIROs} />
          </>
        }
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity="error">
              Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />
    </CommonPageLayout>
  );
};

export default ManageIRO;
