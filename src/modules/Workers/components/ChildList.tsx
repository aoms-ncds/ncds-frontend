import { SetStateAction, useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

const ChildListPage = (props: { data: Child[] }) => {
  const [childList, setChildList] = useState<Child[]>();

  useEffect(() => {
    setChildList(props.data);
  }, [childList]);

  const columns: GridColDef<Child>[] = [
    // {
    //   field: '_manage',
    //   headerName: 'Action',
    //   width: 90,
    //   headerAlign: 'center',
    //   type: 'string',
    //   renderCell: (props) => (
    //     <DropdownButton
    //       useIconButton={true}
    //       id="child action"
    //       primaryText="Actions"
    //       key={'child action'}
    //       items={[
    //         {
    //           id: 'View',
    //           text: 'View',
    //           component: Link,
    //           to: '/workers/child_edit/' + props.row._id,
    //           icon: PreviewIcon,
    //         },
    //         {
    //           id: 'edit',
    //           text: 'Edit',
    //           component: Link,
    //           to: '/workers/child_edit/' + props.row._id,
    //           icon: EditIcon,
    //         },
    //         {
    //           id: 'delete',
    //           text: 'Delete',
    //           component: Link,
    //           icon: DeleteIcon,
    //           onClick: () => {
    //             // removeWorker(props.row._id);
    //           },
    //         },
    //       ]}
    //     />
    //   ),
    // },
    { field: 'childCode', headerName: 'Child Code', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'firstName', headerName: 'First Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'dateOfBirth', headerName: 'DOB', width: 90, headerAlign: 'center', align: 'center', renderCell: (props) => (<p>{moment(props.value).format('DD/MM/YYYY')}</p>) },
    { field: 'childSupport', headerName: 'Child Support', width: 110, headerAlign: 'center', align: 'center', renderCell: (props) =>
      <p> {(props.value as ChildSupport)?.name}</p> },
    { field: 'childOf', headerName: 'Child Of', renderCell: (props) =>
      <p> {props.row.childOf?.basicDetails.firstName+' '+props.row.childOf?.basicDetails.lastName}</p>,
    width: 170, headerAlign: 'center', align: 'center' },
  ];
  return (
    <>
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={props.data ?? []} columns={columns} getRowId={(row) => row._id} loading={props.data === null} />
        </Card>
      </Grid>
    </>
  );
};

export default ChildListPage;
