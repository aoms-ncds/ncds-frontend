import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import UserServices from '../extras/UserServices';

interface UserDropdownProps {
  users?: User[];
  value: User | null | undefined;
  onChange: (e: React.SyntheticEvent<Element, Event>, User: User | null) => void;
  textFieldProps?: TextFieldProps;
  label: string;
  required?: boolean;
  disabled?:boolean;
}

const UsersDropdown = (props: UserDropdownProps) => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (props.users) {
      setUsers(props.users);
      return;
    }

    UserServices.getAll()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  }, [props.users]);

  return (
    <Autocomplete
      options={users ?? []}
      value={props.value}
      fullWidth
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={(option:any) => option.name?? (option.basicDetails.firstName + ' ' + option.basicDetails.lastName)}
      disabled={props.disabled === undefined ? false : props.disabled}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required={props.required === undefined ? true : props.required}
          disabled={props.disabled === undefined ? false : props.disabled}
          inputProps={{
            ...params.inputProps,
          }}
          {...props.textFieldProps}
        />
      )}
    />
  );
};
export default UsersDropdown;
