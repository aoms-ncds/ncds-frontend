import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Grid, Card } from '@mui/material';
import { Preview as PreviewIcon } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DropdownButton from '../../components/DropDownButton';
import IROServices from './extras/IROServices';

const ClosedIRO = () => {
  const [IROrder, setIROrder] = useState<IROrder[]>();
  useEffect(() => {
    IROServices.getClosed()
      .then((res) => {
        console.log(res, 'CLOSED');
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns: GridColDef<IROrder>[]= [
    {
      field: '_manage',
      renderHeader: () => (<b>Action</b>),
      minWidth: 50,
      type: 'string',
      renderCell: (props) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={'IRO action'}
          items={[
            // {
            //   id: 'View',
            //   text: 'Release Amount',
            //   component: Link,
            //   to: '/iro/release_amount/' + props.row._id,
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'remarks',
            //   text: 'Remarks',
            //   icon: EditIcon,
            // },
            {
              id: 'print',
              text: 'Print IRO',
              icon: PrintIcon,
            },
            {
              id: 'View',
              text: 'View Details ',
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
            // {
            //   id: 'Reconciliation',
            //   text: 'Reconciliation',
            //   icon: EditIcon,
            // },
            // {
            //   id: 'Close IRO',
            //   text: 'Close IRO',
            //   icon: PreviewIcon,
            // },
            // {
            //   id: 'Attachments',
            //   text: 'Attachments',
            //   icon: PrintIcon,
            // },
          ]}
        />
      ),
    },
    { field: '_id', renderHeader: () => (<b>SI No</b>), width: 70 },
    { field: 'IROno', renderHeader: () => (<b>IRO No</b>), width: 70 },
    { field: 'IROdate', renderHeader: () => (<b>IRO Date</b>), width: 130 },
    { field: 'divisionName', renderHeader: () => (<b>Division Name</b>), width: 150 },
    { field: 'subDivisionName', renderHeader: () => (<b>Sub Division Name</b>), width: 170 },
    { field: 'mainCategory', renderHeader: () => (<b>Main Category</b>), width: 150 },
    { field: 'requestAmount', renderHeader: () => (<b>Requested Amount</b>), width: 150 },
    { field: 'updatedAt', renderHeader: () => (<b>Last Updated</b>), width: 150 },
    { field: 'sanction', renderHeader: () => (<b>Special Sanction</b>), width: 130 },
    { field: 'sanctionedAmount', renderHeader: () => (<b>Sanctioned Amount</b>), width: 150 },
    { field: 'sanctionedAsPer', renderHeader: () => (<b>Sanctioned As Per</b>), width: 150 },
    { field: 'sourceBank', renderHeader: () => (<b>Source Bank</b>), width: 130 },
  ];
  return (
    <CommonPageLayout title="Internal Release Order">
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '75vh', width: '100%' }}>
          <DataGrid rows={IROrder ?? []} columns={columns} getRowId={(row) => row._id} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ClosedIRO;
