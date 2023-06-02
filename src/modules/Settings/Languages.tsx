import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid, GridCellParams } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import LanguagesServices from '../Settings/extras/LanguagesService';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';


const Languages = () => {
  const execDelete = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Language',
      variant: 'info',
    });
  };

  const columns: GridColDef<ILanguage>[] = [
    {
      field: 'Languages',
      headerName: 'Languages',
      align: 'left',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      headerAlign: 'center',
      renderCell: () => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      headerAlign: 'center',
      renderCell: () => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const [languages, setLanguages] = useState<ILanguage[]|null>(null);

  useEffect(() => {
    LanguagesServices.getAll({ status: CommonLifeCycleStates.ACTIVE })
        .then((res) => {
          setLanguages(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
  }, []);

  return (

    <CommonPageLayout title='Languages'>
      <Card style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={languages??[]}
          columns={columns}
          getRowId={(row) => row._id}
          loading={languages === null}
        />
      </Card>
    </CommonPageLayout>

  );
};

export default
Languages;
