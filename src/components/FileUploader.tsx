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
  title: string;
  types: FileObjectType[];
  accept: (
    'video/*'|'image/*' | 'image/jpeg' | 'image/png' | 'image/gif'
    | '.xlsx' | '.xls'
    )[];
  open: boolean;
  onClose: () => void;
  getFiles: () => Promise<StandardResponse<FileObject[]>>;
  uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void) => Promise<StandardResponse<FileObject>>;
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

  const [draggedOver, setDraggedOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const uploadFile = (files: FileList) => {
    // const interval = setInterval(() => {
    //   setUploadingFiles((files) => files.map((file) => ({ ...file, progress: file.progress+10 })));
    // }, 100);
    // setTimeout(() => clearInterval(interval), 1800);
    console.log('files', files);
    console.log(props.types);
    for (let i=0; i<files.length; i++) {
      const droppedFile = files[i];
      if (
        props.types.includes(droppedFile.type as FileObjectType)
      ) {
        const tempID = (new Date()).getTime().toString();
        // console.log('Looping');
        console.log('Uploading');
        setUploadingFiles((files) => [
          ...files,
          {
            tempID,
            name: 'Untitled file',
            size: droppedFile.size,
            type: droppedFile.type as FileObjectType,
            progress: {
              loaded: 0,
              total: 0,
              percentage: 0,
            },
          },
        ]);
        props.uploadFile(droppedFile, (progress) => {
          setUploadingFiles((files) => {
            const newFiles = [...files];
            const currentFileIndex = newFiles.findIndex((item) => item.tempID === tempID);
            newFiles[currentFileIndex].progress = progress;
            // console.log({ progress });
            return newFiles;
          });
        }).then((res) => {
          setUploadingFiles((files) => files.filter((file) => file.tempID !== tempID));
          setFileObjects((fileObjects) => fileObjects ? [...fileObjects, res.data]:[res.data]);
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
      props.getFiles().then((res) => {
        setFileObjects(res.data);
      }).catch((error:StandardResponse<void>) => {
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
      <DialogTitle>{props.title}</DialogTitle>
      <Divider />
      <br />
      <DialogContent
        onDragStart={(event) => event.preventDefault()}
        onDragOver={(event) => {
          event.preventDefault();
          setDraggedOver(true);
        }}
        onDragLeave={() => {
          setDraggedOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          uploadFile(event.dataTransfer.files);
        }}
      >
        {draggedOver.toString()}
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
                          {getFileIconByType(file.type)}
                        </Grid>
                        <Grid item xs={12} lg={9}>
                          <Input
                            value={file.name}
                            disableUnderline
                            fullWidth
                          />
                          <Typography variant='caption'>{(file.size/1000/1000).toFixed(2)} MB</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ pt: 0 }}>
                      <IconButton sx={{ ml: 'auto' }} color='error'>
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
                          <PictureAsPdf fontSize='large' />
                        </Grid>
                        <Grid item xs={12} lg={9}>
                          <Input
                            value={file.name}
                            disableUnderline
                            fullWidth
                          />
                          <Typography variant='caption'>{(file.size/1000/1000).toFixed(2)} MB</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {/* <Box height={20}/> */}
                    {/* {file.progress} */}
                    <LinearProgress variant='determinate' value={file.progress.percentage} />
                    <CardContent sx={{ pt: 0, pb: 0 }}>
                      {(file.progress.loaded/1000/1000).toFixed(2)}/{(file.progress.total/1000/1000).toFixed(2)}
                    </CardContent>
                  </Card>
                </Grid>)}
              </Grid>}
      </DialogContent>
      <DialogActions>
        <input
          type="file"
          id="file-input"
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
        <label htmlFor="file-input">
          <Button
            variant='contained'
            onClick={() => inputFileField.current?.click()}
            disabled={fileObjects === null}
          >Choose file</Button>
        </label>
      </DialogActions>
    </Dialog>
  );
};

export const getFileIconByType = (type: FileObjectType) => {
  if (
    type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    type === 'application/vnd.ms-excel'
  ) {
    return <TableView fontSize='large' />;
  } else if (type === 'application/pdf') {
    return <PictureAsPdf fontSize='large' />;
  } else if (type === 'video/quicktime') {
    return <SmartDisplay fontSize='large' />;
  } else {
    return <InsertDriveFile fontSize='large' />;
  }
};

export default FileUploader;
