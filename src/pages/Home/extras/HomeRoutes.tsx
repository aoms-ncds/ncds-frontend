import React from 'react';
import HomePage from '..';
import LoginPage from '../LoginPage';

const home_page_routes: ModuleRoute = {
  base: '/',
  pages: [
    {
      path: '',
      element: <HomePage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      path: '/login',
      element: <LoginPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default home_page_routes;
