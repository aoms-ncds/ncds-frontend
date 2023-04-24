import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Typography } from '@mui/material';

const FreshPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <CommonPageLayout title='Fresh page' loadCount={loadCount}>

    </CommonPageLayout>
  );
};

export default FreshPage;
