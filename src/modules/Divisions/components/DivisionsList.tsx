import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Typography } from '@mui/material';
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

  useEffect(() => {
    DivisionsServices.getDivisions()
      .then((res) => {
        console.log(res.data);
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
        console.log('process delete', res);
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

              {
                id: 'delete',
                text: 'Delete',
                component: Link,
                icon: DeleteIcon,
                onClick: () => {
                  removeDivisions(props.row._id);
                },
              }] : []),
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
      renderCell: (props: any) => (
        <Link
          to={`/divisions/details/${props.row._id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {props.row.details.name}
        </Link>
      ),
    },
    {
      field: 'coordinator',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Name</b>),
      renderCell: (props: any) => <p> {props.row.details.coordinator?.firstName}</p>,
      width: 140,
    },
    {
      field: 'coordinatorEmail',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Email</b>),
      renderCell: (props: any) => <p>{props.row.details.coordinator?.email}</p>,
      width: 140 },
    {
      field: 'coordinatorPhone',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>Coordinator Phone</b>),
      renderCell: (props: any) => <p>{props.row.details.coordinator?.phone}</p>,
      width: 140 },

    {
      field: 'noOfWorkers',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Workers</b>),
      renderCell: (props: any) => <p> {props.row.details.noOfWorkers}</p>,
      width: 130 },
    {
      field: 'NoOfSubdivisions',
      align: 'center',
      headerAlign: 'center',
      renderHeader: () => (<b>No. of Subdivisions</b>),
      renderCell: (props: any) => <p> {props.row.details.noOfSubdivisions}</p>,
      width: 150 },
  ];
  return <DataGrid rows={divisions ?? []} columns={columns} getRowId={(row) => row._id as string} loading={divisions === null} sx={{ height: '55vh', width: '100%' }} />;
};

export default DivisionsList;
