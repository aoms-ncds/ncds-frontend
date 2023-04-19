import React from 'react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import IRODashboard from '..';
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
  ],
};
export default iroPageRoutes;
