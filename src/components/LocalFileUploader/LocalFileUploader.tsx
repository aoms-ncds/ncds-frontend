/* eslint-disable @typescript-eslint/no-unused-vars */
import { Check as CheckIcon, Clear as ClearIcon, Delete as DeleteIcon, FileDownload as FileDownloadIcon, InsertDriveFile, Photo, PictureAsPdf, SmartDisplay, TableView } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import CommonLifeCycleStates from '../../extras/CommonLifeCycleStates';
import LoccalFileUploaderServices from '../../components/LocalFileUploader/extras/LocalFileUploadServices';
interface FileUploaderProps {
  id?: string;
  title: string;
  action: 'add'|'view'|'manage';
  types: FileObjectType[]; // pass the type of file you need to upload
  // accept: ('video/*' | 'image/*' | 'image/jpeg' | 'image/png' | 'image/gif' | '.xlsx' | '.xls')[];
  limits:{
    maxItemSize?: number;
   maxItemCount?: number;
   maxTotalSize?: number;
  };
  open: boolean;
  onClose: () => void;
  postApprove?:() => Promise<StandardResponse<void>>;
  postReject?:() => Promise<StandardResponse<void>>;
  uploadFile?: (file: File, onProgress: (progress: AJAXProgress) => void) => Promise<StandardResponse<FileObject>>;
  getFiles: FileObject[];
  renameFile?: (fileID: string, newName: string) => Promise<StandardResponse<void>>;
  deleteFile?: (fileID: string) => Promise<StandardResponse<void>>;
}
interface UploadingFile {
  tempID: string;
  name: string;
  size: number;
  type: FileObjectType;
  progress: AJAXProgress;
}
const LocalFileUploader = (props: FileUploaderProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const inputFileField = useRef<HTMLInputElement>(null);

  const [fileObjects, setFileObjects] = useState<FileObject[] | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [filesFetchErrorMessage, setFilesFetchErrorMessage] = useState<string | null>(null);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragged, setDragged] = useState(false);


  const [deleteFileId, setDeleteFileId] = useState<string|null>(null);
  const [approveFileId, setApproveFileId] = useState<string|null>(null);
  const [allApproved, setAllApproved] = useState(true);
  const [rejectFileId, setRejectFileId] = useState<string|null>(null);
  const [completedFile, setCompletedFile] = useState(false);
  const uploadFile = (files: FileList) => {
    if (props.limits.maxItemCount && fileObjects && (fileObjects?.length+files.length)>props.limits.maxItemCount) {
      // console.log((fileObjects?(fileObjects.length+1):'')+' ----- '+props.limits.maxItemCount);

      enqueueSnackbar({
        message: 'Maximum files Allowed Exceeded.  ',
        variant: 'error',
      });
      enqueueSnackbar({
        message: `Maximum files Allowed:${props.limits.maxItemCount}`,
        variant: 'info',
      });
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const droppedFile = files[i];
      if (validateFile(droppedFile)) {
        const tempID = new Date().getTime().toString();

        setUploadingFiles((_files) => [
          ..._files,
          {
            tempID,
            name: droppedFile.name,
            size: droppedFile.size,
            type: droppedFile.type as FileObjectType,
            progress: {
              loaded: 0,
              total: 0,
              percentage: 0,
            },
          },
        ]);
        props
        .uploadFile && props
          .uploadFile(droppedFile, (progress) => {
            setUploadingFiles((_files) => _files.map((_file) => (_file.tempID === tempID ? { ..._file, progress } : _file)));
            // setUploadingFiles((files) => {
            //   const newFiles = [...files];
            //   const currentFileIndex = newFiles.findIndex((item) => item.tempID === tempID);
            //   newFiles[currentFileIndex].progress = progress;
            //   // console.log({ progress });
            //   return newFiles;
            // });
          })
          .then((res) => {
            setUploadingFiles((_files) => _files.filter((_file) => _file.tempID !== tempID));
            setFileObjects((_file) => (_file ? [..._file, res.data] : [res.data]));
            enqueueSnackbar({
              message: `Successfully Uploaded  ${res.data.filename}`,
              variant: 'success',
            });
          })
          .catch((error) => {
            console.log('Caught error', error);
          });
        // setFile(droppedFile);
        // setUploadingFiles
        // readFileContent(droppedFile);
      }
    }
  };

  const validateFile=(file:File)=>{
    let totalSize=0;
    fileObjects?.map((_file)=>totalSize+=_file.size);

    if (props.limits.maxItemCount && fileObjects && fileObjects?.length+1>props.limits.maxItemCount) {
      enqueueSnackbar({
        message: 'Maximum files Allowed Exceeded.  ',
        variant: 'error',
      });
      enqueueSnackbar({
        message: `Maximum files Allowed:${convertFileSize(props.limits.maxItemCount).size.toFixed(0)} ${convertFileSize(props.limits.maxItemCount).type}`,
        variant: 'info',
      });
      return false;
    } else if (props.limits.maxTotalSize && totalSize+file.size>props.limits.maxTotalSize) {
      enqueueSnackbar({
        message: ` Maximum Total File Size Exceeds. Allowed size: ${convertFileSize(props.limits.maxTotalSize).size.toFixed(0)} ${convertFileSize(props.limits.maxTotalSize).type}`,
        variant: 'error',
      });
      return false;
    } else if (props.limits.maxItemSize && file.size>props.limits.maxItemSize) {
      enqueueSnackbar({
        message: ` File Size Exceeds. Allowed size: ${convertFileSize(props.limits.maxItemSize).size.toFixed(0)}${convertFileSize(props.limits.maxItemSize).type}`,
        variant: 'error',
      });
      return false;
    } else if (!props.types.includes(file.type as FileObjectType)) {
      enqueueSnackbar({
        message: 'Invalid File Type',
        variant: 'error',
      });
      enqueueSnackbar({
        message: ` Expected file types ${props.types.join(', ')} `,
        variant: 'info',
      });
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    setAllApproved(true);
    fileObjects?.forEach((_fileObject) => {
      if (_fileObject.status!=CommonLifeCycleStates.APPROVED) {
        setAllApproved(false);
        return;
      }
    });
    // fileObjects?.filter((_fileObject) => {
    //   if (_fileObject.status!=CommonLifeCycleStates.APPROVED) {
    //     setAllApproved(false);
    //   } else setAllApproved(true);
    // });
  }, [fileObjects]);


  useEffect(() => {
    fileObjects?.forEach((_fileObject) => {
      setAllApproved(true);
      if (_fileObject.status!=CommonLifeCycleStates.APPROVED) {
        setAllApproved(false);
        return;
      }
    });
    if (props.open) {
      setFileObjects(props.getFiles);
    } else {
      setFileObjects(null);
    }

    return () => {
      setFileObjects(null);
    };
  }, [props.open]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth={true}>
        <Box
          onDragOver={(event) => {
            event.preventDefault();
            if (props.action=='add') {
              setDragged(true);
            }
          }}
          onDragLeave={() => {
            if (props.action=='add') setDragged(false);
          }}
        >
          <DialogTitle>{props.title}</DialogTitle>
          <Divider />
          <br />
          <DialogContent
            onDragStart={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              if (props.action=='add') {
                uploadFile(event.dataTransfer.files);
                setDragged(false);
              }
            }}
          >
            <Fade in={dragged}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '100%',
                  zIndex: 999,
                  opacity: 0.2,
                  backgroundColor: isDark ? 'grey' : '#1d1c1c',
                  color: isDark ? 'black' : 'white',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80%',
                    height: '80%',
                    transform: 'translate(-50%, -50%)',
                    border: '4px dashed white',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <Typography variant="h4" sx={{ textAlign: 'center' }} color="inherit">
                    Drag and Drop here
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    Supported formats: <br /> {props.types.join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
            {filesFetchErrorMessage ? (
              <Alert severity="error">
                <AlertTitle>
                  <b>Something went wrong!</b>
                </AlertTitle>
                {filesFetchErrorMessage}
              </Alert>
            ) : !fileObjects ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            ) : (
              <Grid container spacing={3}>
                {fileObjects.map((file, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                    <Card sx={{ backgroundColor: isDark ? '#000' : '#eee' }} onClick={()=>{
                    // file.downloadURL? window.open(file.downloadURL, '_blank'):null;
                    }}>
                      <CardContent sx={{ pb: 0 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} lg={3}>
                            <GetFileIconByType type={file.type} />
                          </Grid>
                          <Grid item xs={12} lg={9}>
                            <Input
                              value={file.filename}
                              onChange={(e) => {
                                setFileObjects((_fileObjects) =>
                                  !_fileObjects ?
                                    null :
                                    _fileObjects.map((_fileObject) => {
                                      return _fileObject._id === file._id ? { ..._fileObject, filename: e.target.value } : _fileObject;
                                    }),
                                );
                                props
                                .renameFile && props
                                .renameFile(file._id, e.target.value)
                                .then((res) => {
                                })
                                .catch((error) => {
                                  // Implement
                                });
                              }}
                              disableUnderline
                              fullWidth
                            />
                            <Typography variant="caption">{(file?.size / 1000 / 1000).toFixed(2)} MB</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions sx={{ pt: 0 }}>
                        {file.status==CommonLifeCycleStates.APPROVED?
                          <Chip variant="outlined" label="Accepted" color="success" size="small" icon={<CheckIcon />} />:
                          file.status==CommonLifeCycleStates.REJECTED?
                            <Chip variant="outlined" label="Rejected" color="error" size="small" icon={<ClearIcon />} />:
                            props.action=='manage'?
                              <>
                                <IconButton
                                  sx={{ ml: 'auto' }}
                                  color="error"
                                  onClick={() => {
                                    setApproveFileId(file._id);
                                  }}
                                >
                                  <CheckIcon />
                                </IconButton>
                                <IconButton
                                  sx={{ ml: 'auto' }}
                                  color="error"
                                  onClick={() => {
                                    setRejectFileId(file._id);
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </>:null
                        }
                        {file.downloadURL&&(
                          <IconButton
                            sx={{ ml: 'auto' }}
                            color="error"
                            onClick={() => {
                              if (file.downloadURL) {
                                const link = document.createElement('a');
                                link.href = file.downloadURL;
                                link.download = ''; // You can specify a custom file name here
                                link.click();
                              }
                            }}
                          >
                            <FileDownloadIcon />
                          </IconButton>
                        )}
                        { props.deleteFile && props.action!='manage' &&(
                          <IconButton
                            sx={{ ml: 'auto' }}
                            color="error"
                            onClick={() => {
                              setDeleteFileId(file._id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>)}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                {uploadingFiles.map((file, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                    <Card sx={{ backgroundColor: isDark ? '#000' : '#eee' }}>
                      <CardContent sx={{ pb: 0 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} lg={3}>
                            <GetFileIconByType type={file.type} />
                          </Grid>
                          <Grid item xs={12} lg={9}>
                            <Input value={file.name} disabled disableUnderline fullWidth />
                            <Typography variant="caption">
                              {convertFileSize(file.size).size.toFixed(2)} {convertFileSize(file.size).type}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {/* <Box height={20}/> */}
                      {/* {file.progress} */}
                      <LinearProgress variant="determinate" value={file.progress.percentage} />
                      <Typography sx={{ padding: '10px' }}>
                        {(file.progress.loaded / 1000 / (file.progress.total > MB10 ? 1000 : 1)).toFixed(2)}/{(file.progress.total / 1000 / 1000).toFixed(2)} {convertFileSize(file.size).type}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            {fileObjects && fileObjects.length === 0 && uploadingFiles.length === 0 && (
              <>
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 5 }}>
                  {props.action=='add'? 'Drag and Drop here':'No files Found'}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={props.onClose}>
            Close
            </Button>
            {props.action=='manage'&& props.postApprove &&(
              <Button variant="contained" onClick={()=>setCompletedFile(true)} disabled={!allApproved }>
            Reconciliation Done
              </Button>
            )}

          &nbsp;
            {props.action==='add'&&(
              <>
                <input
                  type="file"
                  id={props.id ?? 'file-input'}
                  accept={props.types.join(',')}
                  value=""
                  onChange={(event) => {
                    if (event.target.files) {
                      uploadFile(event.target.files);
                    }
                  }}
                  style={{ display: 'none' }}
                  ref={inputFileField}
                  multiple
                />
                <label htmlFor={props.id ?? 'file-input'}>
                  <Button variant="contained" onClick={() => inputFileField.current?.click()} disabled={fileObjects === null}>
              Choose file
                  </Button>
                </label>
              </>
            ) }
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={deleteFileId != null} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to delete this item?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteFileId(null);
            }}
          >
         No, Cancel
          </Button>
          <Button
            onClick={() => {
              props.deleteFile && props
              .deleteFile(deleteFileId??'')
              .then(() => {
                setFileObjects((fileObjects) => (!fileObjects ? null : fileObjects.filter((fileObject) => fileObject._id !== deleteFileId)));
              })
              .catch((error) => {
                console.log({ error });
              });
              setDeleteFileId(null);
            }}
            variant="contained"
            color="error"
          >
         Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={approveFileId != null} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to approve this item?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setApproveFileId(null);
            }}
          >
                  No, Cancel
          </Button>
          <Button
            onClick={() => {
              LoccalFileUploaderServices.manageFile(approveFileId as string, 'approve');
              setFileObjects((_fileObjects) =>
                !_fileObjects ?
                  null :
                  _fileObjects.map((_fileObject) => {
                    return _fileObject._id === approveFileId ? { ..._fileObject, status: CommonLifeCycleStates.APPROVED } : _fileObject;
                  }),
              );
              setApproveFileId(null);
            }}
            variant="contained"
            color="error"
          >
                  Yes, Approve
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={rejectFileId != null} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to reject this item?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRejectFileId(null);
            }}
          >
                  No, Cancel
          </Button>
          <Button
            onClick={() => {
              LoccalFileUploaderServices.manageFile(rejectFileId as string, 'reject');
              setFileObjects((_fileObjects) =>
                !_fileObjects ?
                  null :
                  _fileObjects.map((_fileObject) => {
                    return _fileObject._id === rejectFileId ? { ..._fileObject, status: CommonLifeCycleStates.REJECTED } : _fileObject;
                  }),
              );
              setRejectFileId(null);
            }}
            variant="contained"
            color="error"
          >
                  Yes, Reject
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={completedFile} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>Do you want to complete Reconciliation?</Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setCompletedFile(false)
            }
          >
                  No, Cancel
          </Button>
          <Button
            onClick={() => {
              props.postApprove && props.postApprove();
              setCompletedFile(false);
            }}
            variant="contained"
            color="error"
          >
                  Yes, Reconciliation Completed
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

// eslint-disable-next-line react/no-multi-comp
export const GetFileIconByType = (props: { type: FileObjectType }) => {
  if (props.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || props.type === 'application/vnd.ms-excel') {
    return <TableView fontSize="large" />;
  } else if (props.type === 'application/pdf') {
    return <PictureAsPdf fontSize="large" />;
  } else if (props.type === 'video/quicktime') {
    return <SmartDisplay fontSize="large" />;
  } else if (props.type === 'image/png'||props.type === 'image/jpeg'||props.type === 'image/jpg') {
    return <Photo fontSize="large" />;
  } else {
    return <InsertDriveFile fontSize="large" />;
  }
};
const MB10 = 1000 * 1000;
const convertFileSize = (size: number) => ({ size: size / 1000 / (size > MB10 ? 1000 : 1), type: size > MB10 ? 'MB' : 'KB' });
export default LocalFileUploader;
