import React from 'react';
// import ApplicationsDashboard from '..';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import APPDashboard from '..';
import ApplicationManagePages from '../ManagePages';

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
      path: '/manage',
      element: <ApplicationManagePages />,
      private: true,
      requiredAccessRights: ['string'],
    },
  ],
};


export default apppageRoutes;
