/* eslint-disable react/jsx-no-undef */
import { Autocomplete, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material';
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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICustomUsers } from '../../Settings/extras/LanguageTypes';
import CustomUserService from '../../Settings/extras/CustomUserService';

const DivisionsFormComponent = (props: FormComponentProps<DivisionDetails, { title: string }>) => {
  const [showFileUploader1, setShowFileUploader1] = useState(false);
  const [showFileUploaderPrev1, setShowFileUploaderPrev1] = useState(false);
  const [showFileUploader2, setShowFileUploader2] = useState(false);
  const [showFileUploaderPrev2, setShowFileUploader2Prev] = useState(false);
  const [showFileUploader3, setShowFileUploader3] = useState(false);
  const [showFileUploaderPrev3, setShowFileUploaderPrev3] = useState(false);
  const [showFileUploader4, setShowFileUploader4] = useState(false);
  const [showFileUploader5, setShowFileUploader5] = useState(false);

  const [showFileUploaderJr, setShowFileUploaderJr] = useState(false);
  const [showFileUploaderSr, setShowFileUploaderSr] = useState(false);
  const [Label, setLeaderHeading] = useState<ILeaderDetails[] | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [newJr, setNewJr] = useState<boolean>(false);
  const [newSr, setNewSr] = useState<boolean>(false);
  const [customUsers, setCustomUsers] = useState<ICustomUsers[]>([]);

  const [users, setUsers] = useState<User[] | null>(null);
  const { editID } = useParams();
  console.log(editID, 'jr');

  useEffect(() => {
    e();
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
    CustomUserService.getAll()
      .then((res) => {
        console.log(res.data, 'customUsers');

        setCustomUsers((res.data as ICustomUsers[]).filter((user:any) => user.division._id === editID));
      })
      .catch((res) => {
        console.log(res);
        enqueueSnackbar({
          variant: 'error',
          message: res.message,
        });
      });
  }, []);
  console.log(props, 'pp');
  useEffect(() => {
    if (props.value.additionalJuniorLeader?.name !== undefined) {
      setNewJr(true);
    }
    if (props.value.additionalSeniorLeader?.name !== undefined) {
      setNewSr(true);
    }
  }, [props.value]);

  const e = () => {
    console.log(props.value.additionalJuniorLeader?.name, 'dd');
  };
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
      <Grid item xs={12} md={4}>
        <FormControlLabel
          label="IET's Division"
          // disabled={props.action !== 'customEdit'}
          checked={props.value.isIT || false}
          onChange={(e: any) =>
            props.onChange({
              ...props.value,
              isIT: e.target.checked,
            })
          }
          control={<Checkbox />}
        />
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
                    onChange={(e, newValue) => {
                      // if (newValue) {
                      props.onChange({
                        ...props.value,
                        coordinator: {
                          ...props.value.coordinator,
                          name: newValue ?? undefined,
                        },
                      });
                      // }
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
          {Label?.[2]?.name && props.value.name == 'DELHI OFFICE' && (

            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    disabled={props.action == 'view'}
                    value={props.value.seniorLeader?.name ?? null}
                    onChange={(e, newValue) => {
                      // if (newValue) {
                      props.onChange({
                        ...props.value,
                        seniorLeader: {
                          ...props.value.seniorLeader,
                          name: newValue ?? undefined,
                        },
                      });
                      // }
                    }}
                    // label={'Junior Leader 2'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[2]?.name || '' : '')}
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

          {Label?.[3]?.name && props.value.name == 'DELHI OFFICE' && (

            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    disabled={props.action == 'view'}
                    value={props.value.president?.name ?? null}
                    onChange={(e, newValue) => {
                      // if (newValue) {
                      props.onChange({
                        ...props.value,
                        president: {
                          ...props.value.president,
                          name: newValue ?? undefined,
                        },
                      });
                      // }
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
                      // if (newValue) {
                      props.onChange({
                        ...props.value,
                        officeManager: {
                          ...props.value.officeManager,
                          name: newValue ?? undefined,
                        },
                      });
                      // }
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
          {Label?.[1]?.name && props.value.name == 'DELHI OFFICE' && (
            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <UsersDropdown
                    users={users ?? []}
                    value={props.value.juniorLeader?.name ?? null}
                    onChange={(_e, newValue) => {
                      // if (newValue) {
                      props.onChange({
                        ...props.value,
                        juniorLeader: {
                          ...props.value.juniorLeader,
                          name: newValue ?? undefined,
                        },
                      });
                      // }
                    }}
                    disabled={props.action == 'view'}
                    // label={'Junior Leader 1'}
                    label={(props?.value?.name === 'DELHI OFFICE' ? Label?.[1]?.name || '' : '')}

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
          {props.value.name != 'DELHI OFFICE' && (
            <>
              <Grid item xs={12} md={4}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <UsersDropdown
                      users={users ?? []}
                      value={props.value.coordinator?.name ?? null}
                      onChange={(_e, newValue) => {
                        // if (newValue) {
                        props.onChange({
                          ...props.value,
                          coordinator: {
                            ...props.value.coordinator,
                            name: newValue ?? undefined,
                          },
                        });
                        // }
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
                {newJr == false && (

                  <><Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <UsersDropdown

                        users={users ?? []}
                        value={props.value.seniorLeader?.name ?? null}
                        onChange={(e, newValue) => {
                          // if (newValue) {
                          props.onChange({
                            ...props.value,
                            additionalJuniorLeader: { name: undefined, sign: undefined },
                            seniorLeader: {
                              ...props.value.seniorLeader,
                              name: newValue ?? undefined,
                            },
                          });
                          // }
                        }}

                        disabled={props.action == 'view'}
                        // label={'Junior Leader 1'}
                        label={'Junior Leader 1'}
                        required={false} />
                    </FormControl>
                  </Grid><Grid item xs={12}>
                    <Button variant="contained" onClick={() => setShowFileUploader2(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                        E-signature
                    </Button>
                  </Grid><IconButton onClick={() => setNewJr(true)} aria-label="add" size="small">
                    <AddIcon fontSize="inherit" /> <small style={{ fontSize: 11 }}>Add Custom</small>
                  </IconButton></>
                )}

                {newJr && (


                  <>
                    <FormControl variant="outlined" fullWidth>
                      <UsersDropdown
                        users={customUsers as any ?? []}
                        value={props.value.additionalJuniorLeader?.name ?? null}
                        onChange={(e, newValue) => {
                          // if (newValue) {
                          props.onChange({
                            ...props.value,
                            seniorLeader: { name: undefined, sign: undefined },
                            additionalJuniorLeader: {
                              ...props.value.additionalJuniorLeader,
                              name: newValue ?? undefined,
                            },
                          });
                          // }
                        }}
                        disabled={props.action === 'view'}
                        label={('Custom Junior Leader 1')}
                        required={false}
                      />
                    </FormControl>


                    <IconButton onClick={() => setNewJr(false)} aria-label="delete" size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </>

                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {newSr == false && (

                  <><Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <UsersDropdown
                        users={users ?? []}
                        disabled={props.action == 'view'}
                        value={props.value.juniorLeader?.name ?? null}
                        onChange={(e, newValue) => {
                          // if (newValue) {
                          props.onChange({
                            ...props.value,
                            additionalSeniorLeader: { name: undefined, sign: undefined },
                            juniorLeader: {
                              ...props.value.juniorLeader,
                              name: newValue ?? undefined,
                            },
                          });
                          // }
                        }}
                        // label={'Junior Leader 2'}
                        label={'Junior Leader 2'}
                        required={false} />
                    </FormControl>
                  </Grid><Grid item xs={12}>
                    <Button variant="contained" onClick={() => setShowFileUploader3(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                        E-signature
                    </Button>
                  </Grid><IconButton onClick={() => setNewSr(true)} aria-label="add" size="small">
                    <AddIcon fontSize="inherit" />  <small style={{ fontSize: 11 }}>Add Custom</small>
                  </IconButton>
                  </>
                )}
                {newSr && (
                  <>
                    <FormControl variant="outlined" fullWidth>
                      <UsersDropdown
                        users={(customUsers as any) ?? []}
                        value={props.value.additionalSeniorLeader?.name ?? null}
                        onChange={(e, newValue) => {
                          // if (newValue) {
                          props.onChange({
                            ...props.value,
                            juniorLeader: { name: undefined, sign: undefined },
                            additionalSeniorLeader: {
                              ...props.value.additionalSeniorLeader,
                              name: newValue ?? undefined,
                            },
                          });
                          // }
                        }}
                        disabled={props.action === 'view'}
                        label={('Custom Junior Leader 2')}
                        required={false}
                      />
                    </FormControl>


                    <IconButton onClick={() => setNewSr(false)} aria-label="delete" size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>

                    <br />

                    {/* <Button
                      variant="contained"
                      onClick={() => setShowFileUploaderSr(true)}
                      startIcon={<AttachmentIcon />}
                      sx={{ mt: 1, float: 'right' }}
                    >
    E-signature
                    </Button> */}
                  </>

                )}

              </Grid>
            </>

          )}
          {props.action == 'view' || props.action == 'edit' ? (

            <>
              <Grid item xs={12} md={4}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label={props.value.name != 'DELHI OFFICE' ? 'Prev Co-ordinator Name' : `Prev ${Label?.[0]?.name}`}
                      value={props.value?.prevCoordinator?.name ?? ''}
                      onChange={(e) => {
                        props.onChange({
                          ...props.value,
                          prevCoordinator: {
                            ...(props.value?.prevCoordinator || {}), // Ensure it's an object
                            name: e.target.value,
                          },
                        });
                      }}
                      disabled={props.action === 'view'}
                    />

                  </FormControl>

                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={() => setShowFileUploaderPrev1(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                    E-signature
                  </Button>
                </Grid>
              </Grid><Grid item xs={12} md={4}>

                <><Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label={props.value.name != 'DELHI OFFICE' ? 'Prev Junior Leader 1' : `Prev ${Label?.[1]?.name}`}
                      value={props.value?.prevJuniorLeader1?.name ?? ''}
                      onChange={(e) => {
                        props.onChange({
                          ...props.value,
                          prevJuniorLeader1: {
                            ...(props.value?.prevJuniorLeader1 || {}), // Ensure seniorLeader is an object
                            name: e.target.value,
                          },
                        });
                      }}
                      disabled={props.action === 'view'}
                    />
                  </FormControl>

                </Grid><Grid item xs={12}>
                  <Button variant="contained" onClick={() => setShowFileUploader2Prev(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                      E-signature
                  </Button>
                </Grid>
                {/* <IconButton onClick={() => setNewJr(true)} aria-label="add" size="small">
                    <AddIcon fontSize="inherit" /> <small style={{ fontSize: 11 }}>Add Custom</small>
                  </IconButton> */}
                </>


              </Grid>
              <Grid item xs={12} md={4}>
                {/* {newSr ==false &&( */}

                <><Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label={props.value.name != 'DELHI OFFICE' ? 'Prev Junior Leader 2' : `Prev ${Label?.[2]?.name}`}
                      value={props.value.prevJuniorLeader2?.name ?? ''}
                      onChange={(e) => {
                        props.onChange({
                          ...props.value,
                          prevJuniorLeader2: {
                            ...props.value.prevJuniorLeader2,
                            name: e.target.value,
                          },
                        });
                      }}
                      disabled={props.action === 'view'}
                    />
                  </FormControl>

                </Grid><Grid item xs={12}>
                  <Button variant="contained" onClick={() => setShowFileUploaderPrev3(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                      E-signature
                  </Button>
                </Grid>
                </>
                {/* )} */}


              </Grid>
            </>
          ) : []}


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
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <FileUploader
        title=" Prev Coordinator Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderPrev1}
        onClose={() => setShowFileUploaderPrev1(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.prevCoordinator?.sign ? [props.value.prevCoordinator?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              prevCoordinator: {
                ...props.value.prevCoordinator,
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
            prevCoordinator: {
              ...props.value.prevCoordinator,
              sign: props.value.prevCoordinator?.sign ?
                {
                  ...props.value.prevCoordinator?.sign,
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
              prevCoordinator: {
                ...props.value.prevCoordinator,
                sign: undefined,
              },
            });
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <FileUploader
        title="Leader Signature 1"
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
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <FileUploader
        title="Prev Jr Leader 1 Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        open={showFileUploaderPrev2}
        onClose={() => setShowFileUploader2Prev(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.prevJuniorLeader1?.sign ? [props.value.prevJuniorLeader1?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              prevJuniorLeader1: {
                ...props.value.prevJuniorLeader1,
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
            prevJuniorLeader1: {
              ...props.value.prevJuniorLeader1,
              sign: props.value.prevJuniorLeader1?.sign ?
                {
                  ...props.value.prevJuniorLeader1?.sign,
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
              prevJuniorLeader1: {
                ...props.value.prevJuniorLeader1,
                sign: undefined,
              },
            });
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <FileUploader
        title="Leader Signature 2"
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
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <FileUploader
        title="Prev Jr Leader 2 Signature"
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderPrev3}
        onClose={() => setShowFileUploaderPrev3(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.prevJuniorLeader2?.sign ? [props.value.prevJuniorLeader2?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              prevJuniorLeader2: {
                ...props.value.prevJuniorLeader2,
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
            prevJuniorLeader2: {
              ...props.value.prevJuniorLeader2,
              sign: props.value.prevJuniorLeader2?.sign ?
                {
                  ...props.value.prevJuniorLeader2?.sign,
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
              prevJuniorLeader2: {
                ...props.value.prevJuniorLeader2,
                sign: undefined,
              },
            });
            return FileUploaderServices.getFile(fileId) as any;
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
            return FileUploaderServices.getFile(fileId) as any;
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
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />

      <FileUploader
        title=" Custom sign 1 "
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderJr}
        onClose={() => setShowFileUploaderJr(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.additionalJuniorLeader?.sign ? [props.value.additionalJuniorLeader?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              additionalJuniorLeader: {
                ...props.value.additionalJuniorLeader,
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
            additionalJuniorLeader: {
              ...props.value.additionalJuniorLeader,
              sign: props.value.additionalJuniorLeader?.sign ?
                {
                  ...props.value.additionalJuniorLeader?.sign,
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
              additionalJuniorLeader: {
                ...props.value.additionalJuniorLeader,
                sign: undefined,
              },
            });
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />


      <FileUploader
        title="Custom sign 2 "
        types={['image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          // types: [],
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 1 * MB,
        }}
        // accept={['video/*']}
        open={showFileUploaderSr}
        onClose={() => setShowFileUploaderSr(false)}
        action={props.action == 'view' ? 'view' : 'add'}
        getFiles={props.value.additionalSeniorLeader?.sign ? [props.value.additionalSeniorLeader?.sign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              additionalSeniorLeader: {
                ...props.value.additionalSeniorLeader,
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
            additionalSeniorLeader: {
              ...props.value.additionalSeniorLeader,
              sign: props.value.additionalSeniorLeader?.sign ?
                {
                  ...props.value.additionalSeniorLeader?.sign,
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
              additionalSeniorLeader: {
                ...props.value.additionalSeniorLeader,
                sign: undefined,
              },
            });
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
    </>
  );
};

export default DivisionsFormComponent;
