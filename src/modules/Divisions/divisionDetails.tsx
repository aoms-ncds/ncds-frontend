import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Typography } from '@mui/material';

const DivisionDetailsPage = () => {
  const [loadCount, setLoadCount] = useState(0);
  return (
    <CommonPageLayout title='Division Details' loadCount={loadCount}>

    </CommonPageLayout>
  );
};

export default DivisionDetailsPage;
