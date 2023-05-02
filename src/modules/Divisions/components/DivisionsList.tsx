import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import DivisionsServices from '../extras/DivisionsServices';
import DropdownButton from '../../../components/DropDownButton';

interface DivisionsListProps {
  loadCount: number;
  onLoad: () => void;
  afterLoad: () => void;
}
const DivisionsList = (props: DivisionsListProps) => {
  const [divisions, setDivisions] = useState<DivisionProfile[] | null>(null);
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
            textDecoration: 'none', color: 'inherit' }}>{props.row.divisionName}</Link>
      ),
    },
    { field: 'coordinator', headerName: 'Coordinator Name', renderCell: (props: any) => (
      <p> {props.row.coordinatorName}</p>
    ), width: 130 },
    { field: 'coordinatorEmail', headerName: 'Coordinator Email', renderCell: (props: any) => (
      <p> {props.row.coordinatorEmail}</p>
    ), width: 130 },
    { field: 'coordinatorPhone', headerName: 'Coordinator Phone', renderCell: (props: any) => (
      <p> {props.row.coordinatorContactno}</p>
    ), width: 130 },
    { field: 'noofWorkers', headerName: 'No. of Workers', width: 200 },
    { field: 'NoOfSubdivisions', headerName: 'No. of Subdivisions', width: 200 },


  ];
  useEffect(() => {
    props.onLoad();
    DivisionsServices.getDivisions()
      .then((res) => {
        props.afterLoad();
        setDivisions(res.data);
      })
      .catch((err) => {
        props.afterLoad();
        console.log({ err });
      });
  }, []);
  return (
    <DataGrid
      rows={divisions ?? []}
      columns={columns}
      getRowId={(row) => row._id}
      loading={divisions === null}
    />
  );
};

export default DivisionsList;
