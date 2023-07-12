import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Message as MessageIcon, Preview as PreviewIcon, Print as PrintIcon } from '@mui/icons-material';
import FRServices from '../extras/FRServices';
import DropdownButton from '../../../components/DropDownButton';
import FRLifeCycleStates from '../extras/FRLifeCycleStates';

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
    { field: 'FRno', renderHeader: () => (<b>FR No</b>), width: 100 },
    { field: 'FRdate', renderHeader: () => (<b>FR Date</b>), width: 90, renderCell: (props) => (
      <p> {props.row.FRdate.format('DD/MM/YYYY')}</p>
    ) },
    { field: 'divisionName',
      renderHeader: () => (<b>Division Name</b>),
      align: 'center', headerAlign: 'center',
      renderCell: (props) => (<p> {props.row.division?.details.name}</p>),
      width: 150,
    },
    {
      field: 'subDivisionName',
      renderHeader: () => (<b>Sub Division Name</b>),
      align: 'center', headerAlign: 'center',
      renderCell: (props) => (<p> {props.row.purposeSubdivision?.name}</p>),
      width: 170,
    },
    { field: 'mainCategory', renderHeader: () => (<b>Main Category</b>), width: 245 },
    {
      field: 'requestAmount',
      renderHeader: () => (<b>Requested Amount</b>),
      width: 140,
      align: 'center', headerAlign: 'center',
      renderCell: (params: GridCellParams) => {
        const frRequest = params.row as FR;
        const particularAmount = frRequest.particulars?.reduce(
          (total, particular) => total + Number(particular.requestedAmount),
          0,
        );
        return <p>{particularAmount}</p>;
      },
    },
    { field: 'updatedAt', renderHeader: () => (<b>Last Updated</b>), width: 130, renderCell: (props) => (
      <p> {props.row.updatedAt.format('DD/MM/YYYY')}</p>
    ) },
  ];

  useEffect(() => {
    FRServices.getAll({ status: FRLifeCycleStates.FR_CLOSED })
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
