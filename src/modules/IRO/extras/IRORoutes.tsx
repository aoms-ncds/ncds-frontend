import React from 'react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ApplyNewFR from '../../FR/ApplyNewFR';
import ClosedFR from '../../FR/ClosedFR';
import ViewFR from '../../FR/ViewFR';
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
    {
      title: 'View FR',
      path: '/view_FR/:frID',
      element: <ViewFR />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'Release Amount',
      path: '/release_amount/:iroID',
      element: <ReleaseAmount />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
    {
      title: 'edit FR',
      path: '/edit/:iroID',
      element: <ApplyNewFR />,
      private: true,
      requiredAccessRights: ['string'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default iroPageRoutes;
