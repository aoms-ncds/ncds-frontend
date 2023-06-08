import { useEffect, useState } from 'react';
import { Button, Card, Grid } from '@mui/material';
import DropdownButton from '../../../components/DropDownButton';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Preview as PreviewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import SpousesServices from '../extras/SpousesServices';

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

  const columns = [
    {
      field: '_manage',
      headerName: 'Action',
      width: 60,
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
    { field: '_id', headerName: 'SI No', width: 55, AlignHeader: 'center' },
    { field: 'firstName', headerName: 'First Name', width: 100, AlignHeader: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 100, AlignHeader: 'center' },
    { field: 'mobileNo', headerName: 'Mobile No', width: 100, AlignHeader: 'center' },
    { field: 'dob', headerName: 'DOB', width: 70, AlignHeader: 'center' },
    { field: 'age', headerName: 'Age', renderCell: (props: any) => <p> {props.row.dob?.fromNow()}</p>, width: 70, AlignHeader: 'center' },
    { field: 'qualification', headerName: 'Qualification', width: 100, AlignHeader: 'center' },
    { field: 'spouseOf', headerName: 'Spouse Of', renderCell: (props: any) => <p> {props.row.spouseOf?.firstName}</p>, width: 90, AlignHeader: 'center' },
    { field: 'email', headerName: 'Email', width: 170, AlignHeader: 'center' },
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
