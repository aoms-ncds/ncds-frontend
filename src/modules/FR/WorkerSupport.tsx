import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridColumnGroupingModel, GridRowParams } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import GridLinkAction from '../../components/GridLinkAction';
import { Edit as EditIcon, Preview as PreviewIcon, Download as DownloadIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import WorkersServices from '../Workers/extras/WorkersServices';
import moment from 'moment';

const WorkerSupportPage = () => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [remark, setRemark] = useState<CreatableRemark>({
    remark: '',
    transactionId: '',
  });
  // useEffect(() => {
  //   DivisionsServices.getDivisions()
  //     .then((res) => {
  //       console.log(res.data);
  //       setDivisions(res.data);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, []);

  useEffect(() => {
    WorkersServices.getAll({ status: UserLifeCycleStates.CREATED })
      .then((res) => {
        console.log(res);
        setWorkers(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns: GridColDef<IWorker>[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 5,
      getActions: (params: GridRowParams) =>
        [
          <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/users/worker/${params.row._id}`} />,
          <GridLinkAction key={2} label="Edit" icon={<EditIcon />} showInMenu to={`/workers/edit/${params.row._id}`} />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    { field: 'workerCode', width: 100, renderHeader: () => <b>{'Worker Code'}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>First Name</b>,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'lastName',
      width: 100,
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'division', width: 100, align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details.name },
    {
      field: 'sub_division',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Sub-Division'}</b>,
      valueGetter: (params) => params.row.officialDetails.divisionHistory[params.row.officialDetails?.divisionHistory.length - 1]?.subDivision?.name,
    },

    {
      field: 'basic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.basic,
    }, {
      field: 'prev_basic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevBasic,
    },
    {
      field: 'last_updated_basic',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.basicLastUpdatedAt?moment( params.row.supportStructure?.basicLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },

    {
      field: 'HRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.HRA,
    }, {
      field: 'prev_HRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevHRA,
    },
    {
      field: 'last_updated_HRA',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.HRALastUpdatedAt?moment( params.row.supportStructure?.HRALastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },

    {
      field: 'spouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.spouseAllowance,
    }, {
      field: 'prev_spouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevSpouseAllowance,
    },
    {
      field: 'last_updated_spouseAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.spouseAllowanceLastUpdatedAt?moment( params.row.supportStructure?.spouseAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'positionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.positionalAllowance,
    },
    {
      field: 'prev_positionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPositionalAllowance,
    },
    {
      field: 'last_updated_positionalAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.positionalAllowanceLastUpdatedAt?moment( params.row.supportStructure?.positionalAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'specialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,

      valueGetter: (params) => params.row.supportStructure?.specialAllowance,
    }, {
      field: 'prev_specialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,

      valueGetter: (params) => params.row.supportStructure?.prevSpecialAllowance,
    },
    {
      field: 'last_updated_specialAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.specialAllowanceLastUpdatedAt?moment( params.row.supportStructure?.specialAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },

    {
      field: 'impactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.impactDeduction,
    }, {
      field: 'prev_impactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevImpactDeduction,
    },
    {
      field: 'last_updated_impactDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.impactDeductionLastUpdatedAt?moment( params.row.supportStructure?.impactDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'telAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.telAllowance,
    }, {
      field: 'prev_telAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevTelAllowance,
    },
    {
      field: 'last_updated_telAllowance',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.telAllowanceLastUpdatedAt?moment( params.row.supportStructure?.telAllowanceLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'PIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.PIONMissionaryFund,
    }, {
      field: 'prev_PIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevPIONMissionaryFund,
    },
    {
      field: 'last_updated_PIONMissionaryFund',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt?moment( params.row.supportStructure?.PIONMissionaryFundLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },

    {
      field: 'MUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Current'}</b>,
      valueGetter: (params) => params.row.supportStructure?.MUTDeduction,
    }, {
      field: 'prev_MUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Prev '}</b>,
      valueGetter: (params) => params.row.supportStructure?.prevMUTDeduction,
    },
    {
      field: 'last_updated_MUTDeduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Updated At '}</b>,
      valueGetter: (params) =>params.row.supportStructure?.MUTDeductionLastUpdatedAt?moment( params.row.supportStructure?.MUTDeductionLastUpdatedAt)?.format('DD/MM/YYYY'):null,
    },
    {
      field: 'total',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Total Amount'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0),
    },
    {
      field: 'total_deduction',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Total Deduction:'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.impactDeduction ?? 0) +
      (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
      (params.row.supportStructure?.MUTDeduction ?? 0),
    },
    {
      field: 'net_amount',
      width: 100,
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>{'Net Amount:'}</b>,
      valueGetter: (params) => (params.row.supportStructure?.basic ?? 0) +
      (params.row.supportStructure?.HRA ?? 0) +
      (params.row.supportStructure?.spouseAllowance ?? 0) +
      (params.row.supportStructure?.positionalAllowance ?? 0) +
      (params.row.supportStructure?.specialAllowance ?? 0) +
      (params.row.supportStructure?.telAllowance ?? 0) -
      (
        (params.row.supportStructure?.impactDeduction ?? 0) +
        (params.row.supportStructure?.PIONMissionaryFund ?? 0) +
        (params.row.supportStructure?.MUTDeduction ?? 0)
      ),
    },

  ];
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'details',
      description: '',
      renderHeaderGroup: () => <b>{'Worker Details'}</b>,
      children: [{ field: 'workerCode' }, { field: 'firstName' }, { field: 'lastName' }, { field: 'division' }, { field: 'sub_division' }],
    },
    {
      groupId: 'Basic',
      description: '',
      renderHeaderGroup: () => <b>{'Basic'}</b>,
      children: [{ field: 'prev_basic' }, { field: 'basic' }, { field: 'last_updated_basic' }],
    },
    {
      groupId: 'HRA',
      description: '',
      renderHeaderGroup: () => <b>{'HRA'}</b>,
      children: [{ field: 'prev_HRA' }, { field: 'HRA' }, { field: 'last_updated_HRA' }],
    },
    {
      groupId: 'spouseAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Spouse Allowance'}</b>,
      children: [{ field: 'prev_spouseAllowance' }, { field: 'spouseAllowance' }, { field: 'last_updated_spouseAllowance' }],
    },
    {
      groupId: 'positionalAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Positional Allowance'}</b>,
      children: [{ field: 'prev_positionalAllowance' }, { field: 'positionalAllowance' }, { field: 'last_updated_positionalAllowance' }],
    },
    {
      groupId: 'specialAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Special Allowance'}</b>,
      children: [{ field: 'prev_specialAllowance' }, { field: 'specialAllowance' }, { field: 'last_updated_specialAllowance' }],
    },
    {
      groupId: 'impactDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'Impact Deduction'}</b>,
      children: [{ field: 'prev_impactDeduction' }, { field: 'impactDeduction' }, { field: 'last_updated_impactDeduction' }],
    },
    {
      groupId: 'telAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'Tel Allowance'}</b>,
      children: [{ field: 'prev_telAllowance' }, { field: 'telAllowance' }, { field: 'last_updated_telAllowance' }],
    },
    {
      groupId: 'PNRMAllowance',
      description: '',
      renderHeaderGroup: () => <b>{'PNRM Allowance'}</b>,
      children: [{ field: 'prev_PIONMissionaryFund' }, { field: 'PIONMissionaryFund' }, { field: 'last_updated_PIONMissionaryFund' }],
    },
    {
      groupId: 'MUTDeduction',
      description: '',
      renderHeaderGroup: () => <b>{'WS Deduction'}</b>,
      children: [{ field: 'prev_MUTDeduction' }, { field: 'MUTDeduction' }, { field: 'last_updated_MUTDeduction' }],
    },
    {
      groupId: 'Total',
      description: '',
      renderHeaderGroup: () => <b>{'Total'}</b>,
      children: [{ field: 'total' }, { field: 'total_deduction' }, { field: 'net_amount' }],
    },

  ];
  return (
    <CommonPageLayout title="New Workers for Approval">
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={async () => {
                const sheet = workers ?
                  workers.map((user: IWorker) => [
                    user.workerCode,
                    user.basicDetails.firstName,
                    user.basicDetails.lastName,
                    user.division?.details.name,
                    user.officialDetails.divisionHistory[user.officialDetails.divisionHistory.length - 1].subDivision,
                    user.basicDetails.phone,
                    user.basicDetails.email,
                    user.basicDetails.alternativePhone,
                    user.basicDetails.dateOfBirth,
                    user.basicDetails.field,
                    user.basicDetails.martialStatus,
                    user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                    user.basicDetails.highestQualification,
                    user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                    user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                    user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                      user.officialDetails.dateOfLeaving?.from(user.officialDetails.dateOfJoining, true) :
                      user.officialDetails.dateOfJoining?.fromNow(true),
                    user.spouse?.spouseCode,
                    user.spouse && user.spouse?.firstName + ' ' + user.spouse?.lastName,
                    (user.supportStructure?.basic ?? 0) +
                        (user.supportStructure?.HRA ?? 0) +
                        (user.supportStructure?.spouseAllowance ?? 0) +
                        (user.supportStructure?.positionalAllowance ?? 0) +
                        (user.supportStructure?.specialAllowance ?? 0) +
                        (user.supportStructure?.telAllowance ?? 0),
                    user.insurance?.impactNo,
                  ]) :
                  [];
                const headers = [
                  'Workers Code',
                  'First Name',
                  'Last Name',
                  'Division',
                  'Sub Division',
                  'Mobile No',
                  'Email ID',
                  'Alt Phone',
                  'DOB',
                  'Field',
                  'Marital Status',
                  'Known Languages',
                  'Highest Qualifications',
                  'Status',
                  'Date of Joining',
                  'No of year in Org',
                  'Spouse Code',
                  'Spouse Name',
                  'Net Support',
                  'Insurance No',
                ];
                const worksheet = XLSX.utils.json_to_sheet(sheet);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                XLSX.writeFile(workbook, 'Approve_Worker_Report.xlsx', { compression: true });
              }}
              startIcon={<DownloadIcon />}
              color="primary"
              sx={{ float: 'right', mt: 2, mr: 2 }}
              variant="contained"
            >
              Export
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataGrid rows={workers ?? []}
              columns={columns}
              getRowId={(row) => row._id}
              loading={workers === null}
              columnGroupingModel={columnGroupingModel}
              experimentalFeatures={{ columnGrouping: true }}
            />
          </Grid>
        </Grid>
      </Card>
      <Dialog open={openRemarks} fullWidth maxWidth="md">
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          {remarks.length > 0 ?
            remarks.map((remark) => (
              // eslint-disable-next-line max-len
              <MessageItem
                key={remark._id}
                sender={remark.createdBy.basicDetails.firstName + ' ' + remark.createdBy.basicDetails.lastName}
                time={remark.updatedAt}
                body={remark.remark}
                isSent={true}
              />
            )) :
            'No Data Found '}
        </DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (remark.remark) {
              WorkersServices.addRemarks(remark)
                .then((res) => {
                  const x = [...remarks, res.data];
                  console.log('user ', x);

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
                  user: selectedUser ?? '',
                  remark: e.target.value,
                }))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
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
                setSelectedUser(null);
              }}
              sx={{ mx: '1rem', py: 1.7 }}
            >
              close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </CommonPageLayout>
  );
};

export default WorkerSupportPage;
