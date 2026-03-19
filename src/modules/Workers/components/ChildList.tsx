import { SetStateAction, useEffect, useState } from 'react';
import { Autocomplete, Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import WorkersServices from '../extras/WorkersServices';
import GridLinkAction from '../../../components/GridLinkAction';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import { NoAccounts as NoAccountsIcon, Person as PersonIcon, Delete as DeleteIcon, Download as DownloadIcon } from '@mui/icons-material';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import { useNavigate } from 'react-router-dom';
import ChildrenServices from '../extras/ChildrenServices';
import CloseIcon from '@mui/icons-material/Close';
import * as XLSX from 'xlsx';
import { IChildSupport } from '../../Settings/extras/LanguageTypes';

const ChildListPage = (props: FormComponentProps<Child[], { status?: 'reject' | 'active' }>) => {
  // const [childList, setChildList] = useState<Child[]>();
  const [rowId, setRowId] = useState('');
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonForDeactivation, setReasonForDeactivation] = useState<string | null>('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [deleteModel, setDeleteModel] = useState(false);
  const [rowData, setRow] = useState<any>(null);

  const deactivateChild = (id: string, reason: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Child',
      variant: 'info',
    });
    WorkersServices.deactivatechild(id, reason)
      .then((res) => {
        if (props.value) {
          const newchildRequests = props.value.filter((childRequests) => childRequests._id !== id);
          props.onChange(newchildRequests);
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  console.log(props.value, 'props.value');

  const activateChild = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Activating Child',
      variant: 'info',
    });
    WorkersServices.activatechild(id)
      .then((res) => {
        if (props.value) {
          const newchildRequests = props.value.filter((childRequests) => childRequests._id !== id);
          props.onChange(newchildRequests);
        }
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const handleClick = (rowId: any) => {
    ChildrenServices.getById(rowId.id)
      .then((res) => {
        navigate(`/users/worker/${res.data.childOf}/3`);
        window.open(`/users/worker/${res.data.childOf}/3`, '_blank');
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  const handleEdit = (rowId: any) => {
    ChildrenServices.getById(rowId.id)
      .then((res) => {
        navigate(`/workers/edit/${res.data.childOf}/3`);
        window.open(`/workers/edit/${res.data.childOf}/3`, '_blank');
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };


  const handleDelete = (params: any) => {
    ChildrenServices.deleteChild(params.row._id)
      .then((res) => {
        enqueueSnackbar({ message: res.message, variant: 'success' });
        navigate('/workers/');
      })
      .catch((error) => {
        enqueueSnackbar({ message: error.message, variant: 'error' });
        console.error('Error fetching user:', error);
      });
    console.log(params.row._id, 'ooo');
  };

  const filteredRows = (props.value ?? []).filter((row) => {
    const childOfFullName = `${row.childOf?.basicDetails?.firstName || ''} ${row.childOf?.basicDetails?.lastName || ''}`.toLowerCase();

    const searchPattern = new RegExp(`${searchText.trim().replace(/\s+/g, '\\s+')}`, 'i');

    if ((row.firstName && row.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
        (row.lastName && row.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
        ((row as any).division.details.name && (row as any).division.details.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (row.dateOfBirth && moment(row.dateOfBirth).isValid() && moment(row.dateOfBirth).format('DD/MM/YYYY').includes(searchText.toLowerCase())) ||
        (row.childSupport.name && row.childSupport.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (searchPattern.test(childOfFullName)) ||
        (row.reasonForDeactivation && row.reasonForDeactivation.toString().toLowerCase().includes(searchText.toLowerCase())) ||
        (row.createdAt && moment(row.createdAt).isValid() && moment(row.createdAt).format('DD/MM/YYYY').includes(searchText.toLowerCase()))
    ) {
      return true;
    }

    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });


  const columns: GridColDef<Child>[] = [
    hasPermissions(['MANAGE_WORKER']) &&
    {
      field: 'actions',
      type: 'actions',
      width: 5,
      // type: 'string',
      headerClassName: 'super-app-theme--cell',

      getActions: (params: GridRowParams) => (
        [
          (props.options?.status != 'reject' && (

            (params.row.status == UserLifeCycleStates.ACTIVE ? (
              <GridLinkAction
                key={5}
                label="Deactivate"
                icon={<NoAccountsIcon />}
                showInMenu
                onClick={() => {
                  // deactivateChild(params.row._id);
                  setReasonDialog(true);
                  setRowId(params.row._id);
                }
                }
              />
            ) : (
              <GridLinkAction
                key={5}
                label="Activate"
                icon={<PersonIcon />}
                showInMenu
                onClick={() => {
                  activateChild(params.row._id);
                }}
              />
            ))
          )),
          false,
          <GridLinkAction
            key={5}
            label="View"
            icon={<PersonIcon />}
            showInMenu
            onClick={() => handleClick(params)}
          />,
          <GridLinkAction
            key={5}
            label="Delete"
            icon={<DeleteIcon />}
            showInMenu
            onClick={() =>{
              setDeleteModel(true), setRow(params);
            } }
          />,

          ...(hasPermissions(['HR_DPARTMENT_ACCESS']) ?
            [
              <GridLinkAction
                key={5}
                label="Edit"
                icon={<EditIcon />}
                showInMenu
                onClick={() => handleEdit(params)}
              />,
            ] :
            []),


        ].filter((action) => action !== false) as JSX.Element[]
      ),
    },
    {
      field: 'childProfile',
      headerName: '',
      headerClassName: 'super-app-theme--cell',
      width: 25,
      minWidth: 65,
      type: 'string',
      renderCell: (props:any) => {
        return <Avatar src={props.value?.replace('uc', 'thumbnail')} />;
      },
    },
    {
      field: 'childCode',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Child Code</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'firstName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>First Name</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'lastName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Last Name</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'division',
      renderCell: (props:any) => <p> {props?.row?.division?.details?.name}</p>,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Division</b>),
      headerClassName: 'super-app-theme--cell',
    },
    {
      field: 'dateOfBirth',
      width: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => (<p>{moment(props.value).format('DD/MM/YYYY')}</p>),
      renderHeader: () => (<b>DOB</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'childSupport',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => <p> {(props.value as IChildSupport)?.name}</p>,
      renderHeader: () => (<b>Child Support</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'childOf',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => <p> {props.row.childOf?.basicDetails.firstName + ' ' + props.row.childOf?.basicDetails.lastName}</p>,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Child Of</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'reasonForDeactivation',
      width: 180,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      renderHeader: () => (<b>Reason for Deactivation</b>),
    },


    {
      field: 'deactivationDate',
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => {
        const deactivationDate = props.row.deactivationDate;
        if (!deactivationDate || !moment(deactivationDate).isValid()) {
          return <p>-</p>;
        }
        return <p>{moment(deactivationDate).format('DD/MM/YYYY')}</p>;
      },
      renderHeader: () => (<b>Deactivation Date</b>),
      headerClassName: 'super-app-theme--cell',
    },
  ].filter((action:any) => action !== false) as GridColDef<Child>[];

  return (
    <>
      <Dialog open={reasonDialog} fullWidth maxWidth="md">
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
          <br />
          <Autocomplete<string>
            options={['Voluntarily Left', 'Retired', 'Dismissed', 'Death', 'Other']}
            value={reasonForDeactivation}
            onChange={(e, selectedReason) => {
              setReasonForDeactivation(selectedReason);
            }}
            renderInput={(params) => <TextField {...params} label="Reason for Deactivation" required />}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setReasonDialog(false);
              false;
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'red' }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              if (reasonForDeactivation) {
                deactivateChild(rowId, reasonForDeactivation);
              }
              setReasonDialog(false);
            }}
            sx={{ mx: '1rem', py: 1.7, height: 50, background: 'green' }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <Grid item xs={6}>
        <Grid
          container
          sx={{ mb: 3, mt: 0, mx: 2 }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          style={{ display: 'flex' }}
        >


          {/* Search Field */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            style={{ width: '25%' }}
          />
          {/* Export Button */}
          <Button
            onClick={async () => {
              const sheet = props.value ?
                props.value.map((user: any) => [
                  user.childCode,
                  user.firstName,
                  user.lastName,
                  user.childOf?.basicDetails.firstName + ' ' + user.childOf?.basicDetails.lastName,
                  (user.division as unknown as Division)?.details?.name,
                  user?.childOf?.officialDetails.divisionHistory?.[0]?.subDivision?.name,
                  moment(user.dateOfBirth).format('DD/MM/YYYY'),
                  (user.dateOfBirth?.fromNow() || '').replace(' ago', ''),
                  user.gender,
                  user.childSupport.amount,
                  user.childSupport.name,
                ]) :
                [];
              const headers = [
                'Child Code',
                'First Name',
                'Last Name',
                'Child Of',
                'Division',
                'Sub Division',
                'DOB',
                'Age',
                'Gender',
                'CEA Amount',
                'Level',
              ];
              const worksheet = XLSX.utils.json_to_sheet(sheet);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
              XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
              XLSX.writeFile(workbook, 'Child.xlsx', { compression: true });
            }}
            startIcon={<DownloadIcon />}
            color="primary"
            variant="contained"
            sx={{ marginRight: 10 }}
          >
      Export
          </Button>
        </Grid>
      </Grid>


      <Grid item xs={12} md={12}>
        <Card style={{ height: '60vh', width: '100%' }}>
          <Box
            sx={{
              'height': 300,
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
            <DataGrid
              columns={columns} getRowId={(row) => row._id} loading={props.value === null}
              sx={{ height: '55vh', width: '100%' }}
              getRowClassName={(params) =>params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
              rows={filteredRows ?? []}

            />
          </Box>
          <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
            {/* <DialogContent>
          <Typography sx={{ color: 'red' }}>Are you sure you want to delete this User?</Typography>
        </DialogContent> */}
            <DialogContent>
              <Typography sx={{ color: 'red' }}>Are sure want to delete this Child</Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDeleteModel(false)}>Close</Button>
              <Button
                endIcon={<DeleteIcon />}
                variant="contained"
                color="info"
                onClick={async () => {
                  handleDelete(rowData);
                }}
              >
                 Delete
              </Button>
            </DialogActions>

          </Dialog>;
        </Card>
      </Grid>
    </>
  );
};

export default ChildListPage;
