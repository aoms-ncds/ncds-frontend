import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import StaffServices from '../extras/StaffServices';

interface StaffDropdownProps {
  staffs?: Staff[];
  value: Staff | null | undefined;
  onChange: (e: React.SyntheticEvent<Element, Event>, staff: Staff | null) => void;
  textFieldProps?: TextFieldProps;
  label: string;
  required?: boolean;
  disabled?:boolean;
}

const StaffDropdown = (props: StaffDropdownProps) => {
  const [staffs, setStaffs] = useState<Staff[] | null>(null);

  useEffect(() => {
    if (props.staffs) {
      setStaffs(props.staffs);
      return;
    }

    StaffServices.getAll()
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
      disabled={props.disabled === undefined ? false : props.disabled}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required={props.required === undefined ? true : props.required}
          inputProps={{
            ...params.inputProps,
          }}
          {...props.textFieldProps}
          disabled={props.disabled === undefined ? false : props.disabled}
        />
      )}
    />
  );
};
export default StaffDropdown;
