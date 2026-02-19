import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Preview as PreviewIcon, Print as PrintIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Grid, Button, Card, Box, TextField, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormControl, Radio, RadioGroup } from '@mui/material';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import DropdownButton from '../../components/DropDownButton';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import FRReceiptTemplate from './components/FRReceiptTemplate';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import FRServices from './extras/FRServices';
import * as XLSX from 'xlsx';
import CommonPageLayout from '../../components/CommonPageLayout';
import ESignatureService from '../Settings/extras/ESignatureService';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import TransactionLogDialog from './components/TransactionLogDialog';
const RejectedFr = () => {
  const [data2, setData2] = useState<FR | null>(null);
  const [openPrintFr, setOpenPrintFr] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [statusFilter1, setStatusFilter1] = useState<'Support' |'All' | 'Expanse'| null>('All'); // default WFA: Waiting for access or Reverted

  const [closedFRs, setClosedFRs] = useState<FR[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [frId, setFRId] = useState('');
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().startOf('M'),
    endDate: moment().endOf('M'),
    rangeType: 'months',
  });
  const [selectedSignaturePresident, setSignaturePresident] = useState<EsignaturePresident>({
    _id: '',
    presidentSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const filteredRows = (closedFRs ?? []).filter((row) => {
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
  const columns:GridColDef<FR>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="FR action"
          primaryText="Actions"
          key={'FR action'}
          items={[
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: Link,
            //   to: '/view' + props.row._id,
            //   icon: PrintIcon,
            // },
            // {
            //   id: 'print',
            //   text: 'Print FR',
            //   component: PDFDownloadLink,
            //   onClick: ()=>{
            //     FRServices.getAllOptimizedById(props.row?._id).then((res)=>{
            //       console.log(res.data, 'daa98');
            //       setData2(res.data);
            //     });
            //   },
            //   document: <FRReceiptTemplate president={selectedSignaturePresident} rowData={data2 as FR}/>,
            //   fileName: 'FRReceipt.pdf',
            //   icon: PrintIcon,
            // },
            {
              id: 'print',
              text: 'Print FR',
              icon: PrintIcon,
              onClick: () => {
                FRServices.getAllOptimizedById(props.row?._id).then((res)=>{
                  console.log(res.data, 'daa98');
                  setData2(res.data);
                });
                setOpenPrintFr(true);
                setTimeout(() => {
                  setOpenPrintFr(false);
                }, 2000);
              },
            },
            {
              id: 'View',
              text: 'View Details ',
              // component: Link,
              // to: `/fr/${props.row._id}/view`,
              onClick: () => {
                window.open(`/fr/${props.row._id}/view`, '_blank');
              },
              icon: PreviewIcon,
            },
            ...(hasPermissions(['WRITE_FR']) && props.row.status == FRLifeCycleStates.FR_SEND_BACK ? [
              {
                id: 'edit',
                text: 'Edit',
                // component: Link,
                // to: `/fr/${props.row._id}/edit`,
                onClick: () => {
                  window.open(`/fr/${props.row._id}/edit`, '_blank');
                },
                icon: PreviewIcon,
              },
            ] : []),
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
    { field: 'FRno', renderHeader: () => (<b>FR No</b>), width: 100, align: 'center',
      headerAlign: 'center' },
    // { field: 'FRdate', align: 'center',
    //   headerAlign: 'center', renderHeader: () => (<b>FR Date</b>), width: 90, renderCell: (props) => (
    //     <p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    //   ) },
    {
      field: 'FRdate',
      headerName: 'FRdate',
      width: 130,
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      renderHeader: (params) => <b style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</b>,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      valueGetter: (params) => params.row.division?.details.name,
      width: 150,
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      align: 'center', headerAlign: 'center',
      // renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
      valueGetter: (params) => params.row.purposeSubdivision?.name,

      width: 170,
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
      field: 'subCategory',
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
    // {
    //   field: 'requestAmount',
    //   renderHeader: () => (<b>Requested Amount</b>),
    //   width: 140,
    //   align: 'center', headerAlign: 'center',
    //   renderCell: (params: GridCellParams) => {
    //     const frRequest = params.row as FR;
    //     const particularAmount = frRequest.particulars?.reduce(
    //       (total, particular) => total + Number(particular.requestedAmount),
    //       0,
    //     );
    //     return <p>{particularAmount}</p>;
    //   },
    // },
    {
      field: 'requestAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 140,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0), // Ensure we handle potential undefined values
          0,
        );
        return particularAmount.toFixed(2) || 0; // Return 0 if the total is undefined
      },
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount || 0),
          0,
        );
        return <p>{particularAmount.toFixed(2)}</p>;
      },
    },
    // { field: 'updatedAt', align: 'center',
    //   headerAlign: 'center', renderHeader: () => (<b>Last Updated</b>), width: 130, renderCell: (props) => (
    //     <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
    //   ) },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      width: 250,
      align: 'center',
      headerAlign: 'center',
      // renderCell: (props) => (
      //   <p
      //     style={{
      //       maxWidth: 250,
      //       whiteSpace: 'normal',
      //       wordBreak: 'break-word',
      //     }}
      //   >
      //     {IROLifeCycleStates.getStatusNameByCodeTransaction(props.value).replaceAll('_', ' ')}
      //   </p>
      // ),
      valueGetter: (params) => {
        return IROLifeCycleStates.getStatusNameByCodeTransaction(params.value).replaceAll('_', ' ');
      },
    },
    {
      field: 'reasonForSentBack',
      renderHeader: () => (<b>Reason For Rejection</b>),
      width: 400,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 400,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {props.row?.reasonForReject}
        </p>
      ),
      // valueGetter: (params) => params.row?.reasonForSentBack,
    },
    { field: 'updatedAt', align: 'center',
      headerAlign: 'center', renderHeader: () => (<b>Last Updated</b>), width: 130, renderCell: (props) => (
        <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
      ) },
  ];

  useEffect(() => {
    FRServices.getAllOptimized({ dateRange: dateRange, status: [FRLifeCycleStates.REJECTED]})
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [dateRange]);
  useEffect(() => {
    FRServices.getAllOptimizedExSupprt({ dateRange: dateRange, status: [FRLifeCycleStates.REJECTED], support: statusFilter1 })
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [statusFilter1]);
  return (

    <CommonPageLayout title="Rejected Fr" momentFilter={{
      dateRange: dateRange,
      onChange: (newDateRange) => {
        setDateRange(newDateRange);
        setClosedFRs((fr) => (fr ? fr.filter((fr) => fr.FRdate.isSameOrAfter(newDateRange.startDate) && fr.FRdate.isSameOrBefore(newDateRange.endDate)) : []));
      },
      rangeTypes: ['weeks', 'months', 'quarter_years', 'years', 'customRange', 'customDay'],
      initialRange: 'months',
    }}>
      <Card sx={{ maxWidth: '78vw', height: '85vh', alignItems: 'center' }}>
        <Grid container spacing={2} padding={2} >
          <Grid item xs={4}>
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
          <Grid item>
            <FormControl>
              <RadioGroup
                aria-labelledby="Filter"
                value={statusFilter1}
                onChange={(e) =>
                  setStatusFilter1(
                    e.target.value === 'Support' ?
                      'Support' :
                      e.target.value === 'Expanse' ?
                        'Expanse' :
                        'All',
                  )
                }
                name="Filter"
                row
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Support" control={<Radio />} label="Support" />
                <FormControlLabel value="Expanse" control={<Radio />} label="Expense" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={{ px: 0 }}>
            <PermissionChecks
              permissions={['MANAGE_FR']}
              granted={(
                <Button
                  onClick={async () => {
                    const sheet =
              closedFRs ?
                closedFRs.map((fr:FR) => ([
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
                    XLSX.writeFile(workbook, 'Closed_FR_Report.xlsx', { compression: true });
                  }}
                  startIcon={<DownloadIcon />}
                  color="primary" sx={{ float: 'right', mt: 2, mr: 2 }}
                  variant="contained"
                >
                        Export
                </Button>
              )}/>
          </Grid>
          <Grid item xs={12} >
            <Box
              sx={{
                'height': 500,
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


              <DataGrid rows={closedFRs ?? []} columns={columns} getRowId={(row) => row._id} loading={closedFRs === null} style={{ height: '65vh', width: '100%' }} getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }/>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={Boolean(data2)} onClose={() => setData2(null)} maxWidth="xs" fullWidth>
        <DialogTitle> Print Fr</DialogTitle>
        <DialogContent>
         <Container>
  Downloading the FRReceipt for {data2?.FRno}
  <br />
  {data2 && (
    <BlobProvider
      document={
        <FRReceiptTemplate
          rowData={data2 as FR}
          president={selectedSignaturePresident}
        />
      }
    >
      {({ loading, url }) =>
        loading || openPrintFr ? (
          <span style={{ color: 'blue' }}>....</span>
        ) : (
          <a
            href={url ?? ''}
            download="FRReceipt.pdf"
            style={{ color: 'blue' }}
          >
            FRReceipt.pdf
          </a>
        )
      }
    </BlobProvider>
  )}
</Container>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setData2(null);
            }}
            variant="text"
          >
                  Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {frId&&<TransactionLogDialog open={openLog} onClose={()=>setOpenLog(false)} TRId={frId}/>}

    </CommonPageLayout>

  );
};

export default RejectedFr;
