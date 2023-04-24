import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import SampleServices from '../extras/SampleServices';
import DropdownButton from '../../../components/DropDownButton';

interface SampleComponentProps {
  loadCount: number;
  onLoad: () => void;
  afterLoad: () => void;
}
const SampleComponent = (props: SampleComponentProps) => {
  const [sampleItems, setSampleItems] = useState<SampleItem[] | null>(null);
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
              to: `/sample/${props.row._id}`,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: `/sample${props.row._id}`,
              icon: EditIcon,
            },
          ]}
        />
      ),
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
