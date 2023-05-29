import React from 'react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import ReleaseAmount from '../ReleaseAmount';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';

const iroPageRoutes: ModuleRoute = {
  base: '/iro',
  pages: [
    {
      title: 'IRO',
      path: '/',
      element: <IRODashboard />,
      private: true,
      requiredAccessRights: ['string'],
      showInDrawer: true,
      icon: <RequestQuoteIcon />,
    },
    {
      title: 'Manage IRO',
      path: '/manage',
      element: <ManageIRO />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Closed IRO',
      path: '/closed',
      element: <ClosedIRO />,
      private: true,
      requiredAccessRights: ['string'],
    },
    {
      title: 'Release Amount',
      path: '/release_amount/:iroID',
      element: <ReleaseAmount />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default iroPageRoutes;
