/* eslint-disable react/jsx-no-undef */
import { Button, Divider, FormControl, Grid, IconButton, TextField, Typography } from '@mui/material';
import { AttachFile as AttachmentIcon, Delete as DeleteIcon, FileCopy as FileIcon } from '@mui/icons-material';
import StaffDropdown from '../../HR/components/StaffDropdown';
import AddressForm from '../../../components/AddressForm';
import FileUploader from '../../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import { useState } from 'react';
import { MB } from '../../../extras/CommonConfig';

const DivisionsFormComponent = (props: FormComponentProps<DivisionDetails, { title: string }>) => {
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [viewFileUploader, setViewFileUploader] = useState(false);
  const [attachments, setAttachments] = useState<FileObject[]>([]);
  const [eSign, seteSign] = useState<DivisionDetails>({
    email: '',
    contactNumber: '',
    divisionId: '',
    name: '',
    attachment: [],
    address: {
      buildingName: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },
  });
  console.log(eSign);
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
          <TextField label="Division Name" value={props.value.name} onChange={(e) => props.onChange({ ...props.value, name: e.target.value })} fullWidth required />
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Division Id" value={props.value.divisionId}fullWidth />
        </FormControl>
      </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Contact Number" value={props.value.contactNumber} onChange={(e) => props.onChange({ ...props.value, contactNumber: e.target.value })} fullWidth />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Email ID" value={props.value.email} onChange={(e) => props.onChange({ ...props.value, email: e.target.value })} fullWidth />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" No. of Workers"
            type="number"
            value={props.value.noofWorkers}
            onChange={(e) => props.onChange({ ...props.value, noofWorkers: Number(e.target.value) })}
            fullWidth
            InputLabelProps={{ shrink: true }}
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
          />
        </FormControl>
      </Grid>
      <AddressForm value={props.value.address} onChange={(newState: Address) => props.onChange({ ...props.value, address: newState })} action={'add'} />

      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Leaders Details</Divider>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.coordinator}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, coordinator: newValue });
              }
            }}
            label={' Co-ordinator Name'}
            required={false}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.seniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, seniorLeader: newValue });
              }
            }}
            label={'Senior Leader Name'}
            required={false}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <StaffDropdown
            value={props.value.juniorLeader}
            onChange={(e, newValue) => {
              if (newValue) {
                props.onChange({ ...props.value, juniorLeader: newValue });
              }
            }}
            label={'Junior Leader Name'}
            required={false}
          />
        </FormControl>
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" onClick={() => setShowFileUploader(true)} startIcon={<AttachmentIcon />}>
          Attachments
        </Button>


        {/* <IconButton
          onClick={() => {
            setViewFileUploader(true);
            setAttachments(eSign.attachment);
          }}
        >
          <AttachmentIcon />
        </IconButton> */}


        <FileUploader
          title="Attachments"
          action="add"
          types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
          limits={{
            maxItemSize: 1 * MB,
            maxItemCount: 3,
            maxTotalSize: 3 * MB,
          }}
          open={showFileUploader}
          onClose={() => setShowFileUploader(false)}
          uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
            return FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
              console.log(res.data._id);
              seteSign((eSign) => ({
                ...eSign,
                attachment: [...eSign.attachment, res.data],
              }));
              return res;
            });
          }}
          renameFile={(fileId: string, newName: string) => {
            seteSign((eSign) => ({
              ...eSign,
              attachment: eSign.attachment.map((file) =>
                file._id === fileId ? { ...file, filename: newName } : file,
              ),
            }));
            return FileUploaderServices.renameFile(fileId, newName);
          }}
          deleteFile={(fileId: string) => {
            seteSign(() => ({
              ...eSign,
              attachment: eSign.attachment.filter((file)=>file._id!==fileId),
            }));
            return FileUploaderServices.deleteFile(fileId);
          }}
          getFiles={[]}
        />

        <FileUploader
          title="Attachments"
          types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
          limits={{
            maxItemSize: 1 * MB,
            maxItemCount: 3,
            maxTotalSize: 3 * MB,
          }}
          open={viewFileUploader}
          action="view"
          onClose={() => setViewFileUploader(false)}
          getFiles={attachments}
          uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
            const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division', file.name).then((res) => {
              console.log(res.data._id);
              seteSign(() => ({
                ...eSign,
                attachment: [...eSign.attachment, res.data],
              }));
              return res;
            });
            return resp;
          }}
          renameFile={(fileId: string, newName: string) => {
            seteSign(() => ({
              ...eSign,
              attachment: eSign.attachment.map((file) =>
                file._id === fileId ? { ...file, filename: newName } : file,
              ),
            }));
            return FileUploaderServices.renameFile(fileId, newName);
          }}
          deleteFile={(fileId: string) => {
            seteSign(() => ({
              ...eSign,
              attachment: eSign.attachment.filter((file)=>file._id!==fileId),
            }));
            return FileUploaderServices.deleteFile(fileId);
          }}
        />
      </Grid>
    </>
  );
};

export default DivisionsFormComponent;
