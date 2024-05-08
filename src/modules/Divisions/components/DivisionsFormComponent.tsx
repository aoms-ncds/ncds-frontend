/* eslint-disable react/jsx-no-undef */
import { Autocomplete, Button, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import AddressForm from '../../../components/AddressForm';
import FileUploader from '../../../components/FileUploader/FileUploader';
import { useEffect, useState } from 'react';
import { MB } from '../../../extras/CommonConfig';
import FileUploaderServices from '../../../components/FileUploader/extras/FileUploaderServices';
import UsersDropdown from '../../User/components/UsersDropdown';
import UserServices from '../../User/extras/UserServices';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import LeaderDetailsService from '../../Settings/extras/LeaderDetailsService';

const DivisionsFormComponent = (props: FormComponentProps<DivisionDetails, { title: string }>) => {
  const [showFileUploader1, setShowFileUploader1] = useState(false);
  const [showFileUploader2, setShowFileUploader2] = useState(false);
  const [showFileUploader3, setShowFileUploader3] = useState(false);
  const [showFileUploader4, setShowFileUploader4] = useState(false);
  const [showFileUploader5, setShowFileUploader5] = useState(false);
  const [Label, setLeaderHeading] = useState<ILeaderDetails[] | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  const [users, setUsers] = useState<User[] | null>(null);
  const { editID } = useParams();
  useEffect(() => {
    if (editID) {
      UserServices.getDivisionUser(editID)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          });
        });
    }
    LeaderDetailsService.getAll()
      .then((res) => {
        setLeaderHeading(res.data);
      })
      .catch((res) => {
        console.log(res);
        enqueueSnackbar({
          variant: 'error',
          message: res.message,
        });
      });
  }, []);

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
          <TextField label="Division Name" value={props.value.name} onChange={(e) => props.onChange({ ...props.value, name: e.target.value })} fullWidth required disabled={props.action == 'view'} />
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Division Id" value={props.value.divisionId}fullWidth />
        </FormControl>
      </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField
            label=" Contact Number"
            value={props.value.contactNumber}
            onChange={(e) => props.onChange({ ...props.value, contactNumber: e.target.value })}
            fullWidth
            disabled={props.action == 'view'}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant="outlined" fullWidth>
          <TextField label=" Email ID" value={props.value.email} onChange={(e) => props.onChange({ ...props.value, email: e.target.value })} fullWidth disabled={props.action == 'view'} />
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
            inputProps={{
              onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                event.preventDefault();
                event.currentTarget.blur();
              },
            }}
            disabled={props.action == 'view'}
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
            disabled={true}
            inputProps={{
              onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
                event.preventDefault();
                event.currentTarget.blur();
              },
            }}
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
            disabled={props.action == 'view'}
          />
        </FormControl>
      </Grid>
      <AddressForm value={props.value.address} onChange={(newState: Address) => props.onChange({ ...props.value, address: newState })} action={props.action} />
      {((users && users.length > 0) || props.value.coordinator || props.value.seniorLeader || props.value.juniorLeader) && (
        <>
          <Grid item xs={12}>
            <br />
            <Divider textAlign="left">Leaders Details</Divider>
          </Grid>

          {Label?.[0]?.name && props.value.name == 'DELHI OFFICE' && (
            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
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
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[0]?.name : '')}
                    required={false}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => setShowFileUploader1(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                  E-signature
                </Button>
              </Grid>
            </Grid>
          )}
          {props.value.name != 'DELHI OFFICE' && (
            <>
              <Grid item xs={12} md={4}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <UsersDropdown
                      users={users ?? []}
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
                      required={false} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={() => setShowFileUploader1(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                    E-signature
                  </Button>
                </Grid>
              </Grid><Grid item xs={12} md={4}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <UsersDropdown
                     
                      users={users ?? []}
                      value={props.value.seniorLeader?.name ?? null}
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
                      
                      disabled={props.action == 'view'}
                      // label={'Junior Leader 1'}
                      label={'Junior Leader 1'}
                      required={false} />
                  </FormControl>
                </Grid>
                
                {/* <Autocomplete
                    options={users ?? []}

                    value={props.value.seniorLeader?.name ?? null}
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
                    getOptionLabel={(user) => user.basicDetails.firstName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="J"
                        variant="standard"
                        required
                        sx={{
                          background: '#f4f5f4',
                          borderRadius: 50,
                          padding: 2,
                        }}
                      />
                    )}
                  /> */}
                <Grid item xs={12}>
                  <Button variant="contained" onClick={() => setShowFileUploader2(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                    E-signature
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <UsersDropdown
                      users={users ?? []}
                      disabled={props.action == 'view'}
                      value={props.value.juniorLeader?.name ?? null}
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
                      // label={'Junior Leader 2'}
                      label={'Junior Leader 2'}
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
            </>

          )}
          {Label?.[1]?.name && props.value.name == 'DELHI OFFICE' && (
            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    value={props.value.seniorLeader?.name ?? null}
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
                    disabled={props.action == 'view'}
                    // label={'Junior Leader 1'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[1]?.name || '' : '')}

                    required={false}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => setShowFileUploader2(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                  E-signature
                </Button>
              </Grid>
            </Grid>
          )}

          {Label?.[2]?.name && props.value.name == 'DELHI OFFICE' && (

            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    disabled={props.action == 'view'}
                    value={props.value.juniorLeader?.name ?? null}
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
                    // label={'Junior Leader 2'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[2]?.name || '' : '')}
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
          )}

          {Label?.[3]?.name && props.value.name == 'DELHI OFFICE' && (

            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    disabled={props.action == 'view'}
                    value={props.value.president?.name ?? null}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        props.onChange({
                          ...props.value,
                          president: {
                            ...props.value.president,
                            name: newValue,
                          },
                        });
                      }
                    }}
                    // label={'Junior Leader 2'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[3]?.name || '' : '')}
                    required={false} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => setShowFileUploader4(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                  E-signature
                </Button>
              </Grid>
            </Grid>
          )}
          {Label?.[4]?.name && props.value.name == 'DELHI OFFICE' && (
            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    disabled={props.action == 'view'}
                    value={props.value.officeManager?.name ?? null}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        props.onChange({
                          ...props.value,
                          officeManager: {
                            ...props.value.officeManager,
                            name: newValue,
                          },
                        });
                      }
                    }}
                    // label={'Junior Leader 2'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[4]?.name || '' : '')}
                    required={false} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => setShowFileUploader5(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                  E-signature
                </Button>
              </Grid>
            </Grid>
          )}
          {/* {props?.value?.name === 'DELHI OFFICE' && (

        
          )} */}
        </>
      )}
      {/* </Grid>
        </Grid>
      </Grid> */}

      <FileUploader
        title=" Coordinator Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader1}
        onClose={() => setShowFileUploader1(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.coordinator?.sign ? [props.value.coordinator?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
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
              sign: props.value.coordinator?.sign ?
                {
                  ...props.value.coordinator?.sign,
                  filename: newName,
                } :
                undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              coordinator: {
                ...props.value.coordinator,
                sign: undefined,
              },
            });
            return FileUploaderServices.deleteFile(fileId);
          },
        })}
      />
      <FileUploader
        title=" Senior Leader Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        open={showFileUploader2}
        onClose={() => setShowFileUploader2(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.seniorLeader?.sign ? [props.value.seniorLeader?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
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
              sign: props.value.seniorLeader?.sign ?
                {
                  ...props.value.seniorLeader?.sign,
                  filename: newName,
                } :
                undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              seniorLeader: {
                ...props.value.seniorLeader,
                sign: undefined,
              },
            });
            return FileUploaderServices.deleteFile(fileId);
          },
        })}
      />
      <FileUploader
        title=" Junior Leader Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader3}
        onClose={() => setShowFileUploader3(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.juniorLeader?.sign ? [props.value.juniorLeader?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
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
              sign: props.value.juniorLeader?.sign ?
                {
                  ...props.value.juniorLeader?.sign,
                  filename: newName,
                } :
                undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              juniorLeader: {
                ...props.value.juniorLeader,
                sign: undefined,
              },
            });
            return FileUploaderServices.deleteFile(fileId);
          },
        })}
      />
      <FileUploader
        title=" President "
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader4}
        onClose={() => setShowFileUploader4(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.president?.sign ? [props.value.president?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              president: {
                ...props.value.president,
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
            president: {
              ...props.value.president,
              sign: props.value.president?.sign ?
                {
                  ...props.value.president?.sign,
                  filename: newName,
                } :
                undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              president: {
                ...props.value.president,
                sign: undefined,
              },
            });
            return FileUploaderServices.deleteFile(fileId);
          },
        })}
      />
      <FileUploader
        title=" Office Manger "
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploader5}
        onClose={() => setShowFileUploader5(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.officeManager?.sign ? [props.value.officeManager?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              officeManager: {
                ...props.value.officeManager,
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
            officeManager: {
              ...props.value.officeManager,
              sign: props.value.officeManager?.sign ?
                {
                  ...props.value.officeManager?.sign,
                  filename: newName,
                } :
                undefined,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              officeManager: {
                ...props.value.officeManager,
                sign: undefined,
              },
            });
            return FileUploaderServices.deleteFile(fileId);
          },
        })}
      />
    </>
  );
};

export default DivisionsFormComponent;
