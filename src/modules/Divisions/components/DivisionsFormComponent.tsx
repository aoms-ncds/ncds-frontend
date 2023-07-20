/* eslint-disable react/jsx-no-undef */
import { Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import AddressForm from '../../../components/AddressForm';
import FileUploader from '../../../components/FileUploader/FileUploader';
import { useEffect, useState } from 'react';
import { MB } from '../../../extras/CommonConfig';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import UsersDropdown from '../../User/components/UsersDropdown';
import UserServices from '../../User/extras/UserServices';
import { enqueueSnackbar } from 'notistack';

const DivisionsFormComponent = (props: FormComponentProps<DivisionDetails, { title: string }>) => {
  const [showFileUploader1, setShowFileUploader1] = useState(false);
  const [showFileUploader2, setShowFileUploader2] = useState(false);
  const [showFileUploader3, setShowFileUploader3] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);


  useEffect(()=>{
    UserServices.getDivisionUser()
  .then((res) => {
    setUsers(res.data);
  })
  .catch((error) => {
    enqueueSnackbar({
      variant: 'error',
      message: error.message,
    });
  });
  }, []);

  // console.log(eSign.attachment, 'eSign');
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Division Details
        </Typography>
        <br />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label="Division Name" value={props.value.name} onChange={(e) => props.onChange({ ...props.value, name: e.target.value })} fullWidth required disabled={props.action=='view'} />
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Division Id" value={props.value.divisionId}fullWidth />
        </FormControl>
      </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Contact Number" value={props.value.contactNumber}
            onChange={(e) => props.onChange({ ...props.value, contactNumber: e.target.value })} fullWidth disabled={props.action=='view'} />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Email ID" value={props.value.email} onChange={(e) => props.onChange({ ...props.value, email: e.target.value })} fullWidth disabled={props.action=='view'} />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Workers"
            type="number"
            value={props.value.noOfWorkers}
            onChange={(e) => props.onChange({ ...props.value, noOfWorkers: Number(e.target.value) })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={props.action=='view'}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Sub Divisions"
            type="number"
            value={props.value.noOfSubdivisions}
            onChange={(e) => props.onChange({ ...props.value, noOfSubdivisions: Number(e.target.value) })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={props.action=='view'}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Churches"
            value={props.value.noOfChurches}
            onChange={(e) => props.onChange({ ...props.value, noOfChurches: Number(e.target.value) })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={props.action=='view'}
          />
        </FormControl>
      </Grid>
      <AddressForm value={props.value.address} onChange={(newState: Address) => props.onChange({ ...props.value, address: newState })} action={props.action} />

      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Leaders Details</Divider>
      </Grid>
      {/*
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}> */}
      {/* <Grid container spacing={1} alignItems="center"> */}

      <Grid item xs={12} md={4}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <UsersDropdown
              users={users??[]}
              value={props.value.coordinator?.name??null}
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
              }
              }
              disabled={props.action=='view'}
              label={'Co-ordinator Name'}
              required={false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setShowFileUploader1(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }} >
                E-signature
          </Button>
        </Grid>
      </Grid>
      {/* </Grid> */}
      {/* </Grid> */}

      {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={1} alignItems="center"> */}
      <Grid item xs={12} md={4}>

        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <UsersDropdown
              users={users??[]}
              value={props.value.seniorLeader?.name??null}
              onChange={(e, newValue) => {
                if (newValue) {
                  props.onChange({
                    ...props.value,
                    seniorLeader: {
                      ...props.value.seniorLeader,
                      name: newValue,
                    },
                  });
                }
              }}
              disabled={props.action=='view'}
              label={'Senior Leader Name'}
              required={false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setShowFileUploader2(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }} >
                E-signature
          </Button>
        </Grid>
      </Grid>
      {/* </Grid>
        </Grid> */}

      {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={1} alignItems="center"> */}
      <Grid item xs={12} md={4}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <UsersDropdown
              users={users??[]}
              disabled={props.action=='view'}
              value={props.value.juniorLeader?.name??null}
              onChange={(e, newValue) => {
                if (newValue) {
                  props.onChange({
                    ...props.value,
                    juniorLeader: {
                      ...props.value.juniorLeader,
                      name: newValue,
                    },
                  });
                }
              }}
              label={'Junior Leader Name'}
              required={false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setShowFileUploader3(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                E-signature
          </Button>
        </Grid>
      </Grid>
      {/* </Grid>
        </Grid>
      </Grid> */}

      <FileUploader
        title=" Coordinator Signature"
        types={[
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 1,
          maxTotalSize: 1*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader1}
        onClose={() => setShowFileUploader1(false)}
        action={props.action=='view'?'view':'add'}
        getFiles={props.value.coordinator?.sign?[props.value.coordinator?.sign]:[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) =>{
          const resp=FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name)
              .then((res)=>{
                console.log(res, 'resPOnse');
                props.onChange({
                  ...props.value,
                  coordinator: {
                    ...props.value.coordinator,
                    sign: res.data,
                  },
                });
                return res;
              });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            coordinator: {
              ...props.value.coordinator,
              sign: props.value.coordinator?.sign?({
                ...props.value.coordinator?.sign,
                filename: newName,
              }):undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            coordinator: {
              ...props.value.coordinator,
              sign: undefined,
            },
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title=" Senior Leader Signature"
        types={[
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 1,
          maxTotalSize: 1*MB,
        }}
        open={showFileUploader2}
        onClose={() => setShowFileUploader2(false)}
        action={props.action=='view'?'view':'add'}
        getFiles={props.value.seniorLeader?.sign?[props.value.seniorLeader?.sign]:[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) =>{
          const resp=FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name)
              .then((res)=>{
                console.log(res, 'resPOnse');
                props.onChange({
                  ...props.value,
                  seniorLeader: {
                    ...props.value.seniorLeader,
                    sign: res.data,
                  },
                });
                return res;
              });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            seniorLeader: {
              ...props.value.seniorLeader,
              sign: props.value.seniorLeader?.sign?({
                ...props.value.seniorLeader?.sign,
                filename: newName,
              }):undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            seniorLeader: {
              ...props.value.seniorLeader,
              sign: undefined,
            },
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title=" Junior Leader Signature"
        types={[
          'image/png',
          'image/jpeg',
          'image/jpg',

        ]}
        limits={{
          // types: [],
          maxItemSize: 1*MB,
          maxItemCount: 1,
          maxTotalSize: 1*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader3}
        onClose={() => setShowFileUploader3(false)}
        action={props.action=='view'?'view':'add'}
        getFiles={props.value.juniorLeader?.sign?[props.value.juniorLeader?.sign]:[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) =>{
          const resp=FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name)
              .then((res)=>{
                console.log(res, 'resPOnse');
                props.onChange({
                  ...props.value,
                  juniorLeader: {
                    ...props.value.juniorLeader,
                    sign: res.data,
                  },
                });
                return res;
              });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            juniorLeader: {
              ...props.value.juniorLeader,
              sign: props.value.juniorLeader?.sign?({
                ...props.value.juniorLeader?.sign,
                filename: newName,
              }):undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            juniorLeader: {
              ...props.value.juniorLeader,
              sign: undefined,
            },
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </>
  );
};

export default DivisionsFormComponent;
