import React from 'react';
import TestModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';
import NewPage from '../FreshPage';

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
      title: 'New page',
      path: '/new_page',
      element: <NewPage />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
    },
  ],
};
export default testsPageRoutes;
