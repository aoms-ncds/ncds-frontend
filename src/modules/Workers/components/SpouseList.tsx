import { Card, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import moment from 'moment';
import GridLinkAction from '../../../components/GridLinkAction';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import { NoAccounts as NoAccountsIcon, Person as PersonIcon } from '@mui/icons-material';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import WorkersServices from '../extras/WorkersServices';
import { hasPermissions } from '../../User/components/PermissionChecks';

const SpouseListPage = (props:FormComponentProps<Spouse[], {status?:'reject'|'active'}>) => {
  const deactivateSpouse = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Spouse',
      variant: 'info',
    });
    WorkersServices.deactivatespouse(id)
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


  const columns: GridColDef<Spouse>[] = [
    hasPermissions(['MANAGE_WORKER']) &&
    {
      field: 'actions',
      type: 'actions',
      width: 5,
      // type: 'string',
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
                  deactivateSpouse(params.row._id);
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
        ].filter((action) => action !== false) as JSX.Element[]
      ),
    },
    {
      field: 'spouseCode',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Spouse Code</b>),
    },
    {
      field: 'firstName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>First Name</b>) },
    {
      field: 'lastName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Last Name</b>),
    },
    { field: 'phone',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Mobile No</b>),
    },
    {
      field: 'dateOfBirth',
      width: 90,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<Spouse, any, any, GridTreeNodeWithRender>) => (<p>{moment(params.value).format('DD/MM/YYYY')}</p>),
      renderHeader: () => (<b>DOB</b>),
    },
    { field: 'qualification',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Qualification</b>),
    },
    { field: 'spouseOf',
      renderCell: (props: GridRenderCellParams<Spouse, any, any, GridTreeNodeWithRender>) => <p> {props.row.spouseOf?.basicDetails.firstName+' '+props.row.spouseOf?.basicDetails.lastName}</p>,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Spouse</b>),
    },
    { field: 'email',
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (<b>Email Id</b>),
    },
  ].filter((action) => action !== false) as GridColDef<Spouse>[];
  return (
    <>
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={props.value ?? []} columns={columns} getRowId={(row) => row._id} loading={props.value === null} />
        </Card>
      </Grid>
    </>
  );
};


export default SpouseListPage;

