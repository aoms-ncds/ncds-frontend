import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid, Typography } from '@mui/material';
import DivisionsList from './components/DivisionsList';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { Link } from 'react-router-dom';
const DivisionsDashboardPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const onLoad = () => setLoadCount((count) => count+1);
  const afterLoad = () => setLoadCount((count) => count-1);
  return (
    <CommonPageLayout title='Divisions Dashboard' loadCount={loadCount}>
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
      <br/><br/>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '70vh', width: '100%' }}>
          <DivisionsList
            loadCount={loadCount}
            onLoad={onLoad}
            afterLoad={afterLoad}
          />
        </Card>
      </Grid>

    </CommonPageLayout>
  );
};

export default DivisionsDashboardPage;
