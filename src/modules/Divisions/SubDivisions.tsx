import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { FormControl, Grid, TextField, Typography } from '@mui/material';
import SubDivisionTextfields from './components/SubDivisionTextfield';

const SubDivisionsPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(3);

  const handleDuplicateClick = () => {
    setDuplicateCount(duplicateCount + 1);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={12}>

        <Grid item xs={12} md={12} lg={12}>
          {[...Array(duplicateCount)].map((_, index) => (
            <SubDivisionTextfields key={index} />
          ))}
        </Grid>
      </Grid>
      <button type="button" onClick={handleDuplicateClick}>Add Subdivision</button>

    </form>
  );
};

export default SubDivisionsPage;
