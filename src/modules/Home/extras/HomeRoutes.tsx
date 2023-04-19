import React from 'react';
import HomePage from '..';
import LoginPage from '../LoginPage';
import { Home as HomeIcon } from '@mui/icons-material';

const homePageRoutes: ModuleRoute = {
  base: '',
  pages: [
    {
      title: 'Home Page',
      path: '/',
      element: <HomePage />,
      private: true,
      requiredAccessRights: ['string'],
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
