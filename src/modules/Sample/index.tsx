import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Typography } from '@mui/material';
import SampleComponent from './components/SampleComponent';
import SampleTableComponent from './components/SampleTableComponent';

const SamplePage = () => {
  return (
    <CommonPageLayout title="Sample module dashboard">
      <Typography variant="h1">This page is not implemented</Typography>
      <SampleComponent />
      <Card sx={{ height: 500 }}>
        <SampleTableComponent />
      </Card>
    </CommonPageLayout>
  );
};

export default SamplePage;
