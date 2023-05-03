import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import HRServices from '../extras/HRServices';

const filter = createFilterOptions<CreatableDepartment>();

interface DepartmentsDropdownProps{
    departments?: Department[];
    selectedDepartment: Department | CreatableDepartment |null;
    onSelect: (department: Department) => void;
    textFieldProps?: TextFieldProps;
}

const DepartmentsDropdown = (props: DepartmentsDropdownProps) => {
  const [value, setValue] = React.useState<CreatableDepartment | null>(null);
  const [departments, setDepartments] = React.useState<CreatableDepartment[]|null>(null);
  React.useEffect(() => {
    if (!props.departments) {
      HRServices.getDepartment().then((res) => {
        setDepartments(res.data);
      });
    } else {
      setDepartments(props.departments);
    }
  }, [props.departments]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
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
      renderInput={(params) => (
        <TextField {...params} {...props.textFieldProps} label="Department" fullWidth />
      )}
      fullWidth
    />
  );
};

export default DepartmentsDropdown;
