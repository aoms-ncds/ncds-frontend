import { useEffect, useState } from 'react';
import { Button, Card, Grid } from '@mui/material';
import DropdownButton from '../../../components/DropDownButton';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SpousesServices from '../extras/SpousesServices';
import moment from 'moment';
import WorkersServices from '../extras/WorkersServices';

const SpouseListPage = () => {
  const [spouseList, setSpouseList] = useState<Spouse[]>();

  useEffect(() => {
    SpousesServices.getAll()
      .then((res) => {
        console.log(res);
        setSpouseList(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);


  const columns: GridColDef<Spouse>[] = [
    {
      field: '_manage',
      headerName: 'Action',
      width: 90,
      type: 'string',
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="Spouse action"
          primaryText="Actions"
          key={'Spouse action'}
          items={[
            {
              id: 'View',
              text: 'View',
              component: Link,
              to: '/workers/editspouse/' + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: 'edit',
              text: 'Edit',
              component: Link,
              to: '/workers/editspouse/' + props.row._id,
              icon: EditIcon,
            },
            {
              id: 'delete',
              text: 'Delete',
              component: Link,
              icon: DeleteIcon,
              onClick: () => {
                // removeWorker(props.row._id);
              },
            },
          ]}
        />
      ),
    },
    // { field: '_id', headerName: 'SI No', width: 70, AlignHeader: 'center' },
    { field: 'firstName', headerName: 'First Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'phone', headerName: 'Mobile No', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'dateOfBirth', headerName: 'DOB', width: 90, headerAlign: 'center', renderCell: (params: any) => (<p>{moment(params.value).format('DD/MM/YYYY')}</p>) },
    { field: 'qualification', headerName: 'Qualification', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'spouseOf', headerName: 'Spouse', renderCell: (props: any) =>
      <p> {props.row.spouseOf?.basicDetails.firstName+' '+props.row.spouseOf?.basicDetails.lastName}</p>,
    width: 170, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 170, headerAlign: 'center', align: 'center' },
  ];
  return (
    <>
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '80vh', width: '100%' }}>
          <DataGrid rows={spouseList ?? []} columns={columns} getRowId={(row) => row._id} loading={spouseList === null} />
        </Card>
      </Grid>
    </>
  );
};


export default SpouseListPage;
