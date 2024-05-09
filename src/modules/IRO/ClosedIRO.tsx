import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Box } from '@mui/material';
import { Preview as PreviewIcon, Download as DownloadIcon } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';
import SendIcon from '@mui/icons-material/Send';
import IROLifeCycleStates from './extras/IROLifeCycleStates';
import { enqueueSnackbar } from 'notistack';
import MessageItem from '../../components/MessageItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IROReceiptTemplate from './components/IROReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FileUploader from '../../components/FileUploader/FileUploader';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import * as XLSX from 'xlsx';
import { MB } from '../../extras/CommonConfig';
import IROTemplate from './components/IROTemplate';

const ClosedIRO = () => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>();
  const [selectedIROId, setSelectedIROId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [fr] = useState<FR>();
  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (IROrder ?? []).filter((row) => {
    if ((row.IROno && row.IROno?.toLowerCase().includes(searchText?.toLowerCase())) ||
    (row.IRODate && row.IRODate.format('DD/MM/YYYY').toLowerCase().includes(searchText?.toLowerCase()))) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value?.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });

  const columns: GridColDef<IROrder>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            // {
            //   id: 'View',
            //   text: 'Release Amount',
            //   component: Link,
            //   to: '/iro/release_amount/' + props.row._id,
            //   icon: PreviewIcon,
            // },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/iro/${props.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'remarks',
              text: 'Remarks',
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
            {
              id: 'print',
              text: 'Print IRO',
              icon: PrintIcon,
              component: PDFDownloadLink,
              // document: <IROReceiptTemplate rowData={props.row} />,
              document: <IROTemplate rowData={props.row} fr={fr} />,
              fileName: 'IROReceipt.pdf',
            },

            // {
            //   id: 'View',
            //   text: 'View Details ',
            //   component: Link,
            //   // to: `/fr/${props.row._id}/view`,
            //   to: `/iro/${props.row._id}`,
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
              icon: AttachFileIcon,
              onClick: ()=>{
                setAttachments(props.row.billAttachment);
                setViewFileUploader(true);
              },
            },
          ]}
        />
      ),
    },
    {
      field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 100, align: 'center',
      headerAlign: 'center',
    },
    // {
    //   field: 'IRODate',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>IRO Date</b>),
    //   valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
    //   width: 130,
    // },
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
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 150,
    },
    // {
    //   field: 'subDivisions',
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderHeader: () => (<b>Sub Division Name</b>),
    //   renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
    //   width: 170,
    // },
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
      field: 'submainCategory',
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
     {
      field: 'requestAmount',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 150,
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as IROrder;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },
    {
      field: 'updatedAt',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Last Updated</b>),
      width: 150,
      renderCell: (props) => (
        <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
      ),
    },
    {
      field: 'Amount Release Date',
      headerName: 'Amount Release Date',
      width: 200,
      valueGetter: (params) => params.row.releaseAmount?.transferredDate?.format('DD/MM/YYYY') ?? 'N/A',  
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sanctionedAmount', align: 'center',
      headerAlign: 'center', renderHeader: () => (<b>Sanctioned Amount</b>), width: 150,
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
        }}> {props.row.sanctionedAsPer.toString()}</p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sanctionedBank', renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center',
      headerAlign: 'center', width: 130,
    },
    {
      field: 'released amount ', headerName: 'Released Amount', width: 150, renderHeader: () => <b>Released Amount</b>, align: 'center', headerAlign: 'center',
      valueGetter: (params) => params.row.releaseAmount?.releaseAmount,
    },
  ];
  useEffect(() => {
    IROServices.getAll({ status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => {
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <CommonPageLayout title="Closed IRO">
      <Card sx={{ maxWidth: '78vw',height: '85vh', alignItems: 'center' }} >
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
                        IROrder ?
                          IROrder.map((iro:IROrder) => ([
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
                const headers=[
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
                XLSX.writeFile(workbook, 'Closed_IRO_Report.xlsx', { compression: true });
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
            <MessageItem key={remark._id} sender={remark.createdBy?.basicDetails?.firstName + ' ' + remark.createdBy?.basicDetails?.lastName}
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

      />
    </CommonPageLayout>
  );
};

export default ClosedIRO;
