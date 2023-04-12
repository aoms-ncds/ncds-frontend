import { AppBar, Box, CssBaseline } from '@mui/material';
import React from 'react';

const CommonPageLayout = (props: { children: JSX.Element[] | JSX.Element }) => {
  // return (
  //   <Box sx={{ display: 'flex' }}>
  //     <CssBaseline />
  //     <AppBar
  //       position='fixed'
  //       sx={{
  //         width: { sm: `calc(100% - ${drawerWidth}px)` },
  //         ml: { sm: `${drawerWidth}px` },
  //       }}
  //       >

  //       </AppBar>
  //   </Box>
  // );
  return <>{props.children}</>;
};

export default CommonPageLayout;
