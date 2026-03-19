import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import DesignationServices from '../extras/DesignationServices';


const filter = createFilterOptions<CreatableDesignation>();

interface DesignationsDropdownProps {
  designations?: IDesignation[];
  selectedDesignation: IDesignation | CreatableDesignation | null;
  onSelect: (designation: IDesignation) => void;
  textFieldProps?: TextFieldProps;
}

const DesignationsDropdown = (props: DesignationsDropdownProps) => {
  const [value, setValue] = React.useState<CreatableDesignation | null>(null);
  const [designations, setDesignations] = React.useState<CreatableDesignation[] | null>(null);

  React.useEffect(() => {
    if (!props.designations) {
      DesignationServices.getAll().then((res) => {
        setDesignations(res.data);
      });
    } else {
      setDesignations(props.designations);
    }
  }, [props.designations]);

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
      options={designations ?? []}
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
      renderInput={(params) => <TextField {...params} {...props.textFieldProps} label="Designation" fullWidth />}
      fullWidth
    />
  );
};

export default DesignationsDropdown;
