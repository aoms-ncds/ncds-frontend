import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import DivisionsList from './components/DivisionsList';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PermissionChecks from '../User/components/PermissionChecks';
const DivisionsDashboardPage = () => {
  return (
    <CommonPageLayout title="Divisions Dashboard">
      <PermissionChecks
        permissions={['WRITE_DIVISIONS']}
        granted={(

          <Button
            variant="contained"
            sx={{ float: 'right' }}
            startIcon={<AddIcon />}
            component={Link}
            to="/divisions/add"
            // onClick={() => {
            // }}
          >
        Add new
          </Button>
        )}
      />
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DivisionsList />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default DivisionsDashboardPage;
