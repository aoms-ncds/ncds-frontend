import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Grid, Box } from '@mui/material';
import { Send as SendIcon, Edit as EditIcon, Preview as PreviewIcon, Print as PrintIcon, Download as DownloadIcon } from '@mui/icons-material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import MessageItem from '../../components/MessageItem';
import { MB } from '../../extras/CommonConfig';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { useAuth } from '../../hooks/Authentication';
import * as XLSX from 'xlsx';

const ReconciliationIRO = () => {
  const [reconciliationIRO, setReconcilationIRO] = useState<IROrder[]>();
  const user = useAuth();
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [remarks, setRemarks] = useState<Remark[]>([]);

  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  const [attachment, setAttachment] = useState<boolean>(false);
  const [selectedIRO, setSelectedIRO] = useState<IROrder>({
    _id: '',
    IROno: '',
    IRODate: moment(),
    purpose: 'Division',
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
    createdBy: {
      workerCode: '',
      kind: 'worker',
      tokens: [],
      basicDetails: {
        firstName: '',
        middleName: '',
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
        status: null,
        noOfChurches: 0,
      },
      supportDetails: {
        selfSupport: true,
        percentageofSelfSupport: 0,
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
    specialsanction: '',
  });

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (reconciliationIRO ?? []).filter((row) => {
    if ((row.IROno && row.IROno.toLowerCase().includes(searchText.toLowerCase())) ||
    (row.IRODate && row.IRODate.format('DD/MM/YYYY').toLowerCase().includes(searchText?.toLowerCase()))) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const permissions = (user.user as User)?.permissions;
  useEffect(() => {
    if (permissions?.FCRA_ACCOUNTS_ACCESS) {
      console.log('FRDD');
      IROServices.getReconciliation({ sourceOfAccount: 'FCRA' })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (permissions?.LOCAL_ACCOUNT_ACCESS) {
      IROServices.getReconciliation({ sourceOfAccount: 'Local' })
        .then((res) => {
          setReconcilationIRO(() => [...res.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_1) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 1' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_2) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 2' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_3) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 3' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // if (permissions?.OTHER_ACCOUNTS_ACCESS_4) {
    //   IROServices.getReconciliation({ sanctionedBank: 'Other Bank 4' })
    //     .then((res) => {
    //       setReconcilationIRO(() => [...res.data]);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    if (permissions?.OTHER_ACCOUNTS_ACCESS && permissions?.LOCAL_ACCOUNT_ACCESS && permissions?.FCRA_ACCOUNTS_ACCESS) {
      IROServices.getReconciliation()
        .then((res) => {
          setReconcilationIRO(res.data);
        });
    }
    // IROServices.getReconciliation()
    //   .then((res) => {
    //     setReconcilationIRO(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  }, [attachment]);

  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      headerName: '',
      minWidth: 20,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
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
              id: 'remarks',
              text: 'Remark',
              icon: EditNoteIcon,

              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedIROId(props.row._id);
                IROServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data ?? []))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
            },
            ...(props.row.status == IROLifeCycleStates.AMOUNT_RELEASED ? [
              {
                id: 'Reconciliation',
                text: 'Reconciliation',
                icon: EditIcon,
                onClick: () => {
                  setAttachment(true);
                  setSelectedIRO(props.row);
                },
              }] : []),
            {
              id: 'Close IRO',
              text: 'Close IRO',
              icon: PreviewIcon,
              onClick: () => {
                IROServices.close(props.row._id)
                  .then((res) => {
                    if (reconciliationIRO) {
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      const filterIRO = reconciliationIRO?.filter((reconciliationIROs) => {
                        return reconciliationIROs._id !== props.row._id;
                      });
                      setReconcilationIRO(filterIRO);
                    }

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
            {
              id: 'Attachments',
              text: 'Attachments',
              icon: PrintIcon,
              onClick: () => {
                // console.log(props.row.particulars );
                // props.row.particulars.map((item)=>{
                setAttachments(props.row.billAttachment);
                // });
                console.log(attachments, 'setAttachments(item.attachment);');

                setViewFileUploader(true);
              },
            },
          ]}
        />
      ),
    },
    { field: 'IROno', headerName: 'IRO No', width: 100, renderHeader: () => (<b>IRO No</b>), align: 'center', headerAlign: 'center' },
    {
      field: 'IRODate', headerName: 'IRO Date', width: 130, renderHeader: () => (<b>IRO Date</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
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
    // {
    //   field: 'subDivisionName',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>
    //   ),
    //   width: 160,
    //   align: 'center',
    //   headerAlign: 'center',
    // },
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
      field: 'submainCategory',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Category</b>,
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
          {/* {props.row.particulars.map((e)=>e.subCategory3 =='Select'? e.subCategory2: e.subCategory3 )} */}
          {
          props.row.particulars[0].subCategory3 =='Select'
          ? props.row.particulars[0].subCategory2
          : props.row.particulars[0].subCategory2 == 'Select' ?
           props.row.particulars[0].subCategory1 : ''

          }
        </p>
      ),
    },
    // {
    //   field: 'requestAmount', headerName: 'Requested Amount', width: 150, align: 'center', headerAlign: 'center',
    //   renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
    //   renderCell: (params: GridCellParams) => {
    //     const frRequest = params.row as IROrder;
    //     const particularAmount = frRequest.particulars?.reduce(
    //       (total, particular) => total + Number(particular.requestedAmount),
    //       0,
    //     );
    //     return <p>{particularAmount}</p>;
    //   },
    // },
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
    {
      field: 'updatedAt', headerName: 'Last Updated', width: 130, renderHeader: () => (<b>Last Updated</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'), align: 'center', headerAlign: 'center',
    },
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      width: 200,
      valueGetter: (params) => {
        const transferredDate = params.row.releaseAmount?.transferredDate;
        if (transferredDate) {
            const formattedDate = moment(transferredDate).format("YYYY-MM-DD"); // Adjust the format as needed
            return formattedDate;
        } else {
            return 'N/A';
        }
    } 
    ,    renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
 
      align: 'center',
      headerAlign: 'center',
    },
    // { field: 'sanction', headerName: 'Special Sanction', width: 130, renderHeader: () => (<b>Special Sanction</b>), align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAmount', headerName: 'Sanctioned Amount', width: 130, renderHeader: () => (<b>Sanctioned Amount</b>), align: 'center', headerAlign: 'center' },
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
        }}> {props.row.sanctionedAsPer.toString()}</p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'sanctionedBank', headerName: 'Sanctioned Bank', width: 150, renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center', headerAlign: 'center' },
    {
      field: 'released amount ', headerName: 'Released Amount', width: 150, renderHeader: () => <b>Released Amount</b>, align: 'center', headerAlign: 'center',
      valueGetter: (params) => params.row.releaseAmount?.releaseAmount,
    },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      // renderCell: (props) => (
      //   <p
      //     style={{
      //       maxWidth: 205,
      //       whiteSpace: 'normal',
      //       wordBreak: 'break-word',
      //     }}
      //   >
      //     {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
      //   </p>
      // ),
      align: 'center',
      width: 250,
      headerAlign: 'center',
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
      },
    },
  ];
  return (
    <CommonPageLayout title="Reconciliation IRO">
      <Card sx={{ maxWidth: '78vw',height: '85vh', alignItems: 'center' }}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={6}>
            {/* <Grid sx={{ width: '30px', paddingLeft: '85%', paddingTop: '2px' }}> */}
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              fullWidth
              style={{ width: '25%', alignItems: 'start' }}
            />
            {/* </Grid> */}
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={async () => {
                const sheet =
                  reconciliationIRO ?
                    reconciliationIRO.map((iro: IROrder) => ([
                      iro.IROno,
                      iro.IRODate.format('DD/MM/YYYY'),
                      iro.division?.details.name,
                      iro.purposeSubdivision?.name,
                      iro.mainCategory,
                      iro.particulars?.reduce(
                        (total, particular) => total + Number(particular.requestedAmount),
                        0,
                      ),
                      iro.sanctionedAmount,
                      iro.sanctionedBank,
                      iro.sanctionedAsPer,
                      iro.releaseAmount?.releaseAmount,
                      iro.releaseAmount?.transferredDate?.format('DD/MM/YYYY'),
                      IROLifeCycleStates.getStatusNameByCodeTransaction(iro.status).replaceAll('_', ' '),
                    ])) :
                    [];
                const headers = [
                  'IRO No',
                  'Date',
                  'Division',
                  'Sub Division',
                  'Main Category',
                  'Requested Amt',
                  'Sanctioned Amt',
                  'Sanctioned Bank',
                  'Sanctioned As per',
                  'Released Amt',
                  'Released Date',
                  'Status',
                ];
                const worksheet = XLSX.utils.json_to_sheet(sheet);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                XLSX.writeFile(workbook, 'FRReport.xlsx', { compression: true });
              }}
              startIcon={<DownloadIcon />}
              color="primary" sx={{ float: 'right', mr: 2, mt: 2 }}
              variant="contained"
            >
              Export
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                'height': 450,
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
              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} style={{ height: '75vh', width: '100%' }} getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }/>

            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ? remarks.map((remark) => (
            <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName}
              time={remark.updatedAt} body={remark.remark} isSent={true} />
          )) : 'No Data Found '}
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
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={attachment}
        action='manage'
        postApprove={() => IROServices.reconciliationCompleted(selectedIRO._id)}
        onClose={() => setAttachment(false)}
        // getFiles={TestServices.getBills}
        getFiles={selectedIRO?.billAttachment ?? []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          return FileUploaderServices.uploadFile(file, onProgress, 'IRO/reconciliation', file.name)
            .then((res) => {
              setSelectedIRO(() => ({
                ...selectedIRO,
                billAttachment: selectedIRO?.billAttachment.length > 0 ? [...selectedIRO.billAttachment, res.data] : [res.data],
              }));

              return res;
            });
        }}
        renameFile={(fileId: string, newName: string) => {
          setSelectedIRO(() => ({
            ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.map((file) =>
              file._id === fileId ? { ...file, filename: newName } : file,
            ),
          }));
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          setSelectedIRO(() => ({
            ...selectedIRO,
            billAttachment: selectedIRO?.billAttachment.filter((file) => file._id !== fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />

      <FileUploader
        title="Attachments"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 3,
          maxTotalSize: 3 * MB,
        }}
        // accept={['video/*']}
        open={viewFileUploader}
        action="view"
        onClose={() => setViewFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={attachments}
      // uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
      //   const resp = FileUploaderServices.uploadFile(file, onProgress, 'FR', file.name).then((res) => {
      //     setNewParticular((particularDetails) => ({
      //       ...particularDetails,
      //       attachment: [...particularDetails.attachment, res.data],
      //     }));
      //     return res;
      //   });
      //   return resp;
      // }}
      // renameFile={(fileId: string, newName: string) => {
      //   setNewParticular((particularDetails) => ({
      //     ...particularDetails,
      //     attachment: particularDetails.attachment.map((file) => (file._id === fileId ? { ...file, filename: newName } : file)),
      //   }));
      //   return FileUploaderServices.renameFile(fileId, newName);
      // }}
      // deleteFile={(fileId: string) => {
      //   setNewParticular((particularDetails) => ({
      //     ...particularDetails,
      //     attachment: particularDetails.attachment.filter((file) => file._id !== fileId),
      //   }));
      //   return FileUploaderServices.deleteFile(fileId);
      // }}
      />
    </CommonPageLayout>
  );
};

export default ReconciliationIRO;
