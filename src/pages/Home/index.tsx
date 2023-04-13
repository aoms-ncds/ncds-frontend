import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Typography } from '@mui/material';
const HomePage = () => {
  return (
    <CommonPageLayout title="Home Page" loadCount={0}>
      <Typography>Hello there!</Typography>
    </CommonPageLayout>
  );
};

export default HomePage;
export const HomePagePath = '/';
