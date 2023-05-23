import React from 'react';
import SampleModule from '..';
import { Extension as ExtensionIcon } from '@mui/icons-material';
import { ModuleRoute } from '../../../extras/CommonTypes';

const samplesPageRoutes: ModuleRoute = {
  base: '/sample',
  pages: [
    {
      title: 'Samples Module page',
      path: '',
      element: <SampleModule />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
  ],
};
export default samplesPageRoutes;
