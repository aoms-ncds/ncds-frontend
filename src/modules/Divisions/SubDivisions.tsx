import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { FormControl, Grid, TextField, Typography } from '@mui/material';
import SubDivisionTextfields from './components/SubDivisionTextfield';
import AddIcon from '@mui/icons-material/Add';
const SubDivisionsPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(3);

  const handleDuplicateClick = () => {
    setDuplicateCount(duplicateCount + 1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={12}>


        {[...Array(duplicateCount)].map((_, index) => (
          <SubDivisionTextfields key={index} index={index}/>
        ))}

      </Grid>
      <button type="button" style={{ display: 'block', margin: '0 auto' }} onClick={handleDuplicateClick}><AddIcon /></button>

    </form>
  );
};

export default SubDivisionsPage;
