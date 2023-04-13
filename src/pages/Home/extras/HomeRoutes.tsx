import React from 'react';
import HomePage from '..';
import LoginPage from '../LoginPage';

const homePageRoutes: ModuleRoute = {
  base: '/',
  pages: [
    {
      title: 'Home Page',
      path: '',
      element: <HomePage />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
    },
    {
      title: 'Login page',
      path: '/login',
      element: <LoginPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default homePageRoutes;
