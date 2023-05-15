import React, { useState } from 'react';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';
const SubDivisionsPage = ({
  withCardContainer = [],
}: {
  withCardContainer?: SubDivision[];
}) => {
  const { editID } = useParams();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>(withCardContainer.length > 0 ? withCardContainer : [{ _id: '1', subDivisionName: '' }]);
  const handleAddSubDivision = () => {
    setSubDivisions([
      ...subDivisions,
      {
        _id: (subDivisions.length + 1).toString(),
        subDivisionName: '',
      },
    ]);
  };
  const deleteSubDivision = (index: number) => {
    const newSubDivisions = subDivisions.filter((_, i) => i !== index);
    const deletedSubdivision=subDivisions.filter((_, i) => i == index);
    const deletedSubdivisionIds = deletedSubdivision.map((sub) => sub._id);
    if (deletedSubdivisionIds.length > 0) {
      console.log(deletedSubdivisionIds[0]);
      if (editID) {
        DivisionsServices.markAsRemove(deletedSubdivisionIds[0])
      .then((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar({
          message: err.message,
          variant: 'error',
        });
      });
      }
    }
    enqueueSnackbar({
      message: 'Deleted Sub Division',
      variant: 'success',
    });
    setSubDivisions(newSubDivisions);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={12}>

        <Grid item xs={12} md={12} lg={12}>
          {subDivisions.map((subDivision, index) => (
            <div key={subDivision._id}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    label={'Sub Division ' + (index + 1)}
                    value={subDivision.subDivisionName}
                    onChange={(e) => {
                      const newSubDivisions = [...subDivisions];
                      newSubDivisions[index].subDivisionName = e.target.value;
                      setSubDivisions(newSubDivisions);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => deleteSubDivision(index)} variant="outlined" style={{ display: 'block', margin: '0 auto' }}><DeleteIcon /></Button>
                </Grid>
              </Grid><br />
            </div>
          ))}
          <Button onClick={handleAddSubDivision} style={{ display: 'block', margin: '0 auto' }}><AddIcon /></Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubDivisionsPage;
