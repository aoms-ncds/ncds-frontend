import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { Edit as EditIcon, Preview as PreviewIcon, Reply as ReplyIcon } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import IROReciptTemplate from './components/IROReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { enqueueSnackbar } from 'notistack';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';

const ManageIRO = () => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [selectedIRO, setSelectedIRO] = useState<string|null>(null);
  const [IROrder, setIROrder] = useState<IROrder[]>();
  const [printdetails, setPrintDetails]=useState<IROrder[]>([]);
  useEffect(() => {
    IROServices.getAll()
      .then((res) => {
        console.log(res);
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
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
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            {
              id: 'View',
              text: 'Release Amount',
              component: Link,
              // document: <ReleaseAmount id={props.row._id} />,
              to: `/iro/release_amount/${props.row._id}`,
              icon: PreviewIcon,

            },
            {
              id: 'remarks',
              text: 'Remarks',
              icon: EditIcon,

              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedIRO(props.row._id);
                IROServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data??[]))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              // onClick: () => {
              //   toggleOpenRemarks(true);
              //   IROServices.getAllRemarksById(props.row._id)
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

            {
              id: 'print',
              text: 'Print IRO',
              icon: PrintIcon,
              component: PDFDownloadLink,
              document: <IROReciptTemplate Id={props.row._id} />,
              fileName: 'IROReciept.pdf',


            },

            {
              id: 'Reconciliation',
              text: 'Reconciliation',
              icon: EditIcon,
            },
            {
              id: 'Close IRO',
              text: 'Close IRO',
              icon: PreviewIcon,
              onClick: ()=>{
                IROServices.close(props.row._id)
                .then((res)=>{
                  if (IROrder) {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const filterIRO = IROrder?.filter((IROrders) => {
                      return IROrders._id !== props.row._id;
                    });
                    setIROrder(filterIRO);
                  }
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
            {
              id: 'Attachments',
              text: 'Attachments',
              icon: PrintIcon,
            },
            {
              id: 'Send Back',
              text: 'Send Back',
              icon: ReplyIcon,
              onClick: ()=>{
                IROServices.
                sendBack(props.row._id)
                .then((res)=>{
                  if (IROrder) {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const filterIRO = IROrder?.filter((IROrders) => {
                      return IROrders._id !== props.row._id;
                    });
                    setIROrder(filterIRO);
                  }
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
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'IROno', headerName: 'IRO No', width: 70 },
    { field: 'IROdate', headerName: 'IRO Date', width: 130 },
    { field: 'divisionName', headerName: 'Division Name', width: 150 },
    { field: 'subDivisionName', headerName: 'Sub Division Name', width: 170 },
    { field: 'mainCategory', headerName: 'Main Category', width: 150 },
    { field: 'requestAmount', headerName: 'Requested Amount', width: 130 },
    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130 },
    { field: 'sanction', headerName: 'Special Sanction', width: 130 },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 130 },
    { field: 'sanctionedAsPer', headerName: 'Sanctioned As Per', width: 130 },
    { field: 'sourceBank', headerName: 'Source Bank', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCode(params.value).replaceAll('_', ' ');
      },
    },
  ];
  return (
    <CommonPageLayout title="Internal Release Order">
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '75vh', width: '100%' }}>
          <DataGrid rows={IROrder ?? []} columns={columns} getRowId={(row) => row._id} />
        </Card>
      </Grid>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
          )):'No Data Found '}
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
                IRO: selectedIRO??'',
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
                              const x= [remarks, res.data];


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
              setSelectedIRO(null);
            }}
            // sx={{ ml: 'auto' }}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </CommonPageLayout>
  );
};

export default ManageIRO;
