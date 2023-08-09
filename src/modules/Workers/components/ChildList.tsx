import { SetStateAction, useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import moment from 'moment';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import WorkersServices from '../extras/WorkersServices';
import GridLinkAction from '../../../components/GridLinkAction';
import UserLifeCycleStates from '../../User/extras/UserLifeCycleStates';
import { NoAccounts as NoAccountsIcon, Person as PersonIcon } from '@mui/icons-material';
import { hasPermissions } from '../../User/components/PermissionChecks';

const ChildListPage = (props:FormComponentProps<Child[], {status?:'reject'|'active'}>) => {
  // const [childList, setChildList] = useState<Child[]>();


  const deactivateChild = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Deactivating Child',
      variant: 'info',
    });
    WorkersServices.deactivatechild(id)
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


  const columns: GridColDef<Child>[] = [
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
                  deactivateChild(params.row._id);
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
        ].filter((action) => action !== false) as JSX.Element[]
      ),
    },
    { field: 'childCode',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderHeader: ()=>( <b>Child Code</b>),
    },
    { field: 'firstName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: ()=>( <b>First Name</b>),
    },
    { field: 'lastName',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderHeader: ()=>( <b>Last Name</b>),
    },
    { field: 'dateOfBirth',
      width: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => (<p>{moment(props.value).format('DD/MM/YYYY')}</p>),
      renderHeader: ()=>( <b>DOB</b>),
    },
    { field: 'childSupport',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => <p> {(props.value as IChildSupport)?.name}</p>,
      renderHeader: ()=>( <b>Child Support</b>),
    },
    {
      field: 'childOf',
      renderCell: (props: GridRenderCellParams<Child, any, any, GridTreeNodeWithRender>) => <p> {props.row.childOf?.basicDetails.firstName+' '+props.row.childOf?.basicDetails.lastName}</p>,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      renderHeader: ()=>( <b>Child Of</b>),
    },
  ].filter((action) => action !== false) as GridColDef<Child>[];

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

export default ChildListPage;
