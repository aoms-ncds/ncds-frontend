import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import DepartmentServices from '../extras/DepartmentServices';
import { enqueueSnackbar } from 'notistack';

const filter = createFilterOptions<CreatableDepartment>();

interface DepartmentsDropdownProps {
  departments?: Department[];
  selectedDepartment: Department | null;
  onSelect: (department: Department) => void;
  textFieldProps?: TextFieldProps;
}

const DepartmentsDropdown = (props: DepartmentsDropdownProps) => {
  const [value, setValue] = useState<CreatableDepartment | null>(null);
  const [departments, setDepartments] = useState<CreatableDepartment[] | null>(null);

  useEffect(() => {
    if (props.departments) {
      setDepartments(props.departments);
      return;
    }

    DepartmentServices.getAll()
      .then((res) => setDepartments(res.data))
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });
      });
  }, [props.departments]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
            status: 0,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
            status: 0,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
            status: 0,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={departments ?? []}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => <TextField {...params} {...props.textFieldProps} label="Department" fullWidth />}
      fullWidth
    />
  );
};

export default DepartmentsDropdown;
