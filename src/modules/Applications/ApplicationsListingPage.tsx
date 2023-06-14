import React, { useEffect, useState } from 'react';
import { Edit as EditIcon, Preview as PreviewIcon, Add as AddIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Attachment } from '@mui/icons-material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import ApplicationServices from './extras/ApplicationServices';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import GridLinkAction from '../../components/GridLinkAction';
// import { useParams } from 'react-router-dom';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';
import FileUploader from '../../components/FileUploader/FileUploader';
import { MB } from '../../extras/CommonConfig';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';


const ApplicationsListingPage = () => {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [action, setAction] = useState<'add' | 'edit'>('add');
  const [showApplicationFormDialog, setShowApplicationFormDialog] = useState<boolean>(false);
  const [editid, setEditId] = useState<string>();
  const [statusId, setStatusId] = useState<string>();
  const [applicationFormState, setApplicationFormState] = useState<CreatableApplication>({
    name: '',
    reason: '',
    status: '',
    attachment: [],
  });

  useEffect(() => {
    ApplicationServices.getAll({ status: UserLifeCycleStates.CREATED })
      .then((res) => {
        setApplications(res.data);
      })
      .catch((error) => {
        enqueueSnackbar({
          message: error.message,
          variant: 'error',
        });
      });
  }, []);

  const EditApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editid) {
      ApplicationServices.editApplication(editid, applicationFormState)
        .then((res) => {
          setShowApplicationFormDialog(false);
          enqueueSnackbar({
            message: res.message,
            variant: 'success',
          });
          setApplicationFormState({
            name: '',
            reason: '',
            status: '',
            attachment: [],
          });

          return ApplicationServices.getAll({ status: UserLifeCycleStates.CREATED });
        })
        .then((res) => {
          setApplications(res.data);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.message,
            variant: 'error',
          });
        });
    }
  };

  const [showFileUploader, setShowFileUploader] = useState<boolean>(false);
  const AddApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snackbarId = enqueueSnackbar({
      message: action === 'add' ? 'Creating Request' : 'Updating Request',
      variant: 'info',
    });

    ApplicationServices.create(applicationFormState)
      .then((res) => {
        setShowApplicationFormDialog(false);
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });

        setApplications((prevApps) => (!prevApps ? [res.data] : [...prevApps, res.data]));
        setApplicationFormState(() => ({
          name: '',
          reason: '',
          status: '',
          attachment: [],
        }));
      })
      .catch((err) => {
        closeSnackbar(snackbarId);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridLinkAction key={1} label="View" icon={<PreviewIcon />} showInMenu to={`/application/${params.id}/approval`} />,
        <GridLinkAction
          key={3}
          label="Edit"
          icon={<EditIcon />}
          showInMenu
          onClick={() => {
            setEditId(params.id as string);
            setAction('edit');
            setApplicationFormState(params.row);
            console.log(params.row);
            setShowApplicationFormDialog(true);
          }}
        />,

        <GridLinkAction
          key={2}
          label="Approve"
          icon={<ThumbUpIcon />}
          showInMenu
          onClick={() => {
            setStatusId(params.id as string);
            const snackbarId = enqueueSnackbar({
              message: 'Approving...',
              variant: 'info',
            });

            ApplicationServices.approve(params.id as string)
              .then((res) => {
                if (applications) {
                  const filteredApplications = applications?.filter((application) => {
                    return application._id !== params.id;
                  });
                  setApplications(filteredApplications);
                }
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: res.message,
                  variant: 'success',
                });
              })
              .catch((err) => {
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: err.message,
                  variant: 'error',
                });
              });
          }}
        />,
        <GridLinkAction
          key={3}
          label="Reject"
          icon={<ThumbDownIcon />}
          showInMenu
          onClick={() => {
            const snackbarId = enqueueSnackbar({
              message: 'Rejecting...',
              variant: 'info',
            });
            ApplicationServices.reject(params.id as string)
              .then((res) => {
                if (applications) {
                  const filteredApplications = applications?.filter((application) => {
                    return application._id !== params.id;
                  });
                  setApplications(filteredApplications);
                }
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: res.message,
                  variant: 'success',
                });
              })
              .catch((err) => {
                closeSnackbar(snackbarId);
                enqueueSnackbar({
                  message: err.message,
                  variant: 'error',
                });
              });
          }}
        />,
      ],
    },
    { field: '_id', headerName: 'SI NO', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'reason', headerName: 'Reason', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];
  return (
    <CommonPageLayout title="Application Manages ">
      <Button
        variant="contained"
        sx={{ float: 'right' }}
        startIcon={<AddIcon />}
        onClick={() => {
          setShowApplicationFormDialog(true);
          setAction('add');
        }}
      >
        Add new
      </Button>
      <br />
      <br />
      <Dialog open={showApplicationFormDialog} onClose={() => setShowApplicationFormDialog(false)} PaperProps={{ style: { width: '500px' } }}>
        <form onSubmit={action === 'add' ? AddApplication : EditApplication}>
          <DialogTitle>{action === 'add' ? 'Add Request' : 'Edit Request:'}</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    label="Name"
                    value={applicationFormState.name}
                    onChange={(e) => {
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        name: e.target.value,
                      }));
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label="Reason"
                    value={applicationFormState.reason}
                    onChange={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      setApplicationFormState(() => ({
                        ...applicationFormState,
                        reason: e.target.value,
                      }));
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <Button variant="contained" onClick={() => setShowFileUploader(true)}>
                          Attachments
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowApplicationFormDialog(false)}>Cancel</Button>
            <Button type="submit">{action === 'add' ? 'Add' : 'Edit'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <FileUploader
        title="Attachments"
        types={['application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/pdf',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 3,
          maxTotalSize: 3*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        // getFiles={TestServices.getBills}
        getFiles={applicationFormState.attachment}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Applications', applicationFormState.name+'_'+(applicationFormState.attachment.length+1))
          .then((res)=>{
            // console.log(res.data._id);
            setApplicationFormState(() => ({
              ...applicationFormState,
              attachment: [...applicationFormState.attachment, res.data],
            }));
            return res;
          });
          return resp;
        }}
        renameFile={FileUploaderServices.renameFile}
        deleteFile={(fileId: string) => {
          setApplicationFormState(() => ({
            ...applicationFormState,
            attachment: applicationFormState.attachment.filter((file)=>file._id!==fileId),
          }));
          return FileUploaderServices.deleteFile(fileId);
        }}
      />

      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DataGrid rows={applications ?? []} columns={columns} getRowId={(row) => row._id} loading={applications === null} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default ApplicationsListingPage;
