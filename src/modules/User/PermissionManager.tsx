import { Checkbox, Divider, FormControl, FormControlLabel, Grid, Typography } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';

const PermissionManager = () => {
  return (
    <CommonPageLayout title='PermissionManager'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Divider textAlign='left'>ADMIN ACESS</Divider>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <FormControl>
            <FormControlLabel
              label="Read Access Rights"
              control={
                <Checkbox
                  checked={true}
                  onChange={(e) =>{
                    //
                  }}
                />
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </CommonPageLayout>
  );
};

export default PermissionManager;

