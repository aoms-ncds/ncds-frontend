import React from 'react';
import TestsHome from '..';
import { Science as ScienceIcon } from '@mui/icons-material';

const testsPageRoutes: ModuleRoute = {
  base: '/tests',
  pages: [
    {
      title: 'Tests Module',
      path: '',
      element: <TestsHome />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ScienceIcon />,
    },
  ],
};
export default testsPageRoutes;
