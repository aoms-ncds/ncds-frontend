import React from 'react';
import HRDashboard from '..';
import { Diversity3 as Diversity3Icon } from '@mui/icons-material';
import HRManagePage from '../ManagePage';
import ApproveWorkerPage from '../../Workers/ApproveWorkersPage';
import ManageWorkerPage from '../../Workers/ManageWorkersPage';

const hrPageRoutes: ModuleRoute = {
  base: '/hr',
  pages: [
    {
      title: 'HR',
      path: '',
      element: <HRDashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <Diversity3Icon />,
    },
    {
      title: 'Manage staff',
      path: '/manage',
      element: <HRManagePage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Edit staff',
      path: '/edit',
      element: <HRManagePage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Manage Workers',
      path: '/worker',
      element: <ManageWorkerPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Approve Workers',
      path: '/approve',
      element: <ApproveWorkerPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default hrPageRoutes;
