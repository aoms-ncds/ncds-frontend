import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import ClosedFRsTable from './components/ClosedFRsTable';
import { Card } from '@mui/material';

const ClosedFR = () => {
  return (
    <CommonPageLayout title="Closed FR">
      <Card sx={{ height: '100%' }}>
        <ClosedFRsTable />
      </Card>
    </CommonPageLayout>
  );
};

export default ClosedFR;
