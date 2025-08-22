import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, AttachFile as AttachmentIcon } from '@mui/icons-material';

import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import { CreatableCustomUsers, ICustomUsers } from './extras/LanguageTypes';
import CustomUserService from './extras/CustomUserService';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';

const CustomUsers = () => {
  const [languages, setLanguages] = useState<ICustomUsers[] | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [languageToDelete, setLanguageToDelete] = useState<ICustomUsers | null>(null);
  const [newUser, setNewUser] = useState<CreatableCustomUsers>({
    name: '', division: '', eSign: null });
  const [dialogAction, setDialogAction] = React.useState<'add' | 'edit' | false>(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showFileUploaderView, setShowFileUploaderVIew] = useState(false);
  const [allDivisions, setAllDivisions] = useState<any[]>([]);
  useEffect(() => {
    DivisionsServices.getDivisions()
      .then((res) => {
        setAllDivisions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(languages, 'languages');

  const removeLanguage = (id: string) => {
    CustomUserService.delete(id)
      .then((res) => {
        if (languages) {
          const newLanguage = languages.filter((languages) => {
            return languages._id !== id;
          });
          setLanguages(newLanguage);
        }
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        closeSnackbar();
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };
  const handleClose = () => {
    setDialogAction(false);
  };
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setLanguageToDelete(null);
  };
  const columns: GridColDef<ICustomUsers>[] = [
    {
      field: 'Languages',
      renderHeader: () => (<b>Custom User</b>),
      align: 'left',
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 180,
      headerAlign: 'center',
      renderHeader: () => (<b>Division</b>),
      valueGetter: (params:any) => params.row.division?.details?.name || '',


    },
    {
      field: 'eSign',
      headerName: 'Delete',
      renderHeader: () => (<b>E-Sign</b>),
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="info"
            startIcon={<AttachmentIcon />}
            onClick={() => {
              setShowFileUploaderVIew(true);
              setLanguageToDelete(params.row);
            }}
          >
            E-Sign
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
            onClick={() => {
              setConfirmDelete(true);
              setLanguageToDelete(params.row);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    CustomUserService.getAll()
      .then((res) => {
        setLanguages(res.data);
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
  }, []);


  return (
    <CommonPageLayout title="Custom Users">


      <Dialog open={confirmDelete} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this User?</Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="text">
            No, Cancel
          </Button>
          <Button onClick={() => {
            if (languageToDelete) {
              removeLanguage(languageToDelete._id);
            }
            setConfirmDelete(false);
            setLanguageToDelete(null);
          }} variant="contained" color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogAction !== false} onClose={handleClose} PaperProps={{ style: { width: '500px' } }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dialogAction === 'add') {
              CustomUserService.create(newUser).then((res) => {
                window.location.reload();
                setLanguages((langs) => (langs === null ? [res.data] : [...langs, res.data]));
                setNewUser({
                  name: '', division: '', eSign: null,
                });
              });
            } else {
              CustomUserService.edit(newUser).then((res) => {
                setLanguages((langs) => (langs === null ? null : langs?.map((lang) => (lang._id === newUser._id ? res.data : lang))));

                setNewUser({
                  name: '', division: '', eSign: null,
                });
              });
            }
            handleClose();
          }}
        >
          <DialogTitle>{dialogAction === 'add' ? 'Add' : 'Edit'} Custom users</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="language"
              label="Enter User"
              type="text"
              fullWidth
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser((lang) => ({ ...lang, name: e.target.value }))}
              required
            />
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={newUser.division ?? null}
                options={allDivisions}
                getOptionLabel={(division) => division.details?.name || ''}
                onChange={(_e, purposeDivision) => {
                  setNewUser({
                    ...newUser,
                    division: purposeDivision,
                  });
                }}
                renderInput={(params) => <TextField {...params} label="Choose Division" />}
                fullWidth
              />
            </Grid>


            <Grid item xs={12}>
              <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                    E-signature
              </Button>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setNewUser({
                  name: '', division: '', eSign: null,
                });
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
      <FileUploader
        title=" E-signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        action={'add'}
        getFiles={newUser?.eSign ? [newUser?.eSign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            setNewUser({
              ...newUser,
              eSign: res.data,

            });
            return res;
          });
          return resp;
        }}
        // renameFile={(fileId: string, newName: string) => {
        //   props.onChange({
        //     ...props.value,
        //     prevCoordinator: {
        //       ...props.value.prevCoordinator,
        //       sign: props.value.prevCoordinator?.sign ?
        //         {
        //           ...props.value.prevCoordinator?.sign,
        //           filename: newName,
        //         } :
        //         undefined,
        //     },
        //   });
        //   return FileUploaderServices.renameFile(fileId, newName);
        // }}
        // {...((props.action === 'edit' || props.action === 'add') && {
        //   deleteFile: (fileId: string) => {
        //     props.onChange({
        //       ...props.value,
        //       prevCoordinator: {
        //         ...props.value.prevCoordinator,
        //         sign: undefined,
        //       },
        //     });
        //     return FileUploaderServices.getFile(fileId) as any;
        //   },
        // })}
      />
      <FileUploader
        title="View E-signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderView}
        onClose={() => setShowFileUploaderVIew(false)}
        action={'add'}
        getFiles={languageToDelete?.eSign ? [languageToDelete?.eSign] : []}
      />
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
          rows={languages ?? []} columns={columns} getRowId={(row) => row._id} loading={languages === null} />
      </Card>
    </CommonPageLayout>
  );
};

export default CustomUsers;
