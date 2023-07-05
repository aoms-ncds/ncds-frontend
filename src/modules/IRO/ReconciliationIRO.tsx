import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { Send as SendIcon, Print as PrintIcon, Edit as EditIcon, Preview as PreviewIcon, Reply as ReplyIcon } from '@mui/icons-material';


import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import MessageItem from '../../components/MessageItem';
import { MB } from '../../extras/CommonConfig';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';

const ReconciliationIRO = () => {
  const [reconciliationIRO, setReconcilationIRO] = useState<IROrder[]>();

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
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
  useEffect(() => {
    IROServices.getReconciliation()
      .then((res) => {
        console.log(res, 'getReconciliation');
        setReconcilationIRO(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns: GridColDef<IROrder>[]= [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="Reconciliation action"
          primaryText="Actions"
          key={'Reconciliation action'}
          items={[
            // {
            //   id: 'View',
            //   text: 'Release Amount',
            //   component: Link,
            //   to: '/iro/release_amount/' + props.row._id,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'remarks',
            //   text: 'Remarks',
            //   icon: EditIcon,
            // },
            {
              id: 'Release',
              text: 'Release Amount',
              component: Link,
              to: `/iro/release_amount/${props.row._id}/add`,
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
            },
            {
              id: 'print',
              text: 'Print Reconciliation',
              icon: PrintIcon,
            },
            {
              id: 'Reconciliation',
              text: 'Reconciliation',
              icon: EditIcon,
              onClick: ()=>{
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
                if (reconciliationIRO) {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
                    return reconciliationIROs._id !== props.row._id;
                  });
                  setReconcilationIRO(filterIRO);
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
            // {
            //   id: 'View',
            //   text: 'View Details ',
            //   component: Link,
            //   to: `/fr/${props.row._id}/view`,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'Reconciliation',
            //   text: 'Reconciliation',
            //   icon: EditIcon,
            // },
            // {
            //   id: 'Close IRO',
            //   text: 'Close IRO',
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'Attachments',
            //   text: 'Attachments',
            //   icon: PrintIcon,
            // },
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
  ];
  return (
    <CommonPageLayout title="Internal Release Order">
      <br />
      <br />
      <Card style={{ height: '75vh', width: '100%' }}>
        <DataGrid rows={reconciliationIRO ?? []} columns={columns} getRowId={(row) => row._id} />
      </Card>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName}
              time={remark.updatedAt} body={remark.remark} isSent={true} />
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
        action='manage'
        postApprove={()=>IROServices.reconciliationCompleted(selectedIRO._id)}
        onClose={() => setAttachment(false)}
        // getFiles={TestServices.getBills}
        getFiles={selectedIRO?.billAttachment??[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name)
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

export default ReconciliationIRO;
