/* eslint-disable @typescript-eslint/naming-convention */
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import FileUploader from '../../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../../extras/CommonConfig';
import IROServices from '../extras/IROServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { hasPermissions } from '../../User/components/PermissionChecks';
import IROLifeCycleStates from '../extras/IROLifeCycleStates';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import PaymentMethodService from '../../Settings/extras/PaymentMethodService';

// import FileUploader from '../../components/FileUploader/FileUploader';
// import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
// import { MB } from '../../extras/CommonConfig';

interface ReleaseDialogProps {
  action: 'add' | 'view';
  data: IROrder[];
  open: boolean;
  onClose: () => void;
}
interface optioinalBank{
  FCRABankDetails?: BankDetails;
    localBankDetails?: BankDetails;
    otherBankDetails?: BankDetails;
    otherBankDetails1?: BankDetails;
    otherBankDetails2?: BankDetails;
    otherBankDetails3?: BankDetails;
    otherBankDetails4?: BankDetails;
}
const ReleaseAmount = (props: ReleaseDialogProps) => {
  const [iroStatus, setIroStatus] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [paymnetMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [releaseAmount, setReleaseAmount] = useState<IReleaseAmount>({
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
  });
  console.log(releaseAmount, 'iroStatus');
  const model = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpen(true);
  };
  let saveReleaseAmount;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showFileUploader, setShowFileUploader] = useState(false);
  // if(iroStatus){
  console.log(props, 'propssa');

  // eslint-disable-next-line prefer-const
  saveReleaseAmount = (e: { preventDefault: () => void }) => {// TODO: on release datagrid should updated
    e.preventDefault();
    const approvalSnack = enqueueSnackbar({ message: 'Releasing Amount ', variant: 'info' });

    IROServices.releaseAmount(props.data, releaseAmount).then((res) => {
      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      props.onClose();
    });
    setTimeout(() => {
      closeSnackbar(approvalSnack);
    }, 500);
  };


  // }else{

  // }

  useEffect(() => {
    PaymentMethodService.getAll().then((res) => {
      setPaymentMethod(res.data);
    });
  }, []);
  console.log(props.data[0]?.division?.localBankDetails, ' props.data[0]?.sanctionedBank');
  console.log(props.data[0]?.sanctionedBank, ' props.data[0]?.sanctionedBank');

  useEffect(() => {
    if (props.data[0]?.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE) {
      setReleaseAmount(() => ({
        ...releaseAmount,
        transferredBank:
          props.data[0]?.sanctionedBank == 'Division Bank FCRA' && props.data[0]?.division?.DivisionBankFCRA ?
            props.data[0]?.division?.DivisionBankFCRA :
            props.data[0]?.sanctionedBank == 'Local Bank' && props.data[0]?.division?.localBankDetails ?
              props.data[0]?.division?.localBankDetails :
              props.data[0]?.sanctionedBank == 'Other Bank' && props.data[0]?.division?.otherBankDetails ?
                props.data[0]?.division?.otherBankDetails :
                props.data[0]?.sanctionedBank == 'FCRA' && props.data[0]?.division?.FCRABankDetails ?
                  props.data[0]?.division?.FCRABankDetails :
                  props.data[0]?.sanctionedBank == 'Other Bank 1' && props.data[0]?.division?.otherBankDetails1 ?
                    props.data[0]?.division?.otherBankDetails1 :
                    props.data[0]?.sanctionedBank == 'Other Bank 2' && props.data[0]?.division?.otherBankDetails2 ?
                      props.data[0]?.division?.otherBankDetails2 :
                      props.data[0]?.sanctionedBank == 'Other Bank 3' && props.data[0]?.division?.otherBankDetails3 ?
                        props.data[0]?.division?.otherBankDetails3 :
                        props.data[0]?.sanctionedBank == 'Other Bank 4' && props.data[0]?.division?.otherBankDetails4 ?
                          props.data[0]?.division?.otherBankDetails4 :
                          props.data[0]?.sanctionedBank == 'Division Bank Local' && props.data[0]?.division?.DivisionBankLocal ?
                            props.data[0]?.division?.DivisionBankLocal :
                            props.data[0]?.sanctionedBank == 'Beneficiary Bank 1' && props.data[0]?.division?.BeneficiaryBank1 ?
                              props.data[0]?.division?.BeneficiaryBank1 :
                              props.data[0]?.sanctionedBank == 'Beneficiary Bank 2' && props.data[0]?.division?.BeneficiaryBank2 ?
                                props.data[0]?.division?.BeneficiaryBank2 :
                                props.data[0]?.sanctionedBank == 'Beneficiary Bank 4' && props.data[0]?.division?.BeneficiaryBank4 ?
                                  props.data[0]?.division?.BeneficiaryBank4 :
                                  props.data[0]?.sanctionedBank == 'Beneficiary Bank 5' && props.data[0]?.division?.BeneficiaryBank5 ?
                                    props.data[0]?.division?.BeneficiaryBank5 :
                                    props.data[0]?.sanctionedBank == 'Beneficiary Bank 6' && props.data[0]?.division?.BeneficiaryBank6 ?
                                      props.data[0]?.division?.BeneficiaryBank6 :
                                      props.data[0]?.sanctionedBank == 'Beneficiary Bank 7' && props.data[0]?.division?.BeneficiaryBank7 ?
                                        props.data[0]?.division?.BeneficiaryBank7 :
                                        props.data[0]?.sanctionedBank == 'Beneficiary Bank 8' && props.data[0]?.division?.BeneficiaryBank8 ?
                                          props.data[0]?.division?.BeneficiaryBank8 :
                                          props.data[0]?.sanctionedBank == 'Beneficiary Bank 9' && props.data[0]?.division?.BeneficiaryBank9 ?
                                            props.data[0]?.division?.BeneficiaryBank9 :
                                            props.data[0]?.sanctionedBank == 'Beneficiary Bank 10' && props.data[0]?.division?.BeneficiaryBank10 ?
                                              props.data[0]?.division?.BeneficiaryBank10 :
                                              props.data[0]?.sanctionedBank == 'Beneficiary Bank 3' && props.data[0]?.division?.BeneficiaryBank3 ?
                                                props.data[0]?.division?.BeneficiaryBank3 :
                                                props.data[0]?.sanctionedBank == 'Beneficiary Bank1' && props.data[0]?.division?.BeneficiaryBank1 ? props.data[0]?.division?.BeneficiaryBank1 : {
                                                  bankName: '',
                                                  branchName: '',
                                                  accountNumber: '',
                                                  IFSCCode: '',
                                                  beneficiary: '',
                                                },

        releaseAmount: props.data.reduce((tot, iro) => {
          if (!iro?.particulars) return tot;

          // Use `reduce` to sum the sanctioned amounts within the array
          const totalSanctioned = iro.particulars.reduce((acc, amt) => acc + (amt?.sanctionedAmount || 0), 0);

          return iro.sanctionedAmount ?? tot + totalSanctioned;
        }, 0), IRO: props.data,
        division: props.data[0]?.division?._id ?? '',
      }));
    } else {
      if (props.data[0]?.status >= IROLifeCycleStates.AMOUNT_RELEASED || IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR && props.data[0]?.releaseAmount) {
        IROServices.getReleaseAmountById(props.data[0]?.releaseAmount?._id ?? '').then((res) => {
          console.log(res.data, 'upd');

          setReleaseAmount(res.data);
        });
      }
    }
    setIroStatus(props.data.every((iro) => iro.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE));
    // res.data.status==IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE);
    // },
    // if (res.data.releaseAmount) {
    //   setReleaseAmount(res.data.releaseAmount);
    // }
    // );
  }, [props.data]);

  const columns: GridColDef<IROrder>[] = [
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
      valueGetter: (params) => params.row.division?.details.name,
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      renderHeader: () => <b>Sub Division Name</b>,
      valueGetter: (params) => params.row.purposeSubdivision?.name,
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
      field: 'requestAmount',
      headerName: 'Requested Amount',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as IROrder;
        const particularAmount = frRequest.particulars?.reduce((total, particular) => total + Number(particular.requestedAmount), 0);
        return <p>{particularAmount}</p>;
      },
    },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 180,
      valueGetter: (params) => params.row.sanctionedAmount ?? params.row.sanctionedAmountTotal,

      renderHeader: () => <b>Sanctioned Amount</b>, align: 'center', headerAlign: 'center' },

    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 180, renderHeader: () => <b>Sanctioned Bank</b>, align: 'center', headerAlign: 'center' },
    // {
    //   field: 'status',
    //   renderHeader: () => (<b>Status</b>),
    //   width: 200,
    //   align: 'center',
    //   headerAlign: 'center',
    //   valueGetter: (params) => {
    //     return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
    //   },
    // },
  ];
  return (
    // <CommonPageLayout title="Release Amount Page">
    //   <Container>
    //     <Card style={{ width: '100%' }}>
    //       <CardContent>
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth={true}>
        <form onSubmit={saveReleaseAmount}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={15}>
                <DataGrid rows={releaseAmount.IRO ?? []} hideFooter columns={columns} getRowId={(row) => row._id} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Release Amount"
                  type="number"
                  value={releaseAmount?.releaseAmount != 0 ? releaseAmount?.releaseAmount : ''}
                  onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      releaseAmount: Number(e.target.value),
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled
                  inputProps={{
                    onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      event.currentTarget.blur();
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount Transferred"
                  type="number"
                  value={releaseAmount?.transferredAmount != 0 ? releaseAmount?.transferredAmount : ''}
                  onChange={(e) =>
                    Number(e.target.value) <= (releaseAmount.releaseAmount ?? 0) &&
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredAmount: Number(e.target.value),
                    }))
                  }
                  fullWidth
                  inputProps={{
                    max: releaseAmount.releaseAmount ?? 0, min: 0, onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      event.currentTarget.blur();
                    },
                  }}
                  variant="outlined"
                  disabled={props.action == 'view'}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date"
                  value={releaseAmount?.transferredDate}
                  format="DD/MM/YYYY"
                  sx={{ width: '100%' }}
                  disabled={props.action == 'view'}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  onChange={(value) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredDate: value,
                    }))
                  }
                />
              </Grid>
              {/* <Grid item xs={12} > */}
              {/* { <BankDetailsForm
                  value={IRO?.transferredBank}
                  onChange={(newbankDetails) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setIRO((IRO) => ({
                      ...IRO,
                      releaseAmount:{
                        ...releaseAmount,
                        transferredBank: newbankDetails,
                      }
                    }));
                  }}
                  action={'add'}
                  options={{ title: 'Amount Transferred (Bank) Details' }}
                /> */}

              <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                  Amount Transferred (Bank) Details
                </Typography>
              </Grid>
              <br />
              {/* <Grid container spacing={3}> */}
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Bank Name"
                  value={releaseAmount?.transferredBank?.bankName}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredBank: {
                        ...releaseAmount.transferredBank,
                        bankName: e.target.value,
                      },
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled={props.action == 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Branch Name"
                  value={releaseAmount?.transferredBank?.branchName}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredBank: {
                        ...releaseAmount.transferredBank,
                        branchName: e.target.value,
                      },
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled={props.action == 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Account Number"
                  value={releaseAmount?.transferredBank?.accountNumber}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredBank: {
                        ...releaseAmount.transferredBank,
                        accountNumber: e.target.value,
                      },
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled={props.action == 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="IFSC Code"
                  value={releaseAmount?.transferredBank?.IFSCCode}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredBank: {
                        ...releaseAmount.transferredBank,
                        IFSCCode: e.target.value,
                      },
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled={props.action == 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Beneficiary"
                  value={releaseAmount?.transferredBank?.beneficiary}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredBank: {
                        ...releaseAmount.transferredBank,
                        beneficiary: e.target.value,
                      },
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled={props.action == 'view'}
                  InputLabelProps={{
                    shrink: Boolean(releaseAmount?.transferredBank?.beneficiary),
                  }}
                />
              </Grid>
              {props.action == 'view' && (
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Payment Method"
                    value={releaseAmount?.modeOfPayment}
                    variant="outlined"
                    fullWidth
                    disabled={props.action == 'view'}
                    InputLabelProps={{
                      shrink: Boolean(releaseAmount?.transferredBank?.beneficiary),
                    }}
                  />
                </Grid>
              )}
              {/* </Grid> */}
              {props.action != 'view' && (
                <Grid item xs={12} md={6} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="Payment_method"
                    getOptionLabel={(method) => method.paymentMethod ?? ''}
                    value={releaseAmount?.modeOfPayment as unknown as IPaymentMethod}
                    // options={['Cash', 'Cheque', 'UPI', 'Credit Card', 'Debit Card', 'NetBanking', 'Other']}
                    options={paymnetMethod ?? []}
                    onChange={(_e, newValue: any) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(() => ({
                        ...releaseAmount,
                        modeOfPayment: newValue ?? '',
                      }))
                    }
                    renderInput={(params) => <TextField {...params} label="Mode of payment" required />}
                  // disabled={props.action == 'view'}
                  />
                </Grid>
              )}
              {releaseAmount?.modeOfPayment == 'Other' && (
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Other Mode of Payment:"
                    value={releaseAmount?.otherModeOfPayment}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      setReleaseAmount(() => ({
                        ...releaseAmount,
                        otherModeOfPayment: e.target.value,
                      }))
                    }
                    variant="outlined"
                    fullWidth
                    // required
                    disabled={props.action == 'view'}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  label="Transaction No:"
                  value={releaseAmount?.transactionNumber}
                  onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transactionNumber: e.target.value,
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  required
                  disabled={props.action == 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
                  Attachments
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setReleaseAmount({
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
                });
                props.onClose();
              }}
            >
              Close
            </Button>
            {hasPermissions(['MANAGE_IRO']) ? (
              <>
                {/* <Button variant="contained" style={{ textAlign: 'right', float: 'right' }} type="submit">
                  {iroStatus ? 'Send To Acc Mgr For Approval' : 'Release Amount'}
                </Button> */}
                <Button variant="contained" style={{ textAlign: 'right', float: 'right' }} type="submit">
                  Release Amount
                </Button>
                <br />
              </>
            ) : null}
          </DialogActions>
        </form>
        <Dialog
          open={open}
          keepMounted
          onClose={() => setOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle> {iroStatus ? 'Are you sure you want to send to Accounts Manager for approval ?' : 'Are you sure you want to release amount for this IRO ?'}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={saveReleaseAmount}>Confirm</Button>
          </DialogActions>
        </Dialog>

      </Dialog>
      {/* <FileUploader
        title="Attachments"
        types={[
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={newParticular.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'FR/Particulars', file.name)
          .then( (res)=>{
            console.log(res.data._id);

            setNewParticular(() => ({
              ...newParticular,
              attachment: [...newParticular.attachment, res.data],
            }));
            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setNewParticular((particularDetails) => ({
            ...particularDetails,
            attachment: particularDetails.attachment.filter((file)=>file._id!==fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      /> */}
      <FileUploader
        title="Attachments"
        action={props.action}
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={releaseAmount.attachment ?? []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/ReleaseAmount', file.name).then((res) => {
            setReleaseAmount(() => ({
              ...releaseAmount,
              attachment: [...(releaseAmount.attachment || []), res.data],
            }));
            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setReleaseAmount(() => ({
            ...releaseAmount,
            attachment: releaseAmount.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={
          props.action == 'add' ?
            (fileId: string) => {
              setReleaseAmount(() => ({
                ...releaseAmount,
                attachment: releaseAmount.attachment.filter((file) => file._id !== fileId),
              }));
              return FileUploaderServices.deleteFile(fileId);
            } :
            undefined
        }
      />
    </>
    // </CommonPageLayout>
  );
};

export default ReleaseAmount;
