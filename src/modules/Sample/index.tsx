import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card, Typography } from '@mui/material';
import SampleComponent from './components/SampleComponent';
import SampleTableComponent from './components/SampleTableComponent';

const SamplePage = () => {
  const [loadCount, setLoadCount] = useState(0);
  const onLoad = () => setLoadCount((count) => count+1);
  const afterLoad = () => setLoadCount((count) => count-1);
  return (
    <CommonPageLayout title='Sample module dashboard' loadCount={loadCount}>
      <Typography variant='h1'>This page is not implemented</Typography>
      <SampleComponent
        loadCount={loadCount}
        onLoad={onLoad}
        afterLoad={afterLoad}/>
      <Card sx={{ height: 500 }}>
        <SampleTableComponent
          loadCount={loadCount}
          onLoad={onLoad}
          afterLoad={afterLoad}/>
      </Card>
    </CommonPageLayout>
  );
};

export default SamplePage;
