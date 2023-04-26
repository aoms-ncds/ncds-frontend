import React, { useState } from 'react';
import { FormControl, Grid, TextField, Typography } from '@mui/material';

const SubDivisionTextfields= (props: {
    index?: any;
  }) => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <><Grid item xs={8} md={6} lg={6}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          label={'Sub Division '+(props.index+1)}
          //   value={newWorkerBasicDetails?.workerCode}
          //   onChange={(e) =>
          //     setWorkerBasicDetails((newWorkerBasicDetails) => ({
          //       ...newWorkerBasicDetails,
          //       workerCode: e.target.value,
          //     }))
          //   }
          fullWidth />
      </FormControl>
      <FormControl variant="outlined" fullWidth>
                  Delete
      </FormControl>
    </Grid>
    </>

  );
};

export default SubDivisionTextfields;
