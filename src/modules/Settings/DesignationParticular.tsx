import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import GenderService from './extras/GenderService';
import DesignationServices from '../HR/extras/DesignationServices';
import FRServices from '../FR/extras/FRServices';
import DesignationParticularService from './extras/DesignationParticularService';

const DesignationParticulars = () => {
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | null>(null);
  const [designations, setDesignations] = useState<IDesignation[] | null>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<IDesignation[] | null>(null);
  const [designationsFetchError, setDesignationsFetchError] = useState<string | false>(false);
  const [designationParticular, setDesignationParticular] = useState<CreatableDesignationParticular>({
    designations: [],
    title: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
  });
  const [designationParticulars, setDesignationParticulars] = useState<IDesignationParticular[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<SubCategory1 | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<SubCategory2 | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  const [designationParticularToDelete, setDesignationParticularToDelete] = useState<IDesignationParticular | null>(null);
  const columns: GridColDef<IDesignationParticular>[] = [
    {
      field: 'Title',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Title</b>,
      width: 100,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.title,
    },
    {
      field: 'Designation',
      renderHeader: () => (<b>Designation</b>),
      align: 'center',
      width: 300,
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >{ designations?.filter((des)=>props?.row?.designations?.includes(des._id)).map((des)=>des.name).join(', ')}</p>),
    },
    {
      field: 'Main Category',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Main Category</b>,
      width: 240,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 240,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {mainCategories?.find((item) => item._id == props.row.mainCategory)?.name}
        </p>
      ),
    },
    {
      field: 'Sub cat1',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Cat1</b>,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 150,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {mainCategories?.find((item) => item._id == props.row.mainCategory)?.subcategory1.find((item) => item._id == props.row.subCategory1)?.name}
        </p>
      ),
    },
    {
      field: 'Sub cat2',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Cat2</b>,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 150,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {mainCategories?.find((item) => item._id == props.row.mainCategory)?.subcategory1
          .find((item) => item._id == props.row.subCategory1)?.subcategory2
          .find((item) => item._id == props.row.subCategory2)?.name}
        </p>
      ),
    },
    {
      field: 'Sub cat3',
      headerClassName: 'super-app-theme--cell',
      renderHeader: () => <b>Sub Cat3</b>,
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => (
        <p
          style={{
            maxWidth: 150,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {mainCategories?.find((item) => item._id == props.row.mainCategory)?.subcategory1
          .find((item) => item._id == props.row.subCategory1)?.subcategory2
          .find((item) => item._id == props.row.subCategory2)?.subcategory3
          .find((item) => item._id == props.row.subCategory3)?.name}
        </p>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      renderHeader: () => (<b>Edit</b>),
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setDialogAction('edit');
              setDesignationParticular(params.row);
            }}
          >
                        Edit
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderHeader: () => (<b>Delete</b>),
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() =>
              setDesignationParticularToDelete(params.row)
            }
          >
                        Delete
          </Button>
        );
      },
    },
  ];


  const handleClose = () => {
    setDialogAction(null);
  };

  const removeDesignationParticular = (id: string) => {
    const snackbarId = enqueueSnackbar({
      message: 'Removing Designation Particular',
      variant: 'info',
    });
    DesignationParticularService.delete(id)
            .then((res) => {
              if (designationParticulars) {
                setDesignationParticulars(designationParticulars.filter((des) => des._id!=id));
              }
              enqueueSnackbar({
                message: res.message,
                variant: 'success',
              });
            })
            .catch((err) => {
              console.log(err);
              closeSnackbar(snackbarId);
              enqueueSnackbar({
                message: err.message,
                variant: 'error',
              });
            });
  };

  useEffect(() => {
    setSelectedDesignation(() =>
      designations?.filter((item) =>
        designationParticular?.designations?.includes(item._id),
      ) ?? [],
    );
    setSelectedMainCategory(() => mainCategories?.find((item) => item._id == designationParticular.mainCategory));
  }, [designationParticular]);
  useEffect(() => {
    setSelectedSubCategory1(() => selectedMainCategory?.subcategory1.find((item) => item._id == designationParticular.subCategory1) ?? null);
  }, [selectedMainCategory]);
  useEffect(() => {
    setSelectedSubCategory2(() => selectedSubCategory1?.subcategory2.find((item) => item._id == designationParticular.subCategory2) ?? null);
  }, [selectedSubCategory1]);
  useEffect(() => {
    setSelectedSubCategory3(() => selectedSubCategory2?.subcategory3.find((item) => item._id == designationParticular.subCategory3) ?? null);
  }, [selectedSubCategory2]);


  useEffect(() => {
    DesignationParticularService.getAll()
              .then((res) => {
                setDesignationParticulars(res.data);
                handleClose();
                enqueueSnackbar({
                  variant: 'success',
                  message: res.message,
                });
              })
              .catch((res) => {
                console.log(res);
                handleClose();
                enqueueSnackbar({
                  variant: 'error',
                  message: res.message,
                });
              });

    FRServices.getMainCategory()
      .then((res) => {
        setMainCategories(res.data);
      })
      .catch((res) => {
        console.log(res);
      });

    DesignationServices.getAll()
      .then((res) => setDesignations(res.data))
      .catch((error) => {
        setDesignationsFetchError(error.message);
        enqueueSnackbar({ variant: 'error', message: error.message });
      });
  }, []);

  return (
    <CommonPageLayout title="Designation particulars">
      <Dialog open={Boolean(designationParticularToDelete)} onClose={()=>setDesignationParticularToDelete(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this Designation particulars?</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDesignationParticularToDelete(null);
          }} variant="text">
                        No, Cancel
          </Button>
          <Button onClick={() => {
            if (designationParticularToDelete) {
              removeDesignationParticular(designationParticularToDelete._id);
            }

            setDesignationParticularToDelete(null);
          }} variant="contained" color="error">
                        Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(dialogAction)} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              DesignationParticularService.create(designationParticular).then((res) => {
                setDesignationParticulars((designationParticulars) => (designationParticulars === null ? [res.data] : [...designationParticulars, res.data]));
                setDesignationParticular({
                  designations: [''],
                  title: '',
                  mainCategory: '',
                  subCategory1: '',
                  subCategory2: '',
                  subCategory3: '',
                });
              });
            } else {
              DesignationParticularService.edit(designationParticular).then((res) => {
                setDesignationParticulars((designationParticulars) => (designationParticulars?.map((des) => (des._id === designationParticular._id ? res.data : des))));
                setDesignationParticular({
                  designations: [''],
                  title: '',
                  mainCategory: '',
                  subCategory1: '',
                  subCategory2: '',
                  subCategory3: '',
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Designation particulars</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  value={designationParticular.title}
                  onChange={(e) => setDesignationParticular((des) => ({ ...des, title: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  options={designations ?? []}
                  value={selectedDesignation??[]}
                  onChange={(e, newValue) => {
                    setSelectedDesignation(newValue);
                    setDesignationParticular((designationParticulars)=>({
                      ...designationParticulars,
                      designations: newValue?.map((des)=>des._id),
                    }));
                  }}
                  getOptionLabel={(option) => option.name}
                  multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Designation"
                      disabled={designations === null}
                      helperText={designationsFetchError || (designations === null && 'Loading...')}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  value={selectedMainCategory ?? null}
                  options={mainCategories ?? []}
                  getOptionLabel={(mainCategory) => mainCategory.name}
                  onChange={(e, selectedMainCategory) => {
                    if (selectedMainCategory) {
                      setDesignationParticular((designationParticulars)=>({
                        ...designationParticulars,
                        mainCategory: selectedMainCategory._id,
                      }));
                      setSelectedMainCategory(selectedMainCategory);
                      // setSelectedSubCategory1(null);
                      // setSelectedSubCategory1(null);
                      // setSelectedSubCategory1(null);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Main Category" required />}
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  value={selectedSubCategory1}
                  options={selectedMainCategory?.subcategory1 ?? []}
                  getOptionLabel={(subcategory2) => subcategory2.name}
                  onChange={(_e, selectedSubCategory1) => {
                    if (selectedSubCategory1) {
                      setDesignationParticular((designationParticulars)=>({
                        ...designationParticulars,
                        subCategory1: selectedSubCategory1._id,
                      }));
                      setSelectedSubCategory1(selectedSubCategory1);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Sub Category 1" required />}
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  value={selectedSubCategory2}
                  options={selectedSubCategory1?.subcategory2 ?? []}
                  getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                  onChange={(_e, selectedSubCategory2) => {
                    if (selectedSubCategory2) {
                      setDesignationParticular((designationParticulars)=>({
                        ...designationParticulars,
                        subCategory2: selectedSubCategory2._id,
                      }));
                      setSelectedSubCategory2(selectedSubCategory2);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  value={selectedSubCategory3}
                  options={selectedSubCategory2?.subcategory3 ?? []}
                  getOptionLabel={(subCategory3) => subCategory3.name}
                  onChange={(e, selectedSubCategory3) => {
                    if (selectedSubCategory3) {
                      setDesignationParticular((designationParticulars)=>({
                        ...designationParticulars,
                        subCategory3: selectedSubCategory3._id,
                      }));
                      setSelectedSubCategory3(selectedSubCategory3);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Sub Category 3" required />}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="contained"
              sx={{ right: 20, marginBottom: 2 }}
              color="error"
            >
                            Close
            </Button>
            <Button type="submit" variant="contained" sx={{ right: 20, marginBottom: 2 }} color="success">
              {dialogAction}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Card>
        <Grid container spacing={2} >
          <Grid item xs={12} sx={{ px: 2 }}>
            <br />
            <Button
              variant="contained"
              sx={{ float: 'right', marginBottom: 3 }}
              startIcon={<AddIcon />}
              onClick={() => {
                setDialogAction('add');
              }}
            >
                            Add new
            </Button>
          </Grid>
        </Grid>

        <DataGrid
          sx={{ height: '80vh', width: '100%' }}
          // style={{ height: '80vh', width: '100%' }}
          rows={ designationParticulars??[]} columns={columns} getRowId={(row) => row._id} loading={designationParticular === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default DesignationParticulars;
