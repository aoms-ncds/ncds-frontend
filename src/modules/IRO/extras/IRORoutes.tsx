import React from 'react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ReleaseAmount from '../ReleaseAmount';
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
