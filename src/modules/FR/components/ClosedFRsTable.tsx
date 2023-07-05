import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Preview as PreviewIcon, Print as PrintIcon } from '@mui/icons-material';
import FRServices from '../extras/FRServices';
import DropdownButton from '../../../components/DropDownButton';

const ClosedFRsTable = () => {
  const [closedFRs, setClosedFRs] = useState<FR[] | null>(null);

  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      minWidth: 50,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="FR action"
          primaryText="Actions"
          key={'FR action'}
          items={[
            {
              id: 'print',
              text: 'Print FR',
              component: Link,
              to: '/view' + props.row._id,
              icon: PrintIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
          ]}
        />
      ),
    },
    { field: '_id', headerName: 'SI No', width: 70 },
    { field: 'FRno', headerName: 'FR No', width: 70 },
    { field: 'FRdate', headerName: 'FR Date', width: 130 },
    { field: 'divisionName', headerName: 'Division Name', width: 150 },
    { field: 'subDivisionName', headerName: 'Sub Division Name', width: 170 },
    { field: 'mainCategory', headerName: 'Main Category', width: 150 },
    { field: 'requestAmount', headerName: 'Requested Amount', width: 130 },
    { field: 'lastUpdateDate', headerName: 'Last Updated', width: 130 },
    { field: 'sanction', headerName: 'Special Sanction', width: 130 },
  ];

  useEffect(() => {
    FRServices.getAll()
      .then((res) => {
        setClosedFRs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  return <DataGrid rows={closedFRs ?? []} columns={columns} getRowId={(row) => row._id} loading={closedFRs === null} />;
};

export default ClosedFRsTable;
