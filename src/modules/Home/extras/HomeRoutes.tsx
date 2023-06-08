import React from 'react';
import HomePage from '..';
import { Home as HomeIcon } from '@mui/icons-material';
import LoginPage from '../../User/Login';

const homePageRoutes: ModuleRoute = {
  base: '',
  pages: [
    {
      title: 'Home Page',
      path: '/',
      element: <HomePage />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <HomeIcon />,
    },
    {
      title: 'Login page',
      path: '/login',
      element: <LoginPage />,
      private: false,
    },
  ],
};
export default homePageRoutes;
