import React from 'react';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import FRDashboard from '..';
import ApplyNewFR from '../ApplyNewFR';
import ClosedFR from '../ClosedFR';
import ManageFRPage from '../ManageFrPage';


const divisionsPageRoutes: ModuleRoute = {
  base: '/fr',
  pages: [
    {
      title: 'FR',
      path: '/',
      element: <FRDashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Manage FR',
      path: '/manage_FR',
      element: <ManageFRPage />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Apply New FR',
      path: '/apply',
      element: <ApplyNewFR />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Closed FR',
      path: '/closed_FR',
      element: <ClosedFR />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },


  ],
};
export default divisionsPageRoutes;
