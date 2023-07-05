import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Print as PrintIcon } from '@mui/icons-material';
import FRServices from '../extras/FRServices';
import DropdownButton from '../../../components/DropDownButton';

const ClosedFRsTable = () => {
  const [closedFRs, setClosedFRs] = useState<FR[] | null>(null);

  const columns:GridColDef<FR>[] = [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
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
    { field: '_id', renderHeader: () => (<b>SI No</b>), width: 70 },
    { field: 'FRno', renderHeader: () => (<b>FR No</b>), width: 70 },
    { field: 'FRdate', renderHeader: () => (<b>FR Date</b>), width: 90, renderCell: (props) => (
      <p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    ) },
    { field: 'divisionName', renderHeader: () => (<b>Division Name</b>), width: 150 },
    { field: 'subDivisionName', renderHeader: () => (<b>Sub Division Name</b>), width: 170 },
    { field: 'mainCategory', renderHeader: () => (<b>Main Category</b>), width: 150 },
    { field: 'requestAmount', renderHeader: () => (<b>Requested Amount</b>), width: 130 },
    { field: 'lastUpdateDate', renderHeader: () => (<b>Last Updated</b>), width: 130 },
    { field: 'sanction', renderHeader: () => (<b>Special Sanction</b>), width: 130 },
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
