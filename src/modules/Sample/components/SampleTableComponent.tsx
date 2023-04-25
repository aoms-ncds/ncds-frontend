import React, { RefAttributes, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridActionsCellItemProps, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import SampleServices from '../extras/SampleServices';
import DropdownButton from '../../../components/DropDownButton';
import GridLinkAction from '../../../components/GridLinkAction';

interface SampleComponentProps {
  loadCount: number;
  onLoad: () => void;
  afterLoad: () => void;
}


const SampleComponent = (props: SampleComponentProps) => {
  const [sampleItems, setSampleItems] = useState<SampleItem[] | null>(null);
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridLinkAction key={1} to={`/sample/${params.id}`} label='View' icon={<PreviewIcon />} showInMenu />,
        <GridLinkAction key={2} to={`/sample/${params.id}/edit`} label='Edit' icon={<EditIcon />} showInMenu />,
      ],
    },
    { field: 'name', headerName: 'Field 1', width: 400 },
    { field: 'email', headerName: 'Field 2', width: 400 },
    { field: 'createdAt', headerName: 'Field 3', width: 400 },
  ];
  useEffect(() => {
    props.onLoad();
    SampleServices.getAll()
      .then((res) => {
        props.afterLoad();
        setSampleItems(res.data);
      })
      .catch((err) => {
        props.afterLoad();
        console.log({ err });
      });
  }, []);
  return (
    <DataGrid
      rows={sampleItems ?? []}
      columns={columns}
      getRowId={(row) => row._id}
      loading={sampleItems === null}
    />
  );
};

export default SampleComponent;
