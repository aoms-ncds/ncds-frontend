import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DivisionsServices from '../../../Divisions/extras/DivisionsServices';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '../../../../hooks/Authentication';
import ReasonforDeactivationService from '../../../Settings/extras/ReasonforDeactivationService';
import { AttachFile as AttachmentIcon } from '@mui/icons-material';
import FileUploaderServices from '../../../../components/FileUploader/extras/FileUploaderServices';
import FileUploader from '../../../../components/FileUploader/FileUploader';
import { MB } from '../../../../extras/CommonConfig';
import { log } from 'node:console';

// const defaultDivisionDetails:Division = {
//   details: {
//     name: '',
//     divisionId: '',
//     contactNumber: '',
//     email: '',
//     address: { },
//   },
//   subDivisions: [],
//   FCRABankDetails: {
//     bankName: '',
//     branchName: '',
//     accountNumber: '',
//     IFSCCode: '',
//     beneficiary: '',
//   },
//   localBankDetails: {
//     bankName: '',
//     branchName: '',
//     accountNumber: '',
//     IFSCCode: '',
//     beneficiary: '',
//   },
//   otherBankDetails: {
//     bankName: '',
//     branchName: '',
//     accountNumber: '',
//     IFSCCode: '',
//     beneficiary: '',
//   },
//   createdAt: moment(),
//   updatedAt: moment(),
// };

