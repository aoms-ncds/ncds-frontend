import React from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import DivisionsPage from '..';

const divisionsPageRoutes: ModuleRoute = {
  base: '/divisions',
  pages: [
    {
      title: 'Divisions Page',
      path: '/',
      element: <DivisionsPage />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
  ],
};
export default divisionsPageRoutes;
