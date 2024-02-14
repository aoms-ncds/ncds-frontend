import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Grid, TextField, Typography } from '@mui/material';
import DivisionsServices from '../extras/DivisionsServices';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DropdownButton from '../../../components/DropDownButton';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import PermissionChecks, { hasPermissions } from '../../User/components/PermissionChecks';

const DivisionsList = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    DivisionsServices.getDivisions()
      .then((res) => {
        setDivisions(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
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
              to: `/divisions/details/${props.row._id}`,
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
                to: `/divisions/edit/${props.row._id}`,
                icon: EditIcon,
              },
            ] : []
            ),
            ...(hasPermissions(['ADMIN_ACCESS'])?[
              {
                id: 'delete',
                text: 'Delete',
                component: Link,
                icon: DeleteIcon,
                onClick: () => {
                  removeDivisions(props.row._id);
                },
              },
            ]:[]),
          ]}
        />
      ),
    },
    { field: 'divisionId',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Id</b>),
      width: 110, valueGetter: (props) => props.row.details.divisionId },
    {
      field: 'divisionName',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Division Name</b>),
      width: 120,
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

      valueGetter: (props)=>props.row.details?.name,
    },
    {
      field: 'coordinator',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Name</b>),
      valueGetter: (props)=>props.row.details.coordinator?.name?.basicDetails?.firstName??'',
      width: 150,


    },
    {
      field: 'coordinatorEmail',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Email</b>),
      valueGetter: (props)=>props.row.details.coordinator?.name?.basicDetails?.email,
      width: 150 },
    {
      field: 'coordinatorPhone',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Phone</b>),

      valueGetter: (props)=>props.row.details.coordinator?.name?.basicDetails?.phone,
      width: 140 },

    {
      field: 'noOfWorkers',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Workers</b>),

      valueGetter: (props)=>props.row.details?.noOfWorkers,
      width: 130 },
    {
      field: 'NoOfSubdivisions',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Subdivisions</b>),

      valueGetter: (props)=>props.row.details?.noOfSubdivisions,
      width: 150 },
  ];
  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = (divisions ?? []).filter(row => {
    if ((row.details.name && row.details.name.toLowerCase().includes(searchText.toLowerCase()))) {
  return true;
}
    return Object.values(row).some(value =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return ( 
    <>
    <Grid sx={{ width: '30px', paddingLeft: '2%'}}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          fullWidth
          style={{ marginBottom: '1rem',width: '10vw'}}
        />
    </Grid>
    <DataGrid rows={filteredRows ?? []} columns={columns} getRowId={(row) => row._id as string} loading={divisions === null} sx={{ height: '55vh', width: '100%' }} />;
    </>

  )
};

export default DivisionsList;
