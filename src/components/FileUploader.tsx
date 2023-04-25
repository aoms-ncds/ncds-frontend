import { Delete as DeleteIcon, InsertDriveFile, PictureAsPdf, SmartDisplay, TableView } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
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

interface FileUploaderProps{
  id?: string;
  title: string;
  types: FileObjectType[];
  accept: (
    'video/*'|'image/*' | 'image/jpeg' | 'image/png' | 'image/gif'
    | '.xlsx' | '.xls'
    )[];
  open: boolean;
  onClose: () => void;
  uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void) => Promise<StandardResponse<FileObject>>;
  getFiles: () => Promise<StandardResponse<FileObject[]>>;
  renameFile: (fileID: string, newName: string) => Promise<StandardResponse<void>>;
  deleteFile: (fileID: string) => Promise<StandardResponse<void>>;
  onLoad: () => void;
  afterLoad: () => void;
}
interface UploadingFile{
  tempID: string;
  name: string;
  size: number;
  type: FileObjectType;
  progress: AJAXProgress;
}
const FileUploader = (props: FileUploaderProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const inputFileField = useRef<HTMLInputElement>(null);

  const [fileObjects, setFileObjects] = useState<FileObject[]|null>(null);
  const [filesFetchErrorMessage, setFilesFetchErrorMessage] = useState<string|null>(null);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragged, setDragged] = useState(false);

  const uploadFile = (files: FileList) => {
    for (let i=0; i<files.length; i++) {
      const droppedFile = files[i];
      if (
        props.types.includes(droppedFile.type as FileObjectType)
      ) {
        const tempID = (new Date()).getTime().toString();
        // console.log('Looping');
        console.log('Uploading');
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
        props.onLoad();
        props.uploadFile(droppedFile, (progress) => {
          setUploadingFiles((_files) => _files.map((_file) => _file.tempID === tempID ? ({ ..._file, progress }):_file));
          // setUploadingFiles((files) => {
          //   const newFiles = [...files];
          //   const currentFileIndex = newFiles.findIndex((item) => item.tempID === tempID);
          //   newFiles[currentFileIndex].progress = progress;
          //   // console.log({ progress });
          //   return newFiles;
          // });
        }).then((res) => {
          props.afterLoad();
          setUploadingFiles((_files) => _files.filter((_file) => _file.tempID !== tempID));
          setFileObjects((_file) => _file ? [..._file, res.data]:[res.data]);
        }).catch((error) => {
          props.afterLoad();
          console.log('Caught error', error);
        });
        // setFile(droppedFile);
        // setUploadingFiles
        // readFileContent(droppedFile);
      } else {
        // Show error message
        enqueueSnackbar({
          message: ' Please Drop an Excel file Only',
          variant: 'info',
        });
      }
    }
  };

  useEffect(() => {
    if (props.open) {
      props.onLoad();
      props.getFiles()
      .then((res) => {
        props.afterLoad();
        setFileObjects(res.data);
      })
      .catch((error:StandardResponse<void>) => {
        props.afterLoad();
        setFilesFetchErrorMessage(error.message ? error.message : 'Something went wrong! Try again later');
      });
    } else {
      setFileObjects(null);
    }

    return () => {
      setFileObjects(null);
    };
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth='lg'
      fullWidth={true}
    >
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          setDragged(true);
        }}
        onDragLeave={() => setDragged(false)}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <Divider /><br />
        <DialogContent
          onDragStart={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            uploadFile(event.dataTransfer.files);
            setDragged(false);
          }}
        >
          <Fade in={dragged}>
            <Box sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              height: '100%',
              zIndex: 999,
              opacity: 0.2,
              backgroundColor: isDark ? 'grey' : '#1d1c1c',
              color: isDark?'black':'white',
            }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: '80%',
                  height: '80%',
                  transform: 'translate(-50%, -50%)',
                  border: '4px dashed white',
                  borderRadius: 2,
                }}>
                <Box
                  sx={{
                    'position': 'absolute',
                    'top': '50%', 'left': '50%',
                    'transform': 'translate(-50%, -50%)',
                  }}>

                  <Typography
                    variant='h4'
                    sx={{ textAlign: 'center' }}
                    color="inherit"
                  >
                Drag and Drop here
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ textAlign: 'center' }}
                  >
                Supported formats: <br /> {props.types.join(', ')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
          {
            filesFetchErrorMessage ? <Alert severity='error'>
              <AlertTitle><b>Something went wrong!</b></AlertTitle>
              {filesFetchErrorMessage}
            </Alert> :
              !fileObjects ?
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress/>
                </div> :
                <Grid container spacing={3}>
                  {fileObjects.map((file) => <Grid key={file._id} item xs={12} md={6} lg={4} xl={3}>
                    <Card sx={{ backgroundColor: isDark ? '#000' : '#eee' }}>
                      <CardContent sx={{ pb: 0 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} lg={3}>
                            <GetFileIconByType type={file.type} />
                          </Grid>
                          <Grid item xs={12} lg={9}>
                            <Input
                              value={file.name}
                              onChange={(e) => {
                                setFileObjects(
                                  (_fileObjects) => !_fileObjects ? null :
                                    _fileObjects.map(
                                      (_fileObject) =>{
                                        // console.log(_fileObject._id, file._id, _fileObject._id === file._id);
                                        return _fileObject._id === file._id ? ({ ..._fileObject, name: e.target.value }) : _fileObject;
                                      },
                                    ),
                                );
                                props.onLoad();
                                props.renameFile(file._id, e.target.value)
                                  .then((res) => {
                                    props.afterLoad();
                                  })
                                  .catch((error) => {
                                    props.afterLoad();
                                  });
                              }}
                              disableUnderline
                              fullWidth
                            />
                            <Typography variant='caption'>{(file.size/1000/1000).toFixed(2)} MB</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions sx={{ pt: 0 }}>
                        <IconButton
                          sx={{ ml: 'auto' }}
                          color='error'
                          onClick={() => {
                            props.onLoad();
                            props.deleteFile(file._id).then(() => {
                              props.afterLoad();
                              setFileObjects((fileObjects) =>
                                !fileObjects ? null :
                                  fileObjects.filter(
                                    (fileObject) => fileObject._id !== file._id ?? null,
                                  ),
                              );
                            }).catch((error) => {
                              console.log({ error });
                              props.afterLoad();
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>)}
                  {uploadingFiles.map((file, index) => <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                    <Card sx={{ backgroundColor: isDark ? '#000' : '#eee' }}>
                      <CardContent sx={{ pb: 0 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} lg={3}>
                            <GetFileIconByType type={file.type} />
                          </Grid>
                          <Grid item xs={12} lg={9}>
                            <Input
                              value={file.name}
                              disabled
                              disableUnderline
                              fullWidth
                            />
                            <Typography variant='caption'>{convertFileSize(file.size).size.toFixed(2)} {convertFileSize(file.size).type}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {/* <Box height={20}/> */}
                      {/* {file.progress} */}
                      <LinearProgress variant='determinate' value={file.progress.percentage} />
                      <Typography sx={{ padding: '10px' }}>
                        {((file.progress.loaded/1000)/(file.progress.total>MB10?1000:1)).toFixed(2)}/{(file.progress.total/1000/1000).toFixed(2)} {convertFileSize(file.size).type}
                      </Typography>
                    </Card>
                  </Grid>)}
                </Grid>}
          {(fileObjects && fileObjects.length === 0 && uploadingFiles.length === 0) && <>
            <Typography variant='h4' sx={{ textAlign: 'center', mt: 5 }}>No files found!</Typography>
          </>}
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={props.onClose}
          >Close</Button>
          &nbsp;
          <input
            type="file"
            id={props.id ?? 'file-input'}
            accept={props.accept.join(',')}
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
            <Button
              variant='contained'
              onClick={() => inputFileField.current?.click()}
              disabled={fileObjects === null}
            >Choose file</Button>
          </label>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line react/no-multi-comp
export const GetFileIconByType = (props: {type: FileObjectType}) => {
  if (
    props.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    props.type === 'application/vnd.ms-excel'
  ) {
    return <TableView fontSize='large' />;
  } else if (props.type === 'application/pdf') {
    return <PictureAsPdf fontSize='large' />;
  } else if (props.type === 'video/quicktime') {
    return <SmartDisplay fontSize='large' />;
  } else {
    return <InsertDriveFile fontSize='large' />;
  }
};
const MB10 = 1000*1000;
const convertFileSize = (size: number) => ({ size: size/1000/(size>MB10?1000:1), type: size>MB10?'MB':'KB' });
export default FileUploader;
