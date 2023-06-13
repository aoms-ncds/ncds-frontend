import { Grid, FormControl, TextField, FormControlLabel, FormLabel, Radio, RadioGroup, Autocomplete, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState, useEffect } from 'react';
import NewAddressForm from './NewAddressForm';
import UsersDropdown from '../UsersDropdown';
import UserServices from '../../extras/UserServices';
import CommonLifeCycleStates from '../../../../extras/CommonLifeCycleStates';
import LanguagesService from '../../../Settings/extras/LanguagesService';

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

  const [languages, setLanguages] = useState<ILanguage[]>([]);
  useEffect(() => {
    LanguagesService.getAll({ status: CommonLifeCycleStates.ACTIVE })
  .then((res) =>
    setLanguages(res.data));
  }, []);


  useEffect(() => {
    // UserServices.getAll({ basicDetails: { gender: props.value.gender=='Male'?'Female':'Male' } })
    if (props.value.martialStatus == 'Married' && props.options?.kind === 'staff') {
      UserServices.getAll({
        $and: [{ status: CommonLifeCycleStates.ACTIVE }, { 'basicDetails.gender': props.value.gender == 'Male' ? 'Female' : props.value.gender == 'Female' ? 'Male' : 'Other' }],
      })
        .then((res) => {
          console.log(res);
          setSpouseList(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [props.value.gender, props.value.martialStatus]);

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="Field">Field</FormLabel>
          <RadioGroup
            aria-labelledby="Field"
            // defaultValue="missionar
            value={props.value.field}
            onChange={(e) => props.onChange({ ...props.value, field: e.target.value as WorkerField | undefined })}
            name="Field"
            row
          >
            <FormControlLabel value="Missionary" control={<Radio />} label="Missionary" />
            <FormControlLabel value="Non-Missionary" control={<Radio />} label="Non-Missionary" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="First Name"
          value={props.value.firstName}
          onChange={(e) => props.onChange({ ...props.value, firstName: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: true, autoFocus: true }}
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
          value={props.value.dateOfBirth?.fromNow(true)}
          InputProps={{
            readOnly: true,
            disabled: true,
          }}
          variant={props.options?.textField?.variant}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl>
          <FormLabel id="martialStatus">Martial Status</FormLabel>
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
            <FormControlLabel value='Married' control={<Radio />} label="Married" />
            <FormControlLabel value='Unmarried' control={<Radio />} label="Unmarried" />
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
            }} label={'Spouse Of Another User'}
            required={false}
            textFieldProps={{ variant: props.options?.textField?.variant }}
          />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete<Religion>
          options={['Hindu', 'Muslim', 'Christian', 'Sikh']}
          value={props.value.religion??null}
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
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          id="mlanguges"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.motherTongue ?? null}
          onChange={(e, newvalue) => props.onChange({ ...props.value, motherTongue: newvalue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Mother Tongue" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          id="Clanguges"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.communicationLanguage ?? null}
          onChange={(e, newvalue) => props.onChange({ ...props.value, communicationLanguage: newvalue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Communication Language" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Autocomplete
          multiple
          id="knownLanguages"
          options={languages}
          getOptionLabel={(option) => option.name}
          value={props.value.knownLanguages??[]}
          onChange={(e, newvalue) => props.onChange({ ...props.value, knownLanguages: newvalue ?? undefined })}
          renderInput={(params) => <TextField {...params} label="Known Languages" variant={props.options?.textField?.variant} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Email"
          type="email"
          value={props.value.email}
          onChange={(e) => props.onChange({ ...props.value, email: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
          InputProps={{ required: true }}
          required
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
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Phone"
          type="tel"
          value={props.value.phone}
          onChange={(e) => props.onChange({ ...props.value, phone: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Alternative Phone"
          type="tel"
          value={props.value.alternativePhone}
          onChange={(e) => props.onChange({ ...props.value, alternativePhone: e.target.value })}
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField label="PAN" value={props.value.PANNo} onChange={(e) => props.onChange({ ...props.value, PANNo: e.target.value })} variant={props.options?.textField?.variant} fullWidth />
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
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Aadhaar File"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              props.onChange({
                ...props.value,
                aadhaar: {
                  aadhaarNo: props.value.aadhaar?.aadhaarNo ?? '',
                  // aadhaarFile: { file },
                },
              });
            }
          }}
          variant={props.options?.textField?.variant}
          InputLabelProps={{ shrink: true }}
          fullWidth
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
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <TextField
          label="Voter ID File"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              props.onChange({
                ...props.value,
                voterId: {
                  voterIdNo: props.value.voterId?.voterIdNo ?? '',
                  // voterIdFile: { file },
                },
              });
            }
          }}
          variant={props.options?.textField?.variant}
          InputLabelProps={{ shrink: true }}
          fullWidth
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
          variant={props.options?.textField?.variant}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <br />
        <Divider textAlign="left">Insurance Details</Divider>
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
          label="Date Of Joining Insurance"
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
      </Grid>


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
          title: 'Current Official address',
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
          title: 'Permanent address',
          copyAddressCheckBox: {
            label: 'Same as Current address',
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

    </>
  );
};

export default UserBasicDetailsForm;
