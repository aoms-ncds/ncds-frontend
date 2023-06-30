import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { Print as PrintIcon, AttachFile as AttachmentIcon, Edit as EditIcon, Preview as PreviewIcon, Reply as ReplyIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { enqueueSnackbar } from 'notistack';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import IROServices from './extras/IROServices';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import moment from 'moment';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';


const ManageIRO = () => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [fileUploaderAction, setFileUploaderAction] = useState<'add'|'manage'>('add');
  const [attachment, setAttachment] = useState<boolean>(false);
  const [selectedIRO, setSelectedIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: '',
    lastUpdateDate: moment(),
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
  });
  const [selectedIROId, setSelectedIROId] = useState<string|null>(null);

  const [IROrder, setIROrder] = useState<IROrder[]>();
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

  useEffect(() => {
    if (selectedIRO._id!='') {
      IROServices.updateIRO(selectedIRO._id, selectedIRO);
    }
  }, [selectedIRO.billAttachment]);

  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      renderCell: (props) => (
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
              to: `/iro/${props.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'Release',
              text: 'Release Amount',
              component: Link,
              to: '/iro/release_amount/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'remarks',
              text: 'Remarks',
              icon: EditIcon,

              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedIROId(props.row._id);
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
              document: <IROReceiptTemplate RowData={props.row} />,
              fileName: 'IROReceipt.pdf',


            },

            {
              id: 'Reconciliation',
              text: 'Reconciliation',
              icon: EditIcon,
              onClick: ()=>{
                setFileUploaderAction('manage');
                setAttachment(true);
                setSelectedIRO(props.row);
              },
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
              icon: AttachmentIcon,
              onClick: ()=>{
                setAttachment(true);
                setFileUploaderAction('add');
                setSelectedIRO(props.row);
              },
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
    { field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 100 },
    { field: 'IRODate', renderHeader: () => (<b>IRO Date</b>), headerName: 'IRO Date', width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY') },
    {
      field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      width: 150,
    },
    { field: 'subDivisionName', renderHeader: () => (<b>Sub Division Name</b>), width: 170 },
    { field: 'mainCategory', renderHeader: () => (<b>Main Category</b>), width: 150 },
    { field: 'requestAmount', renderHeader: () => (<b>Requested Amount</b>), width: 140 },
    { field: 'lastUpdateDate', renderHeader: () => (<b>Last Updated</b>), width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    },
    { field: 'sanction', renderHeader: () => (<b>Special Sanction</b>), width: 130 },
    { field: 'sanctionedAmount', renderHeader: () => (<b>Sanctioned Amount</b>), width: 145 },
    { field: 'sanctionedAsPer', renderHeader: () => (<b>Sanctioned As Per</b>), width: 140 },
    { field: 'sourceBank', renderHeader: () => (<b>Source Bank</b>), width: 130 },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCodeFR(params.value).replaceAll('_', ' ');
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
                IRO: selectedIROId??'',
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
            close
          </Button>
        </DialogActions>
      </Dialog>
      <FileUploader
        title=" Bill Upload"
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
        open={attachment}
        action={fileUploaderAction}
        postApprove={()=>IROServices.reconciliationCompleted(selectedIRO._id)}
        onClose={() => setAttachment(false)}
        // getFiles={TestServices.getBills}
        getFiles={selectedIRO?.billAttachment??[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/Reconciliation', file.name)
          .then((res)=>{
            console.log(res.data._id);
            setSelectedIRO(()=>({ ...selectedIRO,
              billAttachment: selectedIRO?.billAttachment.length>0? [...selectedIRO.billAttachment, res.data]:[res.data],
            } ));

            return res;
          });
        }}
        renameFile={(fileId: string, newName: string) => {
          setSelectedIRO(()=>({ ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ) } ));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setSelectedIRO(()=>({ ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.filter((file)=>file._id!==fileId),
          } ));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </CommonPageLayout>
  );
};

export default ManageIRO;
