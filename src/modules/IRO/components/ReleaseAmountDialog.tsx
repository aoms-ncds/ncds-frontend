/* eslint-disable @typescript-eslint/naming-convention */
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
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
import { IPaymentMethod } from '../../Settings/extras/LanguageTypes';
import DropdownButton from '../../../components/DropDownButton';
import formatAmount from '../../Common/formatcode';

// import FileUploader from '../../components/FileUploader/FileUploader';
// import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
// import { MB } from '../../extras/CommonConfig';

interface ReleaseDialogProps {
  action: 'add' | 'manage'|'view';
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
    // transferredAmountEach: [],
    adjustedIro: '',
    adjustedAmount: 0,
    closingBalance: false,
    closingBalanceRemark: '',
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
  console.log(props.action, 'props.data');
  let saveReleaseAmount;
  const [releaseAmounts, setReleaseAmounts] = useState({
    transferredAmounts: {},
  });
  const [transferredAmounts, setTransferredAmounts] = useState<any>({});
  console.log(transferredAmounts, 'transferredAmounts');

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showFileUploader, setShowFileUploader] = useState(false);
  // if(iroStatus){
  console.log(props, 'new data');
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [transferInput, setTransferInput] = useState<any>('');
  const [transferValue, setTransferValue] = useState('');
  // eslint-disable-next-line prefer-const
  saveReleaseAmount = (e: { preventDefault: () => void }) => {// TODO: on release datagrid should updated
    e.preventDefault();
    props.onClose();
    const approvalSnack = enqueueSnackbar({ message: 'Releasing Amount ', variant: 'info' });

    IROServices.releaseAmount(releaseAmount.IRO?? [], releaseAmount).then((res) => {
      enqueueSnackbar({
        message: res.message,
        variant: 'success',
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
  // console.log(props.data[0]?.division?.localBankDetails, ' props.data[0]?.sanctionedBank');
  console.log(props.data[0]?.sanctionedBank, ' props.data[0]?.sanctionedBank');
  console.log( props.data[0]?.division?.BeneficiaryBank3, ' props.data[0]?.sanctionedBank');

  useEffect(() => {
    if (props.data[0]?.status == IROLifeCycleStates.WAITING_FOR_ACCOUNTS_STATE) {
      const data = props.data[0];
      const division = data?.division;
      const sanctionedBank = data?.sanctionedBank.split('-')[0];
      console.log(division?.BeneficiaryBank3, 'division');
      console.log(sanctionedBank, 'division23');

      const getTransferredBank = () => {
        switch (sanctionedBank) {
        case 'Division Bank FCRA ':
        case 'Division Bank FCRA':
          return division?.DivisionBankFCRA;
        case 'Local Bank ':
        case 'Local Bank':
          return division?.localBankDetails;
        case 'Other Bank':
        case 'Other Bank ':
          return division?.otherBankDetails;
        case 'FCRA ':
        case 'FCRA':
          return division?.FCRABankDetails;
        case 'Other Bank 2 ':
        case 'Other Bank 2':
          return division?.otherBankDetails2;
        case 'Other Bank 3 ':
        case 'Other Bank 3':
          return division?.otherBankDetails3;
        case 'Other Bank 4 ':
        case 'Other Bank 4':
          return division?.otherBankDetails4;
        case 'Division Bank Local ':
        case 'Division Bank Local':
          return division?.DivisionBankLocal;
        case 'Beneficiary Bank 1 ':
        case 'Beneficiary Bank 1':
          return division?.BeneficiaryBank1 || division?.otherBankDetails;
        case 'Beneficiary Bank 2 ':
        case 'Beneficiary Bank 2':
          return division?.BeneficiaryBank2 || division?.otherBankDetails1;
        case 'Beneficiary Bank 3 ':
        case 'Beneficiary Bank 3':
          return division?.BeneficiaryBank3 || division?.otherBankDetails2;
        case 'Beneficiary Bank 4 ':
        case 'Beneficiary Bank 4':
          return division?.BeneficiaryBank4 || division?.otherBankDetails3;
        case 'Beneficiary Bank 5 ':
        case 'Beneficiary Bank 5':
          return division?.BeneficiaryBank5 || division?.otherBankDetails4;
        case 'Beneficiary Bank 6 ':
        case 'Beneficiary Bank 6':
          return division?.BeneficiaryBank6;
        case 'Beneficiary Bank 7 ':
        case 'Beneficiary Bank 7':
          return division?.BeneficiaryBank7;
        case 'Beneficiary Bank 8':
          return division?.BeneficiaryBank8;
        case 'Beneficiary Bank 9 ':
        case 'Beneficiary Bank 9':
          return division?.BeneficiaryBank9;
        case 'Beneficiary Bank 10 ':
        case 'Beneficiary Bank 10':
          return division?.BeneficiaryBank10;
        case 'Beneficiary Bank 11 ':
        case 'Beneficiary Bank 11':
          return division?.BeneficiaryBank11;
        case 'Beneficiary Bank 12 ':
        case 'Beneficiary Bank 12':
          return division?.BeneficiaryBank12;
        case 'Beneficiary Bank 13 ':
        case 'Beneficiary Bank 13':
          return division?.BeneficiaryBank13;
        case 'Beneficiary Bank 14':
        case 'Beneficiary Bank 14 ':
          return division?.BeneficiaryBank14;
        case 'Beneficiary Bank 15 ':
        case 'Beneficiary Bank 15':
          return division?.BeneficiaryBank15;
        case 'Beneficiary Bank 16 ':
        case 'Beneficiary Bank 16':
          return division?.BeneficiaryBank16;
        case 'Beneficiary Bank 17 ':
        case 'Beneficiary Bank 17':
          return division?.BeneficiaryBank17;
        case 'Beneficiary Bank 18 ':
        case 'Beneficiary Bank 18':
          return division?.BeneficiaryBank18;
        case 'Beneficiary Bank 19 ':
        case 'Beneficiary Bank 19':
          return division?.BeneficiaryBank19;
        case 'Beneficiary Bank 20 ':
        case 'Beneficiary Bank 20':
          return division?.BeneficiaryBank20;
        case 'Beneficiary Bank 21 ':
        case 'Beneficiary Bank 21':
          return null;
        default:
          return {
            bankName: '',
            branchName: '',
            accountNumber: '',
            IFSCCode: '',
            beneficiary: '',
          };
        }
      };

      const totalReleaseAmount = props.data.reduce((tot, iro) => {
        if (!iro?.particulars) return tot;

        const totalSanctioned = iro.particulars.reduce((acc, amt) => acc + (amt?.sanctionedAmount || 0), 0);
        return iro.sanctionedAmount ? tot + iro?.sanctionedAmount : tot + totalSanctioned;
      }, 0);

      setReleaseAmount((prevState:any) => ({
        ...prevState,
        transferredBank: getTransferredBank(),
        releaseAmount: totalReleaseAmount,
        IRO: props.data,
        division: division?._id ?? '',
      }));
    } else {
      if (props.data[0]?.status >= IROLifeCycleStates.AMOUNT_RELEASED || IROLifeCycleStates.WAITING_FOR_ACCOUNTS_MNGR && props.data[0]?.releaseAmount) {
        const releaseAmountId = typeof props.data[0]?.releaseAmount === 'string' ?
          props.data[0]?.releaseAmount :
          props.data[0]?.releaseAmount?._id;

        if (releaseAmountId) {
          IROServices.getReleaseAmountById(releaseAmountId).then((res) => {
            console.log(res.data, 'upd');
            setReleaseAmount(res.data);
          });
        } else {
          console.error('No valid releaseAmountId found.');
        }
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
    {
      field: '_manage',
      headerClassName: 'super-app-theme--cell',
      headerName: '',
      renderHeader: () => <b>Action</b>,
      width: 80,
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
              text: 'View IRO ',
              // component: Link,
              // to: `/iro/${params.row._id}`,
              // icon: PreviewIcon,
              onClick: () => {
                window.open( `/iro/${params.row._id}`, '_blank');
              },
            },
            {
              id: 'View',
              text: 'View FR',
              // icon: PreviewIcon,
              // component: Link,
              // to: `/fr/${(params.row as any).FR}/view`,
              onClick: () => {
                console.log(params.row.FR, '89854');

                window.open( `/fr/${(params.row as any).FR}/view`, '_blank');
              },

            },
          ]}
        />
      ),
    },
    {
      field: 'tanfered',
      headerName: 'Transferred Amount',
      width: 180,

      renderCell: (params) => {
        let value = 0;

        // check edited value for this row
        if (transferredAmounts?.[params.row._id] !== undefined) {
          value = transferredAmounts[params.row._id];
        }
        // otherwise show sanctioned amount
        else if (params.row?.sanctionedAmount) {
          value = params.row.sanctionedAmount;
        }
        // otherwise calculate from particulars
        else if (Array.isArray(params.row?.particulars)) {
          value = params.row.particulars.reduce(
            (sum, item) => sum + (item.sanctionedAmount || 0),
            0,
          );
        }

        return (
          <span
            style={{ cursor: 'pointer', color: '#1976d2', fontWeight: 600 }}
            onClick={() => {
              setSelectedRow(params.row);
              setTransferInput(value);
              setOpenTransferDialog(true);
            }}
          >
            {Number(value).toFixed(2)}
          </span>
        );
      },

      align: 'center',
      headerAlign: 'center',
    },
    { field: 'IROno', headerName: 'IRO No', width: 130, renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>, align: 'center', headerAlign: 'center' },
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
        return <p>{particularAmount.toFixed(2)}</p>;
      },
    },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 180,
      valueGetter: (params) => {
        if (params.row.sanctionedAmount !== undefined) {
          return params.row.sanctionedAmount?.toFixed(2);
        }
        if (Array.isArray(params.row.particulars)) {
          return params.row.particulars.reduce((sum, item) => sum + (item.sanctionedAmount || 0), 0).toFixed(2);
        }
        return 0; // or return a suitable default value
      },
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
      <Dialog open={props.open} onClose={props.onClose} maxWidth="xl" fullWidth={true}>
        <form onSubmit={saveReleaseAmount}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={15}>
                <DataGrid rows={releaseAmount.IRO ?? []} hideFooter columns={columns} getRowId={(row) => row._id} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Release Amount"
                  type="tel"
                  value={
                    releaseAmount?.releaseAmount != null ?
                      formatAmount(releaseAmount.releaseAmount.toFixed(2)) :
                      ''
                  } onChange={(e) =>
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      releaseAmount: Number(e.target.value),
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}
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
                  type="tel"
                  value={releaseAmount?.transferredAmount ==0 ? releaseAmount?.releaseAmount: releaseAmount?.transferredAmount }
                  onChange={(e) =>
                    Number(e.target.value) <= (releaseAmount.releaseAmount ?? 0) &&
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      transferredAmount: Number(e.target.value),
                    }))
                  }
                  fullWidth
                  inputProps={{
                    max: releaseAmount.releaseAmount ?? 0, min: 0, step: 0.01,
                    onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      event.currentTarget.blur();
                    },
                  }}
                  variant="outlined"
                  disabled={props.action !== 'add'}


                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Transferred Date"
                  value={releaseAmount?.transferredDate}
                  format="DD/MM/YYYY"
                  sx={{ width: '100%' }}
                  disabled={props.action === 'view'}

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
              <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                  Adjustment Details
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Adjusted IRO"
                  type="tel"
                  value={releaseAmount?.adjustedIro}
                  onChange={(e) =>
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      adjustedIro: e.target.value,
                    }))
                  }
                  InputLabelProps={{
                    shrink: Boolean(releaseAmount?.adjustedIro),
                  }}
                  fullWidth
                  inputProps={{
                    onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      event.currentTarget.blur();
                    },
                  }}
                  variant="outlined"
                  disabled={props.action !== 'add'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


                  // required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Adjusted Amount"
                  type="number"
                  value={releaseAmount?.adjustedAmount }
                  onChange={(e) =>
                    // Number(e.target.value) <= (releaseAmount.adjustedAmount ?? 0) &&
                    setReleaseAmount(() => ({
                      ...releaseAmount,
                      adjustedAmount: Number(e.target.value),
                    }))
                  }
                  fullWidth
                  // inputProps={{
                  //   max: releaseAmount.releaseAmount ?? 0, min: 0, step: 0.01,
                  //   onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                  //     event.preventDefault();
                  //     event.currentTarget.blur();
                  //   },
                  // }}
                  variant="outlined"
                  disabled={props.action !== 'add'}


                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}

                  // required
                />
              </Grid>
              <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="closingBalance"
                      // Use double negation (!!) to ensure it's a boolean value
                      checked={!!releaseAmount?.closingBalance}
                      onChange={(e) =>
                        setReleaseAmount((prev) => ({
                          ...prev,
                          closingBalance: e.target.checked,
                        }))
                      }
                      disabled={props.action !== 'add'}

                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#000', // text color
                          color: '#000',
                          opacity: 1,
                        },
                        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#c4c4c4', // normal border color
                        },
                        '& .MuiInputLabel-root.Mui-disabled': {
                          color: 'rgba(0,0,0,0.6)',
                        },
                      }}

                      color="primary"
                    />
                  }
                  label="Closing Balance"
                />
              </Grid>
              {releaseAmount?.closingBalance &&(

                <Grid item xs={12} md={3}>
                  <TextField
                    label="Closing Balance Remark"
                    type="tel"
                    value={releaseAmount?.closingBalanceRemark }
                    onChange={(e) =>
                      setReleaseAmount(() => ({
                        ...releaseAmount,
                        closingBalanceRemark: e.target.value,
                      }))
                    }
                    fullWidth
                    variant="outlined"
                    disabled={props.action !== 'add'}

                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}


                    // required
                  />
                </Grid>
              )}
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
                  disabled={props.action !== 'add'}

                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


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
                  disabled={props.action !== 'add'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


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
                  disabled={props.action !== 'add'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


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
                  disabled={props.action !== 'add'}

                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


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
                  disabled={props.action !== 'add'}


                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


                  InputLabelProps={{
                    shrink: Boolean(releaseAmount?.transferredBank?.beneficiary),
                  }}
                />
              </Grid>
              {props.action !== 'add' && (
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Payment Method"
                    value={releaseAmount?.modeOfPayment}
                    variant="outlined"
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              )}
              {/* </Grid> */}
              {props.action == 'add' && (
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
                    // disabled={props.action !== 'add'}


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
                    disabled={props.action !== 'add'}
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000', // text color
                        color: '#000',
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c4c4c4', // normal border color
                      },
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgba(0,0,0,0.6)',
                      },
                    }}


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
                  // required
                  disabled={props.action !== 'add'}

                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000', // text color
                      color: '#000',
                      opacity: 1,
                    },
                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c4c4c4', // normal border color
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0,0,0,0.6)',
                    },
                  }}


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
            {hasPermissions(['MANAGE_IRO']) && props.action!=='view'? (
              <>
                <Button variant="contained" style={{ textAlign: 'right', float: 'right' }} type="submit">
                  {iroStatus ? 'Amount Release Request' : 'Release Amount'}
                </Button>
                {/* <Button variant="contained" style={{ textAlign: 'right', float: 'right' }} type="submit">
                  Release Amount
                </Button> */}
                <br />
              </>
            ) : null}
          </DialogActions>
        </form>
        <Dialog open={openTransferDialog} onClose={() => setOpenTransferDialog(false)}>

          <DialogTitle>Enter Transferred Amount</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              type="number"
              disabled={props.action !== 'add'}

              value={transferInput}
              onChange={(e) => setTransferInput(e.target.value)}
            />
          </DialogContent>

          <DialogActions>

            <Button onClick={() => setOpenTransferDialog(false)}>
      Cancel
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                const amount = Number(transferInput);

                const updatedAmounts = {
                  ...transferredAmounts,
                  [selectedRow._id]: amount,
                };

                // update row values
                setTransferredAmounts(updatedAmounts);

                // calculate total
                const total = Object.values(updatedAmounts)
      .reduce((sum:any, val:any) => sum + Number(val || 0), 0);

                // update release form
                setReleaseAmount((prev:any) => ({
                  ...prev,
                  transferredAmount: total,
                }));
                setReleaseAmount((prev:any) => ({
                  ...prev,
                  transferredAmountEach: transferredAmounts,
                }));

                setOpenTransferDialog(false);
              }}
            >
Save
            </Button>

          </DialogActions>

        </Dialog>
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
        action={props.action==='add'?'add':'view'}
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
