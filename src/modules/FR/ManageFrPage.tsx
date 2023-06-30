import { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import DropdownButton from '../../components/DropDownButton';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Add as AddIcon } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import {
  Alert,
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
import FRReceiptTemplate from './components/FRReceiptTemplate';
import FRLifeCycleStates from './extras/FRLifeCycleStates';
import PermissionChecks from '../User/components/PermissionChecks';
const ManageFrPage = () => {
  const [FRRequests, setFRRequests] = useState<FR[] | null>(null);

  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedFR, setSelectedFR] = useState<string|null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });

  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        // console.log(res, 'rr');
        setFRRequests(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const columns: GridColDef<FR>[] = [
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
              id: 'sendBackDivision',
              text: 'Send Back to Division',
              onClick: () => {
                enqueueSnackbar({
                  message: 'Sent back to division',
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
              document: <FRReceiptTemplate rowData={props.row}/>,
              fileName: 'FRReceipt.pdf',
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
      field: 'FRno',
      renderHeader: () => (<b>FR No</b>),
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'FRdate',
      renderHeader: () => (<b>FR Date</b>),
      renderCell: (props) => (<p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
      ), width: 80, align: 'center', headerAlign: 'center',
    },
    {
      field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      renderCell: (props) => (<p> {props.row.purposeDivision?.details.name}</p>),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>
      ),
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'mainCategory',
      renderHeader: () => (<b>Main Category</b>),
      renderCell: (props) => (<p> {props.row.mainCategory}</p>),
      width: 240,
      align: 'center',
      headerAlign: 'center' },
    {
      field: 'requestedAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 150,
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

    {
      field: 'lastUpdateDate',
      renderHeader: () => (<b>Last Updated</b>),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sanctionedAsPer',
      renderHeader: () => (<b>Special Sanction</b>),
      renderCell: (props) => (
        <p> {props.row.sanctionedAsPer}</p>
      ),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      renderHeader: () => (<b>Status</b>),
      width: 205,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return FRLifeCycleStates.getStatusNameByCodeFR(params.value).replaceAll('_', ' ');
      },
    },

  ];

  return (
    <CommonPageLayout title="Manage FR">
      <PermissionChecks
        permissions={['READ_FR']}
        granted={(
          <>
            <Grid item xs={12} lg={6}>
              <PermissionChecks
                permissions={['WRITE_FR']}
                granted={(
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
                )}
              />
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
                    // eslint-disable-next-line max-len
                    <MessageItem key={remark._id} sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName} time={remark.updatedAt} body={remark.remark} isSent={true} />
                  )):'No Data Found '}
                </DialogContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (remark.remark) {
                      FRServices.addRemarks(remark)
        .then((res) => {
          const x = [...remarks, res.data];
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
        });
                    }
                  }}
                >
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
                            <IconButton type='submit'
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
                </form>
              </Dialog>
            </Grid>
          </>
        )}
        denied={(missingPermissions) => (
          <Grid item xs={12} lg={6}>
            <Alert severity='error'>
                Missing permissions: <b>{missingPermissions.join(', ').replaceAll('_', ' ')}</b>
            </Alert>
          </Grid>
        )}
      />


    </CommonPageLayout>
  );
};

export default ManageFrPage;
