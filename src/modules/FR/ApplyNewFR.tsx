import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
