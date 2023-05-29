import React from 'react';
import Profile from '../Profile';

const usersPageRoutes: ModuleRoute = {
  base: '/users',
  pages: [
    // {
    //   title: 'Workers',
    //   path: '/',
    //   element: <WorkersDashboard />,
    //   private: true,
    //   requiredAccessRights: ['string'],
    //   showInDrawer: true,
    //   icon: <Diversity2Icon />,
    // },
    {
      title: 'View Profile',
      path: '/:userId',
      element: <Profile />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default usersPageRoutes;
