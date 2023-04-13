import React from 'react';
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
    },
  ],
};
export default divisionsPageRoutes;
