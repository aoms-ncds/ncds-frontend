import { SetStateAction, useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

const SpouseListPage = (props: { data: Spouse[] }) => {
  // const [spouseList, setSpouseList] = useState<Spouse[]>();

  // useEffect(() => {
  //   setSpouseList(props.data);
  // }, [spouseList]);


  const columns: GridColDef<Spouse>[] = [
    // {
    //   field: '_manage',
    //   headerName: 'Action',
    //   width: 90,
    //   type: 'string',
    //   renderCell: (props) => (
    //     <DropdownButton
    //       useIconButton={true}
    //       id="Spouse action"
    //       primaryText="Actions"
    //       key={'Spouse action'}
    //       items={[
    //         {
    //           id: 'View',
    //           text: 'View',
    //           component: Link,
    //           to: '/workers/edit_spouse/' + props.row._id,
    //           icon: PreviewIcon,
    //         },
    //         // {
    //         //   id: 'edit',
    //         //   text: 'Edit',
    //         //   component: Link,
    //         //   to: '/workers/edit_spouse/' + props.row._id,
    //         //   icon: EditIcon,
    //         // },
    //         // {
    //         //   id: 'delete',
    //         //   text: 'Delete',
    //         //   component: Link,
    //         //   icon: DeleteIcon,
    //         //   onClick: () => {
    //         //     // removeWorker(props.row._id);
    //         //   },
    //         // },
    //       ]}
    //     />
    //   ),
    // },
    { field: 'spouseCode', headerName: 'Spouse Code', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'firstName', headerName: 'First Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'phone', headerName: 'Mobile No', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'dateOfBirth', headerName: 'DOB', width: 90, headerAlign: 'center', renderCell: (params) => (<p>{moment(params.value).format('DD/MM/YYYY')}</p>) },
    { field: 'qualification', headerName: 'Qualification', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'spouseOf', headerName: 'Spouse', renderCell: (props) =>
      <p> {props.row.spouseOf?.basicDetails.firstName+' '+props.row.spouseOf?.basicDetails.lastName}</p>,
    width: 170, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 170, headerAlign: 'center', align: 'center' },
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


export default SpouseListPage;
