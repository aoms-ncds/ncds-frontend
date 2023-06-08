import { Typography } from '@mui/material';
import React from 'react';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import CommonPageLayout from '../../components/CommonPageLayout';

const UnauthorizedPage = () => {
  return (
    <CommonPageLayout>
      <div style={{ height: '20vh' }}></div>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: Animations.accessDenied2,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={200}
        width={200}
        // isStopped={.state.isStopped}
        // isPaused={.state.isPaused}
      />
      <br />
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}
      >
        You don&apos;t have permission to access this page!
      </Typography>
    </CommonPageLayout>
  );
};

export default UnauthorizedPage;
