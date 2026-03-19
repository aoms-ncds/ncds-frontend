/* eslint-disable max-len */
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface SearchComponentProps {
  onSearch: (searchText: string) => void; // Define the prop type for onSearch function
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>(''); // Define the state type for searchText

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value); // Update the searchText state
  };

  const handleSearchClick = () => {
    onSearch(searchText); // Call the onSearch function provided by the parent component
  };

  return (
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center" padding={2}>
      <Grid item xs={6}>
        {/* Text field for entering search text */}
        <TextField label="Search" placeholder='Worker name, workerCode, Phone, Email, Division, Sub div, Designation' variant="outlined" value={searchText} onChange={handleSearchChange} fullWidth sx={{ marginTop: '10px' }} />
      </Grid>
      <Grid item xs={3}>
        {/* Button to trigger the search action */}
        <Button onClick={handleSearchClick} variant="contained" sx={{}}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchComponent;
