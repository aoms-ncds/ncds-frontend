import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Add as AddIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import FRServices from './extras/FRServices';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../../components/MessageItem';
import { enqueueSnackbar } from 'notistack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FRreciptTemplate from './components/FRreciptTemplate';
import FRLifeCycleStates from './extras/FRLifeCycleStates';

const ManageFrPage = () => {
  const [FRRequests, setFRRequests] = useState<Frrequest[] | null>(null);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    FR: '',
  });
  const [particulars, setParticulars] = useState<Particular[]>([]);

  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        console.log(res);
        setFRRequests(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const columns: GridColDef<Frrequest>[] = [
    {
      field: '_manage',
      headerName: 'Action',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="FR action"
          primaryText="Actions"
          key={'FR action'}
          items={[
            {
              id: 'View',
              text: 'View And Manage',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: `/fr/${props.row._id}/edit`,
              icon: EditIcon,
            },
            {
              id: 'sendbackDivision',
              text: 'Send Back to Division',
              onClick: () => {
                enqueueSnackbar({
                  message: 'Sent back to divison',
                  variant: 'success',
                });
              },
              icon: PreviewIcon,
            },
            {
              id: 'remarks',
              text: 'Remarks',
              component: Link,
              // to: '/fr/view_FR/' + props.row._id,
              onClick: () => {
                toggleOpenRemarks(true);
                setSelectedFR(props.row._id);
                FRServices.getAllRemarksById(props.row._id)
                  .then((res) => setRemarks(res.data??[]))
                  .catch((error) => {
                    enqueueSnackbar({
                      variant: 'error',
                      message: error.message,
                    });
                  });
              },
              icon: EditIcon,
            },
            {
              id: 'print',
              text: 'Print FR',
              component: PDFDownloadLink,
              document: <FRreciptTemplate rowData={props.row}/>,
              fileName: 'FRReciept.pdf',
              icon: PrintIcon,
            },
            {
              id: 'notification',
              text: 'Send notification',
              component: Link,
              to: '/view' + props.row._id,
              icon: MessageIcon,
            },

          ]}
        />
      ),
    },
    {
      field: 'slno', headerName: 'SI No', width: 70, align: 'center', headerAlign: 'center',
    },
    {
      field: '_id', headerName: 'FR No', width: 70, align: 'center', headerAlign: 'center',
    },
    { field: 'FRdate', headerName: 'FR Date', renderCell: (props: any) => (
      <p> {props.row.date}</p>
    ), width: 80, align: 'center', headerAlign: 'center' },
    { field: 'divisionName', headerName: 'Division Name', renderCell: (props: any) => (
      <p> {props.row.purposeDivision?.DivisionDetails.name}</p>
    ), width: 130, align: 'center', headerAlign: 'center' },
    { field: 'subDivisionName', headerName: 'Sub Division Name', renderCell: (props: any) => (
      <p> {props.row.purposeSubdivision?.name}</p>
    ), width: 160, align: 'center', headerAlign: 'center' },
    { field: 'mainCategory', headerName: 'Main Category', renderCell: (props: any) => (
      <p> {props.row.mainCategory}</p>
    ), width: 130, align: 'center', headerAlign: 'center' },
    {
      field: 'requestedAmount',
      headerName: 'Requested Amount',
      width: 150,
      align: 'center', headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as Frrequest;
        const particularAmount = frRequest.Particulars.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },

    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130, align: 'center', headerAlign: 'center' },
    { field: 'sanctionedAsPer', headerName: 'Special Sanction', renderCell: (props: any) => (
      <p> {props.row.sanctionedAsPer}</p>
    ), width: 150, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return FRLifeCycleStates.getStatusNameByCode(params.value).replaceAll('_', ' ');
      },
    },

  ];

  return (
    <CommonPageLayout title="Manage FR">
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        component={Link}
        to="/fr/apply"
        // onClick={() => {
        // }}
      >
        Add new
      </Button>
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={FRRequests ?? []} columns={columns} getRowId={(row) => row._id} loading={FRRequests === null} />
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
                FR: selectedFR??'',
                remark: e.target.value,
              }))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      remark.remark ?
                        FRServices.addRemarks(remark)
                            .then((res) => {
                              const x= [remarks, res.data];
                              console.log('🚀 ~ file: ManageFrPage.tsx:201 ~ .then ~ x:', x);

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
              setSelectedFR(null);
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

export default ManageFrPage;
