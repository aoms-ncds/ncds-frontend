import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Preview as PreviewIcon, Print as PrintIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Grid, Button, Card } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DropdownButton from '../../components/DropDownButton';
import IROLifeCycleStates from '../IRO/extras/IROLifeCycleStates';
import PermissionChecks, { hasPermissions } from '../User/components/PermissionChecks';
import FRReceiptTemplate from './components/FRReceiptTemplate';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import FRServices from './extras/FRServices';
import * as XLSX from 'xlsx';
import CommonPageLayout from '../../components/CommonPageLayout';
const SentBack = () => {
  const [closedFRs, setClosedFRs] = useState<FR[] | null>(null);

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
            {
              id: 'print',
              text: 'Print FR',
              component: PDFDownloadLink,
              document: <FRReceiptTemplate rowData={props.row as FR}/>,
              fileName: 'FRReceipt.pdf',
              icon: PrintIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            ...(hasPermissions(['WRITE_FR']) && props.row.status == FRLifeCycleStates.FR_SEND_BACK ? [
                {
                  id: 'edit',
                  text: 'Edit',
                  component: Link,
                  to: `/fr/${props.row._id}/edit`,
                  icon: PreviewIcon,
                },
              ] : []),
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
      renderHeader: (params) => <div style={{ fontWeight: 'bold' }}>{params.colDef.headerName}</div>,
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
      field: 'requestAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 140,
      align: 'center', headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },
    { field: 'updatedAt', align: 'center',
      headerAlign: 'center', renderHeader: () => (<b>Last Updated</b>), width: 130, renderCell: (props) => (
        <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
      ) },
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
        renderHeader: () => (<b>Reason For SentBack</b>),
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
        valueGetter: (params) => params.row?.reasonForSentBack,
      },
  ];

  useEffect(() => {
    FRServices.getAll({ status: FRLifeCycleStates.FR_SEND_BACK })
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  return (

    <CommonPageLayout title="Sent Back  iro">
      <Card >
      <Grid container spacing={2} >

<Grid item xs={12} sx={{ px: 2 }}>
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
  <DataGrid rows={closedFRs ?? []} columns={columns} getRowId={(row) => row._id} loading={closedFRs === null} style={{ height: '70vh', width: '100%' }}/>
</Grid>
</Grid>
      </Card>
    </CommonPageLayout>
   
  );
};

export default SentBack
