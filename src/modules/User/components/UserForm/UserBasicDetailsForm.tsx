import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete, Divider, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import moment from 'moment';
import NewAddressForm from './NewAddressForm';
import UsersDropdown from '../UsersDropdown';
import UserServices from '../../extras/UserServices';
import CommonLifeCycleStates from '../../../../extras/CommonLifeCycleStates';
import LanguagesService from '../../../Settings/extras/LanguagesService';
import { Attachment as AttachmentIcon } from '@mui/icons-material';
import FileUploader from '../../../../components/FileUploader/FileUploader';
import FileUploaderServices from '../../../../components/FileUploader/extras/FileUploaderServices';
import { MB } from '../../../../extras/CommonConfig';
import GenderService from '../../../Settings/extras/GenderService';
import ReligionService from '../../../Settings/extras/ReligionService';
import { IGender, ILanguage, IReligion } from '../../../Settings/extras/LanguageTypes';

const UserBasicDetailsForm = (
  props: FormComponentProps<
    CreatableBasicDetails,
    {
      textField?: { variant: 'filled' | 'outlined' | 'standard' };
      kind?: UserKind | undefined;
      spouse: {
        spouseOfAnother?: User;
        onChange: (newSpouse: User) => void;
      };
    }
  >,
) => {
  const [duplicateCurrentAddress, setDuplicateCurrentAddress] = useState(false);
  const [spouseList, setSpouseList] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAadhaarUploader, setShowAadhaarUploader] = useState(false);
  const [showVoterIdUploader, setShowVoterIdUploader] = useState(false);

  const [emailError, setEamilError] = useState<string | null>(null);

  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [gender, setGender] = useState<IGender[]>([]);
  const [religion, setReligion] = useState<IReligion[]>([]);
  useEffect(() => {
    LanguagesService.getAll({ status: CommonLifeCycleStates.ACTIVE }).then((res) => setLanguages(res.data));
    GenderService.getAll().then((res) => setGender(res.data));
    ReligionService.getAll().then((res) => setReligion(res.data));
    UserServices.getAll({ $and: [{ kind: 'worker' }]}).then((res) => setUsers(res.data));
  }, []);

  console.log(spouseList, 'spouseList');

  useEffect(() => {
    // UserServices.getAll({ basicDetails: { gender: props.value.gender=='Male'?'Female':'Male' } })
    if (props.value.martialStatus == 'Married' && props.options?.kind === 'staff') {
      UserServices.getAll({
        $and: [{ status: CommonLifeCycleStates.ACTIVE }],
      })
        .then((res) => {
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [props.value.martialStatus]);


  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <FormControl>
          <FormLabel required id="Typeofworker,">Type of worker</FormLabel>
          <RadioGroup
            aria-labelledby="martialStatus"
            value={props.value.field ?? null}
            onChange={(e) =>
              props.onChange({
                ...props.value,
                field: e.target.value as WorkerField | undefined,
              })
            }
            name="Field"
            row
          >
            <FormControlLabel value="Field" control={<Radio />} label="Field" />
            <FormControlLabel value="Office Staff" control={<Radio />} label="Office Staff" />
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          value={props?.value?.organization ?? null}
          options={['IET', 'BCG', 'NCDS']}
          getOptionLabel={(option) => option}
          onChange={(e, newValue) =>
            props.onChange({ ...props.value, organization: newValue??'' })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Organization"
              variant={props?.options?.textField?.variant}
            />
          )}
        />
      </Grid>
      {props?.value?.organization =='IET' &&(

        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label="Daughter Organisation"
            value={props.value.daughterOrganization}
            onChange={(e) => props.onChange({ ...props.value, daughterOrganization: e.target.value })}
            variant={props.options?.textField?.variant}
            fullWidth
            InputProps={{ required: true, autoFocus: true }}
          // required
          />

        </Grid>
      )}
      
      <Grid item xs={12} md={6} lg={3}>
        <Autocomplete
          value={props?.value?.title ?? null}
          options={['Mr', 'Mrs']}
          getOptionLabel={(option) => option}
          onChange={(e, newValue) =>
            props.onChange({ ...props.value, title: newValue??'' })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Title"
              variant={props?.options?.textField?.variant}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <TextField
          label="First Name"
          value={props.value.firstName}
          onChange={(e) => props.onChange({ ...props.value, firstName: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: true, autoFocus: true }}
          required
        />

        <Typography sx={{ fontSize: '12px', color: '#8c8d8f' }} >(Name as per the Aadhaar card )</Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <TextField
          label="Middle Name"
          value={props.value.middleName}
          onChange={(e) => props.onChange({ ...props.value, middleName: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: false, autoFocus: false }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <TextField
          label="Last Name"
          value={props.value.lastName}
          onChange={(e) => props.onChange({ ...props.value, lastName: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: true }}
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date Of Birth"
          value={props.value.dateOfBirth}
          onChange={(newDate) =>
            props.onChange({
              ...props.value,
              dateOfBirth: newDate ?? undefined,
            })
          }
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField?.variant,
              fullWidth: true,
              required: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Age"
          value={moment().diff(props.value.dateOfBirth, 'years')}
          InputProps={{
            readOnly: true,
            disabled: true,

          }}
          variant={props.options?.textField?.variant}
          InputLabelProps={{ shrink: true, style: { fontSize: '20px' } }}
          fullWidth

        />
      </Grid>

      {/* <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="Gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="Gender"
            value={props.value.gender ?? null}
            onChange={(e) =>
              props.onChange({
                ...props.value,
                gender: e.target.value as Gender | undefined,
              })
            }
            name="Gender"
            row
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          id="gender"
          options={gender}
          getOptionLabel={(option) => option.gender}
          value={props.value.gender as unknown as IGender}
          onChange={(e, newValue) => props.onChange({ ...props.value, gender: newValue as unknown as BasicDetails['gender'] })}
          renderInput={(params) => <TextField {...params} label="Gender" variant={props.options?.textField?.variant} />}
        />
      </Grid> */}

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<IGender>
          value={props?.value?.gender?? null}
          options={gender}
          getOptionLabel={(g) => g.gender}
          onChange={(e, newValue) => props.onChange({ ...props.value, gender: newValue as IGender })}
          renderInput={(params) => <TextField {...params} label="Gender" variant={props?.options?.textField?.variant} />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<IWorker | User>
          value={props?.value?.spouseOf ?? null as unknown as IWorker}
          options={users}
          getOptionLabel={(g) => `${g?.basicDetails?.firstName} ${g?.basicDetails?.middleName ?? ''} ${g?.basicDetails?.lastName}`}
          onChange={(e, newValue) => props.onChange({ ...props.value, spouseOf: newValue as unknown as User })}
          renderInput={(params) => <TextField {...params} label="Spouse Of" variant={props?.options?.textField?.variant} />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="martialStatus">Marital Status</FormLabel>
          <RadioGroup
            aria-labelledby="martialStatus"
            value={props.value.martialStatus ?? null}
            onChange={(e) =>
              props.onChange({
                ...props.value,
                martialStatus: e.target.value as MaritalStatus | undefined,
              })
            }
            name="martialStatus"
            row
          >
            <FormControlLabel value="Married" control={<Radio />} label="Married" />
            <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {props.value.martialStatus === 'Married' && props.options?.kind === 'staff' && (
        <Grid item xs={12} md={6} lg={4}>
          <UsersDropdown
            users={spouseList}
            value={props.options?.spouse.spouseOfAnother}
            onChange={(e, newValue) => {
              if (newValue) {
                props.options?.spouse.onChange(newValue);
              }
            }}
            label={'Spouse Of Another User'}
            required={false}
            textFieldProps={{ variant: props.options?.textField?.variant }}
          />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<IReligion>
          options={religion}
          value={props.value?.religion?? null }
          getOptionLabel={(option :any) => option.religion}
          onChange={(e, selectedReligion) =>
            props.onChange({
              ...props.value,
              religion: selectedReligion ?? undefined,
            })
          }
          renderInput={(params) => <TextField {...params} label="Religion" variant={props.options?.textField?.variant} />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Highest Qualification"
          value={props.value.highestQualification}
          onChange={(e) => props.onChange({ ...props.value, highestQualification: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}

        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          id="mLanguages"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.motherTongue ?? null}
          onChange={(e, newValue) => props.onChange({ ...props.value, motherTongue: newValue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Mother Tongue" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          id="CLanguages"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.communicationLanguage ?? null}
          onChange={(e, newValue) => props.onChange({ ...props.value, communicationLanguage: newValue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Communication Language" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          multiple
          id="knownLanguages"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.knownLanguages ?? []}
          onChange={(e, newValue) => props.onChange({ ...props.value, knownLanguages: newValue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Known Languages" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        {/* <TextField
          label="Email"
          type="email"
          value={props.value.email}
          onChange={(e) => props.onChange({ ...props.value, email: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: true }}
          required

        /> */}
        <TextField
          label="Email"
          type="email"
          value={props.value.email}
          onChange={(e) => {
            const inputEmail = e.target.value;
            props.onChange({ ...props.value, email: inputEmail });

            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(inputEmail)) {
              setEamilError('Please enter a valid email');
            } else {
              setEamilError(null);
            }
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          variant={props.options?.textField?.variant}
          fullWidth
          // InputProps={{ required: true }}
          required={props.options?.kind === 'staff'}
        />

      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Alternate Email"
          type="email"
          value={props.value.email2}
          onChange={(e) => props.onChange({ ...props.value, email2: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Phone"
          type="tel"
          value={props.value.phone}
          onChange={(e) => {
            const phone = e.target.value;
            // Allow only digits and limit to 10 characters
            if (/^\d{0,10}$/.test(phone)) {
              props.onChange({ ...props.value, phone });
            }
          }}
          variant={props.options?.textField?.variant}
          fullWidth
          required={props.options?.kind === 'staff'}
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
          inputProps={{
            maxLength: 10,
            inputMode: 'numeric',
            pattern: '[0-9]*',
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />

      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Alternate Phone"
          type="number"
          value={props.value.alternativePhone}
          onChange={(e) => props.onChange({ ...props.value, alternativePhone: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
          inputProps={{
            onWheel: (event: React.WheelEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.currentTarget.blur();
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField label="PAN" value={props.value.PANNo} onChange={(e) => props.onChange({ ...props.value, PANNo: e.target.value })} variant={props.options?.textField?.variant} fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
        />

      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Aadhaar No"
          value={props.value.aadhaar?.aadhaarNo}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              aadhaar: {
                ...props.value.aadhaar,
                aadhaarNo: e.target.value,
              },
            })
          }
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  setShowAadhaarUploader(true);
                  // setAttachments(item.attachment);
                }}
              >
                <AttachmentIcon />
              </IconButton>
            ),
          }}
          variant={props.options?.textField?.variant}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
          required
        />
      </Grid>


      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Voter ID"
          value={props.value.voterId?.voterIdNo}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              voterId: {
                ...props.value.voterId,
                voterIdNo: e.target.value,
              },
            })
          }
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  setShowVoterIdUploader(true);
                  // setAttachments(item.attachment);
                }}
              >
                <AttachmentIcon />
              </IconButton>
            ),
          }}
          variant={props.options?.textField?.variant}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
        />
      </Grid>


      <Grid item xs={12} md={6}>
        <TextField
          label="License No"
          value={props.value.licenseNumber}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              licenseNumber: e.target.value,
            })
          }
          InputLabelProps={{
            shrink: true,
            style: { fontSize: '20px' },
          }}
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      {/* <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Welfare Scheme Details</Divider>
      </Grid>


      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Impact No"
          value={props.value.insurance?.impactNo}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              insurance: {
                ...props.value.insurance,
                impactNo: e.target.value,
              },
            })
          }
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <DatePicker
          label="Date Of Joining"
          value={props.value.insurance?.dojInsurance}
          onChange={(newDate) =>
            props.onChange({
              ...props.value,
              insurance: {
                ...props.value.insurance,
                dojInsurance: newDate ?? undefined,
              },
            })
          }
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: props.options?.textField?.variant,
              fullWidth: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Nominee"
          value={props.value.insurance?.nominee}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              insurance: {
                ...props.value.insurance,
                nominee: e.target.value,
              },
            })
          }
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Relation "
          value={props.value.insurance?.relation}
          onChange={(e) =>
            props.onChange({
              ...props.value,
              insurance: {
                ...props.value.insurance,
                relation: e.target.value,
              },
            })
          }
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid> */}

      <NewAddressForm
        action="add"
        value={props.value.currentOfficialAddress}
        onChange={(newAddress) => {
          // Implement
          if (!duplicateCurrentAddress) {
            props.onChange({
              ...props.value,
              currentOfficialAddress: newAddress,
            });
          } else {
            props.onChange({
              ...props.value,
              currentOfficialAddress: newAddress,
              permanentAddress: newAddress,
            });
          }
        }}
        options={{
          textField: {
            variant: props.options?.textField?.variant ?? 'outlined',
          },
          title: 'Current Official Address',
        }}
      />
      <NewAddressForm
        action="add"
        value={props.value.permanentAddress}
        onChange={(newAddress) => {
          // Implement
          props.onChange({
            ...props.value,
            permanentAddress: newAddress,
          });
        }}
        options={{
          textField: {
            variant: props.options?.textField?.variant ?? 'outlined',
          },
          title: 'Permanent Address',
          copyAddressCheckBox: {
            label: 'Same as Current Address',
            onChange: (value) => {
              setDuplicateCurrentAddress(value);
              props.onChange({
                ...props.value,
                permanentAddress: props.value.currentOfficialAddress,
              });
            },
          },
        }}
      />
      <NewAddressForm
        action="add"
        value={props.value.residingAddress}
        onChange={(newAddress) => {
          // Implement
          props.onChange({
            ...props.value,
            residingAddress: newAddress,
          });
        }}
        options={{
          textField: {
            variant: props.options?.textField?.variant ?? 'outlined',
          },
          title: 'Residing Address',
        }}
      />

      <FileUploader
        title="Attachments"
        action="add"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 3 * MB,
        }}
        open={showAadhaarUploader}
        onClose={() => setShowAadhaarUploader(false)}
        getFiles={props.value.aadhaar?.aadhaarFile ? [props.value.aadhaar?.aadhaarFile] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'HR/Staff', file.name).then((res) => {
            props.onChange({
              ...props.value,
              aadhaar: {
                ...props.value.aadhaar,
                aadhaarFile: res.data,
              },
            });

            return res;
          });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            aadhaar: {
              ...props.value.aadhaar,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            aadhaar: {
              ...props.value.aadhaar,
              aadhaarFile: undefined,
            },
          });
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <FileUploader
        title="Attachments"
        action="add"
        types={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
        limits={{
          maxItemSize: 1 * MB,
          maxItemCount: 1,
          maxTotalSize: 3 * MB,
        }}
        open={showVoterIdUploader}
        onClose={() => setShowVoterIdUploader(false)}
        getFiles={props.value.voterId?.voterIdFile ? [props.value.voterId?.voterIdFile] : []}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const resp = FileUploaderServices.uploadFile(file, onProgress, 'HR/Staff', file.name).then((res) => {
            props.onChange({
              ...props.value,
              voterId: {
                ...props.value.voterId,
                voterIdFile: res.data,
              },
            });

            return res;
          });
          return resp;
        }}
        renameFile={(fileId: string, newName: string) => {
          props.onChange({
            ...props.value,
            aadhaar: {
              ...props.value.aadhaar,
            },
          });
          return FileUploaderServices.renameFile(fileId, newName);
        }}
        deleteFile={(fileId: string) => {
          props.onChange({
            ...props.value,
            voterId: {
              ...props.value.voterId,
              voterIdFile: undefined,
            },
          });

          return FileUploaderServices.deleteFile(fileId);
        }}
      />
    </>
  );
};

export default UserBasicDetailsForm;
