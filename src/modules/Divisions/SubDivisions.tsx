import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';
import { SubDivision } from './extras/DivisionsTypes';
interface SubDivisionsPageProps {
  withCardContainer?: SubDivision[];
  onChange: (newSubDivisions: SubDivision[]) => void;
}
const SubDivisionsPage: React.FC<SubDivisionsPageProps> = ({
  withCardContainer = [],
  onChange,
})=> {
  const { editID } = useParams();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>(withCardContainer.length > 0 ? withCardContainer : [{ _id: '1', name: '' }]);
  const handleAddSubDivision = () => {
    setSubDivisions([
      ...subDivisions,
      {
        _id: (subDivisions.length + 1).toString(),
        name: '',
      },
    ]);
  };
  const deleteSubDivision = (index: number) => {
    const newSubDivisions = subDivisions.filter((_, i) => i !== index);
    const deletedSubdivision=subDivisions.filter((_, i) => i == index);
    const deletedSubdivisionIds = deletedSubdivision.map((sub) => sub._id);
    if (deletedSubdivisionIds.length > 0) {
      console.log('testing neww', deletedSubdivisionIds[0]);
      if (editID) {
        const subdivisionId = deletedSubdivisionIds[0];
        if (subdivisionId) {
          DivisionsServices.deleteSubDivision(subdivisionId)
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
    }
    enqueueSnackbar({
      message: 'Deleted Sub Division',
      variant: 'success',
    });
    console.log(newSubDivisions);
    setSubDivisions(newSubDivisions);
    onChange(newSubDivisions); // Call the onChange prop with the updated division details
    return newSubDivisions;
  };
  const lastProgramNameField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    lastProgramNameField.current?.focus();
    // for (let i = 0; i < 50; i++) { // Used for automatically adding 50 sheets (for testing purposes)
    //   RESTClient.Scheduling.createProgramSheet({
    //     name: "Test sheet " + i,
    //     cols: [1, 2, 3, 4, 5].map(item => ({ name: "Program " + item }))
    //   })
    // }
  }, [subDivisions]);
  return (
    <>
      {/* <Grid item xs={12} > */}
      {subDivisions.map((subDivision, index) => (
        <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
          <TextField
            label={`Sub Division ${index + 1}`}
            value={subDivision.name}
            onChange={(e) => {
              const newSubDivisions = [...subDivisions];
              newSubDivisions[index].name = e.target.value;
              setSubDivisions(newSubDivisions);
              onChange(newSubDivisions); // Call the onChange prop with the updated division details
              return newSubDivisions;
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    deleteSubDivision(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ),
            }}
            inputRef={
              index === subDivisions.length - 1 ? lastProgramNameField : null
            }
            fullWidth
            required
            autoComplete="off"
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={handleAddSubDivision}
        >
              Add new Division
        </Button>
      </Grid>
    </>

  );
};

export default SubDivisionsPage;
