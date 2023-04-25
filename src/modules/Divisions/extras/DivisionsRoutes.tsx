import React from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import DivisionsPage from '..';
import DivisionDetailsPage from '../divisionDetails';

const divisionsPageRoutes: ModuleRoute = {
  base: '/divisions',
  pages: [
    {
      title: 'Divisions',
      path: '/',
      element: <DivisionsPage />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <ExtensionIcon />,
    },
    {
      title: 'Divisions',
      path: '/Add',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['string'],

    },
    {
      title: 'Divisions',
      path: '/details/:divisionID',
      element: <DivisionDetailsPage />,
      private: true,
      requiredAccessRights: ['string'],

    },
  ],
};
export default divisionsPageRoutes;
