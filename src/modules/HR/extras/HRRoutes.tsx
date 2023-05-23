import React from 'react';
import HRDashboard from '..';
import { Diversity3 as Diversity3Icon } from '@mui/icons-material';
import HRManagePage from '../ManagePage';
import StaffFormPage from '../StaffFormPage';
import { ModuleRoute } from '../../../extras/CommonTypes';

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
      title: 'Add New Staff',
      path: '/add',
      element: <StaffFormPage action='add' />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Edit Staff',
      path: '/edit/:id',
      element: <StaffFormPage action='edit' />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};
export default hrPageRoutes;
