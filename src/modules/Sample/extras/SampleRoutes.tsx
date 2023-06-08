import React from 'react';
import SampleModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';

const samplesPageRoutes: ModuleRoute = {
  base: '/sample',
  pages: [
    {
      title: 'Samples Module page',
      path: '',
      element: <SampleModule />,
      private: true,
      requiredAccessRights: ['ADMIN_ACCESS'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
  ],
};
export default samplesPageRoutes;
