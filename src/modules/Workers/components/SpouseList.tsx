import { Autocomplete, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import moment from 'moment';
import GridLinkAction from '../../../components/GridLinkAction';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import { NoAccounts as NoAccountsIcon, Person as PersonIcon } from '@mui/icons-material';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import WorkersServices from '../extras/WorkersServices';
import { hasPermissions } from '../../User/components/PermissionChecks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const SpouseListPage = (props: FormComponentProps<Spouse[], { status?: 'reject' | 'active' }>) => {
  const navigate = useNavigate();
  const [spousid, setId] = useState('');
  const [rowId, setRowId] = useState('');
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonForDeactivation, setReasonForDeactivation] = useState<string | null>('');
  const [searchText, setSearchText] = useState('');


  const deactivateSpouse = (id: string, reason: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Spouse',
      variant: 'info',
    });
    WorkersServices.deactivatespouse(id, reason)
      .then((res) => {
        if (props.value) {
          const newspouseRequests = props.value.filter((spouseRequests) => spouseRequests._id !== id);
          props.onChange(newspouseRequests);
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
  const activateSpouse = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Activating Spouse',
      variant: 'info',
    });


    WorkersServices.activatespouse(id)
      .then((res) => {
        if (props.value) {
          const newspouseRequests = props.value.filter((spouseRequests) => spouseRequests._id !== id);
          props.onChange(newspouseRequests);
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
  // useEffect(() => {
  //   setSpouseList(props.data);
  // }, [spouseList]);


  const handleClick = (params: any) => {
    WorkersServices.getUser(params.row._id)
      .then((res) => {
        console.log(res.data._id, 'gfgg');
        setId(res.data._id);
        navigate(`/users/worker/${res.data._id}/2`);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
    console.log(params.row._id, 'ooo');
  };

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (props.value ?? []).filter((row) => {
    const spouseFullName = `${row.spouseOf?.basicDetails?.firstName || ''} ${row.spouseOf?.basicDetails?.lastName || ''}`.toLowerCase();

    if ((row.firstName && row.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
     (row.lastName && row.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
     (row.email && row.email.toLowerCase().includes(searchText.toLowerCase())) ||
     (row.phone && row.phone.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.dateOfBirth && moment(row.dateOfBirth).isValid() && moment(row.dateOfBirth).format('DD/MM/YYYY').includes(searchText.toLowerCase())) ||
     (row.qualification && row.qualification.toLowerCase().includes(searchText.toLowerCase())) ||
     (spouseFullName && spouseFullName.includes(searchText.toLowerCase())) ||
     (row.reasonForDeactivation && row.reasonForDeactivation.toString().toLowerCase().includes(searchText.toLowerCase())) ||
     (row.updatedAt && moment(row.updatedAt).isValid() && moment(row.updatedAt).format('DD/MM/YYYY').includes(searchText.toLowerCase()))
    ) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });


  const columns: GridColDef<Spouse>[] = [
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
                  // deactivateSpouse(params.row._id);
                  setRowId(params.row._id);
                  setReasonDialog(true);
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
                  activateSpouse(params.row._id);
                }}
              />
            ))
          )),

          false,
          <GridLinkAction
            key={5}
            label="View"
            icon={<VisibilityIcon />}
            showInMenu
            onClick={() => handleClick(params)}
          />,
        ].filter((action) => action !== false) as JSX.Element[]
      ),
    },
    {
      field: 'spouseCode',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Spouse Code</b>),
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
      field: 'phone',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--cell',

      renderHeader: () => (<b>Mobile No</b>),
    },
    {
      field: 'dateOfBirth',
      width: 90,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<Spouse, any, any, GridTreeNodeWithRender>) => (<p>{moment(params.value).format('DD/MM/YYYY')}</p>),
      renderHeader: () => (<b>DOB</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'qualification',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Qualification</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'spouseOf',
      renderCell: (props: GridRenderCellParams<Spouse, any, any, GridTreeNodeWithRender>) => <p> {props.row.spouseOf?.basicDetails.firstName + ' ' + props.row.spouseOf?.basicDetails.lastName}</p>,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Spouse Of</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'email',
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Email ID</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'reasonForDeactivation',
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Reason for Deactive</b>),
      headerClassName: 'super-app-theme--cell',

    },
    {
      field: 'updatedAt',
      width: 170,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => (<p>{moment(props.value).format('DD/MM/YYYY')}</p>),
      renderHeader: () => (<b> Deactive Date</b>),
    },
  ].filter((action) => action !== false) as GridColDef<Spouse>[];
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
                deactivateSpouse(rowId, reasonForDeactivation);
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
        <Grid sx={{ mb: 3, mt: 0, mx: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            style={{ width: '25%', alignItems: 'start' }}
          />
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
              getRowClassName={(params) =>params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
              rows={filteredRows ?? []}
              sx={{ height: '55vh', width: '100%' }} columns={columns} getRowId={(row) => row._id} loading={props.value === null} />
          </Box>
        </Card>
      </Grid>
    </>
  );
};


export default SpouseListPage;


