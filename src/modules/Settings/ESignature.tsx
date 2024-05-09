import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogContent, Divider, Grid, Typography, FormControl, DialogActions, DialogTitle, TextField } from '@mui/material';
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
  const [showOfficeManagerName, setShowOfficeManagerName] = useState(false);
  const [showPresidentUploader, setShowPresidentFileUploader] = useState(false);
  const [addSignature, toggleAddSignature] = useState(false);
  const [name, setName] = useState('');
  const [selectedSignature, setSignature] = useState<Esignature>({
    _id: '',
    officeManagerSignature: {
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
  console.log(name, 'shibinc');
  
  const [selectedSignaturePresident, setSignaturePresident] = useState<EsignaturePresident>({
    _id: '',
    presidentSignature: {
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

console.log(selectedSignaturePresident,'selectedSignaturePresident');

const submitData= ()=>{
  ESignatureService.addOfficeMnrName(name)
        .then(() => {
          console.log('ESignature added successfully');
        })
        .catch((error) => {
          console.error('Error adding eSignature:', error);
        });

}
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
    if (selectedSignature?.officeManagerSignature && selectedSignature?.officeManagerSignature._id) {
      console.log('is here', selectedSignature.officeManagerSignature?._id);
      ESignatureService.addESignatureS1(selectedSignature.officeManagerSignature)
        .then(() => {
          console.log('ESignature added successfully');
        })
        .catch((error) => {
          console.error('Error adding eSignature:', error);
        });
    } else {

    }
  }, [selectedSignature]);
  useEffect(() => {
    if(selectedSignaturePresident?.presidentSignature && selectedSignaturePresident?.presidentSignature._id){
      ESignatureService.addESignatureS2(selectedSignaturePresident.presidentSignature)
      .then(() => {
        console.log('ESignature added successfully');
      })
      .catch((error) => {
        console.error('Error adding eSignature:', error);
      });
    }
  }, [selectedSignaturePresident]);


  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        setSignature(res?.data as Esignature);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
  }, [showOfficeManagerUploader]);
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        // const name : {name:string}= res.data
        setName((res.data as {officeManagerName:string }).officeManagerName);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
  }, []);
  useEffect(() => {
    ESignatureService.getESignature()
      .then((res) => {
        console.log({ res});
        setSignaturePresident(res.data as EsignaturePresident);
      })
      .catch((res) => {
        console.log(res);
      });
    console.log(selectedSignature);
  }, [showPresidentUploader]);


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
                    Office Manager Signature
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ width: 260 }}
                    onClick={() => {
                      setShowOfficeManagerName(true);
                    }}
                  >
                    {' '}
                    Office Manager Name
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: 260 }}
                    onClick={() => {
                      setShowPresidentFileUploader(true);
                    }}
                  >
                    {' '}
                    President Signature
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
              title="Signature2"
              action="add"
              types={['image/png', 'image/jpeg', 'image/jpg']}
              limits={{
                // types: [],
                maxItemSize: 1 * MB,
                maxItemCount: 1,
                maxTotalSize: 3 * MB,
              }}
              uploadFile={async (file: File, onProgress: (progress: AJAXProgress) => void) => {
                const res = await FileUploaderServices.uploadFile(file, onProgress, 'Settings/eSignature', file.name);
                console.log(res.data, 'FFF1');
                setSignaturePresident(() => ({
                  ...selectedSignaturePresident,
                  presidentSignature: res.data,
                }));
                return res;
              }}


              open={showPresidentUploader}
              onClose={() => setShowPresidentFileUploader(false)}
              getFiles={selectedSignaturePresident?.presidentSignature ? [selectedSignaturePresident?.presidentSignature]:[]}
              deleteFile={(fileId: string) => {
                ESignatureService.removeESignaturepr('presidentSignature');
                return FileUploaderServices.deleteFile(fileId);
              }}
            />
 <Dialog
        open={showOfficeManagerName}
        onClose={() => setShowOfficeManagerName(false)}    
      >
        <DialogTitle>President Name</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setShowOfficeManagerName(false)}>Cancel</Button>
          <Button onClick={submitData}>Add</Button>
        </DialogActions>
      </Dialog>
            <FileUploader
              title="Signature1"
              action="add"
              types={['image/png', 'image/jpeg', 'image/jpg']}
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
                      officeManagerSignature: res.data,
                    }));
                    return res;
                  });
              }}


              open={showOfficeManagerUploader}
              onClose={() => setShowOfficeManagerFileUploader(false)}
              getFiles={selectedSignature?.officeManagerSignature ? [selectedSignature?.officeManagerSignature]:[]}
              deleteFile={(fileId: string) => {
                ESignatureService.removeESignature('officeManagerSignature');
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
