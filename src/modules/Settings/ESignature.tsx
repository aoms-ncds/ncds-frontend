import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, Divider, Grid, Typography, FormControl } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Add as AddIcon, Close as CloseIcon, Upload } from '@mui/icons-material';
import FileUploader from '../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../extras/CommonConfig';
import ESignatureService from './extras/ESignatureService';
import moment from 'moment';
import UsersDropdown from '../User/components/UsersDropdown';
import { enqueueSnackbar } from 'notistack';
import UserServices from '../User/extras/UserServices';
import StaffServices from '../HR/extras/StaffServices';

const ESignature = () => {
  const [showOfficeManagerUploader, setShowOfficeManagerFileUploader] = useState(false);
  const [addSignature, toggleAddSignature] = useState(false);
  const [selectedSignature, setSignature] = useState<Esignature>({
    _id: '',
    officemanagerSignature: {
      filename: '',
      size: 0,
      type: 'application/vnd.ms-excel',
      storage: 'S3',
      fileId: '',
      downloadURL: null,
      private: false,
      status: 0,
      _id: '',
      base64: '',
      createdAt: moment(),
      updatedAt: moment(),
    },
  });
  const [users, setUsers] = useState<User[] | null>(null);


  useEffect(()=>{
    StaffServices.getAll()
  .then((res) => {
    setUsers(res.data);
    console.log(res.data);
  })
  .catch((error) => {
    enqueueSnackbar({
      variant: 'error',
      message: error.message,
    });
  });
  }
  , []);

  useEffect(() => {
    if (selectedSignature?.officemanagerSignature && selectedSignature?.officemanagerSignature._id) {
      console.log('is here', selectedSignature.officemanagerSignature?._id);
      ESignatureService.addESignature(selectedSignature)
        .then(() => {
          console.log('ESignature added successfully');
        })
        .catch((error) => {
          console.error('Error adding eSignature:', error);
        });
    } else {
      console.log('Not found ID', selectedSignature);
    }
  }, [selectedSignature]);


  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res });
        setSignature(res.data as Esignature);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
  }, [showOfficeManagerUploader]);


  return (
    <CommonPageLayout title="Esignature">
      <Card style={{ height: '80vh', width: '100%' }}>
        <Grid container spacing={2} >
          <Dialog open={addSignature} sx={{ width: 400, margin: '0 auto' }} >
            <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container spacing={2} sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
                <Grid item>
                  <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center' }}>
                        Add Signatures
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: 260 }}
                    onClick={() => {
                      setShowOfficeManagerFileUploader(true);
                    }}
                  >
                    {' '}
                        HR signature
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      toggleAddSignature(false);
                    }}
                    sx={{ marginBottom: 3, width: 260 }}
                    endIcon={<CloseIcon />}
                  >
                        Close
                  </Button>
                </Grid>

              </Grid>
            </DialogContent>
          </Dialog>
          <Grid item xs={12} sx={{ px: 2 }}>
            <br />
            <Button
              variant="contained"
              sx={{ float: 'right', marginBottom: 3 }}
              startIcon={<AddIcon />}
              onClick={() => {
                // setShowOfficeManagerFileUploader(true);
                toggleAddSignature(true);
              }}
            >
               Add Signature
            </Button>
            <Grid item xs={12} md={4}>
              {/* <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users}
                    value={props.value.coordinator?.name ?? null}
                    onChange={(_e, newValue) => {
                      if (newValue) {
                        props.onChange({
                          ...props.value,
                          coordinator: {
                            ...props.value.coordinator,
                            name: newValue,
                          },
                        });
                      }
                    }}
                    disabled={props.action === 'view'}
                    label={'Co-ordinator Name'}
                    required={false}
                  />
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={12}>
                <Button variant="contained" onClick={() => setShowFileUploader1(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }} >
                E-signature
                </Button>
              </Grid> */}
            </Grid>
            <FileUploader
              title="Signature"
              action="add"
              types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 1,
                maxTotalSize: 3 * MB,
              }}
              uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
                return FileUploaderServices.uploadFile(file, onProgress, 'Settings/eSignature', file.name)
                  .then((res) => {
                    console.log(res.data, 'FFF');
                    setSignature(()=>({
                      ...selectedSignature,
                      officemanagerSignature: res.data,
                    }));
                    return res;
                  });
              }}


              open={showOfficeManagerUploader}
              onClose={() => setShowOfficeManagerFileUploader(false)}
              getFiles={selectedSignature?.officemanagerSignature ? [selectedSignature?.officemanagerSignature]:[]}
              deleteFile={(fileId: string) => {
                ESignatureService.removeESignature('officemanagerSignature');
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </CommonPageLayout>
  );
};

export default ESignature;
