import React from 'react';
// import ApplicationsDashboard from '..';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import APPDashboard from '..';
import ApplicationsListingPage from '../ApplicationsListingPage';
import ApplicationApprovalPage from '../ApplicationApprovalPage';
import ApplicationManagePages from '../ManagePages';
import AddNewApplication from '../AddNewApplication';
import { ModuleRoute } from '../../../extras/CommonTypes';

const applicationRoutes : ModuleRoute = {
  base: '/application',
  pages: [
    {


      title: 'Application',
      path: '/',
      element: <APPDashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <AccessAlarmIcon/>,
    },
    {
      title: 'Add Request',
      path: '/list',
      element: <ApplicationsListingPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Application Manage',
      path: '/:applicationID/approval',
      element: <ApplicationApprovalPage />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Add New Application',
      path: '/add',
      element: <AddNewApplication />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};


export default applicationRoutes;
