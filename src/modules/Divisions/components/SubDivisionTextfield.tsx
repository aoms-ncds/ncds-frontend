import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const SubDivisionTextfields= (props: {
    index?: any;
  }) => {
  const [loadCount, setLoadCount] = useState(0);
  return (

    <><Grid item xs={6} md={6} lg={6}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          label={'Sub Division ' + (props.index + 1)}
          //   value={newWorkerBasicDetails?.workerCode}
          //   onChange={(e) =>
          //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
          //       ...newWorkerBasicDetails,
          //       workerCode: e.target.value,
          //     }))
          //   }
          fullWidth />
      </FormControl>
    </Grid><Grid item xs={2} md={2} lg={2}>
      <FormControl variant="outlined" fullWidth>
        <DeleteIcon />

      </FormControl>

    </Grid></>


  );
};

export default SubDivisionTextfields;
