import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import { Preview as PreviewIcon, Edit as EditIcon } from '@mui/icons-material';
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

const ClosedIRO = () => {
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [IROrder, setIROrder] = useState<IROrder[]>();
  const [selectedIROId, setSelectedIROId] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  const columns: GridColDef<IROrder>[]= [
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
              id: 'remarks',
              text: 'Remarks',
              icon: EditNoteIcon,
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
              } },
            {
              id: 'print',
              text: 'Print IRO',
              icon: PrintIcon,
              component: PDFDownloadLink,
              document: <IROReceiptTemplate rowData={props.row} />,
              fileName: 'IROReceipt.pdf',
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
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
    { field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 100, align: 'center',
      headerAlign: 'center' },
    {
      field: 'IRODate',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>IRO Date</b>),
      valueGetter: (params) => params.value?.format('DD/MM/YYYY'),
      width: 130 },
    {
      field: 'divisionName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      width: 150,
    },
    {
      field: 'subDivisions',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Sub Division Name</b>),
      renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
      width: 170 },
    { field: 'mainCategory', align: 'center', headerAlign: 'center', renderHeader: () => (<b>Main Category</b>), width: 245 },
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
      } },
    { field: 'updatedAt',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Last Updated</b>),
      width: 150,
      renderCell: (props) => (
        <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
      ) },
    { field: 'sanctionedAmount', align: 'center',
      headerAlign: 'center', renderHeader: () => (<b>Sanctioned Amount</b>), width: 150 },
    { field: 'sanctionedAsPer', renderHeader: () => (<b>Sanctioned As Per</b>), align: 'center',
      headerAlign: 'center', width: 180, renderCell: (params) => (
        <p
          style={{
            maxWidth: 180,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
          }}
        >
          {params.row.sanctionedAsPer}
        </p>
      ) },
    { field: 'sanctionedBank', renderHeader: () => (<b>Sanctioned Bank</b>), align: 'center',
      headerAlign: 'center', width: 130 },
  ];
  useEffect(() => {
    IROServices.getAll({ status: IROLifeCycleStates.IRO_CLOSED })
      .then((res) => {
        console.log(res, 'CLOSED');
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
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
            <MessageItem key={remark._id} sender={remark.createdBy?.basicDetails?.firstName + ' ' + remark.createdBy?.basicDetails?.lastName}
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
    </CommonPageLayout>
  );
};

export default ClosedIRO;