const NewOfficialDetailsForm = (
  props: FormComponentProps<
    CreatableOfficialDetails,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
      kind?: UserKind | undefined;
      // userKind:UserKind;
    }
  >
  ,
) => {
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [isDivisionChanged, setIsDivisionChanged] = useState<boolean>(false);
  const [newDiv, setNewDiv] = useState<Division | null>(null);
  const [subDivisions, setSubDivisions] = useState<SubDivision[] | null>(null);
  const [openDivConfirm, toggleOpenDivConfirm] = useState<boolean>(false);
  const user = useAuth();
  const [reason, setReason] = useState<IReason[]>([]);
  const [showFileUploader2, setShowFileUploader2] = useState(false);

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
  };
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   // Prevent changing the value when the up or down arrow key is pressed
  //   if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   }
  // };
  useEffect(() => {
    if (newDiv) {
      if (props.value.divisionHistory[props.value.divisionHistory?.length - 1]?.division) {
        DivisionsServices.getSubDivisionsByDivisionId(newDiv?._id as string)
          // .then((res) => console.log(res.data, 'data'))
          .then((res) => setSubDivisions(res.data))
          .catch((error) =>
            enqueueSnackbar({
              variant: 'error',
              message: error.message,
            }),
          );
      }
    }
    // console.log(props.value.divisionHistory);
  }, [newDiv]);
  useEffect(() => {
    ReasonforDeactivationService.getAll().then((res) => {
      setReason(res.data);
    });
  }, []);

  useEffect(() => {
    // if (props.action!='add') {
    //   setCurrentDivision(props.value.divisionHistory[props.value.divisionHistory.length-1].division);
    // }

    // if (user.user && (user.user as User).kind=='staff') {
    DivisionsServices.getDivisions()
      .then((res) => setDivisions(res.data))
      .catch((error) =>
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        }),
      );
    // }


    if (props.value.divisionHistory[props.value.divisionHistory?.length - 1]?.division?._id) {
      DivisionsServices.getSubDivisionsByDivisionId(props.value.divisionHistory[props.value.divisionHistory?.length - 1]?.division?._id as string)
        .then((res) => setSubDivisions(res.data))
        // .then((res) => console.log(res.data, 'sec'))
        .catch((error) =>
          enqueueSnackbar({
            variant: 'error',
            message: error.message,
          }),
        );
    }
  }, []);
  console.log(props.value, 'off');
  
  return (
    <>
      {/* {console.log({ abc: props.value.dateOfJoining })} */}
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Joining Organization"
          value={props.value.dateOfJoining}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              dateOfJoining: newDate ?? undefined,
            });
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
              required: true,
            },
          }}
          autoFocus
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="No of years with the Organization"
          value={props.value.status == 'Left' && props.value.dateOfLeaving ? props.value.dateOfLeaving?.from(props.value.dateOfJoining, true) : (props.value.dateOfJoining?.fromNow(true))}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {/* {console.log(props.value.divisionHistory)}
      {console.log(props.value.divisionHistory[0].division?.details.name)} */}
      {/* {props.value.divisionHistory.length>0? props.value.divisionHistory[props.value.divisionHistory.length-1].subDivision:null} */}
      {/* {props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?.details.name} */}
      {/* {props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division?.details.name} */}
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          // disabled={props.kind=='worker'}
          options={divisions ?? []}
          // value={(props.value.divisionHistory?.length>0)?props.value.divisionHistory[props.value.divisionHistory?.length-1]?.division: null}
          value={(props.value.divisionHistory.length > 0) ? props.value.divisionHistory[props.value.divisionHistory?.length - 1].division : null}
          getOptionLabel={(div) => div.details.name}
          onChange={(event, newVal) => {
            setNewDiv(newVal);
            if (props.action === 'edit') {
              if (newVal?._id != props?.value?.divisionHistory[props?.value?.divisionHistory?.length - 1].division?._id) {
                toggleOpenDivConfirm(true);
              }
            } else if (props.action === 'add') {
              props.onChange({
                ...props.value, divisionHistory: [
                  {
                    division: newVal ?? undefined,
                    subDivision: undefined,
                    dateOfDivisionJoining: null,
                    dateOfDivisionLeaving: null,
                  }],
              });
            }

            // newVal?._id!==currentDiv._id? (
            //   props.onChange({ ...props.value, divisionHistory: [
            //     ...props.value.divisionHistory, {
            //       division: newVal ?? undefined,
            //       subDivision: undefined,
            //       dateOfDivisionJoining: null,
            //       dateOfDivisionLeaving: null,
            //     }]})
            // ) :
            //   props.onChange({ ...props.value, divisionHistory: [
            //     ...props.value.divisionHistory.slice(0, -1), {
            //       division: newVal ?? undefined,
            //       subDivision: undefined,
            //       dateOfDivisionJoining: null,
            //       dateOfDivisionLeaving: null,
            //     }]});
            if (!newVal) {
              setSubDivisions([]);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Division" helperText={!divisions ? 'Loading divisions...' : 'Select a Division'} variant={props.options?.textField?.variant}
              required />
          )}
          disabled={Boolean(user.user && (user.user as User).kind == 'worker')}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={subDivisions ?? []}
          value={(props.value.divisionHistory.length > 0) ? props.value.divisionHistory[props.value.divisionHistory.length - 1].subDivision : null}
          getOptionLabel={(subDiv) => subDiv.name}
          onChange={(event, newVal) =>
            props.onChange({
              ...props.value,
              divisionHistory: [
                ...props.value.divisionHistory.slice(0, -1),
                {
                  ...props.value.divisionHistory[props.value.divisionHistory.length - 1],
                  subDivision: newVal ?? undefined,

                },
              ],
            })
          }
          renderInput={(params) => <TextField
            {...params}
            label="Sub Division"
            helperText={!divisions ? 'Loading sub divisions...' : 'Select a sub division'}
            variant={props.options?.textField.variant}
          />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Joining in Current Division"
          value={(props.value.divisionHistory?.length > 0) ? props.value.divisionHistory[props.value.divisionHistory.length - 1]?.dateOfDivisionJoining : null}
          onChange={(newDate) => {
            props.onChange({
              ...props.value,
              divisionHistory: [
                ...props.value.divisionHistory.slice(0, -1),
                {
                  ...props.value.divisionHistory[props.value.divisionHistory.length - 1],
                  dateOfDivisionJoining: newDate ?? undefined,
                },
              ],
            });
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
              required: true,
            },
          }}
        // autoFocus
        // required={isDivisionChanged}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Leaving Previous Division"
          value={(props.value.divisionHistory.length > 1) ? props.value.divisionHistory[props.value.divisionHistory.length - 2].dateOfDivisionLeaving : null}
          disabled={(props.value.divisionHistory.length == 1)}
          onChange={(newDate) => {
            if (props.value.divisionHistory.length > 1) {
              props.onChange({
                ...props.value,
                divisionHistory: props.value.divisionHistory.map((division, index) =>
                  index === props.value.divisionHistory.length - 2 ?
                    {
                      ...division,
                      dateOfDivisionLeaving: newDate ?? undefined,
                    } :
                    division,
                ),
              });
            }
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              // error: dateError,
              // helperText: dateError && 'Please select a date',
              fullWidth: true,
              required: isDivisionChanged,

            },
          }}
        // autoFocus
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<OfficialDetailsStatus>
          options={['Active', 'Left', 'Education Leave', 'Sabbatical Leave']}
          value={props.value.status}
          onChange={(e, selectedStatus) =>
            props.onChange({
              ...props.value,
              status: selectedStatus ?? undefined,
            })
          }
          renderInput={(params) => <TextField {...params} label="Status" required variant={props.options?.textField.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date of Leaving Organization"
          value={props.value.status != 'Left' ? null : props.value.dateOfLeaving}
          disabled={props.value.status != 'Left'}
          onChange={(newDate) =>
            props.onChange({
              ...props.value,
              dateOfLeaving: newDate ?? undefined,
            })
          }
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField.variant,
              fullWidth: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          options={reason ?? null}
          disabled={props.value.status != 'Left'}
          value={props.value.reasonForDeactivation as unknown as IReason}
          getOptionLabel={(option) => option.reason ?? ''}
          onChange={(e, selectedReason) => props.onChange({ ...props.value, reasonForDeactivation: selectedReason as unknown as DeactivationReason })}
          renderInput={(params) => <TextField {...params} label="Reason for Deactivation" variant={props.options?.textField.variant} />}
        />

        {/* <Autocomplete
          options={reason ?? null}
          disabled={props.value.status != 'Left'}
          value={props.value.reasonForDeactivation as unknown as IReason}
           getOptionLabel={(option) => option.reason ?? ''}
           onChange={(e, selectedReason) => props.onChange({ ...props.value, reasonForDeactivation: selectedReason as unknown as DeactivationReason })}
          renderInput={(params) => <TextField {...params} label="Reason for Deactivation"  />} /> */}
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Remarks"
          value={props.value.remarks}
          onChange={(e) => props.onChange({ ...props.value, remarks: e.target.value })}
          variant={props.options?.textField.variant}
          fullWidth
          InputProps={{ multiline: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {props.options?.kind === 'worker' && <TextField
          label="Centers Started"
          type={'number'}
          value={props.value.noOfChurches == 0 ? '' : props.value.noOfChurches}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              noOfChurches: Number(e.target.value),
            })
          }
          InputLabelProps={{
            shrink: Boolean(props.value?.noOfChurches),
          }}
          inputProps={{ onWheel: handleWheel }}
          variant={props.options?.textField.variant}
          fullWidth

        />}
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => setShowFileUploader2(true)} startIcon={<AttachmentIcon />} sx={{ mt: 1, float: 'right' }}>
                        E-signature
        </Button>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        {props.options?.kind === 'worker' && <FormControlLabel
          label="Self Support"
          control={
            <Checkbox
              onChange={(e) =>
                props.onChange({
                  ...props.value,
                  selfSupport: e.target.checked,
                })
              }
            />
          }
        />}
      </Grid> */}
      <FileUploader
        title="E-signature"
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
        getFiles={props.value.eSign ? [props.value.eSign] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'Division/eSignature', file.name).then((res) => {
            props.onChange({
              ...props.value,
              eSign: res.data,

            });
            return res;
          });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            eSign: { ...props.value.eSign, originalName: newName } as FileObject,
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        {...((props.action === 'edit' || props.action === 'add') && {
          deleteFile: (fileId: string) => {
            props.onChange({
              ...props.value,
              eSign: null,
            });
            return FileUploaderServices.getFile(fileId) as any;
          },
        })}
      />
      <Dialog open={openDivConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>
            Do you want to Update the Division?
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            toggleOpenDivConfirm(false);
          }}>No, Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // if (!isDivisionChanged) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory, {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              // }
              if (!isDivisionChanged) {
                if (props.value.divisionHistory[props.value.divisionHistory.length - 1].division?._id !== newDiv?._id) {
                  props.onChange({
                    ...props.value, divisionHistory: [
                      ...props.value.divisionHistory, {
                        division: newDiv,
                        subDivision: null,
                        dateOfDivisionJoining: null,
                        dateOfDivisionLeaving: null,
                      }],
                  });
                  setIsDivisionChanged(true);
                }
              } else {
                if (props.value.divisionHistory[props.value.divisionHistory.length - 2].division?._id === newDiv?._id) {
                  props.onChange({
                    ...props.value, divisionHistory: [
                      ...props.value.divisionHistory.slice(0, -1)],
                  });
                  setIsDivisionChanged(false);
                } else {
                  props.onChange({
                    ...props.value, divisionHistory: [
                      ...props.value.divisionHistory.slice(0, -1), {
                        division: newDiv,
                        subDivision: null,
                        dateOfDivisionJoining: null,
                        dateOfDivisionLeaving: null,
                      }],
                  });
                  setIsDivisionChanged(true);
                }
              }
              // if (props.value.divisionHistory[props.value.divisionHistory.length-2].division?._id===newDiv?._id ) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory.slice(0, -1)]});
              //   setIsDivisionChanged(false);
              // } else if (props.value.divisionHistory[props.value.divisionHistory.length-1].division?._id!==newDiv?._id && !isDivisionChanged) {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory, {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              //   setIsDivisionChanged(true);
              // } else {
              //   props.onChange({ ...props.value, divisionHistory: [
              //     ...props.value.divisionHistory.slice(0, -1), {
              //       division: newDiv,
              //       subDivision: null,
              //       dateOfDivisionJoining: null,
              //       dateOfDivisionLeaving: null,
              //     }]});
              //   setIsDivisionChanged(true);
              // }
              toggleOpenDivConfirm(false);
            }}
          >
            Yes, Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewOfficialDetailsForm;

