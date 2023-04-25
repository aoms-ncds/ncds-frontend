import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Card } from '@mui/material';
import AddFRRequests from './components/AddFRRequests';
const ApplyNewFR = () => {
  return (
    <CommonPageLayout title='Apply New FR'>
      <Card style={{ width: '100%' }}>
        <AddFRRequests />
      </Card>

    </CommonPageLayout>
  );
};

export default ApplyNewFR;
