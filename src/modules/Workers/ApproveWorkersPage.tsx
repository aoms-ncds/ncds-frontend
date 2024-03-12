import React, { SetStateAction, useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import MessageItem from '../../components/MessageItem';
import SendIcon from '@mui/icons-material/Send';
import WorkersServices from './extras/WorkersServices';
import GridLinkAction from '../../components/GridLinkAction';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import * as XLSX from 'xlsx';

const ApproveWorkerPage = () => {
  const [workers, setWorkers] = useState<IWorker[] | null>(null);
  const [openRemarks, toggleOpenRemarks] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [searchText, setSearchText] = useState('');
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

  const approveWorker = (id: string) => {
    WorkersServices.approve(id)
      .then(() => {
        if (workers) {
          const newWorkers = workers.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkers(newWorkers);
        }
        enqueueSnackbar({
          message: 'Approved',
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const rejectWorker = (id: string) => {
    WorkersServices.reject(id)
      .then(() => {
        if (workers) {
          const newWorkers = workers.filter((workerRequests) => {
            return workerRequests._id !== id;
          });
          setWorkers(newWorkers);
        }
        enqueueSnackbar({
          message: 'Rejected',
          variant: 'warning',
        });
      })
      .catch((err) => {
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const assignRemark = (id: string) => {
    console.log('setremark', id);
    toggleOpenRemarks(true);
    setSelectedUser(id);
    console.log({ selectedUser });
    WorkersServices.getAllRemarksById(id)
      .then((res) => setRemarks(res.data ?? []))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  };

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (workers ?? []).filter((row) => {
    if ((row.basicDetails.firstName && row.basicDetails.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.basicDetails.lastName && row.basicDetails.lastName.toLowerCase().includes(searchText.toLowerCase()))) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });
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
          <GridLinkAction
            key={3}
            label="Remark"
            icon={<EditNoteIcon />}
            showInMenu
            onClick={() => {
              assignRemark(params.row._id);
            }}
          />,
          <GridLinkAction
            key={4}
            label="Approve"
            icon={<DoneIcon />}
            showInMenu
            onClick={() => {
              approveWorker(params.row._id);
            }}
          />,
          <GridLinkAction
            key={5}
            label="Reject"
            icon={<ClearIcon />}
            showInMenu
            onClick={() => {
              rejectWorker(params.row._id);
            }}
          />,
          false,
        ].filter((action) => action !== false) as JSX.Element[],
    },
    { field: 'workerCode', width: 170, renderHeader: () => <b>{'Worker Code'}</b>, align: 'center', headerAlign: 'center' },
    {
      field: 'firstName',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => <b>First Name</b>,
      valueGetter: (params) => params.row.basicDetails.firstName,
    },
    {
      align: 'center',
      headerAlign: 'center',
      field: 'lastName',
      width: 130,
      renderHeader: () => <b>Last Name</b>,
      valueGetter: (params) => params.row.basicDetails.lastName,
    },
    { field: 'phone', width: 130, align: 'center', headerAlign: 'center', renderHeader: () => <b>Phone</b>, valueGetter: (params) => params.row.basicDetails.phone },
    { field: 'division', width: 130, align: 'center', headerAlign: 'center', renderHeader: () => <b>Division</b>, valueGetter: (params) => params.row.division?.details.name },
  ];
  return (
    <CommonPageLayout title="New Workers for Approval">
      <Card sx={{height:'70vh'}}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={6}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              fullWidth
              style={{ width: '25%', alignItems: 'start' }}
            />
             </Grid>
            <Grid item xs={6}>
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
                      (user.supportStructure?.PIONMissionaryFund ?? 0) +
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
            <Box sx={{
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
              <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id} loading={workers === null} getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              } />

            </Box>
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

export default ApproveWorkerPage;
