import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import IRODashboard from '..';
import ClosedIRO from '../ClosedIRO';
import ManageIRO from '../ManageIRO';
import ReleaseAmount from '../ReleaseAmount';
import ViewIRO from '../ViewIRO';

const iroPageRoutes: ModuleRoute = {
  base: '/iro',
  pages: [
    {
      title: 'IRO',
      path: '/',
      element: <IRODashboard />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
      showInDrawer: true,
      icon: <RequestQuoteIcon />,
    },
    {
      title: 'Manage IRO',
      path: '/manage',
      element: <ManageIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Closed IRO',
      path: '/closed',
      element: <ClosedIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'View IRO',
      path: '/:iroID',
      element: <ViewIRO />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
    },
    {
      title: 'Release Amount',
      path: '/release_amount/:iroID',
      element: <ReleaseAmount />,
      private: true,
      requiredAccessRights: ['READ_IRO'],
      icon: <RequestPageOutlinedIcon />,
    },
  ],
};
export default iroPageRoutes;
