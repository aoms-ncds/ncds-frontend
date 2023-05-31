import React from 'react';
import TestModule from '..';
import { Extension as ExtensionIcon, Login } from '@mui/icons-material';
import LoginPage from '../../User/Login';
import Pdfview from '../pdfview';
import ForgotPasswordFormPage from '../../User/ForgotPasswordForm';

const testsPageRoutes: ModuleRoute = {
  base: '/tests',
  pages: [
    {
      title: ' Tests Module page',
      path: '',
      element: <TestModule />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
    {
      title: 'Login page',
      path: '/Users/Login',
      element: <LoginPage />,
      private: false,
      requiredAccessRights: ['string'],
      showInDrawer: true,
    },
    {
      title: 'Forgot Password Page',
      path: '/ForgotPasswordForm',
      element: <ForgotPasswordFormPage />,
      private: false,
      requiredAccessRights: ['string'],
      showInDrawer: false,
    },
    {
      title: 'FR Report',
      path: '/pdfview',
      element: <Pdfview />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
    },
  ],
};
export default testsPageRoutes;
