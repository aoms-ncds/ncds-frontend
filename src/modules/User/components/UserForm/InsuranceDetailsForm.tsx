import { Autocomplete, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import DesignationServices from '../../../HR/extras/DesignationServices';

const InsuranceDetailsForm = (
  props: FormComponentProps<
  Insurance,
    {
      textField: { variant: 'filled' | 'outlined' | 'standard' };
    }
  >,
) => {
  const [designations, setDesignations] = useState<Designation[] | null>(null);
  const [designationsFetchError, setDesignationsFetchError] = useState<string | false>(false);

  useEffect(() => {
    DesignationServices.getAll()
      .then((res) => setDesignations(res.data))
      .catch((error) => {
        setDesignationsFetchError(error.message);
        enqueueSnackbar({ variant: 'error', message: error.message });
      });
  }, []);

  return (
    <>
      
    </>
  );
};

export default InsuranceDetailsForm;
