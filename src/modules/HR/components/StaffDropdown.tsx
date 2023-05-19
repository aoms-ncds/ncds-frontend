import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import HRServices from '../extras/HRServices';
import UserServices from '../../User/extras/UserServices';

interface StaffDropdownProps {
  staffs?: User[];
  value: User | null | undefined;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    staff: User | null
  ) => void;
  textFieldProps?: TextFieldProps;
  label: string;
}

const StaffDropdown = (props: StaffDropdownProps) => {
  const [staffs, setStaffs] = useState<User[] | null>(null);

  useEffect(() => {
    if (props.staffs) {
      setStaffs(props.staffs);
      return;
    }

    UserServices.getAll()
      .then((res) => {
        setStaffs(res.data);
      })
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  }, [props.staffs]);

  return (
    <Autocomplete
      options={staffs ?? []}
      value={props.value}
      fullWidth
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={(option) => option.basicDetails.firstName + ' ' + option.basicDetails.lastName}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};
export default StaffDropdown;
