import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import DivisionsServices from '../extras/DivisionsServices';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon, Add as AddIcon, History as HistoryIcon } from '@mui/icons-material';
import DropdownButton from '../../../components/DropDownButton';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';
import { useAuth } from '../../../hooks/Authentication';
import DivisionLogDialog from './DivisionLogDialog';
import FR from '../../FR';


const DivisionsList = (arg: any) => {
  const [loadCount, setLoadCount] = useState(0);
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();
  const [logOpen, setLogOpen] = useState<string | null>(null);
  const [deleteModel, setDeleteModel] = useState(false);
  const [rowID, setRowID] = useState('');


  useEffect(() => {
    DivisionsServices.getDivCount()
      .then((res) => {
        console.log(res, 'rese43');
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const myArray: any = [];
  useEffect(() => {
    if ((auth?.user as unknown as User)?.permissions?.EDIT_DIVISION_ACCESS === true) {
      const divisionId = (auth?.user as User)?.division ?? null;

      if (divisionId) {
        Promise.all([
          DivisionsServices.getDivisionById(divisionId.toString()),
          DivisionsServices.getDivCount(),
        ]).then(([divRes, countRes]) => {
          const countMap = (Array.isArray(countRes.data) ? countRes.data : []).reduce(
            (acc: Record<string, number>, item: any) => {
              acc[item._id] = item.totalWorkers;
              return acc;
            },
            {},
          );

          const mergedDivision = {
            ...divRes.data,
            totalWorkers: countMap[divRes.data._id] ?? 0,
          };

          setDivisions([mergedDivision]); // ✅ single division row
        });
      }
    } else {
      Promise.all([
        DivisionsServices.getDivisions(),
        DivisionsServices.getDivCount(),
      ])
      .then(([divRes, countRes]) => {
        const countMap = (Array.isArray(countRes.data) ? countRes.data : []).reduce(
          (acc: Record<string, number>, item: any) => {
            acc[item._id] = item.totalWorkers;
            return acc;
          },
          {},
        );

        const mergedDivisions = divRes.data.map((div: any) => ({
          ...div,
          totalWorkers: countMap[div._id] ?? 0,
        }));

        setDivisions(mergedDivisions); // ✅ merged list
      })
      .catch((err) => console.log(err));
    }
  }, []);
  console.log(divisions, 'popds');

  // useEffect(() => {
  //   DivisionsServices.getDivisions()
  //     .then((res) => {
  //       setDivisions(res.data);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, []);
  const removeDivisions = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Division',
      variant: 'info',
    });
    DivisionsServices.divisionMarkAsRemove(id)
      .then((res) => {
        if (divisions) {
          const newDivisions = divisions.filter((divisions) => {
            return divisions._id !== id;
          });
          setDivisions(newDivisions);
        }
        setDeleteModel(false);
        // closeSnackbar(snackbarId);
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
  const columns: GridColDef<Division>[] = [
    {
      field: '_manage',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => (<b>Action</b>),
      width: 60,
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (props: any) => (

        <DropdownButton
          useIconButton={true}
          id="actions"
          primaryText="Actions"
          key={'actions'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              // to: `/divisions/details/${props.row._id}`,
              onClick: () => {
                window.open(`/divisions/details/${props.row._id}`, '_blank');
              },
              icon: PreviewIcon,
            },
            // {
            //   id: 'edit',
            //   text: 'Edit',
            //   component: Link,
            //   to: `/divisions/edit/${props.row._id}`,
            //   icon: EditIcon,
            // },
            ...(hasPermissions(['WRITE_DIVISIONS']) ? [
              {
                id: 'edit',
                text: 'Edit',
                component: Link,

                onClick: () => {
                  window.open(`/divisions/edit/${props.row._id}`, '_blank');
                },
                icon: EditIcon,
              },
            ] : []
            ),
            ...(hasPermissions(['EDIT_DIVISION_ACCESS']) ? [
              {
                id: 'edit',
                text: 'Edit For Coordinator',
                component: Link,
                onClick: () => {
                  window.open(`/divisions/editcoordinator/${props.row._id}`, '_blank');
                },
                icon: EditIcon,
              },
            ] : []
            ),
            ...(hasPermissions(['ADMIN_ACCESS']) ? [
              {
                id: 'delete',
                text: 'Delete',
                component: Link,
                icon: DeleteIcon,
                onClick: () => {
                  setDeleteModel(true);
                  setRowID(props.row._id);
                  // removeDivisions(props.row._id);
                },
              },

            ] : []),
            ...(hasPermissions(['ADMIN_ACCESS']) ? [
              {
                id: 'log',
                text: 'Log',
                // component: Link,
                icon: HistoryIcon,
                onClick: () => {
                  setLogOpen(props.row._id);
                },
              },

            ] : []),
          ]}
        />
      ),
    },
    {
      field: 'divisionId',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division ID</b>),
      width: 110, valueGetter: (props) => props.row.details.divisionId,
    },
    {
      field: 'divisionName',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      width: 130,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params) => (
        <Link
          to={`/divisions/details/${params.row._id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {params.value}
        </Link>
      ),

      valueGetter: (props) => props.row.details?.name,
    },
    {
      field: 'coordinator',
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Name</b>),
      valueGetter: (props) => ((props.row.details.coordinator?.name?.basicDetails?.firstName ?? '') + ' ' + (props.row.details.coordinator?.name?.basicDetails?.lastName ?? '')).trim(),
      width: 200,


    },
    {
      field: 'coordinatorEmail',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Email</b>),
      valueGetter: (props) => props.row.details.coordinator?.name?.basicDetails?.email,
      width: 250,
    },
    {
      field: 'coordinatorPhone',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Phone</b>),

      valueGetter: (props) => props.row.details.coordinator?.name?.basicDetails?.phone,
      width: 140,
    },

    {
      field: 'noOfWorkers',
      align: 'center',
      headerClassName: 'super-app-theme--cell',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Associates</b>),

      valueGetter: (props:any) => props.row.totalWorkers ?? 0,
      width: 130,
    },
    {
      field: 'NoOfSubdivisions',
      headerClassName: 'super-app-theme--cell',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Subdivisions</b>),

      valueGetter: (props) => props.row.details?.noOfSubdivisions,
      width: 210,
    },
  ];

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchText(event.target.value);
  };
  const filteredRows = (Array.isArray(divisions) ? divisions : []).filter((row) => {
    if ((row.details?.name && row.details.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.details?.coordinator?.name?.basicDetails?.firstName && row.details.coordinator.name.basicDetails.firstName.toLowerCase().includes(searchText.toLowerCase()))) {
      return true;
    }
    return Object.values(row).some((value) =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  });

  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            style={{ width: '30%', alignItems: 'start' }}
          />
        </Grid>
        <Grid item xs={6} >
          <br />
          <PermissionChecks
            permissions={['WRITE_DIVISIONS']}
            granted={(

              <Button
                variant="contained"
                sx={{ float: 'right', background: 'green' }}
                startIcon={<AddIcon />}
                component={Link}
                to="/divisions/add"
              // onClick={() => {
              // }}
              >
                Add new
              </Button>
            )}
          />
        </Grid>


      </Grid>
      <Dialog open={Boolean(deleteModel)} onClose={() => setDeleteModel(false)}>
        <DialogContent>
          <Typography sx={{ color: 'red' }}>{'Are you sure you want to delete this division ?'}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setDeleteModel(false)}>Close</Button>
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            color="info"
            onClick={async () => {
              removeDivisions(rowID);
            } }
          >
                 Delete
          </Button>
        </DialogActions>

      </Dialog>
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
          rows={filteredRows ?? []}
          columns={columns}
          getRowId={(row) => row._id as string}
          loading={divisions === null}
          sx={{ height: '55vh', width: '100%' }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
        />
      </Box>
      {logOpen && <DivisionLogDialog open={Boolean(logOpen)} onClose={() => setLogOpen(null)} divId={logOpen} />}
    </>

  );
};

export default DivisionsList;
