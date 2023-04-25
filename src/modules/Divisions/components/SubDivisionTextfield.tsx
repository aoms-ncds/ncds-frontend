import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const SubDivisionTextfields= () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <><Grid item xs={8} md={6} lg={6}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          label="Sub Division 1"
          //   value={newWorkerBasicDetails?.workerCode}
          //   onChange={(e) =>
          //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
          //       ...newWorkerBasicDetails,
          //       workerCode: e.target.value,
          //     }))
          //   }
          fullWidth />
      </FormControl>
    </Grid><Grid item xs={2} md={4} lg={4}>
      <FormControl variant="outlined" fullWidth>
                  Delete
      </FormControl>
    </Grid></>
  );
};

export default SubDivisionTextfields;
