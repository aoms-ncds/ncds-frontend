import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../../components/CommonPageLayout';
import { Typography } from '@mui/material';
import DivisionsServices from '../extras/DivisionsServices';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import DropdownButton from '../../../components/DropDownButton';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
const DivisionsList = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [divisions, setDivisions] = useState<DivisionDetails[] | null>(null);

  useEffect(() => {
    // loader.onLoad();
    DivisionsServices.getDivision()
    .then((res) => {
    //  loader.afterLoad();
      console.log(res.data);
      setDivisions(res.data);
    })
    .catch((err) => {
      // loader.afterLoad();
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
            //  return divisions._id !== id;
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
  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id='actions'
          primaryText='Actions'
          key={'actions'}
          items={[
            {
              id: 'View',
              text: 'View and Manage',
              component: Link,
              to: `/divisions/details/${props.row._id}`,
              icon: PreviewIcon,
            },
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
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'Division Id', width: 130 },
    {
      field: 'divisionName',
      headerName: 'Division Name',
      width: 200,
      renderCell: (props: any) => (
        <Link to={`/divisions/details/${props.row._id}`}
          style={{
            textDecoration: 'none', color: 'inherit' }}>{props.row.division.divisionName}</Link>
      ),
    },
    { field: 'coordinator', headerName: 'Coordinator Name', renderCell: (props: any) => (
      <p> {props.row.coordinatorName}</p>
    ), width: 130 },
    { field: 'coordinatorEmail', headerName: 'Coordinator Email', renderCell: (props: any) => (
      <p> {props.row.division.divisionName}</p>
    ), width: 130 },
    { field: 'coordinatorPhone', headerName: 'Coordinator Phone', renderCell: (props: any) => (
      <p> {props.row.divisionName}</p>
    ), width: 130 },

    { field: 'noofWorkers', headerName: 'No. of Workers', renderCell: (props: any) => (
      <p> {props.row.division.noofWorkers}</p>
    ), width: 130 },
    { field: 'NoOfSubdivisions', headerName: 'No. of Subdivisions', renderCell: (props: any) => (
      <p> {props.row.division.noofSubdivisions}</p>
    ), width: 130 },

  ];
  return (
    <DataGrid
      rows={divisions ?? []}
      columns={columns}
      getRowId={(row) => row._id as string}
      loading={divisions === null}
    />
  );
};

export default DivisionsList;

