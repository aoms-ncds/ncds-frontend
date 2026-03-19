import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { enqueueSnackbar } from 'notistack';
import DivisionsServices from './extras/DivisionsServices';
import { useParams } from 'react-router-dom';
import UsersDropdown from '../User/components/UsersDropdown';
import UserServices from '../User/extras/UserServices';
interface SubDivisionsPageProps {
  withCardContainer?: SubDivision[];
  action:'add'|'edit'|'view';
  onChange: (newSubDivisions: SubDivision[]) => void;
}
const SubDivisionsPage: React.FC<SubDivisionsPageProps> = ({ withCardContainer = [], onChange, action }) => {
  const { editID } = useParams();
  const [subDivisions, setSubDivisions] = useState<SubDivision[]>(withCardContainer.length > 0 ? withCardContainer : [{ _id: '1', name: '' }]);
  const [users, setUsers] = useState<User[] | null>(null);


  useEffect(()=>{
    if (editID) {
      UserServices.getDivisionUser(editID)
  .then((res) => {
    setUsers(res.data);
  })
  .catch((error) => {
    enqueueSnackbar({
      variant: 'error',
      message: error.message,
    });
  });
    }
  }
  , []);

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
    const deletedSubdivision = subDivisions.filter((_, i) => i == index);
    const deletedSubdivisionIds = deletedSubdivision.map((sub) => sub._id);
    if (deletedSubdivisionIds.length > 0) {
      if (editID) {
        const subDivisionId = deletedSubdivisionIds[0];
        const objectIdPattern = /^[0-9a-fA-F]{24}$/;

        if (subDivisionId) {
          if (objectIdPattern.test(subDivisionId)) {
            DivisionsServices.deleteSubDivision(subDivisionId)
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
    }
    enqueueSnackbar({
      message: 'Deleted Sub Division',
      variant: 'success',
    });

    setSubDivisions(newSubDivisions);
    onChange(newSubDivisions); // Call the onChange prop with the updated division details
    return newSubDivisions;
  };
  const lastProgramNameField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // for (let i = 0; i < 50; i++) { // Used for automatically adding 50 sheets (for testing purposes)
    //   RESTClient.Scheduling.createProgramSheet({
    //     name: "Test sheet " + i,
    //     cols: [1, 2, 3, 4, 5].map(item => ({ name: "Program " + item }))
    //   })
    // }
  }, [subDivisions]);
  return (
    <>
      <Grid item xs={12}>
        { action!=='view' && <Button variant="outlined" onClick={handleAddSubDivision} sx={{ float: 'right' }}>
          Add new Sub Division
        </Button>}
      </Grid>
      {/* <Grid item xs={12} > */}
      {subDivisions.map((subDivision, index) => (
        <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
          <TextField
            label={`Sub Division ${index + 1}`}
            value={subDivision.name}
            onChange={(e) => {
              setSubDivisions(subDivisions.map((subDiv, _index)=>index==_index?
                {
                  ...subDivision,
                  name: e.target.value,
                }:subDiv));
              onChange(subDivisions.map((subDiv, _index)=>index==_index?
                {
                  ...subDivision,
                  name: e.target.value,
                }:subDiv));
              // const newSubDivisions = [...subDivisions];
              // newSubDivisions[index].name = e.target.value;
              // setSubDivisions(newSubDivisions);

              // onChange(newSubDivisions); // Call the onChange prop with the updated division details
            }}

            InputProps={{
              endAdornment: (
                action!=='view'&&
                <IconButton
                  onClick={() => {
                    deleteSubDivision(index);
                  }}
                >
                  <DeleteIcon/>
                </IconButton>
              ),
            }}
            inputRef={index === subDivisions.length - 1 ? lastProgramNameField : null}
            fullWidth
            // required
            autoComplete="off"
            disabled={action=='view'}
            // disabled={action=='view'}
          />
          <Grid>
            <br/>
          </Grid>
          {subDivision && subDivision && (
            <UsersDropdown
              users={users??[]}
              value={subDivision.leader??null}
              onChange={(_e, newValue) => {
                if (newValue) {
                  setSubDivisions(subDivisions.map((subDiv, _index)=>index==_index?
                    {
                      ...subDivision,
                      leader: newValue,
                    }:subDiv));
                  onChange(subDivisions.map((subDiv, _index)=>index==_index?
                    {
                      ...subDivision,
                      leader: newValue,
                    }:subDiv));
                  // const newSubDivisions = [...subDivisions];
                  // newSubDivisions[index].leader = newValue;
                  // setSubDivisions(newSubDivisions);

                  // onChange(newSubDivisions); // Call the onChange prop with the updated division details
                }
              }}
              label={'Sub Division Leader Name'}
              required={false}
              disabled={action=='view'}
            />
          )}
        </Grid>
      ))}

    </>
  );
};

export default SubDivisionsPage;
