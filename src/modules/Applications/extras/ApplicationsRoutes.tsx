import React from 'react';
// import ApplicationsDashboard from '..';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import APPDashboard from '..';
import ApplicationManagePages from '../ManagePages';
import ApplicationManage from '../ApplicationManage';
import AddNewApplication from '../AddNewApplication';

const apppageRoutes : ModuleRoute = {
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
      path: '/request',
      element: <ApplicationManagePages />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Application Manage',
      path: '/manage/:divisionID',
      element: <ApplicationManage />,
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


export default apppageRoutes;
