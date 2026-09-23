<<<<<<< HEAD
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
      <Card style={{ height: '70vh', width: '100%' }}>
        <Grid container spacing={2} >

          <Grid item xs={12}>

            <DivisionsList/>

          </Grid>
        </Grid>
      </Card>
    </CommonPageLayout>
  );
};

export default DivisionsDashboardPage;
=======
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
      <Card style={{ height: '70vh', width: '100%' }}>
        <Grid container spacing={2} >

          <Grid item xs={12}>

            <DivisionsList/>

          </Grid>
        </Grid>
      </Card>
    </CommonPageLayout>
  );
};

export default DivisionsDashboardPage;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
